import { expect, test, type Page } from "@playwright/test";

async function matrix(page: Page, selector: string) {
  return page.locator(selector).evaluate((el) => {
    const m = new DOMMatrixReadOnly(getComputedStyle(el).transform);
    return {
      x: m.m41,
      y: m.m42,
      a: m.a,
      d: m.d,
      angle: (Math.atan2(m.b, m.a) * 180) / Math.PI,
    };
  });
}

test("stationary greeting, two waves, then a bounded articulated idle journey home", async ({
  page,
}, info) => {
  test.setTimeout(100000);
  const reduced = info.project.use.reducedMotion === "reduce";
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/");
  const hero = page.locator(".hero-companion .companion");
  await hero.scrollIntoViewIfNeeded();
  await expect(hero).toHaveAttribute("data-visible", "true");
  await expect(hero).toHaveAttribute("data-gesture", "rest");
  const result = await hero.evaluate(
    (root, reduced) =>
      new Promise<{
        greetingTravel: number;
        greetingFoot: number;
        wave: number;
        travel: number;
        foot: number;
        home: number;
        maxY: number;
        maxAngle: number;
        walkingAfter: boolean;
      }>((resolve) => {
        const r = {
          greetingTravel: 0,
          greetingFoot: 0,
          wave: 0,
          travel: 0,
          foot: 0,
          home: 0,
          maxY: 0,
          maxAngle: 0,
          walkingAfter: true,
        };
        const started = performance.now();
        let greeted = false,
          finished = false,
          walked = false;
        const m = (selector: string) =>
          new DOMMatrixReadOnly(
            getComputedStyle(root.querySelector(selector)!).transform,
          );
        const sample = () => {
          const loco = m(".companion-locomotion"),
            foot = m(".leg-left"),
            arm = m(".arm-left"),
            turn = m(".companion-orientation");
          const distance = Math.hypot(loco.m41, loco.m42);
          if (root.getAttribute("data-gesture") === "greeting") {
            greeted = true;
            r.greetingTravel = Math.max(r.greetingTravel, distance);
            r.greetingFoot = Math.max(
              r.greetingFoot,
              Math.abs(foot.m41),
              Math.abs(foot.m42),
            );
            r.wave = Math.max(
              r.wave,
              Math.abs((Math.atan2(arm.b, arm.a) * 180) / Math.PI),
            );
          } else if (greeted) finished = true;
          if (root.getAttribute("data-behavior") === "walk") {
            walked = true;
            r.walkingAfter = r.walkingAfter && finished;
            r.foot = Math.max(r.foot, Math.abs(foot.m41));
          }
          r.travel = Math.max(r.travel, Math.abs(loco.m41));
          r.maxY = Math.max(r.maxY, Math.abs(loco.m42));
          r.maxAngle = Math.max(
            r.maxAngle,
            Math.abs((Math.atan2(turn.b, turn.a) * 180) / Math.PI),
          );
          r.home = distance;
          if (
            (reduced && performance.now() - started > 1000) ||
            (walked &&
              performance.now() - started > 58000 &&
              distance < 1 &&
              root.getAttribute("data-behavior") === "rest") ||
            performance.now() - started > 75000
          )
            resolve(r);
          else requestAnimationFrame(sample);
        };
        sample();
      }),
    reduced,
  );
  expect(result.greetingTravel).toBeLessThanOrEqual(2);
  expect(result.greetingFoot).toBeLessThan(0.5);
  if (reduced) {
    expect(result.travel).toBe(0);
    expect(result.wave).toBe(0);
    expect(
      await hero
        .locator("*")
        .evaluateAll((els) =>
          els.every((el) => getComputedStyle(el).animationName === "none"),
        ),
    ).toBe(true);
  } else {
    expect(result.wave).toBeGreaterThan(85);
    expect(result.travel).toBeGreaterThan(20);
    expect(result.travel).toBeLessThan(40);
    expect(result.foot).toBeGreaterThan(3);
    expect(result.maxY).toBeLessThan(12);
    expect(result.maxAngle).toBeLessThan(12);
    expect(result.walkingAfter).toBe(true);
    expect(result.home).toBeLessThan(1);
    await page.locator("#privacy-heading").scrollIntoViewIfNeeded();
    await hero.scrollIntoViewIfNeeded();
    await expect(hero).toHaveAttribute("data-gesture", "rest");
    await page.emulateMedia({ reducedMotion: "reduce" });
    await expect(hero).toHaveAttribute("data-motion", "reduced");
    expect(
      (await matrix(page, ".hero-companion .companion-locomotion")).x,
    ).toBe(0);
  }
});

test("a mood interrupts exploration and offscreen companions pause", async ({
  page,
}, info) => {
  await page.goto("/");
  const hero = page.locator(".hero-companion .companion");
  await hero.scrollIntoViewIfNeeded();
  if (info.project.use.reducedMotion !== "reduce") {
    await expect(hero).toHaveAttribute("data-behavior", "walk", {
      timeout: 35000,
    });
    const before = await matrix(page, ".hero-companion .companion-locomotion");
    // Exercise an external product-state update while the hero stays visible.
    await page
      .locator(".product-frame .choice-row")
      .first()
      .evaluate((el: HTMLButtonElement) => el.click());
    await expect(hero).toHaveAttribute("data-state", "overwhelmed");
    await expect(hero).toHaveAttribute("data-behavior", "reaction");
    const immediate = await matrix(
      page,
      ".hero-companion .companion-locomotion",
    );
    expect(Math.abs(immediate.x - before.x)).toBeLessThan(10);
    await expect
      .poll(async () =>
        Math.abs(
          (await matrix(page, ".hero-companion .companion-locomotion")).x,
        ),
      )
      .toBeLessThan(1);
    await page.locator("#privacy").scrollIntoViewIfNeeded();
    await expect(hero).toHaveAttribute("data-visible", "false");
    const paused = await matrix(page, ".hero-companion .companion-locomotion");
    await page.waitForTimeout(600);
    expect(await matrix(page, ".hero-companion .companion-locomotion")).toEqual(
      paused,
    );
  } else {
    await page.locator(".product-frame .choice-row").first().click();
    await expect(hero).toHaveAttribute("data-state", "overwhelmed");
    expect(
      (await matrix(page, ".hero-companion .companion-locomotion")).x,
    ).toBe(0);
  }
});

test("goodbye waves once with stationary feet, then remains still", async ({
  page,
}, info) => {
  await page.goto("/");
  const companion = page.locator(".final-companion .companion");
  await companion.scrollIntoViewIfNeeded();
  if (info.project.use.reducedMotion !== "reduce") {
    await expect(companion).toHaveAttribute("data-gesture", "goodbye");
    await expect(companion).toHaveAttribute("data-behavior", "wave");
    expect(
      (await matrix(page, ".final-companion .arm-left")).angle,
    ).toBeGreaterThan(60);
    expect(
      (await matrix(page, ".final-companion .companion-locomotion")).x,
    ).toBe(0);
    expect((await matrix(page, ".final-companion .leg-left")).x).toBe(0);
    await expect(companion).toHaveAttribute("data-gesture", "rest");
  }
  await page.locator("#privacy-heading").scrollIntoViewIfNeeded();
  await companion.scrollIntoViewIfNeeded();
  const still = await matrix(page, ".final-companion .companion-idle");
  await page.waitForTimeout(1500);
  await expect(companion).toHaveAttribute("data-gesture", "rest");
  expect(await matrix(page, ".final-companion .companion-idle")).toEqual(still);
});

test("check-in stays stationary and grounding material shares the companion breath", async ({
  page,
}, info) => {
  await page.goto("/");
  const reduced = info.project.use.reducedMotion === "reduce";
  const frame = page.locator(".product-frame");
  for (const [mood, state] of Object.entries({
    Overwhelmed: "overwhelmed",
    Low: "low",
    Restless: "restless",
    Okay: "neutral",
    Good: "good",
    "I'm not sure": "notice",
  })) {
    await frame.getByRole("button", { name: mood, exact: false }).click();
    await expect(frame.locator(".companion")).toHaveAttribute(
      "data-state",
      state,
    );
    expect(
      (await matrix(page, ".product-companion .companion-locomotion")).x,
    ).toBe(0);
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
  await expect(page.locator("#grounding-heading")).toBeFocused();
  const observations = await page.locator(".grounding-visual").evaluate(
    (el) =>
      new Promise<number[]>((resolve) => {
        const samples: number[] = [];
        const start = performance.now();
        const sample = () => {
          const material = new DOMMatrixReadOnly(
            getComputedStyle(el.querySelector(".breath-disc")!).transform,
          );
          const body = new DOMMatrixReadOnly(
            getComputedStyle(el.querySelector(".companion-breath")!).transform,
          );
          samples.push(Math.hypot(material.a, material.b), body.d);
          if (performance.now() - start > 1200) resolve(samples);
          else requestAnimationFrame(sample);
        };
        sample();
      }),
  );
  const material = observations.filter((_, i) => i % 2 === 0),
    body = observations.filter((_, i) => i % 2 === 1);
  if (!reduced) {
    expect(Math.max(...material) - Math.min(...material)).toBeGreaterThan(
      0.003,
    );
    expect(
      (material.at(-1)! - material[0]) * (body.at(-1)! - body[0]),
    ).toBeGreaterThan(0);
  } else expect(Math.max(...body) - Math.min(...body)).toBe(0);
  expect(
    (await matrix(page, ".grounding-companion .companion-locomotion")).x,
  ).toBe(0);
  if (reduced)
    expect(
      await page.locator("main *,header *,footer *").evaluateAll((els) =>
        els.every((el) => {
          const s = getComputedStyle(el);
          return s.animationName === "none" && s.transitionDuration === "0s";
        }),
      ),
    ).toBe(true);
  for (let i = 0; i < 3; i++)
    await page
      .getByRole("button", { name: "Continue when you’re ready" })
      .click();
  await page.getByRole("button", { name: "Finish this moment" }).click();
  await page
    .getByRole("button", { name: "A little heavier", exact: true })
    .click();
  expect(
    (await matrix(page, ".reflection-companion .companion-locomotion")).x,
  ).toBe(0);
});

test("document visibility pauses decorative timelines and resumes without another greeting", async ({
  page,
}, info) => {
  await page.goto("/");
  const hero = page.locator(".hero-companion .companion");
  await hero.scrollIntoViewIfNeeded();
  if (info.project.use.reducedMotion !== "reduce")
    await expect(hero).toHaveAttribute("data-behavior", "wave");
  // Exercise the browser lifecycle event deterministically, independent of window focus in CI.
  await page.evaluate(() => {
    Object.defineProperty(document, "hidden", {
      configurable: true,
      get: () => true,
    });
    document.dispatchEvent(new Event("visibilitychange"));
  });
  await expect(hero).toHaveAttribute("data-visible", "false");
  const arm = await matrix(page, ".hero-companion .arm-left");
  const photograph = await matrix(page, ".photograph-hero img");
  await page.waitForTimeout(650);
  expect(await matrix(page, ".hero-companion .arm-left")).toEqual(arm);
  expect(await matrix(page, ".photograph-hero img")).toEqual(photograph);
  await page.evaluate(() => {
    delete (document as unknown as { hidden?: boolean }).hidden;
    document.dispatchEvent(new Event("visibilitychange"));
  });
  await expect(hero).toHaveAttribute("data-visible", "true");
  if (info.project.use.reducedMotion !== "reduce")
    await expect(hero).toHaveAttribute("data-gesture", "rest");
});
