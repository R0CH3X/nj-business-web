import type { Metadata } from "next"
import ClimateProDemoClient from "@/components/climatepro/ClimateProDemoClient"

export const metadata: Metadata = {
  title: "ClimatePro HVAC | Trenton NJ | Heating, Cooling & Air Quality",
  description:
    "ClimatePro HVAC in Trenton, NJ — expert heating, AC repair, duct cleaning, and air quality solutions. NATE-certified technicians. 4.9★ on Google with 220+ reviews. Same-day service available. Serving all of New Jersey.",
  keywords: [
    "hvac trenton nj",
    "ac repair trenton",
    "heating repair new jersey",
    "duct cleaning nj",
    "hvac installation trenton nj",
    "nate certified hvac nj",
    "calefaccion nj",
    "aire acondicionado trenton",
  ],
  openGraph: {
    title: "ClimatePro HVAC | Trenton NJ | NATE-Certified Technicians",
    description:
      "4.9★ rated HVAC company in Trenton, NJ. Expert heating, cooling & air quality solutions. 18+ years serving New Jersey. Same-day service available.",
    url: "https://nj-business-web.netlify.app/climatepro-hvac-demo",
    type: "website",
    locale: "en_US",
  },
  alternates: {
    canonical: "https://nj-business-web.netlify.app/climatepro-hvac-demo",
  },
}

const schema = {
  "@context": "https://schema.org",
  "@type": "HVACBusiness",
  name: "ClimatePro HVAC",
  description:
    "NATE-certified HVAC company serving all of New Jersey. Expert heating, cooling, duct cleaning, and indoor air quality solutions.",
  url: "https://nj-business-web.netlify.app/climatepro-hvac-demo",
  telephone: "+16095550371",
  address: {
    "@type": "PostalAddress",
    streetAddress: "890 Route 33",
    addressLocality: "Trenton",
    addressRegion: "NJ",
    postalCode: "08619",
    addressCountry: "US",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: 40.2170,
    longitude: -74.7429,
  },
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: "4.9",
    reviewCount: "220",
    bestRating: "5",
    worstRating: "1",
  },
  openingHours: "Mo-Sa 07:00-20:00",
  priceRange: "$$",
  areaServed: [
    { "@type": "State", name: "New Jersey" },
  ],
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "HVAC Services",
    itemListElement: [
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "AC Repair & Installation" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Heating Services" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Duct Cleaning" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Thermostat Upgrades" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Indoor Air Quality" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Maintenance Plans" } },
    ],
  },
}

export default function ClimateProDemo() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <ClimateProDemoClient />
    </>
  )
}
