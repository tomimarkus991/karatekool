import type { Page } from "@playwright/test";

export interface ChildApplication {
  child: {
    firstName: string;
    lastName: string;
    /** Estonian personal code, 11 digits */
    personalCode: string;
    phone: string;
    email: string;
    address: string;
    school: string;
    grade: string;
  };
  guardian: { name: string; phone: string; email: string };
}

export const applicationFormPage = (page: Page) => {
  const field = (label: string) => page.getByLabel(label, { exact: true });

  return {
    open: () => page.goto("/registreeri"),

    /** Fill and send an Application for a child; the Guardian is entered as the mother. */
    submitForChild: async ({ child, guardian }: ChildApplication) => {
      await page.getByRole("tab", { name: "Laps (7–19 a)" }).click();

      await field("Eesnimi").fill(child.firstName);
      await field("Perekonnanimi").fill(child.lastName);
      await field("Isikukood").fill(child.personalCode);
      await field("Lapse kontakttelefon").fill(child.phone);
      await field("Lapse email").fill(child.email);
      await field("Kodune aadress").fill(child.address);
      await field("Kool").fill(child.school);
      await field("Klass").fill(child.grade);
      await page.getByRole("radio", { name: "Põhiala" }).check();

      const mother = page.getByRole("group", { name: "Ema" });
      await mother.getByLabel("Nimi", { exact: true }).fill(guardian.name);
      await mother.getByLabel("Telefon", { exact: true }).fill(guardian.phone);
      await mother.getByLabel("Email", { exact: true }).fill(guardian.email);
      await field("Info email").fill(guardian.email);

      await page.getByRole("button", { name: "Registreeri", exact: true }).click();
    },

    confirmation: () => page.getByText("Registreerimine saadetud!"),
  };
};
