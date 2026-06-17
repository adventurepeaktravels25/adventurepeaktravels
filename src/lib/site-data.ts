import diamond from "@/assets/pkg-diamond.jpg";
import silver from "@/assets/pkg-silver.jpg";
import premium from "@/assets/pkg-premium.jpg";
import homestay from "@/assets/pkg-homestay.jpg";
import budget from "@/assets/pkg-budget.jpg";
import uae from "@/assets/visa-uae.jpg";
import malaysia from "@/assets/visa-malaysia.jpg";
import maldives from "@/assets/visa-maldives.jpg";
import singapore from "@/assets/visa-singapore.jpg";

export const COMPANY = {
  name: "Adventure Peak Travel",
  tagline: "Escape to Lakshadweep",
  description:
    "Lakshadweep is the most beautiful island in India, situated off the coast of Kerala. Trending across social media, it is drawing travelers from around the world to explore its turquoise lagoons, soft beaches, and unforgettable island experiences.",
  email: "adventurepeaktravels25@gmail.com",
  phones: ["+91 94961 40068", "+91 70345 20877"],
  location: "Agatti Island, Agatti, Lakshadweep",
  whatsapp: "919496140068",
};

export type Package = {
  slug: string;
  name: string;
  badge?: string;
  price: number;
  originalPrice: number;
  image: string | { src: string };
  description: string;
  highlights: string[];
};

export const PACKAGES: Package[] = [
  {
    slug: "diamond",
    name: "Lakshadweep Diamond Package",
    badge: "Luxury",
    price: 40999,
    originalPrice: 44199,
    image: diamond,
    description:
      "Experience Lakshadweep in luxury with premium accommodation, island sightseeing, water activities, and curated experiences across the most beautiful beaches and lagoons.",
    highlights: [
      "Premium resort stay",
      "Andham Beach & Lagoon Beach sightseeing",
      "Water sports activities",
      "Island hopping experience",
      "Airport / harbor transfers",
      "Complimentary breakfast",
    ],
  },
  {
    slug: "premium",
    name: "Lakshadweep Premium Package",
    badge: "Honeymoon",
    price: 27499,
    originalPrice: 28499,
    image: premium,
    description:
      "Designed for travelers looking for enhanced comfort and exclusive experiences while exploring the natural beauty of Lakshadweep.",
    highlights: [
      "Premium accommodation",
      "Scenic lagoon visits",
      "Beach leisure activities",
      "Guided sightseeing",
      "Comfortable transportation",
      "Ideal for honeymooners",
    ],
  },
  {
    slug: "silver",
    name: "Lakshadweep Silver Package",
    badge: "Popular",
    price: 24599,
    originalPrice: 26999,
    image: silver,
    description:
      "A balanced package offering comfortable accommodation and essential sightseeing for travelers seeking an affordable Lakshadweep getaway.",
    highlights: [
      "Comfortable hotel stay",
      "Popular beach sightseeing",
      "Local island exploration",
      "Transfer assistance",
      "Budget-friendly option",
      "Suitable for couples & families",
    ],
  },
  {
    slug: "homestay",
    name: "Lakshadweep Beach Home Stay",
    badge: "Authentic",
    price: 19500,
    originalPrice: 22000,
    image: homestay,
    description:
      "Stay close to nature with a beachside homestay experience, offering a peaceful and authentic island lifestyle.",
    highlights: [
      "Beachfront homestay accommodation",
      "Relaxing island atmosphere",
      "Local culture experience",
      "Beach access",
      "Budget-friendly stay",
      "Perfect for nature lovers",
    ],
  },
  {
    slug: "budget",
    name: "Lakshadweep Budget Package",
    badge: "Saver",
    price: 12999,
    originalPrice: 15999,
    image: budget,
    description:
      "An economical package covering essential accommodation and sightseeing, ideal for solo travelers and budget-conscious tourists.",
    highlights: [
      "Affordable accommodation",
      "Basic sightseeing coverage",
      "Local beach visits",
      "Essential travel assistance",
      "Value-for-money package",
      "Suitable for backpackers",
    ],
  },
];

export type StayListing = {
  slug: string;
  name: string;
  type: "Home Stay" | "Resort";
  badge?: string;
  price: number;
  originalPrice: number;
  image: string | { src: string };
  description: string;
  highlights: string[];
};

export const HOME_STAYS: StayListing[] = [
  {
    slug: "beach-homestay",
    name: "Lakshadweep Beach Home Stay",
    type: "Home Stay",
    badge: "Authentic",
    price: 18500,
    originalPrice: 21000,
    image: homestay,
    description:
      "A peaceful beachside home stay experience with local hospitality, easy beach access, and a relaxed island rhythm.",
    highlights: ["Beachfront stay", "Local hospitality", "Quiet island setting", "Ideal for couples and families"],
  },
];

export const RESORTS: StayListing[] = [
  {
    slug: "lagoon-resort",
    name: "Lagoon View Resort",
    type: "Resort",
    badge: "Premium",
    price: 32999,
    originalPrice: 36999,
    image: premium,
    description:
      "A refined resort stay with lagoon views, comfortable rooms, and a polished island holiday atmosphere.",
    highlights: ["Lagoon-facing rooms", "Premium comfort", "Breakfast included", "Great for relaxed vacations"],
  },
  {
    slug: "island-resort",
    name: "Island Escape Resort",
    type: "Resort",
    badge: "Popular",
    price: 28999,
    originalPrice: 31999,
    image: silver,
    description:
      "A well-rounded resort option for travelers who want easy access to sightseeing, comfort, and good value.",
    highlights: ["Comfortable rooms", "Island sightseeing access", "Family-friendly stay", "Value-for-money resort"],
  },
];

export type Visa = {
  slug: string;
  country: string;
  flag: string;
  image: string | { src: string };
  description: string;
  highlights: string[];
};

export const VISAS: Visa[] = [
  {
    slug: "uae",
    country: "UAE Tourist Visa",
    flag: "🇦🇪",
    image: uae,
    description:
      "Explore Dubai, Abu Dhabi, and other UAE destinations with a hassle-free tourist visa service.",
    highlights: [
      "14-day, 30-day & 60-day visa options",
      "Fast processing",
      "Single and multiple-entry visas",
      "Travel insurance assistance",
      "Document verification support",
    ],
  },
  {
    slug: "malaysia",
    country: "Malaysia Tourist Visa",
    flag: "🇲🇾",
    image: malaysia,
    description:
      "Visit Malaysia's vibrant cities, beaches, and cultural attractions with professional visa assistance.",
    highlights: [
      "eVisa application support",
      "Quick documentation review",
      "Tourist & short-term visit visas",
      "Application status tracking",
      "End-to-end guidance",
    ],
  },
  {
    slug: "maldives",
    country: "Maldives Tourist Visa",
    flag: "🇲🇻",
    image: maldives,
    description:
      "Enjoy a seamless trip to the Maldives with visa and travel assistance for your tropical getaway.",
    highlights: [
      "Visa guidance for eligible travelers",
      "Resort and hotel booking assistance",
      "Travel document support",
      "Arrival requirements consultation",
      "Holiday package integration",
    ],
  },
  {
    slug: "singapore",
    country: "Singapore Tourist Visa",
    flag: "🇸🇬",
    image: singapore,
    description:
      "Travel to Singapore for leisure, sightseeing, or family visits with expert visa processing support.",
    highlights: [
      "Tourist visa application assistance",
      "Document preparation & verification",
      "Fast processing support",
      "Travel itinerary guidance",
      "Professional consultation throughout",
    ],
  },
];

export const formatINR = (n: number) =>
  new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 }).format(n);
