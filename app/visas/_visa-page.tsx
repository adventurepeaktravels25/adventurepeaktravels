import Link from "next/link";
import {
  ArrowLeft,
  CheckCircle2,
  MessageCircleMore,
  Clock3,
  FileText,
  ShieldCheck,
  Sparkles,
  MapPinned,
} from "lucide-react";
import { COMPANY, type Visa } from "@/lib/site-data";

export type VisaPageContent = {
  intro: string;
  serviceSteps: string[];
  checklist: string[];
  faqs: { q: string; a: string }[];
  spotlight: string[];
  badge: string;
};

type Props = {
  visa: Visa;
  content: VisaPageContent;
};

export function VisaPage({ visa, content }: Props) {
  return (
    <section className="max-w-6xl mx-auto px-6 py-16 md:py-20">
      <Link
        href="/visas"
        className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:underline"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to visas
      </Link>

      <div className="mt-6 grid gap-8 lg:grid-cols-[1.08fr_0.92fr]">
        <div className="overflow-hidden rounded-3xl border border-border bg-card shadow-card">
          <img
            src={typeof visa.image === "string" ? visa.image : visa.image.src}
            alt={visa.country}
            className="h-full w-full object-cover"
          />
        </div>
        <div>
          <div className="text-sm font-semibold uppercase tracking-[0.25em] text-primary">
            {content.badge}
          </div>
          <div className="mt-3 text-4xl">{visa.flag}</div>
          <h1 className="mt-3 text-4xl font-bold">{visa.country}</h1>
          <p className="mt-4 text-muted-foreground leading-7">{content.intro}</p>

          <div className="mt-8 rounded-2xl border border-border bg-secondary/30 p-6">
            <h2 className="font-semibold">What we help with</h2>
            <ul className="mt-4 space-y-3">
              {visa.highlights.map((item) => (
                <li key={item} className="flex items-start gap-2 text-sm">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-8 grid gap-4 sm:grid-cols-3">
            {[
              {
                icon: Clock3,
                title: "Quick guidance",
                desc: "Clear support from first step to submission.",
              },
              {
                icon: ShieldCheck,
                title: "Document check",
                desc: "We review your papers before you apply.",
              },
              {
                icon: Sparkles,
                title: "Travel ready",
                desc: "Visa support aligned with your trip plans.",
              },
            ].map((item) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.title}
                  className="rounded-2xl border border-border bg-background p-4"
                >
                  <Icon className="h-5 w-5 text-primary" />
                  <h3 className="mt-3 font-semibold">{item.title}</h3>
                  <p className="mt-1 text-sm text-muted-foreground">{item.desc}</p>
                </div>
              );
            })}
          </div>

          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href={`https://wa.me/${COMPANY.whatsapp}`}
              target="_blank"
              rel="noopener"
              className="inline-flex items-center gap-2 rounded-xl bg-primary px-6 py-3 font-semibold text-primary-foreground shadow-soft"
            >
              <MessageCircleMore className="h-4 w-4" />
              Ask on WhatsApp
            </a>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 rounded-xl border border-border bg-background px-6 py-3 font-semibold hover:bg-secondary transition"
            >
              Contact form
            </Link>
          </div>
        </div>
      </div>

      <div className="mt-16 grid gap-6 lg:grid-cols-2">
        <div className="rounded-3xl border border-border bg-card p-6 shadow-card">
          <div className="flex items-center gap-2">
            <FileText className="h-5 w-5 text-primary" />
            <h2 className="text-2xl font-bold">How it works</h2>
          </div>
          <div className="mt-6 space-y-4">
            {content.serviceSteps.map((step, index) => (
              <div key={step} className="flex gap-4">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary text-sm font-semibold text-primary-foreground">
                  {index + 1}
                </div>
                <p className="pt-1 text-sm leading-6 text-muted-foreground">{step}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-3xl border border-border bg-secondary/30 p-6 shadow-card">
          <div className="flex items-center gap-2">
            <MapPinned className="h-5 w-5 text-primary" />
            <h2 className="text-2xl font-bold">Destination spotlight</h2>
          </div>
          <ul className="mt-6 space-y-3">
            {content.spotlight.map((item) => (
              <li key={item} className="flex items-start gap-2 text-sm">
                <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
          <div className="mt-8">
            <h3 className="text-lg font-semibold">Common checklist</h3>
            <ul className="mt-4 space-y-3">
              {content.checklist.map((item) => (
                <li key={item} className="flex items-start gap-2 text-sm">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <div className="mt-16">
        <div className="flex items-end justify-between gap-4 flex-wrap">
          <div>
            <p className="text-sm font-semibold uppercase tracking-widest text-primary">FAQ</p>
            <h2 className="mt-2 text-3xl font-bold">Common questions</h2>
          </div>
        </div>
        <div className="mt-8 grid gap-4">
          {content.faqs.map((faq) => (
            <div key={faq.q} className="rounded-2xl border border-border bg-card p-5 shadow-card">
              <h3 className="font-semibold">{faq.q}</h3>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">{faq.a}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
