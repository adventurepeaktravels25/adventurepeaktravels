import Link from "next/link";
import { ArrowLeft, CalendarDays, Check, Clock3, MapPin, Minus, Plus } from "lucide-react";
import { fetchCatalogueItems, formatCurrency, type CatalogueItem } from "@/lib/api/catalogue";
import { SITE_URL } from "@/lib/seo";
import { StructuredData } from "@/components/StructuredData";

export const dynamic = "force-dynamic";
export const revalidate = 0;

type ResortDetails = CatalogueItem & {
  features?: string[];
  category?: { name?: string };
};

async function loadResort(slug: string): Promise<ResortDetails | null> {
  const base = "https://backbin.colaber.in/business_website/catalogue/service";
  const subdomain = "https://travel.app.colaber.in";
  const url = `${base}/get_catalogue_service_details_for_public?subdomain=${encodeURIComponent(subdomain)}&serviceSlug=${encodeURIComponent(slug)}`;

  try {
    const response = await fetch(url, { headers: { Accept: "application/json" }, cache: "no-store" });
    if (response.ok) {
      const json = (await response.json()) as { data?: ResortDetails };
      if (json.data?.slug) return json.data;
    }
  } catch {
    // fall through
  }

  const list = await fetchCatalogueItems({ slug: "resorts", page: 1, limit: 50, search: "" });
  return (list.find(entry => entry.slug === slug) as ResortDetails | undefined) ?? null;
}

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const { slug } = await params;
  const item = await loadResort(slug);
  return {
    title: `${item?.name ?? "Resort"} - Adventure Peak Travel`,
    description: item?.description ?? "Resort details",
  };
}

export default async function ResortDetailsPage({ params }: { params: { slug: string } }) {
  const { slug } = await params;
  const item = await loadResort(slug);

  if (!item) {
    return (
      <section className="max-w-3xl mx-auto px-6 py-20 text-center">
        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-primary">Resort unavailable</p>
        <h1 className="mt-4 text-3xl md:text-4xl font-bold">We could not load this resort right now.</h1>
        <p className="mt-3 text-muted-foreground">Try going back to the resorts list and opening another stay.</p>
        <Link href="/resorts" className="mt-8 inline-flex items-center gap-2 rounded-lg bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground hover:bg-primary/90">
          <ArrowLeft className="h-4 w-4" />
          Back to resorts
        </Link>
      </section>
    );
  }

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
      { "@type": "ListItem", position: 2, name: "Resorts", item: `${SITE_URL}/resorts` },
      { "@type": "ListItem", position: 3, name: item?.name ?? slug, item: `${SITE_URL}/resorts/Details/${slug}` },
    ],
  };

  const lodgingSchema = {
    "@context": "https://schema.org",
    "@type": "LodgingBusiness",
    name: item.name,
    description: item.description,
    image: item.images?.[0] ? [item.images[0]] : undefined,
    url: `${SITE_URL}/resorts/Details/${slug}`,
  };

  return (
    <>
      <StructuredData data={breadcrumbSchema} />
      <StructuredData data={lodgingSchema} />
      <ResortDetailsView item={item} />
    </>
  );
}

function ResortDetailsView({ item }: { item: ResortDetails }) {
  const tier = item.packages?.[0];
  const cover = item.images?.[0];
  const whatsappMessage = encodeURIComponent(
    `Hi! I'm interested in the ${item.name} (${formatCurrency(tier?.price ?? 0)}). Please share stay options and booking details.`,
  );
  const waLink = `https://wa.me/919496140068?text=${whatsappMessage}`;
  const features = item.features ?? [];

  return (
    <>
      <section className="max-w-7xl mx-auto px-4 sm:px-6 pt-6 md:pt-8">
        <nav className="mb-4 flex flex-wrap items-center gap-2 text-xs sm:text-sm text-muted-foreground">
          <Link href="/" className="hover:text-primary">Home</Link>
          <span>/</span>
          <Link href="/resorts" className="hover:text-primary">Resorts</Link>
          <span>/</span>
          <span className="text-foreground line-clamp-1">{item.name}</span>
        </nav>
        <Link href="/resorts" className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-primary">
          <ArrowLeft className="h-4 w-4" />
          Back to resorts
        </Link>
        <h1 className="mt-4 text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight">{item.name}</h1>
        <div className="mt-3 flex flex-wrap gap-2">
          {tier?.duration && <span className="inline-flex items-center rounded-full bg-secondary/70 px-3 py-1 text-xs font-medium text-foreground">{tier.duration}</span>}
          {item.category?.name && <span className="inline-flex items-center rounded-full bg-secondary/70 px-3 py-1 text-xs font-medium text-foreground">{item.category.name}</span>}
          {item.location && <span className="inline-flex items-center gap-1 rounded-full bg-secondary/70 px-3 py-1 text-xs font-medium text-foreground"><MapPin className="h-3.5 w-3.5" />{item.location}</span>}
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 pb-12 md:pb-16">
        <div className="grid lg:grid-cols-[1.35fr_0.95fr] gap-6 lg:gap-8 items-start">
          <div className="space-y-4">
            <div className="overflow-hidden rounded-2xl sm:rounded-3xl shadow-card bg-card">
              {cover ? (
                <img src={cover} alt={item.name} width={1280} height={960} className="aspect-[16/10] w-full object-cover" />
              ) : (
                <div className="aspect-[16/10] w-full bg-secondary" />
              )}
            </div>

            <div className="rounded-2xl border border-border bg-card p-5 md:p-6 shadow-card">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h2 className="text-2xl font-bold">Resort Description</h2>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground shrink-0">
                  <Clock3 className="h-4 w-4" />
                  <span>{tier?.duration ?? "Stay"}</span>
                </div>
              </div>
              <p className="mt-4 whitespace-pre-line text-sm md:text-base text-muted-foreground leading-relaxed">{item.description}</p>
            </div>

            {features.length > 0 && (
              <div className="rounded-2xl border border-border bg-card p-5 md:p-6 shadow-card">
                <h2 className="text-2xl font-bold">Features</h2>
                <ul className="mt-4 grid sm:grid-cols-2 gap-3">
                  {features.map(feature => (
                    <li key={feature} className="flex gap-3 rounded-xl bg-secondary/50 p-4">
                      <Check className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
                      <span className="text-sm leading-relaxed">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          <aside className="lg:sticky lg:top-24">
            <div className="rounded-3xl border border-border bg-card p-5 md:p-6 shadow-card">
              <h2 className="text-xl font-bold">Select Your Stay</h2>
              <div className="mt-4 rounded-2xl border border-primary/40 bg-primary/5 p-4">
                <p className="font-semibold">{item.name}</p>
                <p className="mt-1 text-sm text-muted-foreground">{tier?.duration ?? "Stay"}</p>
              </div>

              <div className="mt-5 grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm font-medium text-muted-foreground">Adults</label>
                  <div className="mt-2 flex items-center justify-between rounded-xl border border-border px-3 py-2">
                    <Minus className="h-4 w-4 text-muted-foreground" />
                    <span className="font-semibold">2</span>
                    <Plus className="h-4 w-4 text-muted-foreground" />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-muted-foreground">Children</label>
                  <div className="mt-2 flex items-center justify-between rounded-xl border border-border px-3 py-2">
                    <Minus className="h-4 w-4 text-muted-foreground" />
                    <span className="font-semibold">0</span>
                    <Plus className="h-4 w-4 text-muted-foreground" />
                  </div>
                </div>
              </div>

              <div className="mt-5">
                <label className="block text-sm font-medium text-muted-foreground">Start Date</label>
                <div className="mt-2 flex items-center gap-2 rounded-xl border border-border px-3 py-3 text-sm text-muted-foreground">
                  <CalendarDays className="h-4 w-4" />
                  <span>June 18th, 2026</span>
                </div>
              </div>

              <div className="mt-6 rounded-2xl border-t border-border pt-5">
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <p className="text-sm font-semibold text-muted-foreground">Price</p>
                    <p className="text-xs text-muted-foreground">Contact us for customized pricing based on your preferences</p>
                  </div>
                  <span className="text-sm font-semibold text-primary">{tier ? formatCurrency(tier.price) : "Contact for Pricing"}</span>
                </div>
                <div className="mt-4 space-y-3">
                  <a href={waLink} target="_blank" rel="noopener" className="inline-flex w-full items-center justify-center rounded-xl bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground hover:bg-primary/90">
                    Book Now
                  </a>
                  <Link href="/contact" className="inline-flex w-full items-center justify-center rounded-xl border border-border px-5 py-3 text-sm font-medium hover:bg-secondary">
                    Request Custom Stay
                  </Link>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </section>
    </>
  );
}
