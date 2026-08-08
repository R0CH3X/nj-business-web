import { SalonData } from "@/types/salon";

export const estilosData: SalonData = {
  slug: "estilos-beauty-salon",
  name: "Estilo's Beauty Salon",
  tagline: {
    en: "Your New Look Starts Here",
    es: "Tu Nuevo Look Empieza Aquí",
  },
  heroSubtitle: {
    en: "Full-service beauty salon in West New York, NJ. Hair, nails, waxing & complete makeovers.",
    es: "Salón de belleza completo en West New York, NJ. Cabello, uñas, depilación y cambios de look completos.",
  },
  phone: "+12014533133",
  address: "6014 Bergenline Ave #A, West New York, NJ 07093",
  addressDisplay: "6014 Bergenline Ave #A, West New York, NJ 07093",
  mapQuery: "6014+Bergenline+Ave+West+New+York+NJ+07093",
  hours: {
    en: "Open from 10:00 AM — Call for full schedule",
    es: "Abierto desde las 10:00 AM — Llama para horario completo",
  },
  rating: 4.2,
  reviewCount: 39,
  badges: ["Full-Service", "Makeovers"],
  about: {
    en: "Estilo's Beauty Salon on Bergenline Ave in West New York is your neighborhood destination for a complete beauty experience. From precision haircuts and bold color transformations to expert nail care and smooth waxing — we do it all. Whether it's your first big makeover or a routine refresh, our friendly team is here to make you feel your absolute best.",
    es: "Estilo's Beauty Salon en Bergenline Ave en West New York es tu destino vecinal para una experiencia de belleza completa. Desde cortes de precisión y transformaciones de color audaces hasta cuidado de uñas experto y depilación suave — lo hacemos todo. Ya sea tu primer gran cambio de look o un refresh rutinario, nuestro equipo amigable está aquí para hacerte sentir lo mejor posible.",
  },
  services: [
    {
      icon: "✂️",
      name: { en: "Haircuts", es: "Cortes de Cabello" },
      description: {
        en: "Fresh, stylish cuts for women of all ages.",
        es: "Cortes frescos y con estilo para mujeres de todas las edades.",
      },
    },
    {
      icon: "🎨",
      name: { en: "Hair Color", es: "Color de Cabello" },
      description: {
        en: "From natural shades to bold transformations — we bring your vision to life.",
        es: "Desde tonos naturales hasta transformaciones audaces — hacemos realidad tu visión.",
      },
    },
    {
      icon: "💅",
      name: { en: "Manicure", es: "Manicure" },
      description: {
        en: "Classic and gel manicures for beautiful, long-lasting nails.",
        es: "Manicures clásicas y de gel para uñas hermosas y duraderas.",
      },
    },
    {
      icon: "🦶",
      name: { en: "Pedicure", es: "Pedicure" },
      description: {
        en: "Relaxing pedicures to keep your feet soft and polished.",
        es: "Pedicures relajantes para mantener tus pies suaves y cuidados.",
      },
    },
    {
      icon: "🌟",
      name: { en: "Makeover / Look Change", es: "Cambio de Look" },
      description: {
        en: "Complete transformations — new color, cut, and style for a brand new you.",
        es: "Transformaciones completas — nuevo color, corte y estilo para una nueva tú.",
      },
    },
    {
      icon: "🪮",
      name: { en: "Nail Art & Waxing", es: "Nail Art y Depilación" },
      description: {
        en: "Creative nail designs and precise waxing for the finishing touch.",
        es: "Diseños de uñas creativos y depilación precisa para el toque final.",
      },
    },
  ],
  reviews: [
    {
      author: "Verified Client",
      stars: 5,
      text: "Excelente servicio — 5 Estrellas ⭐️⭐️⭐️⭐️⭐️ Recomendado al 100%!",
      date: "2024",
    },
    {
      author: "Mamá Orgullosa",
      stars: 5,
      text: "Llevé a mi hija a su primer cambio de look y nos encantó. El equipo fue muy amable y el resultado fue increíble.",
      date: "2024",
    },
    {
      author: "Verified Client",
      stars: 5,
      text: "Tratando de sacar el rubio y quedar al natural — gracias! Quedé muy feliz con el resultado.",
      date: "2024",
    },
    {
      author: "Sandra T.",
      stars: 4,
      text: "Great salon on Bergenline. Quick service, friendly staff, and my nails came out beautiful. Will return!",
      date: "2024",
    },
  ],
  gallery: [
    {
      url: "https://images.unsplash.com/photo-1634449571010-02389ed0f9b0?w=600&q=80",
      alt: "Hair styling at Estilo's",
    },
    {
      url: "https://images.unsplash.com/photo-1604654894610-df63bc536371?w=600&q=80",
      alt: "Nail art services",
    },
    {
      url: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=600&q=80",
      alt: "Hair color transformation",
    },
    {
      url: "https://images.unsplash.com/photo-1560066984-138dadb4c035?w=600&q=80",
      alt: "Salon interior",
    },
    {
      url: "https://images.unsplash.com/photo-1604903571668-eeafa97b1de3?w=600&q=80",
      alt: "Pedicure service",
    },
    {
      url: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=600&q=80",
      alt: "Beautiful makeover result",
    },
  ],
  faq: [
    {
      question: { en: "Do you do makeovers?", es: "¿Hacen cambios de look?" },
      answer: {
        en: "Yes! We love helping clients discover a new look — new color, cut, and style all in one visit.",
        es: "¡Sí! Nos encanta ayudar a los clientes a descubrir un nuevo look — nuevo color, corte y estilo en una sola visita.",
      },
    },
    {
      question: { en: "Do you offer nail services?", es: "¿Ofrecen servicios de uñas?" },
      answer: {
        en: "Yes — manicures, pedicures, nail art, and more.",
        es: "Sí — manicures, pedicures, nail art y más.",
      },
    },
    {
      question: { en: "What time do you open?", es: "¿A qué hora abren?" },
      answer: {
        en: "We open at 10:00 AM. Please call for the full weekly schedule.",
        es: "Abrimos a las 10:00 AM. Por favor llama para el horario completo semanal.",
      },
    },
    {
      question: { en: "Where are you located?", es: "¿Dónde están ubicados?" },
      answer: {
        en: "6014 Bergenline Ave #A, West New York, NJ 07093.",
        es: "6014 Bergenline Ave #A, West New York, NJ 07093.",
      },
    },
    {
      question: { en: "Do you accept walk-ins?", es: "¿Aceptan walk-ins?" },
      answer: {
        en: "Yes! Walk-ins are welcome. For faster service, calling ahead is recommended.",
        es: "¡Sí! Los walk-ins son bienvenidos. Para un servicio más rápido, se recomienda llamar con anticipación.",
      },
    },
  ],
  theme: {
    primary: "orange",
    heroGradient: "from-orange-950/85 to-orange-700/65",
    accent: "#ea580c",
    badge: "bg-orange-100 text-orange-800",
  },
  seo: {
    title: "Estilo's Beauty Salon | West New York, NJ | Hair, Nails, Makeovers & Waxing",
    description:
      "Estilo's Beauty Salon on Bergenline Ave, West New York, NJ. Haircuts, color, makeovers, manicure, pedicure, nail art & waxing. 4.2★ (39 reviews). Call (201) 453-3133.",
    keywords:
      "beauty salon West New York NJ, Bergenline Ave salon, hair and nails West New York, makeover salon NJ, Estilos Beauty Salon",
  },
};
