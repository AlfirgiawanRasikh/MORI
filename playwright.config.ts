import { defineConfig } from "@playwright/test";

export default defineConfig({
  testDir: "./tests/e2e",
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: 0,
  workers: 2,
  timeout: 45000,
  expect: { timeout: 10000 },
  outputDir: "artifacts/playwright-results",
  reporter: [
    ["list"],
    ["html", { outputFolder: "artifacts/playwright-report", open: "never" }],
  ],
  use: {
    baseURL: "http://127.0.0.1:4173",
    actionTimeout: 10000,
    viewport: { width: 1440, height: 1000 },
    locale: "en-US",
    colorScheme: "light",
    channel: process.env.PLAYWRIGHT_CHANNEL || undefined,
    trace: "retain-on-failure",
    screenshot: "only-on-failure",
  },
  projects: [
    { name: "normal-motion", use: { reducedMotion: "no-preference" } },
    { name: "reduced-motion", use: { reducedMotion: "reduce" } },
  ],
  webServer: {
    command: "node scripts/serve-preview.mjs",
    url: "http://127.0.0.1:4173",
    reuseExistingServer: false,
  },
});
