import { calendarPage } from "../pages/calendar";
import { Given, Then, When } from "../support/bdd";
import { expect, test } from "../support/fixtures";

test.describe("Public training calendar", () => {
  test("a visitor sees a Training on the public calendar", async ({ page, backend }) => {
    const calendar = calendarPage(page);

    await Given("a Training for Group A on Tuesday 10 March at 18:00", () =>
      backend.aTraining({
        start: "2026-03-10T18:00:00+02:00",
        end: "2026-03-10T19:30:00+02:00",
        groups: ["A"],
      }),
    );

    await When("a visitor opens the calendar and shows Group A", async () => {
      await calendar.open();
      await calendar.showGroup("A");
    });

    await Then("the Training's time and Group are shown on that day", async () => {
      // A Training renders its time followed by its Group letters
      await expect(calendar.day("2026-03-10")).toContainText(/18:00\s*A/);
    });
  });
});
