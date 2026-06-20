import Link from "next/link";
import { CheckCircle2, MapPin, Sparkles } from "lucide-react";
import { fetchCatalogueItems, formatCurrency } from "@/lib/api/catalogue";
import { COMPANY } from "@/lib/site-data";
import { SITE_URL } from "@/lib/seo";
import { StructuredData } from "@/components/StructuredData";
import { LoadingCardLink } from "@/components/LoadingCardLink";

export const metadata = {
  title: "Home Stays - Adventure Peak Travel",
  description: "Explore Lakshadweep home stays with live catalogue data.",
  alternates: { canonical: "/home-stay" },
  openGraph: {
    title: "Home Stays - Adventure Peak Travel",
    description: "Explore Lakshadweep home stays with live catalogue data.",
    type: "website",
    url: `${SITE_URL}/home-stay`,
  },
  twitter: {
    card: "summary_large_image",
    title: "Home Stays - Adventure Peak Travel",
    description: "Explore Lakshadweep home stays with live catalogue data.",
  },
};

export default async function HomeStayPage() {
  const items = await fetchCatalogueItems({ slug: "home-stays", page: 1, limit: 20, search: "" });
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
      { "@type": "ListItem", position: 2, name: "Home Stay", item: `${SITE_URL}/home-stay` },
    ],
  };
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "What is a Lakshadweep home stay?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "A home stay offers a more local and personal island experience with comfortable accommodation and authentic hospitality.",
        },
      },
      {
        "@type": "Question",
        name: "Can I view pricing before booking?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes. Each listing shows live pricing from the catalogue where available, and the detail page provides more booking information.",
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
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 py-10 md:py-14">
          <div className="max-w-3xl">
            <h1 className="mt-2 text-4xl md:text-5xl font-bold leading-tight">Home Stay</h1>
            <p className="mt-4 max-w-2xl text-base md:text-lg leading-7 text-primary-foreground/85">
              Stay close to local life with calm, beachside home stays across Lakshadweep. Discover comfort,
              hospitality, and an authentic island experience with trusted listings from Adventure Peak Travels.
            </p>
          </div>
        </div>
      </section>

      <section className="hidden sm:block max-w-7xl mx-auto px-6 py-10 md:py-14">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[
            "Beachside comfort",
            "Local hospitality",
            "Family-friendly stays",
            "Easy booking support",
          ].map((item) => (
            <div key={item} className="rounded-2xl border border-border bg-card p-5 shadow-card">
              <CheckCircle2 className="h-5 w-5 text-primary" />
              <p className="mt-3 hidden text-sm font-medium text-foreground sm:block">{item}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 mt-8 sm:mt-0 pb-12 md:pb-16">
        <div className="mb-6 flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-widest text-primary">Stay options</p>
            <h2 className="mt-2 text-3xl md:text-4xl font-bold">Browse live home stay listings</h2>
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <MapPin className="h-4 w-4 text-primary" />
            <span>{COMPANY.location}</span>
          </div>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-5">
          {items.map((item) => (
            <LoadingCardLink
              key={item._id}
              href={`/home-stay/Details/${item.slug}`}
              className="overflow-hidden rounded-2xl bg-card shadow-card"
            >
              <img src={item.images?.[0]} alt={`${item.name} home stay image`} title={item.name} className="aspect-square w-full object-cover" />
              <div className="p-4">
                <h2 className="font-semibold line-clamp-2">{item.name}</h2>
                <p className="mt-1 text-sm text-primary">{formatCurrency(item.packages?.[0]?.price ?? 0)}</p>
              </div>
            </LoadingCardLink>
          ))}
        </div>
      </section>
    </main>
  );
}
