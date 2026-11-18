import type { MetadataRoute } from "next";
import { SERVICES } from "@/lib/services";
import { site } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const paths = ["/", "/services", "/prices", "/doctors", "/contacts", ...SERVICES.map((s) => `/services/${s.slug}`)];
  return paths.flatMap((p) => [
    { url: `${site.url}${p === "/" ? "" : p}`, alternates: { languages: { kk: `${site.url}/kz${p === "/" ? "" : p}` } } },
    { url: `${site.url}/kz${p === "/" ? "" : p}` },
  ]);
}
