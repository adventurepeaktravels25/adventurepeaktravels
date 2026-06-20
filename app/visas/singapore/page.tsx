import { VISAS } from "@/lib/site-data";
import { SITE_URL } from "@/lib/seo";
import { VisaPage, type VisaPageContent } from "../_visa-page";

const content: VisaPageContent = {
  badge: "Leisure and family visit support",
  intro:
    "Travel to Singapore with support for tourist visa applications, documentation, and trip planning for leisure or family visits.",
  serviceSteps: [
    "Send us your travel dates and purpose of visit.",
    "We review your supporting documents and itinerary.",
    "We help you prepare the visa application package.",
    "We assist until your travel plans are ready to go.",
  ],
  checklist: [
    "Passport with valid travel dates",
    "Passport-size photos",
    "Travel itinerary",
    "Accommodation details",
    "Supporting documents for the application",
  ],
  spotlight: [
    "Tourist visa application assistance",
    "Document preparation and verification",
    "Travel itinerary guidance",
  ],
  faqs: [
    {
      q: "Can you help with a Singapore family visit trip?",
      a: "Yes, we can guide you on the application and travel preparation for family visits.",
    },
    {
      q: "How fast can I get support?",
      a: "We usually respond quickly and can start once you share your travel details.",
    },
    {
      q: "Do you provide end-to-end help?",
      a: "Yes, we support the process from document review to travel coordination.",
    },
  ],
};

export const metadata = {
  title: "Singapore Tourist Visa - Adventure Peak Travel",
  description:
    "Get Singapore tourist visa support for leisure or family visits with document preparation and trip guidance.",
  alternates: { canonical: "/visas/singapore" },
  openGraph: {
    title: "Singapore Tourist Visa - Adventure Peak Travel",
    description:
      "Get Singapore tourist visa support for leisure or family visits with document preparation and trip guidance.",
    type: "website",
    url: `${SITE_URL}/visas/singapore`,
  },
  twitter: {
    card: "summary_large_image",
    title: "Singapore Tourist Visa - Adventure Peak Travel",
    description:
      "Get Singapore tourist visa support for leisure or family visits with document preparation and trip guidance.",
  },
};

export default function SingaporeVisaPage() {
  const visa = VISAS.find((item) => item.slug === "singapore");
  if (!visa) return null;
  return <VisaPage visa={visa} content={content} />;
}
