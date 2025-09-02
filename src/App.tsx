import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { SidebarProvider } from "@/components/ui/sidebar";
import { ThemeProvider } from "@/contexts/ThemeContext";
import { LanguageProvider } from "@/contexts/LanguageContext";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import DataPrediction from "./pages/DataPrediction";
import MLAnalysis from "./pages/MLAnalysis";
import Simulation from "./pages/Simulation";
import TrainAudit from "./pages/TrainAudit";
import InputUpload from "./pages/InputUpload";
import AppLayout from "./components/AppLayout";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider>
      <LanguageProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/" element={<AppLayout />}>
                <Route index element={<Dashboard />} />
                <Route path="data-prediction/*" element={<DataPrediction />} />
                <Route path="ml-analysis" element={<MLAnalysis />} />
                <Route path="simulation" element={<Simulation />} />
                <Route path="train-audit" element={<TrainAudit />} />
                <Route path="input-upload" element={<InputUpload />} />
              </Route>
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </LanguageProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
