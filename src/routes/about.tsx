import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteLayout } from "@/components/SiteLayout";
import { COMPANY } from "@/lib/site-data";
import { Star, Heart, Shield } from "lucide-react";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About Adventure Peak Travel — Lakshadweep Travel Agency" },
      { name: "description", content: "Adventure Peak Travel is a Lakshadweep-based travel agency specialising in island holidays, international flight tickets and tourist visa services." },
      { property: "og:title", content: "About — Adventure Peak Travel" },
      { property: "og:description", content: "Lakshadweep travel experts — holidays, flights and visas." },
      { property: "og:url", content: "/about" },
    ],
    links: [{ rel: "canonical", href: "/about" }],
  }),
  component: AboutPage,
});

function AboutPage() {
  return (
    <SiteLayout>
      <section className="bg-gradient-ocean text-primary-foreground py-16 md:py-24">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <p className="text-sm font-semibold uppercase tracking-widest opacity-80">About us</p>
          <h1 className="mt-2 text-4xl md:text-5xl font-bold">Travel, made effortless from the islands</h1>
          <p className="mt-4 opacity-90">{COMPANY.name} is a Lakshadweep-based travel agency built by people who live and breathe the islands. We design honest, beautiful trips and handle the paperwork so you don't have to.</p>
        </div>
      </section>
      <section className="max-w-5xl mx-auto px-6 py-16 grid md:grid-cols-3 gap-6">
        {[
          { icon: Heart, t: "Made with care", d: "Every itinerary is hand-curated by locals who know each beach and lagoon personally." },
          { icon: Star, t: "Highly rated", d: "Hundreds of happy travellers from across India and the Gulf trust us with their holidays." },
          { icon: Shield, t: "Safe & secure", d: "Verified hotels, licensed operators and transparent pricing on every booking." },
        ].map(v => (
          <div key={v.t} className="rounded-2xl border border-border bg-card p-6 shadow-card">
            <div className="h-11 w-11 rounded-xl bg-secondary text-primary flex items-center justify-center"><v.icon className="h-5 w-5" /></div>
            <h2 className="mt-4 font-semibold text-lg">{v.t}</h2>
            <p className="mt-2 text-sm text-muted-foreground">{v.d}</p>
          </div>
        ))}
      </section>
      <section className="max-w-3xl mx-auto px-6 pb-20 text-center">
        <h2 className="text-2xl md:text-3xl font-bold">Ready to plan something amazing?</h2>
        <p className="mt-3 text-muted-foreground">Browse our Lakshadweep packages or talk to us about a custom trip.</p>
        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <Link to="/packages" className="rounded-xl bg-primary text-primary-foreground px-6 py-3 font-semibold hover:bg-primary/90">View packages</Link>
          <Link to="/contact" className="rounded-xl border border-border px-6 py-3 font-semibold hover:bg-secondary">Contact us</Link>
        </div>
      </section>
    </SiteLayout>
  );
}
