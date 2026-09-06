import { createServerFn } from "@tanstack/react-start";
import { streamText, Output, NoObjectGeneratedError } from "ai";
import { z } from "zod";
import { getRequest } from "@tanstack/react-start/server";
import { createLovableAiGatewayProvider, getLovableAiGatewayRunId } from "./ai-gateway.server";
import {
  creativeAdvisorResultSchema,
  creativeAdvisorSchema,
  type CreativeAdvisorResult,
} from "./creative-advisor-schema";

const EMPTY_RESULT: CreativeAdvisorResult = {
  serviceId: "",
  suitableService: "",
  suggestedContentFormat: "",
  suggestedNumberOfVideos: "",
  recommendedCampaignApproach: "",
  suggestedNextStep: "",
  estimatedStartingPrice: "",
  pricingService: "",
  pricingNotice: "",
};

function cleanNextStep(value: string): string {
  const withoutClosingQuestion = value
    .replace(/ready to turn the idea into content\??/gi, "")
    .trim()
    .replace(/[.!]+$/, "");
  return `${withoutClosingQuestion || "Start with a focused creative brief."} Ready to turn the idea into content?`;
}

function parseFallbackRecommendation(text: string | undefined) {
  if (!text) return null;
  const candidate = text.match(/\{[\s\S]*\}/)?.[0];
  if (!candidate) return null;
  try {
    const parsed = creativeAdvisorResultSchema.safeParse(JSON.parse(candidate));
    return parsed.success ? parsed.data : null;
  } catch {
    return null;
  }
}

export const getCreativeAdvisorRecommendation = createServerFn({ method: "POST" })
  .inputValidator((input: unknown) => creativeAdvisorSchema.parse(input))
  .handler(async ({ data }): Promise<CreativeAdvisorResult> => {
    const { buildRegionalPricing, detectCountry } = await import("./pricing.server");
    const request = getRequest();
    const detected = data.countryCode
      ? { country: null, method: "manual" as const }
      : await detectCountry(request.headers).catch(() => ({ country: null, method: "fallback" as const }));
    const pricing = await buildRegionalPricing({
      detectedCountry: detected.country,
      requestedCountry: data.countryCode,
      detectionMethod: detected.method,
    });

    if (pricing.services.length === 0) {
      throw new Error("Current pricing is being updated. Please contact JIMZ AI for a recommendation.");
    }

    const apiKey = process.env["LOVABLE_API_KEY"];
    if (!apiKey) throw new Error("The Creative Advisor is not configured yet. Please contact JIMZ AI.");

    const serviceCatalog = pricing.services
      .map((service) => `${service.serviceId} | ${service.serviceName} | ${service.category} | ${service.description}`)
      .join("\n");
    const prompt = `You are the JIMZ Creative Advisor for an AI creative and digital solutions studio.

Give a concise, practical recommendation for this prospective client. Choose exactly one serviceId from the service catalog below. Do not discuss prices; pricing is added separately from the approved backend rate card. Never promise results or guaranteed performance. Keep each recommendation field to 1–3 clear sentences. The suggested number of videos should be a practical range or count, not a guarantee.

BUSINESS: ${data.business}
TARGET CUSTOMER: ${data.audience}
GOAL: ${data.goal}
CONTENT PLACEMENT: ${data.placement}
CONTENT INTEREST: ${data.contentType}
APPROXIMATE BUDGET: ${data.budget}

SERVICE CATALOG:
${serviceCatalog}`;

    try {
      const gateway = createLovableAiGatewayProvider(apiKey, getLovableAiGatewayRunId(request));
      const result = streamText({
        model: gateway("google/gemini-3.1-flash-lite"),
        prompt,
        maxRetries: 0,
        output: Output.object({ schema: creativeAdvisorResultSchema }),
        providerOptions: {
          lovable: { service_tier: "priority" },
        },
      });
      const output = await result.output;
      const validated = creativeAdvisorResultSchema.parse(output);
      const selected = pricing.services.find((service) => service.serviceId === validated.serviceId) ?? pricing.services[0];
      if (!selected) return EMPTY_RESULT;

      return {
        ...validated,
        serviceId: selected.serviceId,
        suitableService: selected.serviceName,
        suggestedNextStep: cleanNextStep(validated.suggestedNextStep),
        estimatedStartingPrice: selected.formatted,
        pricingService: selected.serviceName,
        pricingNotice: pricing.notice,
      };
    } catch (error) {
      if (NoObjectGeneratedError.isInstance(error)) {
        const fallback = parseFallbackRecommendation(error.text);
        if (fallback) {
          const selected = pricing.services.find((service) => service.serviceId === fallback.serviceId) ?? pricing.services[0];
          if (selected) {
            return {
              ...fallback,
              serviceId: selected.serviceId,
              suitableService: selected.serviceName,
              suggestedNextStep: cleanNextStep(fallback.suggestedNextStep),
              estimatedStartingPrice: selected.formatted,
              pricingService: selected.serviceName,
              pricingNotice: pricing.notice,
            };
          }
        }
        throw new Error("The Creative Advisor could not format a recommendation. Please try again.");
      }
      if (error instanceof Error) throw new Error(error.message);
      throw new Error("The Creative Advisor could not complete this request. Please try again.");
    }
  });