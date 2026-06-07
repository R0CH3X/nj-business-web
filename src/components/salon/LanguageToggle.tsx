"use client"

import { useLanguage } from "@/contexts/LanguageContext"

interface Props {
  accentColor?: string
  variant?: "nav" | "drawer" | "floating"
  className?: string
}

/**
 * Bilingual EN | ES pill toggle with a sliding active-state indicator.
 * - "nav": compact pill for the desktop navbar, sits beside Call Now
 * - "drawer": full-width pill for the mobile slide-in menu
 * - "floating": fixed circular pill for the mobile sticky bar
 */
export default function LanguageToggle({ accentColor = "#1A1612", variant = "nav", className = "" }: Props) {
  const { lang, setLang } = useLanguage()

  const sizing =
    variant === "drawer"
      ? "h-11 w-full text-sm"
      : variant === "floating"
      ? "h-10 px-1 text-xs shadow-lg"
      : "h-9 px-1 text-xs"

  return (
    <div
      className={`relative inline-flex items-center rounded-full border overflow-hidden select-none ${sizing} ${className}`}
      style={{ borderColor: `${accentColor}33`, backgroundColor: "#FFFFFF" }}
      role="group"
      aria-label="Language toggle / Selector de idioma"
    >
      {/* sliding indicator */}
      <span
        aria-hidden
        className="absolute top-1 bottom-1 rounded-full transition-transform duration-300 ease-[cubic-bezier(0.65,0,0.35,1)]"
        style={{
          width: "calc(50% - 4px)",
          left: "4px",
          backgroundColor: accentColor,
          transform: lang === "es" ? "translateX(100%)" : "translateX(0)",
        }}
      />
      {(["en", "es"] as const).map((l) => (
        <button
          key={l}
          type="button"
          onClick={() => setLang(l)}
          className="relative z-10 flex-1 flex items-center justify-center px-3 h-full transition-colors duration-300 cursor-pointer"
          style={{
            fontFamily: "var(--font-dm-sans)",
            fontWeight: lang === l ? 700 : 500,
            color: lang === l ? "#FAF7F4" : "#6B6560",
            letterSpacing: "0.05em",
          }}
          aria-pressed={lang === l}
        >
          {l.toUpperCase()}
        </button>
      ))}
    </div>
  )
}
