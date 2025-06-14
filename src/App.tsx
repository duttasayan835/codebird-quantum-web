
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import { ThemeProvider } from "@/contexts/ThemeContext";
import Index from "./pages/Index";
import AuthPage from "./pages/AuthPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import AuthCallbackPage from "./pages/AuthCallbackPage";
import AdminLogin from "./pages/AdminLogin";
import AdminPage from "./pages/AdminPage";
import SuperAdminPage from "./pages/SuperAdminPage";
import UserDashboard from "./pages/UserDashboard";
import EventsPage from "./pages/EventsPage";
import EventDetail from "./pages/EventDetail";
import ProjectsPage from "./pages/ProjectsPage";
import FeaturedProjectsPage from "./pages/FeaturedProjectsPage";
import OpenSourceProjectsPage from "./pages/OpenSourceProjectsPage";
import ResourcesPage from "./pages/ResourcesPage";
import TutorialsPage from "./pages/TutorialsPage";
import ChallengesPage from "./pages/ChallengesPage";
import BlogPage from "./pages/BlogPage";
import AboutPage from "./pages/AboutPage";
import TeamPage from "./pages/TeamPage";
import ContactPage from "./pages/ContactPage";
import JoinPage from "./pages/JoinPage";
import GalleryPage from "./pages/GalleryPage";
import ProfilePage from "./pages/ProfilePage";
import InferencePage from "./pages/InferencePage";
import PrivacyPage from "./pages/PrivacyPage";
import TermsPage from "./pages/TermsPage";
import CookiesPage from "./pages/CookiesPage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <TooltipProvider>
          <Toaster />
          <BrowserRouter>
            <AuthProvider>
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/auth" element={<AuthPage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />
                <Route path="/auth/callback" element={<AuthCallbackPage />} />
                <Route path="/admin-login" element={<AdminLogin />} />
                <Route path="/admin" element={<AdminPage />} />
                <Route path="/superadmin" element={<SuperAdminPage />} />
                <Route path="/dashboard" element={<UserDashboard />} />
                <Route path="/events" element={<EventsPage />} />
                <Route path="/events/:id" element={<EventDetail />} />
                <Route path="/projects" element={<ProjectsPage />} />
                <Route path="/projects/featured" element={<FeaturedProjectsPage />} />
                <Route path="/projects/open-source" element={<OpenSourceProjectsPage />} />
                <Route path="/resources" element={<ResourcesPage />} />
                <Route path="/tutorials" element={<TutorialsPage />} />
                <Route path="/challenges" element={<ChallengesPage />} />
                <Route path="/blog" element={<BlogPage />} />
                <Route path="/about" element={<AboutPage />} />
                <Route path="/team" element={<TeamPage />} />
                <Route path="/contact" element={<ContactPage />} />
                <Route path="/join" element={<JoinPage />} />
                <Route path="/gallery" element={<GalleryPage />} />
                <Route path="/profile" element={<ProfilePage />} />
                <Route path="/inference" element={<InferencePage />} />
                <Route path="/privacy" element={<PrivacyPage />} />
                <Route path="/terms" element={<TermsPage />} />
                <Route path="/cookies" element={<CookiesPage />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </AuthProvider>
          </BrowserRouter>
        </TooltipProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
