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

  test("a visitor switches between month and day views and sees the same Training in each", async ({
    page,
    backend,
  }) => {
    const calendar = calendarPage(page);

    await Given("a Training for Group A on Tuesday 10 March at 18:00", () =>
      backend.aTraining({
        start: "2026-03-10T18:00:00+02:00",
        end: "2026-03-10T19:30:00+02:00",
        groups: ["A"],
      }),
    );

    await When(
      "a visitor opens the calendar, shows Group A and switches to the day view",
      async () => {
        await calendar.open();
        await calendar.showGroup("A");
        await expect(calendar.day("2026-03-10")).toContainText(/18:00\s*A/);
        await calendar.switchView("Päev");
      },
    );

    await Then("today's Training is shown in the day view", async () => {
      await expect(calendar.dayView()).toContainText("märts 10");
      await expect(calendar.dayView()).toContainText(/18:00\s*A/);
    });

    await When("the visitor switches back to the month view", () => calendar.switchView("Kuu"));

    await Then("the Training is shown on its day again", async () => {
      await expect(calendar.day("2026-03-10")).toContainText(/18:00\s*A/);
    });
  });

  test("a visitor moves to the next and previous month and sees that month's Events", async ({
    page,
    backend,
  }) => {
    const calendar = calendarPage(page);

    await Given("Group A Trainings on 10 March and on 14 April at 18:00", async () => {
      await backend.aTraining({
        start: "2026-03-10T18:00:00+02:00",
        end: "2026-03-10T19:30:00+02:00",
        groups: ["A"],
      });
      await backend.aTraining({
        start: "2026-04-14T18:00:00+03:00",
        end: "2026-04-14T19:30:00+03:00",
        groups: ["A"],
      });
    });

    await When("a visitor shows Group A and moves to the next month", async () => {
      await calendar.open();
      await calendar.showGroup("A");
      await calendar.nextMonth();
    });

    await Then("April's Training is shown", async () => {
      await expect(calendar.monthHeading()).toHaveText("Aprill 2026");
      await expect(calendar.day("2026-04-14")).toContainText(/18:00\s*A/);
    });

    await When("the visitor moves to the previous month", () => calendar.previousMonth());

    await Then("March's Training is shown again", async () => {
      await expect(calendar.monthHeading()).toHaveText("Märts 2026");
      await expect(calendar.day("2026-03-10")).toContainText(/18:00\s*A/);
    });
  });

  test("a visitor filters to one Group and only that Group's Trainings are shown", async ({
    page,
    backend,
  }) => {
    const calendar = calendarPage(page);

    await Given(
      "on 10 March a Group A Training at 18:00 and a Group V Training at 17:00",
      async () => {
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
      },
    );

    await When("a visitor opens the calendar and shows Group V", async () => {
      await calendar.open();
      await calendar.showGroup("V");
    });

    await Then("only the Group V Training is shown on that day", async () => {
      await expect(calendar.day("2026-03-10")).toContainText(/17:00\s*V/);
      await expect(calendar.day("2026-03-10")).not.toContainText("18:00");
    });

    await Then("the Group is kept in the page address", async () => {
      await expect(page).toHaveURL(/[?&]group=V(&|$)/);
    });
  });

  test("a visitor opening a link with a Group in the address sees that Group's Trainings", async ({
    page,
    backend,
  }) => {
    const calendar = calendarPage(page);

    await Given(
      "on 10 March a Group A Training at 18:00 and a Group V Training at 17:00",
      async () => {
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
      },
    );

    await When("a visitor opens a link to the calendar for Group V", () =>
      calendar.open({ group: "V" }),
    );

    await Then("the calendar is already filtered to Group V", async () => {
      await expect(calendar.day("2026-03-10")).toContainText(/17:00\s*V/);
      await expect(calendar.day("2026-03-10")).not.toContainText("18:00");
    });
  });

  test("an All-day event shows its title and subtitle on its day", async ({ page, backend }) => {
    const calendar = calendarPage(page);

    await Given("an All-day event on Saturday 14 March", () =>
      backend.anAllDayEvent({
        date: "2026-03-14",
        title: "Eesti meistrivõistlused",
        subtitle: "Tallinn, Kalevi spordihall",
      }),
    );

    await When("a visitor opens the calendar", () => calendar.open());

    await Then("its title and subtitle are shown on that day", async () => {
      await expect(calendar.day("2026-03-14")).toContainText("Eesti meistrivõistlused");
      await expect(calendar.day("2026-03-14")).toContainText("Tallinn, Kalevi spordihall");
    });
  });

  test("a Multi-day event shows on every day it spans", async ({ page, backend }) => {
    const calendar = calendarPage(page);

    await Given("a Multi-day event from Thursday 12 to Saturday 14 March", () =>
      backend.aMultiDayEvent({ from: "2026-03-12", to: "2026-03-14", title: "Kevadlaager" }),
    );

    await When("a visitor opens the calendar in the day view on 11 March", async () => {
      await calendar.open();
      await calendar.switchView("Päev");
      await calendar.nextDay();
      await expect(calendar.dayView()).toContainText("märts 11");
    });

    await Then("the event is not shown the day before it starts", async () => {
      await expect(calendar.dayView()).not.toContainText("Kevadlaager");
    });

    for (const day of ["märts 12", "märts 13", "märts 14"]) {
      // Sequential on purpose: each step moves the calendar one day on
      // eslint-disable-next-line no-await-in-loop
      await Then(`the event is shown on ${day}`, async () => {
        await calendar.nextDay();
        await expect(calendar.dayView()).toContainText(day);
        await expect(calendar.dayView()).toContainText("Kevadlaager");
      });
    }

    await Then("the event is not shown the day after it ends", async () => {
      await calendar.nextDay();
      await expect(calendar.dayView()).toContainText("märts 15");
      await expect(calendar.dayView()).not.toContainText("Kevadlaager");
    });
  });

  test("a Training shows its trailer text", async ({ page, backend }) => {
    const calendar = calendarPage(page);

    await Given("a Group A Training on 10 March at 18:00 with the exam trailer", () =>
      backend.aTraining({
        start: "2026-03-10T18:00:00+02:00",
        end: "2026-03-10T19:30:00+02:00",
        groups: ["A"],
        trailer: "- EKSAM",
      }),
    );

    await When("a visitor opens the calendar and shows Group A", async () => {
      await calendar.open({ group: "A" });
    });

    await Then("the trailer is shown after the Training's Groups", async () => {
      await expect(calendar.day("2026-03-10")).toContainText(/18:00\s*A\s*- EKSAM/);
    });
  });

  test("a visitor downloads the calendar as an image named after the Group and month", async ({
    page,
  }) => {
    const calendar = calendarPage(page);

    await Given("a visitor viewing the calendar for Group A", () => calendar.open({ group: "A" }));

    const image = await When("the visitor downloads the calendar", () => calendar.download("A"));

    await Then("they receive a PNG image named after Group A and March 2026", async () => {
      expect(image.name).toBe("kalender-A-märts-2026.png");
      // Every PNG file starts with these eight bytes
      expect(image.content.subarray(0, 8)).toEqual(
        Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]),
      );
    });
  });
});
