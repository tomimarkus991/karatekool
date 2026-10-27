-- Turn on row level security for every public table. Until now anon and authenticated had full
-- read/write on all of them, so the public anon key alone could change the calendar, edit the
-- Whitelist and read personal data. Rules: everyone reads the calendar, only Admins change it.

CREATE OR REPLACE FUNCTION public.is_admin()
  RETURNS boolean
  LANGUAGE sql
  STABLE
  SECURITY DEFINER
  SET search_path = ''
  AS $$
    SELECT EXISTS (SELECT 1 FROM public.profile WHERE id = auth.uid() AND role = 'admin');
  $$;

REVOKE ALL ON FUNCTION public.is_admin() FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.is_admin() TO anon, authenticated, service_role;

-- PostgREST never needs these, and RLS does not apply to TRUNCATE
REVOKE TRUNCATE, TRIGGER, REFERENCES ON ALL TABLES IN SCHEMA public FROM anon, authenticated;

-- Calendar: public read, Admin write
DO $$
DECLARE
  t text;
BEGIN
  FOREACH t IN ARRAY ARRAY[
    'event', 'event_group', 'event_highlighted_group', 'all_day_event', 'multi_day_event',
    'event_trailer', 'group', 'highlighted_group'
  ] LOOP
    EXECUTE format('ALTER TABLE public.%I ENABLE ROW LEVEL SECURITY', t);
    EXECUTE format(
      'CREATE POLICY "Anyone can read" ON public.%I FOR SELECT TO anon, authenticated USING (true)', t);
    EXECUTE format(
      'CREATE POLICY "Admins can change" ON public.%I FOR ALL TO authenticated '
      'USING (public.is_admin()) WITH CHECK (public.is_admin())', t);
  END LOOP;
END $$;

-- Admin only
ALTER TABLE public.event_preset ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Admins only" ON public.event_preset FOR ALL TO authenticated
  USING (public.is_admin()) WITH CHECK (public.is_admin());

-- The sign-up trigger (check_user) is SECURITY DEFINER and keeps working
ALTER TABLE public.email_whitelist ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Admins only" ON public.email_whitelist FOR ALL TO authenticated
  USING (public.is_admin()) WITH CHECK (public.is_admin());

-- Not used by the site; no policies means no access except service_role
ALTER TABLE public.new_applications ENABLE ROW LEVEL SECURITY;

-- Profile: a Member reads and updates their own row. The browser inserts the row right after
-- auth.signUp, before the email is confirmed, so anon may insert, but only id and username:
-- role can never be set from the browser.
ALTER TABLE public.profile ENABLE ROW LEVEL SECURITY;

REVOKE INSERT, UPDATE ON public.profile FROM anon, authenticated;
GRANT INSERT (id, username) ON public.profile TO anon, authenticated;
GRANT UPDATE (username, avatar, "group", calendar_type) ON public.profile TO authenticated;

CREATE POLICY "Anyone can create their profile when registering an account" ON public.profile FOR INSERT
  TO anon, authenticated WITH CHECK (true);
CREATE POLICY "Members read their own profile" ON public.profile FOR SELECT
  TO authenticated USING (id = auth.uid());
CREATE POLICY "Members update their own profile" ON public.profile FOR UPDATE
  TO authenticated USING (id = auth.uid()) WITH CHECK (id = auth.uid());
