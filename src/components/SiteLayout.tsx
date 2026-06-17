import { Link, useMatchRoute } from "@tanstack/react-router";
import type { ReactNode } from "react";
import { Home, Package, Plane, FileCheck, Phone, Menu, X, Mail, MapPin, House, Building2 } from "lucide-react";
import { useEffect, useState } from "react";
import logo from "@/assets/logo.png";
import { COMPANY } from "@/lib/site-data";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription, SheetClose } from "@/components/ui/sheet";

const NAV = [
  { to: "/", label: "Home", icon: Home },
  { to: "/packages", label: "Packages", icon: Package },
  { to: "/home-stay", label: "Home Stay", icon: House },
  { to: "/resorts", label: "Resorts", icon: Building2 },
  { to: "/flights", label: "Flights", icon: Plane },
  { to: "/visas", label: "Visas", icon: FileCheck },
  { to: "/contact", label: "Contact", icon: Phone },
] as const;

const MOBILE_NAV = [
  { to: "/", label: "Home", icon: Home },
  
  { to: "/visas", label: "Visas", icon: FileCheck },
  { to: "/contact", label: "Contact", icon: Phone },
] as const;

export function SiteLayout({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  const [showPackages, setShowPackages] = useState(false);
  const [showMore, setShowMore] = useState(false);
  const [detailWaLink, setDetailWaLink] = useState("");
  const waLink = detailWaLink || `https://wa.me/${COMPANY.whatsapp}`;
  const matchRoute = useMatchRoute();
  const isDetailPage = !!(
    matchRoute({ to: "/packages/Details/$slug", fuzzy: false }) ||
    matchRoute({ to: "/home-stay/Details/$slug", fuzzy: false }) ||
    matchRoute({ to: "/resorts/Details/$slug", fuzzy: false })
  );

  useEffect(() => {
    const handler = () => setShowPackages(true);
    window.addEventListener("open-packages-stay-modal", handler);
    return () => window.removeEventListener("open-packages-stay-modal", handler);
  }, []);

  useEffect(() => {
    const handler = (event: Event) => {
      const customEvent = event as CustomEvent<{ waLink?: string }>;
      setDetailWaLink(customEvent.detail?.waLink ?? "");
    };
    window.addEventListener("detail-book-link", handler as EventListener);
    return () => window.removeEventListener("detail-book-link", handler as EventListener);
  }, []);

  useEffect(() => {
    if (!isDetailPage) setDetailWaLink("");
  }, [isDetailPage]);

  return (
    <div className="min-h-screen flex flex-col bg-background">
      {/* Top bar (desktop) */}
      <div className="hidden md:block bg-gradient-ocean text-primary-foreground text-xs">
        <div className="max-w-7xl mx-auto px-6 py-2 flex justify-between">
          <span className="flex items-center gap-4">
            <span className="flex items-center gap-1"><Mail className="h-3 w-3" /> {COMPANY.email}</span>
            <span className="flex items-center gap-1"><MapPin className="h-3 w-3" /> {COMPANY.location}</span>
          </span>
          <span className="flex items-center gap-3">
            {COMPANY.phones.map(p => (
              <a key={p} href={`tel:${p.replace(/\s/g, "")}`} className="hover:underline flex items-center gap-1">
                <Phone className="h-3 w-3" /> {p}
              </a>
            ))}
          </span>
        </div>
      </div>

      {/* Header */}
      <header className="sticky top-0 z-40 backdrop-blur-md bg-background/85 border-b border-border">
        <div className="max-w-7xl mx-auto px-4 md:px-6 h-16 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <img src={(logo as unknown as { src: string }).src} alt="Adventure Peak Travel logo" width={40} height={40} className="h-10 w-10" />
            <div className="leading-tight">
              <div className="font-display font-bold text-base text-foreground">Adventure Peak</div>
              <div className="text-[10px] text-muted-foreground tracking-widest uppercase">Travel</div>
            </div>
          </Link>

          <nav className="hidden md:flex items-center gap-1">
            {NAV.map(n => (
              <Link
                key={n.to}
                to={n.to}
                activeProps={{ className: "text-primary bg-secondary" }}
                inactiveProps={{ className: "text-foreground/80 hover:text-primary hover:bg-secondary/60" }}
                activeOptions={{ exact: n.to === "/" }}
                className="px-4 py-2 rounded-lg text-sm font-medium transition-colors"
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
            onClick={() => setOpen(o => !o)}
            aria-label="Menu"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>

        {open && (
          <div className="md:hidden border-t border-border bg-background">
            <div className="px-4 py-3 flex flex-col gap-1">
              {NAV.map(n => (
                <Link
                  key={n.to}
                  to={n.to}
                  onClick={() => setOpen(false)}
                  className="px-3 py-2.5 rounded-lg text-sm font-medium hover:bg-secondary"
                >
                  {n.label}
                </Link>
              ))}
            </div>
          </div>
        )}
      </header>

      <main className={`flex-1 ${isDetailPage ? "pb-24 md:pb-0" : "pb-20 md:pb-0"}`}>{children}</main>

      {/* Footer (desktop) */}
      <footer className="hidden md:block bg-foreground text-background mt-16">
        <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-4 gap-8">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <img src={(logo as unknown as { src: string }).src} alt="" width={36} height={36} className="h-9 w-9" />
              <span className="font-display font-bold">Adventure Peak Travel</span>
            </div>
            <p className="text-sm text-background/70">
              Your trusted travel partner from Lakshadweep for tropical getaways, international tours and visa services.
            </p>
          </div>
          <div>
            <h4 className="font-semibold mb-3 text-sm uppercase tracking-wider">Explore</h4>
            <ul className="space-y-2 text-sm text-background/80">
              {NAV.map(n => (
                <li key={n.to}><Link to={n.to} className="hover:text-primary-foreground hover:underline">{n.label}</Link></li>
              ))}
              <li><Link to="/about" className="hover:underline">About Us</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-3 text-sm uppercase tracking-wider">Services</h4>
            <ul className="space-y-2 text-sm text-background/80">
              <li>Flight Tickets</li>
              <li>Holiday Packages</li>
              <li>Tourist Visas</li>
              <li>Island Tours</li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-3 text-sm uppercase tracking-wider">Contact</h4>
            <ul className="space-y-2 text-sm text-background/80">
              <li className="flex gap-2"><Mail className="h-4 w-4 mt-0.5 shrink-0" /> {COMPANY.email}</li>
              {COMPANY.phones.map(p => (
                <li key={p} className="flex gap-2"><Phone className="h-4 w-4 mt-0.5 shrink-0" /> {p}</li>
              ))}
              <li className="flex gap-2"><MapPin className="h-4 w-4 mt-0.5 shrink-0" /> {COMPANY.location}</li>
            </ul>
          </div>
        </div>
        <div className="border-t border-background/10 py-4 text-center text-xs text-background/60">
          © {new Date().getFullYear()} Adventure Peak Travel. All rights reserved.
        </div>
      </footer>

      {/* Mobile bottom nav (app-like) */}
      {isDetailPage ? (
        <nav className="md:hidden fixed bottom-0 inset-x-0 z-40 bg-background/95 backdrop-blur border-t border-border safe-bottom">
          <div className="grid grid-cols-2 gap-3 px-4 py-3">
            <button
              type="button"
              onClick={() => setShowMore(true)}
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-border bg-card px-4 py-3 text-sm font-semibold text-foreground shadow-sm"
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
        </nav>
      ) : (
        <nav className="md:hidden fixed bottom-0 inset-x-0 z-40 bg-background/95 backdrop-blur border-t border-border safe-bottom">
          <div className="grid grid-cols-4">
            {MOBILE_NAV.slice(0, 1).map(n => {
              const Icon = n.icon;
              return (
                <Link
                  key={n.to}
                  to={n.to}
                  activeProps={{ className: "text-primary" }}
                  inactiveProps={{ className: "text-muted-foreground" }}
                  activeOptions={{ exact: n.to === "/" }}
                  className="flex flex-col items-center justify-center py-2.5 gap-0.5 text-[10px] font-medium"
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
            {MOBILE_NAV.slice(1).map(n => {
              const Icon = n.icon;
              return (
                <Link
                  key={n.to}
                  to={n.to}
                  activeProps={{ className: "text-primary" }}
                  inactiveProps={{ className: "text-muted-foreground" }}
                  activeOptions={{ exact: n.to === "/" }}
                  className="flex flex-col items-center justify-center py-2.5 gap-0.5 text-[10px] font-medium"
                >
                  <Icon className="h-5 w-5" />
                  {n.label}
                </Link>
              );
            })}
          </div>
        </nav>
      )}

      <Sheet open={showPackages} onOpenChange={setShowPackages}>
        <SheetContent side="bottom" className="rounded-t-3xl border-border px-0 pb-[calc(1rem+env(safe-area-inset-bottom))] pt-3">
          <div className="mx-auto mb-4 h-1.5 w-12 rounded-full bg-border" />
          <div className="px-5">
            <SheetHeader className="text-left">
              <SheetTitle>Packages & Stay</SheetTitle>
              <SheetDescription>Choose a section to explore live listings.</SheetDescription>
            </SheetHeader>

            <div className="mt-5 grid gap-3">
              <SheetClose asChild>
                <Link
                  to="/packages"
                  className="rounded-2xl border border-border bg-card px-4 py-4 text-left font-medium hover:bg-secondary"
                >
                  Packages
                </Link>
              </SheetClose>
              <SheetClose asChild>
                <Link
                  to="/home-stay"
                  className="rounded-2xl border border-border bg-card px-4 py-4 text-left font-medium hover:bg-secondary"
                >
                  Home Stay
                </Link>
              </SheetClose>
              <SheetClose asChild>
                <Link
                  to="/resorts"
                  className="rounded-2xl border border-border bg-card px-4 py-4 text-left font-medium hover:bg-secondary"
                >
                  Resorts
                </Link>
              </SheetClose>
            </div>
          </div>
        </SheetContent>
      </Sheet>

      <Sheet open={showMore} onOpenChange={setShowMore}>
        <SheetContent side="bottom" className="rounded-t-3xl border-border px-0 pb-[calc(1rem+env(safe-area-inset-bottom))] pt-3">
          <div className="mx-auto mb-4 h-1.5 w-12 rounded-full bg-border" />
          <div className="px-5">
            <SheetHeader className="text-left">
              <SheetTitle>More Options</SheetTitle>
              <SheetDescription>Quick links for this page.</SheetDescription>
            </SheetHeader>

            <div className="mt-5 grid gap-3">
              <SheetClose asChild>
                <Link to="/packages" className="rounded-2xl border border-border bg-card px-4 py-4 text-left font-medium hover:bg-secondary">Packages</Link>
              </SheetClose>
              <SheetClose asChild>
                <Link to="/home-stay" className="rounded-2xl border border-border bg-card px-4 py-4 text-left font-medium hover:bg-secondary">Home Stay</Link>
              </SheetClose>
              <SheetClose asChild>
                <Link to="/resorts" className="rounded-2xl border border-border bg-card px-4 py-4 text-left font-medium hover:bg-secondary">Resorts</Link>
              </SheetClose>
              <SheetClose asChild>
                <Link to="/flights" className="rounded-2xl border border-border bg-card px-4 py-4 text-left font-medium hover:bg-secondary">Flights</Link>
              </SheetClose>
              <SheetClose asChild>
                <Link to="/contact" className="rounded-2xl border border-border bg-card px-4 py-4 text-left font-medium hover:bg-secondary">Contact</Link>
              </SheetClose>
            </div>
          </div>
        </SheetContent>
      </Sheet>

      {/* Floating WhatsApp */}
      <a
        href={waLink}
        target="_blank"
        rel="noopener"
        aria-label="Chat on WhatsApp"
        className="fixed right-4 bottom-24 md:bottom-6 z-30 h-12 w-12 rounded-full bg-[#25D366] text-white shadow-soft flex items-center justify-center hover:scale-105 transition"
      >
        <svg viewBox="0 0 24 24" className="h-6 w-6" fill="currentColor"><path d="M20.52 3.48A11.93 11.93 0 0 0 12.04 0C5.5 0 .2 5.3.2 11.84c0 2.08.55 4.12 1.6 5.92L0 24l6.4-1.68a11.86 11.86 0 0 0 5.64 1.44h.01c6.54 0 11.84-5.3 11.84-11.84a11.8 11.8 0 0 0-3.37-8.44ZM12.05 21.5h-.01a9.66 9.66 0 0 1-4.93-1.35l-.35-.21-3.8 1 1.02-3.7-.23-.38a9.66 9.66 0 0 1-1.49-5.16c0-5.34 4.35-9.68 9.7-9.68 2.58 0 5.01 1.01 6.84 2.84a9.6 9.6 0 0 1 2.83 6.85c0 5.34-4.35 9.69-9.68 9.69Zm5.31-7.26c-.29-.15-1.72-.85-1.99-.94-.27-.1-.46-.15-.66.14-.2.29-.76.94-.93 1.13-.17.19-.34.21-.63.07-.29-.15-1.22-.45-2.33-1.44-.86-.77-1.44-1.71-1.61-2-.17-.29-.02-.45.13-.59.13-.13.29-.34.43-.51.14-.17.19-.29.29-.48.1-.19.05-.36-.02-.51-.07-.14-.66-1.58-.9-2.17-.24-.57-.48-.5-.66-.51l-.56-.01a1.1 1.1 0 0 0-.79.37c-.27.29-1.04 1.02-1.04 2.48 0 1.46 1.07 2.88 1.22 3.07.15.19 2.11 3.22 5.1 4.51.71.31 1.27.49 1.7.63.71.23 1.36.2 1.87.12.57-.08 1.72-.7 1.96-1.38.24-.68.24-1.26.17-1.38-.07-.12-.27-.19-.56-.34Z"/></svg>
      </a>
    </div>
  );
}
