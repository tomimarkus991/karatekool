import { type BrowserContext, test as base } from "@playwright/test";

import type { TestBackend } from "./backend/port";
import { springBackend } from "./backend/spring";
import { supabaseBackend } from "./backend/supabase";

/** Default "now" for every test: a mid-month Tuesday morning in Tallinn. */
const NOW = "2026-03-10T10:00:00+02:00";

const createBackend = (browser: BrowserContext, siteUrl: string): TestBackend => {
  const backend = process.env.E2E_BACKEND ?? "supabase";
  if (backend === "supabase") return supabaseBackend(browser, siteUrl);
  if (backend === "spring") return springBackend(browser);
  throw new Error(`Unknown E2E_BACKEND "${backend}"`);
};

export const test = base.extend<{ now: string; backend: TestBackend }>({
  now: [NOW, { option: true }],

  backend: [
    async ({ context, baseURL }, use) => {
      const backend = createBackend(context, baseURL ?? "http://localhost:3000");
      await backend.reset();
      await use(backend);
    },
    // Reset before every test, even ones that never touch the backend
    { auto: true },
  ],

  page: async ({ page, now }, use) => {
    await page.clock.setFixedTime(now);
    await use(page);
  },
});

export { expect } from "@playwright/test";
