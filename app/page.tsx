import Link from "next/link";
import { ArrowRight, FileCheck, Headphones, Package as PackageIcon, Plane, Shield, Star } from "lucide-react";
import heroFallback from "@/assets/hero-lakshadweep.jpg";
import { HeroBanner } from "@/components/HeroBanner";
import { ActivitiesSlider } from "@/components/ActivitiesSlider";
import { MobilePackageSlider } from "@/components/MobilePackageSlider";
import { LoadingCardLink } from "@/components/LoadingCardLink";
import { fetchCatalogueItems, formatCurrency, type CatalogueItem } from "@/lib/api/catalogue";
import { fetchActiveBanners } from "@/lib/api/banners";
import { COMPANY, VISAS } from "@/lib/site-data";
import { siteMetadata } from "@/lib/seo";

export const metadata = {
  title: siteMetadata.title,
  description: siteMetadata.description,
  alternates: { canonical: "/" },
  openGraph: {
    title: siteMetadata.title,
    description: siteMetadata.description,
    type: "website",
    url: "/",
  },
  twitter: {
    card: "summary_large_image",
    title: siteMetadata.title,
    description: siteMetadata.description,
  },
};

export default async function HomePage() {
  const [packages, homeStays, resorts, banners] = await Promise.allSettled([
    fetchCatalogueItems({ slug: "packages", page: 1, limit: 20, search: "" }),
    fetchCatalogueItems({ slug: "home-stays", page: 1, limit: 20, search: "" }),
    fetchCatalogueItems({ slug: "resorts", page: 1, limit: 20, search: "" }),
    fetchActiveBanners(),
  ]);

  const safePackages = packages.status === "fulfilled" ? packages.value : [];
  const safeHomeStays = homeStays.status === "fulfilled" ? homeStays.value : [];
  const safeResorts = resorts.status === "fulfilled" ? resorts.value : [];
  const safeBanners = banners.status === "fulfilled" ? banners.value : [];

  return (
    <>
      <HeroBanner banners={safeBanners} fallbackImage={heroFallback} />
      <section className="max-w-7xl mx-auto px-6 py-16 md:py-24">
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
          {[
            { icon: PackageIcon, title: "Holiday Packages", desc: "Curated Lakshadweep packages from budget homestays to luxury island escapes.", to: "/packages" },
            { icon: Plane, title: "Flight Tickets", desc: "Domestic and international flight bookings at the best fares with 24/7 support.", to: "/flights" },
            { icon: FileCheck, title: "Tourist Visas", desc: "Hassle-free visa processing for UAE, Malaysia, Maldives, Singapore and more.", to: "/visas" },
          ].map(s => (
            <LoadingCardLink key={s.title} href={s.to} className="group rounded-2xl border border-border bg-card p-4 sm:p-7 shadow-card hover:shadow-soft hover:-translate-y-1 transition-all">
              <div className="h-10 w-10 sm:h-12 sm:w-12 rounded-xl bg-gradient-ocean text-primary-foreground flex items-center justify-center">
                <s.icon className="h-5 w-5 sm:h-6 sm:w-6" />
              </div>
              <h3 className="mt-4 text-base sm:text-xl font-semibold leading-tight">{s.title}</h3>
              <p className="mt-2 hidden sm:block text-sm text-muted-foreground">{s.desc}</p>
              <span className="mt-3 sm:mt-4 inline-flex items-center gap-1 text-sm font-semibold text-primary group-hover:gap-2 transition-all">
                Learn more <ArrowRight className="h-4 w-4" />
              </span>
            </LoadingCardLink>
          ))}
          <LoadingCardLink href="/resorts" className="group rounded-2xl border border-border bg-card p-4 sm:p-7 shadow-card hover:shadow-soft hover:-translate-y-1 transition-all md:hidden">
            <div className="h-10 w-10 sm:h-12 sm:w-12 rounded-xl bg-gradient-ocean text-primary-foreground flex items-center justify-center">
              <Star className="h-5 w-5 sm:h-6 sm:w-6" />
            </div>
            <h3 className="mt-4 text-base sm:text-xl font-semibold leading-tight">Resorts &amp; Stays</h3>
            <p className="mt-2 hidden sm:block text-sm text-muted-foreground">Handpicked island resorts and stays for a relaxed tropical getaway.</p>
            <span className="mt-3 sm:mt-4 inline-flex items-center gap-1 text-sm font-semibold text-primary group-hover:gap-2 transition-all">
              Learn more <ArrowRight className="h-4 w-4" />
            </span>
          </LoadingCardLink>
        </div>
      </section>

      <section className="bg-secondary/40 py-10 md:py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-end justify-between mb-4 md:mb-10 flex-wrap gap-4">
            <div>
              <p className="hidden md:block text-sm font-semibold uppercase tracking-widest text-primary">Top picks</p>
              <h2 className="mt-2 text-3xl md:text-4xl font-bold">
                <span className="md:hidden">Packages</span>
                <span className="hidden md:inline">Featured Lakshadweep Packages</span>
              </h2>
            </div>
            <Link href="/packages" className="text-sm font-semibold text-primary hover:underline">View all packages →</Link>
          </div>
          <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-6">
            {safePackages.slice(0, 3).map(p => <FeaturedCard key={p._id} item={p} href={`/packages/Details/${p.slug}`} />)}
          </div>
          <div className="md:hidden">
            <MobilePackageSlider packages={safePackages} />
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-6 py-10 md:py-24">
        <div className="flex items-end justify-between mb-4 md:mb-8 gap-4">
          <div>
            <p className="hidden md:block text-sm font-semibold uppercase tracking-widest text-primary">New arrivals</p>
            <h2 className="mt-2 text-3xl md:text-4xl font-bold">
              <span className="md:hidden">Home Stays</span>
              <span className="hidden md:inline">Recently added Home Stays</span>
            </h2>
          </div>
          <Link href="/home-stay" className="text-sm font-semibold text-primary hover:underline">View all →</Link>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-2 gap-3 md:gap-5">
          {safeHomeStays.slice(0, 2).map(item => <FeaturedStayCard key={item._id} item={item} href={`/home-stay/Details/${item.slug}`} />)}
        </div>
      </section>

      <ActivitiesSlider />

      <section className="bg-secondary/40 py-10 md:py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-end justify-between mb-4 md:mb-8 gap-4">
            <div>
              <p className="hidden md:block text-sm font-semibold uppercase tracking-widest text-primary">Trending stays</p>
              <h2 className="mt-2 text-3xl md:text-4xl font-bold">Trending resorts</h2>
            </div>
            <Link href="/resorts" className="text-sm font-semibold text-primary hover:underline">View all →</Link>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-2 gap-3 md:gap-5">
          {safeResorts.slice(0, 2).map(item => <FeaturedStayCard key={item._id} item={item} href={`/resorts/Details/${item.slug}`} />)}
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-6 py-16 md:py-24">
        <div className="grid md:grid-cols-3 gap-8">
          {[
            { icon: Star, title: "Local Lakshadweep Experts", desc: "Born and operating from the islands - we know every beach, lagoon and hidden gem." },
            { icon: Shield, title: "Trusted & Transparent", desc: "Clear pricing, verified hotels and honest itineraries - no hidden surprises." },
            { icon: Headphones, title: "24/7 Travel Support", desc: "From booking to landing back home, our team is always a call or WhatsApp away." },
          ].map(f => (
            <div key={f.title} className="text-center">
              <div className="mx-auto h-14 w-14 rounded-2xl bg-secondary text-primary flex items-center justify-center">
                <f.icon className="h-7 w-7" />
              </div>
              <h3 className="mt-5 text-lg font-semibold">{f.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-secondary/40 py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-end justify-between mb-10 flex-wrap gap-4">
            <div>
              <p className="text-sm font-semibold uppercase tracking-widest text-primary">International</p>
              <h2 className="mt-2 text-3xl md:text-4xl font-bold">Tourist Visa Services</h2>
            </div>
            <Link href="/visas" className="text-sm font-semibold text-primary hover:underline">All visas →</Link>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {VISAS.map(v => (
              <Link key={v.slug} href={`/visas/${v.slug}`} className="group relative rounded-2xl overflow-hidden aspect-[4/5] shadow-card hover:shadow-soft transition">
                <img src={typeof v.image === "string" ? v.image : v.image.src} alt={v.country} loading="lazy" width={1024} height={768} className="absolute inset-0 h-full w-full object-cover group-hover:scale-105 transition-transform duration-700" />
                <div className="absolute inset-0 bg-gradient-to-t from-foreground/85 via-foreground/20 to-transparent" />
                <div className="absolute bottom-0 p-5 text-primary-foreground">
                  <div className="text-2xl">{v.flag}</div>
                  <div className="font-semibold mt-1">{v.country}</div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-6 py-16 md:py-24">
        <div className="rounded-3xl bg-gradient-ocean p-10 md:p-16 text-primary-foreground text-center shadow-soft">
          <h2 className="text-3xl md:text-4xl font-bold">Ready for your Lakshadweep adventure?</h2>
          <p className="mt-3 max-w-2xl mx-auto text-primary-foreground/85">Talk to our travel experts and get a custom quote for your dream trip - usually within an hour.</p>
          <div className="mt-7 flex flex-wrap justify-center gap-3">
            <a href={`https://wa.me/${COMPANY.whatsapp}`} target="_blank" rel="noopener" className="rounded-xl bg-gradient-sunset px-6 py-3 font-semibold text-accent-foreground shadow-soft">WhatsApp Us</a>
            <Link href="/contact" className="rounded-xl bg-background/15 backdrop-blur border border-primary-foreground/30 px-6 py-3 font-semibold hover:bg-background/25">Contact form</Link>
          </div>
        </div>
      </section>
    </>
  );
}

function FeaturedCard({ item, href }: { item: CatalogueItem; href: string; mobile?: boolean }) {
  const cover = item.images?.[0];
  const tier = item.packages?.[0];
  return (
    <LoadingCardLink href={href} className="group rounded-2xl overflow-hidden bg-card shadow-card hover:shadow-soft transition-all">
      <div className="relative aspect-[4/3] sm:aspect-square overflow-hidden">
        {cover ? <img src={cover} alt={item.name} loading="lazy" width={1024} height={768} className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-700" /> : <div className="h-full w-full bg-secondary" />}
      </div>
      <div className="p-3 sm:p-5">
        <h3 className="font-semibold text-sm sm:text-lg leading-tight line-clamp-2">{item.name}</h3>
        {tier?.duration && <p className="mt-1.5 sm:mt-2 text-[10px] sm:text-xs font-medium text-primary">{tier.duration}</p>}
        <div className="mt-2.5 sm:mt-4 flex items-baseline gap-1.5 sm:gap-2">
          <span className="text-sm sm:text-xl font-bold text-primary">{formatCurrency(tier?.price ?? 0)}</span>
        </div>
      </div>
    </LoadingCardLink>
  );
}

function FeaturedStayCard({ item, href }: { item: CatalogueItem; href: string }) {
  const cover = item.images?.[0];
  const tier = item.packages?.[0];
  return (
    <LoadingCardLink href={href} className="group rounded-2xl overflow-hidden bg-card shadow-card hover:shadow-soft transition flex flex-col sm:flex-row">
      <div className="sm:w-2/5 aspect-[4/3] sm:aspect-square overflow-hidden">
        {cover ? <img src={cover} alt={item.name} loading="lazy" width={1024} height={768} className="h-full w-full object-cover bg-background group-hover:scale-105 transition-transform duration-700" /> : <div className="h-full w-full bg-secondary" />}
      </div>
      <div className="p-3 sm:p-5 flex-1">
        <span className="text-[10px] sm:text-xs font-semibold uppercase tracking-widest text-primary">Stay</span>
        <h3 className="mt-1 text-sm sm:text-lg font-semibold leading-tight line-clamp-2">{item.name}</h3>
        {tier?.duration && <p className="mt-1.5 sm:mt-2 text-[10px] sm:text-xs font-medium text-primary">{tier.duration}</p>}
        <div className="mt-2.5 sm:mt-4 flex items-baseline gap-1.5 sm:gap-2">
          <span className="text-sm sm:text-xl font-bold text-primary">{item.priceVisible ? formatCurrency(tier?.price ?? 0) : "Contact for pricing"}</span>
        </div>
      </div>
    </LoadingCardLink>
  );
}
