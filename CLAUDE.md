# AURA CLINIC — сайт косметологической клиники (клиент)

Косметология в Алматы, ул. Курмангазы, 100а (Алмалинский р-н). Instagram @aura_clinic__ (23,5K), WhatsApp/тел. +7 747 750 07 54, ежедневно 09:00–21:00 по записи, 2ГИС 4.8 (673 оценки, firm 70000001093655913).
Заказчик назвал её «стоматологией», но по Instagram это **косметология** — пользователь подтвердил (2026-11-18). Референс по структуре/настроению: thedentalclinicmn.com (двухъярусная шапка, слайдер с карточками внахлёст, welcome-сплит, сетка услуг с плашками, CTA-баннер, слайдер отзывов на фото, «как добраться»).

**С пользователем говорим по-русски.** Сайт — **RU (по умолчанию, `/…`) + KZ (`/kz/…`)**. Казахский перевели мы — клиенту нужно вычитать.

Сначала читай `docs/STATUS.md`.

GitHub: github.com/plvn-code/aura-clinic (branch `main`) — после завершённых задач commit + push. Vercel пока нет — сначала спросить пользователя.

## Команды

```bash
npm run build && npm start            # production на :3020 (3019 basamunka)
npm run dev                           # dev на :3020
npm run lint && npx tsc --noEmit      # должны быть чистыми
kill $(lsof -ti tcp:3020 -sTCP:LISTEN)
open -a "Google Chrome" http://localhost:3020
~/Desktop/nudes/research/.venv/bin/python -I scripts/build_media.py [stock|clinic]   # пересобрать public/img/*.webp
```

`node_modules` — **симлинк** на `~/Desktop/nudes/node_modules` (тот же package.json; на Mac мало места).

## Стек

Next.js 15 App Router · React 19 · TS strict · plain CSS (`src/app/globals.css`, токены в `:root`) · next/font: **Cormorant Garamond** (заголовки, цены, цитаты; `em` = курсив золотом) + **Manrope** (текст/UI), оба с cyrillic-ext (казахские буквы). Без БД и бэкенда.

## Структура

```
src/middleware.ts      "/x" → rewrite "/ru/x"; "/ru/x" → 308 на "/x"; "/kz/x" как есть
src/app/[lang]/        корневой layout (html lang ru|kk) · / · /services · /services/[slug] (9) · /prices · /doctors · /contacts
src/lib/i18n.ts        Lang, href(lang, path), UI-строки {ru, kz}
src/lib/prices.ts      ПОЛНЫЙ прайс 1:1 из хайлайта PRICE (10 слайдов) — цены менять только здесь
src/lib/services.ts    9 направлений (slug = id категории прайса)
src/lib/content.ts     врачи (хайлайт ВРАЧИ), отзывы (скрины 2ГИС), 8 этапов чистки, пакеты похудения S/M/L, FAQ, бренды
src/lib/site.ts        контакты, гео, 2ГИС, waLink()
src/components/        Header (2 яруса + drawer), Footer, Booking (панель записи → WhatsApp с готовым текстом),
                       Effects ([data-reveal], .curtain, [data-count], [data-parallax]), Sections, PriceTable, PriceList (поиск + scroll-spy),
                       home/HeroSlider, home/ResultsRail, home/ReviewsSlider
public/img/            stock/ (Unsplash, лицензия Unsplash — originals/stock/SOURCES.json) · clinic/ · doctors/ · results/ (до/после из хайлайтов)
originals/, research/  сырьё Instagram (ig_posts.json, ig_hl.json, captions.txt, sheets/) — в git не идут
```

## Правила

- Не выдумывать цены/факты: источник — `research/captions.txt`, хайлайты PRICE/ВРАЧИ/ПОХУДЕНИЯ/Отзыв.
- Запись = WhatsApp (без хранения персональных данных). Любая кнопка «Записаться» — `<BookButton service?="slug">`.
- `.curtain`: clip-path стоит на `<img>`, не на контейнере (IntersectionObserver в Chromium учитывает clip-path самой цели).
- Анимации «в меру», всё под `prefers-reduced-motion`.
