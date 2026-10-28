import { test as base } from "@playwright/test";

import type { TestBackend } from "./backend/port";
import { springBackend } from "./backend/spring";

/** Default "now" for every test: a mid-month Tuesday morning in Tallinn. */
const NOW = "2026-03-10T10:00:00+02:00";

export const test = base.extend<{ now: string; backend: TestBackend }>({
  now: [NOW, { option: true }],

  backend: [
    async ({ context }, use) => {
      const backend = springBackend(context);
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
