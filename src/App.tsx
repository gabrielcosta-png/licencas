import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Licenses from "./pages/Licenses";
import Conditionants from "./pages/Conditionants";
import Regularization from "./pages/Regularization";
import Reports from "./pages/Reports";
import Documents from "./pages/Documents";
import Alerts from "./pages/Alerts";
import Settings from "./pages/Settings";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/licencas" element={<Licenses />} />
          <Route path="/condicionantes" element={<Conditionants />} />
          <Route path="/regularizacao" element={<Regularization />} />
          <Route path="/relatorios" element={<Reports />} />
          <Route path="/documentos" element={<Documents />} />
          <Route path="/alertas" element={<Alerts />} />
          <Route path="/configuracoes" element={<Settings />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
