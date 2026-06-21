import { fetchCatalogueItems } from "@/lib/api/catalogue";
import { SITE_URL } from "@/lib/seo";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function GET() {
  const [packages, homeStays, resorts] = await Promise.all([
    fetchCatalogueItems({ slug: "packages", page: 1, limit: 50, search: "" }),
    fetchCatalogueItems({ slug: "home-stays", page: 1, limit: 50, search: "" }),
    fetchCatalogueItems({ slug: "resorts", page: 1, limit: 50, search: "" }),
  ]);

  const base = SITE_URL;
  const urls = [
    `${base}/`,
    `${base}/about`,
    `${base}/explore-lakshadweep`,
    `${base}/packages`,
    `${base}/home-stay`,
    `${base}/resorts`,
    `${base}/flights`,
    `${base}/visas`,
    `${base}/visas/uae`,
    `${base}/visas/malaysia`,
    `${base}/visas/maldives`,
    `${base}/visas/singapore`,
    `${base}/contact`,
    ...packages.map((p) => `${base}/packages/Details/${p.slug}`),
    ...homeStays.map((p) => `${base}/home-stay/Details/${p.slug}`),
    ...resorts.map((p) => `${base}/resorts/Details/${p.slug}`),
  ];

  const body = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${urls.map((u) => `<url><loc>${u}</loc></url>`).join("")}</urlset>`;
  return new Response(body, { headers: { "Content-Type": "application/xml" } });
}
