"use client"

import { useState } from "react"
import { useLanguage } from "@/contexts/LanguageContext"

interface Props { accentColor: string }

export default function ContactForm({ accentColor }: Props) {
  const { t } = useLanguage()
  const [focused, setFocused] = useState<string | null>(null)

  const fieldClass = (name: string) =>
    `w-full px-4 py-3 bg-[#F0ECE8] border text-[#1A1612] text-sm font-light focus:outline-none transition-colors duration-200 ${
      focused === name ? "" : "border-[#E2DDD9]"
    }`

  const fieldStyle = (name: string) => ({
    fontFamily: "var(--font-dm-sans)",
    borderRadius: "2px",
    borderColor: focused === name ? accentColor : undefined,
  })

  return (
    <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
      <div>
        <label className="block text-xs font-medium tracking-widest uppercase text-[#6B6560] mb-2"
          style={{ fontFamily: "var(--font-dm-sans)" }}>
          {t.formName}
        </label>
        <input type="text"
          className={fieldClass("name")}
          style={fieldStyle("name")}
          onFocus={() => setFocused("name")}
          onBlur={() => setFocused(null)}
          placeholder={t.formNamePlaceholder} />
      </div>
      <div>
        <label className="block text-xs font-medium tracking-widest uppercase text-[#6B6560] mb-2"
          style={{ fontFamily: "var(--font-dm-sans)" }}>
          {t.formPhone}
        </label>
        <input type="tel"
          className={fieldClass("phone")}
          style={fieldStyle("phone")}
          onFocus={() => setFocused("phone")}
          onBlur={() => setFocused(null)}
          placeholder={t.formPhonePlaceholder} />
      </div>
      <div>
        <label className="block text-xs font-medium tracking-widest uppercase text-[#6B6560] mb-2"
          style={{ fontFamily: "var(--font-dm-sans)" }}>
          {t.formMessage}
        </label>
        <textarea rows={4}
          className={`${fieldClass("message")} resize-none`}
          style={fieldStyle("message")}
          onFocus={() => setFocused("message")}
          onBlur={() => setFocused(null)}
          placeholder={t.formMessagePlaceholder} />
      </div>
      <button type="submit"
        className="w-full py-3.5 text-sm font-medium text-white transition-opacity hover:opacity-90"
        style={{ backgroundColor: accentColor, borderRadius: "3px", fontFamily: "var(--font-dm-sans)" }}>
        {t.formSubmit}
      </button>
    </form>
  )
}
