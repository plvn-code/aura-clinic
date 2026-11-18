"use client";

/**
 * Scroll effects, mounted once in the layout:
 *  - [data-reveal] / .curtain → adds .is-in when the element enters the viewport (once)
 *  - [data-count="4.8"] → counts the number up when visible
 *  - [data-parallax="0.12"] → gentle vertical drift relative to the viewport centre
 * Re-scans on every route change. Reduced motion: everything is shown immediately.
 */
import { usePathname } from "next/navigation";
import { useEffect } from "react";

function countUp(el: HTMLElement) {
  const target = el.dataset.count || "0";
  const decimals = (target.split(".")[1] || "").length;
  const end = parseFloat(target);
  const suffix = el.dataset.suffix || "";
  const start = performance.now();
  const dur = 1600;
  const step = (now: number) => {
    const p = Math.min(1, (now - start) / dur);
    const eased = 1 - Math.pow(1 - p, 3);
    el.textContent = (end * eased).toFixed(decimals).replace(".", ",") + suffix;
    if (p < 1) requestAnimationFrame(step);
  };
  requestAnimationFrame(step);
}

export function Effects() {
  const pathname = usePathname();

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const els = Array.from(document.querySelectorAll<HTMLElement>("[data-reveal]:not(.is-in), .curtain:not(.is-in), [data-count]:not([data-counted])"));
    if (reduce) {
      els.forEach((el) => el.classList.add("is-in"));
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (!e.isIntersecting) continue;
          const el = e.target as HTMLElement;
          el.classList.add("is-in");
          if (el.dataset.count && !el.dataset.counted) {
            el.dataset.counted = "1";
            countUp(el);
          }
          io.unobserve(el);
        }
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.12 },
    );
    els.forEach((el) => io.observe(el));

    const par = Array.from(document.querySelectorAll<HTMLElement>("[data-parallax]"));
    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const vh = window.innerHeight;
        for (const el of par) {
          const r = el.getBoundingClientRect();
          if (r.bottom < -100 || r.top > vh + 100) continue;
          const k = parseFloat(el.dataset.parallax || "0.1");
          const off = (r.top + r.height / 2 - vh / 2) * -k;
          el.style.transform = `translate3d(0, ${off.toFixed(1)}px, 0)`;
        }
      });
    };
    if (par.length) {
      onScroll();
      window.addEventListener("scroll", onScroll, { passive: true });
    }
    return () => {
      io.disconnect();
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(raf);
    };
  }, [pathname]);

  return null;
}
