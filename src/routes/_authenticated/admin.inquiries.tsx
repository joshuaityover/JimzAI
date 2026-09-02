import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { ArrowLeft, Inbox, LogOut } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { getAdminInquiries, updateInquiryStatus } from "@/lib/inquiry.functions";
import { Section } from "@/components/site/ui";

export const Route = createFileRoute("/_authenticated/admin/inquiries")({
  head: () => ({
    meta: [
      { title: "Project Inquiries — JIMZ AI" },
      { name: "description", content: "Private JIMZ AI project inquiry management." },
      { property: "og:title", content: "Project Inquiries — JIMZ AI" },
      { property: "og:description", content: "Private JIMZ AI project inquiry management." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
      { name: "robots", content: "noindex, nofollow" },
    ],
  }),
  component: AdminInquiriesPage,
});

const statuses = [
  { value: "new", label: "New" },
  { value: "contacted", label: "Contacted" },
  { value: "discovery", label: "Discovery" },
  { value: "proposal_sent", label: "Proposal Sent" },
  { value: "won", label: "Won" },
  { value: "lost", label: "Lost" },
] as const;

function statusLabel(status: string) {
  return statuses.find((item) => item.value === status)?.label ?? status;
}

function AdminInquiriesPage() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const fetchInquiries = useServerFn(getAdminInquiries);
  const saveStatus = useServerFn(updateInquiryStatus);
  const inquiriesQuery = useQuery({ queryKey: ["admin-inquiries"], queryFn: () => fetchInquiries(), retry: false });
  const statusMutation = useMutation({
    mutationFn: (input: { id: string; status: string }) => saveStatus({ data: input }),
    onSuccess: () => {
      toast.success("Inquiry status updated");
      queryClient.invalidateQueries({ queryKey: ["admin-inquiries"] });
    },
    onError: (error: Error) => toast.error(error.message),
  });

  async function signOut() {
    await supabase.auth.signOut();
    navigate({ to: "/auth" });
  }

  if (inquiriesQuery.isPending) {
    return <Section tone="ivory"><p className="text-sm text-muted-foreground">Loading project inquiries…</p></Section>;
  }

  if (inquiriesQuery.isError) {
    return (
      <Section tone="ivory">
        <div className="max-w-lg border border-border bg-card p-8">
          <p className="eyebrow text-accent">Private area</p>
          <h1 className="mt-3 text-2xl font-bold text-primary">Admin access required</h1>
          <p className="mt-3 text-sm leading-relaxed text-ink/70">This inbox is restricted to authenticated JIMZ AI admins.</p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Button asChild variant="outline"><Link to="/pricing">Back to pricing console</Link></Button>
            <Button type="button" onClick={signOut} className="bg-accent text-accent-foreground">Sign out</Button>
          </div>
        </div>
      </Section>
    );
  }

  const inquiries = inquiriesQuery.data;

  return (
    <Section tone="ivory">
      <div className="flex flex-col gap-5 border-b border-border pb-8 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="eyebrow text-accent">Internal inbox</p>
          <h1 className="mt-3 text-3xl font-bold text-primary sm:text-4xl">Project inquiries</h1>
          <p className="mt-3 max-w-2xl text-sm leading-relaxed text-ink/70">Review new briefs, keep the conversation moving and track each opportunity from first contact to outcome.</p>
        </div>
        <div className="flex flex-wrap gap-3">
          <Button asChild variant="outline" className="border-primary/25 text-primary"><Link to="/admin/pricing"><ArrowLeft className="h-4 w-4" /> Pricing</Link></Button>
          <Button type="button" variant="outline" onClick={signOut}><LogOut className="h-4 w-4" /> Sign out</Button>
        </div>
      </div>

      {inquiries.length === 0 ? (
        <div className="mt-10 border border-dashed border-primary/20 bg-card p-10 text-center">
          <Inbox className="mx-auto h-8 w-8 text-accent" aria-hidden />
          <h2 className="mt-4 text-xl font-bold text-primary">No project requests yet</h2>
          <p className="mt-2 text-sm text-ink/70">New requests will appear here after a visitor submits the project brief.</p>
        </div>
      ) : (
        <div className="mt-10 overflow-x-auto border border-border bg-card">
          <table className="w-full min-w-[980px] border-collapse text-left text-sm">
            <thead className="bg-primary text-primary-foreground">
              <tr>
                <th className="px-5 py-4 font-semibold">Date</th>
                <th className="px-5 py-4 font-semibold">Name</th>
                <th className="px-5 py-4 font-semibold">Company</th>
                <th className="px-5 py-4 font-semibold">Country</th>
                <th className="px-5 py-4 font-semibold">Service</th>
                <th className="px-5 py-4 font-semibold">Budget</th>
                <th className="px-5 py-4 font-semibold">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {inquiries.map((inquiry) => (
                <tr key={inquiry.id} className="align-top hover:bg-muted/40">
                  <td className="whitespace-nowrap px-5 py-5 text-muted-foreground">{new Date(inquiry.created_at).toLocaleDateString()}</td>
                  <td className="px-5 py-5"><p className="font-semibold text-primary">{inquiry.full_name}</p><a className="mt-1 block text-xs text-accent hover:underline" href={`mailto:${inquiry.business_email}`}>{inquiry.business_email}</a></td>
                  <td className="px-5 py-5 text-ink/80">{inquiry.company_name}</td>
                  <td className="px-5 py-5 text-ink/80">{inquiry.country}</td>
                  <td className="px-5 py-5 text-ink/80">{inquiry.service_needed}</td>
                  <td className="max-w-[220px] px-5 py-5 text-ink/80">{inquiry.estimated_budget}</td>
                  <td className="px-5 py-5">
                    <label className="sr-only" htmlFor={`status-${inquiry.id}`}>Status for {inquiry.full_name}</label>
                    <select
                      id={`status-${inquiry.id}`}
                      value={inquiry.status}
                      disabled={statusMutation.isPending}
                      onChange={(event) => statusMutation.mutate({ id: inquiry.id, status: event.target.value })}
                      className="rounded-md border border-input bg-background px-3 py-2 text-sm text-ink outline-none focus-visible:ring-1 focus-visible:ring-ring"
                    >
                      {statuses.map((status) => <option key={status.value} value={status.value}>{status.label}</option>)}
                    </select>
                    <span className="sr-only">Current status: {statusLabel(inquiry.status)}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </Section>
  );
}