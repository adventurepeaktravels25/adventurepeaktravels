import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteLayout } from "@/components/SiteLayout";
import { COMPANY } from "@/lib/site-data";
import { FlightBookingWidget } from "@/components/FlightBookingWidget";
import { Plane, Globe, Tag, Headphones, Check } from "lucide-react";

export const Route = createFileRoute("/flights")({
  head: () => ({
    meta: [
      { title: "Flight Ticket Booking — Domestic & International | Adventure Peak Travel" },
      { name: "description", content: "Book domestic and international flight tickets at the best fares with Adventure Peak Travel Lakshadweep. 24/7 support, easy rescheduling and group bookings." },
      { property: "og:title", content: "Flight Ticket Booking — Adventure Peak Travel" },
      { property: "og:description", content: "Domestic & international flight tickets with the best fares and 24/7 support." },
      { property: "og:url", content: "/flights" },
    ],
    links: [{ rel: "canonical", href: "/flights" }],
  }),
  component: FlightsPage,
});

function FlightsPage() {
  const wa = `https://wa.me/${COMPANY.whatsapp}?text=${encodeURIComponent("Hi! I'd like to book a flight ticket. From: , To: , Date: , Pax: ")}`;
  return (
    <SiteLayout>
      <section className="bg-gradient-ocean text-primary-foreground py-14 md:py-20">
        <div className="max-w-7xl mx-auto px-6">
          <p className="text-sm font-semibold uppercase tracking-widest opacity-80">Flight bookings</p>
          <h1 className="mt-2 text-4xl md:text-5xl font-bold">Domestic & International Flight Tickets</h1>
          <p className="mt-3 max-w-2xl opacity-90">From Kochi to anywhere in the world — get the best fares and personalised service.</p>
          <div className="mt-8 text-foreground">
            <FlightBookingWidget />
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-6 py-12 md:py-16 grid md:grid-cols-2 gap-10 items-center">
        <div>
          <h2 className="text-2xl md:text-3xl font-bold">Why book flights with Adventure Peak?</h2>
          <ul className="mt-6 space-y-3">
            {[
              "Best fares across major airlines — domestic & international",
              "Multi-city, round trip and group bookings handled by experts",
              "Help with web check-in, seat selection and meal preferences",
              "Hassle-free rescheduling and cancellation support",
              "Special fares for Lakshadweep & Gulf routes",
              "Pay easily — UPI, cards, net banking, EMI",
            ].map(t => (
              <li key={t} className="flex gap-2.5"><Check className="h-5 w-5 text-primary mt-0.5 shrink-0" /><span>{t}</span></li>
            ))}
          </ul>
          <div className="mt-8 flex flex-wrap gap-3">
            <a href={wa} target="_blank" rel="noopener" className="rounded-xl bg-gradient-sunset text-accent-foreground px-6 py-3 font-semibold shadow-soft">Request a Quote</a>
            <Link to="/contact" className="rounded-xl border border-border px-6 py-3 font-semibold hover:bg-secondary">Contact us</Link>
          </div>
        </div>

        <div className="grid sm:grid-cols-2 gap-4">
          {[
            { icon: Plane, t: "All Airlines", d: "Indigo, Air India, Emirates, Etihad, Qatar, Saudia and more." },
            { icon: Globe, t: "Global Reach", d: "Tickets to UAE, Saudi, Maldives, Singapore, Malaysia and beyond." },
            { icon: Tag, t: "Best Fares", d: "We compare and negotiate — you get the lowest available fare." },
            { icon: Headphones, t: "24/7 Help", d: "Real human assistance before, during and after your trip." },
          ].map(f => (
            <div key={f.t} className="rounded-2xl bg-card border border-border p-5 shadow-card">
              <div className="h-10 w-10 rounded-xl bg-gradient-ocean text-primary-foreground flex items-center justify-center">
                <f.icon className="h-5 w-5" />
              </div>
              <h3 className="mt-3 font-semibold">{f.t}</h3>
              <p className="mt-1 text-sm text-muted-foreground">{f.d}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="max-w-4xl mx-auto px-6 pb-20">
        <div className="rounded-2xl border border-border bg-card p-6 md:p-8 shadow-card">
          <h2 className="text-xl font-semibold">Quick Flight Enquiry</h2>
          <p className="text-sm text-muted-foreground mt-1">Share your route and we'll send the best options within an hour.</p>
          <form className="mt-6 grid sm:grid-cols-2 gap-4" onSubmit={(e) => { e.preventDefault(); const f = e.currentTarget as HTMLFormElement; const data = new FormData(f); const txt = `Flight enquiry%0AName: ${data.get("name")}%0AFrom: ${data.get("from")}%0ATo: ${data.get("to")}%0ADate: ${data.get("date")}%0APax: ${data.get("pax")}`; window.open(`https://wa.me/${COMPANY.whatsapp}?text=${txt}`, "_blank"); }}>
            <input name="name" required placeholder="Your name" className="rounded-lg border border-input bg-background px-4 py-2.5 text-sm" />
            <input name="pax" required placeholder="Passengers (e.g. 2 adults)" className="rounded-lg border border-input bg-background px-4 py-2.5 text-sm" />
            <input name="from" required placeholder="From (e.g. Kochi)" className="rounded-lg border border-input bg-background px-4 py-2.5 text-sm" />
            <input name="to" required placeholder="To (e.g. Dubai)" className="rounded-lg border border-input bg-background px-4 py-2.5 text-sm" />
            <input name="date" type="date" required className="sm:col-span-2 rounded-lg border border-input bg-background px-4 py-2.5 text-sm" />
            <button className="sm:col-span-2 rounded-xl bg-primary text-primary-foreground py-3 font-semibold hover:bg-primary/90">Send Enquiry on WhatsApp</button>
          </form>
        </div>
      </section>
    </SiteLayout>
  );
}
