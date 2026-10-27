import { applicationFormPage } from "../pages/application-form";
import { Given, Then, When } from "../support/bdd";
import { expect, test } from "../support/fixtures";

const CLUB_INBOX = "info@karatekool.ee";

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
});
