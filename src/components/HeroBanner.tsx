"use client";

import { useEffect, useMemo, useState } from "react";
import type { Banner } from "@/lib/api/banners";

function pickBanner(banners: Banner[], isMobile: boolean) {
  const preferred = banners.filter((banner) => {
    const type = (banner.deviceType || "").toLowerCase();
    if (!type) return true;
    if (isMobile) return type.includes("mobile") || type.includes("both") || type.includes("all") || type.includes("web-mobile");
    return type.includes("web") || type.includes("desktop") || type.includes("both") || type.includes("all") || type.includes("web-mobile");
  });
  return preferred[0] ?? banners[0] ?? null;
}

export function HeroBanner({ banners, fallbackImage }: { banners: Banner[]; fallbackImage: string | { src: string } }) {
  const imageSrc = typeof fallbackImage === "string" ? fallbackImage : fallbackImage.src;
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 767px)");
    const update = () => setIsMobile(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  const activeBanner = useMemo(() => pickBanner(banners, isMobile), [banners, isMobile]);
  const activeImage = activeBanner?.image || imageSrc;

  return (
    <section className="relative min-h-[560px] w-full overflow-hidden bg-[#0b1e33]">
      <img src={activeImage} alt={activeBanner?.altText || "Lakshadweep hero"} width={1920} height={1080} className="absolute inset-0 h-full w-full object-cover" />
      <div className="absolute inset-0 bg-black/20" />
      <div className="relative max-w-7xl mx-auto px-6 py-20 md:py-28 flex flex-col justify-end min-h-[560px]" />
    </section>
  );
}
