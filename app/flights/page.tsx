import { FlightBookingWidget } from "@/components/FlightBookingWidget";
import Link from "next/link";
import {
  Plane,
  Clock3,
  ShieldCheck,
  Ticket,
  MapPinned,
  ArrowRight,
  CheckCircle2,
} from "lucide-react";
import { COMPANY } from "@/lib/site-data";
import { SITE_URL } from "@/lib/seo";

export const metadata = {
  title: "Flights - Adventure Peak Travel",
  description:
    "Book domestic and international flights with Adventure Peak Travel and get quick travel support.",
  alternates: { canonical: "/flights" },
  openGraph: {
    title: "Flights - Adventure Peak Travel",
    description:
      "Book domestic and international flights with Adventure Peak Travel and get quick travel support.",
    type: "website",
    url: `${SITE_URL}/flights`,
  },
  twitter: {
    card: "summary_large_image",
    title: "Flights - Adventure Peak Travel",
    description:
      "Book domestic and international flights with Adventure Peak Travel and get quick travel support.",
  },
};

export default function FlightsPage() {
  return (
    <>
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-secondary/70 via-background to-primary/10" />
        <div className="absolute -top-24 right-0 h-72 w-72 rounded-full bg-primary/10 blur-3xl" />
        <div className="absolute -bottom-24 left-0 h-72 w-72 rounded-full bg-accent/20 blur-3xl" />

        <div className="relative max-w-7xl mx-auto px-6 py-16 md:py-24">
          <div className="grid gap-10 lg:grid-cols-[1.05fr_0.95fr] items-center">
            <div className="max-w-2xl">
              <p className="text-sm font-semibold uppercase tracking-[0.28em] text-primary">
                Flight Desk
              </p>
              <h1 className="mt-4 text-4xl md:text-6xl font-bold leading-tight">
                Smarter flight booking for island trips
              </h1>
              <p className="mt-5 text-base md:text-lg text-muted-foreground leading-8">
                Search and plan flights with quick human support from Adventure Peak Travel. We help
                you pair the right route with your Lakshadweep packages, visas, stays, and transfer
                plans.
              </p>

              <div className="mt-8 flex flex-wrap gap-3">
                <a
                  href={`https://wa.me/${COMPANY.whatsapp}`}
                  target="_blank"
                  rel="noopener"
                  className="inline-flex items-center gap-2 rounded-xl bg-primary px-6 py-3 font-semibold text-primary-foreground shadow-soft hover:opacity-95 transition"
                >
                  Book on WhatsApp
                </a>
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 rounded-xl border border-border bg-background px-6 py-3 font-semibold hover:bg-secondary transition"
                >
                  Ask for help
                </Link>
              </div>

              <div className="mt-10 grid gap-4 sm:grid-cols-3">
                {[
                  {
                    icon: Plane,
                    title: "Domestic + Intl",
                    desc: "Get support for India and overseas routes.",
                  },
                  {
                    icon: Clock3,
                    title: "Fast response",
                    desc: "Quick help when fares and dates move fast.",
                  },
                  {
                    icon: ShieldCheck,
                    title: "Trip aligned",
                    desc: "Flights matched to your stay and visa plan.",
                  },
                ].map((item) => {
                  const Icon = item.icon;
                  return (
                    <div
                      key={item.title}
                      className="rounded-2xl border border-border bg-card p-4 shadow-card"
                    >
                      <Icon className="h-5 w-5 text-primary" />
                      <h2 className="mt-3 font-semibold">{item.title}</h2>
                      <p className="mt-1 text-sm text-muted-foreground">{item.desc}</p>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="rounded-[2rem] border border-border bg-card/90 p-5 shadow-soft backdrop-blur">
              <FlightBookingWidget />
            </div>
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-6 py-16 md:py-20">
        <div className="grid gap-6 lg:grid-cols-3">
          <div className="rounded-3xl border border-border bg-card p-6 shadow-card lg:col-span-2">
            <div className="flex items-center gap-2">
              <Ticket className="h-5 w-5 text-primary" />
              <h2 className="text-2xl font-bold">Why book through us</h2>
            </div>
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              {[
                "Route suggestions for Agatti and major Indian departure cities",
                "Support for international connections through Gulf and Southeast Asia hubs",
                "Guidance on baggage, layovers, and date flexibility",
                "Can be bundled with visas, stays, and holiday packages",
              ].map((item) => (
                <div key={item} className="rounded-2xl border border-border bg-secondary/30 p-4">
                  <CheckCircle2 className="h-5 w-5 text-primary" />
                  <p className="mt-3 text-sm leading-6 text-muted-foreground">{item}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-3xl border border-border bg-gradient-to-br from-primary to-primary/80 p-6 text-primary-foreground shadow-soft">
            <div className="flex items-center gap-2">
              <MapPinned className="h-5 w-5" />
              <h2 className="text-2xl font-bold">Popular travel support</h2>
            </div>
            <ul className="mt-6 space-y-3 text-sm text-primary-foreground/90">
              <li>Agatti Island flight coordination</li>
              <li>Kerala to Lakshadweep route planning</li>
              <li>International flights for visa-linked trips</li>
              <li>Group and family travel support</li>
            </ul>
            <Link
              href="/contact"
              className="mt-8 inline-flex items-center gap-2 rounded-xl bg-background px-5 py-3 text-sm font-semibold text-foreground hover:bg-background/90 transition"
            >
              Talk to us <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
