import { expect, type Page } from "@playwright/test";

import type { GroupLetters } from "../../src/types/types";

export interface TrainingDetails {
  /** One of the dialog's preset start times, e.g. "17:30" */
  time: string;
  groups: GroupLetters[];
  description?: string;
  highlightedTime?: boolean;
}

/** The dialog an Admin creates and edits Events in */
export const eventDialog = (page: Page) => {
  const dialog = page.getByRole("dialog");

  return {
    /** Fills the Training tab and creates the Training on the dialog's date */
    createTraining: async ({ time, groups, description, highlightedTime }: TrainingDetails) => {
      // The start time opens a menu of preset times; it is named by the time currently picked
      const timePicker = dialog.getByRole("button", { name: /^\d\d:\d\d$/, expanded: false });
      const menuId = await timePicker.getAttribute("aria-controls");
      await timePicker.click();
      const times = page.locator(`[id="${menuId}"]`);
      await times.getByRole("button", { name: time, exact: true }).click();

      for (const letter of groups) {
        // Sequential on purpose: each click toggles one Group in the same list
        // eslint-disable-next-line no-await-in-loop
        await dialog.getByRole("option", { name: letter, exact: true }).click();
      }
      if (description) await dialog.getByLabel("Mis trennis toimub?").fill(description);
      if (highlightedTime) await dialog.getByRole("switch", { name: "Tõsta trenn esile" }).click();

      await dialog.getByRole("button", { name: "Loo", exact: true }).click();
      await expect(page.getByText("Uus üritus on loodud")).toBeVisible();
    },
  };
};
