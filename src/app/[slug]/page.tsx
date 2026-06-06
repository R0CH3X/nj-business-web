import { notFound } from "next/navigation"
import type { Metadata } from "next"
import { salons, getSalonBySlug } from "@/data/salons"
import SalonHeroRouter from "@/components/salon/SalonHeroRouter"
import SalonServicesRouter from "@/components/salon/SalonServicesRouter"
import SalonNav from "@/components/salon/SalonNav"
import SalonReviews from "@/components/salon/SalonReviews"
import SalonAbout from "@/components/salon/SalonAbout"
import SalonGallery from "@/components/salon/SalonGallery"
import SalonContact from "@/components/salon/SalonContact"
import SalonFooter from "@/components/salon/SalonFooter"
import MobileCTABar from "@/components/salon/MobileCTABar"

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  return salons.map((s) => ({ slug: s.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const salon = getSalonBySlug(slug)
  if (!salon) return {}

  const title = `${salon.name} | ${salon.city}, NJ`
  const url = `https://nj-business-web.netlify.app/${salon.slug}`

  return {
    title,
    description: salon.seoDescription,
    keywords: salon.keywords,
    openGraph: {
      title,
      description: salon.seoDescription,
      url,
      type: "website",
      locale: "en_US",
    },
    alternates: { canonical: url },
  }
}

export default async function SalonPage({ params }: Props) {
  const { slug } = await params
  const salon = getSalonBySlug(slug)
  if (!salon) notFound()

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BeautySalon",
            name: salon.name,
            address: {
              "@type": "PostalAddress",
              streetAddress: salon.address,
              addressLocality: salon.city,
              addressRegion: salon.state,
              postalCode: salon.zip,
              addressCountry: "US",
            },
            telephone: `+1${salon.phone}`,
            aggregateRating: {
              "@type": "AggregateRating",
              ratingValue: salon.rating,
              reviewCount: salon.reviewCount,
            },
            url: `https://nj-business-web.netlify.app/${salon.slug}`,
            openingHours: salon.hours,
            priceRange: "$$",
          }),
        }}
      />
      <SalonNav salon={salon} />
      <main>
        <SalonHeroRouter salon={salon} />
        <SalonServicesRouter salon={salon} />
        <SalonGallery salon={salon} />
        <SalonReviews salon={salon} />
        <SalonAbout salon={salon} />
        <SalonContact salon={salon} />
      </main>
      <SalonFooter salon={salon} />
      <MobileCTABar salon={salon} />
    </>
  )
}
