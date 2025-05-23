
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { AuthProvider } from "./contexts/AuthContext";
import { useState, useEffect } from "react";
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
import AdminLogin from "./pages/AdminLogin";
import TermsPage from "./pages/TermsPage";
import PrivacyPage from "./pages/PrivacyPage";
import CookiesPage from "./pages/CookiesPage";
import NotFound from "./pages/NotFound";
import AuthPage from "./pages/AuthPage";
import ProfilePage from "./pages/ProfilePage";
import InferencePage from "./pages/InferencePage";
import QuantumCursor from "./components/QuantumCursor";
import AIAssistant from "./components/AIAssistant";

const queryClient = new QueryClient();

const App = () => {
  const [showAIAssistant, setShowAIAssistant] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  
  // Check if device is mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    checkMobile();
    window.addEventListener("resize", checkMobile);
    
    return () => window.removeEventListener("resize", checkMobile);
  }, []);
  
  // Toggle AI Assistant
  const toggleAIAssistant = () => {
    setShowAIAssistant(prev => !prev);
  };
  
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <AuthProvider>
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
                <Route path="/inference" element={<InferencePage />} />
                <Route path="/admin" element={<AdminPage />} />
                <Route path="/admin-login" element={<AdminLogin />} />
                <Route path="/terms" element={<TermsPage />} />
                <Route path="/privacy" element={<PrivacyPage />} />
                <Route path="/cookies" element={<CookiesPage />} />
                <Route path="/auth" element={<AuthPage />} />
                <Route path="/profile" element={<ProfilePage />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </AnimatePresence>
            
            {/* AI Assistant Button */}
            <button
              onClick={toggleAIAssistant}
              className="fixed bottom-6 right-6 z-40 w-12 h-12 rounded-full bg-primary text-white shadow-lg flex items-center justify-center hover:bg-primary/90 transition-all animate-pulse"
              aria-label="Open AI Assistant"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M12 8V4H8"></path>
                <rect width="16" height="12" x="4" y="8" rx="2"></rect>
                <path d="M2 14h2"></path>
                <path d="M20 14h2"></path>
                <path d="M15 13v2"></path>
                <path d="M9 13v2"></path>
              </svg>
            </button>
            
            {/* AI Assistant */}
            <AnimatePresence>
              {showAIAssistant && (
                <AIAssistant
                  onClose={toggleAIAssistant}
                  initialPrompt="Hello! I'm your Codebird AI assistant. How can I help you today?"
                />
              )}
            </AnimatePresence>
            
            {/* Quantum Cursor (only on desktop) */}
            {!isMobile && <QuantumCursor />}
          </AuthProvider>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
