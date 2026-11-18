import Image from "next/image";
import { BookButton } from "@/components/Booking";
import { HeroSlider } from "@/components/home/HeroSlider";
import { ResultsRail } from "@/components/home/ResultsRail";
import { ICheck, IDoctor, IGift, IPlan, IStar, IVial } from "@/components/Icons";
import { CtaBand, Doctors, Faq, MoreLink, Packages, Reviews, SecHead, ServiceGrid, Ticker, Visit } from "@/components/Sections";
import { CLEAN_STEPS } from "@/lib/content";
import { href, tr, ui, type L, type Lang } from "@/lib/i18n";
import { site } from "@/lib/site";

const l = (ru: string, kz: string): L => ({ ru, kz });

export default async function Home({ params }: { params: Promise<{ lang: Lang }> }) {
  const { lang } = await params;
  const t = (v: L) => tr(lang, v);
  const d = (ms: number) => ({ "--d": ms }) as React.CSSProperties;

  const slides = [
    { src: "/img/stock/hero-1.webp", alt: t(l("Сияющая ухоженная кожа", "Жарқыраған күтімді тері")), caption: t(l("Уход и чистки", "Күтім және тазалау")), pos: "50% 30%" },
    { src: "/img/stock/hero-2.webp", alt: t(l("Аппаратная процедура для лица", "Бетке арналған аппараттық процедура")), caption: t(l("Аппаратная косметология", "Аппараттық косметология")), pos: "60% 50%" },
    { src: "/img/stock/hero-3.webp", alt: t(l("Инъекционная процедура", "Инъекциялық процедура")), caption: t(l("Инъекционные методики", "Инъекциялық әдістер")), pos: "50% 40%" },
  ];

  const features = [
    { icon: <IDoctor />, title: l("Врачи-косметологи", "Дәрігер-косметологтар"), text: l("Специалисты с высшим медицинским образованием и опытом от 3 до 5+ лет", "Жоғары медициналық білімі бар, 3–5+ жыл тәжірибелі мамандар") },
    { icon: <IVial />, title: l("Сертифицированные препараты", "Сертификатталған препараттар"), text: l("Rejuran, Teoxane, Stylage, Xeomin, Диспорт — только проверенные бренды и протоколы", "Rejuran, Teoxane, Stylage, Xeomin, Диспорт — тек тексерілген брендтер мен хаттамалар") },
    { icon: <IPlan />, title: l("Индивидуальный план", "Жеке жоспар"), text: l("Работаем не по шаблону, а с причиной проблемы — подбираем курс под вашу кожу", "Үлгі бойынша емес, мәселенің себебімен жұмыс істейміз — курсты теріңізге сай таңдаймыз") },
  ];

  const results = [
    {
      id: "botox",
      label: t(l("Ботулинотерапия", "Ботулинотерапия")),
      items: [1, 2, 3, 4, 5, 6].map((n) => ({ src: `/img/results/botox-${n}.webp`, alt: t(l("До и после ботулинотерапии", "Ботулинотерапияға дейін және кейін")) })),
    },
    {
      id: "clean",
      label: t(l("Чистка лица", "Бет тазалау")),
      items: [1, 2, 3, 4, 5, 6].map((n) => ({ src: `/img/results/clean-${n}.webp`, alt: t(l("До и после голливудской чистки", "Голливудтық тазалауға дейін және кейін")) })),
    },
  ];

  return (
    <>
      {/* ---------- Hero ---------- */}
      <section className="hero">
        <HeroSlider slides={slides} label="AURA CLINIC">
          <div className="container hero__content">
            <span className="eyebrow" data-reveal>
              {t(l("Косметологическая клиника · Алматы", "Косметология клиникасы · Алматы"))}
            </span>
            <h1 className="hero__title" data-reveal style={d(100)}>
              {lang === "ru" ? (
                <>
                  Кожа, которая <em>сияет</em> без фильтров
                </>
              ) : (
                <>
                  Сүзгісіз <em>жарқырайтын</em> тері
                </>
              )}
            </h1>
            <p className="hero__text" data-reveal style={d(200)}>
              {t(
                l(
                  "Чистки, пилинги, ботулинотерапия, биоревитализация, SMAS-лифтинг и лазер CO₂ — бережно, по показаниям и с естественным результатом.",
                  "Тазалау, пилингтер, ботулинотерапия, биоревитализация, SMAS-лифтинг және CO₂ лазері — ұқыпты, көрсетілім бойынша және табиғи нәтижемен.",
                ),
              )}
            </p>
            <div className="hero__cta" data-reveal style={d(300)}>
              <BookButton className="btn btn--light" arrow>
                {ui(lang, "bookOnline")}
              </BookButton>
              <a className="btn btn--ghost-light" href={href(lang, "/prices")}>
                {ui(lang, "priceList")}
              </a>
            </div>
            <p className="hero__promo" data-reveal style={d(400)}>
              <span>{t(l("Акция", "Акция"))}</span>
              {lang === "ru" ? (
                <>
                  8-этапная чистка лица — <b>15 000 ₸</b>
                </>
              ) : (
                <>
                  8 кезеңдік бет тазалау — <b>15 000 ₸</b>
                </>
              )}
            </p>
          </div>
        </HeroSlider>
        <div className="container hero__cards">
          {features.map((f, i) => (
            <article key={i} className="feature" data-reveal style={d(150 + i * 120)}>
              <div className="feature__icon">{f.icon}</div>
              <h3>{t(f.title)}</h3>
              <p>{t(f.text)}</p>
            </article>
          ))}
        </div>
      </section>

      {/* ---------- Welcome ---------- */}
      <section className="welcome" style={{ marginTop: "clamp(64px, 8vw, 110px)" }}>
        <div className="welcome__text">
          <span className="eyebrow" data-reveal>
            {t(l("Добро пожаловать", "Қош келдіңіз"))}
          </span>
          <h2 className="h-2" data-reveal style={d(80)}>
            {lang === "ru" ? (
              <>
                Пространство, где красота начинается <em>с заботы</em>
              </>
            ) : (
              <>
                Сұлулық <em>қамқорлықтан</em> басталатын кеңістік
              </>
            )}
          </h2>
          <p className="lead" data-reveal style={d(160)}>
            {t(
              l(
                "Мы соблюдаем все необходимые стандарты, используем сертифицированные препараты и работаем только с проверенными методиками. Наши врачи не просто подчёркивают красоту — они бережно работают с возрастными изменениями и качеством кожи.",
                "Біз барлық қажетті стандарттарды сақтаймыз, сертификатталған препараттарды қолданамыз және тек тексерілген әдістермен жұмыс істейміз. Дәрігерлеріміз сұлулықты ерекшелеп қана қоймай, жас өзгерістері мен тері сапасымен ұқыпты жұмыс істейді.",
              ),
            )}
          </p>
          <ul className="checklist">
            {[
              l("Чистки лица, пилинги и лечение акне", "Бет тазалау, пилингтер және акнені емдеу"),
              l("Ботулинотерапия, контурная пластика, биоревитализация", "Ботулинотерапия, контурлық пластика, биоревитализация"),
              l("SMAS-лифтинг Ulthera и Ultraformer, Morpheus 8, Endolift", "Ulthera және Ultraformer SMAS-лифтингі, Morpheus 8, Endolift"),
              l("Лазер CO₂ и программы коррекции фигуры", "CO₂ лазері және дене пішінін түзету бағдарламалары"),
            ].map((x, i) => (
              <li key={i} data-reveal style={d(200 + i * 80)}>
                <ICheck /> {t(x)}
              </li>
            ))}
          </ul>
          <div data-reveal style={d(500)}>
            <MoreLink lang={lang} path="/services" label={ui(lang, "allServices")} />
          </div>
        </div>
        <div className="welcome__media curtain" style={{ borderRadius: 0 }}>
          <Image src="/img/clinic/team.webp" alt={t(l("Команда AURA CLINIC", "AURA CLINIC командасы"))} fill sizes="(max-width: 900px) 100vw, 50vw" />
          <div className="welcome__badge">
            <strong>{site.rating.value}</strong>
            <div>
              <div className="stars">
                {Array.from({ length: 5 }, (_, k) => (
                  <IStar key={k} />
                ))}
              </div>
              <small>
                {site.rating.count} {t(l("оценки на 2ГИС", "баға 2ГИС-те"))}
              </small>
            </div>
          </div>
        </div>
      </section>

      <Ticker />

      {/* ---------- About ---------- */}
      <section className="section">
        <div className="container">
          <div className="about">
            <div className="about__media">
              <div className="curtain">
                <Image src="/img/clinic/facade.webp" alt={t(l("Вход в AURA CLINIC на ул. Курмангазы", "Құрманғазы көшесіндегі AURA CLINIC кіреберісі"))} fill sizes="(max-width: 900px) 100vw, 55vw" />
              </div>
              <div className="about__float" data-reveal="fade" style={d(500)}>
                <Image src="/img/clinic/procedure.webp" alt={t(l("Процедура в кабинете", "Кабинеттегі процедура"))} fill sizes="240px" />
              </div>
            </div>
            <div className="about__text">
              <span className="eyebrow" data-reveal>
                {ui(lang, "about")}
              </span>
              <h2 className="h-2" data-reveal style={d(80)}>
                {lang === "ru" ? (
                  <>
                    Beauty <em>&amp;</em> Health в центре Алматы
                  </>
                ) : (
                  <>
                    Алматы орталығындағы Beauty <em>&amp;</em> Health
                  </>
                )}
              </h2>
              <p data-reveal style={d(160)}>
                {t(
                  l(
                    "AURA CLINIC — косметологическая клиника на улице Курмангазы. Здесь работают врачи-косметологи и дерматокосметологи, которые владеют аппаратными и инъекционными методиками и подбирают процедуры по состоянию кожи, а не по шаблону.",
                    "AURA CLINIC — Құрманғазы көшесіндегі косметология клиникасы. Мұнда аппараттық және инъекциялық әдістерді меңгерген дәрігер-косметологтар мен дерматокосметологтар жұмыс істейді және процедураларды үлгі бойынша емес, тері күйіне қарай таңдайды.",
                  ),
                )}
              </p>
              <p data-reveal style={d(220)}>
                {t(
                  l(
                    "Омоложение — это всегда комплексная и поэтапная работа. Поэтому мы начинаем с консультации, объясняем, чего ждать от каждой процедуры, и даём рекомендации по домашнему уходу, чтобы результат сохранялся дольше.",
                    "Жасару — әрқашан кешенді әрі кезең-кезеңімен жүретін жұмыс. Сондықтан біз кеңестен бастаймыз, әр процедурадан не күту керегін түсіндіреміз және нәтиже ұзақ сақталуы үшін үйдегі күтім бойынша ұсыныстар береміз.",
                  ),
                )}
              </p>
              <div data-reveal style={d(300)}>
                <BookButton className="btn" arrow>
                  {t(l("Записаться на консультацию", "Кеңеске жазылу"))}
                </BookButton>
              </div>
            </div>
          </div>
          <div className="stats">
            {[
              { v: site.rating.value, k: l("рейтинг на 2ГИС", "2ГИС рейтингі") },
              { v: String(site.rating.count), k: l("оценки пациентов", "пациенттер бағасы") },
              { v: "6", k: l("врачей-косметологов", "дәрігер-косметолог") },
              { v: "12", s: "", k: l("часов в день, без выходных", "сағат күн сайын, демалыссыз") },
            ].map((s, i) => (
              <div className="stat" key={i} data-reveal style={d(i * 100)}>
                <strong data-count={s.v}>{s.v.replace(".", ",")}</strong>
                <span>{t(s.k)}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ---------- Quote ---------- */}
      <section className="section section--cream quote-band section--tight">
        <div className="container">
          <p className="quote" data-reveal>
            {lang === "ru" ? (
              <>
                «Ваше лицо — точно не та зона, на которой стоит экономить. Здесь лучше <em>один раз сделать всё правильно</em>, чем потом исправлять
                последствия.»
              </>
            ) : (
              <>
                «Сіздің бетіңіз — үнемдеуге болатын аймақ емес. Кейін салдарын түзегенше, <em>бір рет бәрін дұрыс жасаған</em> жөн.»
              </>
            )}
          </p>
          <p className="quote-band__sign" data-reveal style={d(150)}>
            — AURA CLINIC
          </p>
        </div>
      </section>

      {/* ---------- Services ---------- */}
      <section className="section section--white" id="services">
        <div className="container">
          <SecHead
            center
            eyebrow={ui(lang, "services")}
            title={lang === "ru" ? <>Косметология <em>для лица и тела</em></> : <>Бет пен денеге арналған <em>косметология</em></>}
            lead={t(
              l(
                "От профессиональной чистки до лифтинга без операции: девять направлений, сертифицированные препараты и современные аппараты.",
                "Кәсіби тазалаудан операциясыз лифтингке дейін: тоғыз бағыт, сертификатталған препараттар және заманауи аппараттар.",
              ),
            )}
          />
          <ServiceGrid lang={lang} />
        </div>
      </section>

      {/* ---------- Signature cleaning ---------- */}
      <section className="section section--dark on-dark">
        <div className="container signature">
          <div className="signature__aside">
            <span className="eyebrow" data-reveal>
              {t(l("Хит клиники", "Клиника хиті"))}
            </span>
            <h2 className="h-1" data-reveal style={d(80)}>
              {lang === "ru" ? (
                <>
                  Голливудская чистка — эффект <em>стеклянной кожи</em>
                </>
              ) : (
                <>
                  Голливудтық тазалау — <em>шыны тері</em> әсері
                </>
              )}
            </h2>
            <p className="lead" data-reveal style={d(160)}>
              {t(
                l(
                  "Комплексный уход в 8 этапов: очищение пор, восстановление и увлажнение за один визит. Подходит для всех типов кожи, без боли и реабилитации.",
                  "8 кезеңдік кешенді күтім: бір келуде кеуектерді тазарту, қалпына келтіру және ылғалдандыру. Барлық тері түріне жарайды, ауырсынусыз және қалпына келу кезеңінсіз.",
                ),
              )}
            </p>
            <div className="price-tag" data-reveal style={d(220)}>
              <strong>15 000 ₸</strong>
              <s>30 000 ₸</s>
              <span>{t(l("по акции", "акция бойынша"))}</span>
            </div>
            <div data-reveal style={d(280)}>
              <BookButton service="chistka" className="btn btn--gold" arrow>
                {t(l("Записаться на чистку", "Тазалауға жазылу"))}
              </BookButton>
            </div>
            <div className="signature__media curtain">
              <Image src="/img/clinic/procedure.webp" alt={t(l("Аквачистка в AURA CLINIC", "AURA CLINIC-те аква-тазалау"))} fill sizes="(max-width: 900px) 100vw, 45vw" />
            </div>
          </div>
          <div>
            <ol className="steps">
              {CLEAN_STEPS.map((s, i) => (
                <li key={i} data-reveal style={d((i % 4) * 90)}>
                  <b>{String(i + 1).padStart(2, "0")}</b>
                  <div>
                    <h3>{t(s.t)}</h3>
                    <p>{t(s.d)}</p>
                  </div>
                </li>
              ))}
            </ol>
            <div className="steps__gift" data-reveal>
              <IGift />
              {t(l("В завершение — SPA-уход для рук в подарок", "Соңында — сыйлыққа қолға SPA-күтім"))}
            </div>
          </div>
        </div>
      </section>

      {/* ---------- Results ---------- */}
      <section className="section section--cream" id="results">
        <div className="container">
          <ResultsRail
            tabs={results}
            prev={ui(lang, "prev")}
            next={ui(lang, "next")}
            head={
              <SecHead
                className="results-head__title"
                eyebrow={ui(lang, "results")}
                title={lang === "ru" ? <>Результаты <em>наших пациентов</em></> : <>Пациенттеріміздің <em>нәтижелері</em></>}
              />
            }
          />
          <p className="results-note">
            {t(l("Реальные фото «до / после» из Instagram клиники", "Клиника Instagram-ынан «дейін / кейін» нақты фотолары"))} ·{" "}
            <a href={site.instagram} target="_blank" rel="noopener noreferrer" style={{ textDecoration: "underline" }}>
              {site.instagramHandle}
            </a>
          </p>
        </div>
      </section>

      {/* ---------- Doctors ---------- */}
      <section className="section" id="doctors">
        <div className="container">
          <div className="sec-head sec-head--split">
            <SecHead
              eyebrow={ui(lang, "doctors")}
              title={lang === "ru" ? <>Врачи, которым <em>доверяют</em></> : <>Сенім артатын <em>дәрігерлер</em></>}
              className=""
            />
            <p className="lead" data-reveal>
              {t(
                l(
                  "Врачи-косметологи и дерматокосметологи с высшим медицинским образованием. Все владеют аппаратными и инъекционными методиками.",
                  "Жоғары медициналық білімі бар дәрігер-косметологтар мен дерматокосметологтар. Барлығы аппараттық және инъекциялық әдістерді меңгерген.",
                ),
              )}
            </p>
          </div>
          <Doctors lang={lang} />
        </div>
      </section>

      <CtaBand lang={lang} />

      {/* ---------- Weight loss ---------- */}
      <section className="section section--cream">
        <div className="container">
          <SecHead
            center
            eyebrow={t(l("Коррекция фигуры", "Дене пішінін түзету"))}
            title={lang === "ru" ? <>Программы <em>похудения</em></> : <>Арықтау <em>бағдарламалары</em></>}
            lead={t(
              l(
                "Пептиды, капельницы «Супер Slim», LPG-массаж и прессотерапия в одном курсе — от 2 до 4 недель.",
                "Пептидтер, «Супер Slim» тамшуырлары, LPG-массаж және прессотерапия бір курста — 2-ден 4 аптаға дейін.",
              ),
            )}
          />
          <Packages lang={lang} />
        </div>
      </section>

      <Reviews lang={lang} />

      <section className="section">
        <div className="container">
          <Faq lang={lang} />
        </div>
      </section>

      <section className="section section--white" id="contacts">
        <div className="container">
          <Visit lang={lang} />
        </div>
      </section>
    </>
  );
}
