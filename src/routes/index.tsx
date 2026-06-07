import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteLayout } from "@/components/SiteLayout";
import { PACKAGES, VISAS, COMPANY, formatINR } from "@/lib/site-data";
import hero from "@/assets/hero-lakshadweep.jpg";
import { Plane, Package as PackageIcon, FileCheck, Star, Shield, Headphones, MapPin, ArrowRight } from "lucide-react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Adventure Peak Travel — Lakshadweep Tour Packages, Flights & Visas" },
      { name: "description", content: "Book Lakshadweep holiday packages from ₹12,999, international flight tickets and tourist visas for UAE, Malaysia, Maldives & Singapore with Adventure Peak Travel." },
      { property: "og:title", content: "Adventure Peak Travel — Lakshadweep Tour Packages, Flights & Visas" },
      { property: "og:description", content: "Curated Lakshadweep packages, flights & tourist visas. Trusted travel partner from Lakshadweep." },
      { property: "og:url", content: "/" },
      { property: "og:image", content: "/og-home.jpg" },
    ],
    links: [{ rel: "canonical", href: "/" }],
    scripts: [{
      type: "application/ld+json",
      children: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "TravelAgency",
        name: COMPANY.name,
        email: COMPANY.email,
        telephone: COMPANY.phones,
        address: { "@type": "PostalAddress", addressRegion: "Lakshadweep", addressCountry: "IN" },
      }),
    }],
  }),
  component: HomePage,
});

function HomePage() {
  return (
    <SiteLayout>
      {/* Hero */}
      <section className="relative h-[88vh] min-h-[560px] w-full overflow-hidden">
        <img src={hero} alt="Aerial view of a Lakshadweep island" width={1920} height={1080} className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-b from-ocean/30 via-ocean/40 to-foreground/80" />
        <div className="relative h-full max-w-7xl mx-auto px-6 flex flex-col justify-end pb-20 md:pb-28">
          <span className="inline-flex w-fit items-center gap-2 rounded-full bg-background/15 backdrop-blur px-3 py-1.5 text-xs font-medium text-primary-foreground border border-primary-foreground/20">
            <MapPin className="h-3.5 w-3.5" /> Based in Lakshadweep, India
          </span>
          <h1 className="mt-4 max-w-3xl text-4xl md:text-6xl lg:text-7xl font-bold text-primary-foreground leading-[1.05]">
            Your Island Escape <br /> Begins with <span className="text-coral">Adventure Peak</span>
          </h1>
          <p className="mt-5 max-w-xl text-base md:text-lg text-primary-foreground/85">
            Handcrafted Lakshadweep holiday packages, flight bookings and tourist visa services — all in one trusted place.
          </p>
          <div className="mt-7 flex flex-wrap gap-3">
            <Link to="/packages" className="inline-flex items-center gap-2 rounded-xl bg-gradient-sunset text-accent-foreground px-6 py-3 font-semibold shadow-soft hover:opacity-95">
              Explore Packages <ArrowRight className="h-4 w-4" />
            </Link>
            <Link to="/flights" className="inline-flex items-center gap-2 rounded-xl bg-background/15 backdrop-blur border border-primary-foreground/30 text-primary-foreground px-6 py-3 font-semibold hover:bg-background/25">
              Book Flight
            </Link>
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="max-w-7xl mx-auto px-6 py-16 md:py-24">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <p className="text-sm font-semibold uppercase tracking-widest text-primary">What we do</p>
          <h2 className="mt-2 text-3xl md:text-4xl font-bold">Everything you need to travel, in one place</h2>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {[
            { icon: PackageIcon, title: "Holiday Packages", desc: "Curated Lakshadweep packages from budget homestays to luxury island escapes.", to: "/packages" },
            { icon: Plane, title: "Flight Tickets", desc: "Domestic and international flight bookings at the best fares with 24/7 support.", to: "/flights" },
            { icon: FileCheck, title: "Tourist Visas", desc: "Hassle-free visa processing for UAE, Malaysia, Maldives, Singapore and more.", to: "/visas" },
          ].map((s) => (
            <Link key={s.title} to={s.to} className="group rounded-2xl border border-border bg-card p-7 shadow-card hover:shadow-soft hover:-translate-y-1 transition-all">
              <div className="h-12 w-12 rounded-xl bg-gradient-ocean text-primary-foreground flex items-center justify-center">
                <s.icon className="h-6 w-6" />
              </div>
              <h3 className="mt-5 text-xl font-semibold">{s.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{s.desc}</p>
              <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-primary group-hover:gap-2 transition-all">
                Learn more <ArrowRight className="h-4 w-4" />
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* Featured Packages */}
      <section className="bg-secondary/40 py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-end justify-between mb-10 flex-wrap gap-4">
            <div>
              <p className="text-sm font-semibold uppercase tracking-widest text-primary">Top picks</p>
              <h2 className="mt-2 text-3xl md:text-4xl font-bold">Featured Lakshadweep Packages</h2>
            </div>
            <Link to="/packages" className="text-sm font-semibold text-primary hover:underline">View all packages →</Link>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {PACKAGES.slice(0, 3).map((p) => (
              <Link key={p.slug} to="/packages/$slug" params={{ slug: p.slug }} className="group rounded-2xl overflow-hidden bg-card shadow-card hover:shadow-soft transition-all">
                <div className="relative aspect-[4/3] overflow-hidden">
                  <img src={p.image} alt={p.name} loading="lazy" width={1024} height={768} className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-700" />
                  {p.badge && <span className="absolute top-3 left-3 bg-gradient-sunset text-accent-foreground text-xs font-bold px-3 py-1 rounded-full">{p.badge}</span>}
                </div>
                <div className="p-5">
                  <h3 className="font-semibold text-lg leading-tight">{p.name}</h3>
                  <p className="mt-2 text-sm text-muted-foreground line-clamp-2">{p.description}</p>
                  <div className="mt-4 flex items-baseline gap-2">
                    <span className="text-xl font-bold text-primary">{formatINR(p.price)}</span>
                    <span className="text-sm text-muted-foreground line-through">{formatINR(p.originalPrice)}</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Why Us */}
      <section className="max-w-7xl mx-auto px-6 py-16 md:py-24">
        <div className="grid md:grid-cols-3 gap-8">
          {[
            { icon: Star, title: "Local Lakshadweep Experts", desc: "Born and operating from the islands — we know every beach, lagoon and hidden gem." },
            { icon: Shield, title: "Trusted & Transparent", desc: "Clear pricing, verified hotels and honest itineraries — no hidden surprises." },
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

      {/* Visa strip */}
      <section className="bg-secondary/40 py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-end justify-between mb-10 flex-wrap gap-4">
            <div>
              <p className="text-sm font-semibold uppercase tracking-widest text-primary">International</p>
              <h2 className="mt-2 text-3xl md:text-4xl font-bold">Tourist Visa Services</h2>
            </div>
            <Link to="/visas" className="text-sm font-semibold text-primary hover:underline">All visas →</Link>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {VISAS.map(v => (
              <Link key={v.slug} to="/visas/$slug" params={{ slug: v.slug }} className="group relative rounded-2xl overflow-hidden aspect-[4/5] shadow-card hover:shadow-soft transition">
                <img src={v.image} alt={v.country} loading="lazy" width={1024} height={768} className="absolute inset-0 h-full w-full object-cover group-hover:scale-105 transition-transform duration-700" />
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

      {/* CTA */}
      <section className="max-w-7xl mx-auto px-6 py-16 md:py-24">
        <div className="rounded-3xl bg-gradient-ocean p-10 md:p-16 text-primary-foreground text-center shadow-soft">
          <h2 className="text-3xl md:text-4xl font-bold">Ready for your Lakshadweep adventure?</h2>
          <p className="mt-3 max-w-2xl mx-auto text-primary-foreground/85">Talk to our travel experts and get a custom quote for your dream trip — usually within an hour.</p>
          <div className="mt-7 flex flex-wrap justify-center gap-3">
            <a href={`https://wa.me/${COMPANY.whatsapp}`} target="_blank" rel="noopener" className="rounded-xl bg-gradient-sunset px-6 py-3 font-semibold text-accent-foreground shadow-soft">WhatsApp Us</a>
            <Link to="/contact" className="rounded-xl bg-background/15 backdrop-blur border border-primary-foreground/30 px-6 py-3 font-semibold hover:bg-background/25">Contact form</Link>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}
