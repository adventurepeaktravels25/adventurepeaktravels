"use client";

import Link from "next/link";
import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel";
import { ArrowRight } from "lucide-react";
import type { CatalogueItem } from "@/lib/api/catalogue";

export function MobilePackageSlider({ packages }: { packages: CatalogueItem[] }) {
  return (
    <Carousel opts={{ align: "start", containScroll: "trimSnaps" }} className="w-full">
      <CarouselContent className="-ml-3">
        {packages.slice(0, 3).map((item) => (
          <CarouselItem key={item._id} className="pl-3 basis-[72%]">
            <Link href={`/packages/Details/${item.slug}`} className="group block rounded-2xl overflow-hidden bg-card shadow-card hover:shadow-soft transition-all">
              <div className="relative aspect-[4/3] overflow-hidden">
                <img
                  src={item.images?.[0]}
                  alt={item.name}
                  loading="lazy"
                  width={1024}
                  height={768}
                  className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
              </div>
              <div className="p-3">
                <h3 className="font-semibold text-sm leading-tight line-clamp-2">{item.name}</h3>
                <p className="mt-1.5 text-xs font-medium text-primary">{item.packages?.[0]?.duration ?? "Package"}</p>
                <span className="mt-2 inline-flex items-center gap-1 text-sm font-semibold text-primary">
                  View details <ArrowRight className="h-4 w-4" />
                </span>
              </div>
            </Link>
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  );
}
