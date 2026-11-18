import type { Metadata } from "next";
import { I2gis, IClock, IInstagram, IPhone } from "@/components/Icons";
import { Faq, PageHero, Visit } from "@/components/Sections";
import { tr, ui, type Lang } from "@/lib/i18n";
import { site } from "@/lib/site";

export async function generateMetadata({ params }: { params: Promise<{ lang: Lang }> }): Promise<Metadata> {
  const { lang } = await params;
  return { title: ui(lang, "contacts") };
}

export default async function ContactsPage({ params }: { params: Promise<{ lang: Lang }> }) {
  const { lang } = await params;
  const cards = [
    { icon: <IPhone />, k: ui(lang, "phone"), v: site.phone, s: "WhatsApp", href: site.phoneHref },
    { icon: <IClock />, k: ui(lang, "hours"), v: `${site.hours}`, s: `${ui(lang, "daily")}, ${ui(lang, "byAppointment")}` },
    { icon: <IInstagram />, k: "Instagram", v: site.instagramHandle, s: `${site.followers} ${lang === "ru" ? "подписчиков" : "жазылушы"}`, href: site.instagram },
    { icon: <I2gis />, k: "2ГИС", v: `${site.rating.value} ★`, s: `${site.rating.count} ${lang === "ru" ? "оценки" : "баға"}`, href: site.twoGis },
  ];
  return (
    <>
      <PageHero
        lang={lang}
        crumb={[{ label: ui(lang, "contacts") }]}
        title={lang === "ru" ? <>Контакты <em>и запись</em></> : <>Байланыс <em>және жазылу</em></>}
        lead={tr(lang, site.address) + " · " + tr(lang, site.district)}
      />
      <section className="section section--tight">
        <div className="container">
          <div className="contact-cards">
            {cards.map((c, i) => {
              const body = (
                <>
                  {c.icon}
                  <small>{c.k}</small>
                  <b>{c.v}</b>
                  <span>{c.s}</span>
                </>
              );
              return c.href ? (
                <a key={i} className="contact-card" href={c.href} target={c.href.startsWith("http") ? "_blank" : undefined} rel="noopener noreferrer" data-reveal style={{ "--d": i * 90 } as React.CSSProperties}>
                  {body}
                </a>
              ) : (
                <div key={i} className="contact-card" data-reveal style={{ "--d": i * 90 } as React.CSSProperties}>
                  {body}
                </div>
              );
            })}
          </div>
        </div>
      </section>
      <section className="section section--white">
        <div className="container">
          <Visit lang={lang} />
        </div>
      </section>
      <section className="section">
        <div className="container">
          <Faq lang={lang} />
        </div>
      </section>
    </>
  );
}
