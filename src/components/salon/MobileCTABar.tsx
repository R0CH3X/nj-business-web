"use client"

import type { Salon } from "@/data/salons"
import { useLanguage } from "@/contexts/LanguageContext"
import LanguageToggle from "./LanguageToggle"

interface Props { salon: Salon }

export default function MobileCTABar({ salon }: Props) {
  const { t } = useLanguage()

  return (
    <div className="mobile-cta-bar md:hidden items-stretch">
      <a
        href={`tel:+1${salon.phone}`}
        className="flex-[1.2] flex items-center justify-center gap-2 py-4 text-sm font-medium text-white"
        style={{ backgroundColor: salon.accentColor, fontFamily: "var(--font-dm-sans)" }}
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 11.5 19.79 19.79 0 01-.07 2.87a2 2 0 011.99-2h3a2 2 0 012 1.72c.13.96.36 1.9.7 2.81a2 2 0 01-.45 2.11L6.09 8.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.91.34 1.85.57 2.81.7a2 2 0 011.72 2.03z" />
        </svg>
        {t.mobileCall}
      </a>
      <a
        href="#contact"
        className="flex-[1.2] flex items-center justify-center gap-2 py-4 text-sm font-medium"
        style={{ backgroundColor: "#1A1612", color: "#FAF7F4", fontFamily: "var(--font-dm-sans)" }}
      >
        {t.mobileBook}
      </a>
      <div className="flex items-center justify-center px-2 bg-[#FAF7F4]">
        <LanguageToggle accentColor={salon.accentColor} variant="floating" />
      </div>
    </div>
  )
}
