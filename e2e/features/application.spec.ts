import { applicationFormPage } from "../pages/application-form";
import { Given, Then, When } from "../support/bdd";
import { expect, test } from "../support/fixtures";

const CLUB_INBOX = "info@karatekool.ee";

const JAAN_TAMM = {
  firstName: "Jaan",
  lastName: "Tamm",
  birthDate: "1990-05-17",
  phone: "+372 5555 0003",
  email: "jaan@example.com",
};

test.describe("Application", () => {
  test("a Guardian's Application for their child reaches the club", async ({ page, backend }) => {
    const form = applicationFormPage(page);

    await Given("a Guardian on the Application form", () => form.open());

    await When("they submit an Application for their child Mari Maasikas", () =>
      form.submitForChild({
        child: {
          firstName: "Mari",
          lastName: "Maasikas",
          personalCode: "61503104214",
          phone: "+372 5555 0001",
          email: "mari@example.com",
          address: "Tamme 1, Tallinn",
          school: "Nõmme Põhikool",
          grade: "4",
        },
        guardian: { name: "Kati Maasikas", phone: "+372 5555 0002", email: "kati@example.com" },
      }),
    );

    await Then("they see that the Application was sent", () =>
      expect(form.confirmation()).toBeVisible(),
    );

    await Then("the club receives a child Application that replies to the Guardian", async () => {
      const mail = await backend.lastMailTo(CLUB_INBOX);
      expect(mail?.subject).toBe("Registreerimine (laps) Mari Maasikas");
      expect(mail?.to).toEqual([CLUB_INBOX]);
      expect(mail?.replyTo).toEqual(["kati@example.com"]);
    });
  });

  test("an adult's Application for themselves reaches the club", async ({ page, backend }) => {
    const form = applicationFormPage(page);

    await Given("an adult on the Application form", () => form.open());

    await When("they submit an Application for themselves as Jaan Tamm", () =>
      form.submitForAdult(JAAN_TAMM),
    );

    await Then("they see that the Application was sent", () =>
      expect(form.confirmation()).toBeVisible(),
    );

    await Then("the club receives an adult Application that replies to the adult", async () => {
      const mail = await backend.lastMailTo(CLUB_INBOX);
      expect(mail?.subject).toBe("Registreerimine (täiskasvanu) Jaan Tamm");
      expect(mail?.to).toEqual([CLUB_INBOX]);
      expect(mail?.replyTo).toEqual(["jaan@example.com"]);
    });
  });

  test("an Application with missing or invalid fields shows what to fix and is not sent", async ({
    page,
    backend,
  }) => {
    const form = applicationFormPage(page);

    await Given("an adult on the Application form", () => form.open());

    await When("they submit an Application without a last name and with an invalid email", () =>
      form.submitForAdult({
        firstName: "Jaan",
        birthDate: "1990-05-17",
        phone: "+372 5555 0003",
        email: "jaan.example.com",
      }),
    );

    await Then("the last name is marked as required and the email as invalid", async () => {
      await expect(form.field("Perekonnanimi")).toHaveAccessibleDescription("Vajalik");
      await expect(form.field("Email")).toHaveAccessibleDescription("Email peab olema päris");
      await expect(form.field("Eesnimi")).toHaveAccessibleDescription("");
    });

    await Then("the Application was not sent", async () => {
      await expect(form.confirmation()).toBeHidden();
      expect(await backend.lastMailTo(CLUB_INBOX)).toBeUndefined();
    });
  });

  test("a sixth Application from the same email address within a day is refused", async ({
    page,
    backend,
  }) => {
    const form = applicationFormPage(page);

    await Given("an adult who has already submitted five Applications today", async () => {
      for (let sent = 0; sent < 5; sent += 1) {
        // One after another on purpose: each needs a fresh form and must be sent before the next
        // eslint-disable-next-line no-await-in-loop
        await form.open();
        // eslint-disable-next-line no-await-in-loop
        await form.submitForAdult(JAAN_TAMM);
        // eslint-disable-next-line no-await-in-loop
        await expect(form.confirmation()).toBeVisible();
      }
    });

    await When("they submit a sixth Application", async () => {
      await form.open();
      await form.submitForAdult(JAAN_TAMM);
    });

    await Then("they see that the Application was not sent", async () => {
      await expect(form.failure()).toBeVisible();
      await expect(form.confirmation()).toBeHidden();
    });

    await Then("the club received only the first five Applications", async () => {
      const mails = await backend.mailsTo(CLUB_INBOX);
      expect(mails).toHaveLength(5);
    });
  });
});
