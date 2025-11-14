import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ExploreJobs from "./pages/ExploreJobs";
import JobDetail from "./pages/JobDetail";
import Dashboard from "./pages/user/Dashboard";
import Notifications from "./pages/user/Notifications";
import Feedbacks from "./pages/user/Feedbacks";
import SendedApplications from "./pages/user/applications/Sended";
import Fastbooks from "./pages/user/applications/Fastbooks";
import ConfirmedJobs from "./pages/user/applications/Confirmed";
import ClosedJobs from "./pages/user/applications/Closed";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/esplora-lavori" element={<ExploreJobs />} />
          <Route path="/lavoro/:id" element={<JobDetail />} />
          <Route path="/user/dashboard" element={<Dashboard />} />
          <Route path="/user/dashboard/notifications" element={<Notifications />} />
          <Route path="/user/dashboard/feedbacks" element={<Feedbacks />} />
          <Route path="/user/dashboard/applications/sended" element={<SendedApplications />} />
          <Route path="/user/dashboard/applications/fastbooks" element={<Fastbooks />} />
          <Route path="/user/dashboard/applications/confirmed" element={<ConfirmedJobs />} />
          <Route path="/user/dashboard/applications/closed" element={<ClosedJobs />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
