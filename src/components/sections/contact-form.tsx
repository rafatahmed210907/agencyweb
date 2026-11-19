"use client";

import { useState, type FormEvent } from "react";
import { useSearchParams } from "next/navigation";
import { motion } from "motion/react";
import { ArrowUpRight, CheckCircle2, Loader2, Send } from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { budgetOptions, type ContactFieldErrors } from "@/lib/contact/schema";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type Status = "idle" | "submitting" | "success" | "error";

const PLAN_LABELS: Record<string, string> = {
  establish: "Establish sprint",
  build: "Build engagement",
  growth: "Growth partnership",
};

export function ContactForm() {
  const searchParams = useSearchParams();
  const planParam = searchParams.get("plan") ?? "";
  const planLabel = PLAN_LABELS[planParam];

  const [status, setStatus] = useState<Status>("idle");
  const [errors, setErrors] = useState<ContactFieldErrors>({});
  const [formError, setFormError] = useState<string | null>(null);
  const [budget, setBudget] = useState<string>("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setErrors({});
    setFormError(null);

    const form = event.currentTarget;
    const data = new FormData(form);

    const payload = {
      name: String(data.get("name") ?? ""),
      email: String(data.get("email") ?? ""),
      company: String(data.get("company") ?? ""),
      budget: budget || String(data.get("budget") ?? ""),
      message: String(data.get("message") ?? ""),
      plan: planParam || undefined,
      consent: data.get("consent") === "on",
      website: String(data.get("website") ?? ""),
    };

    setStatus("submitting");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const result = (await response.json().catch(() => ({}))) as {
        ok?: boolean;
        fieldErrors?: ContactFieldErrors;
        error?: string;
      };

      if (!response.ok || !result.ok) {
        if (result.fieldErrors) setErrors(result.fieldErrors);
        setFormError(result.error ?? "Please check the highlighted fields and try again.");
        setStatus("error");
        return;
      }

      setStatus("success");
      toast.success("Message received", {
        description: "We reply to every enquiry within two business days.",
      });
      form.reset();
      setBudget("");
    } catch {
      setFormError("Network error — please try again, or email us directly.");
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <motion.div
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        role="status"
        className="flex h-full flex-col items-center justify-center rounded-2xl border border-[rgba(166,240,76,0.25)] bg-[rgba(10,14,10,0.75)] p-10 text-center"
      >
        <span className="grid size-12 place-items-center rounded-full bg-[rgba(166,240,76,0.12)] text-[#a6f04c]">
          <CheckCircle2 className="size-6" />
        </span>
        <h3 className="mt-5 text-xl font-semibold tracking-[-0.02em] text-[#f2f5ef]">
          Message received.
        </h3>
        <p className="mt-2 max-w-sm text-sm leading-relaxed text-[#9aa79a]">
          Thanks — we read every enquiry ourselves and reply within two business days. If it is
          urgent, email us directly.
        </p>
        <Button
          variant="outline"
          className="mt-6"
          onClick={() => {
            setStatus("idle");
          }}
        >
          Send another message
        </Button>
      </motion.div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className="nl-surface p-6 sm:p-7"
    >
      {planLabel ? (
        <div className="mb-6 flex items-center justify-between gap-3 rounded-xl border border-[rgba(166,240,76,0.25)] bg-[rgba(166,240,76,0.07)] px-3.5 py-2.5">
          <p className="text-[13px] text-[#f2f5ef]">
            Enquiring about <span className="font-medium">{planLabel}</span>
          </p>
          <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-[#a6f04c]">
            Prefilled
          </span>
        </div>
      ) : null}

      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Name" htmlFor="name" error={errors.name}>
          <Input id="name" name="name" autoComplete="name" placeholder="Alex Rivera" required aria-invalid={Boolean(errors.name)} aria-describedby={errors.name ? "name-error" : undefined} />
        </Field>

        <Field label="Email" htmlFor="email" error={errors.email}>
          <Input id="email" name="email" type="email" autoComplete="email" placeholder="alex@company.com" required aria-invalid={Boolean(errors.email)} aria-describedby={errors.email ? "email-error" : undefined} />
        </Field>

        <Field label="Company" htmlFor="company" optional error={errors.company}>
          <Input id="company" name="company" autoComplete="organization" placeholder="Company name" />
        </Field>

        <Field label="Budget" htmlFor="budget" error={errors.budget}>
          <Select value={budget} onValueChange={setBudget}>
            <SelectTrigger id="budget" aria-invalid={Boolean(errors.budget)}>
              <SelectValue placeholder="Select a range" />
            </SelectTrigger>
            <SelectContent>
              {budgetOptions.map((option) => (
                <SelectItem key={option} value={option}>
                  {option}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </Field>
      </div>

      <div className="mt-5">
        <Field label="Project details" htmlFor="message" error={errors.message}>
          <Textarea
            id="message"
            name="message"
            placeholder="What are you building, what stage is it at, and what does success look like?"
            required
            aria-invalid={Boolean(errors.message)}
            aria-describedby={errors.message ? "message-error" : undefined}
          />
        </Field>
      </div>

      {/* Honeypot: hidden from users, filled only by bots. */}
      <div aria-hidden="true" className="absolute left-[-9999px] top-auto h-px w-px overflow-hidden">
        <label htmlFor="website">Website</label>
        <input id="website" name="website" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <div className="mt-5 flex items-start gap-2.5">
        <input
          id="consent"
          name="consent"
          type="checkbox"
          required
          aria-invalid={Boolean(errors.consent)}
          aria-describedby={errors.consent ? "consent-error" : undefined}
          className="mt-0.5 size-4 shrink-0 rounded border-input accent-[var(--primary)]"
        />
        <div>
          <Label htmlFor="consent" className="font-normal text-muted-foreground">
            I am happy to be contacted about this enquiry. No newsletters.
          </Label>
          {errors.consent ? (
            <p id="consent-error" className="mt-1 text-xs text-destructive">
              {errors.consent}
            </p>
          ) : null}
        </div>
      </div>

      {formError ? (
        <p role="alert" className="mt-4 rounded-lg border border-destructive/30 bg-destructive/10 px-3 py-2 text-[13px] text-destructive">
          {formError}
        </p>
      ) : null}

      <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <Button type="submit" size="lg" variant="glow" disabled={status === "submitting"}>
          {status === "submitting" ? (
            <>
              <Loader2 className="size-4 animate-spin" />
              Sending
            </>
          ) : (
            <>
              <Send className="size-4" />
              Send enquiry
            </>
          )}
        </Button>
        <p className="flex items-center gap-1.5 text-[11px] text-muted-foreground">
          <ArrowUpRight className="size-3" />
          Reply within two business days
        </p>
      </div>
    </form>
  );
}

function Field({
  label,
  htmlFor,
  error,
  optional,
  children,
}: {
  label: string;
  htmlFor: string;
  error?: string;
  optional?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div className={cn("space-y-2")}>
      <div className="flex items-baseline justify-between gap-2">
        <Label htmlFor={htmlFor}>{label}</Label>
        {optional ? (
          <span className="text-[10.5px] text-muted-foreground">Optional</span>
        ) : null}
      </div>
      {children}
      {error ? (
        <p id={`${htmlFor}-error`} className="text-xs text-destructive">
          {error}
        </p>
      ) : null}
    </div>
  );
}
