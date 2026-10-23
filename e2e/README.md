# End-to-end tests

Playwright scenarios that describe how the site behaves, written as Given / When / Then steps. They are
the gate for replacing Supabase with Spring Boot: the same scenarios must pass against both backends
(see `docs/adr/0001-e2e-suite-gates-spring-migration.md`). Vocabulary comes from `GLOSSARY.md`.

## Running

Needs Docker running.

```sh
yarn                                # installs Playwright and the Supabase CLI
npx playwright install chromium     # first time only
npx supabase start                  # local Supabase from supabase/migrations + supabase/seed.sql
yarn e2e                            # builds the site in production mode and runs every scenario
```

Playwright reads the local Supabase URL and keys from `npx supabase status`, so there is no keys file.
Tests refuse to run against anything other than a local Supabase, because every test wipes it.

While writing tests, keep a dev server pointed at the local stack and Playwright reuses it:

```sh
yarn dev:e2e      # next dev wired to local Supabase
yarn e2e:ui       # Playwright UI mode
```

Do not run `yarn dev:e2e` and your normal `yarn dev` at the same time: both use port 3000.

## CI

`.github/workflows/e2e.yml` runs the suite on every pull request to `main`: it starts local Supabase
(database, auth, REST, storage only), builds the site and runs `yarn e2e`. On failure, download the
`playwright-report` artifact and open it with `npx playwright show-report <folder>`; traces of failed
tests are inside.

## Layout

- `features/` – one spec file per feature; `test.describe` is the feature, `test(...)` the scenario
- `pages/` – page helpers; every locator lives here, never in a scenario
- `support/bdd.ts` – `Given` / `When` / `Then`, which name each step in the report and trace
- `support/fixtures.ts` – the `test` to import: resets the backend and fixes the clock before every test
- `support/backend/port.ts` – what a scenario may ask of the backend; `E2E_BACKEND` picks the implementation

## Rules

- Act and assert only through the page and the `backend` fixture. No Supabase client, cookies or URLs in
  scenarios.
- Every test creates the data it needs; nothing survives between tests.
- The browser clock is fixed to Tuesday 10 March 2026, 10:00 in Tallinn. Override with
  `test.use({ now: "..." })`. Create Events on exact dates, never "today + n".
- Locate by role and visible Estonian text; use `data-testid` only where nothing has an accessible name.

## Database

`supabase/migrations/` holds the schema pulled from the hosted project plus later changes, and is the
authorization spec the Spring backend must reproduce. `supabase/seed.sql` holds reference data only
(Group letters, trailers). After changing the schema, `npx supabase db reset` rebuilds the local database.
