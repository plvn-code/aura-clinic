import Link from "next/link";
import { href, tr, ui, type Lang } from "@/lib/i18n";
import { SERVICES } from "@/lib/services";
import { site, waLink } from "@/lib/site";
import { I2gis, IInstagram, IWhatsapp } from "./Icons";
import { Logo } from "./Logo";
import { MadeBy } from "./MadeBy";

export function Footer({ lang }: { lang: Lang }) {
  const about = {
    ru: "Косметологическая клиника в центре Алматы: чистки, пилинги, инъекционная и аппаратная косметология, лазер и коррекция фигуры.",
    kz: "Алматы орталығындағы косметология клиникасы: тазалау, пилингтер, инъекциялық және аппараттық косметология, лазер және дене пішінін түзету.",
  };
  return (
    <footer className="footer on-dark">
      <div className="container footer__grid">
        <div className="footer__brand">
          <Logo light />
          <p>{tr(lang, about)}</p>
          <div className="footer__social">
            <a href={site.instagram} target="_blank" rel="noopener noreferrer" aria-label="Instagram">
              <IInstagram />
            </a>
            <a href={waLink()} target="_blank" rel="noopener noreferrer" aria-label="WhatsApp">
              <IWhatsapp />
            </a>
            <a href={site.twoGis} target="_blank" rel="noopener noreferrer" aria-label="2GIS">
              <I2gis />
            </a>
          </div>
        </div>
        <div>
          <h4>{ui(lang, "services")}</h4>
          <ul>
            {SERVICES.slice(0, 6).map((s) => (
              <li key={s.slug}>
                <Link href={href(lang, `/services/${s.slug}`)}>{tr(lang, s.title)}</Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h4>{ui(lang, "about")}</h4>
          <ul>
            <li>
              <Link href={href(lang, "/prices")}>{ui(lang, "priceList")}</Link>
            </li>
            <li>
              <Link href={href(lang, "/doctors")}>{ui(lang, "doctors")}</Link>
            </li>
            <li>
              <Link href={href(lang, "/#results")}>{ui(lang, "results")}</Link>
            </li>
            <li>
              <Link href={href(lang, "/#reviews")}>{ui(lang, "reviews")}</Link>
            </li>
            <li>
              <Link href={href(lang, "/contacts")}>{ui(lang, "contacts")}</Link>
            </li>
          </ul>
        </div>
        <div>
          <h4>{ui(lang, "contacts")}</h4>
          <ul>
            <li>{tr(lang, site.address)}</li>
            <li>
              <a href={site.phoneHref}>{site.phone}</a>
            </li>
            <li>
              {ui(lang, "daily")} {site.hours}
            </li>
            <li>
              <a href={site.instagram} target="_blank" rel="noopener noreferrer">
                {site.instagramHandle}
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="footer__big" aria-hidden="true">
        AURA
      </div>
      <div className="container footer__bottom">
        <span>
          © {new Date().getFullYear()} AURA CLINIC. {ui(lang, "rights")} {ui(lang, "disclaimer")}
        </span>
        <MadeBy />
      </div>
    </footer>
  );
}
