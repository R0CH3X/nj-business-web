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
        href={`https://wa.me/1${salon.phone}`}
        target="_blank" rel="noopener noreferrer"
        className="whatsapp-glow flex-[1.2] flex items-center justify-center gap-2 py-4 text-sm font-medium text-[#1A1612]"
        style={{ backgroundColor: "#25D366", fontFamily: "var(--font-dm-sans)" }}
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
          <path d="M12 2C6.477 2 2 6.477 2 12c0 1.89.525 3.66 1.438 5.168L2.057 22l4.968-1.35A9.955 9.955 0 0012 22c5.523 0 10-4.477 10-10S17.523 2 12 2z" />
        </svg>
        {t.whatsapp}
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
