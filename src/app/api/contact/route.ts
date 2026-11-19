import { NextResponse } from "next/server";
import { contactSchema, type ContactFieldErrors } from "@/lib/contact/schema";
import { transport } from "@/lib/contact/transport";

const WINDOW_MS = 60_000;
const MAX_PER_WINDOW = 5;
const hits = new Map<string, { count: number; resetAt: number }>();

function rateLimit(key: string): boolean {
  const now = Date.now();
  const entry = hits.get(key);

  if (!entry || entry.resetAt < now) {
    hits.set(key, { count: 1, resetAt: now + WINDOW_MS });
    return true;
  }

  if (entry.count >= MAX_PER_WINDOW) return false;
  entry.count += 1;
  return true;
}

function clientIp(request: Request): string {
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) return forwarded.split(",")[0]!.trim();
  return request.headers.get("x-real-ip") ?? "unknown";
}

export async function POST(request: Request) {
  let body: unknown;

  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Malformed request body." }, { status: 400 });
  }

  const ip = clientIp(request);

  if (!rateLimit(ip)) {
    return NextResponse.json(
      { ok: false, error: "Too many messages. Please try again in a minute." },
      { status: 429 },
    );
  }

  const parsed = contactSchema.safeParse(body);

  if (!parsed.success) {
    const fieldErrors: ContactFieldErrors = {};
    for (const issue of parsed.error.issues) {
      const key = issue.path[0];
      if (typeof key === "string" && !(key in fieldErrors)) {
        fieldErrors[key as keyof ContactFieldErrors] = issue.message;
      }
    }
    return NextResponse.json({ ok: false, fieldErrors }, { status: 400 });
  }

  const message = {
    name: parsed.data.name,
    email: parsed.data.email,
    company: parsed.data.company,
    budget: parsed.data.budget,
    plan: parsed.data.plan,
    message: parsed.data.message,
  };

  try {
    await transport.send({
      ...message,
      consent: true,
      receivedAt: new Date().toISOString(),
      ip,
    });
  } catch {
    return NextResponse.json(
      { ok: false, error: "We could not send that. Please email us directly." },
      { status: 502 },
    );
  }

  return NextResponse.json({ ok: true, id: crypto.randomUUID() });
}
