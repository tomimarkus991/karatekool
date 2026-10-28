import { calendarPage } from "../pages/calendar";
import { eventDialog } from "../pages/event-dialog";
import type { TestBackend } from "../support/backend/port";
import { Given, Then, When } from "../support/bdd";
import { expect, test } from "../support/fixtures";

/** On 10 March: Falco Cup at 18:00, a Group A Training at 17:00 and a Talvelaager Training at 12:00 */
const aMixedTuesday = async (backend: TestBackend) => {
  await backend.aTraining({
    start: "2026-03-10T18:00:00+02:00",
    end: "2026-03-10T19:30:00+02:00",
    groups: [],
    name: "Falco Cup",
  });
  await backend.aTraining({
    start: "2026-03-10T17:00:00+02:00",
    end: "2026-03-10T18:00:00+02:00",
    groups: ["A"],
  });
  await backend.aTraining({
    start: "2026-03-10T12:00:00+02:00",
    end: "2026-03-10T13:00:00+02:00",
    groups: [],
    name: "Talvelaager",
  });
};

test.describe("Named Trainings", () => {
  test("an Admin creates a Named Training with no Groups and visitors see it under all", async ({
    page,
    backend,
  }) => {
    const calendar = calendarPage(page);
    const dialog = eventDialog(page);

    await Given("a signed-in Admin on the calendar", async () => {
      await backend.anAdmin();
      await calendar.open();
    });

    await When("they create a Training today at 18:00 named Falco Cup with no Groups", async () => {
      await calendar.createEvent();
      await dialog.createTraining({ time: "18:00", name: "Falco Cup" });
    });

    await Then("a visitor showing all Trainings sees its name where Groups go", async () => {
      await page.context().clearCookies();
      await calendar.open({ group: "all" });
      await expect(calendar.day("2026-03-10")).toContainText(/18:00\s*Falco Cup/);
    });
  });

  test("an Admin moves a Named Training and it keeps its name", async ({ page, backend }) => {
    const calendar = calendarPage(page);
    const dialog = eventDialog(page);

    await Given("Falco Cup on 10 March at 18:00 and a signed-in Admin", async () => {
      await backend.aTraining({
        start: "2026-03-10T18:00:00+02:00",
        end: "2026-03-10T19:30:00+02:00",
        groups: [],
        name: "Falco Cup",
      });
      await backend.anAdmin();
    });

    await When("the Admin opens the Training to edit it", async () => {
      await calendar.open({ group: "all" });
      await calendar.editTraining(calendar.day("2026-03-10"), "18:00");
    });

    await Then("its name is filled in", async () => {
      expect(await dialog.trainingName()).toBe("Falco Cup");
    });

    await When("they move it to 17:30 and save", () => dialog.updateTraining({ time: "17:30" }));

    await Then("a visitor sees Falco Cup at 17:30", async () => {
      await page.context().clearCookies();
      await calendar.open({ group: "all" });
      await expect(calendar.day("2026-03-10")).toContainText(/17:30\s*Falco Cup/);
      await expect(calendar.day("2026-03-10")).not.toContainText("18:00");
    });
  });

  test("a visitor chooses a Named Training's button and sees only Trainings with that name", async ({
    page,
    backend,
  }) => {
    const calendar = calendarPage(page);

    await Given("on 10 March Falco Cup at 18:00, Group A at 17:00 and Talvelaager at 12:00", () =>
      aMixedTuesday(backend),
    );

    await When("a visitor opens the calendar and chooses Falco Cup", async () => {
      await calendar.open();
      await calendar.showNamedTraining("Falco Cup");
    });

    await Then("only Falco Cup is shown on that day", async () => {
      const day = calendar.day("2026-03-10");
      await expect(day).toContainText(/18:00\s*Falco Cup/);
      await expect(day).not.toContainText("17:00");
      await expect(day).not.toContainText("Talvelaager");
    });
  });

  test("a visitor choosing a Group does not see Named Trainings", async ({ page, backend }) => {
    const calendar = calendarPage(page);

    await Given("on 10 March Falco Cup at 18:00, Group A at 17:00 and Talvelaager at 12:00", () =>
      aMixedTuesday(backend),
    );

    await When("a visitor opens the calendar and shows Group A", async () => {
      await calendar.open();
      await calendar.showGroup("A");
    });

    await Then("only the Group A Training is shown on that day", async () => {
      const day = calendar.day("2026-03-10");
      await expect(day).toContainText(/17:00\s*A/);
      await expect(day).not.toContainText("Falco Cup");
      await expect(day).not.toContainText("Talvelaager");
    });
  });

  test("each name used in the shown month gets one filter button", async ({ page, backend }) => {
    const calendar = calendarPage(page);

    await Given("two Falco Cup Trainings and one Talvelaager in March", async () => {
      await aMixedTuesday(backend);
      await backend.aTraining({
        start: "2026-03-12T18:00:00+02:00",
        end: "2026-03-12T19:30:00+02:00",
        groups: [],
        name: "Falco Cup",
      });
    });

    await When("a visitor opens the calendar", () => calendar.open());

    await Then("there is one button for Falco Cup and one for Talvelaager", async () => {
      await expect(calendar.namedTrainingButtons()).toHaveCount(2);
      await expect(calendar.namedTrainingButtons().filter({ hasText: "Falco Cup" })).toHaveCount(1);
      await expect(calendar.namedTrainingButtons().filter({ hasText: "Talvelaager" })).toHaveCount(
        1,
      );
    });
  });

  test("a month without Named Trainings shows no extra filter buttons", async ({
    page,
    backend,
  }) => {
    const calendar = calendarPage(page);

    await Given("a Group A Training in March and Falco Cup only in May", async () => {
      await backend.aTraining({
        start: "2026-03-10T18:00:00+02:00",
        end: "2026-03-10T19:30:00+02:00",
        groups: ["A"],
      });
      await backend.aTraining({
        start: "2026-05-12T18:00:00+03:00",
        end: "2026-05-12T19:30:00+03:00",
        groups: [],
        name: "Falco Cup",
      });
    });

    await When("a visitor opens the calendar on March", async () => {
      await calendar.open({ group: "A" });
      await expect(calendar.day("2026-03-10")).toContainText(/18:00\s*A/);
    });

    await Then("there are only the Group buttons", async () => {
      await expect(calendar.namedTrainingButtons()).toHaveCount(0);
    });

    await When("the visitor moves on to May", async () => {
      await calendar.nextMonth();
      await calendar.nextMonth();
      await expect(calendar.monthHeading()).toHaveText("Mai 2026");
    });

    await Then("Falco Cup has its button there", async () => {
      await expect(calendar.namedTrainingButtons()).toHaveCount(1);
      await expect(calendar.namedTrainingButtons()).toContainText("Falco Cup");
    });
  });

  test("a visitor downloads the calendar of a Named Training as an image named after it", async ({
    page,
    backend,
  }) => {
    const calendar = calendarPage(page);

    await Given("Falco Cup on 10 March", () =>
      backend.aTraining({
        start: "2026-03-10T18:00:00+02:00",
        end: "2026-03-10T19:30:00+02:00",
        groups: [],
        name: "Falco Cup",
      }),
    );

    await When("a visitor chooses Falco Cup", async () => {
      await calendar.open();
      await calendar.showNamedTraining("Falco Cup");
      await expect(calendar.day("2026-03-10")).toContainText(/18:00\s*Falco Cup/);
    });

    const image = await When("the visitor downloads the calendar", () =>
      calendar.downloadNamedTraining("Falco Cup"),
    );

    await Then("they receive a PNG image named after Falco Cup and March 2026", async () => {
      expect(image.name).toBe("kalender-Falco-Cup-märts-2026.png");
      // Every PNG file starts with these eight bytes
      expect(image.content.subarray(0, 8)).toEqual(
        Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]),
      );
    });
  });
});
