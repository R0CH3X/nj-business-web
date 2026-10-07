import { useState, useEffect, type ReactNode, type CSSProperties } from "react";
import { motion, useReducedMotion } from "framer-motion";

/* ─────────────────────────────────────────────────────────────
   NJ Business Web — Trades System Landing Page
   Design: cream / deep-green editorial · square buttons · dot grid
   Bilingual EN/ES · respects prefers-reduced-motion
───────────────────────────────────────────────────────────────── */

const STRIPE_URL = "https://buy.stripe.com/eVq9AT8zDfwV8Sn1EI8og0a";

// ── Translation types ─────────────────────────────────────────
type Lang = "en" | "es";
interface Step    { label: string; desc: string; }
interface FaqItem { q: string; a: string; }
interface DemoMsg { from: "customer" | "assistant"; text: string; }
interface Fact    { value: string; label: string; }
interface Feature { title: string; desc: string; }

interface Copy {
  marquee: string[];
  navCta: string;
  langLabel: string;
  // Hero
  chip: string;
  h1Lead: string;
  h1Words: string[];
  subhead: string;
  cta: string;
  ctaNote: string;
  heroTerms: string;
  mockUrl: string;
  mockLabel: string;
  mockSiteName: string;
  mockHeadline: string;
  mockCall: string;
  mockEstimate: string;
  mockChatTitle: string;
  // Combo
  comboWebsite: string;
  comboWebsiteCaption: string;
  comboWebsiteFootL: string;
  comboWebsiteFootR: string;
  comboChat: string;
  comboTerminal: string[];
  comboEquals: string;
  comboResult: string;
  // Facts + included
  facts: Fact[];
  included: string[];
  // Demo (dark)
  demoEyebrow: string;
  demoTitle: string;
  demoSub: string;
  demoWindowLabel: string;
  demoExampleLabel: string;
  demoMessages: DemoMsg[];
  leadAlertLabel: string;
  leadFields: [string, string][];
  demoDisclaimer: string;
  // Problems
  problemsEyebrow: string;
  problemsTitle: string;
  problems: string[];
  resolveA: string;
  resolveB: string;
  // Parts
  partsEyebrow: string;
  partsTitle: string;
  partsSub: string;
  // 24/7 grid (dark)
  shiftEyebrow: string;
  shiftTitle: string;
  shiftStats: Fact[];
  gridLabel: string;
  gridRight: string;
  gridAria: string;
  legendOffice: string;
  legendAfter: string;
  // Why together
  whyTitle: string;
  whyItems: Feature[];
  whyCols: [string, string, string];
  whyRows: { label: string; v: [boolean, boolean, boolean] }[];
  whyYes: string; whyNo: string;
  // Timeline (dark)
  tlEyebrow: string;
  tlTitle: string;
  tlText: string;
  tlBig: string;
  tlBigSuffix: string;
  tlPoints: string[];
  tlNote: string;
  part1Label: string; part1Title: string; part1Text: string;
  part2Label: string; part2Title: string; part2Text: string;
  resultLabel: string; resultTitle: string; resultText: string;
  // Features bento
  featuresEyebrow: string;
  featuresTitle: string;
  featuresSub: string;
  featTerminal: string[];
  features: Feature[];
  // Examples
  examplesEyebrow: string;
  examplesHeading: string;
  examplesSub: string;
  exampleTag: string;
  exampleLabels: [string, string, string];
  // Pricing
  pricingEyebrow: string;
  pricingHeading: string;
  includedTitle: string;
  includedList: string[];
  price: string;
  perMonth: string;
  priceChip: string;
  termsLine: string;
  getStartedBtn: string;
  secureNote: string;
  stepsLabel: string;
  steps: Step[];
  // Compare
  compareEyebrow: string;
  compareTitle: string;
  oldTitle: string; oldItems: string[];
  newTitle: string; newItems: string[];
  // Built for
  builtEyebrow: string;
  builtTitle: string;
  builtSub: string;
  builtFor: string[];
  // FAQ
  faqEyebrow: string;
  faqHeading: string;
  faqItems: FaqItem[];
  // Final
  finalCtaHeading: string;
  finalCtaSub: string;
  footer: string;
  mobileNote: string;
  mobileGet: string;
}

// ── Translations ──────────────────────────────────────────────
const COPY: Record<Lang, Copy> = {
  en: {
    marquee: [
      "Website + bilingual AI chat assistant",
      "$697/month",
      "No setup fee",
      "Built for New Jersey trades",
      "English & Spanish",
    ],
    navCta: "Get started",
    langLabel: "Language",

    chip: "Built for local trades in New Jersey",
    h1Lead: "A website + AI chat assistant for",
    h1Words: ["roofers.", "plumbers.", "electricians.", "HVAC pros."],
    subhead: "Answers website visitors' questions, collects service requests, and sends the details directly to your phone while you're on the job.",
    cta: "Get started — $697/month",
    ctaNote: "No setup fee · 6-month initial term",
    heroTerms: "$697/month. 6-month initial term. Then month-to-month with 30 days' written notice.",
    mockUrl: "example-plumbing.demo",
    mockLabel: "Example site — demo, not a real business",
    mockSiteName: "Example Plumbing Co.",
    mockHeadline: "Emergency plumbing in Hudson County",
    mockCall: "Call now",
    mockEstimate: "Get an estimate",
    mockChatTitle: "Chat assistant",

    comboWebsite: "Website",
    comboWebsiteCaption: "Your trade, online",
    comboWebsiteFootL: "Mobile-ready",
    comboWebsiteFootR: "✓ EN / ES",
    comboChat: "AI chat assistant",
    comboTerminal: [
      "> Hi, I need help with a leaking pipe",
      "Sure. Is it urgent, and what's the ZIP code?",
      "> Urgent. 07093",
      "✓ Request sent to the owner",
    ],
    comboEquals: "Equals",
    comboResult: "Service requests sent to your phone",

    facts: [
      { value: "24/7",    label: "Chat assistant on your site" },
      { value: "EN / ES", label: "Answers in both languages" },
      { value: "48–72h",  label: "To launch, once we have your info" },
      { value: "$0",      label: "Setup fee" },
    ],
    included: [
      "Conversion-focused website",
      "Bilingual AI chat assistant",
      "Hosting & support",
      "Monthly updates",
      "Requests sent to your phone",
      "Your domain & data",
    ],

    demoEyebrow: "See it in action",
    demoTitle: "While you're on the job, the assistant collects the details.",
    demoSub: "The chat assistant on your site answers questions, gathers what you need to know, and sends the request straight to you.",
    demoWindowLabel: "AI Chat Assistant · Website chat",
    demoExampleLabel: "Example conversation — not a live chat",
    demoMessages: [
      { from: "customer",  text: "Hi, I need help with a leaking pipe." },
      { from: "assistant", text: "Sure, we can help. Is this an emergency, and what ZIP code is the property in?" },
      { from: "customer",  text: "It's urgent. 07093." },
      { from: "assistant", text: "Got it. What's the best phone number to reach you?" },
      { from: "customer",  text: "(201) 555-0147" },
      { from: "assistant", text: "Thanks. Your request has been sent to the team. They'll reach out as soon as possible." },
    ],
    leadAlertLabel: "New request sent to owner",
    leadFields: [
      ["Service",  "Emergency Plumbing"],
      ["Location", "07093"],
      ["Urgency",  "Urgent"],
      ["Phone",    "(201) 555-0147"],
    ],
    demoDisclaimer: "The assistant captures and routes requests. Service availability, pricing, and scheduling are confirmed by your team.",

    problemsEyebrow: "Running a trade business is a full-time job…",
    problemsTitle: "Any of this sound familiar?",
    problems: [
      "Website inquiries come in while you're on a roof, under a sink, or driving between jobs.",
      "Spanish-speaking customers land on your site and leave without asking anything.",
      "Your current site is outdated, hard to use on a phone — or you don't have one.",
      "Visitors show up after hours and there's nothing there to take their request.",
      "Requests arrive missing the basics: what they need, where, and how urgent it is.",
    ],
    resolveA: "That's what this system is for. A website and a chat assistant that collect the details",
    resolveB: " while you keep working.",

    partsEyebrow: "Two parts. One system.",
    partsTitle: "Website +\nAI Chat Assistant",
    partsSub: "One system that turns website visitors into service requests — while you're on the job.",

    shiftEyebrow: "After hours, on weekends, mid-job",
    shiftTitle: "Your office closes.\nYour website doesn't.",
    shiftStats: [
      { value: "24/7",    label: "Chat assistant on" },
      { value: "168",     label: "Hours in a week" },
      { value: "123",     label: "Hours outside a 45-hr office week" },
      { value: "EN / ES", label: "Languages it answers in" },
    ],
    gridLabel: "Chat assistant available 24/7",
    gridRight: "7 days × 24 hours",
    gridAria: "Weekly grid of 168 hours: 45 example office hours, and the other 123 hours still covered by the chat assistant.",
    legendOffice: "Example office hours: Mon–Fri, 8am–5pm",
    legendAfter: "After hours — the chat assistant still takes requests",

    whyTitle: "Why a website + chat beats either one alone",
    whyItems: [
      { title: "No website",               desc: "Customers can't see your work or reach you easily." },
      { title: "Website only",             desc: "Visitors see your info, but their questions wait until you're free." },
      { title: "Website + chat assistant", desc: "Visitors get answers and leave a complete request — any hour, in English or Spanish." },
    ],
    whyCols: ["No site", "Website", "Site + chat"],
    whyRows: [
      { label: "Your services & photos online",          v: [false, true,  true] },
      { label: "Call & estimate buttons",                v: [false, true,  true] },
      { label: "Answers questions on the spot",          v: [false, false, true] },
      { label: "Replies in English or Spanish, 24/7",    v: [false, false, true] },
      { label: "Asks for service, ZIP, urgency & phone", v: [false, false, true] },
    ],
    whyYes: "Yes", whyNo: "No",

    tlEyebrow: "From checkout to live",
    tlTitle: "We do the building. You keep working.",
    tlText: "No meetings and no tech work on your side. Send us your info and access, and your website and chat assistant go live — then we keep everything updated.",
    tlBig: "48–72h",
    tlBigSuffix: "to go live",
    tlPoints: ["Checkout", "Your info", "Build", "Live"],
    tlNote: "Timing starts once we receive the info and access we need from you. The curve is illustrative.",
    part1Label: "Part one",
    part1Title: "A website built to turn visits into requests",
    part1Text: "Not a brochure. Designed for phones, with clear call and estimate buttons, a photo gallery of your work, and a layout made for your trade and area.",
    part2Label: "Part two",
    part2Title: "A bilingual AI chat assistant, 24/7",
    part2Text: "Answers visitors on your site in English and Spanish and captures the service needed, ZIP, urgency, name and phone.",
    resultLabel: "The result",
    resultTitle: "Requests with the details, on your phone",
    resultText: "Sent by SMS, WhatsApp, email or another method we agree on — so you know who to call back and why.",

    featuresEyebrow: "What's inside",
    featuresTitle: "Everything a trade website needs",
    featuresSub: "Built, hosted and kept up to date for you — so you can focus on the work.",
    featTerminal: ["> new request", "service: roof leak", "zip: 07093 · urgent", "✓ sent to your phone"],
    features: [
      { title: "Designed for phones",            desc: "Most visitors find local services on their phone. Clean layout, big tap targets, easy to read." },
      { title: "Call & estimate buttons",        desc: "Clear actions on every page so visitors can call you or request an estimate in one tap." },
      { title: "Answers in English & Spanish",   desc: "The chat assistant replies in the visitor's language and gathers service, ZIP, urgency, name and phone." },
      { title: "Requests sent to your phone",    desc: "Qualified requests go straight to you by SMS, WhatsApp or email — no dashboard to check." },
    ],

    examplesEyebrow: "See what your website could look like",
    examplesHeading: "Example trade websites",
    examplesSub: "These are example builds — not results from a specific client — showing how the same system looks for roofing, plumbing, and electrical.",
    exampleTag: "Example · demo",
    exampleLabels: ["Roofing example", "Plumbing example", "Electrical example"],

    pricingEyebrow: "Pricing",
    pricingHeading: "One plan. Everything included.",
    includedTitle: "What's included:",
    includedList: [
      "Conversion-focused website, custom to your trade and area",
      "Bilingual AI chat assistant (24/7)",
      "Mobile design with call & estimate buttons",
      "Photo gallery of your work",
      "Hosting, support and monthly updates",
      "Requests sent to your phone (SMS, WhatsApp or email)",
      "You own your domain and customer data",
    ],
    price: "$697",
    perMonth: "/month",
    priceChip: "No setup fee",
    termsLine: "Billed monthly. 6-month initial term. Then month-to-month. Cancel after the initial term with 30 days' written notice.",
    getStartedBtn: "Get started — $697/month",
    secureNote: "Secure checkout via Stripe",
    stepsLabel: "What happens next",
    steps: [
      { label: "Today",       desc: "You check out and we start building." },
      { label: "48–72 hours", desc: "Your website and chat assistant go live, once we have what we need from you." },
      { label: "Ongoing",     desc: "We handle every update. You handle the requests." },
    ],

    compareEyebrow: "The difference",
    compareTitle: "Without the system vs. with it",
    oldTitle: "Without it",
    oldItems: [
      "Inquiries slip by while you're working",
      "English-only site, Spanish speakers leave",
      "Requests with no details to act on",
      "An outdated site you have to manage",
    ],
    newTitle: "With NJ Business Web",
    newItems: [
      "The chat assistant collects requests 24/7",
      "Answers in English and Spanish",
      "Service, ZIP, urgency and phone in every request",
      "We handle hosting, updates and support",
    ],

    builtEyebrow: "Who is this for?",
    builtTitle: "Built for local trade businesses",
    builtSub: "If customers call you to fix, install or repair something, this was made for you.",
    builtFor: ["Roofers", "Plumbers", "Electricians", "HVAC", "General contractors", "Remodelers", "Painters", "Landscapers", "Handymen", "Cleaning services", "Flooring", "Masonry"],

    faqEyebrow: "Got questions?",
    faqHeading: "Got questions? We've got answers",
    faqItems: [
      { q: "Do I need to talk to someone first?", a: "No, you can get started right here. Everything is handled online — no sales calls or demos required." },
      { q: "How long does it take to go live?", a: "48–72 hours after we receive the information and access we need from you to build it — not from the moment of payment." },
      { q: "What if I want changes later?", a: "Included in your monthly plan. Just message us and we handle it — no extra charge for reasonable changes." },
      { q: "Can it work in Spanish?", a: "Yes. The chat assistant can respond in English and Spanish based on the visitor's language." },
      { q: "Where do my leads go?", a: "Qualified requests can be sent by SMS, WhatsApp, email, or another agreed method." },
      { q: "Do I own my domain and customer data?", a: "Yes. You own your domain and the lead information generated for your business." },
      { q: "Can I cancel?", a: "The service has a 6-month initial term. After that, it continues month-to-month and can be canceled with 30 days' written notice." },
      { q: "Will this bring me more traffic or customers?", a: "The chat assistant responds to and qualifies visitors who already reach your website. It does not generate traffic on its own — ad spend and campaign management are not included." },
      { q: "What's not included?", a: "Ad spend, Google Ads management, Local Services Ads, extensive SEO campaigns, custom CRM development, advanced integrations, unlimited redesigns, and chatbot usage beyond plan limits are not included unless agreed in writing." },
    ],

    finalCtaHeading: "Ready to get your website and chat assistant live?",
    finalCtaSub: "Start today. Your site and chat assistant go live 48–72 hours after we have what we need from you.",
    footer: `© ${new Date().getFullYear()} NJ Business Web. All rights reserved.`,
    mobileNote: "6-month term · 30-day notice",
    mobileGet: "Get started",
  },

  es: {
    marquee: [
      "Sitio web + asistente de chat IA bilingüe",
      "$697/mes",
      "Sin costo de instalación",
      "Hecho para oficios en Nueva Jersey",
      "Inglés y español",
    ],
    navCta: "Comenzar",
    langLabel: "Idioma",

    chip: "Hecho para oficios locales en Nueva Jersey",
    h1Lead: "Un sitio web + asistente de chat IA para",
    h1Words: ["techadores.", "plomeros.", "electricistas.", "técnicos HVAC."],
    subhead: "Responde las preguntas de quienes visitan tu sitio, recopila solicitudes de servicio y te envía los detalles directo al teléfono mientras trabajas.",
    cta: "Comenzar — $697/mes",
    ctaNote: "Sin costo de instalación · Término inicial de 6 meses",
    heroTerms: "$697/mes. Término inicial de 6 meses. Luego mes a mes con 30 días de aviso por escrito.",
    mockUrl: "plomeria-ejemplo.demo",
    mockLabel: "Sitio de ejemplo — demo, no es un negocio real",
    mockSiteName: "Plomería Ejemplo",
    mockHeadline: "Plomería de emergencia en Hudson County",
    mockCall: "Llamar",
    mockEstimate: "Pedir presupuesto",
    mockChatTitle: "Asistente de chat",

    comboWebsite: "Sitio web",
    comboWebsiteCaption: "Tu oficio, en línea",
    comboWebsiteFootL: "Listo para celular",
    comboWebsiteFootR: "✓ EN / ES",
    comboChat: "Asistente de chat IA",
    comboTerminal: [
      "> Hola, necesito ayuda con una tubería que gotea",
      "Claro. ¿Es urgente y en qué ZIP code está?",
      "> Urgente. 07093",
      "✓ Solicitud enviada al dueño",
    ],
    comboEquals: "Igual a",
    comboResult: "Solicitudes de servicio enviadas a tu teléfono",

    facts: [
      { value: "24/7",    label: "Asistente de chat en tu sitio" },
      { value: "EN / ES", label: "Responde en ambos idiomas" },
      { value: "48–72h",  label: "Para lanzar, una vez que tengamos tu información" },
      { value: "$0",      label: "Costo de instalación" },
    ],
    included: [
      "Sitio web enfocado en conversión",
      "Asistente de chat IA bilingüe",
      "Hosting y soporte",
      "Actualizaciones mensuales",
      "Solicitudes enviadas a tu teléfono",
      "Tu dominio y tus datos",
    ],

    demoEyebrow: "Velo en acción",
    demoTitle: "Mientras trabajas, el asistente recopila los detalles.",
    demoSub: "El asistente de chat en tu sitio responde preguntas, recopila lo que necesitas saber y te envía la solicitud directamente.",
    demoWindowLabel: "Asistente de Chat IA · Chat del sitio",
    demoExampleLabel: "Conversación de ejemplo — no es un chat en vivo",
    demoMessages: [
      { from: "customer",  text: "Hola, necesito ayuda con una tubería que gotea." },
      { from: "assistant", text: "Claro, podemos ayudar. ¿Es una emergencia y en qué ZIP code está la propiedad?" },
      { from: "customer",  text: "Es urgente. 07093." },
      { from: "assistant", text: "Entendido. ¿Cuál es el mejor número de teléfono para contactarte?" },
      { from: "customer",  text: "(201) 555-0147" },
      { from: "assistant", text: "Gracias. Tu solicitud ha sido enviada al equipo. Te contactarán lo antes posible." },
    ],
    leadAlertLabel: "Nueva solicitud enviada al propietario",
    leadFields: [
      ["Servicio",  "Plomería de emergencia"],
      ["Ubicación", "07093"],
      ["Urgencia",  "Urgente"],
      ["Teléfono",  "(201) 555-0147"],
    ],
    demoDisclaimer: "El asistente captura y enruta las solicitudes. Tu equipo confirma disponibilidad, precios y horarios.",

    problemsEyebrow: "Llevar un negocio de oficios es trabajo de tiempo completo…",
    problemsTitle: "¿Te suena familiar algo de esto?",
    problems: [
      "Las consultas de tu sitio llegan mientras estás en un techo, debajo de un lavamanos o manejando entre trabajos.",
      "Clientes que hablan español entran a tu sitio y se van sin preguntar nada.",
      "Tu sitio actual está desactualizado, es difícil de usar en el celular — o no tienes uno.",
      "Llegan visitas fuera de horario y no hay nada que tome su solicitud.",
      "Las solicitudes llegan sin lo básico: qué necesitan, dónde y qué tan urgente es.",
    ],
    resolveA: "Para eso es este sistema. Un sitio web y un asistente de chat que recopilan los detalles",
    resolveB: " mientras tú sigues trabajando.",

    partsEyebrow: "Dos partes. Un sistema.",
    partsTitle: "Sitio web +\nAsistente de chat IA",
    partsSub: "Un sistema que convierte visitas de tu sitio en solicitudes de servicio — mientras estás trabajando.",

    shiftEyebrow: "Fuera de horario, fines de semana, en pleno trabajo",
    shiftTitle: "Tu oficina cierra.\nTu sitio web no.",
    shiftStats: [
      { value: "24/7",    label: "Asistente de chat activo" },
      { value: "168",     label: "Horas en una semana" },
      { value: "123",     label: "Horas fuera de una semana de oficina de 45 h" },
      { value: "EN / ES", label: "Idiomas en los que responde" },
    ],
    gridLabel: "Asistente de chat disponible 24/7",
    gridRight: "7 días × 24 horas",
    gridAria: "Cuadrícula semanal de 168 horas: 45 horas de oficina de ejemplo y las otras 123 horas también cubiertas por el asistente de chat.",
    legendOffice: "Horario de oficina de ejemplo: lun–vie, 8am–5pm",
    legendAfter: "Fuera de horario — el asistente sigue tomando solicitudes",

    whyTitle: "Por qué un sitio + chat le gana a cada uno por separado",
    whyItems: [
      { title: "Sin sitio web",                 desc: "Los clientes no pueden ver tu trabajo ni contactarte fácilmente." },
      { title: "Solo sitio web",                desc: "Los visitantes ven tu información, pero sus preguntas esperan hasta que estés libre." },
      { title: "Sitio web + asistente de chat", desc: "Los visitantes reciben respuestas y dejan una solicitud completa — a cualquier hora, en inglés o español." },
    ],
    whyCols: ["Sin sitio", "Sitio web", "Sitio + chat"],
    whyRows: [
      { label: "Tus servicios y fotos en línea",          v: [false, true,  true] },
      { label: "Botones de llamada y presupuesto",        v: [false, true,  true] },
      { label: "Responde preguntas al instante",          v: [false, false, true] },
      { label: "Responde en inglés o español, 24/7",      v: [false, false, true] },
      { label: "Pide servicio, ZIP, urgencia y teléfono", v: [false, false, true] },
    ],
    whyYes: "Sí", whyNo: "No",

    tlEyebrow: "Del pago a tu sitio activo",
    tlTitle: "Nosotros construimos. Tú sigues trabajando.",
    tlText: "Sin reuniones ni trabajo técnico de tu lado. Envíanos tu información y accesos, y tu sitio y asistente de chat quedan activos — luego mantenemos todo actualizado.",
    tlBig: "48–72h",
    tlBigSuffix: "para estar activo",
    tlPoints: ["Pago", "Tu info", "Construcción", "Activo"],
    tlNote: "El tiempo empieza cuando recibimos la información y accesos que necesitamos de ti. La curva es ilustrativa.",
    part1Label: "Parte uno",
    part1Title: "Un sitio web hecho para convertir visitas en solicitudes",
    part1Text: "No es un folleto. Diseñado para celular, con botones claros de llamada y presupuesto, galería de fotos de tu trabajo y un diseño hecho para tu oficio y tu zona.",
    part2Label: "Parte dos",
    part2Title: "Un asistente de chat IA bilingüe, 24/7",
    part2Text: "Responde a quienes visitan tu sitio en inglés y español y captura el servicio, ZIP, urgencia, nombre y teléfono.",
    resultLabel: "El resultado",
    resultTitle: "Solicitudes con los detalles, en tu teléfono",
    resultText: "Enviadas por SMS, WhatsApp, correo u otro método que acordemos — para que sepas a quién llamar y por qué.",

    featuresEyebrow: "Qué incluye",
    featuresTitle: "Todo lo que necesita el sitio de un oficio",
    featuresSub: "Lo construimos, lo alojamos y lo mantenemos al día por ti — para que te enfoques en tu trabajo.",
    featTerminal: ["> nueva solicitud", "servicio: gotera en techo", "zip: 07093 · urgente", "✓ enviada a tu teléfono"],
    features: [
      { title: "Diseñado para celular",           desc: "La mayoría busca servicios locales desde el celular. Diseño limpio, botones grandes, fácil de leer." },
      { title: "Botones de llamada y presupuesto", desc: "Acciones claras en cada página para que te llamen o pidan un presupuesto con un toque." },
      { title: "Responde en inglés y español",    desc: "El asistente responde en el idioma del visitante y recopila servicio, ZIP, urgencia, nombre y teléfono." },
      { title: "Solicitudes a tu teléfono",       desc: "Las solicitudes calificadas te llegan directo por SMS, WhatsApp o correo — sin paneles que revisar." },
    ],

    examplesEyebrow: "Mira cómo podría verse tu sitio web",
    examplesHeading: "Sitios web de ejemplo para oficios",
    examplesSub: "Estos son sitios de ejemplo — no resultados de un cliente específico — que muestran cómo se ve el mismo sistema para techado, plomería y electricidad.",
    exampleTag: "Ejemplo · demo",
    exampleLabels: ["Ejemplo techado", "Ejemplo plomería", "Ejemplo eléctrico"],

    pricingEyebrow: "Precio",
    pricingHeading: "Un plan. Todo incluido.",
    includedTitle: "Qué incluye:",
    includedList: [
      "Sitio web enfocado en conversión, hecho para tu oficio y zona",
      "Asistente de chat IA bilingüe (24/7)",
      "Diseño para celular con botones de llamada y presupuesto",
      "Galería de fotos de tu trabajo",
      "Hosting, soporte y actualizaciones mensuales",
      "Solicitudes enviadas a tu teléfono (SMS, WhatsApp o correo)",
      "Eres dueño de tu dominio y de los datos de tus clientes",
    ],
    price: "$697",
    perMonth: "/mes",
    priceChip: "Sin costo de instalación",
    termsLine: "Cobro mensual. Término inicial de 6 meses. Luego mes a mes. Cancela después del término inicial con 30 días de aviso por escrito.",
    getStartedBtn: "Comenzar — $697/mes",
    secureNote: "Pago seguro con Stripe",
    stepsLabel: "Qué pasa después",
    steps: [
      { label: "Hoy",           desc: "Haces el pago y empezamos a construir." },
      { label: "48–72 horas",   desc: "Tu sitio y asistente de chat quedan activos, una vez que tenemos lo que necesitamos de ti." },
      { label: "Continuamente", desc: "Nosotros manejamos cada actualización. Tú atiendes las solicitudes." },
    ],

    compareEyebrow: "La diferencia",
    compareTitle: "Sin el sistema vs. con él",
    oldTitle: "Sin el sistema",
    oldItems: [
      "Se pierden consultas mientras trabajas",
      "Sitio solo en inglés, los hispanohablantes se van",
      "Solicitudes sin detalles para actuar",
      "Un sitio desactualizado que tienes que manejar",
    ],
    newTitle: "Con NJ Business Web",
    newItems: [
      "El asistente recopila solicitudes 24/7",
      "Responde en inglés y español",
      "Servicio, ZIP, urgencia y teléfono en cada solicitud",
      "Nosotros manejamos hosting, actualizaciones y soporte",
    ],

    builtEyebrow: "¿Para quién es?",
    builtTitle: "Hecho para negocios de oficios locales",
    builtSub: "Si tus clientes te llaman para arreglar, instalar o reparar algo, esto fue hecho para ti.",
    builtFor: ["Techadores", "Plomeros", "Electricistas", "HVAC", "Contratistas generales", "Remodelación", "Pintores", "Jardinería", "Handyman", "Limpieza", "Pisos", "Albañilería"],

    faqEyebrow: "¿Tienes preguntas?",
    faqHeading: "¿Preguntas? Tenemos respuestas",
    faqItems: [
      { q: "¿Necesito hablar con alguien primero?", a: "No, puedes empezar aquí mismo. Todo se maneja en línea — sin llamadas de ventas ni demos." },
      { q: "¿Cuánto tarda en estar listo mi sitio?", a: "48–72 horas después de recibir la información y los accesos que necesitamos de ti para construirlo — no desde el momento del pago." },
      { q: "¿Qué pasa si quiero cambios después?", a: "Incluido en tu plan mensual. Solo escríbenos y lo resolvemos — sin costo extra por cambios razonables." },
      { q: "¿Puede funcionar en español?", a: "Sí. El asistente de chat puede responder en inglés y español según el idioma del visitante." },
      { q: "¿A dónde van mis clientes potenciales?", a: "Las solicitudes calificadas pueden enviarse por SMS, WhatsApp, correo electrónico u otro método acordado." },
      { q: "¿Soy dueño de mi dominio y los datos de mis clientes?", a: "Sí. Eres dueño de tu dominio y de la información de los clientes potenciales generada para tu negocio." },
      { q: "¿Puedo cancelar?", a: "El servicio tiene un término inicial de 6 meses. Después, continúa mes a mes y puede cancelarse con 30 días de aviso por escrito." },
      { q: "¿Esto me trae más tráfico o clientes?", a: "El asistente de chat responde y califica a los visitantes que ya llegan a tu sitio. No genera tráfico por sí solo — el gasto en anuncios y la gestión de campañas no están incluidos." },
      { q: "¿Qué no está incluido?", a: "Gasto en anuncios, gestión de Google Ads, Local Services Ads, campañas de SEO extensas, desarrollo de CRM personalizado, integraciones avanzadas, rediseños ilimitados y uso del chatbot más allá de los límites del plan no están incluidos salvo acuerdo por escrito." },
    ],

    finalCtaHeading: "¿Listo para activar tu sitio web y asistente de chat?",
    finalCtaSub: "Empieza hoy. Tu sitio y asistente de chat quedan activos 48–72 horas después de recibir lo que necesitamos de ti.",
    footer: `© ${new Date().getFullYear()} NJ Business Web. Todos los derechos reservados.`,
    mobileNote: "Término 6 meses · Aviso 30 días",
    mobileGet: "Comenzar",
  },
};

// ── Styles (scoped under .ts) ─────────────────────────────────
const CSS = `
.ts{--cream:#FAF7EF;--cream2:#F2EEE2;--card:#FCFAF5;--ink:#0B2418;--ink2:#14382A;--body:#5E665A;--muted:#8A9184;--line:rgba(11,36,24,.14);--lime:#CDEBA6;--leaf:#3E6B4F;--shadow:#D3DFC8;
  background:var(--cream);color:var(--body);font-family:'Schibsted Grotesk',system-ui,-apple-system,sans-serif;min-height:100vh;overflow-x:hidden;-webkit-font-smoothing:antialiased;font-size:16px;line-height:1.55}
.ts *,.ts *::before,.ts *::after{box-sizing:border-box}
.ts p{margin:0}
.ts-sr{position:absolute;width:1px;height:1px;padding:0;margin:-1px;overflow:hidden;clip:rect(0,0,0,0);white-space:nowrap;border:0}
.ts-mono{font-family:'JetBrains Mono',ui-monospace,SFMono-Regular,Menlo,monospace;text-transform:uppercase;letter-spacing:.12em;font-size:11px;font-weight:500}
.ts-dots{background-image:radial-gradient(rgba(11,36,24,.14) 1px,transparent 1.3px);background-size:18px 18px}
.ts-wrap{max-width:1180px;margin:0 auto;padding:0 24px}
.ts-sec{padding:112px 0}
.ts-h1{font-weight:600;color:var(--ink);font-size:clamp(40px,6.6vw,80px);line-height:1.03;letter-spacing:-.045em;margin:0}
.ts-h2{font-weight:500;color:var(--ink);font-size:clamp(32px,4.4vw,52px);line-height:1.07;letter-spacing:-.035em;margin:0}
.ts-h3{font-weight:500;color:var(--ink);font-size:21px;line-height:1.2;letter-spacing:-.015em;margin:0}
.ts-eyebrow{font-size:13px;color:var(--body);margin:0 0 18px}
.ts-lead{font-size:18px;line-height:1.6;color:var(--body)}
.ts-btn{display:inline-flex;align-items:center;justify-content:center;gap:12px;background:var(--ink);color:var(--cream);padding:16px 24px;font-weight:500;font-size:15px;line-height:1;text-decoration:none;border:1px solid var(--ink);cursor:pointer;transition:transform .15s ease,box-shadow .15s ease}
.ts-btn:hover{transform:translate(-2px,-2px);box-shadow:4px 4px 0 var(--leaf)}
.ts-btn--light{background:var(--cream);color:var(--ink);border-color:var(--cream)}
.ts-btn--light:hover{box-shadow:4px 4px 0 var(--lime)}
.ts-btn--sm{padding:11px 16px;font-size:13px}
.ts a:focus-visible,.ts button:focus-visible{outline:2px solid var(--leaf);outline-offset:3px}
.ts-dark a:focus-visible,.ts-dark button:focus-visible{outline-color:var(--lime)}
.ts-card{background:var(--card);border:1px solid var(--line);box-shadow:6px 6px 0 var(--shadow)}
.ts-dark{background:var(--ink);color:#B4C3B0}
.ts-dark .ts-h2,.ts-dark .ts-h3{color:var(--cream)}
.ts-dark .ts-eyebrow{color:#9DB09A}

/* Top marquee + nav */
.ts-topbar{background:var(--ink);color:var(--cream);padding:9px 0}
.ts-marquee{overflow:hidden}
.ts-track{display:flex;width:max-content;animation:ts-scroll 40s linear infinite}
.ts-track--slow{animation-duration:60s}
.ts-topbar .ts-item{padding:0 22px;white-space:nowrap}
.ts-topbar .ts-item::after{content:"+";margin-left:44px;opacity:.6}
@keyframes ts-scroll{to{transform:translateX(-50%)}}
.ts-nav{position:sticky;top:0;z-index:50;background:rgba(250,247,239,.92);backdrop-filter:blur(8px);-webkit-backdrop-filter:blur(8px);border-bottom:1px solid var(--line)}
.ts-nav-in{display:flex;align-items:center;justify-content:space-between;gap:16px;height:64px}
.ts-logo{display:flex;align-items:center;gap:10px;color:var(--ink);font-weight:600;font-size:18px;letter-spacing:-.02em;text-decoration:none}
.ts-logo-txt{display:flex;flex-direction:column;line-height:1}
.ts-logo-word{font-size:19px;font-weight:700;letter-spacing:.01em}
.ts-logo-word span{font-weight:400;color:#3E6B4F}
.ts-logo-tag{font-size:8.5px;font-weight:500;letter-spacing:.24em;text-transform:uppercase;color:var(--body);margin-top:5px}
.ts-nav-r{display:flex;align-items:center;gap:14px}
.ts-lang{display:flex;border:1px solid var(--line)}
.ts-lang button{background:transparent;border:0;padding:8px 11px;cursor:pointer;color:var(--body);font-family:'JetBrains Mono',ui-monospace,monospace;font-size:11px;font-weight:500;letter-spacing:.1em}
.ts-lang button[aria-pressed="true"]{background:var(--ink);color:var(--cream)}

/* Hero */
.ts-hero{padding:72px 0 96px;text-align:center;border-bottom:1px solid var(--line)}
.ts-chip{display:inline-flex;align-items:center;gap:10px;border:1px solid var(--line);background:var(--card);padding:8px 14px;color:var(--ink)}
.ts-chip i{width:7px;height:7px;background:var(--leaf);display:inline-block}
.ts-typed{color:var(--ink);white-space:nowrap}
.ts-caret{display:inline-block;width:3px;height:.82em;background:var(--ink);margin-left:4px;vertical-align:-.04em;animation:ts-blink 1s steps(1) infinite}
@keyframes ts-blink{50%{opacity:0}}
.ts-hero .ts-lead{max-width:600px;margin:26px auto 0}
.ts-hero-ctas{margin-top:34px;display:flex;flex-direction:column;align-items:center;gap:14px}
.ts-terms{font-size:13px;color:var(--muted);max-width:520px;margin:0 auto}

/* Hero mock */
.ts-mock{max-width:960px;margin:56px auto 0;text-align:left}
.ts-mock-bar{display:flex;align-items:center;gap:12px;padding:10px 14px;border-bottom:1px solid var(--line)}
.ts-mock-bar span.d{width:9px;height:9px;border:1px solid var(--line);border-radius:50%;display:inline-block}
.ts-mock-url{flex:1;text-align:center;color:var(--muted)}
.ts-mock-body{display:grid;grid-template-columns:1.35fr 1fr;gap:0;min-height:360px}
.ts-mock-site{padding:22px;border-right:1px solid var(--line)}
.ts-mock-hero{background:var(--ink);color:var(--cream);padding:28px 24px;margin-top:14px}
.ts-mock-hero h4{margin:0;font-size:24px;line-height:1.15;font-weight:600;letter-spacing:-.02em;max-width:300px}
.ts-mock-btns{display:flex;gap:8px;margin-top:18px;flex-wrap:wrap}
.ts-mock-btns span{padding:8px 12px;font-size:12px;font-weight:500}
.ts-bar{height:9px;background:var(--cream2);margin-top:10px}
.ts-mock-gal{display:grid;grid-template-columns:repeat(3,1fr);gap:8px;margin-top:16px}
.ts-mock-gal div{aspect-ratio:4/3;background:var(--shadow)}
.ts-mock-chat{display:flex;flex-direction:column;background:var(--cream2)}
.ts-mock-chat-h{display:flex;align-items:center;gap:8px;padding:12px 16px;border-bottom:1px solid var(--line);color:var(--ink)}
.ts-mock-msgs{padding:16px;display:flex;flex-direction:column;gap:10px;flex:1}
.ts-bub{max-width:86%;padding:9px 12px;font-size:13px;line-height:1.45}
.ts-bub--c{align-self:flex-end;background:var(--ink);color:var(--cream)}
.ts-bub--a{align-self:flex-start;background:var(--card);color:var(--ink);border:1px solid var(--line)}
.ts-mock-cap{text-align:center;color:var(--muted);margin-top:18px}

/* Combo */
.ts-combo{display:grid;grid-template-columns:1fr 56px 1fr;align-items:stretch}
.ts-op{display:flex;align-items:center;justify-content:center;font-size:30px;color:var(--leaf);font-weight:300}
.ts-combo-card{padding:16px}
.ts-combo-head{display:flex;justify-content:space-between;align-items:center;color:var(--ink);margin-bottom:14px}
.ts-combo-head span.d{display:inline-flex;gap:5px}
.ts-combo-head span.d i{width:7px;height:7px;border:1px solid var(--line);border-radius:50%;display:inline-block}
.ts-pkg{background:var(--ink);height:150px;display:flex;align-items:center;justify-content:center;color:var(--cream);font-weight:500;background-image:radial-gradient(rgba(205,235,166,.22) 1px,transparent 1.3px);background-size:6px 6px}
.ts-pkg span{background:var(--ink);padding:4px 10px}
.ts-combo-foot{display:flex;justify-content:space-between;margin-top:14px;font-size:13px;color:var(--body);border-top:1px solid var(--line);padding-top:12px}
.ts-term{background:var(--ink);padding:16px;font-family:'JetBrains Mono',ui-monospace,monospace;font-size:12.5px;line-height:1.7;color:#C7D4C3;min-height:150px}
.ts-term .u{color:var(--cream)}
.ts-term .ok{color:var(--lime)}
.ts-equals{margin-top:20px;background:var(--ink);color:var(--cream);padding:22px 26px;display:flex;align-items:center;justify-content:space-between;gap:20px;box-shadow:6px 6px 0 var(--shadow)}
.ts-equals strong{display:block;font-size:clamp(20px,2.4vw,28px);font-weight:500;letter-spacing:-.02em;margin-top:6px}
.ts-equals .ts-mono{color:#9DB09A}
.ts-equals svg{flex:1;max-width:420px;height:60px}

/* Facts */
.ts-facts{display:grid;grid-template-columns:repeat(4,1fr);gap:1px;background:var(--line);border-top:1px solid var(--line);border-bottom:1px solid var(--line)}
.ts-fact{background:var(--cream);padding:30px 24px}
.ts-fact b{display:block;color:var(--ink);font-weight:500;font-size:clamp(30px,3.6vw,44px);letter-spacing:-.035em;line-height:1}
.ts-fact span{display:block;margin-top:10px;font-size:14px;color:var(--body)}

/* Numbered included marquee */
.ts-incl{border-bottom:1px solid var(--line);padding:26px 0}
.ts-incl .ts-item{display:flex;align-items:baseline;gap:10px;padding:0 34px;white-space:nowrap;color:var(--ink);font-size:clamp(20px,2.4vw,28px);font-weight:500;letter-spacing:-.02em}
.ts-incl .ts-item sup{font-family:'JetBrains Mono',ui-monospace,monospace;font-size:11px;color:var(--muted);letter-spacing:.08em}

/* Dark demo */
.ts-split{display:grid;grid-template-columns:1fr 1fr;gap:64px;align-items:start}
.ts-chatwin{background:#0F2E1F;border:1px solid rgba(250,247,239,.12)}
.ts-chatwin-h{display:flex;align-items:center;gap:10px;padding:12px 16px;border-bottom:1px solid rgba(250,247,239,.12);color:#C7D4C3}
.ts-chatwin .ts-msgs{padding:20px 16px;display:flex;flex-direction:column;gap:12px}
.ts-chatwin .ts-bub--c{background:var(--cream);color:var(--ink)}
.ts-chatwin .ts-bub--a{background:#1B4330;color:var(--cream);border:1px solid rgba(205,235,166,.2)}
.ts-tag{display:inline-block;border:1px solid rgba(205,235,166,.35);color:var(--lime);padding:6px 10px;margin-bottom:14px}
.ts-alert{border:1px solid rgba(205,235,166,.45);padding:20px 22px;margin-top:20px;background:rgba(205,235,166,.05)}
.ts-alert-h{display:flex;align-items:center;gap:10px;color:var(--lime);margin-bottom:16px}
.ts-alert dl{display:grid;grid-template-columns:auto 1fr;gap:8px 22px;margin:0}
.ts-alert dt{color:#9DB09A;font-size:13px}
.ts-alert dd{margin:0;color:var(--cream);font-weight:500}
.ts-dot{width:8px;height:8px;background:var(--lime);display:inline-block}
.ts-pulse{animation:ts-pulse 1.4s ease-in-out infinite}
@keyframes ts-pulse{50%{opacity:.25}}
.ts-disc{font-size:13px;color:#9DB09A;margin-top:14px;line-height:1.6}

/* Problems */
.ts-x{list-style:none;margin:0;padding:0}
.ts-x li{display:grid;grid-template-columns:22px 1fr;gap:14px;padding:20px 0;border-top:1px solid var(--line);color:var(--ink);font-size:16px;line-height:1.5}
.ts-x li:last-child{border-bottom:1px solid var(--line)}
.ts-x li span.m{color:var(--leaf);font-size:15px;line-height:1.5}
.ts-resolve{font-size:clamp(26px,3.4vw,40px);line-height:1.15;letter-spacing:-.03em;font-weight:500;color:var(--ink);max-width:900px;margin-top:88px}
.ts-resolve em{font-style:normal;color:#A9B6A3}

/* Parts */
.ts-parts{display:grid;grid-template-columns:1fr 40px 1fr 40px 1fr;align-items:stretch;margin-top:52px}
.ts-part{padding:26px;display:flex;flex-direction:column;gap:12px}
.ts-part .ts-mono{color:var(--muted)}
.ts-part p{font-size:15px}
.ts-part--res{background:var(--ink);border-color:var(--ink);color:#B4C3B0}
.ts-part--res .ts-mono{color:var(--lime)}
.ts-part--res .ts-h3{color:var(--cream)}
.ts-ill{height:92px;border:1px solid var(--line);background:var(--cream2);display:flex;align-items:center;justify-content:center;margin-bottom:6px}

/* Features bento */
.ts-bento{display:grid;grid-template-columns:1fr 1fr;gap:28px;margin-top:52px}
.ts-feat{padding:20px}
.ts-feat-ill{height:170px;background:var(--cream2);border:1px solid var(--line);margin-bottom:20px;display:flex;align-items:center;justify-content:center;padding:18px;overflow:hidden}
.ts-feat p{margin-top:8px;font-size:15px}

/* Examples */
.ts-examples{display:grid;grid-template-columns:repeat(3,1fr);gap:28px;margin-top:52px}
.ts-ex-h{display:flex;justify-content:space-between;align-items:center;gap:10px;padding:12px 14px;border-bottom:1px solid var(--line);color:var(--ink)}
.ts-ex-h .ts-mono{color:var(--muted)}
.ts-examples video{width:100%;display:block;aspect-ratio:9/12;object-fit:cover;background:var(--ink)}

/* Pricing */
.ts-price{display:grid;grid-template-columns:1.1fr 1fr;margin-top:52px}
.ts-price-l{padding:40px}
.ts-check{list-style:none;margin:22px 0 0;padding:0}
.ts-check li{display:grid;grid-template-columns:22px 1fr;gap:12px;padding:13px 0;border-top:1px solid var(--line);color:var(--ink);font-size:15px}
.ts-check li:last-child{border-bottom:1px solid var(--line)}
.ts-check li span.m{color:var(--leaf)}
.ts-price-r{background:var(--ink);color:#B4C3B0;padding:44px 40px;display:flex;flex-direction:column;justify-content:center;gap:18px}
.ts-price-r .big{color:var(--cream);font-size:clamp(52px,6vw,72px);font-weight:500;letter-spacing:-.045em;line-height:1}
.ts-price-r .big small{font-size:22px;letter-spacing:-.01em;color:#B4C3B0;font-weight:400;margin-left:4px}
.ts-pchip{align-self:flex-start;background:var(--lime);color:var(--ink);padding:6px 10px}
.ts-steps{display:grid;grid-template-columns:repeat(3,1fr);gap:28px;margin-top:64px}
.ts-step{border-top:1px solid var(--ink);padding-top:18px}
.ts-step .ts-mono{color:var(--muted)}
.ts-step b{display:block;color:var(--ink);font-weight:500;font-size:20px;letter-spacing:-.015em;margin:10px 0 6px}
.ts-step p{font-size:15px}

/* Compare */
.ts-compare{display:grid;grid-template-columns:1fr 1fr;gap:28px;margin-top:52px}
.ts-cmp{padding:32px}
.ts-cmp ul{list-style:none;margin:20px 0 0;padding:0}
.ts-cmp li{display:grid;grid-template-columns:22px 1fr;gap:12px;padding:14px 0;border-top:1px solid var(--line);font-size:15px}
.ts-cmp--old{background:var(--cream);border:1px solid var(--line)}
.ts-cmp--old li{color:var(--body)}
.ts-cmp--old .ts-h3{color:var(--body)}
.ts-cmp--new{background:var(--ink);box-shadow:6px 6px 0 var(--shadow)}
.ts-cmp--new .ts-h3{color:var(--cream)}
.ts-cmp--new li{color:var(--cream);border-top-color:rgba(250,247,239,.14)}
.ts-cmp--new li span.m{color:var(--lime)}

/* Built for chips */
.ts-chips{display:flex;gap:12px;padding:0 6px}
.ts-chips span{border:1px solid var(--line);background:var(--card);padding:11px 16px;color:var(--ink);white-space:nowrap}

/* FAQ */
.ts-faq{list-style:none;margin:0;padding:0}
.ts-faq li{border-top:1px solid var(--line)}
.ts-faq li:last-child{border-bottom:1px solid var(--line)}
.ts-faq button{width:100%;display:flex;justify-content:space-between;align-items:center;gap:20px;background:none;border:0;padding:20px 0;text-align:left;cursor:pointer;color:var(--ink);font:inherit;font-size:17px;font-weight:500}
.ts-faq .pl{font-size:22px;font-weight:300;color:var(--leaf);transition:transform .2s ease;flex-shrink:0}
.ts-faq button[aria-expanded="true"] .pl{transform:rotate(45deg)}
.ts-faq .ans{padding:0 40px 22px 0;font-size:15px;line-height:1.65}

/* Final + footer */
.ts-final{text-align:center;padding:120px 0}
.ts-final .ts-h2{max-width:820px;margin:0 auto}
.ts-final p.sub{max-width:560px;margin:20px auto 0;color:#B4C3B0;font-size:17px}
.ts-footer{padding:26px 0;font-size:13px}
.ts-footer .ts-wrap{display:flex;justify-content:space-between;gap:16px;flex-wrap:wrap}
.ts-footer b{color:var(--ink);font-weight:600}

/* Mobile sticky bar */
.ts-mobilebar{display:none;position:fixed;left:0;right:0;bottom:0;z-index:60;background:var(--cream);border-top:1px solid var(--line);padding:12px 16px;align-items:center;justify-content:space-between;gap:12px}
.ts-mobilebar b{color:var(--ink);font-size:20px;font-weight:600;letter-spacing:-.02em}

/* Combo: deeper offset shadow like the reference */
.ts-combo .ts-card,.ts-equals{box-shadow:7px 7px 0 #7F9C84}

/* Big parts title */
.ts-display{font-weight:600;color:var(--ink);font-size:clamp(44px,7vw,84px);line-height:1;letter-spacing:-.05em;margin:0}

/* 24/7 grid section */
.ts-stats{display:grid;grid-template-columns:repeat(4,1fr);border-top:1px solid rgba(250,247,239,.14);margin-top:56px}
.ts-stat{padding:22px 20px 0;border-right:1px solid rgba(250,247,239,.14)}
.ts-stat:first-child{padding-left:0}
.ts-stat:last-child{border-right:0}
.ts-stat b{display:block;color:var(--cream);font-size:clamp(34px,4.4vw,56px);font-weight:600;letter-spacing:-.04em;line-height:1}
.ts-stat span{display:block;margin-top:10px;color:#9DB09A}
.ts-gridcard{border:1px solid rgba(250,247,239,.16);padding:20px;margin-top:48px}
.ts-gridhead{display:flex;justify-content:space-between;gap:12px;color:var(--lime);margin-bottom:16px;flex-wrap:wrap}
.ts-gridhead>span:first-child{display:inline-flex;align-items:center;gap:8px}
.ts-grid{display:grid;grid-template-columns:repeat(24,1fr);gap:5px}
.ts-cell{--bg:#24492F;aspect-ratio:1;background:var(--bg)}
.ts-cell.o{--bg:#6F8F74}
.ts-cell.sw{animation:ts-sweep 5.28s linear infinite;animation-delay:calc(var(--c) * .22s)}
@keyframes ts-sweep{0%,4%{background-color:#CDEBA6}14%,100%{background-color:var(--bg)}}
.ts-axis{display:flex;justify-content:space-between;color:#9DB09A;margin-top:12px;font-size:10px}
.ts-legend{display:flex;gap:22px;flex-wrap:wrap;margin-top:16px;font-size:13px;color:#B4C3B0}
.ts-legend span{display:inline-flex;align-items:center;gap:8px}
.ts-legend i{width:12px;height:12px;background:#24492F;outline:1px solid rgba(205,235,166,.5);display:inline-block;flex-shrink:0}
.ts-legend i.o{background:#6F8F74;outline:0}

/* Why together */
.ts-why{display:grid;grid-template-columns:.9fr 1.1fr;gap:56px;align-items:center;margin-top:96px}
.ts-why-list{list-style:none;margin:28px 0 0;padding:0;display:flex;flex-direction:column;gap:20px}
.ts-why-list li{display:grid;grid-template-columns:30px 1fr;gap:12px}
.ts-why-list li i{height:3px;margin-top:11px;display:block}
.ts-why-list b{display:block;color:var(--ink);font-weight:500}
.ts-why-list p{font-size:15px}
.ts-matrix{padding:8px 20px}
.ts-matrix table{width:100%;border-collapse:collapse}
.ts-matrix th,.ts-matrix td{padding:14px 8px;border-bottom:1px solid var(--line);text-align:center;font-size:14px}
.ts-matrix tr:last-child th,.ts-matrix tr:last-child td{border-bottom:0}
.ts-matrix tbody th{text-align:left;font-weight:400;color:var(--ink);padding-left:0}
.ts-matrix thead th{color:var(--muted);font-size:10px}
.ts-matrix .hi{background:var(--ink);color:var(--lime)}
.ts-matrix thead th.hi{color:var(--lime)}
.ts-matrix .y,.ts-matrix .n{display:inline-block;font-size:16px}
.ts-matrix .y{color:var(--leaf)}
.ts-matrix .hi .y{color:var(--lime)}
.ts-matrix .n{color:#B9BFB2}

/* Timeline (dark) */
.ts-tlbig{display:flex;align-items:baseline;gap:12px;flex-wrap:wrap}
.ts-tlbig b{color:var(--cream);font-size:clamp(56px,7.4vw,96px);font-weight:600;letter-spacing:-.05em;line-height:1}
.ts-tlbig span{color:#B4C3B0;font-size:22px}
.ts-tlchart{border:1px solid rgba(250,247,239,.16);padding:20px 20px 16px;margin-top:20px}
.ts-tlsteps{list-style:none;margin:16px 0 0;padding:0}
.ts-tlsteps li{display:grid;grid-template-columns:36px 1fr;gap:10px;padding:14px 0;border-top:1px solid rgba(250,247,239,.14)}
.ts-tlsteps li .ts-mono{color:var(--lime);padding-top:3px}
.ts-tlsteps b{color:var(--cream);font-weight:500}
.ts-tlsteps p{font-size:14px;color:#B4C3B0}

/* Bento animations */
.ts-phone{width:78px;height:138px;border:1px solid rgba(11,36,24,.35);background:var(--card);padding:6px;overflow:hidden;position:relative}
.ts-phone-in{animation:ts-phone 7s ease-in-out infinite}
@keyframes ts-phone{0%,15%{transform:translateY(0)}50%,65%{transform:translateY(-62px)}100%{transform:translateY(0)}}
.ts-pl{height:5px;background:#D3DFC8;margin-top:6px}
.ts-phone-cta{position:absolute;left:6px;right:6px;bottom:6px;height:16px;background:var(--ink);color:var(--cream);font-size:8px;display:flex;align-items:center;justify-content:center}
.ts-tap{animation:ts-tap 3s ease-in-out infinite;transform-origin:center}
@keyframes ts-tap{0%,64%,100%{transform:none}70%{transform:scale(.97);background:#1F4A33}}
.ts-cursor{position:absolute;width:16px;height:16px;border-radius:50%;background:rgba(62,107,79,.3);border:2px solid var(--leaf);right:44px;top:13px;animation:ts-cursor 3s ease-in-out infinite;pointer-events:none}
@keyframes ts-cursor{0%,58%{transform:translate(18px,22px);opacity:0}64%{transform:none;opacity:1}70%{transform:scale(.75)}82%{transform:scale(1.6);opacity:0}100%{opacity:0}}
.ts-seq1{animation:ts-seq1 7s ease infinite}
.ts-seq2{animation:ts-seq2 7s ease infinite}
.ts-seq3{animation:ts-seq3 7s ease infinite}
@keyframes ts-seq1{0%{opacity:0;transform:translateY(6px)}6%,88%{opacity:1;transform:none}96%,100%{opacity:0}}
@keyframes ts-seq2{0%,22%{opacity:0;transform:translateY(6px)}30%,88%{opacity:1;transform:none}96%,100%{opacity:0}}
@keyframes ts-seq3{0%,44%{opacity:0}52%,88%{opacity:1}96%,100%{opacity:0}}

@media (max-width:960px){
  .ts-sec{padding:84px 0}
  .ts-split,.ts-price,.ts-compare,.ts-bento,.ts-examples,.ts-steps{grid-template-columns:1fr}
  .ts-split{gap:40px}
  .ts-combo,.ts-parts{grid-template-columns:1fr}
  .ts-op{height:44px}
  .ts-facts{grid-template-columns:1fr 1fr}
  .ts-examples video{aspect-ratio:4/5}
  .ts-equals svg{display:none}
  .ts-resolve{margin-top:64px}
  .ts-why{grid-template-columns:1fr;gap:36px;margin-top:72px}
  .ts-stats{grid-template-columns:1fr 1fr}
  .ts-stat,.ts-stat:first-child{border-right:0;padding:20px 14px 20px 0;border-bottom:1px solid rgba(250,247,239,.14)}
}
@media (max-width:767px){
  .ts{padding-bottom:76px}
  .ts-mobilebar{display:flex}
  .ts-nav-cta{display:none}
  .ts-logo-word{font-size:16px}
  .ts-logo-tag{display:none}
  .ts-hero{padding:52px 0 72px}
  .ts-mock-body{grid-template-columns:1fr}
  .ts-mock-site{border-right:0;border-bottom:1px solid var(--line)}
  .ts-mock-gal{display:none}
  .ts-price-l,.ts-price-r,.ts-cmp{padding:28px 22px}
  .ts-wrap{padding:0 16px}
  .ts-hero .ts-btn{width:100%}
  .ts-grid{gap:2px}
  .ts-gridcard{padding:14px}
  .ts-matrix{padding:4px 12px}
  .ts-matrix th,.ts-matrix td{padding:12px 4px;font-size:13px}
}
@media (prefers-reduced-motion: reduce){
  .ts-track{animation:none;flex-wrap:wrap;width:auto;row-gap:12px}
  .ts-dup{display:none}
  .ts-caret,.ts-pulse,.ts-cell.sw,.ts-phone-in,.ts-tap,.ts-seq1,.ts-seq2,.ts-seq3{animation:none}
  .ts-cursor{display:none}
  .ts-btn,.ts-faq .pl{transition:none}
  .ts-btn:hover{transform:none}
}
`;

// ── Small helpers ─────────────────────────────────────────────
function Reveal({ children, delay = 0, className, style }: { children: ReactNode; delay?: number; className?: string; style?: CSSProperties }) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      className={className}
      style={style}
      initial={reduce ? false : { opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.12 }}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

function Typewriter({ words }: { words: string[] }) {
  const reduce = useReducedMotion();
  const [i, setI] = useState(0);
  const [len, setLen] = useState(words[0].length);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => { setI(0); setLen(words[0].length); setDeleting(false); }, [words]);

  useEffect(() => {
    if (reduce) return;
    const word = words[i % words.length];
    let delay = deleting ? 45 : 85;
    if (!deleting && len === word.length) delay = 1800;
    if (deleting && len === 0) delay = 300;
    const id = window.setTimeout(() => {
      if (!deleting && len === word.length) setDeleting(true);
      else if (deleting && len === 0) { setDeleting(false); setI((n) => (n + 1) % words.length); }
      else setLen((l) => l + (deleting ? -1 : 1));
    }, delay);
    return () => window.clearTimeout(id);
  }, [i, len, deleting, words, reduce]);

  const word = words[i % words.length];
  return (
    <span className="ts-typed" aria-hidden="true">
      {reduce ? words[0] : word.slice(0, len)}
      <span className="ts-caret" />
    </span>
  );
}

function Marquee({ items, render, className, slow }: { items: string[]; render: (s: string, i: number) => ReactNode; className?: string; slow?: boolean }) {
  return (
    <div className={`ts-marquee ${className ?? ""}`}>
      <div className={`ts-track${slow ? " ts-track--slow" : ""}`}>
        {items.map((s, i) => render(s, i))}
        <div className="ts-dup" aria-hidden="true" style={{ display: "contents" }}>
          {items.map((s, i) => render(s, i))}
        </div>
      </div>
    </div>
  );
}

function Logo({ size = 34 }: { size?: number }) {
  return (
    <svg width={size} height={size * 0.93} viewBox="55 40 420 390" aria-hidden="true">
      <polygon points="60,425 178,45 335,210 318,245 200,150 150,322 208,298 228,332" fill="#0B2418" />
      <polygon points="470,45 352,425 195,260 212,225 330,320 380,148 322,172 302,138" fill="#5E9A6B" />
    </svg>
  );
}

const Arrow = () => <span aria-hidden="true">→</span>;

function CtaLink({ children, light, small, className }: { children: ReactNode; light?: boolean; small?: boolean; className?: string }) {
  return (
    <a href={STRIPE_URL} target="_blank" rel="noopener noreferrer"
      className={`ts-btn${light ? " ts-btn--light" : ""}${small ? " ts-btn--sm" : ""}${className ? ` ${className}` : ""}`}>
      {children} <Arrow />
    </a>
  );
}

// Terminal that types its lines one by one (static when reduced motion)
function TypedLines({ lines, style }: { lines: string[]; style?: CSSProperties }) {
  const reduce = useReducedMotion();
  const [pos, setPos] = useState({ line: 0, ch: 0 });

  useEffect(() => { setPos({ line: 0, ch: 0 }); }, [lines]);

  useEffect(() => {
    if (reduce) return;
    let delay = 38;
    let next = { line: pos.line, ch: pos.ch + 1 };
    if (pos.line >= lines.length) { delay = 2600; next = { line: 0, ch: 0 }; }
    else if (pos.ch >= lines[pos.line].length) { delay = 450; next = { line: pos.line + 1, ch: 0 }; }
    const id = window.setTimeout(() => setPos(next), delay);
    return () => window.clearTimeout(id);
  }, [pos, lines, reduce]);

  const caretLine = reduce ? lines.length - 1 : Math.min(pos.line, lines.length - 1);
  return (
    <div className="ts-term" role="img" aria-label={lines.join(" ")} style={style}>
      <div aria-hidden="true">
        {lines.map((line, i) => {
          const text = reduce || i < pos.line ? line : i === pos.line ? line.slice(0, pos.ch) : "";
          return (
            <div key={i} className={line.startsWith(">") ? "u" : line.startsWith("✓") ? "ok" : undefined}>
              {text || "\u00a0"}
              {i === caretLine && <span className="ts-caret" style={{ background: "var(--lime)", height: "1em", width: 7 }} />}
            </div>
          );
        })}
      </div>
    </div>
  );
}

// 7 × 24 week grid with a sweeping "now" column
function ShiftGrid({ t }: { t: Copy }) {
  const reduce = useReducedMotion();
  return (
    <div className="ts-gridcard">
      <div className="ts-gridhead ts-mono">
        <span><span className={`ts-dot${reduce ? "" : " ts-pulse"}`} /> {t.gridLabel}</span>
        <span>{t.gridRight}</span>
      </div>
      <div className="ts-grid" role="img" aria-label={t.gridAria}>
        {Array.from({ length: 7 * 24 }, (_, k) => {
          const row = Math.floor(k / 24), col = k % 24;
          const office = row < 5 && col >= 8 && col < 17;
          return <span key={k} className={`ts-cell${office ? " o" : ""}${reduce ? "" : " sw"}`} style={{ "--c": col } as CSSProperties} />;
        })}
      </div>
      <div className="ts-axis ts-mono" aria-hidden="true">
        <span>00:00</span><span>06:00</span><span>12:00</span><span>18:00</span><span>24:00</span>
      </div>
      <div className="ts-legend">
        <span><i className="o" aria-hidden="true" />{t.legendOffice}</span>
        <span><i aria-hidden="true" />{t.legendAfter}</span>
      </div>
    </div>
  );
}

// No site / Website / Site + chat capability table
function WhyMatrix({ t }: { t: Copy }) {
  const reduce = useReducedMotion();
  return (
    <div className="ts-card ts-matrix">
      <table>
        <caption className="ts-sr">{t.whyTitle}</caption>
        <thead>
          <tr>
            <td />
            {t.whyCols.map((c, i) => <th key={c} scope="col" className={`ts-mono${i === 2 ? " hi" : ""}`}>{c}</th>)}
          </tr>
        </thead>
        <tbody>
          {t.whyRows.map((row, r) => (
            <tr key={row.label}>
              <th scope="row">{row.label}</th>
              {row.v.map((v, c) => (
                <td key={c} className={c === 2 ? "hi" : undefined}>
                  <span className="ts-sr">{v ? t.whyYes : t.whyNo}</span>
                  <motion.span aria-hidden="true" className={v ? "y" : "n"}
                    initial={reduce ? false : { opacity: 0, scale: 0.4 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.15 + c * 0.3 + r * 0.06, duration: 0.35 }}>
                    {v ? "✓" : "✕"}
                  </motion.span>
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

// Checkout → live curve that draws itself
function TimelineChart({ points }: { points: string[] }) {
  const reduce = useReducedMotion();
  const xs = [40, 160, 290, 420];
  const ys = [190, 166, 106, 36];
  const d = "M40 190 C 100 189, 120 172, 160 166 S 240 128, 290 106 S 380 52, 420 36";
  return (
    <svg viewBox="0 0 460 232" width="100%" aria-hidden="true" style={{ display: "block" }}>
      <defs>
        <linearGradient id="ts-tl-fill" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#CDEBA6" stopOpacity=".32" />
          <stop offset="1" stopColor="#CDEBA6" stopOpacity="0" />
        </linearGradient>
      </defs>
      {[36, 113, 190].map((y) => (
        <line key={y} x1="40" x2="420" y1={y} y2={y} stroke="rgba(250,247,239,.12)" strokeDasharray="3 4" />
      ))}
      <motion.path d={`${d} L420 190 L40 190 Z`} fill="url(#ts-tl-fill)"
        initial={reduce ? false : { opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
        transition={{ delay: 1, duration: 0.8 }} />
      <motion.path d={d} fill="none" stroke="#CDEBA6" strokeWidth="2.5"
        initial={reduce ? false : { pathLength: 0 }} whileInView={{ pathLength: 1 }} viewport={{ once: true }}
        transition={{ duration: 1.5, ease: "easeInOut" }} />
      {xs.map((x, i) => (
        <g key={i}>
          <motion.circle cx={x} cy={ys[i]} r={i === 3 ? 6 : 4} fill={i === 3 ? "#CDEBA6" : "#0B2418"} stroke="#CDEBA6" strokeWidth="2"
            initial={reduce ? false : { opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
            transition={{ delay: 0.3 + i * 0.38 }} />
          <text x={x} y="220" textAnchor={i === 0 ? "start" : i === 3 ? "end" : "middle"}
            fill="#9DB09A" fontSize="11" fontFamily="'JetBrains Mono', monospace" letterSpacing="1">
            {points[i].toUpperCase()}
          </text>
        </g>
      ))}
    </svg>
  );
}

// Mini illustrations for the feature bento (CSS-animated, static with reduced motion)
function IllPhone({ call }: { call: string }) {
  return (
    <div className="ts-phone" aria-hidden="true">
      <div className="ts-phone-in">
        <div style={{ height: 36, background: "#0B2418" }} />
        <div className="ts-pl" />
        <div className="ts-pl" style={{ width: "70%" }} />
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 4, marginTop: 8 }}>
          {[0, 1, 2, 3].map((n) => <div key={n} style={{ aspectRatio: "1", background: "#D3DFC8" }} />)}
        </div>
        <div className="ts-pl" />
        <div className="ts-pl" style={{ width: "55%" }} />
        <div style={{ height: 30, background: "#E7EDE0", marginTop: 8 }} />
      </div>
      <div className="ts-phone-cta">☎ {call}</div>
    </div>
  );
}
function IllButtons({ call, est }: { call: string; est: string }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 10, width: "100%", maxWidth: 260, position: "relative" }} aria-hidden="true">
      <span className="ts-tap" style={{ background: "#0B2418", color: "#FAF7EF", padding: "12px 14px", fontSize: 14, fontWeight: 500, display: "flex", justifyContent: "space-between" }}>{call}<span>☎</span></span>
      <span style={{ border: "1px solid #0B2418", color: "#0B2418", padding: "12px 14px", fontSize: 14, fontWeight: 500, display: "flex", justifyContent: "space-between", background: "#FCFAF5" }}>{est}<span>→</span></span>
      <span className="ts-cursor" />
    </div>
  );
}
function IllBilingual() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 8, width: "100%", maxWidth: 280 }} aria-hidden="true">
      <span className="ts-bub ts-bub--c ts-seq1" style={{ alignSelf: "flex-end" }}>¿Hacen reparaciones de techo?</span>
      <span className="ts-bub ts-bub--a ts-seq2">¡Sí! ¿En qué ZIP code está la propiedad?</span>
      <span className="ts-mono ts-seq3" style={{ color: "#8A9184", alignSelf: "flex-start", marginTop: 4 }}>EN · ES</span>
    </div>
  );
}

// ── Main component ────────────────────────────────────────────
export default function TradesSystem() {
  const [lang, setLang] = useState<Lang>("en");
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const t = COPY[lang];
  const reduce = useReducedMotion();

  useEffect(() => {
    const fontId = "ts-fonts";
    if (!document.getElementById(fontId)) {
      const link = document.createElement("link");
      link.id = fontId; link.rel = "stylesheet";
      link.href = "https://fonts.googleapis.com/css2?family=Schibsted+Grotesk:wght@400;500;600&family=JetBrains+Mono:wght@400;500&display=swap";
      document.head.appendChild(link);
    }
  }, []);

  useEffect(() => { setOpenFaq(null); }, [lang]);

  useEffect(() => {
    const prevTitle = document.title;
    const prevLang = document.documentElement.lang;
    document.documentElement.lang = lang;
    document.title = lang === "en"
      ? "Trade Business Website + Bilingual AI Chat Assistant | NJ Business Web"
      : "Sitio Web Para Negocios De Oficios + Asistente De Chat IA Bilingüe | NJ Business Web";

    const description = lang === "en"
      ? "A professional website for your trade business with a bilingual AI chat assistant available 24/7. $697/month, no setup fee, 6-month initial term."
      : "Un sitio web profesional para tu negocio de oficios con un asistente de chat de IA bilingüe disponible las 24 horas. $697/mes, sin costo de instalación, término inicial de 6 meses.";

    let meta = document.querySelector('meta[name="description"]');
    const createdMeta = !meta;
    if (!meta) {
      meta = document.createElement("meta");
      meta.setAttribute("name", "description");
      document.head.appendChild(meta);
    }
    const prevDescription = meta.getAttribute("content");
    meta.setAttribute("content", description);

    return () => {
      document.title = prevTitle;
      document.documentElement.lang = prevLang;
      if (createdMeta) meta?.remove();
      else if (prevDescription !== null) meta?.setAttribute("content", prevDescription);
    };
  }, [lang]);

  return (
    <div className="ts">
      <style>{CSS}</style>

      {/* ── Top marquee ── */}
      <div className="ts-topbar ts-mono" role="note">
        <span className="ts-sr">{t.marquee.join(" · ")}</span>
        <div aria-hidden="true">
          <Marquee items={[...t.marquee, ...t.marquee]} render={(s, i) => <span key={i} className="ts-item">{s}</span>} />
        </div>
      </div>

      {/* ── Nav ── */}
      <header className="ts-nav">
        <div className="ts-wrap ts-nav-in">
          <a href="#top" className="ts-logo" aria-label="NJ Business Web">
            <Logo />
            <span className="ts-logo-txt">
              <span className="ts-logo-word">NJBUSINESS<span>WEB</span></span>
              <span className="ts-logo-tag">Strategic Growth Partners</span>
            </span>
          </a>
          <div className="ts-nav-r">
            <div className="ts-lang" role="group" aria-label={t.langLabel}>
              {(["en", "es"] as Lang[]).map((l) => (
                <button key={l} type="button" onClick={() => setLang(l)} aria-pressed={lang === l}>
                  {l.toUpperCase()}
                </button>
              ))}
            </div>
            <CtaLink small className="ts-nav-cta">{t.navCta}</CtaLink>
          </div>
        </div>
      </header>

      <main id="top">
        {/* ═════════ §1 HERO ═════════ */}
        <section className="ts-hero ts-dots">
          <div className="ts-wrap">
            <Reveal>
              <span className="ts-chip ts-mono"><i aria-hidden="true" />{t.chip}</span>
            </Reveal>
            <Reveal delay={0.05}>
              <h1 className="ts-h1" style={{ marginTop: 28 }}>
                <span className="ts-sr">{t.h1Lead} {t.h1Words.join(" / ")}</span>
                <span aria-hidden="true">{t.h1Lead}<br /><Typewriter words={t.h1Words} /></span>
              </h1>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="ts-lead">{t.subhead}</p>
            </Reveal>
            <Reveal delay={0.15} className="ts-hero-ctas">
              <CtaLink>{t.cta}</CtaLink>
              <span className="ts-mono" style={{ color: "var(--muted)" }}>{t.ctaNote}</span>
              <p className="ts-terms">{t.heroTerms}</p>
            </Reveal>

            {/* Product shot: example site + chat widget */}
            <Reveal delay={0.2}>
              <figure style={{ margin: 0 }}>
              <div className="ts-mock ts-card">
                <div className="ts-mock-bar">
                  <span className="d" /><span className="d" /><span className="d" />
                  <span className="ts-mock-url ts-mono">{t.mockUrl}</span>
                </div>
                <div className="ts-mock-body">
                  <div className="ts-mock-site">
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", color: "var(--ink)", fontWeight: 600 }}>
                      <span>{t.mockSiteName}</span>
                      <span className="ts-mono" style={{ color: "var(--muted)" }}>EN · ES</span>
                    </div>
                    <div className="ts-mock-hero">
                      <h4>{t.mockHeadline}</h4>
                      <div className="ts-mock-btns">
                        <span style={{ background: "var(--lime)", color: "var(--ink)" }}>☎ {t.mockCall}</span>
                        <span style={{ border: "1px solid rgba(250,247,239,.5)" }}>{t.mockEstimate}</span>
                      </div>
                    </div>
                    <div className="ts-bar" style={{ width: "80%" }} />
                    <div className="ts-bar" style={{ width: "62%" }} />
                    <div className="ts-mock-gal"><div /><div /><div /></div>
                  </div>
                  <div className="ts-mock-chat">
                    <div className="ts-mock-chat-h">
                      <span className={`ts-dot${reduce ? "" : " ts-pulse"}`} style={{ background: "var(--leaf)" }} />
                      <span className="ts-mono">{t.mockChatTitle}</span>
                    </div>
                    <div className="ts-mock-msgs">
                      {t.demoMessages.slice(0, 3).map((m, i) => (
                        <span key={i} className={`ts-bub ${m.from === "customer" ? "ts-bub--c" : "ts-bub--a"}`}>{m.text}</span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
              <figcaption className="ts-mock-cap ts-mono">{t.mockLabel}</figcaption>
              </figure>
            </Reveal>
          </div>
        </section>

        {/* ═════════ §2 COMBO: Website + Chat = Requests ═════════ */}
        <section className="ts-sec" style={{ paddingBottom: 96 }}>
          <div className="ts-wrap">
            <Reveal className="ts-combo">
              <div className="ts-card ts-combo-card">
                <div className="ts-combo-head">
                  <span className="d"><i /><i /></span>
                  <span className="ts-mono">{t.comboWebsite}</span>
                </div>
                <div className="ts-pkg"><span>{t.comboWebsiteCaption}</span></div>
                <div className="ts-bar" style={{ width: "75%" }} />
                <div className="ts-bar" style={{ width: "55%" }} />
                <div className="ts-combo-foot"><span>{t.comboWebsiteFootL}</span><span style={{ color: "var(--ink)" }}>{t.comboWebsiteFootR}</span></div>
              </div>
              <div className="ts-op" aria-hidden="true">+</div>
              <div className="ts-card ts-combo-card">
                <div className="ts-combo-head">
                  <span className="d"><i /><i /></span>
                  <span className="ts-mono">{t.comboChat}</span>
                </div>
                <TypedLines lines={t.comboTerminal} />
                <div className="ts-bar" style={{ width: "100%", height: 22, background: "var(--shadow)" }} />
              </div>
            </Reveal>
            <Reveal delay={0.1}>
              <div className="ts-equals">
                <div>
                  <span className="ts-mono">{t.comboEquals}</span>
                  <strong>{t.comboResult}</strong>
                </div>
                <svg viewBox="0 0 420 60" preserveAspectRatio="none" aria-hidden="true">
                  <path d="M0 52 C 120 50, 220 40, 300 24 S 400 6, 420 4" fill="none" stroke="#CDEBA6" strokeWidth="2" />
                  <circle cx="414" cy="5" r="4" fill="#CDEBA6" />
                </svg>
              </div>
            </Reveal>
          </div>
        </section>

        {/* ═════════ §3 FACTS + INCLUDED MARQUEE ═════════ */}
        <section>
          <div className="ts-facts">
            {t.facts.map((f) => (
              <div key={f.label} className="ts-fact"><b>{f.value}</b><span>{f.label}</span></div>
            ))}
          </div>
          <ul className="ts-sr">{t.included.map((s) => <li key={s}>{s}</li>)}</ul>
          <div className="ts-incl" aria-hidden="true">
            <Marquee slow items={t.included} render={(s, i) => (
              <span key={i} className="ts-item"><sup>{String(i + 1).padStart(2, "0")}</sup>{s}</span>
            )} />
          </div>
        </section>

        {/* ═════════ §4 24/7 (dark) ═════════ */}
        <section className="ts-sec ts-dark">
          <div className="ts-wrap">
            <Reveal>
              <p className="ts-eyebrow">{t.shiftEyebrow}</p>
              <h2 className="ts-h2">
                {t.shiftTitle.split("\n").map((line, i) => <span key={i} style={{ display: "block" }}>{line}</span>)}
              </h2>
            </Reveal>
            <Reveal delay={0.08} className="ts-stats">
              {t.shiftStats.map((st) => (
                <div key={st.label} className="ts-stat"><b>{st.value}</b><span className="ts-mono">{st.label}</span></div>
              ))}
            </Reveal>
            <Reveal delay={0.12}>
              <ShiftGrid t={t} />
            </Reveal>
          </div>
        </section>

        {/* ═════════ §5 PROBLEMS ═════════ */}
        <section className="ts-sec ts-dots">
          <div className="ts-wrap">
            <div className="ts-split">
              <Reveal>
                <p className="ts-eyebrow">{t.problemsEyebrow}</p>
                <h2 className="ts-h2">{t.problemsTitle}</h2>
              </Reveal>
              <Reveal delay={0.1}>
                <ul className="ts-x">
                  {t.problems.map((p) => (
                    <li key={p}><span className="m" aria-hidden="true">✕</span><span>{p}</span></li>
                  ))}
                </ul>
              </Reveal>
            </div>
            <Reveal>
              <p className="ts-resolve">{t.resolveA}<em>{t.resolveB}</em></p>
            </Reveal>
          </div>
        </section>

        {/* ═════════ §6 PARTS ═════════ */}
        <section id="system" className="ts-sec" style={{ background: "var(--cream2)", borderTop: "1px solid var(--line)", borderBottom: "1px solid var(--line)" }}>
          <div className="ts-wrap">
            <Reveal>
              <p className="ts-eyebrow">{t.partsEyebrow}</p>
              <h2 className="ts-display">
                {t.partsTitle.split("\n").map((line, i) => <span key={i} style={{ display: "block" }}>{line}</span>)}
              </h2>
              <p className="ts-lead" style={{ marginTop: 20, maxWidth: 560 }}>{t.partsSub}</p>
            </Reveal>
            <Reveal delay={0.1} className="ts-parts">
              <div className="ts-card ts-part">
                <div className="ts-ill" aria-hidden="true">
                  <svg width="120" height="60" viewBox="0 0 120 60"><rect x="1" y="1" width="118" height="58" fill="#FCFAF5" stroke="#0B2418" strokeOpacity=".3" /><rect x="8" y="8" width="104" height="22" fill="#0B2418" /><rect x="8" y="36" width="60" height="5" fill="#D3DFC8" /><rect x="8" y="45" width="40" height="5" fill="#D3DFC8" /></svg>
                </div>
                <span className="ts-mono">{t.part1Label}</span>
                <h3 className="ts-h3">{t.part1Title}</h3>
                <p>{t.part1Text}</p>
              </div>
              <div className="ts-op" aria-hidden="true">+</div>
              <div className="ts-card ts-part">
                <div className="ts-ill" aria-hidden="true">
                  <div style={{ background: "#0B2418", padding: "8px 10px", fontFamily: "'JetBrains Mono', monospace", fontSize: 11, color: "#CDEBA6", whiteSpace: "nowrap" }}>&gt; EN · ES · 24/7<br /><span style={{ color: "#FAF7EF" }}>✓ ZIP · urgency · phone</span></div>
                </div>
                <span className="ts-mono">{t.part2Label}</span>
                <h3 className="ts-h3">{t.part2Title}</h3>
                <p>{t.part2Text}</p>
              </div>
              <div className="ts-op" aria-hidden="true">=</div>
              <div className="ts-card ts-part ts-part--res">
                <div className="ts-ill" style={{ background: "transparent", borderColor: "rgba(250,247,239,.15)" }} aria-hidden="true">
                  <svg width="150" height="60" viewBox="0 0 150 60"><path d="M4 54 C 50 52, 90 40, 120 20 S 140 8, 146 6" fill="none" stroke="#CDEBA6" strokeWidth="2" /><circle cx="144" cy="7" r="4" fill="#CDEBA6" /></svg>
                </div>
                <span className="ts-mono">{t.resultLabel}</span>
                <h3 className="ts-h3">{t.resultTitle}</h3>
                <p>{t.resultText}</p>
              </div>
            </Reveal>
            <div className="ts-why">
              <Reveal>
                <h3 className="ts-h2" style={{ fontSize: "clamp(26px,3vw,36px)" }}>{t.whyTitle}</h3>
                <ul className="ts-why-list">
                  {t.whyItems.map((w, i) => (
                    <li key={w.title}>
                      <i aria-hidden="true" style={{ background: ["#B9C4B3", "#6F8F74", "#0B2418"][i] }} />
                      <div><b>{w.title}</b><p>{w.desc}</p></div>
                    </li>
                  ))}
                </ul>
              </Reveal>
              <Reveal delay={0.1}>
                <WhyMatrix t={t} />
              </Reveal>
            </div>
          </div>
        </section>

        {/* ═════════ §7 DEMO (dark) ═════════ */}
        <section id="demo" className="ts-sec ts-dark">
          <div className="ts-wrap ts-split">
            <Reveal>
              <p className="ts-eyebrow">{t.demoEyebrow}</p>
              <h2 className="ts-h2">{t.demoTitle}</h2>
              <p className="ts-lead" style={{ color: "#B4C3B0", marginTop: 22 }}>{t.demoSub}</p>

              <div className="ts-alert">
                <div className="ts-alert-h ts-mono">
                  <span className={`ts-dot${reduce ? "" : " ts-pulse"}`} /> {t.leadAlertLabel}
                </div>
                <dl>
                  {t.leadFields.map(([k, v]) => (
                    <div key={k} style={{ display: "contents" }}>
                      <dt>{k}</dt><dd>{v}</dd>
                    </div>
                  ))}
                </dl>
              </div>
              <p className="ts-disc">{t.demoDisclaimer}</p>
            </Reveal>

            <Reveal delay={0.1}>
              <span className="ts-tag ts-mono">{t.demoExampleLabel}</span>
              <div className="ts-chatwin">
                <div className="ts-chatwin-h">
                  <span className="ts-dot" />
                  <span className="ts-mono">{t.demoWindowLabel}</span>
                </div>
                <div className="ts-msgs">
                  {t.demoMessages.map((m, i) => (
                    <span key={i} className={`ts-bub ${m.from === "customer" ? "ts-bub--c" : "ts-bub--a"}`} style={{ fontSize: 14 }}>{m.text}</span>
                  ))}
                </div>
              </div>
            </Reveal>
          </div>
        </section>

        {/* ═════════ §8 FEATURES BENTO ═════════ */}
        <section className="ts-sec ts-dots">
          <div className="ts-wrap">
            <Reveal>
              <p className="ts-eyebrow">{t.featuresEyebrow}</p>
              <h2 className="ts-h2">{t.featuresTitle}</h2>
              <p className="ts-lead" style={{ marginTop: 18, maxWidth: 620 }}>{t.featuresSub}</p>
            </Reveal>
            <div className="ts-bento">
              {t.features.map((f, i) => (
                <Reveal key={f.title} delay={(i % 2) * 0.08} className="ts-card ts-feat">
                  <div className="ts-feat-ill">
                    {i === 0 && <IllPhone call={t.mockCall} />}
                    {i === 1 && <IllButtons call={t.mockCall} est={t.mockEstimate} />}
                    {i === 2 && <IllBilingual />}
                    {i === 3 && <TypedLines lines={t.featTerminal} style={{ minHeight: 0, width: "100%", maxWidth: 300 }} />}
                  </div>
                  <h3 className="ts-h3">{f.title}</h3>
                  <p>{f.desc}</p>
                </Reveal>
              ))}
            </div>
            <Reveal style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 14, marginTop: 56 }}>
              <CtaLink>{t.cta}</CtaLink>
              <span className="ts-mono" style={{ color: "var(--muted)" }}>{t.ctaNote}</span>
            </Reveal>
          </div>
        </section>

        {/* ═════════ §9 EXAMPLES ═════════ */}
        <section id="examples" className="ts-sec" style={{ borderTop: "1px solid var(--line)" }}>
          <div className="ts-wrap">
            <Reveal>
              <p className="ts-eyebrow">{t.examplesEyebrow}</p>
              <h2 className="ts-h2">{t.examplesHeading}</h2>
              <p className="ts-lead" style={{ marginTop: 18, maxWidth: 680 }}>{t.examplesSub}</p>
            </Reveal>
            <div className="ts-examples">
              {(["roofing", "plumbing", "electrical"] as const).map((k, i) => (
                <Reveal key={k} delay={i * 0.08} className="ts-card">
                  <div className="ts-ex-h">
                    <span style={{ fontWeight: 500 }}>{t.exampleLabels[i]}</span>
                    <span className="ts-mono">{t.exampleTag}</span>
                  </div>
                  <video
                    src={`/videos/${k}-demo.mp4`}
                    autoPlay={!reduce} muted loop playsInline controls preload="metadata"
                    aria-label={`${t.exampleLabels[i]} — ${t.exampleTag}`}
                  />
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ═════════ §10 TIMELINE (dark) ═════════ */}
        <section className="ts-sec ts-dark">
          <div className="ts-wrap ts-split" style={{ alignItems: "center" }}>
            <Reveal>
              <p className="ts-eyebrow">{t.tlEyebrow}</p>
              <h2 className="ts-h2">{t.tlTitle}</h2>
              <p className="ts-lead" style={{ color: "#B4C3B0", marginTop: 22 }}>{t.tlText}</p>
              <p className="ts-mono" style={{ color: "#9DB09A", marginTop: 36 }}>{t.stepsLabel}</p>
              <ol className="ts-tlsteps">
                {t.steps.map((st, i) => (
                  <li key={st.label}>
                    <span className="ts-mono">{String(i + 1).padStart(2, "0")}</span>
                    <div><b>{st.label}</b><p>{st.desc}</p></div>
                  </li>
                ))}
              </ol>
            </Reveal>
            <Reveal delay={0.1}>
              <div className="ts-tlbig"><b>{t.tlBig}</b><span>{t.tlBigSuffix}</span></div>
              <div className="ts-tlchart">
                <TimelineChart points={t.tlPoints} />
                <p className="ts-disc">{t.tlNote}</p>
              </div>
            </Reveal>
          </div>
        </section>

        {/* ═════════ §11 PRICING ═════════ */}
        <section id="pricing" className="ts-sec ts-dots" style={{ borderTop: "1px solid var(--line)" }}>
          <div className="ts-wrap">
            <Reveal>
              <p className="ts-eyebrow">{t.pricingEyebrow}</p>
              <h2 className="ts-h2">{t.pricingHeading}</h2>
            </Reveal>
            <Reveal delay={0.1} className="ts-price ts-card">
              <div className="ts-price-l">
                <h3 className="ts-h3">{t.includedTitle}</h3>
                <ul className="ts-check">
                  {t.includedList.map((item) => (
                    <li key={item}><span className="m" aria-hidden="true">✓</span><span>{item}</span></li>
                  ))}
                </ul>
              </div>
              <div className="ts-price-r">
                <div className="big">{t.price}<small>{t.perMonth}</small></div>
                <span className="ts-pchip ts-mono">{t.priceChip}</span>
                <p style={{ fontSize: 14, lineHeight: 1.6 }}>{t.termsLine}</p>
                <CtaLink light>{t.getStartedBtn}</CtaLink>
                <span className="ts-mono" style={{ color: "#9DB09A" }}>🔒 {t.secureNote}</span>
              </div>
            </Reveal>

          </div>
        </section>

        {/* ═════════ §12 COMPARE ═════════ */}
        <section className="ts-sec" style={{ borderTop: "1px solid var(--line)" }}>
          <div className="ts-wrap">
            <Reveal>
              <p className="ts-eyebrow">{t.compareEyebrow}</p>
              <h2 className="ts-h2">{t.compareTitle}</h2>
            </Reveal>
            <div className="ts-compare">
              <Reveal className="ts-cmp ts-cmp--old">
                <h3 className="ts-h3">{t.oldTitle}</h3>
                <ul>
                  {t.oldItems.map((x) => <li key={x}><span aria-hidden="true">✕</span><span>{x}</span></li>)}
                </ul>
              </Reveal>
              <Reveal delay={0.08} className="ts-cmp ts-cmp--new">
                <h3 className="ts-h3">{t.newTitle}</h3>
                <ul>
                  {t.newItems.map((x) => <li key={x}><span className="m" aria-hidden="true">✓</span><span>{x}</span></li>)}
                </ul>
              </Reveal>
            </div>
          </div>
        </section>

        {/* ═════════ §13 BUILT FOR ═════════ */}
        <section className="ts-sec ts-dots" style={{ borderTop: "1px solid var(--line)", paddingBottom: 96 }}>
          <div className="ts-wrap">
            <Reveal>
              <p className="ts-eyebrow">{t.builtEyebrow}</p>
              <h2 className="ts-h2">{t.builtTitle}</h2>
              <p className="ts-lead" style={{ marginTop: 18 }}>{t.builtSub}</p>
            </Reveal>
          </div>
          <div style={{ marginTop: 44 }}>
            <p className="ts-sr">{t.builtFor.join(", ")}</p>
            <div aria-hidden="true">
              <Marquee slow items={t.builtFor} render={(s, i) => <div key={i} className="ts-chips"><span className="ts-mono">{s}</span></div>} />
            </div>
          </div>
        </section>

        {/* ═════════ §14 FAQ ═════════ */}
        <section id="faq" className="ts-sec" style={{ borderTop: "1px solid var(--line)" }}>
          <div className="ts-wrap ts-split">
            <Reveal>
              <p className="ts-eyebrow">{t.faqEyebrow}</p>
              <h2 className="ts-h2">{t.faqHeading}</h2>
            </Reveal>
            <Reveal delay={0.08}>
              <ul className="ts-faq">
                {t.faqItems.map((item, i) => {
                  const open = openFaq === i;
                  return (
                    <li key={item.q}>
                      <button type="button" aria-expanded={open} aria-controls={`ts-faq-${i}`} id={`ts-faq-q-${i}`}
                        onClick={() => setOpenFaq(open ? null : i)}>
                        <span>{item.q}</span><span className="pl" aria-hidden="true">+</span>
                      </button>
                      <div id={`ts-faq-${i}`} role="region" aria-labelledby={`ts-faq-q-${i}`} hidden={!open} className="ans">
                        {item.a}
                      </div>
                    </li>
                  );
                })}
              </ul>
            </Reveal>
          </div>
        </section>

        {/* ═════════ §15 FINAL CTA ═════════ */}
        <section className="ts-dark ts-final">
          <div className="ts-wrap">
            <Reveal>
              <h2 className="ts-h2">{t.finalCtaHeading}</h2>
              <p className="sub">{t.finalCtaSub}</p>
              <div style={{ marginTop: 34, display: "flex", flexDirection: "column", alignItems: "center", gap: 14 }}>
                <CtaLink light>{t.getStartedBtn}</CtaLink>
                <span className="ts-mono" style={{ color: "#9DB09A" }}>{t.ctaNote}</span>
              </div>
            </Reveal>
          </div>
        </section>
      </main>

      <footer className="ts-footer">
        <div className="ts-wrap">
          <span><b>NJ Business Web</b>&nbsp;&nbsp;{t.footer}</span>
          <span className="ts-mono" style={{ color: "var(--muted)" }}>{t.ctaNote}</span>
        </div>
      </footer>

      {/* ── Mobile sticky bar ── */}
      <div className="ts-mobilebar">
        <div>
          <b>{t.price}<span style={{ fontSize: 13, fontWeight: 400, color: "var(--body)" }}>{t.perMonth}</span></b>
          <div style={{ fontSize: 12, color: "var(--muted)" }}>{t.mobileNote}</div>
        </div>
        <CtaLink small>{t.mobileGet}</CtaLink>
      </div>
    </div>
  );
}
