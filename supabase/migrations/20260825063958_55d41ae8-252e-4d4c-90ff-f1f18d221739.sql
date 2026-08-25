CREATE TYPE public.app_role AS ENUM ('admin', 'user');

CREATE TABLE public.user_roles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  role public.app_role NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (user_id, role)
);
GRANT SELECT ON public.user_roles TO authenticated;
GRANT ALL ON public.user_roles TO service_role;
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can read their own roles" ON public.user_roles FOR SELECT TO authenticated USING (user_id = auth.uid());

CREATE OR REPLACE FUNCTION public.has_role(_user_id uuid, _role public.app_role)
RETURNS boolean LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public AS $$
  SELECT EXISTS (SELECT 1 FROM public.user_roles WHERE user_id = _user_id AND role = _role);
$$;

CREATE OR REPLACE FUNCTION public.set_updated_at()
RETURNS trigger LANGUAGE plpgsql SET search_path = public AS $$
BEGIN NEW.updated_at = now(); RETURN NEW; END; $$;

CREATE TABLE public.services (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  service_id text NOT NULL UNIQUE,
  service_name text NOT NULL,
  category text NOT NULL,
  base_price_usd numeric(12,2) NOT NULL DEFAULT 0,
  promo_price_usd numeric(12,2),
  pricing_type text NOT NULL DEFAULT 'starting_from',
  description text NOT NULL DEFAULT '',
  sort_order integer NOT NULL DEFAULT 0,
  active boolean NOT NULL DEFAULT true,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.services TO authenticated;
GRANT ALL ON public.services TO service_role;
ALTER TABLE public.services ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Admins manage services" ON public.services FOR ALL TO authenticated
  USING (public.has_role(auth.uid(), 'admin')) WITH CHECK (public.has_role(auth.uid(), 'admin'));
CREATE TRIGGER services_updated_at BEFORE UPDATE ON public.services FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

CREATE TABLE public.regional_pricing (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  country_code text NOT NULL UNIQUE,
  country_name text NOT NULL,
  region text,
  currency_code text NOT NULL,
  currency_symbol text NOT NULL,
  pricing_multiplier numeric(8,4) NOT NULL DEFAULT 1,
  display_rule text NOT NULL DEFAULT 'round_10',
  active boolean NOT NULL DEFAULT true,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.regional_pricing TO authenticated;
GRANT ALL ON public.regional_pricing TO service_role;
ALTER TABLE public.regional_pricing ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Admins manage regional pricing" ON public.regional_pricing FOR ALL TO authenticated
  USING (public.has_role(auth.uid(), 'admin')) WITH CHECK (public.has_role(auth.uid(), 'admin'));
CREATE TRIGGER regional_pricing_updated_at BEFORE UPDATE ON public.regional_pricing FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

CREATE TABLE public.exchange_rates (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  base_currency text NOT NULL,
  rates jsonb NOT NULL,
  provider text NOT NULL DEFAULT 'open.er-api.com',
  fetched_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (base_currency)
);
GRANT ALL ON public.exchange_rates TO service_role;
ALTER TABLE public.exchange_rates ENABLE ROW LEVEL SECURITY;

INSERT INTO public.services (service_id, service_name, category, base_price_usd, pricing_type, description, sort_order) VALUES
('ai-ugc-video', 'AI UGC Video', 'AI Video Production', 350, 'starting_from', 'Creator-style ad video built for paid social testing.', 10),
('ai-commercial', 'AI Commercial', 'AI Video Production', 1200, 'starting_from', 'Cinematic brand commercial with full creative direction.', 20),
('ai-spokesperson-video', 'AI Spokesperson Video', 'AI Video Production', 450, 'starting_from', 'On-brand presenter video for explainers and onboarding.', 30),
('ai-product-video', 'AI Product Video', 'AI Video Production', 500, 'starting_from', 'Studio-grade product motion without a physical shoot.', 40),
('ai-ad-creative-pack', 'AI Ad Creative Pack', 'AI Advertising & Creative', 750, 'starting_from', 'Multi-variation ad creative set for campaign testing.', 50),
('ai-social-content-retainer', 'AI Social Content Retainer', 'AI Content Creation', 1600, 'per_month', 'Always-on monthly content engine across channels.', 60),
('ai-product-imagery', 'AI Product Imagery', 'AI Content Creation', 300, 'starting_from', 'Catalogue-ready AI product and lifestyle imagery.', 70),
('ai-automation-build', 'AI Automation Build', 'AI Business Solutions', 2500, 'starting_from', 'Workflow mapping and AI assistant / automation build.', 80),
('ai-consulting-training', 'AI Consulting & Training', 'AI Consulting & Training', 900, 'per_session', 'Team workshop and AI adoption guidance session.', 90);

INSERT INTO public.regional_pricing (country_code, country_name, region, currency_code, currency_symbol, pricing_multiplier, display_rule) VALUES
('US', 'United States', 'North America', 'USD', '$', 1.0000, 'round_10'),
('CA', 'Canada', 'North America', 'CAD', 'CA$', 1.0000, 'round_10'),
('GB', 'United Kingdom', 'Europe', 'GBP', '£', 1.0000, 'round_10'),
('NG', 'Nigeria', 'Africa', 'NGN', '₦', 0.7000, 'round_1000'),
('DE', 'Germany', 'European Union', 'EUR', '€', 1.0000, 'round_10'),
('FR', 'France', 'European Union', 'EUR', '€', 1.0000, 'round_10'),
('NL', 'Netherlands', 'European Union', 'EUR', '€', 1.0000, 'round_10'),
('IE', 'Ireland', 'European Union', 'EUR', '€', 1.0000, 'round_10'),
('ES', 'Spain', 'European Union', 'EUR', '€', 1.0000, 'round_10'),
('IT', 'Italy', 'European Union', 'EUR', '€', 1.0000, 'round_10'),
('ZA', 'South Africa', 'Africa', 'ZAR', 'R', 0.8000, 'round_100'),
('KE', 'Kenya', 'Africa', 'KES', 'KSh', 0.8000, 'round_1000'),
('GH', 'Ghana', 'Africa', 'GHS', 'GH₵', 0.8000, 'round_10'),
('AE', 'United Arab Emirates', 'Middle East', 'AED', 'AED ', 1.0000, 'round_10'),
('AU', 'Australia', 'Oceania', 'AUD', 'A$', 1.0000, 'round_10'),
('IN', 'India', 'Asia', 'INR', '₹', 0.7500, 'round_100');