/** The open, irregular O is shared with the small identity mark. */
export function Wordmark() {
  return (
    <span className="mori-wordmark" role="img" aria-label="MORI">
      <span aria-hidden="true">M</span>
      <svg viewBox="0 0 40 44" fill="none" aria-hidden="true">
        <path
          d="M28 5C17 0 5 8 5 22C5 36 15 42 25 38C35 34 38 20 32 10C30 7 27 6 25 6"
          stroke="currentColor"
          strokeWidth="2.8"
          strokeLinecap="round"
        />
      </svg>
      <span aria-hidden="true">RI</span>
    </span>
  );
}
