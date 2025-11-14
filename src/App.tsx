import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ForgotPassword from "./pages/ForgotPassword";
import Dipendenti from "./pages/Dipendenti";
import Promoter from "./pages/Promoter";
import Aziende from "./pages/Aziende";
import Contacts from "./pages/Contacts";
import FaqDipendenti from "./pages/FaqDipendenti";
import FaqAziende from "./pages/FaqAziende";
import ComeFunzionaHostess from "./pages/ComeFunzionaHostess";
import ComeFunzionaAziende from "./pages/ComeFunzionaAziende";
import CreateProfile from "./pages/CreateProfile";
import Blog from "./pages/Blog";
import Privacy from "./pages/Privacy";
import Cookie from "./pages/Cookie";
import Terms from "./pages/Terms";
import ExploreJobs from "./pages/ExploreJobs";
import JobDetail from "./pages/JobDetail";
import PublicProfile from "./pages/PublicProfile";
import Dashboard from "./pages/user/Dashboard";
import Notifications from "./pages/user/Notifications";
import Feedbacks from "./pages/user/Feedbacks";
import SendedApplications from "./pages/user/applications/Sended";
import Fastbooks from "./pages/user/applications/Fastbooks";
import ConfirmedJobs from "./pages/user/applications/Confirmed";
import ClosedJobs from "./pages/user/applications/Closed";
import Settings from "./pages/user/Settings";
import PersonalData from "./pages/user/settings/PersonalData";
import Gallery from "./pages/user/settings/Gallery";
import NotificationsSettings from "./pages/user/settings/Notifications";
import SocialInfo from "./pages/user/settings/SocialInfo";
import BioExperiences from "./pages/user/settings/BioExperiences";
import PhysicalInfo from "./pages/user/settings/PhysicalInfo";
import MoreInfo from "./pages/user/settings/MoreInfo";
import ChangeEmail from "./pages/user/settings/ChangeEmail";
import ChangePassword from "./pages/user/settings/ChangePassword";
import EditPhone from "./pages/user/settings/EditPhone";
import EditAddress from "./pages/user/settings/EditAddress";
import Documents from "./pages/user/settings/Documents";
import Contracts from "./pages/user/settings/Contracts";
import DisableProfile from "./pages/user/settings/DisableProfile";
import PaymentInfo from "./pages/user/settings/PaymentInfo";
import CreateJob from "./pages/company/CreateJob";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/dipendenti" element={<Dipendenti />} />
            <Route path="/promoter" element={<Promoter />} />
            <Route path="/aziende" element={<Aziende />} />
            <Route path="/contacts" element={<Contacts />} />
            <Route path="/faq-dipendenti" element={<FaqDipendenti />} />
            <Route path="/faq-aziende" element={<FaqAziende />} />
            <Route path="/come-funziona-hostess" element={<ComeFunzionaHostess />} />
            <Route path="/come-funziona-aziende" element={<ComeFunzionaAziende />} />
            <Route path="/crea-un-profilo-hostess-steward-di-successo" element={<CreateProfile />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/privacy" element={<Privacy />} />
            <Route path="/cookie" element={<Cookie />} />
            <Route path="/terms" element={<Terms />} />
            <Route path="/esplora-lavori" element={<ExploreJobs />} />
            <Route path="/lavoro/:id" element={<JobDetail />} />
            <Route path="/dipendente-milano/:id" element={<PublicProfile />} />
            <Route path="/user/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
            <Route path="/user/dashboard/notifications" element={<ProtectedRoute><Notifications /></ProtectedRoute>} />
            <Route path="/user/dashboard/feedbacks" element={<ProtectedRoute><Feedbacks /></ProtectedRoute>} />
            <Route path="/user/dashboard/applications/sended" element={<ProtectedRoute><SendedApplications /></ProtectedRoute>} />
            <Route path="/user/dashboard/applications/fastbooks" element={<ProtectedRoute><Fastbooks /></ProtectedRoute>} />
            <Route path="/user/dashboard/applications/confirmed" element={<ProtectedRoute><ConfirmedJobs /></ProtectedRoute>} />
            <Route path="/user/dashboard/applications/closed" element={<ProtectedRoute><ClosedJobs /></ProtectedRoute>} />
            <Route path="/user/settings" element={<ProtectedRoute><Settings /></ProtectedRoute>} />
            <Route path="/user/settings/edit-personal-data" element={<ProtectedRoute><PersonalData /></ProtectedRoute>} />
            <Route path="/user/settings/edit-gallery" element={<ProtectedRoute><Gallery /></ProtectedRoute>} />
            <Route path="/user/settings/edit-notifications" element={<ProtectedRoute><NotificationsSettings /></ProtectedRoute>} />
            <Route path="/user/settings/edit-social-info" element={<ProtectedRoute><SocialInfo /></ProtectedRoute>} />
            <Route path="/user/settings/edit-bio-and-experiences" element={<ProtectedRoute><BioExperiences /></ProtectedRoute>} />
            <Route path="/user/settings/edit-physical-info" element={<ProtectedRoute><PhysicalInfo /></ProtectedRoute>} />
            <Route path="/user/settings/edit-more-informations" element={<ProtectedRoute><MoreInfo /></ProtectedRoute>} />
            <Route path="/user/settings/change-email-address" element={<ProtectedRoute><ChangeEmail /></ProtectedRoute>} />
            <Route path="/user/settings/change-password" element={<ProtectedRoute><ChangePassword /></ProtectedRoute>} />
            <Route path="/user/settings/edit-phone" element={<ProtectedRoute><EditPhone /></ProtectedRoute>} />
            <Route path="/user/settings/edit-address" element={<ProtectedRoute><EditAddress /></ProtectedRoute>} />
            <Route path="/user/settings/edit-documents" element={<ProtectedRoute><Documents /></ProtectedRoute>} />
            <Route path="/user/settings/edit-contracts" element={<ProtectedRoute><Contracts /></ProtectedRoute>} />
            <Route path="/user/settings/disable-profile" element={<ProtectedRoute><DisableProfile /></ProtectedRoute>} />
            <Route path="/user/settings/payment-info" element={<ProtectedRoute><PaymentInfo /></ProtectedRoute>} />
            <Route path="/company/create-job" element={<ProtectedRoute><CreateJob /></ProtectedRoute>} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
