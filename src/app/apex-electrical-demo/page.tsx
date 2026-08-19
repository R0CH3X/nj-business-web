import type { Metadata } from "next"
import ApexElectricalClient from "@/components/apex/ApexElectricalClient"

export const metadata: Metadata = {
  title: "Apex Electrical Contractors | North Jersey | Licensed Electricians",
  description:
    "Apex Electrical Contractors in North Jersey — panel upgrades, EV charger installation, 24/7 emergency electrical, rewiring, and code compliance inspections. 5.0★ on Google with 80+ reviews. Serving Bergen, Hudson & Passaic County.",
  keywords: [
    "electrician north jersey",
    "panel upgrade bergen county",
    "ev charger installation nj",
    "emergency electrician nj",
    "electrician bergen county",
    "rewiring hudson county nj",
    "electricista north jersey",
    "servicio electrico nj",
  ],
  openGraph: {
    title: "Apex Electrical Contractors | North Jersey | 5.0★ Licensed Electricians",
    description:
      "5.0★ rated electrical contractors in North Jersey. Panel upgrades, EV chargers, 24/7 emergency. Serving Bergen, Hudson & Passaic County.",
    url: "https://nj-salones.netlify.app/apex-electrical-demo",
    type: "website",
    locale: "en_US",
  },
  alternates: {
    canonical: "https://nj-salones.netlify.app/apex-electrical-demo",
  },
}

const schema = {
  "@context": "https://schema.org",
  "@type": "Electrician",
  name: "Apex Electrical Contractors",
  description:
    "Licensed and fully insured electrical contractors serving Bergen, Hudson, and Passaic County in North Jersey.",
  url: "https://nj-salones.netlify.app/apex-electrical-demo",
  telephone: "+12015550100",
  address: {
    "@type": "PostalAddress",
    addressRegion: "NJ",
    addressCountry: "US",
  },
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: "5.0",
    reviewCount: "80",
    bestRating: "5",
    worstRating: "1",
  },
  openingHours: "Mo-Fr 07:00-19:00",
  priceRange: "$$",
  areaServed: [
    { "@type": "County", name: "Bergen County", containedIn: "New Jersey" },
    { "@type": "County", name: "Hudson County", containedIn: "New Jersey" },
    { "@type": "County", name: "Passaic County", containedIn: "New Jersey" },
  ],
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Electrical Services",
    itemListElement: [
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Panel Upgrades" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "EV Charger Installation" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Emergency Electrical 24/7" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Lighting Installation" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Rewiring" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Code Compliance Inspections" } },
    ],
  },
}

export default function ApexElectricalDemo() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <ApexElectricalClient />
    </>
  )
}
