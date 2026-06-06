"use client"

import { useState } from "react"
import Image from "next/image"
import type { Salon } from "@/data/salons"

interface Props { salon: Salon }

const galleryImages = {
  hair: [
    { src: "https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?w=600&q=80&auto=format&fit=crop", label: "Color & Highlights" },
    { src: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=600&q=80&auto=format&fit=crop", label: "Blowout" },
    { src: "https://images.unsplash.com/photo-1562322140-8baeececf3df?w=600&q=80&auto=format&fit=crop", label: "Balayage" },
    { src: "https://images.unsplash.com/photo-1595476108010-b4d1f102b1b1?w=600&q=80&auto=format&fit=crop", label: "Salon Atmosphere" },
    { src: "https://images.unsplash.com/photo-1519345182560-3f2917c472ef?w=600&q=80&auto=format&fit=crop", label: "Haircut" },
    { src: "https://images.unsplash.com/photo-1492106087820-71f1a00d2b11?w=600&q=80&auto=format&fit=crop", label: "Styling" },
  ],
  nails: [
    { src: "https://images.unsplash.com/photo-1604654894610-df63bc536371?w=600&q=80&auto=format&fit=crop", label: "Nail Art" },
    { src: "https://images.unsplash.com/photo-1604654894797-b7e5a6c7e7e4?w=600&q=80&auto=format&fit=crop", label: "Manicure" },
    { src: "https://images.unsplash.com/photo-1604654894610-df63bc536371?w=600&q=80&auto=format&fit=crop", label: "Gel Nails" },
    { src: "https://images.unsplash.com/photo-1632345031435-8727f592d8f9?w=600&q=80&auto=format&fit=crop", label: "Pedicure" },
    { src: "https://images.unsplash.com/photo-1604654894610-df63bc536371?w=600&q=80&auto=format&fit=crop", label: "Custom Design" },
    { src: "https://images.unsplash.com/photo-1604654894610-df63bc536371?w=600&q=80&auto=format&fit=crop", label: "Spa Treatment" },
  ],
  full: [
    { src: "https://images.unsplash.com/photo-1560066984-138dadb4c035?w=600&q=80&auto=format&fit=crop", label: "Hair Services" },
    { src: "https://images.unsplash.com/photo-1604654894610-df63bc536371?w=600&q=80&auto=format&fit=crop", label: "Nail Art" },
    { src: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=600&q=80&auto=format&fit=crop", label: "Salon" },
    { src: "https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?w=600&q=80&auto=format&fit=crop", label: "Color" },
    { src: "https://images.unsplash.com/photo-1595476108010-b4d1f102b1b1?w=600&q=80&auto=format&fit=crop", label: "Atmosphere" },
    { src: "https://images.unsplash.com/photo-1632345031435-8727f592d8f9?w=600&q=80&auto=format&fit=crop", label: "Pedicure" },
  ],
}

export default function SalonGallery({ salon }: Props) {
  const [active, setActive] = useState<number | null>(null)
  const images = galleryImages[salon.type] ?? galleryImages.hair

  // Asymmetric heights for editorial feel
  const heights = ["row-span-2", "row-span-1", "row-span-1", "row-span-2", "row-span-1", "row-span-1"]

  return (
    <section id="gallery" className="py-24 md:py-32 bg-[#F0ECE8]">
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        <div className="flex items-end justify-between mb-12">
          <div>
            <p className="text-xs font-medium tracking-widest uppercase mb-3"
              style={{ fontFamily: "var(--font-dm-sans)", color: salon.accentColor }}>
              Gallery / Galería
            </p>
            <h2 className="headline-lg text-[#1A1612]" style={{ fontFamily: "var(--font-playfair)" }}>
              Our work.
            </h2>
          </div>
          <p className="hidden md:block text-sm font-light text-[#6B6560] max-w-xs text-right"
            style={{ fontFamily: "var(--font-dm-sans)" }}>
            Real results from real clients in {salon.city}, NJ.
          </p>
        </div>

        {/* Grid — desktop asymmetric, mobile scroll */}
        <div className="hidden md:grid grid-cols-3 grid-rows-3 gap-3 h-[600px]">
          {images.map((img, i) => (
            <div
              key={i}
              className={`relative overflow-hidden cursor-pointer ${heights[i]}`}
              onMouseEnter={() => setActive(i)}
              onMouseLeave={() => setActive(null)}
            >
              <Image
                src={img.src}
                alt={`${salon.name} — ${img.label}`}
                fill
                className="object-cover transition-transform duration-500"
                style={{ transform: active === i ? "scale(1.05)" : "scale(1)" }}
                sizes="(max-width: 1280px) 33vw, 400px"
              />
              <div
                className="absolute inset-0 flex items-end p-4 transition-opacity duration-300"
                style={{
                  background: `linear-gradient(to top, ${salon.accentColor}CC, transparent)`,
                  opacity: active === i ? 1 : 0,
                }}
              >
                <span className="text-white text-sm font-light" style={{ fontFamily: "var(--font-dm-sans)" }}>
                  {img.label}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Mobile — horizontal scroll */}
        <div className="md:hidden flex gap-3 overflow-x-auto pb-4 snap-x snap-mandatory -mx-6 px-6">
          {images.map((img, i) => (
            <div key={i} className="flex-none w-72 h-80 relative overflow-hidden snap-start">
              <Image
                src={img.src}
                alt={`${salon.name} — ${img.label}`}
                fill
                className="object-cover"
                sizes="288px"
              />
              <div className="absolute bottom-0 left-0 right-0 p-3"
                style={{ background: `linear-gradient(to top, ${salon.accentColor}BB, transparent)` }}>
                <span className="text-white text-sm" style={{ fontFamily: "var(--font-dm-sans)" }}>{img.label}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
