import { test as base } from "@playwright/test";

import type { TestBackend } from "./backend/port";
import { supabaseBackend } from "./backend/supabase";

/** Default "now" for every test: a mid-month Tuesday morning in Tallinn. */
const NOW = "2026-03-10T10:00:00+02:00";

const createBackend = (): TestBackend => {
  const backend = process.env.E2E_BACKEND ?? "supabase";
  if (backend === "supabase") return supabaseBackend();
  throw new Error(`Unknown E2E_BACKEND "${backend}"`);
};

export const test = base.extend<{ now: string; backend: TestBackend }>({
  now: [NOW, { option: true }],

  backend: [
    // Playwright requires the destructuring pattern even with no dependencies
    // eslint-disable-next-line no-empty-pattern
    async ({}, use) => {
      const backend = createBackend();
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
