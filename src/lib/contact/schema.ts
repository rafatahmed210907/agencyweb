import { z } from "zod";

export const budgetOptions = [
  "Not sure yet",
  "$5k – $15k",
  "$15k – $40k",
  "$40k – $80k",
  "$80k+",
] as const;

export const contactSchema = z.object({
  name: z.string().trim().min(2, "Please enter your name.").max(120),
  email: z.string().trim().email("Enter a valid email address.").max(180),
  company: z.string().trim().max(160).optional().or(z.literal("")),
  budget: z.enum(budgetOptions),
  message: z
    .string()
    .trim()
    .min(20, "A little more detail helps — at least 20 characters.")
    .max(4000, "Please keep it under 4000 characters."),
  plan: z.string().trim().max(60).optional(),
  consent: z.literal(true, {
    errorMap: () => ({ message: "Please confirm we can reply to you." }),
  }),
  website: z.string().max(0, "Spam detected.").optional().or(z.literal("")),
});

export type ContactInput = z.infer<typeof contactSchema>;

export type ContactFieldErrors = Partial<Record<keyof ContactInput, string>>;
