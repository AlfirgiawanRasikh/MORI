"use client";
import { useState } from "react";
import { activities } from "@/lib/routing";
import { useExperience } from "./experience-provider";
import { Eyebrow, Photograph } from "./editorial";

export function Patterns() {
  const { state } = useExperience();
  const complete = state.history;
  const enough = complete.length >= 3;
  const workCount = complete.filter(
    (entry) => entry.context === "Work / Study",
  ).length;
  const grounding = complete.filter((entry) => entry.activity === "grounding");
  const lighter = grounding.filter(
    (entry) => entry.reflection === "lighter",
  ).length;
  const rows = enough
    ? [
        {
          label: "Check-ins",
          note: "This visit",
          title: "A few moments, noticed.",
          text: `You’ve made space for ${complete.length} check-ins during this visit.`,
        },
        {
          label: "Context",
          note: "What you shared",
          title: workCount
            ? "Work has appeared in your check-ins."
            : "You don’t have to explain everything.",
          text: workCount
            ? `Work / Study appeared in ${workCount} of these check-ins. That is an observation, not a conclusion.`
            : "You can share as much or as little context as you want.",
        },
        {
          label: "Reflection",
          note: "After grounding",
          title: grounding.length
            ? "A small note about grounding."
            : "Different moments can need different things.",
          text: grounding.length
            ? `You felt a little lighter after ${lighter} of your ${grounding.length} grounding moments this visit.`
            : "There’s no need to turn your feelings into a score.",
        },
      ]
    : [
        {
          label: "Evenings",
          note: "An example",
          title: "Late evenings seem heavier.",
          text: "With enough check-ins, MORI could help you notice which moments feel harder.",
        },
        {
          label: "Work",
          note: "An example",
          title: "Work has been showing up often.",
          text: "A recurring theme can be worth noticing, without deciding what it means.",
        },
        {
          label: "Grounding",
          note: "An example",
          title: "Grounding seems useful for you.",
          text: "Over time, your reflections could help you notice which small steps feel useful.",
        },
      ];
  return (
    <section
      className="page-width section-space ruled"
      id="patterns"
      data-reveal="rule"
      aria-labelledby="patterns-heading"
    >
      <Eyebrow reveal>Patterns</Eyebrow>
      <div className="flex flex-wrap items-end justify-between gap-6 mb-12">
        <div>
          <h2 id="patterns-heading" className="section-heading">
            Small moments become patterns.
          </h2>
          <p className="body-copy mt-5 max-w-2xl">
            Things MORI has noticed with you. Gentle observations, without a
            score to improve.
          </p>
        </div>
        <p className="small-copy muted max-w-xs">
          {enough
            ? "Based only on this visit. Refreshing clears these notes."
            : "Illustrative examples, not your history. Your own notes appear after three completed check-ins this visit."}
        </p>
      </div>
      <div className="pattern-list">
        {rows.map((row) => (
          <article className="pattern-row" key={row.label}>
            <div>
              <Eyebrow>{row.label}</Eyebrow>
              <p className="small-copy muted">{row.note}</p>
            </div>
            <div>
              <h3 className="font-serif text-3xl mb-3">{row.title}</h3>
              <p className="body-copy">{row.text}</p>
            </div>
            <span
              className="pattern-marker"
              aria-hidden="true"
              data-reveal="marker"
            />
          </article>
        ))}
      </div>
    </section>
  );
}
export function Privacy() {
  const { state, dispatch } = useExperience();
  const [notice, setNotice] = useState("");
  function exportHistory() {
    const text = [
      "MORI | Your check-ins from this visit",
      "",
      ...state.history.map(
        (entry, i) =>
          `${i + 1}. ${entry.mood ?? "No mood shared"}\n${entry.detail ?? "Detail skipped"} · ${entry.context ?? "Context skipped"}\n${activities[entry.activity].name}\nReflection: ${entry.reflection}\n`,
      ),
    ].join("\n");
    const url = URL.createObjectURL(
      new Blob([text], { type: "text/plain;charset=utf-8" }),
    );
    const link = document.createElement("a");
    link.href = url;
    link.download = "mori-check-ins.txt";
    link.click();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
    setNotice(
      "Your export is ready. It contains only completed check-ins from this visit.",
    );
  }
  return (
    <section
      id="privacy"
      className="page-width section-space ruled"
      aria-labelledby="privacy-heading"
    >
      <div className="editorial-grid items-center">
        <figure className="lg:col-span-5">
          <Photograph
            name="privacy"
            alt="A closed linen notebook, folded handmade paper and a smooth river pebble on a wooden desk."
          />
          <figcaption>Plate No. 03 / A little room of your own</figcaption>
        </figure>
        <div className="lg:col-span-7 lg:pl-8">
          <Eyebrow>Privacy</Eyebrow>
          <h2 id="privacy-heading" className="section-heading">
            Your feelings are yours.
          </h2>
          <p className="font-serif italic text-2xl accent mt-5 mb-7">
            Your feelings aren’t ad targeting data.
          </p>
          <p className="body-copy mb-8">
            This concept keeps your check-ins in this page’s memory. They aren’t
            sent to a server or saved in your browser. Refreshing or closing
            this page clears them.
          </p>
          <dl className="privacy-list">
            <div>
              <dt>Advertising and tracking</dt>
              <dd>None in MORI</dd>
            </div>
            <div>
              <dt>Account required</dt>
              <dd>No</dd>
            </div>
            <div>
              <dt>Completed check-ins this visit</dt>
              <dd>{state.history.length}</dd>
            </div>
          </dl>
          <div className="flex flex-wrap gap-x-6 gap-y-3 mt-6">
            <button
              type="button"
              className="text-link"
              disabled={!state.history.length}
              onClick={exportHistory}
            >
              Export this visit ↓
            </button>
            <button
              type="button"
              className="text-link"
              onClick={() => {
                dispatch({ type: "clear" });
                setNotice(
                  "All check-ins and selections from this visit have been cleared.",
                );
              }}
            >
              Clear this visit
            </button>
          </div>
          <p className="small-copy muted mt-4">
            Exports stay in your downloads until you delete them.
          </p>
          <p className="small-copy mt-3" role="status">
            {notice}
          </p>
        </div>
      </div>
    </section>
  );
}
