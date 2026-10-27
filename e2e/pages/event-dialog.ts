import { expect, type Locator, type Page } from "@playwright/test";

import type { GroupLetters } from "../../src/types/types";

import { savedWith } from "./toast";

export interface TrainingDetails {
  /** One of the dialog's preset start times, e.g. "17:30" */
  time: string;
  groups: GroupLetters[];
  description?: string;
  highlightedTime?: boolean;
  /** One of the club's standard trailer texts, e.g. "- EKSAM" */
  trailer?: string;
}

export interface TrainingChanges {
  /** One of the dialog's preset start times, e.g. "17:30" */
  time?: string;
  /** Every Group the Training should have afterwards */
  groups?: GroupLetters[];
}

export interface AllDayEventDetails {
  title: string;
  subtitle: string;
}

export interface MultiDayEventDetails {
  /** First and last day of the month the date picker opens on (the current one), e.g. 12 */
  firstDay: number;
  lastDay: number;
  /** A Multi-day event Preset's title */
  title: string;
}

type Tab = "Trenn" | "Päevane sündmus" | "Mitme päevane sündmus";

/** The dialog an Admin creates and edits Events in */
export const eventDialog = (page: Page) => {
  // An opened Event's popover is a dialog too; only the Event dialog has these tabs
  const dialog = page
    .getByRole("dialog")
    .filter({ has: page.getByRole("tab", { name: "Trenn", exact: true }) });

  /** Shows a tab and returns its panel, which is named after the tab */
  const openTab = async (name: Tab) => {
    await dialog.getByRole("tab", { name, exact: true }).click();
    const panel = dialog.getByRole("tabpanel", { name, exact: true });
    await expect(panel).toBeVisible();
    return panel;
  };

  /**
   * Opens a popover and returns its content and a way to close it again. Read the trigger's
   * `aria-controls` first: its name changes with what is picked, and the content is not inside it.
   */
  const openPopover = async (trigger: Locator) => {
    const id = await trigger.getAttribute("aria-controls");
    await trigger.click();
    const content = page.locator(`[id="${id}"]`);
    return {
      content,
      close: async () => {
        await page.locator(`[aria-controls="${id}"]`).click();
        await expect(content).toBeHidden();
      },
    };
  };

  const pickTime = async (panel: Locator, time: string) => {
    // The start time opens a menu of preset times; it is named by the time currently picked
    const { content: times } = await openPopover(
      panel.getByRole("button", { name: /^\d\d:\d\d$/, expanded: false }),
    );
    await times.getByRole("button", { name: time, exact: true }).click();
  };

  /** Toggles Groups until exactly `letters` are picked */
  const pickGroups = async (panel: Locator, letters: GroupLetters[]) => {
    const list = panel.getByRole("listbox", { name: "Grupid" });
    await expect(list).toBeVisible();
    const picked = (await list.getByRole("option", { selected: true }).allInnerTexts()).map(text =>
      text.trim(),
    );
    const toggle = [
      ...picked.filter(letter => !letters.includes(letter as GroupLetters)),
      ...letters.filter(letter => !picked.includes(letter)),
    ];
    for (const letter of toggle) {
      // Sequential on purpose: each click toggles one Group in the same list
      // eslint-disable-next-line no-await-in-loop
      await list.getByRole("option", { name: letter, exact: true }).click();
    }
  };

  /** Picks a date range in the picker, which opens on the current month */
  const pickDays = async (panel: Locator, firstDay: number, lastDay: number) => {
    const picker = await openPopover(
      panel.getByRole("button", { name: "Vali kuupäev", expanded: false }),
    );
    for (const day of [firstDay, lastDay]) {
      // Days of the neighbouring months are shown too. A day number up to 22 can only repeat in
      // the next month's days, which come after this month's.
      // eslint-disable-next-line no-await-in-loop
      await picker.content
        .getByRole("gridcell", { name: String(day), exact: true })
        .first()
        .click();
    }
    await picker.close();
  };

  /** The Multi-day event title box; its list offers the Multi-day event Presets */
  const titleBox = (panel: Locator) => panel.getByPlaceholder("Vali üritus", { exact: true });

  return {
    /** Fills the Training tab and creates the Training on the dialog's date */
    createTraining: async ({
      time,
      groups,
      description,
      highlightedTime,
      trailer,
    }: TrainingDetails) => {
      const panel = dialog.getByRole("tabpanel", { name: "Trenn", exact: true });
      await pickTime(panel, time);
      await pickGroups(panel, groups);
      if (trailer) await panel.getByRole("option", { name: trailer, exact: true }).click();
      if (description) await panel.getByLabel("Mis trennis toimub?").fill(description);
      if (highlightedTime) await panel.getByRole("switch", { name: "Tõsta trenn esile" }).click();

      await savedWith(page, "Uus üritus on loodud", () =>
        panel.getByRole("button", { name: "Loo", exact: true }).click(),
      );
    },

    /** Changes the Training the dialog was opened to edit and saves it */
    updateTraining: async ({ time, groups }: TrainingChanges) => {
      const panel = dialog.getByRole("tabpanel", { name: "Trenn", exact: true });
      if (time) await pickTime(panel, time);
      if (groups) await pickGroups(panel, groups);

      // Saving an edit confirms with the same message as creating
      await savedWith(page, "Uus üritus on loodud", () =>
        panel.getByRole("button", { name: "Uuenda", exact: true }).click(),
      );
    },

    /** Creates an All-day event on the dialog's date */
    createAllDayEvent: async ({ title, subtitle }: AllDayEventDetails) => {
      const panel = await openTab("Päevane sündmus");
      await panel.getByPlaceholder("Pealkiri", { exact: true }).fill(title);
      await panel.getByPlaceholder("Ala pealkiri", { exact: true }).fill(subtitle);

      await savedWith(page, "Uus päeva üritus on loodud", () =>
        panel.getByRole("button", { name: "Loo", exact: true }).click(),
      );
    },

    /** Saves a new Multi-day event Preset by typing a title nobody has used yet */
    saveMultiDayEventPreset: async (title: string) => {
      const panel = await openTab("Mitme päevane sündmus");
      await titleBox(panel).fill(title);
      // With no match the list offers to create the title: "Midagi ei leitud. Vajuta siia et luua uus."
      await savedWith(page, "Uus mitme päeva üritus on loodud", () =>
        panel.getByRole("button", { name: "siia", exact: true }).click(),
      );
      // The new Preset is picked straight away
      await expect(titleBox(panel)).toHaveValue(title);
    },

    /** Creates a Multi-day event from a Preset's title over days of the current month */
    createMultiDayEvent: async ({ firstDay, lastDay, title }: MultiDayEventDetails) => {
      const panel = await openTab("Mitme päevane sündmus");
      await pickDays(panel, firstDay, lastDay);
      // Typing the title that is already picked changes nothing, so the list would stay closed
      await titleBox(panel).clear();
      await titleBox(panel).fill(title);
      await panel.getByRole("option", { name: title, exact: true }).click();
      await expect(titleBox(panel)).toHaveValue(title);

      // Saving a new Preset shows the same message, so savedWith waits that one out first
      await savedWith(page, "Uus mitme päeva üritus on loodud", () =>
        panel.getByRole("button", { name: "Loo", exact: true }).click(),
      );
    },
  };
};
