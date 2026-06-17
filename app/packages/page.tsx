import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";
import { fetchCatalogueItems, formatCurrency, type CatalogueItem } from "@/lib/api/catalogue";
import { SITE_URL } from "@/lib/seo";
import { StructuredData } from "@/components/StructuredData";

export const metadata = {
  title: "Lakshadweep Tour Packages - Adventure Peak Travel",
  description: "Browse live Lakshadweep tour packages with pricing, inclusions, and enquiry options.",
  alternates: { canonical: "/packages" },
  openGraph: {
    title: "Lakshadweep Tour Packages - Adventure Peak Travel",
    description: "Browse live Lakshadweep tour packages with pricing, inclusions, and enquiry options.",
    type: "website",
    url: `${SITE_URL}/packages`,
  },
  twitter: {
    card: "summary_large_image",
    title: "Lakshadweep Tour Packages - Adventure Peak Travel",
    description: "Browse live Lakshadweep tour packages with pricing, inclusions, and enquiry options.",
  },
};

export default async function PackagesPage() {
  const items = await fetchCatalogueItems({ slug: "packages", page: 1, limit: 20, search: "" });
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
      { "@type": "ListItem", position: 2, name: "Packages", item: `${SITE_URL}/packages` },
    ],
  };
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "What do Lakshadweep packages include?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Packages may include stays, transfers, sightseeing, meals, and island activities depending on the selected itinerary.",
        },
      },
      {
        "@type": "Question",
        name: "Can I open each package for full details?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes. Each package card opens a dedicated detail page with pricing, inclusions, and booking options.",
        },
      },
    ],
  };

  return (
    <>
      <StructuredData data={breadcrumbSchema} />
      <StructuredData data={faqSchema} />
      <section className="bg-gradient-ocean text-primary-foreground py-14 md:py-20">
        <div className="max-w-7xl mx-auto px-6">
          <p className="text-sm font-semibold uppercase tracking-widest opacity-80">Holiday packages</p>
          <h1 className="mt-2 text-4xl md:text-5xl font-bold">Lakshadweep Tour Packages</h1>
          <p className="mt-3 max-w-2xl opacity-90">Browse live packages from the catalogue and open each package for full details.</p>
        </div>
      </section>
      <section className="max-w-7xl mx-auto px-6 py-12 md:py-16">
        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-6">
          {items.map(item => <PackageCard key={item._id} item={item} />)}
        </div>
      </section>
    </>
  );
}

function PackageCard({ item }: { item: CatalogueItem }) {
  const cover = item.images?.[0];
  const tier = item.packages?.[0];
  const price = tier?.price ?? 0;
  const duration = tier?.duration ?? "Package";
  const highlights = tier?.inclusions?.slice(0, 3) ?? [];

  return (
    <article className="group rounded-2xl overflow-hidden bg-card shadow-card hover:shadow-soft transition flex flex-col border border-border/60">
      <Link href={`/packages/Details/${item.slug}`} className="relative aspect-[4/3] overflow-hidden block group bg-secondary/30">
        {cover ? <img src={cover} alt={`${item.name} package image`} title={item.name} loading="lazy" width={1024} height={768} className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-700" /> : <div className="h-full w-full bg-secondary" />}
        <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-black/0 to-transparent" />
        <span className="absolute bottom-3 right-3 inline-flex items-center gap-1 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-foreground">
          View details
          <ArrowRight className="h-3.5 w-3.5" />
        </span>
      </Link>
      <div className="p-3 sm:p-5 flex flex-col flex-1">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <h2 className="font-semibold text-sm sm:text-lg leading-tight group-hover:text-primary transition-colors line-clamp-2">{item.name}</h2>
            {tier && <span className="mt-1 inline-flex items-center gap-1 rounded-full bg-gradient-sunset text-accent-foreground text-[10px] sm:text-xs font-bold px-2.5 py-1 shadow-soft">{tier.duration ?? tier.type ?? "Package"}</span>}
          </div>
          {item.location && <span className="text-[10px] sm:text-xs text-muted-foreground shrink-0">{item.location}</span>}
        </div>
        <div className="mt-2.5 sm:mt-4 inline-flex items-center gap-2 rounded-full bg-secondary/60 px-2.5 py-1 text-[10px] sm:text-xs font-medium text-foreground w-fit">{duration}</div>
        <ul className="mt-3 sm:mt-4 space-y-1 text-[11px] sm:text-sm">
          {highlights.length > 0 ? highlights.map(h => (
            <li key={h} className="flex gap-2">
              <Check className="h-3.5 w-3.5 text-primary shrink-0 mt-0.5" />
              <span>{h}</span>
            </li>
          )) : <li className="text-sm text-muted-foreground">Open the package for full inclusions and itinerary.</li>}
        </ul>
        <div className="mt-3 sm:mt-5 pt-3 sm:pt-4 border-t border-border flex items-end justify-between gap-3">
          <div>
            <div className="text-[10px] sm:text-xs text-muted-foreground">Starting from</div>
            <div className="text-sm sm:text-xl font-bold text-primary">{formatCurrency(price)}</div>
          </div>
          <Link href={`/packages/Details/${item.slug}`} className="rounded-lg bg-primary text-primary-foreground px-3 py-2 text-[10px] sm:text-sm font-semibold hover:bg-primary/90">View Details</Link>
        </div>
      </div>
    </article>
  );
}
