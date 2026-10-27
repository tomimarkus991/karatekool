import { calendarPage } from "../pages/calendar";
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
});
