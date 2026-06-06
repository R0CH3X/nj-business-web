import Link from "next/link"
import type { Salon } from "@/data/salons"

interface Props { salon: Salon }

const footerLinks = [
  { label: "Services", href: "#services" },
  { label: "Gallery", href: "#gallery" },
  { label: "Reviews", href: "#reviews" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact" },
]

export default function SalonFooter({ salon }: Props) {
  return (
    <footer className="bg-[#1A1612] text-[#FAF7F4] py-16 px-6 md:px-10">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-3 gap-12 pb-12 border-b border-[#2A2520]">
          {/* Brand */}
          <div>
            <p className="font-bold text-xl mb-3" style={{ fontFamily: "var(--font-playfair)" }}>
              {salon.name}
            </p>
            <p className="text-sm font-light text-[#7A746E] leading-relaxed italic mb-6"
              style={{ fontFamily: "var(--font-cormorant)", fontSize: "1rem" }}>
              {salon.tagline}
            </p>
            <div className="flex gap-3">
              {salon.instagram && (
                <a href={`https://instagram.com/${salon.instagram}`} target="_blank" rel="noopener noreferrer"
                  className="text-[#7A746E] hover:text-[#FAF7F4] transition-colors">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <rect x="2" y="2" width="20" height="20" rx="5" />
                    <circle cx="12" cy="12" r="4" />
                    <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
                  </svg>
                </a>
              )}
              {salon.facebook && (
                <a href={salon.facebook} target="_blank" rel="noopener noreferrer"
                  className="text-[#7A746E] hover:text-[#FAF7F4] transition-colors">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" />
                  </svg>
                </a>
              )}
            </div>
          </div>

          {/* Links */}
          <div>
            <p className="text-xs font-medium tracking-widest uppercase text-[#7A746E] mb-5"
              style={{ fontFamily: "var(--font-dm-sans)" }}>
              Navigate
            </p>
            <ul className="space-y-3">
              {footerLinks.map((link) => (
                <li key={link.href}>
                  <a href={link.href}
                    className="text-sm font-light text-[#A09A95] hover:text-[#FAF7F4] transition-colors"
                    style={{ fontFamily: "var(--font-dm-sans)" }}>
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <p className="text-xs font-medium tracking-widest uppercase text-[#7A746E] mb-5"
              style={{ fontFamily: "var(--font-dm-sans)" }}>
              Visit Us
            </p>
            <address className="not-italic space-y-2 text-sm font-light text-[#A09A95]"
              style={{ fontFamily: "var(--font-dm-sans)" }}>
              <p>{salon.address}</p>
              <p>{salon.city}, {salon.state} {salon.zip}</p>
              <a href={`tel:${salon.phone}`}
                className="block hover:text-[#FAF7F4] transition-colors mt-3"
                style={{ color: salon.accentColor }}>
                {salon.phoneFormatted}
              </a>
              <p className="mt-2">{salon.hours}</p>
            </address>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs font-light text-[#6B6560]" style={{ fontFamily: "var(--font-dm-sans)" }}>
            © {new Date().getFullYear()} {salon.name}. {salon.city}, NJ.
          </p>
          <p className="text-xs font-light text-[#4A4540]" style={{ fontFamily: "var(--font-dm-sans)" }}>
            Part of{" "}
            <Link href="/" className="hover:text-[#6B6560] transition-colors">
              NJ Business Web
            </Link>
          </p>
        </div>
      </div>
    </footer>
  )
}
