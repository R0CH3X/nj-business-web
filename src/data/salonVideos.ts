// Per-salon hero background video mapping.
// Each salon has a local MP4 in /public/videos/[slug].mp4
// downloaded from Mixkit free stock (720p preview quality).

const SALON_VIDEOS: Record<string, string> = {
  "juliette-beauty-salon":            "/videos/juliette-beauty-salon.mp4",
  "nikki-maar-salon":                 "/videos/nikki-maar-salon.mp4",
  "brigith-nails-spa":                "/videos/brigith-nails-spa.mp4",
  "fina-salon":                       "/videos/fina-salon.mp4",
  "divino-nino-beauty-nail-salon":    "/videos/divino-nino-beauty-nail-salon.mp4",
  "vip-beauty-salon":                 "/videos/vip-beauty-salon.mp4",
  "henry-castel-vip-beauty-salon":    "/videos/henry-castel-vip-beauty-salon.mp4",
  "estilos-beauty-salon":             "/videos/estilos-beauty-salon.mp4",
  "salon-salvys":                     "/videos/salon-salvys.mp4",
  "glamour-by-latin":                 "/videos/glamour-by-latin.mp4",
  "glamour-by-marisol-salon":         "/videos/glamour-by-marisol-salon.mp4",
  "amarilys-beauty-studio":           "/videos/amarilys-beauty-studio.mp4",
  "pinnacle-plumbing-demo":           "/videos/pinnacle-plumbing-demo.mp4",
}

/** Returns the local video path for a salon's hero, or null if not available. */
export function getSalonVideo(slug: string): string | null {
  return SALON_VIDEOS[slug] ?? null
}
