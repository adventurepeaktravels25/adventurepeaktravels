import Link from "next/link";
import { ArrowRight, CheckCircle2, MapPin, Sparkles } from "lucide-react";
import { fetchCatalogueItems, formatCurrency } from "@/lib/api/catalogue";
import { COMPANY } from "@/lib/site-data";
import { SITE_URL } from "@/lib/seo";
import { StructuredData } from "@/components/StructuredData";

export const metadata = {
  title: "Resorts - Adventure Peak Travel",
  description: "Explore Lakshadweep resorts with live catalogue data and updated pricing.",
  alternates: { canonical: "/resorts" },
  openGraph: {
    title: "Resorts - Adventure Peak Travel",
    description: "Explore Lakshadweep resorts with live catalogue data and updated pricing.",
    type: "website",
    url: `${SITE_URL}/resorts`,
  },
  twitter: {
    card: "summary_large_image",
    title: "Resorts - Adventure Peak Travel",
    description: "Explore Lakshadweep resorts with live catalogue data and updated pricing.",
  },
};

export default async function ResortsPage() {
  const items = await fetchCatalogueItems({ slug: "resorts", page: 1, limit: 20, search: "" });
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
      { "@type": "ListItem", position: 2, name: "Resorts", item: `${SITE_URL}/resorts` },
    ],
  };
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "What makes Lakshadweep resorts special?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Lakshadweep resorts offer peaceful island settings, beach access, lagoon views, and comfortable stays close to nature.",
        },
      },
      {
        "@type": "Question",
        name: "Do resort listings show live pricing?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes. The listings are connected to the live catalogue and show the latest available pricing when provided.",
        },
      },
    ],
  };
  return (
    <main>
      <StructuredData data={breadcrumbSchema} />
      <StructuredData data={faqSchema} />
      <section className="relative overflow-hidden bg-gradient-ocean text-primary-foreground">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.14),transparent_40%)]" />
        <div className="relative max-w-7xl mx-auto px-6 py-10 md:py-14">
          <div className="max-w-3xl">
            <h1 className="mt-2 text-4xl md:text-5xl font-bold leading-tight">Resorts</h1>
            <p className="mt-4 max-w-2xl text-base md:text-lg leading-7 text-primary-foreground/85">
              Discover premium island stays, relaxing beach resorts, and comfortable accommodations across
              Lakshadweep. Browse live resort listings curated by Adventure Peak Travels.
            </p>
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-6 py-10 md:py-14">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {["Island comfort", "Premium stays", "Local hospitality", "Easy booking support"].map((item) => (
            <div key={item} className="rounded-2xl border border-border bg-card p-5 shadow-card">
              <CheckCircle2 className="h-5 w-5 text-primary" />
              <p className="mt-3 text-sm font-medium text-foreground">{item}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-6 pb-12 md:pb-16">
        <div className="mb-6 flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-widest text-primary">Stay options</p>
            <h2 className="mt-2 text-3xl md:text-4xl font-bold">Browse live resort listings</h2>
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <MapPin className="h-4 w-4 text-primary" />
            <span>{COMPANY.location}</span>
          </div>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-5">
          {items.map((item) => (
            <Link
              key={item._id}
              href={`/resorts/Details/${item.slug}`}
              className="overflow-hidden rounded-2xl bg-card shadow-card"
            >
              <img src={item.images?.[0]} alt={`${item.name} resort image`} title={item.name} className="aspect-square w-full object-cover" />
              <div className="p-4">
                <h2 className="font-semibold line-clamp-2">{item.name}</h2>
                <p className="mt-1 text-sm text-primary">{formatCurrency(item.packages?.[0]?.price ?? 0)}</p>
                <span className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-primary">
                  View details <ArrowRight className="h-4 w-4" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
