 "use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";
import { useEffect, useState } from "react";
import { Building2, FileCheck, Home, House, Mail, MapPin, Menu, Package, Phone, Plane, Sparkles, X } from "lucide-react";
import logo from "@/assets/logo.png";
import { COMPANY } from "@/lib/site-data";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetClose, SheetTrigger } from "@/components/ui/sheet";

const NAV = [
  { to: "/", label: "Home", icon: Home },
  { to: "/about", label: "About Us", icon: Sparkles },
  { to: "/explore-lakshadweep", label: "Explore Lakshadweep", icon: Sparkles },
  { to: "/packages", label: "Packages", icon: Package },
  { to: "/home-stay", label: "Home Stay", icon: House },
  { to: "/resorts", label: "Resorts", icon: Building2 },
  { to: "/flights", label: "Flights", icon: Plane },
  { to: "/visas", label: "Visas", icon: FileCheck },
  { to: "/contact", label: "Contact", icon: Phone },
] as const;

export function SiteLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const [showPackages, setShowPackages] = useState(false);
  const [detailTitle, setDetailTitle] = useState("");
  const isActive = (to: string) => pathname === to || (to !== "/" && pathname.startsWith(`${to}/`));
  const isDetailPage = /^\/(packages|home-stay|resorts)\/Details\/[^/]+\/?$/.test(pathname);

  useEffect(() => {
    const handler = (event: Event) => {
      const customEvent = event as CustomEvent<{ title?: string }>;
      setDetailTitle(customEvent.detail?.title ?? "");
    };
    window.addEventListener("detail-page-title", handler as EventListener);
    return () => window.removeEventListener("detail-page-title", handler as EventListener);
  }, []);

  useEffect(() => {
    if (!isDetailPage) setDetailTitle("");
  }, [isDetailPage]);
  return (
    <div className="min-h-screen flex flex-col bg-background">
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

      <header className="sticky top-0 z-40 backdrop-blur-md bg-background/85 border-b border-border">
        <div className="max-w-7xl mx-auto px-4 md:px-6 h-16 flex items-center justify-between">
          {isDetailPage ? (
            <div className="flex items-center gap-3 md:gap-2">
              <Link href={pathname.startsWith("/packages/Details") ? "/packages" : pathname.startsWith("/home-stay/Details") ? "/home-stay" : "/resorts"} className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-border bg-card text-foreground md:hidden">
                <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M15 18l-6-6 6-6" />
                </svg>
              </Link>
              <div className="min-w-0 md:hidden">
                <div className="max-w-[16rem] text-sm font-semibold leading-tight text-foreground">
                  {detailTitle || "Details"}
                </div>
              </div>
              <Link href="/" className="hidden md:flex items-center gap-2">
                <img src={(logo as unknown as { src: string }).src} alt="Adventure Peak Travel logo" width={40} height={40} className="h-10 w-10" />
                <div className="leading-tight">
                  <div className="font-display font-bold text-base text-foreground">Adventure Peak</div>
                  <div className="text-[10px] text-muted-foreground tracking-widest uppercase">Travel</div>
                </div>
              </Link>
            </div>
          ) : (
            <Link href="/" className="flex items-center gap-2">
              <img src={(logo as unknown as { src: string }).src} alt="Adventure Peak Travel logo" width={40} height={40} className="h-10 w-10" />
              <div className="leading-tight">
                <div className="font-display font-bold text-base text-foreground">Adventure Peak</div>
                <div className="text-[10px] text-muted-foreground tracking-widest uppercase">Travel</div>
              </div>
            </Link>
          )}

          <nav className="hidden md:flex items-center gap-1">
            {NAV.map(n => (
              <Link
                key={n.to}
                href={n.to}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors hover:bg-secondary/60 ${
                  isActive(n.to) ? "bg-secondary text-primary" : ""
                }`}
              >
                {n.label}
              </Link>
            ))}
            <a href={`https://wa.me/${COMPANY.whatsapp}`} target="_blank" rel="noopener" className="ml-2 px-4 py-2 rounded-lg text-sm font-semibold bg-gradient-sunset text-accent-foreground shadow-soft hover:opacity-95 transition">
              Book on WhatsApp
            </a>
          </nav>

          {!isDetailPage && (
            <details className="relative md:hidden group">
              <summary className="list-none cursor-pointer p-2 rounded-lg hover:bg-secondary">
                <Menu className="h-5 w-5 group-open:hidden" />
                <X className="hidden h-5 w-5 group-open:block" />
              </summary>
              <div className="absolute right-0 top-full mt-2 w-56 rounded-2xl border border-border bg-background p-2 shadow-soft">
                {NAV.map(n => (
                  <Link
                    key={n.to}
                    href={n.to}
                    className={`block rounded-xl px-3 py-2.5 text-sm font-medium hover:bg-secondary ${
                      isActive(n.to) ? "bg-secondary text-primary" : ""
                    }`}
                  >
                    {n.label}
                  </Link>
                ))}
              </div>
            </details>
          )}
        </div>
      </header>

      <main className="flex-1 pb-20 md:pb-0">{children}</main>

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
                <li key={n.to}><Link href={n.to} className="hover:text-primary-foreground hover:underline">{n.label}</Link></li>
              ))}
              <li><Link href="/about" className="hover:underline">About Us</Link></li>
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

      <Sheet open={showPackages} onOpenChange={setShowPackages}>
        {isDetailPage ? (
          <nav className="md:hidden fixed bottom-0 inset-x-0 z-40 bg-background/95 backdrop-blur border-t border-border safe-bottom">
            <div className="grid grid-cols-2 gap-3 px-4 py-3">
              <button
                type="button"
                onClick={() => setShowPackages(true)}
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-border bg-card px-4 py-3 text-sm font-semibold text-foreground shadow-sm"
              >
                <Package className="h-4 w-4" />
                More
              </button>
              <a
                href={`https://wa.me/${COMPANY.whatsapp}`}
                target="_blank"
                rel="noopener"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-4 py-3 text-sm font-semibold text-primary-foreground shadow-soft"
              >
                <Phone className="h-4 w-4" />
                Book Now
              </a>
            </div>
          </nav>
        ) : (
          <nav className="md:hidden fixed bottom-0 inset-x-0 z-40 bg-background/95 backdrop-blur border-t border-border safe-bottom">
            <div className="grid grid-cols-4">
              {NAV.slice(0, 1).map((n) => {
                const Icon = n.icon;
                return (
                  <Link
                    key={n.to}
                    href={n.to}
                    className={`flex flex-col items-center justify-center py-2.5 gap-0.5 text-[10px] font-medium ${
                      isActive(n.to) ? "text-primary bg-secondary" : "text-muted-foreground"
                    }`}
                  >
                    <Icon className="h-5 w-5" />
                    {n.label}
                  </Link>
                );
              })}
              <SheetTrigger asChild>
                <button
                  type="button"
                  className={`flex flex-col items-center justify-center py-2.5 gap-0.5 text-[10px] font-medium touch-manipulation ${
                    showPackages ? "text-primary bg-secondary" : "text-muted-foreground"
                  }`}
                >
                  <Package className="h-5 w-5" />
                  Packages & Stay
                </button>
              </SheetTrigger>
              <Link
                href="/visas"
                className={`flex flex-col items-center justify-center py-2.5 gap-0.5 text-[10px] font-medium ${
                  isActive("/visas") ? "text-primary bg-secondary" : "text-muted-foreground"
                }`}
              >
                <FileCheck className="h-5 w-5" />
                Visas
              </Link>
              <Link
                href="/contact"
                className={`flex flex-col items-center justify-center py-2.5 gap-0.5 text-[10px] font-medium ${
                  isActive("/contact") ? "text-primary bg-secondary" : "text-muted-foreground"
                }`}
              >
                <Phone className="h-5 w-5" />
                Contact
              </Link>
            </div>
          </nav>
        )}

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
              <SheetClose asChild>
                <Link href="/packages" className="rounded-2xl border border-border bg-card px-4 py-4 text-left font-medium hover:bg-secondary">
                  Packages
                </Link>
              </SheetClose>
              <SheetClose asChild>
                <Link href="/home-stay" className="rounded-2xl border border-border bg-card px-4 py-4 text-left font-medium hover:bg-secondary">
                  Home Stay
                </Link>
              </SheetClose>
              <SheetClose asChild>
                <Link href="/resorts" className="rounded-2xl border border-border bg-card px-4 py-4 text-left font-medium hover:bg-secondary">
                  Resorts
                </Link>
              </SheetClose>
              <SheetClose asChild>
                <Link href="/flights" className="rounded-2xl border border-border bg-card px-4 py-4 text-left font-medium hover:bg-secondary">
                  Flights
                </Link>
              </SheetClose>
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
}
