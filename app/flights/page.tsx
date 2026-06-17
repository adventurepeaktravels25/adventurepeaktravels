import { FlightBookingWidget } from "@/components/FlightBookingWidget";
import { SITE_URL } from "@/lib/seo";

export const metadata = {
  title: "Flights - Adventure Peak Travel",
  description: "Book domestic and international flights with Adventure Peak Travel and get quick travel support.",
  alternates: { canonical: "/flights" },
  openGraph: {
    title: "Flights - Adventure Peak Travel",
    description: "Book domestic and international flights with Adventure Peak Travel and get quick travel support.",
    type: "website",
    url: `${SITE_URL}/flights`,
  },
  twitter: {
    card: "summary_large_image",
    title: "Flights - Adventure Peak Travel",
    description: "Book domestic and international flights with Adventure Peak Travel and get quick travel support.",
  },
};

export default function FlightsPage() {
  return (
    <section className="max-w-7xl mx-auto px-6 py-10 md:py-16">
      <h1 className="text-3xl md:text-4xl font-bold mb-6">Flights</h1>
      <FlightBookingWidget />
    </section>
  );
}
