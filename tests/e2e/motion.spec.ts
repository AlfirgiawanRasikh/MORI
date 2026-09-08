import { expect, test } from "@playwright/test";

test("visible greeting walks, waves, rests once, and follows the motion preference", async ({
  page,
}, info) => {
  const reduced = info.project.use.reducedMotion === "reduce";
  await page.setViewportSize({ width: 375, height: 812 });
  await page.goto("/");
  const hero = page.locator(".hero-companion .companion");
  await expect(hero).toHaveAttribute(
    "data-motion",
    reduced ? "reduced" : "normal",
  );
  await expect(hero).toHaveAttribute("data-gesture", "rest");
  // Sample the real rendered motion from its first frame. Screenshot encoding can
  // take longer than a footstep on CI, so assertions must not depend on its speed.
  const samples = reduced
    ? null
    : page.evaluate(
        () =>
          new Promise<{ foot: number; arm: number; travel: number }>(
            (resolve, reject) => {
              const character = document.querySelector<HTMLElement>(
                ".hero-companion .companion",
              )!;
              const result = { foot: 0, arm: 0, travel: 0 };
              const timeout = window.setTimeout(
                () => reject(new Error("Greeting did not finish")),
                12000,
              );
              const record = () => {
                const matrix = (selector: Element) =>
                  new DOMMatrixReadOnly(getComputedStyle(selector).transform);
                for (const foot of character.querySelectorAll(
                  ".leg-left,.leg-right",
                ))
                  result.foot = Math.max(result.foot, -matrix(foot).m42);
                const arm = matrix(character.querySelector(".arm-left")!);
                result.arm = Math.max(
                  result.arm,
                  (Math.atan2(arm.b, arm.a) * 180) / Math.PI,
                );
                result.travel = Math.max(result.travel, matrix(character).m41);
                if (character.dataset.gesture === "rest") {
                  window.clearTimeout(timeout);
                  resolve(result);
                } else requestAnimationFrame(record);
              };
              character.addEventListener(
                "animationstart",
                function start(event) {
                  if (event.animationName !== "companion-arrive") return;
                  character.removeEventListener("animationstart", start);
                  requestAnimationFrame(record);
                },
              );
            },
          ),
      );
  await hero.scrollIntoViewIfNeeded();
  if (reduced) {
    await expect(hero).toHaveAttribute("data-visible", "true");
    expect(
      await page
        .locator(".companion, .companion *")
        .evaluateAll((elements) =>
          elements.every((el) => getComputedStyle(el).animationName === "none"),
        ),
    ).toBe(true);
    await expect(hero).toHaveAttribute("data-gesture", "rest");
  } else {
    await expect(hero).toHaveAttribute("data-gesture", "greeting");
    await expect(hero).toHaveCSS("animation-name", "companion-arrive");
    await expect(hero.locator(".arm-left")).toHaveCSS(
      "animation-name",
      "companion-wave",
    );
    await expect(hero.locator(".leg-left")).toHaveCSS(
      "animation-name",
      "tiny-step",
    );
    await page.waitForTimeout(350);
    await page.screenshot({ path: info.outputPath("hero-step.png") });
    await page.waitForTimeout(2800);
    await page.screenshot({ path: info.outputPath("hero-wave.png") });
    await expect(hero).toHaveAttribute("data-gesture", "rest");
    const movement = await samples;
    expect(movement!.foot).toBeGreaterThan(2);
    expect(movement!.arm).toBeGreaterThan(80);
    expect(movement!.travel).toBeGreaterThan(8);
    await expect(hero).toHaveCSS("transform", "none");
    await expect(hero.locator(".arm-left")).toHaveCSS("animation-name", "none");
    await expect(hero.locator(".companion-breath")).toHaveCSS(
      "animation-name",
      "companion-breathe",
    );
    await page.locator("#privacy-heading").scrollIntoViewIfNeeded();
    await hero.scrollIntoViewIfNeeded();
    await page.waitForTimeout(1000);
    await expect(hero).toHaveAttribute("data-gesture", "rest");
    await page.emulateMedia({ reducedMotion: "reduce" });
    await expect(hero).toHaveAttribute("data-motion", "reduced");
    expect(
      await page
        .locator(".companion, .companion *")
        .evaluateAll((elements) =>
          elements.every((el) => getComputedStyle(el).animationName === "none"),
        ),
    ).toBe(true);
    await page.emulateMedia({ reducedMotion: "no-preference" });
    await expect(hero).toHaveAttribute("data-motion", "normal");
    await expect(hero).toHaveAttribute("data-gesture", "rest");
  }
});

test("goodbye waits for visibility, plays once, and does not loop", async ({
  page,
}, info) => {
  const reduced = info.project.use.reducedMotion === "reduce";
  await page.goto("/");
  const companion = page.locator(".final-companion .companion");
  await expect(companion).toHaveAttribute("data-gesture", "rest");
  await companion.scrollIntoViewIfNeeded();
  if (!reduced) {
    await expect(companion).toHaveAttribute("data-gesture", "goodbye");
    await expect(companion.locator(".arm-left")).toHaveCSS(
      "animation-name",
      "companion-wave",
    );
    await expect(companion).toHaveAttribute("data-gesture", "rest");
    await page.locator("#privacy-heading").scrollIntoViewIfNeeded();
    await companion.scrollIntoViewIfNeeded();
    await page.waitForTimeout(1300);
  }
  await expect(companion).toHaveAttribute("data-gesture", "rest");
  await expect(companion.locator(".arm-left")).toHaveCSS(
    "animation-name",
    "none",
  );
});

test("mood reactions stay presentational and breathing works in both modes", async ({
  page,
}, info) => {
  const reduced = info.project.use.reducedMotion === "reduce";
  await page.goto("/");
  const frame = page.locator(".product-frame");
  const companion = frame.locator(".companion");
  const states = {
    Overwhelmed: "overwhelmed",
    Low: "low",
    Restless: "restless",
    Okay: "neutral",
    Good: "good",
    "I'm not sure": "notice",
  };
  for (const [mood, state] of Object.entries(states)) {
    await frame.getByRole("button", { name: mood, exact: false }).click();
    await expect(companion).toHaveAttribute("data-state", state);
    await expect(companion.locator(".companion-pose")).toHaveCSS(
      "transition-duration",
      reduced ? "0s" : "0.75s",
    );
    await frame.getByRole("button", { name: "Previous", exact: false }).click();
  }
  await frame.getByRole("button", { name: "Restless", exact: false }).click();
  await frame
    .getByRole("button", { name: "Body tension", exact: true })
    .click();
  await frame.getByRole("button", { name: "Skip", exact: true }).click();
  await frame
    .getByRole("button", { name: "Try a gentle breathing pause", exact: false })
    .click();
  await expect(page.locator(".grounding-companion .companion")).toHaveAttribute(
    "data-state",
    "breathe",
  );
  await expect(page.locator(".breath-disc")).toHaveCSS(
    "animation-name",
    reduced ? "none" : "quiet-breath",
  );
  if (!reduced) {
    const phase = await page.locator(".grounding-visual").evaluate((el) => {
      const disc = el.querySelector(".breath-disc")!.getAnimations()[0];
      const body = el.querySelector(".companion-breath")!.getAnimations()[0];
      return Math.abs(Number(disc.startTime) - Number(body.startTime));
    });
    expect(phase).toBeLessThan(100);
  } else {
    expect(
      await page.locator("main *,header *,footer *").evaluateAll((elements) =>
        elements.every((el) => {
          const style = getComputedStyle(el);
          return (
            style.animationName === "none" && style.transitionDuration === "0s"
          );
        }),
      ),
    ).toBe(true);
  }
  for (let i = 0; i < 3; i++)
    await page
      .getByRole("button", { name: "Continue when you’re ready" })
      .click();
  await page.getByRole("button", { name: "Finish this moment" }).click();
  await expect(page.locator("#reflection-heading")).toBeFocused();
});
