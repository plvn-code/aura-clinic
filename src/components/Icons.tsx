/** Thin line icons (1.5 stroke) drawn for this site. */
type P = { className?: string };
const base = { fill: "none", stroke: "currentColor", strokeWidth: 1.5, strokeLinecap: "round", strokeLinejoin: "round" } as const;

export const IArrow = (p: P) => (
  <svg viewBox="0 0 24 24" {...base} {...p} aria-hidden="true">
    <path d="M4 12h16M14 6l6 6-6 6" />
  </svg>
);
export const IArrowLeft = (p: P) => (
  <svg viewBox="0 0 24 24" {...base} {...p} aria-hidden="true">
    <path d="M20 12H4M10 6l-6 6 6 6" />
  </svg>
);
export const IPhone = (p: P) => (
  <svg viewBox="0 0 24 24" {...base} {...p} aria-hidden="true">
    <path d="M5 4h3.5l1.8 4.5-2.3 1.4a11 11 0 0 0 6.1 6.1l1.4-2.3L20 15.5V19a1.5 1.5 0 0 1-1.6 1.5A16.5 16.5 0 0 1 3.5 5.6 1.5 1.5 0 0 1 5 4Z" />
  </svg>
);
export const IPin = (p: P) => (
  <svg viewBox="0 0 24 24" {...base} {...p} aria-hidden="true">
    <path d="M12 21s-7-6.2-7-11.5a7 7 0 0 1 14 0C19 14.8 12 21 12 21Z" />
    <circle cx="12" cy="9.5" r="2.5" />
  </svg>
);
export const IClock = (p: P) => (
  <svg viewBox="0 0 24 24" {...base} {...p} aria-hidden="true">
    <circle cx="12" cy="12" r="8.5" />
    <path d="M12 7.5V12l3 2" />
  </svg>
);
export const ICheck = (p: P) => (
  <svg viewBox="0 0 24 24" {...base} {...p} aria-hidden="true">
    <circle cx="12" cy="12" r="9" />
    <path d="m8 12.3 2.6 2.6L16.2 9.3" />
  </svg>
);
export const IClose = (p: P) => (
  <svg viewBox="0 0 24 24" {...base} {...p} aria-hidden="true">
    <path d="M6 6l12 12M18 6 6 18" />
  </svg>
);
export const ISearch = (p: P) => (
  <svg viewBox="0 0 24 24" {...base} {...p} aria-hidden="true">
    <circle cx="11" cy="11" r="6.5" />
    <path d="m16 16 4 4" />
  </svg>
);
export const IGift = (p: P) => (
  <svg viewBox="0 0 24 24" {...base} {...p} aria-hidden="true">
    <path d="M4 10h16v10H4zM3 7h18v3H3zM12 7v13M12 7S10.5 3 8 3.8C6 4.5 7.5 7 12 7ZM12 7s1.5-4 4-3.2C18 4.5 16.5 7 12 7Z" />
  </svg>
);
export const IStar = (p: P) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...p} aria-hidden="true">
    <path d="m12 2.8 2.8 5.8 6.3.8-4.6 4.4 1.2 6.3L12 17l-5.7 3.1 1.2-6.3L2.9 9.4l6.3-.8Z" />
  </svg>
);
export const IInstagram = (p: P) => (
  <svg viewBox="0 0 24 24" {...base} {...p} aria-hidden="true">
    <rect x="3.5" y="3.5" width="17" height="17" rx="5" />
    <circle cx="12" cy="12" r="4" />
    <circle cx="17.2" cy="6.8" r="0.8" fill="currentColor" />
  </svg>
);
export const IWhatsapp = (p: P) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...p} aria-hidden="true">
    <path d="M12 2.2a9.7 9.7 0 0 0-8.3 14.8L2.4 21.7l4.8-1.3A9.7 9.7 0 1 0 12 2.2Zm0 17.7a8 8 0 0 1-4.1-1.1l-.3-.2-2.9.8.8-2.8-.2-.3A8 8 0 1 1 12 19.9Zm4.4-6c-.2-.1-1.4-.7-1.7-.8-.2-.1-.4-.1-.5.1l-.8 1c-.1.2-.3.2-.5.1a6.6 6.6 0 0 1-3.3-2.9c-.2-.4.2-.4.7-1.3.1-.2 0-.3 0-.4l-.8-1.8c-.2-.5-.4-.4-.5-.4h-.5a.9.9 0 0 0-.6.3 2.7 2.7 0 0 0-.9 2c0 1.2.9 2.4 1 2.5.1.2 1.7 2.7 4.2 3.8 1.6.7 2.2.7 3 .6.5-.1 1.4-.6 1.6-1.1.2-.6.2-1 .1-1.1l-.5-.5Z" />
  </svg>
);
export const I2gis = (p: P) => (
  <svg viewBox="0 0 24 24" {...base} {...p} aria-hidden="true">
    <path d="M3 6.5 9 4l6 2.5L21 4v13.5L15 20l-6-2.5L3 20Z" />
    <path d="M9 4v13.5M15 6.5V20" />
  </svg>
);

/* Feature icons for the hero cards */
export const IDoctor = (p: P) => (
  <svg viewBox="0 0 64 64" {...base} strokeWidth={1.4} {...p} aria-hidden="true">
    <circle cx="34" cy="20" r="9" />
    <path d="M18 54c0-10 7-17 16-17s16 7 16 17" />
    <path d="M28 38v7a4 4 0 0 0 8 0" />
    <path d="M42 39v6m-3-3h6" />
  </svg>
);
export const IVial = (p: P) => (
  <svg viewBox="0 0 64 64" {...base} strokeWidth={1.4} {...p} aria-hidden="true">
    <path d="M27 10h14M29 10v8l-9 30a6 6 0 0 0 5.7 8h16.6a6 6 0 0 0 5.7-8L39 18v-8" />
    <path d="M22 40h24" />
    <path d="M44 22l4-4m-1 9h5" />
  </svg>
);
export const IPlan = (p: P) => (
  <svg viewBox="0 0 64 64" {...base} strokeWidth={1.4} {...p} aria-hidden="true">
    <path d="M34 8c8 8 14 15 14 24a14 14 0 0 1-28 0c0-9 6-16 14-24Z" />
    <path d="M34 50V30m0 8 6-6m-6 12-6-6" />
  </svg>
);
