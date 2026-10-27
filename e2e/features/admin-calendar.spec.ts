import { calendarPage } from "../pages/calendar";
import { eventDialog } from "../pages/event-dialog";
import { Given, Then, When } from "../support/bdd";
import { expect, test } from "../support/fixtures";

test.describe("Admin manages the calendar", () => {
  test("an Admin creates a Training and a visitor sees it on the calendar", async ({
    page,
    backend,
  }) => {
    const calendar = calendarPage(page);
    const dialog = eventDialog(page);

    await Given("a signed-in Admin on the calendar", async () => {
      await backend.anAdmin();
      await calendar.open();
    });

    await When(
      "they create a Training today at 17:30 for Groups A and V about a karate seminar",
      async () => {
        await calendar.createEvent();
        await dialog.createTraining({
          time: "17:30",
          groups: ["A", "V"],
          description: "karate seminar",
        });
      },
    );

    await Then("a visitor sees the Training on 10 March", async () => {
      await page.context().clearCookies();
      await calendar.open({ group: "V" });
      await expect(calendar.day("2026-03-10")).toContainText(/17:30\s*A\s*V\s*karate seminar/);
    });
  });

  test("an Admin creates a Training with a Highlighted time and visitors see it highlighted", async ({
    page,
    backend,
  }) => {
    const calendar = calendarPage(page);
    const dialog = eventDialog(page);

    await Given("a signed-in Admin on the calendar", async () => {
      await backend.anAdmin();
      await calendar.open();
    });

    await When(
      "they create a Training today at 18:00 for Group A with a Highlighted time",
      async () => {
        await calendar.createEvent();
        await dialog.createTraining({ time: "18:00", groups: ["A"], highlightedTime: true });
      },
    );

    await Then("a visitor sees the Training's time highlighted", async () => {
      await page.context().clearCookies();
      await calendar.open({ group: "A" });
      await expect(calendar.trainingTime(calendar.day("2026-03-10"), "18:00")).toHaveAttribute(
        "data-highlighted",
        "true",
      );
    });
  });

  // The Highlighted Group picker in GroupPicker.tsx is commented out, so an Admin cannot
  // Highlight a Group from the Event dialog today.
  test.fixme("an Admin creates a Training with a Highlighted Group", async () => {});
});
