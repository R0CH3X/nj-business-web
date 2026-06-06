import Image from "next/image"
import type { Salon } from "@/data/salons"

interface Props { salon: Salon }

const aboutImages: Record<string, string> = {
  hair: "https://images.unsplash.com/photo-1595476108010-b4d1f102b1b1?w=700&q=80&auto=format&fit=crop",
  nails: "https://images.unsplash.com/photo-1632345031435-8727f592d8f9?w=700&q=80&auto=format&fit=crop",
  full: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=700&q=80&auto=format&fit=crop",
}

export default function SalonAbout({ salon }: Props) {
  const imgSrc = aboutImages[salon.type] ?? aboutImages.hair

  return (
    <section id="about" className="py-24 md:py-32 bg-[#1A1612]">
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        <div className="grid md:grid-cols-2 gap-16 md:gap-24 items-center">
          {/* Image */}
          <div className="relative h-80 md:h-[520px] overflow-hidden" style={{ borderRadius: "2px" }}>
            <Image
              src={imgSrc}
              alt={`About ${salon.name}`}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
            {/* Accent color overlay strip */}
            <div className="absolute bottom-0 left-0 right-0 h-1" style={{ backgroundColor: salon.accentColor }} />
          </div>

          {/* Text */}
          <div>
            <p className="text-xs font-medium tracking-widest uppercase mb-6"
              style={{ fontFamily: "var(--font-dm-sans)", color: salon.accentColor }}>
              About / Nosotros
            </p>

            <h2 className="headline-lg text-[#FAF7F4] mb-8" style={{ fontFamily: "var(--font-playfair)" }}>
              {salon.name}
            </h2>

            <p className="text-base font-light text-[#A09A95] leading-relaxed mb-6"
              style={{ fontFamily: "var(--font-dm-sans)" }}>
              Located in {salon.address}, {salon.city}, New Jersey — we're a neighborhood salon
              committed to making every client feel seen, cared for, and beautiful.
            </p>
            <p className="text-sm italic text-[#7A746E] leading-relaxed mb-10"
              style={{ fontFamily: "var(--font-cormorant)", fontSize: "1.1rem" }}>
              Ubicados en {salon.city}, NJ — somos un salón de barrio comprometido con hacer que cada cliente
              se sienta bien atendido/a y hermoso/a.
            </p>

            {/* Badges */}
            <div className="flex flex-wrap gap-2 mb-10">
              {salon.badges.map((badge) => (
                <span key={badge}
                  className="text-xs font-medium px-3 py-1.5 border"
                  style={{
                    fontFamily: "var(--font-dm-sans)",
                    borderColor: "#2A2520",
                    color: "#A09A95",
                    borderRadius: "2px",
                  }}>
                  {badge}
                </span>
              ))}
            </div>

            {/* Team */}
            {salon.team && salon.team.length > 0 && (
              <div className="border-t border-[#2A2520] pt-8">
                <p className="text-xs font-medium tracking-widest uppercase text-[#6B6560] mb-4"
                  style={{ fontFamily: "var(--font-dm-sans)" }}>
                  Our Team
                </p>
                <div className="flex flex-col gap-3">
                  {salon.team.map((member) => (
                    <div key={member.name} className="flex items-center justify-between">
                      <span className="text-[#FAF7F4] font-light" style={{ fontFamily: "var(--font-dm-sans)" }}>
                        {member.name}
                      </span>
                      <span className="text-sm font-light text-[#6B6560] italic"
                        style={{ fontFamily: "var(--font-cormorant)", fontSize: "1rem" }}>
                        {member.role}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Instagram */}
            {salon.instagram && (
              <a
                href={`https://instagram.com/${salon.instagram}`}
                target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center gap-2 mt-8 text-sm font-light text-[#A09A95] hover:text-[#FAF7F4] transition-colors"
                style={{ fontFamily: "var(--font-dm-sans)" }}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                  <circle cx="12" cy="12" r="4" />
                  <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
                </svg>
                @{salon.instagram}
              </a>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
