import Link from "next/link";
import { Mail, MapPin, Phone, MessageCircle, ArrowRight } from "lucide-react";
import { COMPANY } from "@/lib/site-data";
import { SITE_URL } from "@/lib/seo";

export const metadata = {
  title: "Contact - Adventure Peak Travel",
  description: "Get in touch with Adventure Peak Travel for Lakshadweep packages, stays, resorts, flights, and visa assistance.",
  alternates: { canonical: "/contact" },
  openGraph: {
    title: "Contact - Adventure Peak Travel",
    description: "Get in touch with Adventure Peak Travel for Lakshadweep packages, stays, resorts, flights, and visa assistance.",
    type: "website",
    url: `${SITE_URL}/contact`,
  },
  twitter: {
    card: "summary_large_image",
    title: "Contact - Adventure Peak Travel",
    description: "Get in touch with Adventure Peak Travel for Lakshadweep packages, stays, resorts, flights, and visa assistance.",
  },
};

export default function ContactPage() {
  return (
    <section className="max-w-6xl mx-auto px-6 py-10 md:py-16">
      <div className="rounded-3xl bg-gradient-ocean text-primary-foreground p-8 md:p-12 shadow-soft">
        <p className="text-sm font-semibold uppercase tracking-[0.35em] text-primary-foreground/75">Contact Us</p>
        <h1 className="mt-4 text-3xl md:text-5xl font-bold">Escape to Lakshadweep with Adventure Peak Travels</h1>
        <p className="mt-4 max-w-3xl text-primary-foreground/85 leading-7">
          {COMPANY.description}
        </p>
        <p className="mt-3 max-w-2xl text-primary-foreground/85">
          Reach out for packages, home stays, resorts, flights, or visa support. We usually respond quickly on WhatsApp.
        </p>

        <div className="mt-8 flex flex-wrap gap-3">
          <a
            href={`https://wa.me/${COMPANY.whatsapp}`}
            target="_blank"
            rel="noopener"
            className="inline-flex items-center gap-2 rounded-xl bg-background px-5 py-3 text-sm font-semibold text-foreground shadow-sm"
          >
            <MessageCircle className="h-4 w-4" />
            WhatsApp
          </a>
          {COMPANY.phones.map((phone) => (
            <a
              key={phone}
              href={`tel:${phone.replace(/\s/g, "")}`}
              className="inline-flex items-center gap-2 rounded-xl border border-white/30 px-5 py-3 text-sm font-semibold text-primary-foreground hover:bg-white/10"
            >
              <Phone className="h-4 w-4" />
              Call {phone}
            </a>
          ))}
        </div>
      </div>

      <div className="mt-8 grid gap-5 md:grid-cols-3">
        <div className="rounded-2xl border border-border bg-card p-6 shadow-card">
          <Mail className="h-6 w-6 text-primary" />
          <h2 className="mt-4 text-lg font-semibold">Email</h2>
          <p className="mt-2 text-sm text-muted-foreground">{COMPANY.email}</p>
        </div>
        <div className="rounded-2xl border border-border bg-card p-6 shadow-card">
          <Phone className="h-6 w-6 text-primary" />
          <h2 className="mt-4 text-lg font-semibold">Phone</h2>
          <div className="mt-2 space-y-1 text-sm text-muted-foreground">
            {COMPANY.phones.map((phone) => (
              <p key={phone}>{phone}</p>
            ))}
          </div>
        </div>
        <div className="rounded-2xl border border-border bg-card p-6 shadow-card">
          <MapPin className="h-6 w-6 text-primary" />
          <h2 className="mt-4 text-lg font-semibold">Location</h2>
          <p className="mt-2 text-sm text-muted-foreground">{COMPANY.location}</p>
        </div>
      </div>

      <div className="mt-8 grid gap-5 md:grid-cols-[1fr_auto] items-start">
        <div className="rounded-2xl border border-border bg-card p-6 shadow-card">
          <h2 className="text-2xl font-bold">Quick Links</h2>
          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            {[
              { label: "Packages", href: "/packages" },
              { label: "Home Stay", href: "/home-stay" },
              { label: "Resorts", href: "/resorts" },
              { label: "Flights", href: "/flights" },
              { label: "Visas", href: "/visas" },
            ].map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="inline-flex items-center justify-between rounded-xl border border-border px-4 py-3 text-sm font-medium hover:bg-secondary"
              >
                <span>{item.label}</span>
                <ArrowRight className="h-4 w-4 text-primary" />
              </Link>
            ))}
          </div>
        </div>

        <div className="rounded-2xl border border-border bg-card p-6 shadow-card">
          <h2 className="text-2xl font-bold">Need help fast?</h2>
          <p className="mt-3 text-sm text-muted-foreground">
            Tap WhatsApp for the quickest response, or call us directly for bookings and urgent travel questions.
          </p>
          <a
            href={`https://wa.me/${COMPANY.whatsapp}`}
            target="_blank"
            rel="noopener"
            className="mt-5 inline-flex items-center gap-2 rounded-xl bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground"
          >
            Start Chat
            <ArrowRight className="h-4 w-4" />
          </a>
        </div>
      </div>
    </section>
  );
}
