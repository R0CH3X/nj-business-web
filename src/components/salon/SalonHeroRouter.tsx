import type { Salon } from "@/data/salons"
import HeroBoldEditorial from "@/components/heroes/HeroBoldEditorial"
import HeroDarkLuxury from "@/components/heroes/HeroDarkLuxury"
import HeroSoftBoutique from "@/components/heroes/HeroSoftBoutique"
import HeroModernSplit from "@/components/heroes/HeroModernSplit"
import HeroVibrantEnergy from "@/components/heroes/HeroVibrantEnergy"
import HeroMagazine from "@/components/heroes/HeroMagazine"

export default function SalonHeroRouter({ salon }: { salon: Salon }) {
  switch (salon.template) {
    case "bold-editorial":   return <HeroBoldEditorial salon={salon} />
    case "dark-luxury":      return <HeroDarkLuxury salon={salon} />
    case "soft-boutique":    return <HeroSoftBoutique salon={salon} />
    case "modern-split":     return <HeroModernSplit salon={salon} />
    case "vibrant-energy":   return <HeroVibrantEnergy salon={salon} />
    case "magazine":         return <HeroMagazine salon={salon} />
    default:                 return <HeroSoftBoutique salon={salon} />
  }
}
