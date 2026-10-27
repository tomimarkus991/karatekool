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
      // Leave the last field first: an error shown when it loses focus moves the button mid-click
      await page.locator(":focus").blur();

      await page.getByRole("button", { name: "Saada küsimus", exact: true }).click();
    },

    /** A form field by its label; its accessible description is the field's error, if any. */
    field,

    confirmation: () => page.getByText("Küsimus saadetud!"),

    /** Shown when sending the Question fails for any reason other than the daily limit. */
    failure: () =>
      page.getByText(
        "Küsimuse saatmine ebaõnnestus. Palun proovi uuesti või kirjuta aadressil info@karatekool.ee",
      ),

    /** Shown when the sender has reached the daily limit of Questions. */
    dailyLimit: () =>
      page.getByText(
        "Tänane saatmise limiit on täis. Proovi homme uuesti või kirjuta aadressil info@karatekool.ee",
      ),

    /**
     * Sends a Question straight to the site's Question endpoint, bypassing the form, as a script
     * would. Resolves to whether the site accepted it.
     */
    sendDirectly: async (body: Record<string, unknown>) =>
      (await page.request.post("/api/send-question", { data: body })).ok(),
  };
};
