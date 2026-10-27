import { expect, type Page } from "@playwright/test";

import type { GroupLetters } from "../../src/types/types";

export interface Preferences {
  group?: GroupLetters;
  /** The view the calendar opens in */
  calendarType?: "Kuu" | "Päev";
}

/** A signed-in Member's profile: the menu behind their avatar in the top bar and its settings dialog */
export const profilePage = (page: Page) => {
  // Only shown once the site knows who is signed in
  const menuButton = page.getByRole("button", { name: "Profiil", exact: true });

  // The menu's items share the page with other buttons, so act only inside the menu it opens
  const openMenu = async () => {
    const menuId = await menuButton.getAttribute("aria-controls");
    await menuButton.click();
    return page.locator(`[id="${menuId}"]`);
  };

  const settings = page
    .getByRole("dialog")
    .filter({ has: page.getByRole("heading", { name: "Muuda profiili" }) });

  return {
    /** The avatar button that opens the profile menu; visible once the Member is signed in */
    menuButton: () => menuButton,

    /** Opens the profile settings, picks the given Group and view, and saves them */
    choosePreferences: async ({ group, calendarType }: Preferences) => {
      const menu = await openMenu();
      await menu.getByRole("button", { name: "Seaded" }).click();

      if (group) {
        await settings
          .getByRole("listbox", { name: "Grupp" })
          .getByRole("option", { name: group, exact: true })
          .click();
      }
      if (calendarType) {
        await settings
          .getByRole("listbox", { name: "Kalendri vaade" })
          .getByRole("option", { name: calendarType, exact: true })
          .click();
      }

      await settings.getByRole("button", { name: "Salvesta" }).click();
      await expect(page.getByText("Profiil uuendatud")).toBeVisible();
      // The settings and the menu behind them stay open after saving; close both as a Member would
      await settings.getByRole("button", { name: "Sulge" }).click();
      await expect(settings).toBeHidden();
      await page.keyboard.press("Escape");
      await expect(menuButton).toHaveAttribute("aria-expanded", "false");
    },

    /** Signs out from the profile menu; the site then goes to the home page and offers to sign in */
    signOut: async () => {
      const menu = await openMenu();
      await menu.getByRole("button", { name: "Logi välja" }).click();
      await expect(page).toHaveURL("/");
      await expect(menuButton).toBeHidden();
      await expect(page.getByRole("button", { name: "Logi sisse" })).toBeVisible();
    },
  };
};
