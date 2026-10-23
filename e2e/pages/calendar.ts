import type { Page } from "@playwright/test";

import type { GroupLetters } from "../../src/types/types";

export const calendarPage = (page: Page) => ({
  open: () => page.goto("/karateka"),

  showGroup: (letter: GroupLetters) =>
    page.getByRole("button", { name: `Näita ${letter} grupi trenne` }).click(),

  /** A day cell in month view, by ISO date ("2026-03-10"); day cells have no accessible name */
  day: (isoDate: string) => page.getByTestId(`calendar-day-${isoDate}`),
});
