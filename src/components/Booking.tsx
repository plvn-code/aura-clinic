"use client";

/**
 * Booking side panel. No backend and no stored personal data: the form composes a message
 * and opens WhatsApp (the clinic's booking channel from its Instagram bio) with it pre-filled.
 * Any «Записаться» button = <BookButton service?="slug">.
 */
import { createContext, useCallback, useContext, useEffect, useRef, useState } from "react";
import type { Lang } from "@/lib/i18n";
import { SERVICES } from "@/lib/services";
import { site, waLink } from "@/lib/site";
import { IArrow, IClose, IWhatsapp } from "./Icons";

type Ctx = { open: (service?: string) => void };
const BookingCtx = createContext<Ctx>({ open: () => {} });

const T = {
  title: { ru: "Запись", kz: "Жазылу" },
  intro: {
    ru: "Оставьте контакты — заявка откроется в WhatsApp с уже заполненным текстом. Администратор подтвердит время.",
    kz: "Байланыс деректерін қалдырыңыз — өтінім дайын мәтінмен WhatsApp-та ашылады. Әкімші уақытты растайды.",
  },
  name: { ru: "Ваше имя", kz: "Атыңыз" },
  phone: { ru: "Телефон", kz: "Телефон" },
  service: { ru: "Процедура", kz: "Процедура" },
  consult: { ru: "Консультация косметолога", kz: "Косметолог кеңесі" },
  when: { ru: "Удобное время", kz: "Ыңғайлы уақыт" },
  whenPh: { ru: "Например, завтра после 18:00", kz: "Мысалы, ертең 18:00-ден кейін" },
  send: { ru: "Отправить в WhatsApp", kz: "WhatsApp-қа жіберу" },
  note: {
    ru: "Нажимая кнопку, вы соглашаетесь на обработку данных для записи.",
    kz: "Түймені басу арқылы жазылу үшін деректерді өңдеуге келісесіз.",
  },
  errName: { ru: "Укажите имя", kz: "Атыңызды жазыңыз" },
  errPhone: { ru: "Проверьте номер телефона", kz: "Телефон нөмірін тексеріңіз" },
  orCall: { ru: "Или позвоните:", kz: "Немесе қоңырау шалыңыз:" },
  hours: { ru: "Ежедневно 09:00 – 21:00", kz: "Күн сайын 09:00 – 21:00" },
  done: { ru: "Спасибо! Мы открыли WhatsApp — отправьте сообщение, и администратор свяжется с вами.", kz: "Рақмет! WhatsApp ашылды — хабарламаны жіберіңіз, әкімші сізбен байланысады." },
  msgHello: { ru: "Здравствуйте! Хочу записаться в AURA CLINIC.", kz: "Сәлеметсіз бе! AURA CLINIC-ке жазылғым келеді." },
  msgName: { ru: "Имя", kz: "Аты" },
  msgPhone: { ru: "Телефон", kz: "Телефон" },
  msgService: { ru: "Процедура", kz: "Процедура" },
  msgWhen: { ru: "Удобное время", kz: "Ыңғайлы уақыт" },
};

export function BookingProvider({ lang, children }: { lang: Lang; children: React.ReactNode }) {
  const [isOpen, setOpen] = useState(false);
  const [service, setService] = useState("consult");
  const [errors, setErrors] = useState<{ name?: string; phone?: string }>({});
  const [sent, setSent] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);
  const lastFocus = useRef<HTMLElement | null>(null);
  const t = (k: keyof typeof T) => T[k][lang];

  const open = useCallback((s?: string) => {
    lastFocus.current = document.activeElement as HTMLElement;
    setService(s && SERVICES.some((x) => x.slug === s) ? s : "consult");
    setErrors({});
    setSent(false);
    setOpen(true);
  }, []);

  const close = useCallback(() => {
    setOpen(false);
    lastFocus.current?.focus?.();
  }, []);

  useEffect(() => {
    if (!isOpen) return;
    document.documentElement.style.overflow = "hidden";
    const id = window.setTimeout(() => panelRef.current?.querySelector<HTMLInputElement>("input")?.focus(), 350);
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && close();
    window.addEventListener("keydown", onKey);
    return () => {
      document.documentElement.style.overflow = "";
      window.clearTimeout(id);
      window.removeEventListener("keydown", onKey);
    };
  }, [isOpen, close]);

  function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    const name = String(f.get("name") || "").trim().slice(0, 80);
    const phone = String(f.get("phone") || "").trim().slice(0, 30);
    const when = String(f.get("when") || "").trim().slice(0, 120);
    const svc = String(f.get("service") || "consult");
    const next: typeof errors = {};
    if (name.length < 2) next.name = t("errName");
    if (phone.replace(/\D/g, "").length < 10) next.phone = t("errPhone");
    setErrors(next);
    if (Object.keys(next).length) return;
    const svcTitle = svc === "consult" ? t("consult") : SERVICES.find((s) => s.slug === svc)?.title[lang] ?? svc;
    const msg = [
      t("msgHello"),
      `${t("msgName")}: ${name}`,
      `${t("msgPhone")}: ${phone}`,
      `${t("msgService")}: ${svcTitle}`,
      when && `${t("msgWhen")}: ${when}`,
    ]
      .filter(Boolean)
      .join("\n");
    window.open(waLink(msg), "_blank", "noopener,noreferrer");
    setSent(true);
  }

  return (
    <BookingCtx.Provider value={{ open }}>
      {children}
      <div className={`booking${isOpen ? " is-open" : ""}`} aria-hidden={!isOpen}>
        <div className="booking__scrim" onClick={close} />
        <div className="booking__panel" ref={panelRef} role="dialog" aria-modal="true" aria-labelledby="booking-title">
          <div className="booking__head">
            <h2 id="booking-title">{t("title")}</h2>
            <button className="booking__close" onClick={close} aria-label={lang === "kz" ? "Жабу" : "Закрыть"} tabIndex={isOpen ? 0 : -1}>
              <IClose />
            </button>
          </div>
          <p className="booking__intro">{sent ? t("done") : t("intro")}</p>
          {isOpen && (
            <form className="form" onSubmit={submit} noValidate>
              <div className="field">
                <label htmlFor="b-name">{t("name")}</label>
                <input id="b-name" name="name" autoComplete="name" required aria-invalid={!!errors.name} />
                {errors.name && <span className="field__error">{errors.name}</span>}
              </div>
              <div className="field">
                <label htmlFor="b-phone">{t("phone")}</label>
                <input id="b-phone" name="phone" type="tel" inputMode="tel" autoComplete="tel" placeholder="+7 ___ ___ __ __" required aria-invalid={!!errors.phone} />
                {errors.phone && <span className="field__error">{errors.phone}</span>}
              </div>
              <div className="field">
                <label htmlFor="b-service">{t("service")}</label>
                <select id="b-service" name="service" value={service} onChange={(e) => setService(e.target.value)}>
                  <option value="consult">{t("consult")}</option>
                  {SERVICES.map((s) => (
                    <option key={s.slug} value={s.slug}>
                      {s.title[lang]}
                    </option>
                  ))}
                </select>
              </div>
              <div className="field">
                <label htmlFor="b-when">{t("when")}</label>
                <input id="b-when" name="when" placeholder={t("whenPh")} />
              </div>
              <button className="btn btn--gold" type="submit">
                <IWhatsapp /> {t("send")}
              </button>
              <p className="form__note">{t("note")}</p>
            </form>
          )}
          <div className="booking__alt">
            <span>{t("orCall")}</span>
            <a href={site.phoneHref}>{site.phone}</a>
            <span>{t("hours")}</span>
          </div>
        </div>
      </div>
    </BookingCtx.Provider>
  );
}

export function BookButton({
  service,
  className = "btn",
  children,
  arrow = false,
}: {
  service?: string;
  className?: string;
  children: React.ReactNode;
  arrow?: boolean;
}) {
  const { open } = useContext(BookingCtx);
  return (
    <button type="button" className={className} onClick={() => open(service)}>
      {children}
      {arrow && <IArrow />}
    </button>
  );
}
