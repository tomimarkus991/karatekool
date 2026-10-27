import { calendarPage } from "../pages/calendar";
import { profilePage } from "../pages/profile";
import type { TestBackend } from "../support/backend/port";
import { Given, Then, When } from "../support/bdd";
import { expect, test } from "../support/fixtures";

const trainingsForGroupsAAndV = async (backend: TestBackend) => {
  await backend.aTraining({
    start: "2026-03-10T18:00:00+02:00",
    end: "2026-03-10T19:30:00+02:00",
    groups: ["A"],
  });
  await backend.aTraining({
    start: "2026-03-10T17:00:00+02:00",
    end: "2026-03-10T18:00:00+02:00",
    groups: ["V"],
  });
};

test.describe("Member preferences", () => {
  test("a Member chooses a Group in their profile and the calendar opens filtered to that Group", async ({
    page,
    backend,
  }) => {
    const calendar = calendarPage(page);
    const profile = profilePage(page);

    await Given("on 10 March a Group A Training at 18:00 and a Group V Training at 17:00", () =>
      trainingsForGroupsAAndV(backend),
    );

    await Given("a signed-in Member on the calendar", async () => {
      await backend.aMember();
      await calendar.open();
    });

    await When("they choose Group V in their profile", () =>
      profile.choosePreferences({ group: "V" }),
    );

    await When("they open the calendar again", () => calendar.open());

    await Then("the calendar is filtered to Group V", async () => {
      await expect(calendar.day("2026-03-10")).toContainText(/17:00\s*V/);
      await expect(calendar.day("2026-03-10")).not.toContainText("18:00");
    });
  });

  test("a Member chooses day view as their default and the calendar opens in day view", async ({
    page,
    backend,
  }) => {
    const calendar = calendarPage(page);
    const profile = profilePage(page);

    await Given("a signed-in Member on the calendar", async () => {
      await backend.aMember();
      await calendar.open();
    });

    await When("they choose day view in their profile", () =>
      profile.choosePreferences({ calendarType: "Päev" }),
    );

    await When("they open the calendar again", () => calendar.open());

    await Then("the calendar opens in day view on today", async () => {
      await expect(calendar.dayView()).toContainText("märts 10");
    });
  });

  test("a Member chooses month view as their default and the calendar opens in month view", async ({
    page,
    backend,
  }) => {
    const calendar = calendarPage(page);
    const profile = profilePage(page);

    await Given("a signed-in Member whose calendar opens in day view", async () => {
      await backend.aMember({ calendarType: "Päev" });
      await calendar.open();
      await expect(calendar.dayView()).toContainText("märts 10");
    });

    await When("they choose month view in their profile", () =>
      profile.choosePreferences({ calendarType: "Kuu" }),
    );

    await When("they open the calendar again", async () => {
      await calendar.open();
      // The month view also shows before the site knows who is signed in
      await expect(profile.menuButton()).toBeVisible();
    });

    await Then("the calendar opens in month view", async () => {
      await expect(calendar.monthHeading()).toHaveText("Märts 2026");
      await expect(calendar.day("2026-03-10")).toBeVisible();
      await expect(calendar.dayView()).toHaveCount(0);
    });
  });

  test("a Member's preferences still apply after they sign out and sign in again", async ({
    page,
    backend,
  }) => {
    const calendar = calendarPage(page);
    const profile = profilePage(page);

    await Given("on 10 March a Group A Training at 18:00 and a Group V Training at 17:00", () =>
      trainingsForGroupsAAndV(backend),
    );

    const member = await Given("a signed-in Member on the calendar", async () => {
      const person = await backend.aMember();
      await calendar.open();
      return person;
    });

    await Given("they have chosen Group V and day view in their profile", () =>
      profile.choosePreferences({ group: "V", calendarType: "Päev" }),
    );

    await When("they sign out and sign in again", async () => {
      await profile.signOut();
      await backend.signIn(member);
    });

    await When("they open the calendar", () => calendar.open());

    await Then("the calendar opens in day view filtered to Group V", async () => {
      await expect(calendar.dayView()).toContainText("märts 10");
      await expect(calendar.dayView()).toContainText(/17:00\s*V/);
      await expect(calendar.trainingTime(calendar.dayView(), "18:00")).toHaveCount(0);
    });
  });

  test("a Member opening a link with a different Group in the address sees that Group, not their saved one", async ({
    page,
    backend,
  }) => {
    const calendar = calendarPage(page);
    const profile = profilePage(page);

    await Given("on 10 March a Group A Training at 18:00 and a Group V Training at 17:00", () =>
      trainingsForGroupsAAndV(backend),
    );

    await Given("a signed-in Member whose saved Group is A", () => backend.aMember({ group: "A" }));

    await When("they open a link to the calendar for Group V", async () => {
      await calendar.open({ group: "V" });
      // Their saved Group only comes into play once the site knows who is signed in
      await expect(profile.menuButton()).toBeVisible();
    });

    await Then("the calendar shows Group V's Trainings, not Group A's", async () => {
      await expect(calendar.day("2026-03-10")).toContainText(/17:00\s*V/);
      await expect(calendar.day("2026-03-10")).not.toContainText("18:00");
    });

    await Then("Group V stays in the page address", async () => {
      await expect(page).toHaveURL(/[?&]group=V(&|$)/);
    });
  });
});
