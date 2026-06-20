import { SITE_URL } from "@/lib/seo";
import Link from "next/link";
import { ArrowRight, CheckCircle2, Clock3, FileText, Globe2, ShieldCheck } from "lucide-react";
import { COMPANY, VISAS } from "@/lib/site-data";

export const metadata = {
  title: "Visas - Adventure Peak Travel",
  description:
    "Get tourist visa support for UAE, Malaysia, Maldives, Singapore, and more with Adventure Peak Travel.",
  alternates: { canonical: "/visas" },
  openGraph: {
    title: "Visas - Adventure Peak Travel",
    description:
      "Get tourist visa support for UAE, Malaysia, Maldives, Singapore, and more with Adventure Peak Travel.",
    type: "website",
    url: `${SITE_URL}/visas`,
  },
  twitter: {
    card: "summary_large_image",
    title: "Visas - Adventure Peak Travel",
    description:
      "Get tourist visa support for UAE, Malaysia, Maldives, Singapore, and more with Adventure Peak Travel.",
  },
};
export default function VisasPage() {
  return (
    <>
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-secondary/70 via-background to-primary/10" />
        <div className="absolute -top-24 right-0 h-72 w-72 rounded-full bg-primary/10 blur-3xl" />
        <div className="absolute -bottom-24 left-0 h-72 w-72 rounded-full bg-accent/20 blur-3xl" />

        <div className="relative max-w-7xl mx-auto px-6 py-16 md:py-24">
          <div className="max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-[0.28em] text-primary">
              International Travel
            </p>
            <h1 className="mt-4 text-4xl md:text-6xl font-bold leading-tight">
              Tourist visa support made simple.
            </h1>
            <p className="mt-5 text-base md:text-lg text-muted-foreground max-w-2xl">
              We help you prepare documents, review requirements, and submit applications for
              popular tourist destinations like UAE, Malaysia, Maldives, and Singapore.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href={`https://wa.me/${COMPANY.whatsapp}`}
                target="_blank"
                rel="noopener"
                className="rounded-xl bg-primary px-6 py-3 font-semibold text-primary-foreground shadow-soft hover:opacity-95 transition"
              >
                Chat on WhatsApp
              </a>
              <Link
                href="/contact"
                className="rounded-xl border border-border bg-background px-6 py-3 font-semibold hover:bg-secondary transition"
              >
                Contact us
              </Link>
            </div>
          </div>

          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[
              {
                icon: ShieldCheck,
                title: "Document review",
                desc: "We check your papers before submission.",
              },
              {
                icon: Clock3,
                title: "Fast guidance",
                desc: "Quick support for common tourist routes.",
              },
              {
                icon: FileText,
                title: "Application help",
                desc: "Step-by-step support through the process.",
              },
              {
                icon: Globe2,
                title: "Popular destinations",
                desc: "UAE, Malaysia, Maldives, Singapore and more.",
              },
            ].map((item) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.title}
                  className="rounded-2xl border border-border bg-card p-5 shadow-card"
                >
                  <Icon className="h-5 w-5 text-primary" />
                  <h2 className="mt-4 font-semibold">{item.title}</h2>
                  <p className="mt-2 text-sm text-muted-foreground">{item.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-6 py-16 md:py-20">
        <div className="flex items-end justify-between gap-4 flex-wrap">
          <div>
            <p className="text-sm font-semibold uppercase tracking-widest text-primary">
              Available options
            </p>
            <h2 className="mt-2 text-3xl md:text-4xl font-bold">Popular tourist visas</h2>
          </div>
        </div>

        <div className="mt-8 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {VISAS.map((visa) => (
            <Link
              key={visa.slug}
              href={`/visas/${visa.slug}`}
              className="group overflow-hidden rounded-3xl border border-border bg-card shadow-card hover:shadow-soft transition"
            >
              <div className="relative aspect-[4/3] overflow-hidden">
                <img
                  src={typeof visa.image === "string" ? visa.image : visa.image.src}
                  alt={visa.country}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 via-foreground/10 to-transparent" />
                <div className="absolute bottom-4 left-4 right-4 text-primary-foreground">
                  <div className="text-2xl">{visa.flag}</div>
                  <h3 className="mt-1 text-xl font-semibold">{visa.country}</h3>
                </div>
              </div>
              <div className="p-5">
                <p className="text-sm text-muted-foreground">{visa.description}</p>
                <ul className="mt-4 space-y-2">
                  {visa.highlights.slice(0, 3).map((highlight) => (
                    <li key={highlight} className="flex items-start gap-2 text-sm">
                      <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                      <span>{highlight}</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-primary">
                  View details <ArrowRight className="h-4 w-4" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}
