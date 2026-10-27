import { expect, type Page } from "@playwright/test";

/**
 * Runs `save` and waits for the site's confirmation `message`, which the site shows only once the
 * change is stored. An earlier toast with the same text is waited out first so it cannot stand in
 * for this one; toasts leave after a few seconds.
 */
export const savedWith = async (page: Page, message: string, save: () => Promise<void>) => {
  const toast = page.getByText(message, { exact: true });
  await expect(toast).toHaveCount(0, { timeout: 10_000 });
  await save();
  await expect(toast).toBeVisible();
};
