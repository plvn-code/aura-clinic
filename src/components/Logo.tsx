/**
 * Wordmark in the spirit of the clinic's sign (gold AURA CLINIC with a line-art flower):
 * a thin line flower over spaced Cormorant capitals. Replace with the vector logo once the client sends it.
 */
export function Flower({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 60 44" className={className} fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" aria-hidden="true">
      <path d="M30 40V22" />
      <path d="M30 22c-5-3-6-10-0-17 6 7 5 14 0 17Z" />
      <path d="M30 24c-6 1-12-2-15-9 8-1 13 3 15 9Z" />
      <path d="M30 24c6 1 12-2 15-9-8-1-13 3-15 9Z" />
      <path d="M30 33c-3-3-8-4-12-2M30 33c3-3 8-4 12-2" />
    </svg>
  );
}

export function Logo({ light = false, mark = true }: { light?: boolean; mark?: boolean }) {
  return (
    <span className={`logo${light ? " logo--light" : ""}`}>
      {mark && <Flower className="logo__mark" />}
      <span className="logo__word">AURA</span>
      <span className="logo__sub">CLINIC</span>
    </span>
  );
}
