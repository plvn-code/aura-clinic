import type { Metadata } from "next";
import Image from "next/image";
import { CtaBand, Doctors, PageHero, Reviews } from "@/components/Sections";
import { tr, ui, type Lang } from "@/lib/i18n";

export async function generateMetadata({ params }: { params: Promise<{ lang: Lang }> }): Promise<Metadata> {
  const { lang } = await params;
  return { title: ui(lang, "doctors") };
}

export default async function DoctorsPage({ params }: { params: Promise<{ lang: Lang }> }) {
  const { lang } = await params;
  return (
    <>
      <PageHero
        lang={lang}
        crumb={[{ label: ui(lang, "doctors") }]}
        title={lang === "ru" ? <>Наши <em>врачи</em></> : <>Біздің <em>дәрігерлер</em></>}
        lead={tr(lang, {
          ru: "Врачи-косметологи, дерматокосметолог и инъекционисты с опытом от 3 лет. Каждая процедура начинается с консультации и оценки состояния кожи.",
          kz: "3 жылдан астам тәжірибесі бар дәрігер-косметологтар, дерматокосметолог және инъекционистер. Әр процедура кеңес пен тері күйін бағалаудан басталады.",
        })}
      />
      <section className="section">
        <div className="container">
          <Doctors lang={lang} />
        </div>
      </section>
      <section className="section section--cream section--tight">
        <div className="container about">
          <div className="about__media">
            <div className="curtain" style={{ aspectRatio: "1 / 1" }}>
              <Image src="/img/clinic/team.webp" alt={tr(lang, { ru: "Команда AURA CLINIC", kz: "AURA CLINIC командасы" })} fill sizes="(max-width: 900px) 100vw, 50vw" />
            </div>
          </div>
          <div className="about__text">
            <span className="eyebrow" data-reveal>
              {tr(lang, { ru: "Команда", kz: "Команда" })}
            </span>
            <h2 className="h-2" data-reveal>
              {lang === "ru" ? <>Работаем <em>с причиной</em>, а не по шаблону</> : <>Үлгімен емес, <em>себеппен</em> жұмыс істейміз</>}
            </h2>
            <p data-reveal>
              {tr(lang, {
                ru: "Сертифицированные и проверенные препараты, современные аппаратные и инъекционные методики, только безопасные протоколы и прогнозируемый результат. Омоложение, восстановление качества кожи и естественное сияние — без «перебора».",
                kz: "Сертификатталған және тексерілген препараттар, заманауи аппараттық және инъекциялық әдістер, тек қауіпсіз хаттамалар және болжамды нәтиже. Жасару, тері сапасын қалпына келтіру және табиғи жарқырау — асыра сілтеусіз.",
              })}
            </p>
          </div>
        </div>
      </section>
      <Reviews lang={lang} />
      <CtaBand lang={lang} image="/img/stock/tex-fold.webp" />
    </>
  );
}
