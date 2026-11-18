"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import { IArrow, IArrowLeft } from "../Icons";

export type ResultTab = { id: string; label: string; items: { src: string; alt: string }[] };

/** Before/after stories from the clinic's Instagram highlights, filtered by tab, horizontally scrollable. */
export function ResultsRail({ tabs, prev, next, head }: { tabs: ResultTab[]; prev: string; next: string; head: React.ReactNode }) {
  const [tab, setTab] = useState(tabs[0].id);
  const rail = useRef<HTMLDivElement>(null);
  const active = tabs.find((t) => t.id === tab) ?? tabs[0];
  const scroll = (d: number) => rail.current?.scrollBy({ left: d * rail.current.clientWidth * 0.8, behavior: "smooth" });

  return (
    <>
      <div className="results-head">
        {head}
        <div style={{ display: "flex", gap: 16, alignItems: "center", flexWrap: "wrap" }}>
          <div className="tabs" role="tablist">
            {tabs.map((t) => (
              <button
                key={t.id}
                role="tab"
                aria-selected={t.id === tab}
                onClick={() => {
                  setTab(t.id);
                  rail.current?.scrollTo({ left: 0 });
                }}
              >
                {t.label}
              </button>
            ))}
          </div>
          <div className="rail-nav">
            <button className="round-btn" onClick={() => scroll(-1)} aria-label={prev}>
              <IArrowLeft />
            </button>
            <button className="round-btn" onClick={() => scroll(1)} aria-label={next}>
              <IArrow />
            </button>
          </div>
        </div>
      </div>
      <div className="rail" ref={rail} role="tabpanel">
        {active.items.map((it, n) => (
          <figure key={active.id + it.src} className="story" style={{ "--i": n, margin: 0 } as React.CSSProperties}>
            <Image src={it.src} alt={it.alt} fill sizes="(max-width: 900px) 60vw, 290px" />
            <span className="story__tag">{active.label}</span>
          </figure>
        ))}
      </div>
    </>
  );
}
