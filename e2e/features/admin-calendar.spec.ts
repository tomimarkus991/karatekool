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

  test("an Admin attaches a trailer to a Training and visitors see it", async ({
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
      "they create a Training today at 18:00 for Group A with the exam trailer",
      async () => {
        await calendar.createEvent();
        await dialog.createTraining({ time: "18:00", groups: ["A"], trailer: "- EKSAM" });
      },
    );

    await Then("a visitor sees the trailer after the Training's Groups", async () => {
      await page.context().clearCookies();
      await calendar.open({ group: "A" });
      await expect(calendar.day("2026-03-10")).toContainText(/18:00\s*A\s*- EKSAM/);
    });
  });

  test("an Admin edits a Training's time and Groups and visitors see the change", async ({
    page,
    backend,
  }) => {
    const calendar = calendarPage(page);
    const dialog = eventDialog(page);

    await Given("a Group A Training on 10 March at 18:00 and a signed-in Admin", async () => {
      await backend.aTraining({
        start: "2026-03-10T18:00:00+02:00",
        end: "2026-03-10T19:30:00+02:00",
        groups: ["A"],
      });
      await backend.anAdmin();
    });

    await When(
      "the Admin moves the Training to 17:30 and gives it to Group V instead",
      async () => {
        await calendar.open({ group: "A" });
        await calendar.editTraining(calendar.day("2026-03-10"), "18:00");
        await dialog.updateTraining({ time: "17:30", groups: ["V"] });
      },
    );

    await Then("a visitor sees the Training at 17:30 for Group V only", async () => {
      await page.context().clearCookies();
      await calendar.open({ group: "V" });
      const day = calendar.day("2026-03-10");
      await expect(day).toContainText(/17:30\s*V/);
      await expect(calendar.trainingGroup(day, "17:30", "A")).toHaveCount(0);
      await expect(day).not.toContainText("18:00");
    });
  });

  test("an Admin deletes a Training and it no longer appears", async ({ page, backend }) => {
    const calendar = calendarPage(page);

    await Given(
      "Group A Trainings on 10 March at 16:00 and 18:00 and a signed-in Admin",
      async () => {
        await backend.aTraining({
          start: "2026-03-10T16:00:00+02:00",
          end: "2026-03-10T17:00:00+02:00",
          groups: ["A"],
        });
        await backend.aTraining({
          start: "2026-03-10T18:00:00+02:00",
          end: "2026-03-10T19:30:00+02:00",
          groups: ["A"],
        });
        await backend.anAdmin();
      },
    );

    await When("the Admin deletes the 18:00 Training", async () => {
      await calendar.open({ group: "A" });
      await calendar.deleteTraining(calendar.day("2026-03-10"), "18:00");
    });

    await Then("a visitor sees only the 16:00 Training on that day", async () => {
      await page.context().clearCookies();
      await calendar.open({ group: "A" });
      await expect(calendar.day("2026-03-10")).toContainText(/16:00\s*A/);
      await expect(calendar.day("2026-03-10")).not.toContainText("18:00");
    });
  });

  test("an Admin creates an All-day event and visitors see its title and subtitle", async ({
    page,
    backend,
  }) => {
    const calendar = calendarPage(page);
    const dialog = eventDialog(page);

    await Given("a signed-in Admin on the calendar", async () => {
      await backend.anAdmin();
      await calendar.open();
    });

    await When("they create an All-day event today", async () => {
      await calendar.createEvent();
      await dialog.createAllDayEvent({
        title: "Eesti meistrivõistlused",
        subtitle: "Tallinn, Kalevi spordihall",
      });
    });

    await Then("a visitor sees its title and subtitle on 10 March", async () => {
      await page.context().clearCookies();
      await calendar.open();
      await expect(calendar.day("2026-03-10")).toContainText("Eesti meistrivõistlused");
      await expect(calendar.day("2026-03-10")).toContainText("Tallinn, Kalevi spordihall");
    });
  });

  test("an Admin creates a Multi-day event and visitors see it on every day it spans", async ({
    page,
    backend,
  }) => {
    const calendar = calendarPage(page);
    const dialog = eventDialog(page);

    await Given("a signed-in Admin on the calendar", async () => {
      await backend.anAdmin();
      await calendar.open();
    });

    await When("they create a Multi-day event with a new title from 12 to 14 March", async () => {
      await calendar.createEvent();
      // A Multi-day event's title is always one of the saved titles, so a new one is saved first
      await dialog.saveMultiDayEventPreset("Kevadlaager");
      await dialog.createMultiDayEvent({ firstDay: 12, lastDay: 14, title: "Kevadlaager" });
    });

    await When("a visitor opens the calendar in the day view on 11 March", async () => {
      await page.context().clearCookies();
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

  test("an Admin deletes an All-day event and a Multi-day event and they no longer appear", async ({
    page,
    backend,
  }) => {
    const calendar = calendarPage(page);

    await Given(
      "a Group A Training on 10 March, an All-day event on 17 March, a Multi-day event from 12 to 14 March and a signed-in Admin",
      async () => {
        await backend.aTraining({
          start: "2026-03-10T18:00:00+02:00",
          end: "2026-03-10T19:30:00+02:00",
          groups: ["A"],
        });
        await backend.anAllDayEvent({
          date: "2026-03-17",
          title: "Eesti meistrivõistlused",
          subtitle: "Tallinn, Kalevi spordihall",
        });
        await backend.aMultiDayEvent({
          from: "2026-03-12",
          to: "2026-03-14",
          title: "Kevadlaager",
        });
        await backend.anAdmin();
      },
    );

    await When("the Admin deletes the All-day event and the Multi-day event", async () => {
      await calendar.open({ group: "A" });
      await calendar.deleteTitledEvent(calendar.day("2026-03-17"), "Eesti meistrivõistlused");
      // In the month view a Multi-day event is one bar on its first day
      await calendar.deleteTitledEvent(calendar.day("2026-03-12"), "Kevadlaager");
    });

    await Then("a visitor sees neither of them, while the Training is still there", async () => {
      await page.context().clearCookies();
      await calendar.open({ group: "A" });
      await expect(calendar.day("2026-03-10")).toContainText(/18:00\s*A/);
      await expect(calendar.day("2026-03-17")).not.toContainText("Eesti meistrivõistlused");
      await expect(calendar.day("2026-03-12")).not.toContainText("Kevadlaager");
    });
  });

  test("an Admin deletes one of two Multi-day events with the same title and the other stays", async ({
    page,
    backend,
  }) => {
    const calendar = calendarPage(page);
    const dialog = eventDialog(page);

    await Given("a Multi-day event Preset and a signed-in Admin", async () => {
      await backend.aPreset({ kind: "multiDayEvent", title: "Kevadlaager" });
      await backend.anAdmin();
    });

    await Given("two Multi-day events from that Preset, 12–14 and 19–21 March", async () => {
      for (const [firstDay, lastDay] of [
        [12, 14],
        [19, 21],
      ]) {
        // Sequential on purpose: each one is created in a freshly opened dialog
        // eslint-disable-next-line no-await-in-loop
        await calendar.open();
        // eslint-disable-next-line no-await-in-loop
        await calendar.createEvent();
        // eslint-disable-next-line no-await-in-loop
        await dialog.createMultiDayEvent({ firstDay, lastDay, title: "Kevadlaager" });
      }
    });

    await When("the Admin deletes the first one", async () => {
      await calendar.open();
      await calendar.deleteTitledEvent(calendar.day("2026-03-12"), "Kevadlaager");
    });

    await Then("a visitor still sees the second one", async () => {
      await page.context().clearCookies();
      await calendar.open();
      await expect(calendar.day("2026-03-19")).toContainText("Kevadlaager");
      await expect(calendar.day("2026-03-12")).not.toContainText("Kevadlaager");
    });
  });
});
