import { defineConfig, devices } from "@playwright/test";

import localServices from "./e2e/local-services.json";
import { localSupabaseEnv } from "./e2e/support/local-supabase";

const spring = process.env.E2E_BACKEND === "spring";
const apiUrl = "http://localhost:8080/api/v1";

// Make the backend's address, and the Mailpit and Redis stand-ins from e2e/docker-compose.yml,
// visible to the backend fixture and the web server. The stand-ins always win over the shell so
// reset() can never flush a real Redis.
Object.assign(
  process.env,
  spring ? { NEXT_PUBLIC_API_URL: apiUrl, E2E_API_URL: apiUrl } : localSupabaseEnv(),
  localServices,
);

const baseURL = "http://localhost:3000";

const site = {
  command: "yarn build && yarn start",
  url: baseURL,
  // Reuse `yarn dev:e2e` while writing tests; CI always builds
  reuseExistingServer: !process.env.CI,
  timeout: 5 * 60 * 1000,
};

// The 'e2e' profile adds the test-support endpoints; its database is api/compose.yaml's, which
// every test wipes
const api = {
  command: "./mvnw -B -q spring-boot:run -Dspring-boot.run.profiles=e2e",
  cwd: "api",
  url: `${apiUrl}/actuator/health`,
  reuseExistingServer: !process.env.CI,
  timeout: 5 * 60 * 1000,
};

export default defineConfig({
  testDir: "./e2e/features",
  // Every test resets the backend, so tests must not run side by side
  workers: 1,
  forbidOnly: !!process.env.CI,
  // The HTML report shows each Given / When / Then step; open it with `npx playwright show-report`
  reporter: [["list"], ["html", { open: "never" }]],
  use: {
    baseURL,
    locale: "et-EE",
    timezoneId: "Europe/Tallinn",
    // The PWA service worker would cache responses between tests
    serviceWorkers: "block",
    trace: "retain-on-failure",
  },
  projects: [{ name: "chromium", use: { ...devices["Desktop Chrome"] } }],
  webServer: spring ? [api, site] : site,
});
