"use client";
import { useEffect, useRef } from "react";
import { useExperience, focusSection } from "./experience-provider";
import { reflectionPosture } from "@/lib/companion";
import { alternativeTo, type Reflection } from "@/lib/routing";
import { Companion } from "./companion";
import { Eyebrow } from "./editorial";
import { SupportButton } from "./support-dialog";

const responses: { value: Reflection; label: string }[] = [
  { value: "lighter", label: "A little lighter" },
  { value: "same", label: "About the same" },
  { value: "heavier", label: "A little heavier" },
];
export function ReflectionSection() {
  const { state, dispatch } = useExperience();
  const finishedHeading = useRef<HTMLHeadingElement>(null);
  useEffect(() => {
    if (state.finished) finishedHeading.current?.focus({ preventScroll: true });
  }, [state.finished]);
  return (
    <section
      className="page-width section-space"
      id="reflection"
      aria-labelledby="reflection-heading"
    >
      <div className="editorial-grid items-start">
        <div className="lg:col-span-6 lg:pr-8">
          <Eyebrow>Reflection</Eyebrow>
          <h2
            id="reflection-heading"
            tabIndex={-1}
            data-focus-heading
            className="section-heading"
          >
            A little lighter?
          </h2>
          <p className="body-copy mt-5 mb-8">
            {state.activityComplete
              ? "How does it feel now? Any answer is okay."
              : "After a small step, there’s room to notice how you feel. No scores. Just you."}
          </p>
          {state.finished ? (
            <div className="reflection-response" role="status">
              <h3
                ref={finishedHeading}
                tabIndex={-1}
                className="font-serif text-3xl"
              >
                You can leave it here.
              </h3>
              <p className="body-copy mt-3">
                You don’t have to do anything else. Carry on with your day
                whenever you’re ready.
              </p>
              <button
                type="button"
                className="text-button mt-5"
                onClick={() => {
                  dispatch({ type: "restart" });
                  focusSection("the-practice");
                }}
              >
                Start a fresh check-in
              </button>
            </div>
          ) : (
            <>
              <div className="choice-list" aria-label="How does it feel now?">
                {responses.map(({ value, label }) => (
                  <button
                    type="button"
                    key={value}
                    className="choice-row"
                    aria-pressed={state.reflection === value}
                    disabled={!state.activityComplete}
                    onClick={() => dispatch({ type: "reflect", value })}
                  >
                    <span>{label}</span>
                    <span className="choice-indicator" aria-hidden="true">
                      {state.reflection === value ? "✓ Selected" : "→"}
                    </span>
                  </button>
                ))}
              </div>
              {!state.activityComplete && (
                <a href="#guided-grounding" className="text-link mt-5">
                  Try a quiet moment first →
                </a>
              )}
              <div aria-live="polite" aria-atomic="true">
                {state.reflection && (
                  <div className="reflection-response">
                    <div className="reflection-companion">
                      <Companion state={reflectionPosture(state.reflection)} />
                    </div>
                    <h3 className="font-serif text-3xl">
                      {state.reflection === "lighter"
                        ? "Good."
                        : state.reflection === "same"
                          ? "That’s okay."
                          : "This might need more than a quick reset."}
                    </h3>
                    <p className="body-copy mt-3">
                      {state.reflection === "lighter"
                        ? "You don’t have to do anything else."
                        : state.reflection === "same"
                          ? "Would you like another small step? There’s no pressure to keep going."
                          : "You don’t have to carry it alone. It may help to talk with someone."}
                    </p>
                    {state.reflection === "heavier" ? (
                      <div className="flex flex-col items-start gap-3 mt-6">
                        <SupportButton kind="trusted" />
                        <SupportButton />
                        <button
                          type="button"
                          className="text-button"
                          onClick={() => dispatch({ type: "finish" })}
                        >
                          I’m done for now
                        </button>
                      </div>
                    ) : (
                      <div className="flex flex-wrap items-center gap-4 mt-6">
                        {state.reflection === "same" && (
                          <button
                            type="button"
                            className="button"
                            onClick={() => {
                              const next = alternativeTo(
                                state.activeActivity ?? "grounding",
                              );
                              dispatch({ type: "restart" });
                              dispatch({ type: "start", activity: next });
                              focusSection("guided-grounding");
                            }}
                          >
                            One more step
                          </button>
                        )}
                        <button
                          type="button"
                          className={
                            state.reflection === "lighter"
                              ? "button"
                              : "text-button"
                          }
                          onClick={() => dispatch({ type: "finish" })}
                        >
                          {state.reflection === "lighter"
                            ? "Finish"
                            : "I’m done for now"}
                        </button>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </>
          )}
        </div>
        <div className="lg:col-span-6 reflection-manifesto">
          <h3 className="font-serif text-4xl leading-tight max-w-md">
            MORI isn’t designed
            <br />
            to keep you here.
          </h3>
          <p className="body-copy mt-7 max-w-md">
            No streaks. No endless feed. No pressure to come back. You’re here
            when you need it.
          </p>
          <p className="body-copy muted mt-5 max-w-md">
            Take what helps, and leave when you’re ready.
          </p>
        </div>
      </div>
    </section>
  );
}
