import { z } from "zod";

export const inquiryServices = [
  "AI Video",
  "AI UGC",
  "AI Commercial",
  "AI Spokesperson",
  "AI Product Content",
  "Social Media Content",
  "AI Automation",
  "AI Consulting",
  "AI Training",
  "Other",
] as const;

export const inquiryProjectTypes = [
  "Brand campaign",
  "Product launch",
  "Social content system",
  "Explainer or education",
  "Internal operations",
  "Other",
] as const;

export const inquirySchema = z.object({
  full_name: z.string().trim().min(2, "Please enter your full name.").max(100),
  company_name: z.string().trim().min(2, "Please enter your business or company name.").max(150),
  business_email: z.string().trim().email("Enter a valid business email.").max(255),
  country: z.string().trim().min(2, "Please enter your country.").max(100),
  website: z.preprocess(
    (value) => (typeof value === "string" && value.trim() === "" ? null : value),
    z.string().trim().url("Enter a complete website URL, including https://.").max(255).nullable(),
  ),
  service_needed: z.enum(inquiryServices),
  project_type: z.enum(inquiryProjectTypes),
  project_description: z
    .string()
    .trim()
    .min(20, "Tell us a little more about the project (20 characters minimum).")
    .max(3000),
  target_audience: z.string().trim().min(2, "Please describe your target audience.").max(500),
  desired_delivery_date: z.preprocess(
    (value) => (typeof value === "string" && value.trim() === "" ? null : value),
    z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Choose a valid delivery date.").nullable(),
  ),
  estimated_budget: z.string().trim().min(2).max(100),
  referral_source: z.string().trim().min(2, "Please tell us how you found JIMZ AI.").max(100),
});

export type InquiryInput = z.infer<typeof inquirySchema>;