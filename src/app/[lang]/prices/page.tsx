import type { Metadata } from "next";
import { PriceList } from "@/components/PriceList";
import { CtaBand, PageHero } from "@/components/Sections";
import { tr, ui, type Lang } from "@/lib/i18n";

export async function generateMetadata({ params }: { params: Promise<{ lang: Lang }> }): Promise<Metadata> {
  const { lang } = await params;
  return { title: ui(lang, "priceList") };
}

export default async function PricesPage({ params }: { params: Promise<{ lang: Lang }> }) {
  const { lang } = await params;
  return (
    <>
      <PageHero
        lang={lang}
        crumb={[{ label: ui(lang, "prices") }]}
        title={lang === "ru" ? <>Прайс-<em>лист</em></> : <>Прайс-<em>парақ</em></>}
        lead={tr(lang, {
          ru: "Актуальные цены клиники в тенге. Точную стоимость курса и количество препарата врач определит на консультации. Акции на сайте и в Instagram могут менять цену.",
          kz: "Клиниканың теңгедегі өзекті бағалары. Курстың нақты құны мен препарат мөлшерін дәрігер кеңесте анықтайды. Сайттағы және Instagram-дағы акциялар бағаны өзгертуі мүмкін.",
        })}
      />
      <section className="section">
        <div className="container">
          <PriceList lang={lang} />
        </div>
      </section>
      <CtaBand lang={lang} />
    </>
  );
}
