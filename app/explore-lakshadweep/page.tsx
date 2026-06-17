import Link from "next/link";
import { ArrowRight, CheckCircle2, MapPin, Waves, Shell } from "lucide-react";
import { COMPANY } from "@/lib/site-data";
import { SITE_URL } from "@/lib/seo";
import { StructuredData } from "@/components/StructuredData";

export const metadata = {
  title: "Explore Lakshadweep | Complete Travel Guide | Adventure Peak Travels",
  description:
    "Explore Lakshadweep with Adventure Peak Travels. Discover islands, history, beaches, marine life, water sports, culture, and the best time to visit.",
  alternates: {
    canonical: "/explore-lakshadweep",
  },
  openGraph: {
    title: "Explore Lakshadweep | Adventure Peak Travels",
    description:
      "Discover the islands, beaches, marine life, and travel experiences of Lakshadweep with Adventure Peak Travels.",
    url: `${SITE_URL}/explore-lakshadweep`,
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title: "Explore Lakshadweep | Complete Travel Guide | Adventure Peak Travels",
    description:
      "Explore Lakshadweep with Adventure Peak Travels. Discover islands, history, beaches, marine life, water sports, culture, and the best time to visit.",
  },
};

const highlights = [
  "Crystal-clear turquoise lagoons",
  "Soft white sandy beaches",
  "Colorful coral reefs",
  "Peaceful island life",
  "Eco-friendly tourism",
  "World-class scuba diving",
];

const islands = [
  {
    title: "Agatti Island",
    text: "The gateway to Lakshadweep and home to the island airport, with lagoon views, beaches, and water sports.",
  },
  {
    title: "Bangaram Island",
    text: "A tranquil private-island feel with luxury stays, coral reefs, snorkeling, and unforgettable sunsets.",
  },
  {
    title: "Kavaratti Island",
    text: "The administrative capital featuring cultural experiences, the Marine Aquarium, and lagoon cruises.",
  },
  {
    title: "Kadmat Island",
    text: "One of India's finest scuba diving destinations with kayaking, fishing, and beach camping.",
  },
  {
    title: "Minicoy Island",
    text: "Known for its lighthouse, distinctive culture, tuna fishing, and calm lagoon scenery.",
  },
  {
    title: "Kalpeni & Thinnakara",
    text: "Beautiful lagoon islands ideal for nature lovers, camping, snorkeling, photography, and relaxation.",
  },
];

const activities = [
  "Scuba Diving",
  "Snorkeling",
  "Kayaking",
  "Island Hopping",
  "Glass Bottom Boat Ride",
  "Sunset Cruises",
  "Fishing Trips",
  "Beach Camping",
];

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "What is the best time to visit Lakshadweep?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "October to March is generally the best time to visit Lakshadweep because the weather is pleasant and the sea is calmer.",
      },
    },
    {
      "@type": "Question",
      name: "Which island is the gateway to Lakshadweep?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Agatti Island is the gateway to Lakshadweep and the only island with an airport.",
      },
    },
    {
      "@type": "Question",
      name: "What activities can I do in Lakshadweep?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Popular activities include scuba diving, snorkeling, kayaking, island hopping, glass bottom boat rides, sunset cruises, fishing trips, and beach camping.",
      },
    },
  ],
};

export default function ExploreLakshadweepPage() {
  return (
    <main className="bg-background">
      <StructuredData
        data={{
          "@context": "https://schema.org",
          "@type": "Article",
          headline: "Explore Lakshadweep | Complete Travel Guide",
          description:
            "Explore Lakshadweep with Adventure Peak Travels. Discover islands, history, beaches, marine life, water sports, culture, and the best time to visit.",
          mainEntityOfPage: `${SITE_URL}/explore-lakshadweep`,
          author: {
            "@type": "Organization",
            name: "Adventure Peak Travel",
          },
          publisher: {
            "@type": "Organization",
            name: "Adventure Peak Travel",
          },
        }}
      />
      <StructuredData data={faqSchema} />
      <section className="relative overflow-hidden bg-gradient-ocean text-primary-foreground">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.14),transparent_42%)]" />
        <div className="relative max-w-7xl mx-auto px-6 py-16 md:py-24">
          <div className="max-w-3xl">
            <p className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.3em]">
              <Shell className="h-3.5 w-3.5" />
              Explore Lakshadweep
            </p>
            <h1 className="mt-6 text-4xl md:text-6xl font-bold leading-tight">Discover India&apos;s Tropical Paradise</h1>
            <p className="mt-6 text-base md:text-lg leading-8 text-primary-foreground/85">
              Located in the crystal-clear waters of the Arabian Sea, Lakshadweep is India's smallest Union Territory
              and one of the country's most spectacular tropical destinations. With pristine white-sand beaches,
              turquoise lagoons, vibrant coral reefs, and untouched natural beauty, Lakshadweep offers an unforgettable
              island experience unlike anywhere else in India.
            </p>
            <p className="mt-4 text-base md:text-lg leading-8 text-primary-foreground/85">
              At Adventure Peak Travels, we help travelers discover the true beauty of Lakshadweep through carefully
              designed tour packages, resort stays, island adventures, and authentic local experiences.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/packages"
                className="inline-flex items-center gap-2 rounded-full bg-background px-5 py-3 text-sm font-semibold text-foreground shadow-soft"
              >
                View Packages
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 rounded-full border border-white/25 px-5 py-3 text-sm font-semibold text-primary-foreground hover:bg-white/10"
              >
                Plan Your Trip
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-6 py-14 md:py-20">
        <div className="grid gap-10 lg:grid-cols-[1fr_0.85fr]">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-primary">About Lakshadweep</p>
            <h2 className="mt-3 text-3xl md:text-4xl font-bold text-foreground">A peaceful island chain with incredible natural beauty</h2>
            <p className="mt-5 text-base leading-8 text-muted-foreground">
              Lakshadweep consists of 36 islands scattered across the Arabian Sea approximately 220 to 440 kilometers
              off the coast of Kerala. The region is known for its coral atolls, protected marine biodiversity, and
              eco-friendly tourism.
            </p>
            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              {highlights.map((item) => (
                <div key={item} className="rounded-2xl border border-border bg-card p-5 shadow-card">
                  <CheckCircle2 className="h-5 w-5 text-primary" />
                  <p className="mt-3 font-medium text-foreground">{item}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-3xl border border-border bg-card p-6 md:p-8 shadow-card">
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-primary">Best Time to Visit</p>
            <h3 className="mt-3 text-2xl font-bold text-foreground">October to March</h3>
            <p className="mt-4 text-sm leading-7 text-muted-foreground">
              These months usually offer pleasant temperatures, calmer sea conditions, and excellent visibility for
              diving and snorkeling.
            </p>

            <div className="mt-7 rounded-2xl bg-secondary/60 p-5">
              <p className="text-sm font-semibold text-foreground">What you can enjoy</p>
              <div className="mt-4 grid grid-cols-2 gap-3 text-sm text-muted-foreground">
                {activities.map((item) => (
                  <div key={item} className="flex items-center gap-2">
                    <Waves className="h-4 w-4 text-primary" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-7 rounded-2xl border border-dashed border-primary/30 bg-primary/5 p-5">
              <p className="text-sm font-semibold text-foreground">Travel with Adventure Peak Travels</p>
              <p className="mt-2 text-sm leading-7 text-muted-foreground">
                We help with packages, permits, stays, transfers, and activity planning so your Lakshadweep journey is
                seamless from start to finish.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-secondary/30">
        <div className="max-w-7xl mx-auto px-6 py-14 md:py-20">
          <div className="max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-primary">Islands to Explore</p>
            <h2 className="mt-3 text-3xl md:text-4xl font-bold text-foreground">Popular islands and their experiences</h2>
          </div>
          <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {islands.map((island) => (
              <article key={island.title} className="rounded-2xl border border-border bg-card p-6 shadow-card">
                <div className="flex items-start gap-3">
                  <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
                  <div>
                    <h3 className="text-lg font-semibold text-foreground">{island.title}</h3>
                    <p className="mt-2 text-sm leading-7 text-muted-foreground">{island.text}</p>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-6 py-14 md:py-20">
        <div className="rounded-[2rem] bg-gradient-to-r from-[#f2fbff] via-white to-[#eefaf7] p-8 md:p-12 shadow-soft border border-border">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-primary">Ready to Explore?</p>
          <h2 className="mt-4 text-3xl md:text-4xl font-bold text-foreground">Let Adventure Peak Travels guide your island journey</h2>
          <p className="mt-5 max-w-4xl text-base leading-8 text-muted-foreground">
            Whether you're looking for a peaceful beach vacation, a romantic honeymoon, an exciting scuba diving
            adventure, or a family holiday, Lakshadweep offers something for everyone.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 rounded-full bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground shadow-soft"
            >
              Contact Us
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href={`https://wa.me/${COMPANY.whatsapp}`}
              target="_blank"
              rel="noopener"
              className="inline-flex items-center gap-2 rounded-full border border-border bg-background px-5 py-3 text-sm font-semibold text-foreground"
            >
              WhatsApp Us
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
