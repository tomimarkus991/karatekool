// `yarn dev:e2e`: next dev wired to the local Supabase, Mailpit and Redis stand-in, for Playwright to
// reuse while writing tests.
import { execSync, spawn } from "node:child_process";
import { readFileSync } from "node:fs";

const status = JSON.parse(execSync("npx supabase status -o json").toString());
const localServices = JSON.parse(readFileSync(new URL("local-services.json", import.meta.url)));

spawn("npx", ["next", "dev"], {
  stdio: "inherit",
  env: {
    ...process.env,
    ...localServices,
    NEXT_PUBLIC_SUPABASE_URL: status.API_URL,
    NEXT_PUBLIC_SUPABASE_ANON_KEY: status.ANON_KEY,
  },
});
