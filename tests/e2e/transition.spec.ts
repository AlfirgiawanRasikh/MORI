import { expect, test } from "@playwright/test";

for (const width of [375, 430, 768, 1024, 1440]) {
  test(`density collapse and surface arrival at ${width}px`, async ({
    page,
  }, info) => {
    await page.setViewportSize({ width, height: 900 });
    await page.goto("/");
    const frame = page.locator(".product-frame");
    await expect(frame.locator(".choice-row")).toHaveCount(6);
    await frame
      .getByRole("button", { name: "Overwhelmed", exact: false })
      .click();
    await expect(frame).toHaveAttribute("data-density", "1");
    await expect(frame.locator(".choice-row")).toHaveCount(5);
    await frame
      .getByRole("button", { name: "Can't stop thinking", exact: true })
      .click();
    await expect(frame).toHaveAttribute("data-density", "2");
    await frame
      .getByRole("button", { name: "Work / Study", exact: true })
      .click();
    await expect(frame).toHaveAttribute("data-density", "3");
    await expect(frame.locator(".choice-row")).toHaveCount(0);
    await expect(page.locator(".trace-decisions .trace-branch")).toHaveCount(0);
    await expect(frame.getByRole("heading")).toBeFocused();
    await frame
      .getByRole("button", { name: "Start 2-minute reset", exact: false })
      .focus();
    await page.keyboard.press("Enter");
    if (info.project.use.reducedMotion !== "reduce") {
      await expect(page.locator("body")).toHaveAttribute(
        "data-handoff",
        "expanding",
      );
      await expect(page.locator(".grounding-veil")).toBeVisible();
      // Native wheel input during the transition must not strand the surface.
      await page.mouse.wheel(0, 180);
    }
    await expect(page.locator("#guided-grounding")).toHaveAttribute(
      "data-arrival",
      "settled",
    );
    await expect(page.locator("#grounding-heading")).toBeFocused();
    await expect(page.locator(".grounding-veil")).toBeHidden();
    expect(
      await page
        .locator("#guided-grounding")
        .evaluate((el) => Math.abs(el.getBoundingClientRect().top)),
    ).toBeLessThan(3);
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= innerWidth,
      ),
    ).toBe(true);
  });
}

test("resize and preference changes safely resolve an active transition", async ({
  page,
}, info) => {
  await page.goto("/");
  const frame = page.locator(".product-frame");
  await frame.getByRole("button", { name: "Okay", exact: false }).click();
  await frame.getByRole("button", { name: "Skip", exact: true }).click();
  await frame.getByRole("button", { name: "Skip", exact: true }).click();
  await frame.locator(".recommendation-copy .button").click();
  if (info.project.use.reducedMotion !== "reduce")
    await expect(page.locator("body")).toHaveAttribute(
      "data-handoff",
      "expanding",
    );
  await page.setViewportSize({ width: 430, height: 800 });
  await page.emulateMedia({ reducedMotion: "reduce" });
  await expect(page.locator(".grounding-veil")).toBeHidden();
  await expect(page.locator("#grounding-heading")).toBeFocused();
  await expect(
    page.getByRole("button", { name: "Continue when you’re ready" }),
  ).toBeVisible();
});
