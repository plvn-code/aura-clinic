"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { href, ui, type Lang } from "@/lib/i18n";
import { site } from "@/lib/site";
import { BookButton } from "./Booking";
import { IClose, IPhone } from "./Icons";
import { Logo } from "./Logo";

const NAV = [
  { path: "/", key: "home" },
  { path: "/services", key: "services" },
  { path: "/prices", key: "prices" },
  { path: "/doctors", key: "doctors" },
  { path: "/#results", key: "results" },
  { path: "/#reviews", key: "reviews" },
  { path: "/contacts", key: "contacts" },
] as const;

/** Path without the /kz prefix. */
function basePath(pathname: string) {
  if (pathname === "/kz") return "/";
  return pathname.startsWith("/kz/") ? pathname.slice(3) : pathname;
}

export function LangSwitch({ lang }: { lang: Lang }) {
  const pathname = usePathname() || "/";
  const base = basePath(pathname);
  return (
    <div className="lang" role="group" aria-label="Язык / Тіл">
      <Link href={href("ru", base)} aria-current={lang === "ru"} hrefLang="ru" lang="ru">
        RU
      </Link>
      <Link href={href("kz", base)} aria-current={lang === "kz"} hrefLang="kk" lang="kk">
        KZ
      </Link>
    </div>
  );
}

export function Header({ lang }: { lang: Lang }) {
  const pathname = usePathname() || "/";
  const base = basePath(pathname);
  const [scrolled, setScrolled] = useState(false);
  const [menu, setMenu] = useState(false);

  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 24);
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);

  useEffect(() => {
    setMenu(false);
  }, [pathname]);

  useEffect(() => {
    document.documentElement.style.overflow = menu ? "hidden" : "";
    if (!menu) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setMenu(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [menu]);

  const current = (p: string) => (p === "/" ? base === "/" : !p.includes("#") && base.startsWith(p));

  return (
    <>
      <header className={`header${scrolled ? " is-scrolled" : ""}`}>
        <div className="container header__top">
          <div className="header__meta">
            <a className="header__phone" href={site.phoneHref}>
              <IPhone /> {site.phone}
            </a>
            <span className="header__hours">
              <i aria-hidden="true" /> {ui(lang, "daily")} {site.hours}
            </span>
          </div>
          <Link href={href(lang, "/")} aria-label="AURA CLINIC">
            <Logo />
          </Link>
          <div className="header__actions">
            <LangSwitch lang={lang} />
            <BookButton className="btn btn--sm">{ui(lang, "book")}</BookButton>
            <a className="icon-btn" href={site.phoneHref} aria-label={ui(lang, "call")}>
              <IPhone />
            </a>
            <button className="burger" onClick={() => setMenu(true)} aria-label={ui(lang, "menu")} aria-expanded={menu}>
              <span />
            </button>
          </div>
        </div>
        <nav className="header__nav" aria-label={ui(lang, "menu")}>
          <ul className="container">
            {NAV.map((n) => (
              <li key={n.key}>
                <Link href={href(lang, n.path)} aria-current={current(n.path) ? "page" : undefined}>
                  {ui(lang, n.key)}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </header>

      <div className={`drawer${menu ? " is-open" : ""}`} aria-hidden={!menu} role="dialog" aria-modal="true" aria-label={ui(lang, "menu")}>
        <div className="drawer__head">
          <Logo light mark={false} />
          <button className="drawer__close" onClick={() => setMenu(false)} aria-label={ui(lang, "close")} tabIndex={menu ? 0 : -1}>
            <IClose />
          </button>
        </div>
        <nav>
          {NAV.map((n, i) => (
            <Link
              key={n.key}
              href={href(lang, n.path)}
              style={{ "--i": i } as React.CSSProperties}
              onClick={() => setMenu(false)}
              tabIndex={menu ? 0 : -1}
            >
              {ui(lang, n.key)} <small>0{i + 1}</small>
            </Link>
          ))}
        </nav>
        <div className="drawer__foot">
          <LangSwitch lang={lang} />
          <a href={site.phoneHref}>{site.phone}</a>
          <span>
            {ui(lang, "daily")} {site.hours}
          </span>
          <BookButton className="btn btn--gold">{ui(lang, "bookOnline")}</BookButton>
        </div>
      </div>
    </>
  );
}
