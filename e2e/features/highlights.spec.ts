import { calendarPage } from "../pages/calendar";
import { Given, Then, When } from "../support/bdd";
import { expect, test } from "../support/fixtures";

test.describe("Highlights on the public calendar", () => {
  test("a visitor sees a Highlighted Training time marked as highlighted", async ({
    page,
    backend,
  }) => {
    const calendar = calendarPage(page);

    await Given("on 10 March a Group A Training at 18:00 with a Highlighted time", async () => {
      await backend.aTraining({
        start: "2026-03-10T18:00:00+02:00",
        end: "2026-03-10T19:30:00+02:00",
        groups: ["A"],
        highlightedTime: true,
      });
      await backend.aTraining({
        start: "2026-03-10T16:00:00+02:00",
        end: "2026-03-10T17:00:00+02:00",
        groups: ["A"],
      });
    });

    await When("a visitor opens the calendar for Group A", () => calendar.open({ group: "A" }));

    await Then("the 18:00 time is highlighted in the month view and 16:00 is not", async () => {
      const day = calendar.day("2026-03-10");
      await expect(calendar.trainingTime(day, "18:00")).toHaveAttribute("data-highlighted", "true");
      await expect(calendar.trainingTime(day, "16:00")).not.toHaveAttribute("data-highlighted");
    });

    await Then("the same holds in the day view", async () => {
      await calendar.switchView("Päev");
      const day = calendar.dayView();
      await expect(calendar.trainingTime(day, "18:00")).toHaveAttribute("data-highlighted", "true");
      await expect(calendar.trainingTime(day, "16:00")).not.toHaveAttribute("data-highlighted");
    });
  });
});
