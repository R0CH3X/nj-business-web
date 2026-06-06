"use client"

interface Props { accentColor: string }

export default function ContactForm({ accentColor }: Props) {
  return (
    <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
      <div>
        <label className="block text-xs font-medium tracking-widest uppercase text-[#6B6560] mb-2"
          style={{ fontFamily: "var(--font-dm-sans)" }}>
          Name / Nombre
        </label>
        <input type="text"
          className="w-full px-4 py-3 bg-[#F0ECE8] border border-[#E2DDD9] text-[#1A1612] text-sm font-light focus:outline-none focus:border-current transition-colors"
          style={{ fontFamily: "var(--font-dm-sans)", borderRadius: "2px" }}
          placeholder="Your name" />
      </div>
      <div>
        <label className="block text-xs font-medium tracking-widest uppercase text-[#6B6560] mb-2"
          style={{ fontFamily: "var(--font-dm-sans)" }}>
          Phone / Teléfono
        </label>
        <input type="tel"
          className="w-full px-4 py-3 bg-[#F0ECE8] border border-[#E2DDD9] text-[#1A1612] text-sm font-light focus:outline-none focus:border-current transition-colors"
          style={{ fontFamily: "var(--font-dm-sans)", borderRadius: "2px" }}
          placeholder="(201) 000-0000" />
      </div>
      <div>
        <label className="block text-xs font-medium tracking-widest uppercase text-[#6B6560] mb-2"
          style={{ fontFamily: "var(--font-dm-sans)" }}>
          Message / Mensaje
        </label>
        <textarea rows={4}
          className="w-full px-4 py-3 bg-[#F0ECE8] border border-[#E2DDD9] text-[#1A1612] text-sm font-light focus:outline-none focus:border-current transition-colors resize-none"
          style={{ fontFamily: "var(--font-dm-sans)", borderRadius: "2px" }}
          placeholder="What service are you interested in? / ¿Qué servicio te interesa?" />
      </div>
      <button type="submit"
        className="w-full py-3.5 text-sm font-medium text-white transition-opacity hover:opacity-90"
        style={{ backgroundColor: accentColor, borderRadius: "3px", fontFamily: "var(--font-dm-sans)" }}>
        Send Message / Enviar Mensaje
      </button>
    </form>
  )
}
