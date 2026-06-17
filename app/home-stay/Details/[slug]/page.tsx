import type { Metadata } from "next";
import { SITE_URL } from "@/lib/seo";
import { fetchCatalogueItems, fetchCatalogueServiceDetails, type CatalogueItem, type CatalogueServiceDetails } from "@/lib/api/catalogue";
import { StructuredData } from "@/components/StructuredData";
import { HomeStayDetailsClient } from "./HomeStayDetailsClient";

export const dynamic = "force-dynamic";
export const revalidate = 0;

async function loadHomeStay(slug: string): Promise<CatalogueServiceDetails | null> {
  const [detailResult, listResult] = await Promise.allSettled([
    fetchCatalogueServiceDetails(slug),
    fetchCatalogueItems({ slug: "home-stays", page: 1, limit: 50, search: "" }),
  ]);

  const detail = detailResult.status === "fulfilled" ? (detailResult.value as CatalogueServiceDetails) : null;
  const fromList = listResult.status === "fulfilled" ? listResult.value.find(item => item.slug === slug) ?? null : null;

  if (!detail && !fromList) return null;
  return {
    ...(fromList ?? {}),
    ...(detail ?? {}),
    relatedServices: detail?.relatedServices ?? [],
  } as CatalogueServiceDetails;
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const { slug } = await params;
  const item = await loadHomeStay(slug);
  return {
    title: item?.name ? `${item.name} - Adventure Peak Travel` : "Home Stay Details - Adventure Peak Travel",
    description: item?.description ?? "Explore Lakshadweep home stays.",
  };
}

export default async function Page({ params }: { params: { slug: string } }) {
  const { slug } = await params;
  const item = await loadHomeStay(slug);
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
      { "@type": "ListItem", position: 2, name: "Home Stay", item: `${SITE_URL}/home-stay` },
      { "@type": "ListItem", position: 3, name: item?.name ?? slug, item: `${SITE_URL}/home-stay/Details/${slug}` },
    ],
  };

  const lodgingSchema = item
    ? {
        "@context": "https://schema.org",
        "@type": "LodgingBusiness",
        name: item.name,
        description: item.description,
        image: item.images?.[0] ? [item.images[0]] : undefined,
        url: `${SITE_URL}/home-stay/Details/${slug}`,
      }
    : null;

  return (
    <>
      <StructuredData data={breadcrumbSchema} />
      {lodgingSchema && <StructuredData data={lodgingSchema} />}
      <HomeStayDetailsClient item={item} slug={slug} />
    </>
  );
}
