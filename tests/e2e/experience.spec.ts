import { expect, test, type Page } from "@playwright/test";
import { readFile } from "node:fs/promises";

async function checkIn(page: Page, skips = false) {
  const frame = page.locator(".product-frame");
  await frame
    .getByRole("button", { name: "Overwhelmed", exact: false })
    .click();
  await expect(frame.getByRole("heading")).toBeFocused();
  await frame
    .getByRole("button", {
      name: skips ? "Skip" : "Can't stop thinking",
      exact: true,
    })
    .click();
  await expect(frame.getByRole("heading")).toBeFocused();
  await frame
    .getByRole("button", { name: skips ? "Skip" : "Work / Study", exact: true })
    .click();
  await expect(frame).toContainText("Your small next step");
  await frame
    .getByRole("button", { name: "Start 2-minute reset", exact: false })
    .click();
  await expect(page.locator("#grounding-heading")).toBeFocused();
}

async function completeGrounding(page: Page) {
  const companion = page.locator(".grounding-companion .companion");
  await expect(companion).toHaveAttribute("data-state", "grounded");
  for (const state of ["look", "listen", "settle"]) {
    await page
      .getByRole("button", { name: "Continue when you’re ready", exact: true })
      .click();
    await expect(companion).toHaveAttribute("data-state", state);
    await expect(page.locator(".grounding-instruction h3")).toBeFocused();
  }
  await page
    .getByRole("button", { name: "Finish this moment", exact: true })
    .click();
  await expect(page.locator("#reflection-heading")).toBeFocused();
}

test.beforeEach(async ({ page }) => {
  await page.goto("/");
});

for (const outcome of [
  "A little lighter",
  "About the same",
  "A little heavier",
]) {
  test(`complete check-in and reflection: ${outcome}`, async ({ page }) => {
    await checkIn(page);
    await completeGrounding(page);
    await page.getByRole("button", { name: outcome, exact: true }).click();
    await expect(
      page.getByRole("button", { name: outcome, exact: true }),
    ).toHaveAttribute("aria-pressed", "true");
    const reflection = page.locator("#reflection");
    if (outcome === "A little lighter") {
      await reflection
        .getByRole("button", { name: "Finish", exact: true })
        .click();
      await expect(
        page.getByRole("heading", { name: "You can leave it here." }),
      ).toBeFocused();
      await page
        .getByRole("button", { name: "Start a fresh check-in" })
        .click();
      await expect(page.locator(".product-frame")).toContainText(
        "How are you, really?",
      );
    } else if (outcome === "About the same") {
      await reflection.getByRole("button", { name: "One more step" }).click();
      await expect(page.locator("#grounding-heading")).toBeFocused();
      await expect(
        page.getByRole("button", { name: "Leave this activity" }),
      ).toBeVisible();
      await page.getByRole("button", { name: "Leave this activity" }).click();
      await expect(page.locator("#check-in-heading")).toBeFocused();
    } else {
      for (const name of [
        "Talk to someone you trust",
        "Find professional support",
      ]) {
        const opener = reflection.getByRole("button", { name, exact: false });
        await opener.click();
        const dialog = page.locator("dialog[open]");
        const close = dialog.getByRole("button", {
          name: "Close support panel",
        });
        await expect(close).toBeFocused();
        await page.keyboard.press("Shift+Tab");
        await expect(
          dialog.getByRole("button", { name: "Close and return" }),
        ).toBeFocused();
        await page.keyboard.press("Tab");
        await expect(close).toBeFocused();
        await page.keyboard.press("Escape");
        await expect(dialog).toHaveCount(0);
        await expect(opener).toBeFocused();
      }
      await reflection
        .getByRole("button", { name: "I’m done for now" })
        .click();
      await expect(
        page.getByRole("heading", { name: "You can leave it here." }),
      ).toBeFocused();
    }
  });
}

test("optional questions, back navigation, export, and clearing are functional", async ({
  page,
}) => {
  const frame = page.locator(".product-frame");
  await frame
    .getByRole("button", { name: "Overwhelmed", exact: false })
    .click();
  await frame.getByRole("button", { name: "Previous", exact: false }).click();
  await expect(frame.getByRole("heading")).toBeFocused();
  await expect(
    frame.getByRole("button", { name: "Overwhelmed", exact: false }),
  ).toHaveAttribute("aria-pressed", "true");
  await checkIn(page, true);
  await completeGrounding(page);
  await page
    .getByRole("button", { name: "A little lighter", exact: true })
    .click();
  const downloadPromise = page.waitForEvent("download");
  await page
    .getByRole("button", { name: "Export this visit", exact: false })
    .click();
  const download = await downloadPromise;
  const file = await download.path();
  expect(file).not.toBeNull();
  const copy = await readFile(file!, "utf8");
  expect(copy).toContain("MORI | Your check-ins from this visit");
  expect(copy).toContain("Overwhelmed");
  expect(copy).not.toMatch(/[\u2013\u2014]/);
  await page.getByRole("button", { name: "Clear this visit" }).click();
  await expect(
    page.getByRole("button", { name: "Export this visit", exact: false }),
  ).toBeDisabled();
  await expect(page.locator("#privacy")).toContainText(
    "All check-ins and selections from this visit have been cleared.",
  );
  await expect(frame).toContainText("How are you, really?");
  expect(
    await page.evaluate(() => ({
      cookies: document.cookie,
      local: localStorage.length,
      session: sessionStorage.length,
    })),
  ).toEqual({ cookies: "", local: 0, session: 0 });
});

test("keyboard skip link, explicit buttons, local assets, and preview robots", async ({
  page,
}) => {
  await page.keyboard.press("Tab");
  await expect(
    page.getByRole("link", { name: "Skip to content" }),
  ).toBeFocused();
  await page.keyboard.press("Enter");
  await expect(page.locator("main")).toBeFocused();
  expect(await page.locator("button:not([type])").count()).toBe(0);
  await expect(page.locator('meta[name="robots"]')).toHaveAttribute(
    "content",
    "noindex, nofollow",
  );
  expect(
    await page
      .locator('img[src^="http"],script[src^="http"],link[href^="http"]')
      .count(),
  ).toBe(0);
});

test("clear immediately empties the visit and cancels a departing answer", async ({
  page,
}) => {
  const frame = page.locator(".product-frame");
  await frame
    .getByRole("button", { name: "Overwhelmed", exact: false })
    .evaluate((el: HTMLButtonElement) => el.click());
  await page
    .getByRole("button", { name: "Clear this visit" })
    .evaluate((el: HTMLButtonElement) => el.click());
  await expect(frame).toHaveAttribute("data-density", "0");
  await expect(
    frame.getByRole("button", { name: "Overwhelmed", exact: false }),
  ).toHaveAttribute("aria-pressed", "false");
  await expect(page.locator('#privacy [role="status"]')).toContainText(
    "cleared",
  );
  await expect(page.locator("#patterns")).toHaveAttribute(
    "data-cleared",
    "true",
  );
  await page.waitForTimeout(800);
  await expect(frame).toHaveAttribute("data-density", "0");
  await expect(page.locator(".trace-decisions")).toHaveAttribute(
    "data-empty",
    "true",
  );
});

test("hero preload matches its responsive source without a duplicate image request", async ({
  page,
}) => {
  const source = page.locator(".photograph-hero source");
  const preload = page.locator('link[rel="preload"][as="image"]');
  await expect(preload).toHaveCount(1);
  expect(await preload.getAttribute("imagesrcset")).toBe(
    await source.getAttribute("srcset"),
  );
  expect(await preload.getAttribute("imagesizes")).toBe(
    await source.getAttribute("sizes"),
  );
  const heroRequests = await page.evaluate(() =>
    performance
      .getEntriesByType("resource")
      .filter((entry) => entry.name.includes("/images/hero")),
  );
  expect(heroRequests).toHaveLength(1);
  const footerTargets = await page
    .locator(".footer-nav a")
    .evaluateAll((elements) =>
      elements.map((el) => el.getBoundingClientRect().height),
    );
  expect(Math.min(...footerTargets)).toBeGreaterThanOrEqual(44);
});
