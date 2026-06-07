import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { SiteLayout } from "@/components/SiteLayout";
import { PACKAGES, COMPANY, formatINR, type Package } from "@/lib/site-data";
import { Check, ArrowLeft, Phone, Mail } from "lucide-react";

export const Route = createFileRoute("/packages/$slug")({
  loader: ({ params }): Package => {
    const pkg = PACKAGES.find(p => p.slug === params.slug);
    if (!pkg) throw notFound();
    return pkg;
  },
  head: ({ loaderData }) => ({
    meta: loaderData ? [
      { title: `${loaderData.name} — Adventure Peak Travel` },
      { name: "description", content: loaderData.description },
      { property: "og:title", content: `${loaderData.name} — Adventure Peak Travel` },
      { property: "og:description", content: loaderData.description },
      { property: "og:type", content: "product" },
      { property: "og:url", content: `/packages/${loaderData.slug}` },
    ] : [],
    links: loaderData ? [{ rel: "canonical", href: `/packages/${loaderData.slug}` }] : [],
  }),
  component: PackageDetail,
  notFoundComponent: () => (
    <SiteLayout><div className="py-24 text-center"><h1 className="text-2xl font-bold">Package not found</h1><Link to="/packages" className="mt-4 inline-block text-primary underline">Back to packages</Link></div></SiteLayout>
  ),
});

function PackageDetail() {
  const p = Route.useLoaderData() as Package;
  const wa = `https://wa.me/${COMPANY.whatsapp}?text=${encodeURIComponent(`Hi! I'm interested in the ${p.name} (${formatINR(p.price)}). Please share details.`)}`;
  return (
    <SiteLayout>
      <div className="max-w-6xl mx-auto px-6 py-8">
        <Link to="/packages" className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-primary">
          <ArrowLeft className="h-4 w-4" /> All packages
        </Link>
      </div>
      <section className="max-w-6xl mx-auto px-6 pb-16 grid lg:grid-cols-5 gap-10">
        <div className="lg:col-span-3">
          <div className="rounded-2xl overflow-hidden shadow-card">
            <img src={p.image} alt={p.name} width={1024} height={768} className="w-full aspect-[4/3] object-cover" />
          </div>
          <div className="mt-8">
            <h1 className="text-3xl md:text-4xl font-bold">{p.name}</h1>
            <p className="mt-4 text-muted-foreground leading-relaxed">{p.description}</p>
            <h2 className="mt-8 text-xl font-semibold">Package Highlights</h2>
            <ul className="mt-4 grid sm:grid-cols-2 gap-3">
              {p.highlights.map(h => (
                <li key={h} className="flex gap-2.5 bg-secondary/50 rounded-lg p-3">
                  <Check className="h-5 w-5 text-primary shrink-0 mt-0.5" /><span className="text-sm">{h}</span>
                </li>
              ))}
            </ul>
            <div className="mt-8 p-5 rounded-xl bg-secondary/40 border border-border text-sm text-muted-foreground">
              <strong className="text-foreground">Note:</strong> Detailed day-by-day itinerary, inclusions and exclusions will be shared on enquiry. Prices are per person and subject to availability and travel dates.
            </div>
          </div>
        </div>
        <aside className="lg:col-span-2">
          <div className="sticky top-24 rounded-2xl border border-border bg-card p-6 shadow-card">
            {p.badge && <span className="bg-gradient-sunset text-accent-foreground text-xs font-bold px-3 py-1 rounded-full">{p.badge}</span>}
            <div className="mt-4 flex items-baseline gap-2">
              <span className="text-3xl font-bold text-primary">{formatINR(p.price)}</span>
              <span className="text-muted-foreground line-through">{formatINR(p.originalPrice)}</span>
            </div>
            <p className="text-xs text-muted-foreground mt-1">Per person · onwards</p>
            <a href={wa} target="_blank" rel="noopener" className="mt-5 w-full rounded-xl bg-gradient-sunset text-accent-foreground py-3 font-semibold text-center block shadow-soft hover:opacity-95">Book on WhatsApp</a>
            <div className="mt-3 grid grid-cols-2 gap-2">
              {COMPANY.phones.map(ph => (
                <a key={ph} href={`tel:${ph.replace(/\s/g,"")}`} className="rounded-lg border border-border text-center py-2 text-sm font-medium hover:bg-secondary flex items-center justify-center gap-1">
                  <Phone className="h-3.5 w-3.5" /> Call
                </a>
              ))}
            </div>
            <a href={`mailto:${COMPANY.email}`} className="mt-2 w-full rounded-lg border border-border py-2 text-sm font-medium hover:bg-secondary flex items-center justify-center gap-1">
              <Mail className="h-3.5 w-3.5" /> {COMPANY.email}
            </a>
          </div>
        </aside>
      </section>
    </SiteLayout>
  );
}
