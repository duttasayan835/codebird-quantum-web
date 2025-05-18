
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import Index from "./pages/Index";
import AboutPage from "./pages/AboutPage";
import TeamPage from "./pages/TeamPage";
import ProjectsPage from "./pages/ProjectsPage";
import FeaturedProjectsPage from "./pages/FeaturedProjectsPage";
import OpenSourceProjectsPage from "./pages/OpenSourceProjectsPage";
import EventsPage from "./pages/EventsPage";
import EventDetail from "./pages/EventDetail";
import ResourcesPage from "./pages/ResourcesPage";
import TutorialsPage from "./pages/TutorialsPage";
import ChallengesPage from "./pages/ChallengesPage";
import BlogPage from "./pages/BlogPage";
import GalleryPage from "./pages/GalleryPage";
import ContactPage from "./pages/ContactPage";
import JoinPage from "./pages/JoinPage";
import AdminPage from "./pages/AdminPage";
import TermsPage from "./pages/TermsPage";
import PrivacyPage from "./pages/PrivacyPage";
import CookiesPage from "./pages/CookiesPage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AnimatePresence mode="wait">
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/team" element={<TeamPage />} />
            <Route path="/projects" element={<ProjectsPage />} />
            <Route path="/projects/featured" element={<FeaturedProjectsPage />} />
            <Route path="/projects/open-source" element={<OpenSourceProjectsPage />} />
            <Route path="/events" element={<EventsPage />} />
            <Route path="/events/:id" element={<EventDetail />} />
            <Route path="/resources" element={<ResourcesPage />} />
            <Route path="/resources/tutorials" element={<TutorialsPage />} />
            <Route path="/resources/challenges" element={<ChallengesPage />} />
            <Route path="/blog" element={<BlogPage />} />
            <Route path="/gallery" element={<GalleryPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/join" element={<JoinPage />} />
            <Route path="/admin" element={<AdminPage />} />
            <Route path="/terms" element={<TermsPage />} />
            <Route path="/privacy" element={<PrivacyPage />} />
            <Route path="/cookies" element={<CookiesPage />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AnimatePresence>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
