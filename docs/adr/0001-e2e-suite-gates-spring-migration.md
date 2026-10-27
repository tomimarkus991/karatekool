# The E2E suite is the gate for moving off Supabase

We are replacing Supabase with a Spring Boot backend, so we write a black-box Playwright suite against today's site first and the Spring backend must pass the same suite before we switch. Tests drive only the browser plus a small backend-neutral test-support layer (`E2E_BACKEND=supabase|spring`), and the Supabase schema, RLS policies and storage rules are pulled into `supabase/migrations/` so the suite runs against a local, resettable Supabase and those rules serve as the authorization spec Spring must reproduce.

## Consequences

- Sign-in is changing to Google-only with a Whitelist kept in the repo, so today's email/password flows (account sign-up, confirmation, password reset) get no tests; scenarios start from "a signed-in Member/Admin" created through the test-support layer, and Google sign-in scenarios are written against Spring.
- Tests must never assert on Supabase specifics (`sb-` cookies, PostgREST URLs, the supabase client).
