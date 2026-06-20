"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";
import { useEffect, useState } from "react";
import {
  Home,
  Package,
  Plane,
  FileCheck,
  Phone,
  Menu,
  X,
  Mail,
  MapPin,
  House,
  Building2,
  Sparkles,
} from "lucide-react";
import logo from "@/assets/logo.png";
import { COMPANY } from "@/lib/site-data";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetClose,
} from "@/components/ui/sheet";

const NAV = [
  { to: "/", label: "Home", icon: Home },
  { to: "/about", label: "About Us", icon: Sparkles },
  { to: "/packages", label: "Packages", icon: Package },
  { to: "/home-stay", label: "Home Stay", icon: House },
  { to: "/resorts", label: "Resorts", icon: Building2 },
  { to: "/flights", label: "Flights", icon: Plane },
  { to: "/visas", label: "Visas", icon: FileCheck },
  { to: "/contact", label: "Contact", icon: Phone },
] as const;

export function SiteLayout({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  const [showPackages, setShowPackages] = useState(false);
  const [showMore, setShowMore] = useState(false);
  const [showContact, setShowContact] = useState(false);
  const [detailWaLink, setDetailWaLink] = useState("");
  const pathname = usePathname();
  const waLink = detailWaLink || `https://wa.me/${COMPANY.whatsapp}`;
  const isDetailPage = /^\/(packages|home-stay|resorts)\/Details\/[^/]+\/?$/.test(pathname);

  useEffect(() => {
    const onDetail = (event: Event) => {
      const customEvent = event as CustomEvent<{ waLink?: string }>;
      setDetailWaLink(customEvent.detail?.waLink ?? "");
    };
    window.addEventListener("detail-book-link", onDetail as EventListener);
    return () => window.removeEventListener("detail-book-link", onDetail as EventListener);
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <div className="hidden md:block bg-gradient-ocean text-primary-foreground text-xs">
        <div className="max-w-7xl mx-auto px-6 py-2 flex justify-between">
          <span className="flex items-center gap-4">
            <span className="flex items-center gap-1">
              <Mail className="h-3 w-3" /> {COMPANY.email}
            </span>
            <span className="flex items-center gap-1">
              <MapPin className="h-3 w-3" /> {COMPANY.location}
            </span>
          </span>
          <span className="flex items-center gap-3">
            {COMPANY.phones.map((p) => (
              <a
                key={p}
                href={`tel:${p.replace(/\s/g, "")}`}
                className="hover:underline flex items-center gap-1"
              >
                <Phone className="h-3 w-3" /> {p}
              </a>
            ))}
          </span>
        </div>
      </div>
      <header className="sticky top-0 z-40 backdrop-blur-md bg-background/85 border-b border-border">
        <div className="max-w-7xl mx-auto px-4 md:px-6 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <img
              src={(logo as unknown as { src: string }).src}
              alt="Adventure Peak Travel logo"
              width={40}
              height={40}
              className="h-10 w-10"
            />
            <div className="leading-tight">
              <div className="font-display font-bold text-base text-foreground">Adventure Peak</div>
              <div className="text-[10px] text-muted-foreground tracking-widest uppercase">
                Travel
              </div>
            </div>
          </Link>
          <nav className="hidden md:flex items-center gap-1">
            {NAV.map((n) => (
              <Link
                key={n.to}
                href={n.to}
                className="px-4 py-2 rounded-lg text-sm font-medium transition-colors hover:bg-secondary/60"
              >
                {n.label}
              </Link>
            ))}
            <a
              href={waLink}
              target="_blank"
              rel="noopener"
              className="ml-2 px-4 py-2 rounded-lg text-sm font-semibold bg-gradient-sunset text-accent-foreground shadow-soft hover:opacity-95 transition"
            >
              Book on WhatsApp
            </a>
          </nav>
          <button
            className="md:hidden p-2 rounded-lg hover:bg-secondary"
            onClick={() => setOpen((o) => !o)}
            aria-label="Menu"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </header>
      <main className={`flex-1 ${isDetailPage ? "pb-24 md:pb-0" : "pb-20 md:pb-0"}`}>
        {children}
      </main>
      <footer className="hidden md:block mt-16 border-t border-white/10 bg-[#04161f] text-background">
        <div className="mx-auto grid max-w-7xl gap-10 px-6 py-14 lg:grid-cols-[1.3fr_0.9fr_0.9fr_1fr] lg:items-start">
          <div className="max-w-md">
            <Link href="/" className="flex items-center gap-3">
              <img
                src={(logo as unknown as { src: string }).src}
                alt="Adventure Peak Travel logo"
                width={44}
                height={44}
                className="h-11 w-11 rounded-xl bg-white/5 p-1"
              />
              <div className="min-w-0">
                <div className="font-display text-lg font-bold leading-tight">
                  Adventure Peak Travel
                </div>
                <div className="text-[10px] uppercase tracking-[0.35em] text-white/60">
                  Lakshadweep Specialists
                </div>
              </div>
            </Link>
            <p className="mt-4 text-sm leading-6 text-white/70">
              Curating island holidays, stays, and travel services across Lakshadweep with trusted
              support, transparent pricing, and local expertise.
            </p>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-white/90">
              Contact
            </h3>
            <ul className="mt-4 space-y-3 text-sm text-white/70">
              <li className="flex items-start gap-2">
                <Mail className="mt-0.5 h-4 w-4 shrink-0" />
                <span className="leading-6">{COMPANY.email}</span>
              </li>
              {COMPANY.phones.map((phone) => (
                <li key={phone} className="flex items-start gap-2">
                  <Phone className="mt-0.5 h-4 w-4 shrink-0" />
                  <span className="leading-6">{phone}</span>
                </li>
              ))}
              <li className="flex items-start gap-2">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0" />
                <span className="leading-6">{COMPANY.location}</span>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-white/90">
              Quick Links
            </h3>
            <ul className="mt-4 space-y-3 text-sm text-white/70">
              {NAV.filter((item) => item.to !== "/" && item.to !== "/contact").map((item) => (
                <li key={item.to}>
                  <Link href={item.to} className="inline-flex hover:text-white hover:underline">
                    {item.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link href="/about" className="inline-flex hover:text-white hover:underline">
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  href="/explore-lakshadweep"
                  className="inline-flex hover:text-white hover:underline"
                >
                  Explore Lakshadweep
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-white/90">Office</h3>
            <div className="mt-4 space-y-4 text-sm leading-6 text-white/70">
              <p>{COMPANY.location}</p>
              <p>Adventure Peak Travel</p>
              <p>WhatsApp bookings and local assistance available 24/7.</p>
            </div>
            <a
              href={waLink}
              target="_blank"
              rel="noopener"
              className="mt-6 inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-sunset px-5 py-3 text-sm font-semibold text-accent-foreground shadow-soft"
            >
              Book on WhatsApp
            </a>
          </div>
        </div>
      </footer>
      {isDetailPage ? (
        <div className="md:hidden fixed bottom-0 inset-x-0 z-40 bg-background/95 backdrop-blur border-t border-border safe-bottom px-4 py-3">
          <div className="grid grid-cols-2 gap-3">
            <button
              type="button"
              onClick={() => setShowMore(true)}
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-border bg-card px-4 py-3 text-sm font-semibold"
            >
              <Menu className="h-4 w-4" />
              More
            </button>
            <a
              href={waLink}
              target="_blank"
              rel="noopener"
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-4 py-3 text-sm font-semibold text-primary-foreground shadow-soft"
            >
              <Phone className="h-4 w-4" />
              Book
            </a>
          </div>
        </div>
      ) : (
        <nav className="md:hidden fixed bottom-0 inset-x-0 z-40 bg-background/95 backdrop-blur border-t border-border safe-bottom">
          <div className="grid grid-cols-4">
            {NAV.slice(0, 1).map((n) => {
              const Icon = n.icon;
              return (
                <Link
                  key={n.to}
                  href={n.to}
                  className="flex flex-col items-center justify-center py-2.5 gap-0.5 text-[10px] font-medium text-muted-foreground"
                >
                  <Icon className="h-5 w-5" />
                  {n.label}
                </Link>
              );
            })}
            <button
              type="button"
              onClick={() => setShowPackages(true)}
              className="flex flex-col items-center justify-center py-2.5 gap-0.5 text-[10px] font-medium text-muted-foreground"
            >
              <Package className="h-5 w-5" />
              Packages & Stay
            </button>
            {NAV.slice(5, 6).map((n) => {
              const Icon = n.icon;
              return (
                <Link
                  key={n.to}
                  href={n.to}
                  className="flex flex-col items-center justify-center py-2.5 gap-0.5 text-[10px] font-medium text-muted-foreground"
                >
                  <Icon className="h-5 w-5" />
                  {n.label}
                </Link>
              );
            })}
            <button
              type="button"
              onClick={() => setShowContact(true)}
              className="flex flex-col items-center justify-center py-2.5 gap-0.5 text-[10px] font-medium text-muted-foreground"
            >
              <Phone className="h-5 w-5" />
              Contact
            </button>
          </div>
        </nav>
      )}
      <Sheet open={showMore} onOpenChange={setShowMore}>
        <SheetContent side="bottom">
          <SheetHeader>
            <SheetTitle>More Options</SheetTitle>
            <SheetDescription>Quick links for this page.</SheetDescription>
          </SheetHeader>
          <div className="mt-4 grid gap-3">
            {NAV.map((n) => (
              <SheetClose asChild key={n.to}>
                <Link
                  href={n.to}
                  className="rounded-2xl border border-border bg-card px-4 py-4 text-left font-medium"
                >
                  {n.label}
                </Link>
              </SheetClose>
            ))}
          </div>
        </SheetContent>
      </Sheet>
      <Sheet open={showPackages} onOpenChange={setShowPackages}>
        <SheetContent
          side="bottom"
          className="rounded-t-3xl border-border px-0 pb-[calc(1rem+env(safe-area-inset-bottom))] pt-3"
        >
          <div className="mx-auto mb-4 h-1.5 w-12 rounded-full bg-border" />
          <div className="px-5">
            <SheetHeader className="text-left">
              <SheetTitle>Packages & Stay</SheetTitle>
              <SheetDescription>Choose a section to explore live listings.</SheetDescription>
            </SheetHeader>

            <div className="mt-5 grid gap-3">
              {[
                { href: "/packages", label: "Packages" },
                { href: "/resorts", label: "Resorts" },
                { href: "/home-stay", label: "Home Stays" },
                { href: "/flights", label: "Flight" },
              ].map((item) => (
                <SheetClose asChild key={item.href}>
                  <Link
                    href={item.href}
                    className="rounded-2xl border border-border bg-card px-4 py-4 text-left font-medium hover:bg-secondary"
                  >
                    {item.label}
                  </Link>
                </SheetClose>
              ))}
            </div>
          </div>
        </SheetContent>
      </Sheet>
      <Sheet open={showContact} onOpenChange={setShowContact}>
        <SheetContent
          side="bottom"
          className="rounded-t-3xl border-border px-0 pb-[calc(1rem+env(safe-area-inset-bottom))] pt-3"
        >
          <div className="mx-auto mb-4 h-1.5 w-12 rounded-full bg-border" />
          <div className="px-5">
            <SheetHeader className="text-left">
              <SheetTitle>Contact Us</SheetTitle>
              <SheetDescription>Choose how you want to reach us.</SheetDescription>
            </SheetHeader>

            <div className="mt-5 grid gap-3">
              <a
                href={`https://wa.me/${COMPANY.whatsapp}`}
                target="_blank"
                rel="noopener"
                className="rounded-2xl border border-border bg-card px-4 py-4 text-left font-medium hover:bg-secondary"
              >
                WhatsApp
              </a>
              {COMPANY.phones.map((phone) => (
                <a
                  key={phone}
                  href={`tel:${phone.replace(/\s/g, "")}`}
                  className="rounded-2xl border border-border bg-card px-4 py-4 text-left font-medium hover:bg-secondary"
                >
                  Call {phone}
                </a>
              ))}
              <SheetClose asChild>
                <Link
                  href="/contact"
                  className="rounded-2xl border border-border bg-card px-4 py-4 text-left font-medium hover:bg-secondary"
                >
                  Contact Us
                </Link>
              </SheetClose>
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
}
