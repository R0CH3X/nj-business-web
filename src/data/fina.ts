import { SalonData } from "@/types/salon";

export const finaData: SalonData = {
  slug: "fina-salon",
  name: "Fina Salon",
  tagline: {
    en: "Precision. Color. Artistry.",
    es: "Precisión. Color. Arte.",
  },
  heroSubtitle: {
    en: "Expert hair care in Guttenberg, NJ. Specialist in color, Magic Sleek & treatments. LGBTQ+ friendly.",
    es: "Cuidado capilar experto en Guttenberg, NJ. Especialista en color, Magic Sleek y tratamientos. LGBTQ+ friendly.",
  },
  phone: "+12016627191",
  address: "201 71st St, Guttenberg, NJ 07093",
  addressDisplay: "201 71st St, Guttenberg, NJ 07093",
  mapQuery: "201+71st+St+Guttenberg+NJ+07093",
  hours: {
    en: "Open from 9:30 AM — Call for full schedule",
    es: "Abierto desde las 9:30 AM — Llama para horario completo",
  },
  rating: 5.0,
  reviewCount: 11,
  badges: ["LGBTQ+ Friendly", "Specialist: José Manuel"],
  about: {
    en: "Fina Salon is a boutique hair studio in Guttenberg, NJ, led by José Manuel — a gifted stylist with a true eye for color and a passion for healthy hair. Known for his kind, attentive approach, José takes his time to understand exactly what each client needs and delivers results that exceed expectations. Whether it's a precision cut, vibrant color, or a transformative Magic Sleek treatment, every visit at Fina Salon is a personalized luxury experience.",
    es: "Fina Salon es un boutique salón de cabello en Guttenberg, NJ, dirigido por José Manuel — un estilista talentoso con verdadero ojo para el color y pasión por el cabello saludable. Conocido por su enfoque amable y atento, José se toma el tiempo para entender exactamente lo que cada cliente necesita y entrega resultados que superan expectativas.",
  },
  services: [
    {
      icon: "✂️",
      name: { en: "Precision Haircuts", es: "Cortes de Precisión" },
      description: {
        en: "Tailored cuts that complement your features and lifestyle.",
        es: "Cortes adaptados a tus rasgos y estilo de vida.",
      },
    },
    {
      icon: "🎨",
      name: { en: "Color & Highlights", es: "Color y Highlights" },
      description: {
        en: "Vibrant, dimensional color crafted with an artist's eye.",
        es: "Color vibrante y dimensional creado con ojo de artista.",
      },
    },
    {
      icon: "✨",
      name: { en: "Magic Sleek", es: "Magic Sleek" },
      description: {
        en: "The ultimate smoothing treatment for frizz-free, glossy hair.",
        es: "El tratamiento alisador definitivo para un cabello brillante y sin frizz.",
      },
    },
    {
      icon: "💆",
      name: { en: "Hair Treatments", es: "Tratamientos Capilares" },
      description: {
        en: "Restorative treatments that rebuild strength and shine.",
        es: "Tratamientos restauradores que reconstruyen fuerza y brillo.",
      },
    },
    {
      icon: "💨",
      name: { en: "Blow Dry & Styling", es: "Blow Dry y Estilos" },
      description: {
        en: "Professional blow dry and styling for any occasion.",
        es: "Blow dry y estilos profesionales para cualquier ocasión.",
      },
    },
    {
      icon: "🌀",
      name: { en: "Special Styles", es: "Estilos Especiales" },
      description: {
        en: "Updos, curls, and event-ready looks crafted to perfection.",
        es: "Recogidos, rizos y looks para eventos creados a la perfección.",
      },
    },
  ],
  reviews: [
    {
      author: "Gabriela M.",
      stars: 5,
      text: "Jose is respectful, kind and does a fantastic job. He has such an eye for color — amazing all around!",
      date: "2024",
    },
    {
      author: "Vanessa R.",
      stars: 5,
      text: "The salon is clean and has a nice feel. Josi took his time with my hair treatment. Very happy with the results.",
      date: "2024",
    },
    {
      author: "Laura P.",
      stars: 5,
      text: "Jose is very knowledgeable in hair treatment. Did exactly what I wanted and even better. Truly a perfectionist!",
      date: "2024",
    },
    {
      author: "Sofia D.",
      stars: 5,
      text: "Absolutely love Fina Salon. José's attention to detail is unmatched. My hair has never looked or felt better.",
      date: "2024",
    },
  ],
  gallery: [
    {
      url: "https://images.unsplash.com/photo-1522337660859-02fbefca4702?w=600&q=80",
      alt: "Hair styling at Fina Salon",
    },
    {
      url: "https://images.unsplash.com/photo-1470259078422-826894b933aa?w=600&q=80",
      alt: "Color treatment",
    },
    {
      url: "https://images.unsplash.com/photo-1560066984-138dadb4c035?w=600&q=80",
      alt: "Fina Salon interior",
    },
    {
      url: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=600&q=80",
      alt: "Beautiful hair result",
    },
    {
      url: "https://images.unsplash.com/photo-1595476108010-b4d1f102b1b1?w=600&q=80",
      alt: "Balayage and highlights",
    },
    {
      url: "https://images.unsplash.com/photo-1605497788044-5a32c7078486?w=600&q=80",
      alt: "Professional styling",
    },
  ],
  faq: [
    {
      question: { en: "Who is the stylist?", es: "¿Quién es el estilista?" },
      answer: {
        en: "José Manuel is the lead stylist at Fina Salon — known for his exceptional color work and gentle, professional approach.",
        es: "José Manuel es el estilista principal de Fina Salon — conocido por su excepcional trabajo en color y enfoque profesional.",
      },
    },
    {
      question: { en: "What is Magic Sleek?", es: "¿Qué es Magic Sleek?" },
      answer: {
        en: "Magic Sleek is a premium keratin-based smoothing treatment that eliminates frizz and adds incredible shine — results last 3–6 months.",
        es: "Magic Sleek es un tratamiento alisador premium a base de keratina que elimina el frizz y agrega brillo increíble — los resultados duran 3–6 meses.",
      },
    },
    {
      question: { en: "Do I need an appointment?", es: "¿Necesito una cita?" },
      answer: {
        en: "Yes, appointments are recommended to ensure you get the time and attention you deserve.",
        es: "Sí, se recomiendan citas para asegurarte de recibir el tiempo y atención que mereces.",
      },
    },
    {
      question: { en: "Where are you located?", es: "¿Dónde están ubicados?" },
      answer: {
        en: "We are at 201 71st St, Guttenberg, NJ 07093.",
        es: "Estamos en 201 71st St, Guttenberg, NJ 07093.",
      },
    },
    {
      question: { en: "Are you LGBTQ+ friendly?", es: "¿Son LGBTQ+ friendly?" },
      answer: {
        en: "Absolutely. Fina Salon is a welcoming, inclusive space for everyone.",
        es: "Absolutamente. Fina Salon es un espacio acogedor e inclusivo para todos.",
      },
    },
  ],
  theme: {
    primary: "slate",
    heroGradient: "from-slate-900/90 to-slate-700/70",
    accent: "#334155",
    badge: "bg-slate-100 text-slate-800",
  },
  seo: {
    title: "Fina Salon | Guttenberg, NJ | Color, Magic Sleek & Hair Treatments",
    description:
      "Fina Salon in Guttenberg, NJ. Expert color, highlights, Magic Sleek, keratin treatments & styling by José Manuel. LGBTQ+ friendly. 5.0★ (11 reviews). Call (201) 662-7191.",
    keywords:
      "hair salon Guttenberg NJ, Magic Sleek NJ, hair color Guttenberg, keratin treatment Hudson County, Fina Salon José Manuel",
  },
};
