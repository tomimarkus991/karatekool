# End-to-end tests

Playwright scenarios that describe how the site behaves, written as Given / When / Then steps. They were
the gate for replacing Supabase with Spring Boot (see `docs/adr/0001-e2e-suite-gates-spring-migration.md`)
and now run against the Spring API. Vocabulary comes from `GLOSSARY.md`.

## Running

Needs Docker running and Java 25 (`JAVA_HOME=/opt/homebrew/opt/openjdk@25` on a Mac with Homebrew).

```sh
yarn                                # installs Playwright
npx playwright install chromium     # first time only
docker compose -f e2e/docker-compose.yml up -d --wait   # Mailpit
yarn e2e                            # starts the API, builds the site in production mode, runs every scenario
```

Playwright starts the Spring API (`api/`) with its `e2e` profile. That profile adds `/test-support`
endpoints that wipe the database and sign people in without Google, and sends mail to Mailpit. The
database is `api/compose.yaml`'s, the same one the `dev` profile uses, and **every test wipes it**.
Tests refuse to run against an API that is not on localhost.

**Mailpit** (SMTP on 1025, inbox at http://localhost:8025) catches the API's mail;
`backend.lastMailTo(address)` reads it. `reset()` empties it before every test. Stop it with
`docker compose -f e2e/docker-compose.yml down`.

While writing tests, keep a dev server pointed at the API and Playwright reuses both:

```sh
yarn dev:e2e      # next dev wired to the local API
yarn e2e:ui       # Playwright UI mode
```

Do not run `yarn dev:e2e` and your normal `yarn dev` at the same time: both use port 3000.

## CI

`.github/workflows/e2e.yml` runs the suite on every pull request to `main`: it sets up Java, starts
`e2e/docker-compose.yml` and runs `yarn e2e`, which starts the API and builds the site.
On failure, download the `playwright-report` artifact and open it with
`npx playwright show-report <folder>`; traces of failed tests are inside.

A failing suite blocks merging only once `main` requires the check, which the repository owner sets
after the job has run on a pull request at least once (GitHub only offers checks it has seen):
Settings → Branches → Add branch protection rule for `main` → "Require status checks to pass before
merging" → pick `e2e`. Or with `gh`:

```sh
gh api --method PUT repos/tomimarkus991/karatekool/branches/main/protection --input - <<'EOF'
{
  "required_status_checks": { "strict": false, "contexts": ["e2e"] },
  "enforce_admins": false,
  "required_pull_request_reviews": null,
  "restrictions": null
}
EOF
```

## Layout

- `features/` – one spec file per feature; `test.describe` is the feature, `test(...)` the scenario
- `pages/` – page helpers; every locator lives here, never in a scenario
- `support/bdd.ts` – `Given` / `When` / `Then`, which name each step in the report and trace
- `support/fixtures.ts` – the `test` to import: resets the backend and fixes the clock before every test
- `support/backend/port.ts` – what a scenario may ask of the backend; `spring.ts` implements it against the API

## Rules

- Act and assert only through the page and the `backend` fixture. No API calls, tokens or URLs in scenarios.
- Every test creates the data it needs; nothing survives between tests.
- The browser clock is fixed to Tuesday 10 March 2026, 10:00 in Tallinn. Override with
  `test.use({ now: "..." })`. Create Events on exact dates, never "today + n".
- Locate by role and visible Estonian text; use `data-testid` only where nothing has an accessible name.

## Database

The API's Flyway migrations (`api/src/main/resources/db/migration/`) build the schema and seed the
reference data (Group letters, trailers); `reset()` leaves those alone.
