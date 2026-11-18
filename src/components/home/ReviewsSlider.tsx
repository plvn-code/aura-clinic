"use client";

import { useEffect, useRef, useState } from "react";
import { IArrow, IArrowLeft, IStar } from "../Icons";

export type ReviewView = { text: string; name: string; meta: string };

export function ReviewsSlider({ items, prev, next }: { items: ReviewView[]; prev: string; next: string }) {
  const [i, setI] = useState(0);
  const [paused, setPaused] = useState(false);
  const touch = useRef<number | null>(null);
  const go = (d: number) => setI((v) => (v + d + items.length) % items.length);

  useEffect(() => {
    if (paused || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = window.setInterval(() => setI((v) => (v + 1) % items.length), 8000);
    return () => window.clearInterval(id);
  }, [paused, items.length]);

  return (
    <div onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)} onFocus={() => setPaused(true)} onBlur={() => setPaused(false)}>
      <div className="reviews__inner">
        <button className="round-btn round-btn--light" onClick={() => go(-1)} aria-label={prev}>
          <IArrowLeft />
        </button>
        <div
          className="reviews__viewport"
          aria-live="polite"
          onTouchStart={(e) => (touch.current = e.touches[0].clientX)}
          onTouchEnd={(e) => {
            if (touch.current === null) return;
            const dx = e.changedTouches[0].clientX - touch.current;
            if (Math.abs(dx) > 40) go(dx < 0 ? 1 : -1);
            touch.current = null;
          }}
        >
          {items.map((r, n) => (
            <figure key={n} className={`review${n === i ? " is-active" : ""}`} aria-hidden={n !== i} style={{ margin: 0 }}>
              <span className="review__mark" aria-hidden="true">
                “
              </span>
              <blockquote>{r.text}</blockquote>
              <div className="stars" aria-label="5/5">
                {Array.from({ length: 5 }, (_, k) => (
                  <IStar key={k} />
                ))}
              </div>
              <figcaption className="review__who">
                <b>{r.name}</b> · {r.meta}
              </figcaption>
            </figure>
          ))}
        </div>
        <button className="round-btn round-btn--light" onClick={() => go(1)} aria-label={next}>
          <IArrow />
        </button>
      </div>
      <div className="reviews__dots">
        {items.map((_, n) => (
          <button key={n} onClick={() => setI(n)} aria-label={`${n + 1}`} aria-current={n === i} />
        ))}
      </div>
    </div>
  );
}
