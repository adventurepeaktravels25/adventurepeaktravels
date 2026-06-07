import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/SiteLayout";
import { COMPANY } from "@/lib/site-data";
import { Mail, Phone, MapPin, MessageCircle } from "lucide-react";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact Adventure Peak Travel — Lakshadweep" },
      { name: "description", content: "Get in touch with Adventure Peak Travel for Lakshadweep packages, flight tickets and visa enquiries. Call, email or WhatsApp our travel experts." },
      { property: "og:title", content: "Contact — Adventure Peak Travel" },
      { property: "og:description", content: "Reach our team on phone, email or WhatsApp for travel enquiries." },
      { property: "og:url", content: "/contact" },
    ],
    links: [{ rel: "canonical", href: "/contact" }],
  }),
  component: ContactPage,
});

function ContactPage() {
  return (
    <SiteLayout>
      <section className="bg-gradient-ocean text-primary-foreground py-14 md:py-20">
        <div className="max-w-7xl mx-auto px-6">
          <p className="text-sm font-semibold uppercase tracking-widest opacity-80">Get in touch</p>
          <h1 className="mt-2 text-4xl md:text-5xl font-bold">Let's plan your trip</h1>
          <p className="mt-3 max-w-2xl opacity-90">Our travel experts respond within an hour during business hours.</p>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-6 py-12 md:py-16 grid lg:grid-cols-2 gap-10">
        <div>
          <h2 className="text-2xl font-bold">Reach us directly</h2>
          <div className="mt-6 space-y-4">
            <a href={`mailto:${COMPANY.email}`} className="flex items-start gap-4 rounded-2xl border border-border bg-card p-5 shadow-card hover:shadow-soft transition">
              <div className="h-11 w-11 rounded-xl bg-secondary text-primary flex items-center justify-center"><Mail className="h-5 w-5" /></div>
              <div>
                <div className="text-xs uppercase tracking-wider text-muted-foreground">Email</div>
                <div className="font-semibold break-all">{COMPANY.email}</div>
              </div>
            </a>
            {COMPANY.phones.map(p => (
              <a key={p} href={`tel:${p.replace(/\s/g,"")}`} className="flex items-start gap-4 rounded-2xl border border-border bg-card p-5 shadow-card hover:shadow-soft transition">
                <div className="h-11 w-11 rounded-xl bg-secondary text-primary flex items-center justify-center"><Phone className="h-5 w-5" /></div>
                <div>
                  <div className="text-xs uppercase tracking-wider text-muted-foreground">Phone</div>
                  <div className="font-semibold">{p}</div>
                </div>
              </a>
            ))}
            <a href={`https://wa.me/${COMPANY.whatsapp}`} target="_blank" rel="noopener" className="flex items-start gap-4 rounded-2xl border border-border bg-card p-5 shadow-card hover:shadow-soft transition">
              <div className="h-11 w-11 rounded-xl bg-[#25D366]/15 text-[#128C7E] flex items-center justify-center"><MessageCircle className="h-5 w-5" /></div>
              <div>
                <div className="text-xs uppercase tracking-wider text-muted-foreground">WhatsApp</div>
                <div className="font-semibold">Chat with our team</div>
              </div>
            </a>
            <div className="flex items-start gap-4 rounded-2xl border border-border bg-card p-5 shadow-card">
              <div className="h-11 w-11 rounded-xl bg-secondary text-primary flex items-center justify-center"><MapPin className="h-5 w-5" /></div>
              <div>
                <div className="text-xs uppercase tracking-wider text-muted-foreground">Location</div>
                <div className="font-semibold">{COMPANY.location}</div>
              </div>
            </div>
          </div>
        </div>

        <div>
          <h2 className="text-2xl font-bold">Send us a message</h2>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              const f = new FormData(e.currentTarget);
              const txt = `New enquiry%0AName: ${f.get("name")}%0APhone: ${f.get("phone")}%0AInterested in: ${f.get("interest")}%0AMessage: ${f.get("message")}`;
              window.open(`https://wa.me/${COMPANY.whatsapp}?text=${txt}`, "_blank");
            }}
            className="mt-6 space-y-4 rounded-2xl border border-border bg-card p-6 shadow-card"
          >
            <div className="grid sm:grid-cols-2 gap-4">
              <input name="name" required placeholder="Full name" className="rounded-lg border border-input bg-background px-4 py-2.5 text-sm" />
              <input name="phone" required placeholder="Phone number" className="rounded-lg border border-input bg-background px-4 py-2.5 text-sm" />
            </div>
            <select name="interest" required className="w-full rounded-lg border border-input bg-background px-4 py-2.5 text-sm">
              <option value="">I'm interested in…</option>
              <option>Lakshadweep Holiday Package</option>
              <option>Flight Booking</option>
              <option>Tourist Visa</option>
              <option>Other</option>
            </select>
            <textarea name="message" rows={5} placeholder="Tell us about your trip…" className="w-full rounded-lg border border-input bg-background px-4 py-2.5 text-sm" />
            <button className="w-full rounded-xl bg-gradient-sunset text-accent-foreground py-3 font-semibold shadow-soft">Send via WhatsApp</button>
            <p className="text-xs text-muted-foreground text-center">Your message opens in WhatsApp pre-filled — no spam, ever.</p>
          </form>
        </div>
      </section>
    </SiteLayout>
  );
}
