"use client"

import Link from "next/link"
import type { Salon } from "@/data/salons"
import { useLanguage, pick } from "@/contexts/LanguageContext"

interface Props { salon: Salon }

export default function SalonFooter({ salon }: Props) {
  const { t, lang } = useLanguage()

  const footerLinks = [
    { label: t.navServices, href: "#services" },
    { label: t.navGallery, href: "#gallery" },
    { label: t.navReviews, href: "#reviews" },
    { label: t.navAbout, href: "#about" },
    { label: t.navContact, href: "#contact" },
  ]

  return (
    <footer className="bg-[#1A1612] text-[#FAF7F4] pt-16 pb-24 md:py-16 px-6 md:px-10">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-3 gap-12 pb-12 border-b border-[#2A2520]">
          {/* Brand */}
          <div>
            <p className="font-bold text-xl mb-3" style={{ fontFamily: "var(--font-playfair)" }}>
              {salon.name}
            </p>
            <p key={lang} className="lang-fade-in text-sm font-light text-[#A09A95] leading-relaxed italic mb-6"
              style={{ fontFamily: "var(--font-cormorant)", fontSize: "1rem" }}>
              {pick(lang, salon.tagline, salon.taglineEs)}
            </p>
            <div className="flex gap-3">
              {salon.instagram && (
                <a href={`https://instagram.com/${salon.instagram}`} target="_blank" rel="noopener noreferrer"
                  className="text-[#A09A95] hover:text-[#FAF7F4] transition-colors">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <rect x="2" y="2" width="20" height="20" rx="5" />
                    <circle cx="12" cy="12" r="4" />
                    <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
                  </svg>
                </a>
              )}
              {salon.facebook && (
                <a href={salon.facebook} target="_blank" rel="noopener noreferrer"
                  className="text-[#A09A95] hover:text-[#FAF7F4] transition-colors">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" />
                  </svg>
                </a>
              )}
            </div>
          </div>

          {/* Links */}
          <div>
            <p className="text-xs font-medium tracking-widest uppercase text-[#A09A95] mb-5"
              style={{ fontFamily: "var(--font-dm-sans)" }}>
              {t.footerNavigate}
            </p>
            <ul className="space-y-3">
              {footerLinks.map((link) => (
                <li key={link.href} className="relative group inline-block">
                  <a href={link.href}
                    className="text-sm font-light text-[#A09A95] hover:text-[#FAF7F4] transition-colors duration-200"
                    style={{ fontFamily: "var(--font-dm-sans)" }}>
                    {link.label}
                  </a>
                  <span
                    className="absolute -bottom-0.5 left-0 h-px w-0 transition-all duration-300 ease-out group-hover:w-full"
                    style={{ backgroundColor: salon.accentColor }}
                    aria-hidden
                  />
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <p className="text-xs font-medium tracking-widest uppercase text-[#A09A95] mb-5"
              style={{ fontFamily: "var(--font-dm-sans)" }}>
              {t.footerVisitUs}
            </p>
            <address className="not-italic space-y-2 text-sm font-light text-[#A09A95]"
              style={{ fontFamily: "var(--font-dm-sans)" }}>
              <p>{salon.address}</p>
              <p>{salon.city}, {salon.state} {salon.zip}</p>
              <a href={`tel:+1${salon.phone}`}
                className="block hover:text-[#FAF7F4] transition-colors mt-3"
                style={{ color: `color-mix(in srgb, ${salon.accentColor} 55%, white)` }}>
                {salon.phoneFormatted}
              </a>
              <p className="mt-2">{salon.hours}</p>
            </address>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs font-light text-[#A09A95]" style={{ fontFamily: "var(--font-dm-sans)" }}>
            © {new Date().getFullYear()} {salon.name}. {salon.city}, NJ.
          </p>
          <p className="text-xs font-light text-[#A09A95]" style={{ fontFamily: "var(--font-dm-sans)" }}>
            {t.footerPartOf}{" "}
            <Link href="/" className="hover:text-[#A09A95] transition-colors">
              NJ Business Web
            </Link>
          </p>
        </div>
      </div>
    </footer>
  )
}
