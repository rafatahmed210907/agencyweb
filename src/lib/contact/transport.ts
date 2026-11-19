import type { ContactInput } from "./schema";

export interface ContactPayload extends ContactInput {
  receivedAt: string;
  ip: string;
}

export interface ContactTransport {
  /** Sends the message somewhere. Throwing causes a 502 to the client. */
  send(payload: ContactPayload): Promise<void>;
}

/**
 * Default transport: accepts the message and records it server-side.
 *
 * Swap this single object for a real provider later — Resend, Postmark, a
 * Supabase table, or an internal webhook. Nothing else in the app changes:
 *
 *   export const transport: ContactTransport = {
 *     async send(payload) {
 *       await resend.emails.send({
 *         from: "Northlane <hello@northlane.studio>",
 *         to: process.env.CONTACT_INBOX!,
 *         subject: `New enquiry from ${payload.name}`,
 *         text: payload.message,
 *       });
 *     },
 *   };
 */
export const transport: ContactTransport = {
  async send(payload) {
    if (process.env.NODE_ENV !== "production") {
      console.info("[contact] accepted submission", {
        name: payload.name,
        email: payload.email,
        company: payload.company || null,
        budget: payload.budget,
        plan: payload.plan || null,
        characters: payload.message.length,
      });
    }
  },
};
