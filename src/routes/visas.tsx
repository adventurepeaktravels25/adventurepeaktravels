import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteLayout } from "@/components/SiteLayout";
import { VISAS } from "@/lib/site-data";
import { Check } from "lucide-react";

export const Route = createFileRoute("/visas")({
  head: () => ({
    meta: [
      { title: "Tourist Visa Services — UAE, Malaysia, Maldives, Singapore | Adventure Peak Travel" },
      { name: "description", content: "Professional tourist visa processing for UAE, Malaysia, Maldives and Singapore. Fast, reliable visa assistance from Adventure Peak Travel Lakshadweep." },
      { property: "og:title", content: "Tourist Visa Services — Adventure Peak Travel" },
      { property: "og:description", content: "Hassle-free tourist visas for UAE, Malaysia, Maldives and Singapore." },
      { property: "og:url", content: "/visas" },
    ],
    links: [{ rel: "canonical", href: "/visas" }],
  }),
  component: VisasPage,
});

function VisasPage() {
  return (
    <SiteLayout>
      <section className="bg-gradient-ocean text-primary-foreground py-14 md:py-20">
        <div className="max-w-7xl mx-auto px-6">
          <p className="text-sm font-semibold uppercase tracking-widest opacity-80">Visa services</p>
          <h1 className="mt-2 text-4xl md:text-5xl font-bold">Tourist Visa Services</h1>
          <p className="mt-3 max-w-2xl opacity-90">End-to-end documentation, application and processing support for popular destinations.</p>
        </div>
      </section>
      <section className="max-w-7xl mx-auto px-6 py-12 md:py-16 grid md:grid-cols-2 gap-6">
        {VISAS.map(v => (
          <Link key={v.slug} to="/visas/$slug" params={{ slug: v.slug }} className="group rounded-2xl overflow-hidden bg-card shadow-card hover:shadow-soft transition flex flex-col sm:flex-row">
            <div className="sm:w-2/5 aspect-video sm:aspect-auto overflow-hidden">
              <img src={v.image} alt={v.country} loading="lazy" width={1024} height={768} className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-700" />
            </div>
            <div className="p-5 flex-1">
              <div className="text-2xl">{v.flag}</div>
              <h2 className="mt-1 font-semibold text-lg">{v.country}</h2>
              <p className="mt-1 text-sm text-muted-foreground line-clamp-2">{v.description}</p>
              <ul className="mt-3 space-y-1 text-sm">
                {v.highlights.slice(0,3).map(h => (
                  <li key={h} className="flex gap-1.5"><Check className="h-4 w-4 text-primary shrink-0 mt-0.5" /><span>{h}</span></li>
                ))}
              </ul>
            </div>
          </Link>
        ))}
      </section>
    </SiteLayout>
  );
}
