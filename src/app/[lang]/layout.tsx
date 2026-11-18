import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Manrope } from "next/font/google";
import { notFound } from "next/navigation";
import "../globals.css";
import { BookingProvider } from "@/components/Booking";
import { Effects } from "@/components/Effects";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { IWhatsapp } from "@/components/Icons";
import { htmlLang, isLang, LANGS, ui, type Lang } from "@/lib/i18n";
import { site, waLink } from "@/lib/site";

/**
 * Cormorant Garamond — high-contrast display serif (headings, prices, quotes);
 * Manrope — calm geometric sans for text and UI. Both ship cyrillic-ext, which covers Kazakh letters (ә ғ қ ң ө ұ ү һ і).
 */
const serif = Cormorant_Garamond({
  subsets: ["latin", "cyrillic", "cyrillic-ext"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
  variable: "--serif",
  display: "swap",
});
const sans = Manrope({
  subsets: ["latin", "cyrillic", "cyrillic-ext"],
  weight: ["400", "500", "600", "700"],
  variable: "--sans",
  display: "swap",
});

export const dynamicParams = false;
export function generateStaticParams() {
  return LANGS.map((lang) => ({ lang }));
}

const META = {
  ru: {
    title: "AURA CLINIC — косметологическая клиника в Алматы",
    description:
      "Чистка лица, пилинги, ботулинотерапия, контурная пластика, биоревитализация, SMAS-лифтинг, лазер CO₂ и программы похудения. Ул. Курмангазы, 100а. Ежедневно 09:00–21:00.",
  },
  kz: {
    title: "AURA CLINIC — Алматыдағы косметология клиникасы",
    description:
      "Бет тазалау, пилингтер, ботулинотерапия, контурлық пластика, биоревитализация, SMAS-лифтинг, CO₂ лазері және арықтау бағдарламалары. Құрманғазы к-сі, 100а. Күн сайын 09:00–21:00.",
  },
};

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params;
  const m = META[isLang(lang) ? lang : "ru"];
  return {
    metadataBase: new URL(site.url),
    title: { default: m.title, template: "%s — AURA CLINIC" },
    description: m.description,
    robots: site.indexable ? undefined : { index: false, follow: false },
    alternates: { languages: { ru: "/", kk: "/kz" } },
    openGraph: {
      type: "website",
      siteName: "AURA CLINIC",
      locale: lang === "kz" ? "kk_KZ" : "ru_KZ",
      title: m.title,
      description: m.description,
      images: ["/img/stock/hero-1.webp"],
    },
  };
}

export const viewport: Viewport = {
  themeColor: "#f8f4ef",
  colorScheme: "light",
};

export default async function RootLayout({ children, params }: { children: React.ReactNode; params: Promise<{ lang: string }> }) {
  const { lang: raw } = await params;
  if (!isLang(raw)) notFound();
  const lang: Lang = raw;
  return (
    <html lang={htmlLang(lang)} className={`${serif.variable} ${sans.variable}`} data-scroll-behavior="smooth">
      <body>
        <BookingProvider lang={lang}>
          <a href="#main" className="skip-link">
            {ui(lang, "skip")}
          </a>
          <Header lang={lang} />
          <main id="main">{children}</main>
          <Footer lang={lang} />
          <a className="fab" href={waLink()} target="_blank" rel="noopener noreferrer" aria-label={ui(lang, "whatsapp")}>
            <IWhatsapp />
          </a>
        </BookingProvider>
        <Effects />
      </body>
    </html>
  );
}
