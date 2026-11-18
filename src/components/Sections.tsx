import Image from "next/image";
import Link from "next/link";
import { BRANDS, DOCTORS, FAQ, PACKAGES, REVIEWS } from "@/lib/content";
import { href, tr, ui, type L, type Lang } from "@/lib/i18n";
import { fmt } from "@/lib/prices";
import { SERVICES } from "@/lib/services";
import { mapEmbed, site, waLink } from "@/lib/site";
import { BookButton } from "./Booking";
import { I2gis, IArrow, IClock, IInstagram, IPhone, IPin, IWhatsapp } from "./Icons";
import { ReviewsSlider } from "./home/ReviewsSlider";

const l = (ru: string, kz: string): L => ({ ru, kz });

export function SecHead({
  eyebrow,
  title,
  lead,
  center,
  className = "",
}: {
  eyebrow?: string;
  title: React.ReactNode;
  lead?: React.ReactNode;
  center?: boolean;
  className?: string;
}) {
  return (
    <div className={`sec-head${center ? " sec-head--center" : ""} ${className}`}>
      {eyebrow && (
        <span className={`eyebrow${center ? " eyebrow--center" : ""}`} data-reveal>
          {eyebrow}
        </span>
      )}
      <h2 className="h-2" data-reveal style={{ "--d": 80 } as React.CSSProperties}>
        {title}
      </h2>
      {lead && (
        <p className="lead" data-reveal style={{ "--d": 160 } as React.CSSProperties}>
          {lead}
        </p>
      )}
    </div>
  );
}

export function PageHero({
  lang,
  crumb,
  title,
  lead,
  image,
  children,
}: {
  lang: Lang;
  crumb: { label: string; path?: string }[];
  title: React.ReactNode;
  lead?: React.ReactNode;
  image?: string;
  children?: React.ReactNode;
}) {
  return (
    <section className={`page-hero${image ? " page-hero--image" : ""}`}>
      {image && (
        <div className="page-hero__bg">
          <Image src={image} alt="" fill priority sizes="100vw" quality={80} />
        </div>
      )}
      <div className="container">
        <div className="page-hero__inner">
          <nav className="crumbs" aria-label="breadcrumbs" data-reveal>
            <Link href={href(lang, "/")}>{ui(lang, "home")}</Link>
            {crumb.map((c) =>
              c.path ? (
                <span key={c.label}>
                  <Link href={href(lang, c.path)}>{c.label}</Link>
                </span>
              ) : (
                <span key={c.label}>{c.label}</span>
              ),
            )}
          </nav>
          <h1 className="h-1" data-reveal style={{ "--d": 80 } as React.CSSProperties}>
            {title}
          </h1>
          {lead && (
            <p className="lead" data-reveal style={{ "--d": 160 } as React.CSSProperties}>
              {lead}
            </p>
          )}
          {children && (
            <div data-reveal style={{ "--d": 240 } as React.CSSProperties}>
              {children}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

export function Ticker() {
  const row = [...BRANDS, ...BRANDS];
  return (
    <div className="ticker" aria-hidden="true">
      <div className="ticker__track">
        {row.map((b, i) => (
          <span key={i}>{b}</span>
        ))}
      </div>
    </div>
  );
}

export function ServiceGrid({ lang, only }: { lang: Lang; only?: string[] }) {
  const list = only ? SERVICES.filter((s) => only.includes(s.slug)) : SERVICES;
  return (
    <div className="services">
      {list.map((s, i) => (
        <Link
          key={s.slug}
          href={href(lang, `/services/${s.slug}`)}
          className="svc"
          data-reveal
          style={{ "--d": (i % 3) * 110 } as React.CSSProperties}
        >
          <div className="svc__img">
            <Image src={s.image} alt={tr(lang, s.title)} fill sizes="(max-width: 640px) 100vw, (max-width: 1100px) 50vw, 400px" />
            <p className="svc__hint">{tr(lang, s.short)}</p>
          </div>
          <span className="svc__chip">
            {tr(lang, s.title)}
            <small>
              {lang === "ru" ? `от ${fmt(s.priceFrom)}` : `${fmt(s.priceFrom)} бастап`}
            </small>
          </span>
        </Link>
      ))}
    </div>
  );
}

export function Doctors({ lang, rail }: { lang: Lang; rail?: boolean }) {
  return (
    <div className={`doctors${rail ? " doctors--rail" : ""}`}>
      {DOCTORS.map((d, i) => (
        <article key={d.photo} className="doctor" data-reveal style={{ "--d": (i % 3) * 110 } as React.CSSProperties}>
          <div className="doctor__photo">
            <Image src={d.photo} alt={tr(lang, d.name)} fill sizes="(max-width: 640px) 80vw, 400px" />
            {d.exp && <span className="doctor__exp">{tr(lang, d.exp)}</span>}
          </div>
          <h3>{tr(lang, d.name)}</h3>
          <p className="doctor__role">{tr(lang, d.role)}</p>
          <p className="doctor__focus">{tr(lang, d.focus)}</p>
        </article>
      ))}
    </div>
  );
}

export function Packages({ lang }: { lang: Lang }) {
  return (
    <>
      <div className="packages">
        {PACKAGES.map((p, i) => (
          <article key={p.size} className={`pkg${i === 1 ? " pkg--accent" : ""}`} data-reveal style={{ "--d": i * 110 } as React.CSSProperties}>
            <div className="pkg__head">
              <span className="pkg__size">{p.size}</span>
              <span className="pkg__weeks">{tr(lang, p.weeks)}</span>
            </div>
            <p className="pkg__price">{fmt(p.price)}</p>
            <ul>
              {p.items.map((it) => (
                <li key={it.ru}>{tr(lang, it)}</li>
              ))}
            </ul>
            <BookButton service="body" className={`btn${i === 1 ? " btn--gold" : " btn--ghost"}`}>
              {ui(lang, "book")}
            </BookButton>
          </article>
        ))}
      </div>
      <p className="packages__note" data-reveal>
        {tr(
          lang,
          l(
            "Результат в снижении веса — уже в первую неделю. Всё проходит под контролем врача, бережно для тела и здоровья.",
            "Салмақ төмендеуінің нәтижесі — алғашқы аптада. Барлығы дәрігердің бақылауымен, денеге және денсаулыққа ұқыпты өтеді.",
          ),
        )}
      </p>
    </>
  );
}

export function Faq({ lang }: { lang: Lang }) {
  return (
    <div className="faq">
      <SecHead
        eyebrow={tr(lang, l("Вопросы и ответы", "Сұрақтар мен жауаптар"))}
        title={lang === "ru" ? <>Частые <em>вопросы</em></> : <>Жиі қойылатын <em>сұрақтар</em></>}
        lead={tr(lang, l("Не нашли ответ? Напишите нам в WhatsApp — косметолог подскажет.", "Жауап таппадыңыз ба? WhatsApp-қа жазыңыз — косметолог кеңес береді."))}
      />
      <div className="faq__list" data-reveal>
        {FAQ.map((f, i) => (
          <details key={i} open={i === 0}>
            <summary>
              {tr(lang, f.q)}
              <i aria-hidden="true" />
            </summary>
            <p>{tr(lang, f.a)}</p>
          </details>
        ))}
      </div>
    </div>
  );
}

export function Reviews({ lang }: { lang: Lang }) {
  const items = REVIEWS.map((r) => ({ text: r.text, name: r.name, meta: `${tr(lang, r.service)} · ${tr(lang, r.date)}` }));
  return (
    <section className="reviews on-dark" id="reviews">
      <div className="reviews__bg" data-parallax="0.08">
        <Image src="/img/clinic/facade.webp" alt="" fill sizes="100vw" quality={70} />
      </div>
      <div className="container">
        <SecHead center eyebrow={ui(lang, "reviews")} title={lang === "ru" ? <>Что говорят <em>пациенты</em></> : <>Пациенттер <em>не дейді</em></>} />
        <ReviewsSlider items={items} prev={ui(lang, "prev")} next={ui(lang, "next")} />
        <div className="reviews__source">
          <a href={site.twoGis} target="_blank" rel="noopener noreferrer">
            <I2gis /> {site.rating.value} ★ · {site.rating.count} {lang === "ru" ? "оценки на 2ГИС" : "баға 2ГИС-те"}
          </a>
        </div>
      </div>
    </section>
  );
}

export function CtaBand({ lang, image = "/img/stock/tex-cream.webp" }: { lang: Lang; image?: string }) {
  return (
    <section className="cta-band">
      <div className="cta-band__bg" data-parallax="0.1">
        <Image src={image} alt="" fill sizes="100vw" quality={70} />
      </div>
      <div className="container">
        <span className="eyebrow eyebrow--center" style={{ color: "var(--gold-soft)" }} data-reveal>
          AURA CLINIC
        </span>
        <h2 className="h-1" data-reveal style={{ "--d": 80 } as React.CSSProperties}>
          {lang === "ru" ? (
            <>
              Ваша кожа — <em>наш приоритет</em>
            </>
          ) : (
            <>
              Сіздің теріңіз — <em>біздің басымдық</em>
            </>
          )}
        </h2>
        <p data-reveal style={{ "--d": 160 } as React.CSSProperties}>
          {tr(
            lang,
            l(
              "Начните с консультации: оценим состояние кожи и составим индивидуальный план процедур и домашнего ухода.",
              "Кеңестен бастаңыз: тері күйін бағалап, процедуралар мен үйдегі күтімнің жеке жоспарын құрамыз.",
            ),
          )}
        </p>
        <div className="cta-band__btns" data-reveal style={{ "--d": 240 } as React.CSSProperties}>
          <BookButton className="btn btn--light" arrow>
            {ui(lang, "bookOnline")}
          </BookButton>
          <a className="btn btn--ghost-light" href={site.phoneHref}>
            <IPhone /> {site.phone}
          </a>
        </div>
      </div>
    </section>
  );
}

export function Visit({ lang, withHead = true }: { lang: Lang; withHead?: boolean }) {
  return (
    <div className="visit">
      <div className="visit__info">
        {withHead && (
          <SecHead
            eyebrow={tr(lang, l("Как нас найти", "Бізді қалай табуға болады"))}
            title={lang === "ru" ? <>Ждём вас <em>в центре</em> Алматы</> : <>Сізді Алматы <em>орталығында</em> күтеміз</>}
            className=""
          />
        )}
        <div className="visit__rows" data-reveal>
          <div className="visit__row">
            <IPin />
            <div>
              <small>{ui(lang, "address")}</small>
              <b>{tr(lang, site.address)}</b>
              <span>{tr(lang, site.district)}</span>
            </div>
          </div>
          <div className="visit__row">
            <IClock />
            <div>
              <small>{ui(lang, "hours")}</small>
              <b>
                {ui(lang, "daily")} {site.hours}
              </b>
              <span>{ui(lang, "byAppointment")}</span>
            </div>
          </div>
          <div className="visit__row">
            <IPhone />
            <div>
              <small>{ui(lang, "phone")}</small>
              <a href={site.phoneHref}>{site.phone}</a>
              <span>WhatsApp · {ui(lang, "call")}</span>
            </div>
          </div>
          <div className="visit__row">
            <IInstagram />
            <div>
              <small>Instagram</small>
              <a href={site.instagram} target="_blank" rel="noopener noreferrer">
                {site.instagramHandle}
              </a>
              <span>{site.followers} {lang === "ru" ? "подписчиков" : "жазылушы"}</span>
            </div>
          </div>
        </div>
        <div className="visit__btns" data-reveal>
          <a className="btn" href={waLink()} target="_blank" rel="noopener noreferrer">
            <IWhatsapp /> WhatsApp
          </a>
          <a className="btn btn--ghost" href={site.twoGis} target="_blank" rel="noopener noreferrer">
            <I2gis /> {lang === "ru" ? "Маршрут в 2ГИС" : "2ГИС-те маршрут"}
          </a>
        </div>
      </div>
      <div className="map" data-reveal="fade">
        <iframe src={mapEmbed} title={tr(lang, site.address)} loading="lazy" referrerPolicy="no-referrer-when-downgrade" />
        <div className="map__facade">
          <Image src="/img/clinic/facade.webp" alt={tr(lang, l("Вход в AURA CLINIC", "AURA CLINIC кіреберісі"))} width={380} height={285} />
        </div>
      </div>
    </div>
  );
}

export function MoreLink({ lang, path, label }: { lang: Lang; path: string; label: string }) {
  return (
    <Link className="link-arrow" href={href(lang, path)}>
      {label} <IArrow />
    </Link>
  );
}
