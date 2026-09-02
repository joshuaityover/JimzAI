import { createClient } from "@supabase/supabase-js";
import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import type { Database } from "@/integrations/supabase/types";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";
import { inquirySchema, type InquiryInput } from "./inquiry-schema";

function createPublicFetch(key: string): typeof fetch {
  return (input, init) => {
    const headers = new Headers(init?.headers);
    if (key.startsWith("sb_") && headers.get("Authorization") === `Bearer ${key}`) {
      headers.delete("Authorization");
    }
    headers.set("apikey", key);
    return fetch(input, { ...init, headers });
  };
}

export const submitProjectInquiry = createServerFn({ method: "POST" })
  .inputValidator((input: InquiryInput) => inquirySchema.parse(input))
  .handler(async ({ data }) => {
    const url = process.env["SUPABASE_URL"];
    const key = process.env["SUPABASE_PUBLISHABLE_KEY"];
    if (!url || !key) throw new Error("The inquiry service is not configured.");

    const client = createClient<Database>(url, key, {
      auth: { storage: undefined, persistSession: false, autoRefreshToken: false },
      global: { fetch: createPublicFetch(key) },
    });

    const { error } = await client.from("project_inquiries").insert(data);
    if (error) {
      console.error("project inquiry submission failed", error);
      throw new Error("We could not send your request. Please try again.");
    }

    return { ok: true as const };
  });

const inquiryStatusSchema = z.enum([
  "new",
  "contacted",
  "discovery",
  "proposal_sent",
  "won",
  "lost",
]);

export const getAdminInquiries = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    const { data: isAdmin, error: roleError } = await context.supabase.rpc("has_role", {
      _user_id: context.userId,
      _role: "admin",
    });
    if (roleError || !isAdmin) throw new Error("Forbidden");

    const { data, error } = await context.supabase
      .from("project_inquiries")
      .select(
        "id, created_at, full_name, company_name, country, service_needed, estimated_budget, status, business_email, project_type, project_description, target_audience, desired_delivery_date, referral_source, website, updated_at",
      )
      .order("created_at", { ascending: false });
    if (error) throw new Error(error.message);
    return data ?? [];
  });

export const updateInquiryStatus = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator(
    (input: { id: string; status: string }) =>
      z.object({ id: z.string().uuid(), status: inquiryStatusSchema }).parse(input),
  )
  .handler(async ({ data, context }) => {
    const { data: isAdmin, error: roleError } = await context.supabase.rpc("has_role", {
      _user_id: context.userId,
      _role: "admin",
    });
    if (roleError || !isAdmin) throw new Error("Forbidden");

    const { error } = await context.supabase
      .from("project_inquiries")
      .update({ status: data.status })
      .eq("id", data.id);
    if (error) throw new Error(error.message);
    return { ok: true as const };
  });