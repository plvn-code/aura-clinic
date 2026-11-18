"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { href, type Lang } from "@/lib/i18n";
import { PRICES } from "@/lib/prices";
import { ISearch } from "./Icons";
import { PriceTable } from "./PriceTable";

const T = {
  search: { ru: "Найти процедуру или препарат — например, Rejuran", kz: "Процедураны немесе препаратты табу — мысалы, Rejuran" },
  empty: { ru: "Ничего не нашли. Напишите нам — подскажем.", kz: "Ештеңе табылмады. Бізге жазыңыз — көмектесеміз." },
  about: { ru: "Об услуге", kz: "Қызмет туралы" },
  jump: { ru: "Раздел прайса", kz: "Прайс бөлімі" },
};

const norm = (s: string) => s.toLowerCase().replace(/ё/g, "е");

/** Full price list with live search and a scroll-spy category menu. */
export function PriceList({ lang }: { lang: Lang }) {
  const [q, setQ] = useState("");
  const [active, setActive] = useState(PRICES[0].id);

  const filtered = useMemo(() => {
    const nq = norm(q.trim());
    if (!nq) return PRICES;
    return PRICES.map((c) => {
      const catHit = norm(c.title[lang]).includes(nq);
      const groups = c.groups
        .map((g) => {
          const groupHit = catHit || norm(g.title?.[lang] ?? "").includes(nq);
          return { ...g, items: groupHit ? g.items : g.items.filter((it) => norm(it.n[lang]).includes(nq) || norm(it.n.ru).includes(nq)) };
        })
        .filter((g) => g.items.length);
      return { ...c, groups };
    }).filter((c) => c.groups.length);
  }, [q, lang]);

  useEffect(() => {
    const els = filtered.map((c) => document.getElementById(`p-${c.id}`)).filter(Boolean) as HTMLElement[];
    const io = new IntersectionObserver(
      (entries) => {
        const vis = entries.filter((e) => e.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (vis[0]) setActive(vis[0].target.id.slice(2));
      },
      { rootMargin: "-140px 0px -55% 0px" },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [filtered]);

  const count = (id: string) => PRICES.find((c) => c.id === id)!.groups.reduce((n, g) => n + g.items.length, 0);

  return (
    <div className="prices">
      <nav className="prices__nav" aria-label={T.jump[lang]}>
        {PRICES.map((c) => (
          <a key={c.id} href={`#p-${c.id}`} aria-current={active === c.id}>
            {c.title[lang]} <small>{count(c.id)}</small>
          </a>
        ))}
      </nav>
      <div>
        <div className="field prices__select">
          <select aria-label={T.jump[lang]} value={active} onChange={(e) => document.getElementById(`p-${e.target.value}`)?.scrollIntoView({ behavior: "smooth" })}>
            {PRICES.map((c) => (
              <option key={c.id} value={c.id}>
                {c.title[lang]}
              </option>
            ))}
          </select>
        </div>
        <div className="prices__search">
          <ISearch />
          <input type="search" value={q} onChange={(e) => setQ(e.target.value)} placeholder={T.search[lang]} aria-label={T.search[lang]} />
        </div>
        {filtered.length === 0 && <p className="prices__empty">{T.empty[lang]}</p>}
        {filtered.map((c) => (
          <section key={c.id} id={`p-${c.id}`} className="prices__cat">
            <h2 className="h-3">
              {c.title[lang]}
              <Link className="link-arrow" href={href(lang, `/services/${c.id}`)}>
                {T.about[lang]}
              </Link>
            </h2>
            {c.groups.map((g, k) => (
              <PriceTable key={k} group={g} lang={lang} />
            ))}
          </section>
        ))}
      </div>
    </div>
  );
}
