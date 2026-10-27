import { calendarPage } from "../pages/calendar";
import { eventDialog } from "../pages/event-dialog";
import { Given, Then, When } from "../support/bdd";
import { expect, test } from "../support/fixtures";

test.describe("Admin uses Presets", () => {
  test("an Admin creates a Multi-day event from a Preset", async ({ page, backend }) => {
    const calendar = calendarPage(page);
    const dialog = eventDialog(page);

    await Given("a Multi-day event Preset and a signed-in Admin on the calendar", async () => {
      await backend.aPreset({ title: "Kevadlaager" });
      await backend.anAdmin();
      await calendar.open();
    });

    await When("they create a Multi-day event from the Preset from 12 to 14 March", async () => {
      await calendar.createEvent();
      await dialog.createMultiDayEvent({ firstDay: 12, lastDay: 14, title: "Kevadlaager" });
    });

    await Then("a visitor sees it starting on 12 March", async () => {
      await page.context().clearCookies();
      await calendar.open();
      // In the month view a Multi-day event is one bar on its first day
      await expect(calendar.day("2026-03-12")).toContainText("Kevadlaager");
    });
  });

  test("an Admin saves a new Multi-day event Preset and can then pick it when creating an Event", async ({
    page,
    backend,
  }) => {
    const calendar = calendarPage(page);
    const dialog = eventDialog(page);

    await Given("a signed-in Admin on the calendar", async () => {
      await backend.anAdmin();
      await calendar.open();
    });

    await When("they save a new Multi-day event Preset", async () => {
      await calendar.createEvent();
      await dialog.saveMultiDayEventPreset("Suvelaager");
    });

    await When(
      "they come back later and create a Multi-day event from it from 12 to 14 March",
      async () => {
        await calendar.open();
        await calendar.createEvent();
        await dialog.createMultiDayEvent({ firstDay: 12, lastDay: 14, title: "Suvelaager" });
      },
    );

    await Then("a visitor sees it starting on 12 March", async () => {
      await page.context().clearCookies();
      await calendar.open();
      await expect(calendar.day("2026-03-12")).toContainText("Suvelaager");
    });
  });
});
