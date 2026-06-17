import { SITE_URL } from "@/lib/seo";

export const metadata = {
  title: "Visas - Adventure Peak Travel",
  description: "Get tourist visa support for UAE, Malaysia, Maldives, Singapore, and more with Adventure Peak Travel.",
  alternates: { canonical: "/visas" },
  openGraph: {
    title: "Visas - Adventure Peak Travel",
    description: "Get tourist visa support for UAE, Malaysia, Maldives, Singapore, and more with Adventure Peak Travel.",
    type: "website",
    url: `${SITE_URL}/visas`,
  },
  twitter: {
    card: "summary_large_image",
    title: "Visas - Adventure Peak Travel",
    description: "Get tourist visa support for UAE, Malaysia, Maldives, Singapore, and more with Adventure Peak Travel.",
  },
};
export default function VisasPage() {
  return <section className="max-w-4xl mx-auto px-6 py-16"><h1 className="text-3xl font-bold">Visas</h1></section>;
}
