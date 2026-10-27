import { questionFormPage } from "../pages/question-form";
import { Given, Then, When } from "../support/bdd";
import { expect, test } from "../support/fixtures";

const CLUB_INBOX = "info@karatekool.ee";

const KATI_ASKS = {
  name: "Kati Maasikas",
  email: "kati@example.com",
  question: "Kas proovitrenni võib tulla ilma kimonota?",
};

test.describe("Question", () => {
  test("a visitor's Question reaches the club", async ({ page, backend }) => {
    const form = questionFormPage(page);

    await Given("a visitor on the Question form", () => form.open());

    await When("they send a Question as Kati Maasikas", () => form.send(KATI_ASKS));

    await Then("they see that the Question was sent", () =>
      expect(form.confirmation()).toBeVisible(),
    );

    await Then("the club receives the Question with replies going to the visitor", async () => {
      const mail = await backend.lastMailTo(CLUB_INBOX);
      expect(mail?.subject).toBe("Küsimus Kati Maasikas");
      expect(mail?.to).toEqual([CLUB_INBOX]);
      expect(mail?.replyTo).toEqual(["kati@example.com"]);
      expect(mail?.body).toContain("Kas proovitrenni võib tulla ilma kimonota?");
    });
  });

  test("a Question with missing or invalid fields shows what to fix and is not sent", async ({
    page,
    backend,
  }) => {
    const form = questionFormPage(page);

    await Given("a visitor on the Question form", () => form.open());

    await When("they send a Question with no text, an invalid email and a two-letter name", () =>
      form.send({ name: "Ka", email: "kati.example.com" }),
    );

    await Then("each field says in Estonian what to fix", async () => {
      await expect(form.field("Küsimus?")).toHaveAccessibleDescription("Vajalik");
      await expect(form.field("Email")).toHaveAccessibleDescription("Email peab olema päris");
      await expect(form.field("Nimi")).toHaveAccessibleDescription(
        "Peab olema vähemalt 3 tähemärki",
      );
    });

    await Then("the Question was not sent", async () => {
      await expect(form.confirmation()).toBeHidden();
      expect(await backend.lastMailTo(CLUB_INBOX)).toBeUndefined();
    });
  });

  test("a Question sent around the form with missing fields is refused and does not count towards the daily limit", async ({
    page,
    backend,
  }) => {
    const form = questionFormPage(page);

    await When("a script sends five Questions with Kati's email but no name or text", async () => {
      for (let sent = 0; sent < 5; sent += 1) {
        // eslint-disable-next-line no-await-in-loop
        expect(await form.sendDirectly({ email: KATI_ASKS.email })).toBe(false);
      }
    });

    await Then("the club received none of them", async () => {
      expect(await backend.lastMailTo(CLUB_INBOX)).toBeUndefined();
    });

    await Then("Kati can still send a Question from the form", async () => {
      await form.open();
      await form.send(KATI_ASKS);
      await expect(form.confirmation()).toBeVisible();
    });
  });

  test("a sixth Question from the same email address within a day is refused", async ({
    page,
    backend,
  }) => {
    const form = questionFormPage(page);

    await Given("a visitor who has already sent five Questions today", async () => {
      for (let sent = 0; sent < 5; sent += 1) {
        // One after another on purpose: each needs a fresh form and must be sent before the next
        // eslint-disable-next-line no-await-in-loop
        await form.open();
        // eslint-disable-next-line no-await-in-loop
        await form.send(KATI_ASKS);
        // eslint-disable-next-line no-await-in-loop
        await expect(form.confirmation()).toBeVisible();
      }
    });

    await When("they send a sixth Question", async () => {
      await form.open();
      await form.send(KATI_ASKS);
    });

    await Then("they see that they have reached today's limit", async () => {
      await expect(form.dailyLimit()).toBeVisible();
      await expect(form.confirmation()).toBeHidden();
    });

    await Then("the club received only the first five Questions", async () => {
      const mails = await backend.mailsTo(CLUB_INBOX);
      expect(mails).toHaveLength(5);
    });
  });
});
