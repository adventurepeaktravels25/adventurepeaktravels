import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { SiteLayout } from "@/components/SiteLayout";
import { VISAS, COMPANY, type Visa } from "@/lib/site-data";
import { Check, ArrowLeft } from "lucide-react";

export const Route = createFileRoute("/visas/$slug")({
  loader: ({ params }): Visa => {
    const v = VISAS.find(x => x.slug === params.slug);
    if (!v) throw notFound();
    return v;
  },
  head: ({ loaderData }) => ({
    meta: loaderData ? [
      { title: `${loaderData.country} — Adventure Peak Travel` },
      { name: "description", content: loaderData.description },
      { property: "og:title", content: `${loaderData.country} — Adventure Peak Travel` },
      { property: "og:description", content: loaderData.description },
      { property: "og:url", content: `/visas/${loaderData.slug}` },
    ] : [],
    links: loaderData ? [{ rel: "canonical", href: `/visas/${loaderData.slug}` }] : [],
  }),
  component: VisaDetail,
  notFoundComponent: () => (
    <SiteLayout><div className="py-24 text-center"><h1 className="text-2xl font-bold">Visa not found</h1><Link to="/visas" className="text-primary underline mt-4 inline-block">Back to visas</Link></div></SiteLayout>
  ),
});

function VisaDetail() {
  const v = Route.useLoaderData() as Visa;
  const wa = `https://wa.me/${COMPANY.whatsapp}?text=${encodeURIComponent(`Hi! I'd like to apply for the ${v.country}. Please share requirements.`)}`;
  return (
    <SiteLayout>
      <div className="max-w-6xl mx-auto px-6 py-8">
        <Link to="/visas" className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-primary">
          <ArrowLeft className="h-4 w-4" /> All visas
        </Link>
      </div>
      <section className="max-w-6xl mx-auto px-6 pb-16 grid lg:grid-cols-2 gap-10">
        <div className="rounded-2xl overflow-hidden shadow-card">
          <img src={v.image} alt={v.country} width={1024} height={768} className="w-full aspect-[4/3] object-cover" />
        </div>
        <div>
          <div className="text-4xl">{v.flag}</div>
          <h1 className="mt-2 text-3xl md:text-4xl font-bold">{v.country}</h1>
          <p className="mt-4 text-muted-foreground leading-relaxed">{v.description}</p>
          <h2 className="mt-8 text-xl font-semibold">What we offer</h2>
          <ul className="mt-4 space-y-2.5">
            {v.highlights.map(h => (
              <li key={h} className="flex gap-2.5"><Check className="h-5 w-5 text-primary shrink-0 mt-0.5" /><span>{h}</span></li>
            ))}
          </ul>
          <div className="mt-8 flex flex-wrap gap-3">
            <a href={wa} target="_blank" rel="noopener" className="rounded-xl bg-gradient-sunset text-accent-foreground px-6 py-3 font-semibold shadow-soft">Apply on WhatsApp</a>
            <Link to="/contact" className="rounded-xl border border-border px-6 py-3 font-semibold hover:bg-secondary">Enquire Now</Link>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}
