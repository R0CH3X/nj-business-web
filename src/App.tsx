import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";

// Batch 1 — original 3
import JulietteSalon from "./pages/JulietteSalon";
import NikkiMaarSalon from "./pages/NikkiMaarSalon";
import BrigithNailsSpa from "./pages/BrigithNailsSpa";

// Batch 2 — 9 new salons
import FinaSalon from "./pages/FinaSalon";
import DivinoNinoSalon from "./pages/DivinoNinoSalon";
import VipBeautySalon from "./pages/VipBeautySalon";
import HenryCastelSalon from "./pages/HenryCastelSalon";
import EstilosSalon from "./pages/EstilosSalon";
import SalonSalvys from "./pages/SalonSalvys";
import GlamourByLatin from "./pages/GlamourByLatin";
import GlamourByMarisol from "./pages/GlamourByMarisol";
import AmarilysStudio from "./pages/AmarilysStudio";

// NJ Business Web — Trades System
import TradesSystem from "./pages/TradesSystem";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />

          {/* Batch 1 */}
          <Route path="/juliette-beauty-salon" element={<JulietteSalon />} />
          <Route path="/juliette-beauty-salon/*" element={<JulietteSalon />} />
          <Route path="/nikki-maar-salon" element={<NikkiMaarSalon />} />
          <Route path="/nikki-maar-salon/*" element={<NikkiMaarSalon />} />
          <Route path="/brigith-nails-spa" element={<BrigithNailsSpa />} />
          <Route path="/brigith-nails-spa/*" element={<BrigithNailsSpa />} />

          {/* Batch 2 */}
          <Route path="/fina-salon" element={<FinaSalon />} />
          <Route path="/fina-salon/*" element={<FinaSalon />} />
          <Route path="/divino-nino-beauty-nail-salon" element={<DivinoNinoSalon />} />
          <Route path="/divino-nino-beauty-nail-salon/*" element={<DivinoNinoSalon />} />
          <Route path="/vip-beauty-salon" element={<VipBeautySalon />} />
          <Route path="/vip-beauty-salon/*" element={<VipBeautySalon />} />
          <Route path="/henry-castel-vip-beauty-salon" element={<HenryCastelSalon />} />
          <Route path="/henry-castel-vip-beauty-salon/*" element={<HenryCastelSalon />} />
          <Route path="/estilos-beauty-salon" element={<EstilosSalon />} />
          <Route path="/estilos-beauty-salon/*" element={<EstilosSalon />} />
          <Route path="/salon-salvys" element={<SalonSalvys />} />
          <Route path="/salon-salvys/*" element={<SalonSalvys />} />
          <Route path="/glamour-by-latin" element={<GlamourByLatin />} />
          <Route path="/glamour-by-latin/*" element={<GlamourByLatin />} />
          <Route path="/glamour-by-marisol-salon" element={<GlamourByMarisol />} />
          <Route path="/glamour-by-marisol-salon/*" element={<GlamourByMarisol />} />
          <Route path="/amarilys-beauty-studio" element={<AmarilysStudio />} />
          <Route path="/amarilys-beauty-studio/*" element={<AmarilysStudio />} />

          {/* NJ Business Web — Trades System */}
          <Route path="/trades-system" element={<TradesSystem />} />

          {/* Catch-all */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
