import { z } from "zod";

export const creativeAdvisorSchema = z.object({
  business: z.string().trim().min(2, "Tell us what your business sells.").max(500),
  audience: z.string().trim().min(2, "Tell us who you want to reach.").max(500),
  goal: z.string().trim().min(2, "Tell us what you want to achieve.").max(500),
  placement: z.string().trim().min(2, "Tell us where the content will be used.").max(300),
  contentType: z.string().trim().min(2, "Choose the type of content you are interested in.").max(200),
  budget: z.string().trim().min(2, "Choose an approximate budget.").max(120),
  countryCode: z.string().regex(/^[A-Za-z]{2}$/).nullable(),
});

export type CreativeAdvisorInput = z.infer<typeof creativeAdvisorSchema>;

export const creativeAdvisorResultSchema = z.object({
  serviceId: z.string(),
  suitableService: z.string(),
  suggestedContentFormat: z.string(),
  suggestedNumberOfVideos: z.string(),
  recommendedCampaignApproach: z.string(),
  suggestedNextStep: z.string(),
});

export type CreativeAdvisorResult = z.infer<typeof creativeAdvisorResultSchema> & {
  estimatedStartingPrice: string;
  pricingService: string;
  pricingNotice: string;
};