import { test } from "@playwright/test";

// Capitalised because a module exporting `then` becomes a thenable (no-restricted-exports)
const step =
  (keyword: string) =>
  <T>(description: string, body: () => Promise<T> | T): Promise<T> =>
    test.step(`${keyword} ${description}`, async () => body());

export const Given = step("Given");
export const When = step("When");
export const Then = step("Then");
