import { VISAS } from "@/lib/site-data";
import { SITE_URL } from "@/lib/seo";
import { VisaPage, type VisaPageContent } from "../_visa-page";

const content: VisaPageContent = {
  badge: "Island holiday visa and travel guidance",
  intro:
    "Enjoy a stress-free Maldives holiday with visa guidance, resort booking support, and travel coordination for a smooth island escape.",
  serviceSteps: [
    "Share your Maldives travel plans with us.",
    "We review visa eligibility and travel documents.",
    "We help organize resort, hotel, and travel details.",
    "We stay connected while you prepare for departure.",
  ],
  checklist: [
    "Valid passport",
    "Return travel details",
    "Accommodation or resort booking",
    "Travel plan and contact details",
    "Any supporting documents needed for the trip",
  ],
  spotlight: [
    "Visa guidance for eligible travelers",
    "Resort and hotel booking assistance",
    "Arrival requirements consultation",
  ],
  faqs: [
    {
      q: "Do I need a separate visa for the Maldives?",
      a: "We can guide you based on your nationality and travel plan so you know what is required.",
    },
    {
      q: "Can you help me arrange a full trip package?",
      a: "Yes, we can combine visa support with stays and travel arrangements.",
    },
    {
      q: "What should I prepare before booking?",
      a: "Passport details, travel dates, and basic trip preferences are a great starting point.",
    },
  ],
};

export const metadata = {
  title: "Maldives Tourist Visa - Adventure Peak Travel",
  description:
    "Plan your Maldives trip with visa guidance, resort support, and travel coordination for a smooth island holiday.",
  alternates: { canonical: "/visas/maldives" },
  openGraph: {
    title: "Maldives Tourist Visa - Adventure Peak Travel",
    description:
      "Plan your Maldives trip with visa guidance, resort support, and travel coordination for a smooth island holiday.",
    type: "website",
    url: `${SITE_URL}/visas/maldives`,
  },
  twitter: {
    card: "summary_large_image",
    title: "Maldives Tourist Visa - Adventure Peak Travel",
    description:
      "Plan your Maldives trip with visa guidance, resort support, and travel coordination for a smooth island holiday.",
  },
};

export default function MaldivesVisaPage() {
  const visa = VISAS.find((item) => item.slug === "maldives");
  if (!visa) return null;
  return <VisaPage visa={visa} content={content} />;
}
