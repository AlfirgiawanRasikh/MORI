import { expect, test } from "@playwright/test";

for (const width of [375, 390, 430, 768, 1024, 1440]) {
  test(`editorial visual smoke at ${width}px`, async ({ page }, info) => {
    await page.setViewportSize({ width, height: width < 640 ? 900 : 1000 });
    await page.goto("/");
    await page.evaluate(() => document.fonts.ready);
    // Follow the page in reading order so viewport reveals are actually exercised.
    const sections = [
      ".hero-section",
      "#the-practice",
      "#philosophy",
      ".visual-pause",
      ".one-step",
      "#guided-grounding",
      "#reflection",
      "#patterns",
      "#privacy",
      "#support",
      ".final-section",
      ".site-footer",
    ];
    for (const selector of sections) {
      const section = page.locator(selector);
      await section.scrollIntoViewIfNeeded();
      await page.waitForTimeout(1250);
      expect(
        await page.evaluate(
          () => document.documentElement.scrollWidth <= innerWidth,
        ),
      ).toBe(true);
      if (info.project.name === "normal-motion")
        await section.screenshot({
          path: info.outputPath(`${selector.replace(/[.#]/g, "")}.png`),
        });
    }
    const rows = await page
      .locator(".choice-row")
      .evaluateAll((elements) =>
        elements.map((el) => el.getBoundingClientRect().height),
      );
    expect(Math.min(...rows)).toBeGreaterThanOrEqual(44);
    await page
      .locator("#support")
      .getByRole("button", { name: "Find professional support", exact: false })
      .click();
    const dialog = page.locator("dialog[open]");
    const bounds = await dialog.boundingBox();
    expect(bounds!.width).toBeLessThanOrEqual(width - 32);
    if (info.project.name === "normal-motion")
      await page.screenshot({ path: info.outputPath("support-dialog.png") });
    await page.keyboard.press("Escape");
  });
}
