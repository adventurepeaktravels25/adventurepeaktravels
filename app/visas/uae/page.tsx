import { VISAS } from "@/lib/site-data";
import { SITE_URL } from "@/lib/seo";
import { VisaPage, type VisaPageContent } from "../_visa-page";

const content: VisaPageContent = {
  badge: "Dubai and Abu Dhabi travel support",
  intro:
    "Plan your UAE trip with support for tourist visa paperwork, document review, and travel coordination for Dubai, Abu Dhabi, and beyond.",
  serviceSteps: [
    "Share your trip dates and passport details.",
    "We review the visa category and required paperwork.",
    "We help prepare and organize the application set.",
    "We keep you updated until the process is complete.",
  ],
  checklist: [
    "Passport with sufficient validity",
    "Photographs in the required format",
    "Confirmed travel itinerary",
    "Hotel or stay details",
    "Supporting identity and financial documents",
  ],
  spotlight: [
    "14, 30, and 60-day options",
    "Single and multiple-entry support",
    "Travel insurance assistance",
  ],
  faqs: [
    {
      q: "Which UAE visa option should I choose?",
      a: "We help you compare the common tourist visa durations based on your itinerary and travel purpose.",
    },
    {
      q: "Do you help with document verification?",
      a: "Yes, we check your documents before submission so you can avoid avoidable delays.",
    },
    {
      q: "Can you bundle this with flights or stay bookings?",
      a: "Absolutely. We can align your visa help with flights, stays, and holiday packages.",
    },
  ],
};

export const metadata = {
  title: "UAE Tourist Visa - Adventure Peak Travel",
  description:
    "Get UAE tourist visa support for Dubai, Abu Dhabi, and other destinations with document review and travel guidance.",
  alternates: { canonical: "/visas/uae" },
  openGraph: {
    title: "UAE Tourist Visa - Adventure Peak Travel",
    description:
      "Get UAE tourist visa support for Dubai, Abu Dhabi, and other destinations with document review and travel guidance.",
    type: "website",
    url: `${SITE_URL}/visas/uae`,
  },
  twitter: {
    card: "summary_large_image",
    title: "UAE Tourist Visa - Adventure Peak Travel",
    description:
      "Get UAE tourist visa support for Dubai, Abu Dhabi, and other destinations with document review and travel guidance.",
  },
};

export default function UaeVisaPage() {
  const visa = VISAS.find((item) => item.slug === "uae");
  if (!visa) return null;
  return <VisaPage visa={visa} content={content} />;
}
