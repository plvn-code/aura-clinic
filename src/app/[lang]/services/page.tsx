import type { Metadata } from "next";
import { CtaBand, PageHero, ServiceGrid, Ticker } from "@/components/Sections";
import { tr, ui, type Lang } from "@/lib/i18n";

export async function generateMetadata({ params }: { params: Promise<{ lang: Lang }> }): Promise<Metadata> {
  const { lang } = await params;
  return { title: ui(lang, "services") };
}

export default async function ServicesPage({ params }: { params: Promise<{ lang: Lang }> }) {
  const { lang } = await params;
  return (
    <>
      <PageHero
        lang={lang}
        crumb={[{ label: ui(lang, "services") }]}
        title={lang === "ru" ? <>Наши <em>услуги</em></> : <>Біздің <em>қызметтер</em></>}
        lead={tr(lang, {
          ru: "Девять направлений эстетической косметологии — от чистки лица до лифтинга без операции и программ похудения. Выберите направление, чтобы узнать подробности и цены.",
          kz: "Эстетикалық косметологияның тоғыз бағыты — бет тазалаудан операциясыз лифтинг пен арықтау бағдарламаларына дейін. Толығырақ ақпарат пен бағаны білу үшін бағытты таңдаңыз.",
        })}
      />
      <section className="section section--white">
        <div className="container">
          <ServiceGrid lang={lang} />
        </div>
      </section>
      <Ticker />
      <CtaBand lang={lang} image="/img/stock/tex-gel.webp" />
    </>
  );
}
