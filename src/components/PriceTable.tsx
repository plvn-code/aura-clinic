import { fmt, type PriceGroup } from "@/lib/prices";
import type { Lang } from "@/lib/i18n";

const FROM = { ru: "от", kz: "бастап" };

function Price({ n, from, lang }: { n: number; from?: boolean; lang: Lang }) {
  if (!from) return <>{fmt(n)}</>;
  return lang === "ru" ? (
    <>
      <em>{FROM.ru}</em>
      {fmt(n)}
    </>
  ) : (
    <>
      {fmt(n)} <em>{FROM.kz}</em>
    </>
  );
}

export function PriceTable({ group, lang, fallbackTitle }: { group: PriceGroup; lang: Lang; fallbackTitle?: string }) {
  const title = group.title?.[lang] ?? fallbackTitle;
  return (
    <div className="ptable">
      {(title || group.cols) && (
        <div className="ptable__title">
          <div>
            {title && <h3>{title}</h3>}
            {group.note && <p>{group.note[lang]}</p>}
          </div>
          {group.cols && (
            <div className="ptable__cols">
              <span>{group.cols[0][lang]}</span>
              <span>{group.cols[1][lang]}</span>
            </div>
          )}
        </div>
      )}
      {group.items.map((it, k) => (
        <div key={k} className={`prow${Array.isArray(it.p) ? " prow--cols" : ""}`}>
          <span className="prow__name">
            {it.n[lang]}
            {it.note && <small>{it.note[lang]}</small>}
          </span>
          {Array.isArray(it.p) ? (
            <>
              <span className="prow__price prow__price--2">{fmt(it.p[0])}</span>
              <span className="prow__price prow__price--2">{fmt(it.p[1])}</span>
            </>
          ) : (
            <span className="prow__price">
              <Price n={it.p} from={it.from} lang={lang} />
            </span>
          )}
        </div>
      ))}
    </div>
  );
}
