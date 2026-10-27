import { calendarPage } from "../pages/calendar";
import { eventDialog } from "../pages/event-dialog";
import { Given, Then, When } from "../support/bdd";
import { expect, test } from "../support/fixtures";

test.describe("Admin uses Presets", () => {
  // The Training Preset picker ("Vali valmis üritus", Presets.tsx) is commented out in
  // NormalEventCreationTab.tsx:141, so an Admin cannot fill the Training form from a Preset today.
  // backend.aPreset({ kind: "training", ... }) is ready for this scenario.
  test.fixme(
    "an Admin creates a Training from a Preset and it appears with the Preset's time, Groups, Highlights and trailer",
    async () => {},
  );

  test("an Admin creates a Multi-day event from a Preset", async ({ page, backend }) => {
    const calendar = calendarPage(page);
    const dialog = eventDialog(page);

    await Given("a Multi-day event Preset and a signed-in Admin on the calendar", async () => {
      await backend.aPreset({ kind: "multiDayEvent", title: "Kevadlaager" });
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

  // "Loo preset" in the Training tab saves a Training Preset, but the picker that would offer it
  // (Presets.tsx) is commented out in NormalEventCreationTab.tsx:141, so it can never be picked.
  test.fixme(
    "an Admin saves a Training as a Preset and can then pick it when creating a Training",
    async () => {},
  );

  // Training Presets are deleted only from the picker in Presets.tsx, which is commented out in
  // NormalEventCreationTab.tsx:141. Multi-day event Presets (the titles offered in the Multi-day
  // event tab, ComboboxEventCreationMultiDayEvent.tsx) have no way to be deleted at all.
  test.fixme("an Admin deletes a Preset and it is no longer offered", async () => {});
});
