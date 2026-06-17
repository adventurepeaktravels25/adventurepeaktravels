export type CataloguePackageTier = {
  _id: string;
  name: string;
  type: string;
  price: number;
  duration: string;
  discountPercentage: number;
  inclusions: string[];
};

export type CatalogueItem = {
  _id: string;
  name: string;
  description: string;
  slug: string;
  images: string[];
  packages: CataloguePackageTier[];
  location?: string;
  button?: string;
  featured?: boolean;
  status?: string;
  priceVisible?: boolean;
  taxApplicable?: boolean;
  taxIncluded?: boolean;
};

type CatalogueResponse = {
  success: boolean;
  data: CatalogueItem[];
};

type CatalogueDetailsResponse = {
  success: boolean;
  data: CatalogueItem & {
    relatedServices?: CatalogueItem[];
    catalogueSeo?: {
      keywords?: string[];
    };
  };
};

export type CatalogueServiceDetails = CatalogueItem & {
  relatedServices?: CatalogueItem[];
  catalogueSeo?: {
    keywords?: string[];
  };
};

const BASE_URL =
  "https://backbin.colaber.in/business_website/catalogue/service/get_catalogue_service_items_for_public";
const DETAILS_BASE_URL =
  "https://backbin.colaber.in/business_website/catalogue/service/get_catalogue_service_details_for_public";
const DEFAULT_SUBDOMAIN = "https://travel.app.colaber.in";

export async function fetchCatalogueItems({
  slug = "packages",
  page = 1,
  limit = 20,
  search = "",
}: {
  slug?: string;
  page?: number;
  limit?: number;
  search?: string;
} = {}): Promise<CatalogueItem[]> {
  try {
    const url = new URL(BASE_URL);
    url.searchParams.set("subdomain", DEFAULT_SUBDOMAIN);
    url.searchParams.set("slug", slug);
    url.searchParams.set("page", String(page));
    url.searchParams.set("limit", String(limit));
    url.searchParams.set("search", search);

    const response = await fetch(url, {
      headers: { Accept: "application/json" },
    });

    if (!response.ok) {
      return [];
    }

    const json = (await response.json()) as CatalogueResponse;
    return Array.isArray(json.data) ? json.data : [];
  } catch {
    return [];
  }
}

export async function fetchCatalogueServiceDetails(serviceSlug: string) {
  try {
    const url = new URL(DETAILS_BASE_URL);
    url.searchParams.set("subdomain", DEFAULT_SUBDOMAIN);
    url.searchParams.set("serviceSlug", serviceSlug);

    const response = await fetch(url, {
      headers: { Accept: "application/json" },
    });

    if (!response.ok) {
      return null;
    }

    const json = (await response.json()) as CatalogueDetailsResponse;
    return json.data;
  } catch {
    return null;
  }
}

export async function fetchCatalogueServiceDetailsSafe(serviceSlug: string, listSlug = "packages") {
  try {
    const details = (await fetchCatalogueServiceDetails(serviceSlug)) as CatalogueServiceDetails;
    if (details?.slug) return details;
  } catch {
    // Fall back to the listing payload below.
  }

  const items = await fetchCatalogueItems({ slug: listSlug, page: 1, limit: 50, search: "" });
  const listItem = items.find(item => item.slug === serviceSlug);
  if (!listItem) return null;

  try {
    const detailsUrl = new URL(DETAILS_BASE_URL);
    detailsUrl.searchParams.set("subdomain", DEFAULT_SUBDOMAIN);
    detailsUrl.searchParams.set("serviceSlug", serviceSlug);
    const response = await fetch(detailsUrl, { headers: { Accept: "application/json" }, cache: "no-store" });
    if (!response.ok) {
      return listItem as CatalogueServiceDetails;
    }
    const json = (await response.json()) as CatalogueDetailsResponse;
    return { ...listItem, ...(json.data ?? {}) } as CatalogueServiceDetails;
  } catch {
    return listItem as CatalogueServiceDetails;
  }
}

export const formatCurrency = (value: number) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(value);
