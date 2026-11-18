"use client";

import Image from "next/image";
import { useCallback, useEffect, useState } from "react";

export type Slide = { src: string; alt: string; caption: string; pos?: string };

const DURATION = 7000;

/** Background crossfade slider with Ken Burns zoom and progress dashes. Pauses when the tab is hidden. */
export function HeroSlider({ slides, label, children }: { slides: Slide[]; label: string; children: React.ReactNode }) {
  const [i, setI] = useState(0);
  const [cycle, setCycle] = useState(0);

  const go = useCallback((n: number) => {
    setI(n);
    setCycle((c) => c + 1);
  }, []);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = window.setTimeout(() => {
      if (document.visibilityState === "visible") setI((v) => (v + 1) % slides.length);
      setCycle((c) => c + 1);
    }, DURATION);
    return () => window.clearTimeout(id);
  }, [cycle, slides.length]);

  return (
    <div className="hero__stage" aria-roledescription="carousel" aria-label={label}>
      {slides.map((s, n) => (
        <div key={s.src} className={`hero__slide${n === i ? " is-active" : ""}`} aria-hidden={n !== i}>
          <Image
            src={s.src}
            alt={s.alt}
            fill
            priority={n === 0}
            sizes="100vw"
            quality={85}
            style={{ objectPosition: s.pos || "50% 50%" }}
          />
        </div>
      ))}
      {children}
      <div className="hero__controls">
        <span className="hero__caption" aria-live="polite">
          {slides[i].caption}
        </span>
        <div className="hero__dots">
          {slides.map((s, n) => (
            <button
              key={s.src + cycle * (n === i ? 1 : 0)}
              className={n === i ? "is-active" : ""}
              onClick={() => go(n)}
              aria-label={`${n + 1} / ${slides.length}`}
              aria-current={n === i}
              style={{ "--dur": `${DURATION}ms` } as React.CSSProperties}
            >
              <i />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
