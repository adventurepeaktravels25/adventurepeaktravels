import type { Metadata } from "next";
import { SITE_URL } from "@/lib/seo";
import { fetchCatalogueItems, fetchCatalogueServiceDetails, type CatalogueServiceDetails } from "@/lib/api/catalogue";
import { StructuredData } from "@/components/StructuredData";
import { PackageDetailsClient } from "./PackageDetailsClient";

export const dynamic = "force-dynamic";
export const revalidate = 0;

async function loadPackage(slug: string): Promise<CatalogueServiceDetails | null> {
  if (!slug) return null;

  const [detailResult, listResult] = await Promise.allSettled([
    fetchCatalogueServiceDetails(slug),
    fetchCatalogueItems({ slug: "packages", page: 1, limit: 50, search: "" }),
  ]);

  console.log("detailResult", detailResult);

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
  const item = await loadPackage(slug);
  return {
    title: item?.name ? `${item.name} - Adventure Peak Travel` : "Package Details - Adventure Peak Travel",
    description: item?.description ?? "Explore Lakshadweep travel packages.",
  };
}

export default async function PackageDetailsPage({ params }: { params: { slug: string } }) {
  const { slug } = await params;
  const item = await loadPackage(slug);
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
      { "@type": "ListItem", position: 2, name: "Packages", item: `${SITE_URL}/packages` },
      { "@type": "ListItem", position: 3, name: item?.name ?? slug, item: `${SITE_URL}/packages/Details/${slug}` },
    ],
  };

  const productSchema = item
    ? {
        "@context": "https://schema.org",
        "@type": "Product",
        name: item.name,
        description: item.description,
        image: item.images?.[0] ? [item.images[0]] : undefined,
        offers: item.packages?.[0]
          ? {
              "@type": "Offer",
              priceCurrency: "INR",
              price: item.packages[0].price,
              availability: "https://schema.org/InStock",
              url: `${SITE_URL}/packages/Details/${slug}`,
            }
          : undefined,
      }
    : null;

  return (
    <>
      <StructuredData data={breadcrumbSchema} />
      {productSchema && <StructuredData data={productSchema} />}
      <PackageDetailsClient item={item} />
    </>
  );
}
