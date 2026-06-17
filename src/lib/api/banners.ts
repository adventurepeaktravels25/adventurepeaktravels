export type BannerButton = {
  text?: string;
  label?: string;
  link?: string;
  url?: string;
};

export type Banner = {
  _id: string;
  title?: string;
  description?: string;
  image: string;
  altText?: string;
  buttons?: BannerButton[];
  displayOrder?: number;
  deviceType?: string;
  position?: string;
  status?: string;
};

type BannerApiResponse =
  | { success?: boolean; data?: Banner[]; banners?: Banner[]; message?: string }
  | Banner[]
  | { data?: { banners?: Banner[] } };

const DEFAULT_ACCOUNT_TYPE_ID = "6a2907f92d4f8b2751cc8c71";
const DEFAULT_BASE_URL = "https://backbin.colaber.in";

export async function fetchActiveBanners() {
  const apiBaseUrl = process.env.VITE_API_BASE_URL || DEFAULT_BASE_URL;
  const url = new URL("/business_website/banner/get_active_banners", apiBaseUrl);
  url.searchParams.set("accountTypeId", DEFAULT_ACCOUNT_TYPE_ID);

  const response = await fetch(url, {
    headers: { Accept: "application/json" },
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error(`Failed to load banners: ${response.status}`);
  }

  const json = (await response.json()) as BannerApiResponse;
  const items =
    Array.isArray(json) ? json :
    Array.isArray((json as { data?: Banner[] }).data) ? (json as { data: Banner[] }).data :
    Array.isArray((json as { banners?: Banner[] }).banners) ? (json as { banners: Banner[] }).banners :
    Array.isArray((json as { data?: { banners?: Banner[] } }).data?.banners) ? (json as { data: { banners: Banner[] } }).data.banners :
    [];

  return items
    .filter((banner) => banner?.image)
    .sort((a, b) => (a.displayOrder ?? 0) - (b.displayOrder ?? 0));
}
