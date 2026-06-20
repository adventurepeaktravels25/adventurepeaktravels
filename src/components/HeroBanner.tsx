import { headers } from "next/headers";
import type { Banner } from "@/lib/api/banners";

function pickBanner(banners: Banner[], isMobile: boolean) {
  const preferred = banners.filter((banner) => {
    const type = (banner.deviceType || "").toLowerCase();
    if (!type) return true;
    if (isMobile) {
      return (
        type.includes("mobile") ||
        type.includes("both") ||
        type.includes("all") ||
        type.includes("web-mobile")
      );
    }
    return (
      type.includes("web") ||
      type.includes("desktop") ||
      type.includes("both") ||
      type.includes("all") ||
      type.includes("web-mobile")
    );
  });

  return preferred[0] ?? banners[0] ?? null;
}

export async function HeroBanner({
  banners,
  fallbackImage,
}: {
  banners: Banner[];
  fallbackImage: string | { src: string };
}) {
  const imageSrc = typeof fallbackImage === "string" ? fallbackImage : fallbackImage.src;
  const requestHeaders = await headers();
  const ua = requestHeaders.get("user-agent")?.toLowerCase() ?? "";
  const activeBanner = pickBanner(banners, /mobile|android|iphone|ipad|ipod|blackberry|iemobile|opera mini/.test(ua));
  const activeImage = activeBanner?.image || imageSrc;

  return (
    <section className="relative min-h-[560px] w-full overflow-hidden bg-[#0b1e33]">
      <img
        src={activeImage}
        alt={activeBanner?.altText || "Lakshadweep hero"}
        width={1920}
        height={1080}
        className="absolute inset-0 h-full w-full object-cover"
      />
      <div className="absolute inset-0 bg-black/20" />
      <div className="relative mx-auto flex min-h-[560px] max-w-7xl flex-col justify-end px-6 py-20 md:py-28" />
    </section>
  );
}
