import type { Page } from "@playwright/test";

export interface Question {
  name: string;
  email: string;
  question: string;
}

export const questionFormPage = (page: Page) => {
  const field = (label: string) => page.getByLabel(label, { exact: true });

  return {
    open: () => page.goto("/question"),

    /** Fill and send a Question; fields left out stay empty. */
    send: async (question: Partial<Question>) => {
      if (question.email !== undefined) await field("Email").fill(question.email);
      if (question.name !== undefined) await field("Nimi").fill(question.name);
      if (question.question !== undefined) await field("Küsimus?").fill(question.question);

      await page.getByRole("button", { name: "Saada küsimus", exact: true }).click();
    },

    /** A form field by its label; its accessible description is the field's error, if any. */
    field,

    confirmation: () => page.getByText("Küsimus saadetud!"),

    /** Shown when the site does not accept the Question, including over the daily limit. */
    failure: () =>
      page.getByText(
        "Küsimuse saatmine ebaõnnestus. Palun proovi uuesti või kirjuta aadressil info@karatekool.ee",
      ),
  };
};
