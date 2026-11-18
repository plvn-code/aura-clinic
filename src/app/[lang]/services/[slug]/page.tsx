import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { BookButton } from "@/components/Booking";
import { PriceTable } from "@/components/PriceTable";
import { CtaBand, Doctors, MoreLink, Packages, PageHero, SecHead, ServiceGrid } from "@/components/Sections";
import { CLEAN_STEPS } from "@/lib/content";
import { LANGS, tr, ui, type Lang } from "@/lib/i18n";
import { priceCategory } from "@/lib/prices";
import { SERVICES, service } from "@/lib/services";

export const dynamicParams = false;
export function generateStaticParams() {
  return LANGS.flatMap((lang) => SERVICES.map((s) => ({ lang, slug: s.slug })));
}

export async function generateMetadata({ params }: { params: Promise<{ lang: Lang; slug: string }> }): Promise<Metadata> {
  const { lang, slug } = await params;
  const s = service(slug);
  if (!s) return {};
  return { title: tr(lang, s.title), description: tr(lang, s.lead).slice(0, 160) };
}

export default async function ServicePage({ params }: { params: Promise<{ lang: Lang; slug: string }> }) {
  const { lang, slug } = await params;
  const s = service(slug);
  const cat = priceCategory(slug);
  if (!s || !cat) notFound();
  const d = (ms: number) => ({ "--d": ms }) as React.CSSProperties;
  const idx = SERVICES.findIndex((x) => x.slug === slug);
  const others = [1, 2, 3].map((k) => SERVICES[(idx + k) % SERVICES.length]);

  return (
    <>
      <PageHero
        lang={lang}
        image={s.image}
        crumb={[{ label: ui(lang, "services"), path: "/services" }, { label: tr(lang, s.title) }]}
        title={tr(lang, s.title)}
        lead={tr(lang, s.short)}
      >
        <div style={{ display: "flex", gap: 12, flexWrap: "wrap", alignItems: "center" }}>
          <BookButton service={s.slug} className="btn btn--light" arrow>
            {ui(lang, "book")}
          </BookButton>
          {s.facts && (
            <div className="chips">
              {s.facts.map((f) => (
                <span className="chip" key={f.ru}>
                  {tr(lang, f)}
                </span>
              ))}
            </div>
          )}
        </div>
      </PageHero>

      <section className="section">
        <div className="container svc-detail">
          <div className="svc-detail__aside">
            <span className="eyebrow" data-reveal>
              {tr(lang, { ru: "О процедуре", kz: "Процедура туралы" })}
            </span>
            <p className="lead" data-reveal style={{ ...d(80), color: "var(--ink)", fontSize: "clamp(19px, 1.6vw, 22px)" }}>
              {tr(lang, s.lead)}
            </p>
            <h3 className="h-3" data-reveal style={d(140)}>
              {tr(lang, { ru: "С чем работаем", kz: "Немен жұмыс істейміз" })}
            </h3>
            <ul className="points">
              {s.points.map((p, i) => (
                <li key={i} data-reveal style={d(180 + i * 70)}>
                  <b>{String(i + 1).padStart(2, "0")}</b>
                  {tr(lang, p)}
                </li>
              ))}
            </ul>
            <p style={{ fontSize: 13, color: "var(--muted)" }}>{ui(lang, "disclaimer")}</p>
          </div>
          <div>
            <SecHead
              eyebrow={ui(lang, "prices")}
              title={lang === "ru" ? <>Стоимость <em>процедур</em></> : <>Процедуралар <em>бағасы</em></>}
            />
            <div data-reveal>
              {cat.groups.map((g, k) => (
                <PriceTable key={k} group={g} lang={lang} fallbackTitle={tr(lang, cat.title)} />
              ))}
            </div>
            <div style={{ display: "flex", gap: 24, alignItems: "center", flexWrap: "wrap", marginTop: 32 }}>
              <BookButton service={s.slug} className="btn" arrow>
                {ui(lang, "book")}
              </BookButton>
              <MoreLink lang={lang} path="/prices" label={ui(lang, "priceList")} />
            </div>
          </div>
        </div>
      </section>

      {slug === "chistka" && (
        <section className="section section--dark on-dark">
          <div className="container signature">
            <div className="signature__aside">
              <SecHead
                eyebrow={tr(lang, { ru: "8 этапов", kz: "8 кезең" })}
                title={lang === "ru" ? <>Из чего состоит <em>голливудская чистка</em></> : <><em>Голливудтық тазалау</em> неден тұрады</>}
              />
              <div className="signature__media curtain">
                <Image src="/img/clinic/procedure.webp" alt="" fill sizes="(max-width: 900px) 100vw, 45vw" />
              </div>
            </div>
            <ol className="steps">
              {CLEAN_STEPS.map((st, i) => (
                <li key={i} data-reveal style={d((i % 4) * 90)}>
                  <b>{String(i + 1).padStart(2, "0")}</b>
                  <div>
                    <h3>{tr(lang, st.t)}</h3>
                    <p>{tr(lang, st.d)}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </section>
      )}

      {slug === "body" && (
        <section className="section section--cream">
          <div className="container">
            <SecHead center eyebrow={tr(lang, { ru: "Пакеты", kz: "Пакеттер" })} title={lang === "ru" ? <>Программы <em>похудения</em></> : <>Арықтау <em>бағдарламалары</em></>} />
            <Packages lang={lang} />
          </div>
        </section>
      )}

      <section className="section section--white">
        <div className="container">
          <SecHead eyebrow={ui(lang, "doctors")} title={lang === "ru" ? <>Кто проводит <em>процедуры</em></> : <>Процедураларды <em>кім жүргізеді</em></>} />
          <Doctors lang={lang} rail />
        </div>
      </section>

      <CtaBand lang={lang} image="/img/stock/tex-serum.webp" />

      <section className="section">
        <div className="container">
          <SecHead eyebrow={tr(lang, { ru: "Ещё направления", kz: "Басқа бағыттар" })} title={lang === "ru" ? <>Другие <em>услуги</em></> : <>Басқа <em>қызметтер</em></>} />
          <ServiceGrid lang={lang} only={others.map((o) => o.slug)} />
        </div>
      </section>
    </>
  );
}
