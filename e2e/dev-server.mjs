// `yarn dev:e2e`: next dev wired to the local Supabase, for Playwright to reuse while writing tests.
import { execSync, spawn } from "node:child_process";

const status = JSON.parse(execSync("npx supabase status -o json").toString());

spawn("npx", ["next", "dev"], {
  stdio: "inherit",
  env: {
    ...process.env,
    NEXT_PUBLIC_SUPABASE_URL: status.API_URL,
    NEXT_PUBLIC_SUPABASE_ANON_KEY: status.ANON_KEY,
  },
});
