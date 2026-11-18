/**
 * Two languages: Russian (default, served at `/…`) and Kazakh (served at `/kz/…`).
 * Internally every page lives under `app/[lang]` with lang = "ru" | "kz";
 * `src/middleware.ts` rewrites `/x` → `/ru/x` so Russian URLs stay clean.
 * Kazakh copy was translated by us — the clinic should proofread it (docs/STATUS.md).
 */
export const LANGS = ["ru", "kz"] as const;
export type Lang = (typeof LANGS)[number];
export type L = { ru: string; kz: string };

export const isLang = (v: string): v is Lang => (LANGS as readonly string[]).includes(v);

/** Localised internal href: ru → "/path", kz → "/kz/path". */
export function href(lang: Lang, path = "/") {
  if (lang === "ru") return path;
  return path === "/" ? "/kz" : `/kz${path}`;
}

export const htmlLang = (lang: Lang) => (lang === "kz" ? "kk" : "ru");

/** UI strings. */
const UI = {
  book: { ru: "Записаться", kz: "Жазылу" },
  bookOnline: { ru: "Записаться онлайн", kz: "Онлайн жазылу" },
  call: { ru: "Позвонить", kz: "Қоңырау шалу" },
  whatsapp: { ru: "Написать в WhatsApp", kz: "WhatsApp-қа жазу" },
  priceList: { ru: "Прайс-лист", kz: "Прайс-парақ" },
  allServices: { ru: "Все услуги", kz: "Барлық қызметтер" },
  more: { ru: "Подробнее", kz: "Толығырақ" },
  home: { ru: "Главная", kz: "Басты бет" },
  services: { ru: "Услуги", kz: "Қызметтер" },
  prices: { ru: "Цены", kz: "Бағалар" },
  doctors: { ru: "Врачи", kz: "Дәрігерлер" },
  results: { ru: "Результаты", kz: "Нәтижелер" },
  reviews: { ru: "Отзывы", kz: "Пікірлер" },
  about: { ru: "О клинике", kz: "Клиника туралы" },
  contacts: { ru: "Контакты", kz: "Байланыс" },
  daily: { ru: "Ежедневно", kz: "Күн сайын" },
  byAppointment: { ru: "по предварительной записи", kz: "алдын ала жазылу бойынша" },
  address: { ru: "Адрес", kz: "Мекенжай" },
  hours: { ru: "Часы работы", kz: "Жұмыс уақыты" },
  phone: { ru: "Телефон", kz: "Телефон" },
  menu: { ru: "Меню", kz: "Мәзір" },
  close: { ru: "Закрыть", kz: "Жабу" },
  from: { ru: "от", kz: "бастап" },
  skip: { ru: "Перейти к содержанию", kz: "Мазмұнға өту" },
  prev: { ru: "Назад", kz: "Артқа" },
  next: { ru: "Вперёд", kz: "Алға" },
  rights: { ru: "Все права защищены.", kz: "Барлық құқықтар қорғалған." },
  disclaimer: {
    ru: "Имеются противопоказания. Необходима консультация специалиста.",
    kz: "Қарсы көрсетілімдері бар. Маманның кеңесі қажет.",
  },
} satisfies Record<string, L>;

export type UIKey = keyof typeof UI;
export const ui = (lang: Lang, key: UIKey) => UI[key][lang];
export const tr = (lang: Lang, v: L) => v[lang];
