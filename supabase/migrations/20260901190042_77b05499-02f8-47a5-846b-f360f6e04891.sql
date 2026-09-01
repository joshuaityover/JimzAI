CREATE TABLE public.project_inquiries (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  full_name text NOT NULL,
  company_name text NOT NULL,
  business_email text NOT NULL,
  country text NOT NULL,
  website text,
  service_needed text NOT NULL,
  project_type text NOT NULL,
  project_description text NOT NULL,
  target_audience text NOT NULL,
  desired_delivery_date date,
  estimated_budget text NOT NULL,
  referral_source text NOT NULL,
  status text NOT NULL DEFAULT 'new',
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  updated_at timestamp with time zone NOT NULL DEFAULT now(),
  CONSTRAINT project_inquiries_status_check CHECK (status IN ('new', 'contacted', 'discovery', 'proposal_sent', 'won', 'lost'))
);

GRANT INSERT ON public.project_inquiries TO anon;
GRANT SELECT, UPDATE ON public.project_inquiries TO authenticated;
GRANT ALL ON public.project_inquiries TO service_role;

ALTER TABLE public.project_inquiries ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can submit a project inquiry"
  ON public.project_inquiries
  FOR INSERT
  TO anon
  WITH CHECK (true);

CREATE POLICY "Admins can view project inquiries"
  ON public.project_inquiries
  FOR SELECT
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins can update project inquiries"
  ON public.project_inquiries
  FOR UPDATE
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'::app_role))
  WITH CHECK (public.has_role(auth.uid(), 'admin'::app_role));

CREATE TRIGGER set_project_inquiries_updated_at
  BEFORE UPDATE ON public.project_inquiries
  FOR EACH ROW
  EXECUTE FUNCTION public.set_updated_at();