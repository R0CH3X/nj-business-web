import type { Metadata } from "next"
import PinnacleDemoClient from "@/components/pinnacle/PinnacleDemoClient"

export const metadata: Metadata = {
  title: "Pinnacle Plumbing Sewer & Drain | Ramsey NJ | 24/7 Emergency Plumber",
  description:
    "Pinnacle Plumbing Sewer & Drain in Ramsey, NJ — 24/7 emergency plumbing, drain cleaning, sewer repair & water heater installation. Licensed & insured. 5.0★ on Google with 142 reviews. Serving Bergen County, Passaic County & Morris County.",
  keywords: [
    "plumber ramsey nj",
    "emergency plumber bergen county",
    "drain cleaning nj",
    "sewer repair nj",
    "water heater installation ramsey",
    "24/7 plumber nj",
    "plomero bergen county",
    "plomero ramsey nj",
  ],
  openGraph: {
    title: "Pinnacle Plumbing Sewer & Drain | Ramsey NJ | 24/7 Emergency",
    description:
      "24/7 emergency plumber in Bergen County, NJ. 5.0★ on Google with 142 reviews. Drain cleaning, sewer repair, water heaters.",
    url: "https://pinnacle-plumbing-demo.netlify.app",
    type: "website",
    locale: "en_US",
  },
  alternates: {
    canonical: "https://pinnacle-plumbing-demo.netlify.app",
  },
}

const schema = {
  "@context": "https://schema.org",
  "@type": "Plumber",
  name: "Pinnacle Plumbing Sewer & Drain",
  description:
    "24/7 emergency plumber serving Bergen County, Passaic County, and Morris County in North Jersey.",
  url: "https://pinnacle-plumbing-demo.netlify.app",
  telephone: "+12014194016",
  address: {
    "@type": "PostalAddress",
    streetAddress: "1 Bergen County Rd",
    addressLocality: "Ramsey",
    addressRegion: "NJ",
    postalCode: "07446",
    addressCountry: "US",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: 41.0584,
    longitude: -74.1432,
  },
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: "5.0",
    reviewCount: "142",
    bestRating: "5",
    worstRating: "1",
  },
  openingHours: "Mo-Su 00:00-23:59",
  priceRange: "$$",
  areaServed: [
    { "@type": "County", name: "Bergen County", containedIn: "New Jersey" },
    { "@type": "County", name: "Passaic County", containedIn: "New Jersey" },
    { "@type": "County", name: "Morris County", containedIn: "New Jersey" },
  ],
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Plumbing Services",
    itemListElement: [
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Emergency Plumbing" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Sewer Repair & Replacement" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Drain Cleaning" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Water Heater Installation" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Pipe Repair & Repiping" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Leak Detection" } },
    ],
  },
}

export default function PinnacleDemo() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <PinnacleDemoClient />
    </>
  )
}
