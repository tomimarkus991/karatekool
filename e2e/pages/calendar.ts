import { expect, type Locator, type Page } from "@playwright/test";

import type { GroupLetters } from "../../src/types/types";

type CalendarView = "Kuu" | "Päev";

export const calendarPage = (page: Page) => {
  const monthHeadings = () => page.getByRole("heading", { level: 2 });

  // Days and months slide in and out; the calendar ignores clicks until the old one has left
  const move = async (name: string, view: Locator) => {
    await page.getByRole("button", { name }).click();
    await expect(view).toHaveCount(1);
  };
  const moveMonth = (name: string) => move(name, monthHeadings());

  return {
    /** Opens the calendar page, optionally through a link that names a Group */
    open: ({ group }: { group?: GroupLetters } = {}) =>
      page.goto(group ? `/karateka?group=${group}` : "/karateka"),

    showGroup: (letter: GroupLetters) =>
      page.getByRole("button", { name: `Näita ${letter} grupi trenne` }).click(),

    /** Opens the view menu, labelled with the current view, picks another one and closes the menu */
    switchView: async (view: CalendarView) => {
      await page.getByRole("button", { name: /^(Kuu|Päev)$/, expanded: false }).click();
      await page.getByRole("dialog").getByRole("button", { name: view, exact: true }).click();
      await page.keyboard.press("Escape");
    },

    /** Downloads the shown month for a Group; resolves to the file the browser saved */
    download: async (letter: GroupLetters) => {
      const [download] = await Promise.all([
        page.waitForEvent("download"),
        page.getByRole("button", { name: `Lae ${letter} grupi kalender alla` }).click(),
      ]);
      const stream = await download.createReadStream();
      const chunks: Buffer[] = [];
      for await (const chunk of stream) chunks.push(chunk as Buffer);
      return { name: download.suggestedFilename(), content: Buffer.concat(chunks) };
    },

    nextDay: () => move("Järgmine päev", page.getByTestId("calendar-day-view")),
    previousDay: () => move("Eelmine päev", page.getByTestId("calendar-day-view")),

    nextMonth: () => moveMonth("Järgmine kuu"),
    previousMonth: () => moveMonth("Eelmine kuu"),

    /** The month and year the month view shows, e.g. "Märts 2026" */
    monthHeading: () => monthHeadings(),

    /** A day cell in month view, by ISO date ("2026-03-10"); day cells have no accessible name */
    day: (isoDate: string) => page.getByTestId(`calendar-day-${isoDate}`),

    /** The whole day view, including its date heading; it has no accessible name */
    dayView: () => page.getByTestId("calendar-day-view"),
  };
};
