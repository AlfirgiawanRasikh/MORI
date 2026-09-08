"use client";
import { useEffect, useRef, useState } from "react";
import { Arrow, Eyebrow } from "./editorial";

export function SupportButton({
  kind = "professional",
  className = "text-link",
  children,
}: {
  kind?: "professional" | "trusted";
  className?: string;
  children?: React.ReactNode;
}) {
  const ref = useRef<HTMLDialogElement>(null);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    if (!open || !ref.current) return;
    const dialog = ref.current;
    dialog.showModal();
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      dialog.close();
      document.body.style.overflow = previousOverflow;
    };
  }, [open]);
  return (
    <>
      <button type="button" className={className} onClick={() => setOpen(true)}>
        {children ??
          (kind === "trusted"
            ? "Talk to someone you trust"
            : "Find professional support")}{" "}
        <Arrow />
      </button>
      <dialog
        ref={ref}
        className="support-dialog"
        aria-label={
          kind === "trusted" ? "Reach out to someone" : "Need more support?"
        }
        onCancel={() => setOpen(false)}
        onClose={() => setOpen(false)}
        onKeyDown={(event) => {
          if (event.key !== "Tab") return;
          const controls =
            event.currentTarget.querySelectorAll<HTMLButtonElement>(
              "button:not(:disabled)",
            );
          const first = controls[0];
          const last = controls[controls.length - 1];
          if (event.shiftKey && document.activeElement === first) {
            event.preventDefault();
            last?.focus();
          } else if (!event.shiftKey && document.activeElement === last) {
            event.preventDefault();
            first?.focus();
          }
        }}
        onClick={(event) => {
          if (event.target === event.currentTarget) {
            const box = event.currentTarget.getBoundingClientRect();
            if (
              event.clientX < box.left ||
              event.clientX > box.right ||
              event.clientY < box.top ||
              event.clientY > box.bottom
            )
              setOpen(false);
          }
        }}
      >
        <div className="dialog-top">
          <Eyebrow>
            {kind === "trusted" ? "Human connection" : "Care and support"}
          </Eyebrow>
          <button
            type="button"
            className="icon-button"
            autoFocus
            aria-label="Close support panel"
            onClick={() => setOpen(false)}
          >
            ×
          </button>
        </div>
        <h2 className="font-serif text-4xl mb-5">
          {kind === "trusted" ? "Reach out to someone." : "Need more support?"}
        </h2>
        {kind === "trusted" ? (
          <>
            <p className="body-copy">
              Think of someone who can listen. You don’t need a perfect
              explanation.
            </p>
            <blockquote className="support-message">
              “I’m having a hard moment. Do you have a little time to talk?”
            </blockquote>
            <p className="body-copy">
              You can use these words in a message or a call when you’re ready.
              MORI won’t contact anyone for you.
            </p>
          </>
        ) : (
          <>
            <p className="body-copy">
              MORI is a wellness concept. It is not therapy, diagnosis, or
              emergency care.
            </p>
            <div className="support-detail">
              <h3>Professional support</h3>
              <p>
                Find an appropriate licensed mental health professional in your
                area. A local health service can help you understand the options
                available.
              </p>
            </div>
            <div className="support-detail">
              <h3>Immediate danger</h3>
              <p>
                If you feel unsafe or are in immediate danger, contact
                appropriate local emergency services.
              </p>
            </div>
          </>
        )}
        <button
          type="button"
          className="button mt-8"
          onClick={() => setOpen(false)}
        >
          Close and return
        </button>
      </dialog>
    </>
  );
}
