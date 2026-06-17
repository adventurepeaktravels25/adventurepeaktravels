import Link from "next/link";
import { ArrowRight, CheckCircle2, MapPin, Mail, Sparkles } from "lucide-react";
import { COMPANY } from "@/lib/site-data";
import { SITE_URL } from "@/lib/seo";
import { StructuredData } from "@/components/StructuredData";

export const metadata = {
  title: "About Us - Adventure Peak Travel",
  description:
    "Learn about Adventure Peak Travels, a trusted Lakshadweep travel company based in Agatti Island offering packages, stays, transfers, and island experiences.",
  alternates: { canonical: "/about" },
  openGraph: {
    title: "About Us - Adventure Peak Travel",
    description:
      "Learn about Adventure Peak Travels, a trusted Lakshadweep travel company based in Agatti Island offering packages, stays, transfers, and island experiences.",
    type: "website",
    url: `${SITE_URL}/about`,
  },
  twitter: {
    card: "summary_large_image",
    title: "About Us - Adventure Peak Travel",
    description:
      "Learn about Adventure Peak Travels, a trusted Lakshadweep travel company based in Agatti Island offering packages, stays, transfers, and island experiences.",
  },
};

const services = [
  "Lakshadweep Tour Packages",
  "Resort & Beach Resort Bookings",
  "Homestay Arrangements",
  "Flight & Travel Assistance",
  "Island Hopping Tours",
  "Scuba Diving & Snorkeling",
  "Kayaking & Water Sports",
  "Fishing Trips",
  "Sightseeing & Guided Tours",
  "Family & Group Tour Planning",
  "Honeymoon Packages",
  "Local Transportation Assistance",
];

const reasons = [
  {
    title: "Local Expertise",
    text: "Being based in Agatti Island allows us to provide authentic local experiences and reliable travel support.",
  },
  {
    title: "Personalized Packages",
    text: "Every traveler is different. We customize your itinerary according to your budget, interests, and travel style.",
  },
  {
    title: "Trusted Service",
    text: "We are committed to transparent pricing, quality accommodations, and professional customer support throughout your journey.",
  },
  {
    title: "Complete Travel Assistance",
    text: "From the moment you plan your trip until you return home, we're here to help with bookings, permits, accommodations, and local guidance.",
  },
  {
    title: "Memorable Experiences",
    text: "Our goal is not just to organize a trip, but to create lifelong memories through carefully planned island adventures.",
  },
];

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Where is Adventure Peak Travels based?",
      acceptedAnswer: {
        "@type": "Answer",
        text: `Adventure Peak Travels is based at ${COMPANY.location} in Lakshadweep.`,
      },
    },
    {
      "@type": "Question",
      name: "What services do you offer?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "We offer Lakshadweep tour packages, resort and homestay bookings, flight assistance, island hopping, water sports, family tours, honeymoon packages, and local transportation support.",
      },
    },
    {
      "@type": "Question",
      name: "How can I contact Adventure Peak Travels?",
      acceptedAnswer: {
        "@type": "Answer",
        text: `You can contact us by email at ${COMPANY.email} or by WhatsApp and phone using the contact details on the site.`,
      },
    },
  ],
};

export default function AboutPage() {
  return (
    <main className="bg-background">
      <StructuredData
        data={{
          "@context": "https://schema.org",
          "@type": "AboutPage",
          name: "About Us - Adventure Peak Travel",
          url: `${SITE_URL}/about`,
          description:
            "Learn about Adventure Peak Travels, a trusted Lakshadweep travel company based in Agatti Island offering packages, stays, transfers, and island experiences.",
        }}
      />
      <StructuredData data={faqSchema} />
      <section className="relative overflow-hidden bg-gradient-ocean text-primary-foreground">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.14),transparent_38%)]" />
        <div className="relative max-w-7xl mx-auto px-6 py-16 md:py-24">
          <div className="max-w-3xl">
            <p className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.3em]">
              <Sparkles className="h-3.5 w-3.5" />
              About Us
            </p>
            <h1 className="mt-6 text-4xl md:text-6xl font-bold leading-tight">Welcome to Adventure Peak Travels</h1>
            <p className="mt-6 text-base md:text-lg leading-8 text-primary-foreground/85">
              Adventure Peak Travels is a trusted travel company based in Agatti Island, Lakshadweep, dedicated to
              creating unforgettable island experiences for travelers from India and around the world. Our mission is
              to make your journey to Lakshadweep seamless, comfortable, and truly memorable.
            </p>
            <p className="mt-4 text-base md:text-lg leading-8 text-primary-foreground/85">
              With our local expertise and personalized service, we help you discover the breathtaking beauty of
              Lakshadweep from crystal-clear lagoons and pristine white-sand beaches to vibrant coral reefs and
              peaceful island life.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/packages"
                className="inline-flex items-center gap-2 rounded-full bg-background px-5 py-3 text-sm font-semibold text-foreground shadow-soft"
              >
                Explore Packages
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 rounded-full border border-white/25 px-5 py-3 text-sm font-semibold text-primary-foreground hover:bg-white/10"
              >
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-6 py-14 md:py-20">
        <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr]">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-primary">Our Story</p>
            <h2 className="mt-3 text-3xl md:text-4xl font-bold text-foreground">Travel made personal, local, and memorable</h2>
            <p className="mt-5 text-base leading-8 text-muted-foreground">
              Whether you're planning a romantic honeymoon, a family vacation, a solo adventure, or a group tour, our
              experienced team ensures every detail of your trip is taken care of.
            </p>
            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              {reasons.map((item) => (
                <div key={item.title} className="rounded-2xl border border-border bg-card p-5 shadow-card">
                  <CheckCircle2 className="h-5 w-5 text-primary" />
                  <h3 className="mt-3 text-lg font-semibold">{item.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-muted-foreground">{item.text}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-3xl border border-border bg-card p-6 md:p-8 shadow-card">
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-primary">Our Mission</p>
            <p className="mt-4 text-base leading-8 text-muted-foreground">
              Our mission is to promote the natural beauty and unique culture of Lakshadweep while making travel
              simple, safe, and unforgettable for every guest. We want each visitor to experience the islands with
              confidence, comfort, and a true sense of connection to the local way of life.
            </p>
            <p className="mt-4 text-base leading-8 text-muted-foreground">
              We are committed to honest service, transparent communication, and thoughtful planning at every step.
              From helping travelers choose the right package to arranging stays, transfers, permits, and island
              activities, our team works to make every journey smooth and enjoyable.
            </p>
            <p className="mt-4 text-base leading-8 text-muted-foreground">
              Through personalized hospitality and local expertise, Adventure Peak Travels aims to create travel
              experiences that are not only memorable, but also respectful of Lakshadweep&apos;s fragile ecosystem and
              distinctive culture.
            </p>

            <div className="mt-8 rounded-2xl bg-secondary/60 p-5">
              <p className="text-sm font-semibold uppercase tracking-[0.3em] text-primary">Our Vision</p>
              <p className="mt-3 text-sm leading-7 text-muted-foreground">
                To become one of the most trusted and preferred travel partners for visitors exploring the beautiful
                islands of Lakshadweep.
              </p>
            </div>

            <div className="mt-6 rounded-2xl border border-dashed border-primary/30 bg-primary/5 p-5">
              <p className="text-sm font-semibold text-foreground">Contact Us</p>
              <div className="mt-3 space-y-2 text-sm text-muted-foreground">
                <p className="flex items-start gap-2">
                  <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                  <span>{COMPANY.location}</span>
                </p>
                <p className="flex items-start gap-2">
                  <Mail className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                  <span>{COMPANY.email}</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-secondary/30">
        <div className="max-w-7xl mx-auto px-6 py-14 md:py-20">
          <div className="max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-primary">Our Services</p>
            <h2 className="mt-3 text-3xl md:text-4xl font-bold text-foreground">We offer a complete range of travel services</h2>
          </div>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((service) => (
              <div key={service} className="rounded-2xl border border-border bg-card p-5 shadow-card">
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 text-primary" />
                  <span className="font-medium text-foreground">{service}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-6 py-14 md:py-20">
        <div className="rounded-[2rem] bg-gradient-to-r from-[#f2fbff] via-white to-[#eefaf7] p-8 md:p-12 shadow-soft border border-border">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-primary">Explore the Beauty of Lakshadweep</p>
          <h2 className="mt-4 text-3xl md:text-4xl font-bold text-foreground">
            Adventure Peak Travels is here to make that dream a reality
          </h2>
          <p className="mt-5 max-w-4xl text-base leading-8 text-muted-foreground">
            Imagine yourself relaxing on untouched beaches, swimming in crystal-clear lagoons, experiencing colorful
            marine life, enjoying thrilling water sports, and watching spectacular sunsets over the Arabian Sea.
          </p>
          <p className="mt-4 max-w-4xl text-base leading-8 text-muted-foreground">
            We look forward to welcoming you to paradise. Let Adventure Peak Travels be your trusted guide to
            discovering the incredible beauty of Lakshadweep.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/packages"
              className="inline-flex items-center gap-2 rounded-full bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground shadow-soft"
            >
              View Packages
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 rounded-full border border-border bg-background px-5 py-3 text-sm font-semibold text-foreground"
            >
              Get in Touch
            </Link>
            <Link
              href="/explore-lakshadweep"
              className="inline-flex items-center gap-2 rounded-full border border-primary/25 bg-primary/5 px-5 py-3 text-sm font-semibold text-primary hover:bg-primary/10"
            >
              Explore Lakshadweep
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/explore-lakshadweep"
              className="inline-flex items-center gap-2 rounded-full border border-white/25 px-5 py-3 text-sm font-semibold text-primary-foreground hover:bg-white/10"
            >
              Know more about Lakshadweep
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
