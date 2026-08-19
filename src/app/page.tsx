import Link from "next/link"
import type { Metadata } from "next"
import { salons } from "@/data/salons"

const SITE_URL = "https://nj-salones.netlify.app"
const TITLE = "NJ Beauty Salons — West New York, Guttenberg, North Bergen & Union City"
const DESCRIPTION = "Find the best beauty salons in Hudson County, NJ. Expert hair, nails & full-service salons in West New York, Guttenberg, North Bergen, and Union City."

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: SITE_URL },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: SITE_URL,
    type: "website",
    locale: "en_US",
  },
}

const cities = ["West New York", "Guttenberg", "North Bergen", "Union City"]

export default function DirectoryPage() {
  return (
    <main className="min-h-screen">
      {/* Hero */}
      <section className="pt-24 pb-16 px-6 md:px-10 max-w-7xl mx-auto text-center">
        <p className="text-xs font-medium tracking-widest uppercase text-[#6B6560] mb-6"
          style={{ fontFamily: "var(--font-dm-sans)" }}>
          Hudson County, New Jersey
        </p>
        <h1 className="headline-xl text-[#1A1612] mb-6" style={{ fontFamily: "var(--font-playfair)" }}>
          Your neighborhood<br />beauty salons.
        </h1>
        <p className="text-base font-light text-[#6B6560] max-w-lg mx-auto"
          style={{ fontFamily: "var(--font-dm-sans)" }}>
          12 trusted salons in West New York, Guttenberg, North Bergen & Union City — hair, nails, and full-service.
        </p>
      </section>

      {/* Salon grid by city */}
      {cities.map((city) => {
        const citySalons = salons.filter((s) => s.city === city)
        if (!citySalons.length) return null
        return (
          <section key={city} className="py-12 px-6 md:px-10 max-w-7xl mx-auto">
            <h2 className="text-sm font-medium tracking-widest uppercase text-[#6B6560] mb-8 pb-4 border-b border-[#E2DDD9]"
              style={{ fontFamily: "var(--font-dm-sans)" }}>
              {city}, NJ
            </h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {citySalons.map((salon) => (
                <Link key={salon.slug} href={`/${salon.slug}`}
                  className="group p-6 bg-[#F0ECE8] hover:bg-[#E8E3DE] transition-colors"
                  style={{ borderRadius: "2px" }}>
                  <div className="flex items-start justify-between mb-4">
                    <div className="w-2 h-2 rounded-full mt-1.5" style={{ backgroundColor: salon.accentColor }} />
                    <span className="text-xs font-light text-[#6B6560]" style={{ fontFamily: "var(--font-dm-sans)" }}>
                      ⭐ {salon.rating} · {salon.reviewCount}
                    </span>
                  </div>
                  <h3 className="text-base font-bold mb-1 group-hover:underline"
                    style={{ fontFamily: "var(--font-playfair)", textDecorationColor: salon.accentColor }}>
                    {salon.name}
                  </h3>
                  <p className="text-sm font-light text-[#6B6560] mb-3" style={{ fontFamily: "var(--font-dm-sans)" }}>
                    {salon.address}
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {salon.badges.slice(0, 2).map((b) => (
                      <span key={b} className="text-xs px-2 py-0.5 font-light text-[#6B6560] border border-[#E2DDD9]"
                        style={{ fontFamily: "var(--font-dm-sans)", borderRadius: "2px" }}>
                        {b}
                      </span>
                    ))}
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )
      })}

      <footer className="mt-16 py-10 px-6 md:px-10 border-t border-[#E2DDD9] text-center">
        <p className="text-xs font-light text-[#6B6560]" style={{ fontFamily: "var(--font-dm-sans)" }}>
          © {new Date().getFullYear()} NJ Business Web — njbusinessweb.com
        </p>
      </footer>
    </main>
  )
}
