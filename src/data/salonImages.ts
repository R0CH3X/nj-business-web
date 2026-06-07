// Per-salon image assignment.
//
// Each salon gets a *distinct, deterministically-rotated* slice of a verified
// working photo pool: 1 hero + 1 about + 6 gallery = 8 images per salon, with
// zero duplicates *within* a salon (fixing the old gallery bug where the same
// photo appeared up to 4x) and a unique starting offset per salon so neighbouring
// businesses never see an identical set in an identical order.
//
// NOTE: every URL below was individually verified to resolve (HTTP 200) before
// being added to POOL. Production-grade uniqueness across all 12 sites would
// require licensed, location-specific photography — recommended as a follow-up
// once each owner can supply real shots of their space, staff, and work.

const POOL = [
  "1487412947147-5cebf100ffc2",
  "1522337360788-8b13dee7a37e",
  "1562322140-8baeececf3df",
  "1595476108010-b4d1f102b1b1",
  "1519345182560-3f2917c472ef",
  "1492106087820-71f1a00d2b11",
  "1604654894610-df63bc536371",
  "1604654894797-b7e5a6c7e7e4",
  "1632345031435-8727f592d8f9",
  "1560066984-138dadb4c035",
  "1521590832167-7bcbfaa6381f",
  "1599351431202-1e0f0137899a",
  "1633681926022-84c23e8cb2d6",
  "1605497788044-5a32c7078486",
  "1560869713-7d0a29430803",
  "1522335789203-aabd1fc54bc9",
  "1487412912498-0447578fcca8",
  "1519699047748-de8e457a634e",
  "1571875257727-256c39da42af",
  "1580618672591-eb180b1a973f",
] as const

const GALLERY_LABELS_EN = ["The Space", "Featured Work", "Detail Shot", "Behind the Chair", "Finished Look", "In Progress"]
const GALLERY_LABELS_ES = ["El Espacio", "Trabajo Destacado", "Detalle", "Tras Bambalinas", "Look Terminado", "En Proceso"]

const url = (id: string, w: number) => `https://images.unsplash.com/photo-${id}?w=${w}&q=80&auto=format&fit=crop`

// Ordered list of slugs — index here determines each salon's rotation offset.
// Keep in sync with the order of `salons` in ./salons.ts.
const SLUG_ORDER = [
  "juliette-beauty-salon",
  "nikki-maar-salon",
  "brigith-nails-spa",
  "fina-salon",
  "divino-nino-beauty-nail-salon",
  "vip-beauty-salon",
  "henry-castel-vip-beauty-salon",
  "estilos-beauty-salon",
  "salon-salvys",
  "glamour-by-latin",
  "glamour-by-marisol-salon",
  "amarilys-beauty-studio",
] as const

export interface SalonImageSet {
  hero: string
  about: string
  gallery: { src: string; label: string; labelEs: string }[]
}

/**
 * Returns a unique 8-image slice for the given salon slug, rotated by a step
 * coprime with the pool size so every salon's window — and its ordering — is
 * distinct from every other salon's.
 */
export function getSalonImages(slug: string): SalonImageSet {
  const index = Math.max(0, SLUG_ORDER.indexOf(slug as (typeof SLUG_ORDER)[number]))
  const STEP = 7 // coprime with POOL.length (20) — guarantees distinct offsets for 12 salons
  const offset = (index * STEP) % POOL.length
  const slice = Array.from({ length: 8 }, (_, k) => POOL[(offset + k) % POOL.length])

  return {
    hero: url(slice[0], 1400),
    about: url(slice[1], 700),
    gallery: slice.slice(2, 8).map((id, i) => ({
      src: url(id, 600),
      label: GALLERY_LABELS_EN[i],
      labelEs: GALLERY_LABELS_ES[i],
    })),
  }
}
