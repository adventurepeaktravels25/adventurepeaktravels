import type { Metadata } from "next";
import type { ReactNode } from "react";
import { SiteLayout } from "../components/NextSiteLayout";
import "./globals.css";
import { SITE_URL, siteMetadata } from "@/lib/seo";
import { StructuredData } from "@/components/StructuredData";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: siteMetadata.title,
    template: "%s | Adventure Peak Travel",
  },
  description: siteMetadata.description,
  keywords: siteMetadata.keywords,
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: siteMetadata.title,
    description: siteMetadata.description,
    siteName: "Adventure Peak Travel",
    type: "website",
    url: SITE_URL,
  },
  twitter: {
    card: "summary_large_image",
    title: siteMetadata.title,
    description: siteMetadata.description,
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "TravelAgency",
    name: "Adventure Peak Travel",
    url: SITE_URL,
    description: siteMetadata.description,
    telephone: "+91 94961 40068",
    email: "adventurepeaktravels25@gmail.com",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Agatti Island, Agatti",
      addressLocality: "Lakshadweep",
      addressCountry: "IN",
    },
    areaServed: "Lakshadweep",
    sameAs: [],
  };

  return (
    <html lang="en">
      <body suppressHydrationWarning>
        <StructuredData data={organizationSchema} />
        <SiteLayout>{children}</SiteLayout>
      </body>
    </html>
  );
}
