import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { useState } from "react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import {
  claimFirstAdmin,
  getAdminPricingConfig,
  updateRegionPricing,
  updateServicePricing,
} from "@/lib/pricing.functions";
import { Section } from "@/components/site/ui";

export const Route = createFileRoute("/_authenticated/admin/pricing")({
  head: () => ({
    meta: [
      { title: "Pricing Console — JIMZ AI" },
      { name: "description", content: "Manage JIMZ AI service prices and regional pricing rules." },
      { property: "og:title", content: "Pricing Console — JIMZ AI" },
      { property: "og:description", content: "Internal pricing configuration for JIMZ AI." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: AdminPricingPage,
});

const DISPLAY_RULES = ["round_10", "round_100", "round_1000", "exact"];
const PRICING_TYPES = ["starting_from", "per_month", "per_session", "custom"];

function AdminPricingPage() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const fetchConfig = useServerFn(getAdminPricingConfig);
  const saveService = useServerFn(updateServicePricing);
  const saveRegion = useServerFn(updateRegionPricing);
  const claimAdmin = useServerFn(claimFirstAdmin);
  const [claiming, setClaiming] = useState(false);

  const configQuery = useQuery({
    queryKey: ["admin-pricing"],
    queryFn: () => fetchConfig(),
    retry: false,
  });

  const serviceMutation = useMutation({
    mutationFn: (input: Parameters<typeof saveService>[0]["data"]) => saveService({ data: input }),
    onSuccess: () => {
      toast.success("Service pricing updated");
      queryClient.invalidateQueries({ queryKey: ["admin-pricing"] });
      queryClient.invalidateQueries({ queryKey: ["regional-pricing"] });
    },
    onError: (e: Error) => toast.error(e.message),
  });

  const regionMutation = useMutation({
    mutationFn: (input: Parameters<typeof saveRegion>[0]["data"]) => saveRegion({ data: input }),
    onSuccess: () => {
      toast.success("Regional rule updated");
      queryClient.invalidateQueries({ queryKey: ["admin-pricing"] });
      queryClient.invalidateQueries({ queryKey: ["regional-pricing"] });
    },
    onError: (e: Error) => toast.error(e.message),
  });

  if (configQuery.isPending) {
    return (
      <Section tone="ivory">
        <p className="text-sm text-muted-foreground">Loading pricing configuration…</p>
      </Section>
    );
  }

  if (configQuery.isError) {
    return (
      <Section tone="ivory">
        <div className="max-w-lg rounded-sm border border-border bg-card p-8">
          <h1 className="text-xl font-bold text-primary">Admin access required</h1>
          <p className="mt-2 text-sm text-ink/70">
            Your account is signed in but does not have the admin role yet.
          </p>
          <div className="mt-5 flex flex-wrap gap-3">
            <button
              type="button"
              disabled={claiming}
              onClick={async () => {
                setClaiming(true);
                try {
                  await claimAdmin({ data: undefined });
                  toast.success("Admin access granted");
                  configQuery.refetch();
                } catch (e) {
                  toast.error(e instanceof Error ? e.message : "Could not grant admin access");
                } finally {
                  setClaiming(false);
                }
              }}
              className="rounded-sm bg-accent px-5 py-2.5 text-sm font-semibold text-accent-foreground disabled:opacity-60"
            >
              {claiming ? "Working…" : "Claim admin access"}
            </button>
            <button
              type="button"
              onClick={async () => {
                await supabase.auth.signOut();
                navigate({ to: "/auth" });
              }}
              className="rounded-sm border border-border px-5 py-2.5 text-sm font-semibold text-primary"
            >
              Sign out
            </button>
          </div>
          <p className="mt-4 text-xs text-muted-foreground">
            Claiming works only while no admin exists for this workspace.
          </p>
        </div>
      </Section>
    );
  }

  const { services, regions } = configQuery.data;

  return (
    <Section tone="ivory">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="eyebrow text-accent">Internal</p>
          <h1 className="mt-3 text-3xl font-bold text-primary">Pricing console</h1>
          <p className="mt-2 max-w-2xl text-sm text-ink/70">
            Base prices are set in USD. Regional rules apply an approved multiplier, then live
            exchange rates convert the amount into the visitor&apos;s currency.
          </p>
        </div>
        <button
          type="button"
          onClick={async () => {
            await supabase.auth.signOut();
            navigate({ to: "/auth" });
          }}
          className="rounded-sm border border-border px-4 py-2 text-sm font-semibold text-primary"
        >
          Sign out
        </button>
      </div>

      <h2 className="mt-12 text-lg font-bold text-primary">Services</h2>
      <div className="mt-4 space-y-4">
        {services.map((s) => (
          <form
            key={s.id}
            className="grid gap-4 rounded-sm border border-border bg-card p-5 md:grid-cols-[2fr_repeat(3,1fr)_auto_auto] md:items-end"
            onSubmit={(e) => {
              e.preventDefault();
              const fd = new FormData(e.currentTarget);
              const promo = String(fd.get("promo") ?? "").trim();
              serviceMutation.mutate({
                id: s.id,
                base_price_usd: Number(fd.get("base")),
                promo_price_usd: promo === "" ? null : Number(promo),
                pricing_type: String(fd.get("type")),
                active: fd.get("active") === "on",
              });
            }}
          >
            <div>
              <p className="text-sm font-semibold text-primary">{s.service_name}</p>
              <p className="text-xs text-muted-foreground">{s.category}</p>
            </div>
            <label className="text-xs font-semibold text-muted-foreground">
              Base USD
              <input
                name="base"
                type="number"
                step="0.01"
                min="0"
                defaultValue={s.base_price_usd}
                className="mt-1 w-full rounded-sm border border-border bg-background px-3 py-2 text-sm text-ink"
              />
            </label>
            <label className="text-xs font-semibold text-muted-foreground">
              Promo USD
              <input
                name="promo"
                type="number"
                step="0.01"
                min="0"
                defaultValue={s.promo_price_usd ?? ""}
                className="mt-1 w-full rounded-sm border border-border bg-background px-3 py-2 text-sm text-ink"
              />
            </label>
            <label className="text-xs font-semibold text-muted-foreground">
              Pricing type
              <select
                name="type"
                defaultValue={s.pricing_type}
                className="mt-1 w-full rounded-sm border border-border bg-background px-3 py-2 text-sm text-ink"
              >
                {PRICING_TYPES.map((t) => (
                  <option key={t} value={t}>
                    {t}
                  </option>
                ))}
              </select>
            </label>
            <label className="flex items-center gap-2 text-xs font-semibold text-muted-foreground">
              <input name="active" type="checkbox" defaultChecked={s.active} />
              Active
            </label>
            <button
              type="submit"
              className="rounded-sm bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground"
            >
              Save
            </button>
          </form>
        ))}
      </div>

      <h2 className="mt-14 text-lg font-bold text-primary">Regional rules</h2>
      <div className="mt-4 space-y-4">
        {regions.map((r) => (
          <form
            key={r.id}
            className="grid gap-4 rounded-sm border border-border bg-card p-5 md:grid-cols-[2fr_repeat(4,1fr)_auto_auto] md:items-end"
            onSubmit={(e) => {
              e.preventDefault();
              const fd = new FormData(e.currentTarget);
              regionMutation.mutate({
                id: r.id,
                currency_code: String(fd.get("code")),
                currency_symbol: String(fd.get("symbol")),
                pricing_multiplier: Number(fd.get("multiplier")),
                display_rule: String(fd.get("rule")),
                active: fd.get("active") === "on",
              });
            }}
          >
            <div>
              <p className="text-sm font-semibold text-primary">{r.country_name}</p>
              <p className="text-xs text-muted-foreground">
                {r.country_code} · {r.region ?? "—"}
              </p>
            </div>
            <label className="text-xs font-semibold text-muted-foreground">
              Currency
              <input
                name="code"
                defaultValue={r.currency_code}
                maxLength={3}
                className="mt-1 w-full rounded-sm border border-border bg-background px-3 py-2 text-sm uppercase text-ink"
              />
            </label>
            <label className="text-xs font-semibold text-muted-foreground">
              Symbol
              <input
                name="symbol"
                defaultValue={r.currency_symbol}
                className="mt-1 w-full rounded-sm border border-border bg-background px-3 py-2 text-sm text-ink"
              />
            </label>
            <label className="text-xs font-semibold text-muted-foreground">
              Multiplier
              <input
                name="multiplier"
                type="number"
                step="0.0001"
                min="0"
                defaultValue={r.pricing_multiplier}
                className="mt-1 w-full rounded-sm border border-border bg-background px-3 py-2 text-sm text-ink"
              />
            </label>
            <label className="text-xs font-semibold text-muted-foreground">
              Display rule
              <select
                name="rule"
                defaultValue={r.display_rule}
                className="mt-1 w-full rounded-sm border border-border bg-background px-3 py-2 text-sm text-ink"
              >
                {DISPLAY_RULES.map((rule) => (
                  <option key={rule} value={rule}>
                    {rule}
                  </option>
                ))}
              </select>
            </label>
            <label className="flex items-center gap-2 text-xs font-semibold text-muted-foreground">
              <input name="active" type="checkbox" defaultChecked={r.active} />
              Active
            </label>
            <button
              type="submit"
              className="rounded-sm bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground"
            >
              Save
            </button>
          </form>
        ))}
      </div>
    </Section>
  );
}
