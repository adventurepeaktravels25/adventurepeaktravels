import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteLayout } from "@/components/SiteLayout";
import { PACKAGES, formatINR } from "@/lib/site-data";
import { Check } from "lucide-react";

export const Route = createFileRoute("/packages")({
  head: () => ({
    meta: [
      { title: "Lakshadweep Tour Packages — Adventure Peak Travel" },
      { name: "description", content: "Browse Lakshadweep holiday packages — Diamond luxury, Silver, Premium honeymoon, Beach homestay & Budget options from ₹12,999." },
      { property: "og:title", content: "Lakshadweep Tour Packages — Adventure Peak Travel" },
      { property: "og:description", content: "Luxury to budget Lakshadweep packages with beach stays, water sports and island hopping." },
      { property: "og:url", content: "/packages" },
    ],
    links: [{ rel: "canonical", href: "/packages" }],
  }),
  component: PackagesPage,
});

function PackagesPage() {
  return (
    <SiteLayout>
      <section className="bg-gradient-ocean text-primary-foreground py-14 md:py-20">
        <div className="max-w-7xl mx-auto px-6">
          <p className="text-sm font-semibold uppercase tracking-widest opacity-80">Holiday packages</p>
          <h1 className="mt-2 text-4xl md:text-5xl font-bold">Lakshadweep Tour Packages</h1>
          <p className="mt-3 max-w-2xl opacity-90">From budget homestays to luxury island escapes — pick the perfect Lakshadweep experience.</p>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-6 py-12 md:py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {PACKAGES.map(p => (
            <article key={p.slug} className="rounded-2xl overflow-hidden bg-card shadow-card hover:shadow-soft transition flex flex-col">
              <Link to="/packages/$slug" params={{ slug: p.slug }} className="relative aspect-[4/3] overflow-hidden block group">
                <img src={p.image} alt={p.name} loading="lazy" width={1024} height={768} className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-700" />
                {p.badge && <span className="absolute top-3 left-3 bg-gradient-sunset text-accent-foreground text-xs font-bold px-3 py-1 rounded-full">{p.badge}</span>}
              </Link>
              <div className="p-5 flex flex-col flex-1">
                <h2 className="font-semibold text-lg leading-tight">{p.name}</h2>
                <p className="mt-2 text-sm text-muted-foreground line-clamp-3">{p.description}</p>
                <ul className="mt-4 space-y-1.5 text-sm">
                  {p.highlights.slice(0, 3).map(h => (
                    <li key={h} className="flex gap-2"><Check className="h-4 w-4 text-primary shrink-0 mt-0.5" /><span>{h}</span></li>
                  ))}
                </ul>
                <div className="mt-5 pt-4 border-t border-border flex items-end justify-between">
                  <div>
                    <div className="text-xs text-muted-foreground line-through">{formatINR(p.originalPrice)}</div>
                    <div className="text-xl font-bold text-primary">{formatINR(p.price)}</div>
                  </div>
                  <Link to="/packages/$slug" params={{ slug: p.slug }} className="rounded-lg bg-primary text-primary-foreground px-4 py-2 text-sm font-semibold hover:bg-primary/90">
                    View Details
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>
    </SiteLayout>
  );
}
