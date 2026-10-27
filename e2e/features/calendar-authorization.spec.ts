import { calendarPage } from "../pages/calendar";
import { eventDialog } from "../pages/event-dialog";
import { Given, Then, When } from "../support/bdd";
import { expect, test } from "../support/fixtures";

// Calls made straight to the backend, bypassing the site, as someone trying to tamper with the
// calendar would. This is the authorization behaviour the Spring backend must reproduce.
test.describe("Only Admins can change the calendar", () => {
  const existingTraining = {
    start: "2026-03-10T18:00:00+02:00",
    end: "2026-03-10T19:30:00+02:00",
    groups: ["A" as const],
    description: "karate seminar",
  };
  const newTraining = {
    start: "2026-03-12T17:00:00+02:00",
    end: "2026-03-12T18:00:00+02:00",
    groups: ["A" as const],
  };

  const existingMultiDayPreset = { title: "Suvelaager" };
  const newMultiDayPreset = { title: "Talvelaager" };

  for (const who of ["a Member who is not an Admin", "a visitor"] as const) {
    test(`${who} is refused when changing Events directly`, async ({ page, backend }) => {
      const calendar = calendarPage(page);

      await Given("a Group A Training on 10 March at 18:00 about a karate seminar", () =>
        backend.aTraining(existingTraining),
      );
      const actor = await Given(who, async () =>
        who === "a visitor" ? ("visitor" as const) : backend.aMember(),
      );

      const attempt = backend.attemptAs(actor);
      await When("they try to create, change and delete Trainings directly", async () => {
        expect(await attempt.createTraining(newTraining), "create").toBe(false);
        expect(
          await attempt.changeTrainingDescription(existingTraining.start, "cancelled"),
          "change",
        ).toBe(false);
        expect(await attempt.deleteTraining(existingTraining.start), "delete").toBe(false);
      });

      await Then("a visitor still sees the calendar unchanged", async () => {
        await page.context().clearCookies();
        await calendar.open({ group: "A" });
        await expect(calendar.day("2026-03-10")).toContainText(/18:00\s*A\s*karate seminar/);
        await expect(calendar.day("2026-03-12")).not.toContainText("17:00");
      });
    });

    test(`${who} is refused when changing Presets directly`, async ({ page, backend }) => {
      const calendar = calendarPage(page);
      const dialog = eventDialog(page);

      await Given("a Multi-day event Preset called Suvelaager", async () => {
        await backend.aPreset(existingMultiDayPreset);
      });
      const actor = await Given(who, async () =>
        who === "a visitor" ? ("visitor" as const) : backend.aMember(),
      );

      const attempt = backend.attemptAs(actor);
      await When("they try to save and delete Presets directly", async () => {
        expect(await attempt.savePreset(newMultiDayPreset), "save").toBe(false);
        expect(await attempt.deletePreset(existingMultiDayPreset), "delete").toBe(false);
      });

      await Then("an Admin is offered only the existing Multi-day event Preset", async () => {
        await page.context().clearCookies();
        await backend.anAdmin();
        await calendar.open();
        await calendar.createEvent();
        expect(await dialog.multiDayEventPresets()).toEqual(["Suvelaager"]);
      });
    });

    test(`${who} is not offered the controls for changing the calendar`, async ({
      page,
      backend,
    }) => {
      const calendar = calendarPage(page);

      await Given("a Group A Training on 10 March at 18:00 about a karate seminar", () =>
        backend.aTraining(existingTraining),
      );
      if (who !== "a visitor") await Given(who, () => backend.aMember());

      await When("they open the calendar and click the Training", async () => {
        await calendar.open({ group: "A" });
        await calendar.openTraining(calendar.day("2026-03-10"), "18:00");
      });

      await Then("they see no way to create, edit or delete Events", async () => {
        await expect(page.getByRole("button", { name: "Loo trenn" })).toHaveCount(0);
        await expect(calendar.deleteButton()).toHaveCount(0);
        await expect(calendar.editButton()).toHaveCount(0);
      });
    });
  }

  test("an Admin making the same direct calls is allowed", async ({ page, backend }) => {
    const calendar = calendarPage(page);

    await Given("a Group A Training on 10 March at 18:00 about a karate seminar", () =>
      backend.aTraining(existingTraining),
    );
    const admin = await Given("an Admin", () => backend.anAdmin());

    const attempt = backend.attemptAs(admin);
    await When("they create a Training and change the existing one directly", async () => {
      expect(await attempt.createTraining(newTraining), "create").toBe(true);
      expect(
        await attempt.changeTrainingDescription(existingTraining.start, "cancelled"),
        "change",
      ).toBe(true);
    });

    await Then("a visitor sees both changes", async () => {
      await page.context().clearCookies();
      await calendar.open({ group: "A" });
      await expect(calendar.day("2026-03-10")).toContainText(/18:00\s*A\s*cancelled/);
      await expect(calendar.day("2026-03-12")).toContainText(/17:00\s*A/);
    });

    await When("they delete the changed Training directly", async () => {
      expect(await attempt.deleteTraining(existingTraining.start), "delete").toBe(true);
    });

    await Then("a visitor no longer sees it", async () => {
      await calendar.open({ group: "A" });
      await expect(calendar.day("2026-03-12")).toContainText(/17:00\s*A/);
      await expect(calendar.day("2026-03-10")).not.toContainText("18:00");
    });
  });

  test("an Admin making the same direct Preset calls is allowed", async ({ page, backend }) => {
    const calendar = calendarPage(page);
    const dialog = eventDialog(page);

    await Given("a Multi-day event Preset called Suvelaager", async () => {
      await backend.aPreset(existingMultiDayPreset);
    });
    const admin = await Given("an Admin", () => backend.anAdmin());

    const attempt = backend.attemptAs(admin);
    await When("they save a new Preset and delete the existing one directly", async () => {
      expect(await attempt.savePreset(newMultiDayPreset), "save").toBe(true);
      expect(await attempt.deletePreset(existingMultiDayPreset), "delete").toBe(true);
    });

    await Then("the Admin is offered only the new Multi-day event Preset", async () => {
      await calendar.open();
      await calendar.createEvent();
      expect(await dialog.multiDayEventPresets()).toEqual(["Talvelaager"]);
    });
  });

  test("an Admin is offered the controls for changing the calendar", async ({ page, backend }) => {
    const calendar = calendarPage(page);

    await Given("a Group A Training on 10 March at 18:00 about a karate seminar", () =>
      backend.aTraining(existingTraining),
    );
    await Given("a signed-in Admin", () => backend.anAdmin());

    await When("they open the calendar and click the Training", async () => {
      await calendar.open({ group: "A" });
      await calendar.openTraining(calendar.day("2026-03-10"), "18:00");
    });

    await Then("they can create, edit and delete Events", async () => {
      await expect(page.getByRole("button", { name: "Loo trenn" })).toBeVisible();
      await expect(calendar.deleteButton()).toBeVisible();
      await expect(calendar.editButton()).toBeVisible();
    });
  });
});
