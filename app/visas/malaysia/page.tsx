import { VISAS } from "@/lib/site-data";
import { SITE_URL } from "@/lib/seo";
import { VisaPage, type VisaPageContent } from "../_visa-page";

const content: VisaPageContent = {
  badge: "Kuala Lumpur and island getaway support",
  intro:
    "Get support for Malaysia tourist travel with eVisa guidance, document checks, and end-to-end help for a smooth leisure trip.",
  serviceSteps: [
    "Tell us your travel plans and preferred travel dates.",
    "We help check your passport and supporting documents.",
    "We guide you through the eVisa or tourist visa steps.",
    "We support you while the application is being processed.",
  ],
  checklist: [
    "Valid passport",
    "Recent passport photos",
    "Travel itinerary",
    "Accommodation details",
    "Bank or supporting documents if required",
  ],
  spotlight: [
    "eVisa application support",
    "Tourist and short-term visit visas",
    "Quick documentation review",
  ],
  faqs: [
    {
      q: "Is Malaysia eVisa support available?",
      a: "Yes, we help with eVisa-related guidance and document preparation.",
    },
    {
      q: "Can I get help if I have never applied before?",
      a: "Yes. We guide first-time travelers through each step in simple terms.",
    },
    {
      q: "Do you also help with Malaysia trip planning?",
      a: "Yes, we can connect your visa support with flights and stays.",
    },
  ],
};

export const metadata = {
  title: "Malaysia Tourist Visa - Adventure Peak Travel",
  description:
    "Get Malaysia tourist visa support with eVisa guidance, document checks, and travel planning assistance.",
  alternates: { canonical: "/visas/malaysia" },
  openGraph: {
    title: "Malaysia Tourist Visa - Adventure Peak Travel",
    description:
      "Get Malaysia tourist visa support with eVisa guidance, document checks, and travel planning assistance.",
    type: "website",
    url: `${SITE_URL}/visas/malaysia`,
  },
  twitter: {
    card: "summary_large_image",
    title: "Malaysia Tourist Visa - Adventure Peak Travel",
    description:
      "Get Malaysia tourist visa support with eVisa guidance, document checks, and travel planning assistance.",
  },
};

export default function MalaysiaVisaPage() {
  const visa = VISAS.find((item) => item.slug === "malaysia");
  if (!visa) return null;
  return <VisaPage visa={visa} content={content} />;
}
