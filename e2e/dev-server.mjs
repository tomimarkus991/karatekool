// `yarn dev:e2e`: next dev wired to the API that Playwright starts with the e2e profile, for
// Playwright to reuse while writing tests.
import { spawn } from "node:child_process";

spawn("npx", ["next", "dev"], {
  stdio: "inherit",
  env: { ...process.env, NEXT_PUBLIC_API_URL: "http://localhost:8080/api/v1" },
});
