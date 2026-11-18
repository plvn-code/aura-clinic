/** Clinic facts. Source: Instagram @aura_clinic__ bio + 2GIS card (firm 70000001093655913), checked 2026-11-18. */
export const site = {
  name: "AURA CLINIC",
  url: process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3020",
  /** Search engines stay out until the client approves the launch. */
  indexable: process.env.NEXT_PUBLIC_ALLOW_INDEXING === "true",
  phone: "+7 747 750 07 54",
  phoneHref: "tel:+77477500754",
  whatsapp: "77477500754",
  instagram: "https://www.instagram.com/aura_clinic__/",
  instagramHandle: "@aura_clinic__",
  address: { ru: "ул. Курмангазы, 100а, Алматы", kz: "Құрманғазы көшесі, 100а, Алматы" },
  district: { ru: "Алмалинский район", kz: "Алмалы ауданы" },
  hours: "09:00 – 21:00",
  geo: { lat: 43.243277, lng: 76.928822 },
  twoGis: "https://2gis.kz/almaty/firm/70000001093655913",
  rating: { value: "4.8", count: 673, reviews: 351 },
  followers: "23,5K",
};

export function waLink(text?: string) {
  return `https://wa.me/${site.whatsapp}${text ? `?text=${encodeURIComponent(text)}` : ""}`;
}

export const mapEmbed = `https://maps.google.com/maps?q=${site.geo.lat},${site.geo.lng}&z=17&hl=ru&output=embed`;
