import { defineConfig, devices } from "@playwright/test";

import localServices from "./e2e/local-services.json";

const apiUrl = "http://localhost:8080/api/v1";

// Point the site and the backend fixture at the local API, and the fixture at Mailpit from
// e2e/docker-compose.yml. These always win over the shell so reset() can never wipe a real API.
Object.assign(process.env, { NEXT_PUBLIC_API_URL: apiUrl, E2E_API_URL: apiUrl }, localServices);

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
  webServer: [api, site],
});
