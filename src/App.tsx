
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import CampaignDetails from "./pages/CampaignDetails";
import CallDetails from "./pages/CallDetails";
import InboundCalls from "./pages/InboundCalls";
import InboundCampaignCalls from "./pages/InboundCampaignCalls";
import Integrations from "./pages/Integrations";
import Instructions from "./pages/Instructions";
import Auth from "./pages/Auth";
import AgentChat from "./pages/AgentChat";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/campaign/:campaignId" element={<CampaignDetails />} />
          <Route path="/campaign/:campaignId/calls" element={<CallDetails />} />
          <Route path="/agent/:agentId/chat" element={<AgentChat />} />
          <Route path="/inbound-calls" element={<InboundCalls />} />
          <Route path="/inbound-campaign/:campaignId/calls" element={<InboundCampaignCalls />} />
          <Route path="/integrations" element={<Integrations />} />
          <Route path="/instructions" element={<Instructions />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
