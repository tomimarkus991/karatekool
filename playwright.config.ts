import { defineConfig, devices } from "@playwright/test";

import localServices from "./e2e/local-services.json";
import { localSupabaseEnv } from "./e2e/support/local-supabase";

// Make the local stack's URL and keys, and the Mailpit and Redis stand-ins from
// e2e/docker-compose.yml, visible to the backend fixture and the web server.
// The stand-ins always win over the shell so reset() can never flush a real Redis.
Object.assign(process.env, localSupabaseEnv(), localServices);

const baseURL = "http://localhost:3000";

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
  webServer: {
    command: "yarn build && yarn start",
    url: baseURL,
    // Reuse `yarn dev:e2e` while writing tests; CI always builds
    reuseExistingServer: !process.env.CI,
    timeout: 5 * 60 * 1000,
  },
});
