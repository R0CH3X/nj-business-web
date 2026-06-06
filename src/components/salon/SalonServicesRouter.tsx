import type { Salon } from "@/data/salons"
import ServicesNumbered from "@/components/services/ServicesNumbered"
import ServicesGrid from "@/components/services/ServicesGrid"
import ServicesMinimal from "@/components/services/ServicesMinimal"

export default function SalonServicesRouter({ salon }: { salon: Salon }) {
  switch (salon.template) {
    case "bold-editorial":  return <ServicesNumbered salon={salon} />
    case "dark-luxury":     return <ServicesNumbered salon={salon} dark />
    case "magazine":        return <ServicesGrid salon={salon} />
    case "vibrant-energy":  return <ServicesGrid salon={salon} />
    default:                return <ServicesMinimal salon={salon} />
  }
}
