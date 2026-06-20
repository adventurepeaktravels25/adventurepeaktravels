"use client";

import Link from "next/link";
import {
  CalendarDays,
  Check,
  ChevronLeft,
  ChevronRight,
  Clock3,
  MapPin,
  Minus,
  Plus,
} from "lucide-react";
import { useMemo, useState } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import {
  formatCurrency,
  type CatalogueItem,
  type CatalogueServiceDetails,
} from "@/lib/api/catalogue";
import { DetailPageTitle } from "@/components/DetailPageTitle";

export function HomeStayDetailsClient({
  item,
  slug,
}: {
  item: CatalogueServiceDetails | null;
  slug: string;
}) {
  const [selectedTierId, setSelectedTierId] = useState(item?.packages?.[0]?._id ?? "");
  const selectedTier = useMemo(
    () => item?.packages?.find((pkg) => pkg._id === selectedTierId) ?? item?.packages?.[0] ?? null,
    [item?.packages, selectedTierId],
  );
  const previewImages = item?.images?.filter(Boolean) ?? [];
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const activeImage = previewImages[activeImageIndex] ?? previewImages[0] ?? "";
  const hasMultipleImages = previewImages.length > 1;
  const goToPreviousImage = () => {
    if (!previewImages.length) return;
    setActiveImageIndex((current) => (current - 1 + previewImages.length) % previewImages.length);
  };
  const goToNextImage = () => {
    if (!previewImages.length) return;
    setActiveImageIndex((current) => (current + 1) % previewImages.length);
  };

  if (!item) {
    return (
      <section className="max-w-3xl mx-auto px-6 py-20 text-center">
        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-primary">
          Home stay unavailable
        </p>
        <h1 className="mt-4 text-3xl md:text-4xl font-bold">
          We could not load this home stay right now.
        </h1>
        <p className="mt-3 text-muted-foreground">Slug: {slug}</p>
        <Link
          href="/home-stay"
          className="mt-8 inline-flex items-center gap-2 rounded-lg bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground hover:bg-primary/90"
        >
          Back to home stays
        </Link>
      </section>
    );
  }
  const descriptionLines = item.description.split(/\n+/).filter(Boolean);
  const related = (item.relatedServices ?? []).slice(0, 4);
  const whatsappMessage = encodeURIComponent(
    `Hi! I'm interested in the ${item.name}${selectedTier ? ` - ${selectedTier.name} (${formatCurrency(selectedTier.price)})` : ""}. Please share stay details and booking options.`,
  );
  const waLink = `https://wa.me/919496140068?text=${whatsappMessage}`;

  return (
    <>
      <DetailPageTitle title={item.name} />
      <section className="max-w-7xl mx-auto px-4 sm:px-6 pt-6 md:pt-8">
        <div className="hidden md:block">
          <nav className="mb-4 flex flex-wrap items-center gap-2 text-xs sm:text-sm text-muted-foreground">
            <Link href="/" className="hover:text-primary">
              Home
            </Link>
            <span>/</span>
            <Link href="/home-stay" className="hover:text-primary">
              Home Stay
            </Link>
            <span>/</span>
            <span className="text-foreground line-clamp-1">{item.name}</span>
          </nav>
          <Link
            href="/home-stay"
            className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-primary"
          >
            <span className="inline-flex items-center justify-center">
              <svg
                viewBox="0 0 24 24"
                className="h-4 w-4"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M15 18l-6-6 6-6" />
              </svg>
            </span>
            Back to home stays
          </Link>
          <div className="mt-4 flex flex-wrap items-start justify-between gap-4">
            <div>
              <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight">
                {item.name}
              </h1>
              <div className="mt-3 flex flex-wrap gap-2">
                {selectedTier?.duration && (
                  <span className="inline-flex items-center rounded-full bg-secondary/70 px-3 py-1 text-xs font-medium text-foreground">
                    {selectedTier.duration}
                  </span>
                )}
                {item.location && (
                  <span className="inline-flex items-center gap-1 rounded-full bg-secondary/70 px-3 py-1 text-xs font-medium text-foreground">
                    <MapPin className="h-3.5 w-3.5" />
                    {item.location}
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 pb-12 md:pb-16">
        <div className="grid lg:grid-cols-[1.35fr_0.95fr] gap-6 lg:gap-8 items-start">
          <div className="space-y-4">
            <div className="overflow-hidden rounded-2xl sm:rounded-3xl shadow-card bg-card">
              {activeImage ? (
                <div className="relative">
                  <img
                    src={activeImage}
                    alt={item.name}
                    width={1280}
                    height={960}
                    className="aspect-[16/10] w-full object-cover"
                  />
                  {hasMultipleImages && (
                    <div className="absolute inset-x-0 top-1/2 flex -translate-y-1/2 items-center justify-between px-3 sm:px-4">
                      <button
                        type="button"
                        onClick={goToPreviousImage}
                        aria-label="Previous image"
                        className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/30 bg-black/45 text-white backdrop-blur-sm transition hover:bg-black/60"
                      >
                        <ChevronLeft className="h-5 w-5" />
                      </button>
                      <button
                        type="button"
                        onClick={goToNextImage}
                        aria-label="Next image"
                        className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/30 bg-black/45 text-white backdrop-blur-sm transition hover:bg-black/60"
                      >
                        <ChevronRight className="h-5 w-5" />
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <div className="aspect-[16/10] w-full bg-secondary" />
              )}
            </div>

            {hasMultipleImages &&
              (previewImages.length > 4 ? (
                <Carousel opts={{ align: "start" }} className="relative px-1">
                  <CarouselContent className="-ml-3">
                    {previewImages.map((img, index) => (
                      <CarouselItem
                        key={`${img}-${index}`}
                        className="basis-1/4 pl-3 md:basis-1/4 sm:basis-1/3 basis-1/3"
                      >
                        <button
                          type="button"
                          onClick={() => setActiveImageIndex(index)}
                          aria-label={`Show image ${index + 1}`}
                          aria-pressed={index === activeImageIndex}
                          className={`overflow-hidden rounded-xl border bg-card text-left transition w-full ${index === activeImageIndex ? "border-primary ring-2 ring-primary/20" : "border-border hover:border-primary/50"}`}
                        >
                          <img
                            src={img}
                            alt={item.name}
                            className="aspect-[4/3] w-full object-cover"
                          />
                        </button>
                      </CarouselItem>
                    ))}
                  </CarouselContent>
                  <CarouselPrevious className="-left-3 hidden sm:inline-flex" />
                  <CarouselNext className="-right-3 hidden sm:inline-flex" />
                </Carousel>
              ) : (
                <div className="grid grid-cols-4 gap-2 sm:gap-3">
                  {previewImages.map((img, index) => (
                    <button
                      key={`${img}-${index}`}
                      type="button"
                      onClick={() => setActiveImageIndex(index)}
                      aria-label={`Show image ${index + 1}`}
                      aria-pressed={index === activeImageIndex}
                      className={`overflow-hidden rounded-xl border bg-card text-left transition ${index === activeImageIndex ? "border-primary ring-2 ring-primary/20" : "border-border hover:border-primary/50"}`}
                    >
                      <img
                        src={img}
                        alt={item.name}
                        className="aspect-[4/3] w-full object-cover"
                      />
                      </button>
                  ))}
                </div>
              ))}

            <p className="mb-2 text-base font-bold uppercase tracking-[0.2em] text-primary">
              {item.name}
            </p>
            <div className="rounded-2xl border border-border bg-card p-5 md:p-6 shadow-card">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h2 className="text-2xl font-bold">Home Stay Description</h2>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground shrink-0">
                  <Clock3 className="h-4 w-4" />
                  <span>{selectedTier?.duration ?? "Stay"}</span>
                </div>
              </div>
              <div className="mt-4 space-y-3 text-sm md:text-base text-muted-foreground leading-relaxed">
                {descriptionLines.map((line) => (
                  <p key={line}>{line}</p>
                ))}
              </div>
            </div>

            {selectedTier?.inclusions?.length ? (
              <div className="rounded-2xl border border-border bg-card p-5 md:p-6 shadow-card">
                <h2 className="text-2xl font-bold">What&apos;s included in {selectedTier.name}</h2>
                <ul className="mt-4 grid sm:grid-cols-2 gap-3">
                  {selectedTier.inclusions.filter(Boolean).map((highlight) => (
                    <li key={highlight} className="flex gap-3 rounded-xl bg-secondary/50 p-4">
                      <Check className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
                      <span className="text-sm leading-relaxed">{highlight}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}
          </div>

          <aside className="lg:sticky lg:top-24">
            <div className="rounded-3xl border border-border bg-card p-5 md:p-6 shadow-card">
              <h2 className="text-xl font-bold">Select Your Stay</h2>
              <p className="mt-1 text-sm text-muted-foreground">
                Switch between available stay options for this home stay.
              </p>

              <div className="mt-4 grid gap-3">
                {(item.packages ?? []).map((pkg) => {
                  const active = pkg._id === selectedTier?._id;
                  return (
                    <button
                      key={pkg._id}
                      type="button"
                      onClick={() => setSelectedTierId(pkg._id)}
                      className={`rounded-2xl border p-4 text-left transition ${active ? "border-primary bg-primary/5 shadow-sm" : "border-border bg-background hover:bg-secondary/60"}`}
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <p className="font-semibold">{pkg.name}</p>
                          <p className="mt-1 text-sm text-muted-foreground">{pkg.duration}</p>
                        </div>
                        <span className="text-sm font-bold text-primary">
                          {formatCurrency(pkg.price)}
                        </span>
                      </div>
                      <div className="mt-3 flex flex-wrap gap-2">
                        <span className="inline-flex items-center rounded-full bg-secondary/70 px-2.5 py-1 text-[10px] font-medium text-foreground">
                          {pkg.type}
                        </span>
                        {!!pkg.discountPercentage && (
                          <span className="inline-flex items-center rounded-full bg-emerald-100 px-2.5 py-1 text-[10px] font-medium text-emerald-700">
                            {pkg.discountPercentage}% off
                          </span>
                        )}
                      </div>
                    </button>
                  );
                })}
              </div>

              <div className="mt-5 grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm font-medium text-muted-foreground">Adults</label>
                  <div className="mt-2 flex items-center justify-between rounded-xl border border-border px-3 py-2">
                    <Minus className="h-4 w-4 text-muted-foreground" />
                    <span className="font-semibold">2</span>
                    <Plus className="h-4 w-4 text-muted-foreground" />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-muted-foreground">
                    Children
                  </label>
                  <div className="mt-2 flex items-center justify-between rounded-xl border border-border px-3 py-2">
                    <Minus className="h-4 w-4 text-muted-foreground" />
                    <span className="font-semibold">0</span>
                    <Plus className="h-4 w-4 text-muted-foreground" />
                  </div>
                </div>
              </div>

              <div className="mt-5">
                <label className="block text-sm font-medium text-muted-foreground">
                  Start Date
                </label>
                <div className="mt-2 flex items-center gap-2 rounded-xl border border-border px-3 py-3 text-sm text-muted-foreground">
                  <CalendarDays className="h-4 w-4" />
                  <span>June 18th, 2026</span>
                </div>
              </div>

              <div className="mt-6 rounded-2xl border-t border-border pt-5">
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <p className="text-sm font-semibold text-muted-foreground">Price</p>
                    <p className="text-xs text-muted-foreground">
                      Contact us for customized pricing based on your preferences
                    </p>
                  </div>
                  <span className="text-sm font-semibold text-primary">
                    {selectedTier ? formatCurrency(selectedTier.price) : "Contact for Pricing"}
                  </span>
                </div>
                <div className="mt-4 space-y-3">
                  <a
                    href={waLink}
                    target="_blank"
                    rel="noopener"
                    className="inline-flex w-full items-center justify-center rounded-xl bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground hover:bg-primary/90"
                  >
                    Book Now
                  </a>
                  <Link
                    href="/contact"
                    className="inline-flex w-full items-center justify-center rounded-xl border border-border px-5 py-3 text-sm font-medium hover:bg-secondary"
                  >
                    Request Custom Stay
                  </Link>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </section>

      {!!related.length && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 pb-16">
          <h2 className="text-2xl md:text-3xl font-bold">You May Also Like</h2>
          <div className="mt-6 grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-5">
            {related.map((entry: CatalogueItem) => (
              <article
                key={entry._id}
                className="overflow-hidden rounded-2xl border border-border bg-card shadow-sm"
              >
                <Link href={`/home-stay/Details/${entry.slug}`} className="block">
                  <img
                    src={entry.images?.[0]}
                    alt={entry.name}
                    className="h-36 w-full object-cover"
                  />
                </Link>
                <div className="p-3">
                  <h3 className="font-semibold text-sm leading-tight line-clamp-2">{entry.name}</h3>
                  <p className="mt-1 text-sm text-muted-foreground">
                    {formatCurrency(entry.packages?.[0]?.price ?? 0)}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </section>
      )}
    </>
  );
}
