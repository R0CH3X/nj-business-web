import { SalonData } from "@/types/salon";

export const brigithData: SalonData = {
  slug: "brigith-nails-spa",
  name: "Brigith Nails & Spa",
  tagline: {
    en: "Your Style Is Our Passion",
    es: "Tu Estilo Es Nuestra Pasión",
  },
  heroSubtitle: {
    en: "Premium nail services & spa treatments in West New York, NJ. Clean atmosphere · Gift certificates available.",
    es: "Servicios de uñas premium y tratamientos de spa en West New York, NJ. Ambiente limpio · Gift certificates disponibles.",
  },
  phone: "+12016306003",
  address: "5408 Park Ave, West New York, NJ 07093",
  addressDisplay: "5408 Park Ave, West New York, NJ 07093",
  mapQuery: "5408+Park+Ave+West+New+York+NJ+07093",
  hours: {
    en: "Open from 10:30 AM — Call for full schedule",
    es: "Abierto desde las 10:30 AM — Llama para horario completo",
  },
  rating: 4.8,
  reviewCount: 12,
  badges: ["Clean & Safe", "Gift Certificates"],
  about: {
    en: "At Brigith Nails & Spa, your style is our passion. We provide a luxurious, welcoming experience in a clean, modern environment. From spa pedicures to gel sets and dip powder, our skilled technicians take pride in healthy, beautiful nails. We even have a little coffee bar to make your visit extra special. Your satisfaction is our top priority — and our regulars never leave unhappy.",
    es: "En Brigith Nails & Spa, tu estilo es nuestra pasión. Ofrecemos una experiencia lujosa y acogedora en un ambiente limpio y moderno. Desde spa pedicures hasta gel sets y dip powder, nuestras técnicas especializadas se enorgullecen de crear uñas saludables y hermosas. Hasta tenemos una pequeña barra de café para hacer tu visita aún más especial.",
  },
  services: [
    {
      icon: "💅",
      name: { en: "Manicure", es: "Manicure Clásica" },
      description: {
        en: "Classic manicure with shaping, cuticle care, and polish of your choice.",
        es: "Manicure clásica con forma, cuidado de cutículas y esmalte de tu elección.",
      },
    },
    {
      icon: "🦶",
      name: { en: "Spa Pedicure", es: "Spa Pedicure" },
      description: {
        en: "Indulgent spa pedicure with soaking, exfoliation, massage, and polish.",
        es: "Spa pedicure indulgente con remojo, exfoliación, masaje y esmalte.",
      },
    },
    {
      icon: "✨",
      name: { en: "UV Gel Set", es: "UV Gel Set" },
      description: {
        en: "Long-lasting UV gel nails for a glossy, chip-free finish.",
        es: "Uñas de gel UV de larga duración para un acabado brillante y sin astillas.",
      },
    },
    {
      icon: "💎",
      name: { en: "Tip Set / Poli Gel Manicure", es: "Tip Set / Manicure Poli Gel" },
      description: {
        en: "Extensions and poli gel manicure for strong, beautiful nails.",
        es: "Extensiones y manicure de poli gel para uñas fuertes y hermosas.",
      },
    },
    {
      icon: "🌸",
      name: { en: "Dip Powder", es: "Dip Powder" },
      description: {
        en: "Odorless, durable dip powder for a lightweight, natural feel.",
        es: "Dip powder sin olor y duradero para una sensación ligera y natural.",
      },
    },
    {
      icon: "🪮",
      name: { en: "Waxing", es: "Depilación" },
      description: {
        en: "Gentle and precise waxing for smooth, hair-free skin.",
        es: "Depilación suave y precisa para una piel lisa y sin vello.",
      },
    },
  ],
  reviews: [
    {
      author: "Lisa T.",
      stars: 5,
      text: "I have NEVER left unhappy. Great service and beautiful atmosphere. My nails have grown long and healthy since coming here!",
      date: "2024",
    },
    {
      author: "Ana P.",
      stars: 5,
      text: "The pedi was perfect. They treated me so nicely — this is now a favorite salon! I send all my friends here.",
      date: "2024",
    },
    {
      author: "Michelle K.",
      stars: 5,
      text: "Clean atmosphere with a little coffee bar. The women were nice and welcoming. My nails turned out beautiful!",
      date: "2024",
    },
    {
      author: "Sonia V.",
      stars: 5,
      text: "Best nail salon in West New York! The dip powder lasts so long and always looks perfect. Highly recommend.",
      date: "2024",
    },
  ],
  gallery: [
    {
      url: "https://images.unsplash.com/photo-1604654894610-df63bc536371?w=600&q=80",
      alt: "Beautiful nail art at Brigith Nails & Spa",
    },
    {
      url: "https://images.unsplash.com/photo-1604903571668-eeafa97b1de3?w=600&q=80",
      alt: "Spa pedicure service",
    },
    {
      url: "https://images.unsplash.com/photo-1632345031435-8727f592d8db?w=600&q=80",
      alt: "Gel nail set",
    },
    {
      url: "https://images.unsplash.com/photo-1604654894610-df63bc536371?w=600&q=80&sat=-30",
      alt: "Dip powder nails",
    },
    {
      url: "https://images.unsplash.com/photo-1519014816548-bf5fe059798b?w=600&q=80",
      alt: "Nail salon interior",
    },
    {
      url: "https://images.unsplash.com/photo-1560066984-138dadb4c035?w=600&q=80&hue=330",
      alt: "Relaxing spa atmosphere",
    },
  ],
  faq: [
    {
      question: {
        en: "Do you offer gift certificates?",
        es: "¿Ofrecen gift certificates?",
      },
      answer: {
        en: "Yes! We offer gift certificates — perfect for birthdays, holidays, or any special occasion. Ask us in-salon or call to order.",
        es: "¡Sí! Ofrecemos gift certificates — perfectos para cumpleaños, fiestas o cualquier ocasión especial. Pregunta en el salón o llámanos.",
      },
    },
    {
      question: {
        en: "How long does a gel manicure last?",
        es: "¿Cuánto dura una manicure de gel?",
      },
      answer: {
        en: "Our UV gel and dip powder manicures typically last 2–4 weeks without chipping, depending on nail care.",
        es: "Nuestras manicures de UV gel y dip powder duran típicamente de 2 a 4 semanas sin astillarse, según el cuidado de las uñas.",
      },
    },
    {
      question: {
        en: "Is the salon clean and safe?",
        es: "¿Es el salón limpio y seguro?",
      },
      answer: {
        en: "Absolutely. We maintain the highest standards of cleanliness and sterilization for all tools and equipment.",
        es: "Por supuesto. Mantenemos los más altos estándares de limpieza y esterilización para todas las herramientas y equipos.",
      },
    },
    {
      question: {
        en: "What time do you open?",
        es: "¿A qué hora abren?",
      },
      answer: {
        en: "We open at 10:30 AM. Please call us for full weekly hours.",
        es: "Abrimos a las 10:30 AM. Llámanos para el horario completo semanal.",
      },
    },
    {
      question: {
        en: "Do I need an appointment?",
        es: "¿Necesito una cita?",
      },
      answer: {
        en: "We welcome walk-ins, but appointments are recommended to minimize wait time.",
        es: "Aceptamos walk-ins, pero se recomiendan citas para minimizar el tiempo de espera.",
      },
    },
  ],
  theme: {
    primary: "pink",
    heroGradient: "from-pink-950/85 to-fuchsia-800/60",
    accent: "#db2777",
    badge: "bg-pink-100 text-pink-800",
  },
  seo: {
    title: "Brigith Nails & Spa | West New York, NJ | Gel, Dip Powder & Spa Pedicure",
    description:
      "Brigith Nails & Spa in West New York, NJ. UV gel sets, dip powder, spa pedicures, waxing & more. Clean atmosphere, gift certificates available. 4.8★ (12 reviews). Call (201) 630-6003.",
    keywords:
      "nail salon West New York NJ, spa pedicure NJ, gel nails West New York, dip powder Hudson County, Brigith Nails Spa",
  },
};
