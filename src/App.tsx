
import { Suspense, lazy } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import Index from "./pages/Index";
import FuturisticCursor from "./components/FuturisticCursor";

// Lazy load components for better performance
const AboutPage = lazy(() => import("./pages/AboutPage"));
const TeamPage = lazy(() => import("./pages/TeamPage"));
const ProjectsPage = lazy(() => import("./pages/ProjectsPage"));
const EventsPage = lazy(() => import("./pages/EventsPage"));
const ResourcesPage = lazy(() => import("./pages/ResourcesPage"));
const BlogPage = lazy(() => import("./pages/BlogPage"));
const GalleryPage = lazy(() => import("./pages/GalleryPage"));
const ContactPage = lazy(() => import("./pages/ContactPage"));
const AuthPage = lazy(() => import("./pages/AuthPage"));
const AdminPage = lazy(() => import("./pages/AdminPage"));
const AdminLogin = lazy(() => import("./pages/AdminLogin"));
const UserDashboard = lazy(() => import("./pages/UserDashboard"));
const FeaturedProjectsPage = lazy(() => import("./pages/FeaturedProjectsPage"));
const OpenSourceProjectsPage = lazy(() => import("./pages/OpenSourceProjectsPage"));
const TutorialsPage = lazy(() => import("./pages/TutorialsPage"));
const ChallengesPage = lazy(() => import("./pages/ChallengesPage"));
const EventDetail = lazy(() => import("./pages/EventDetail"));
const ProfilePage = lazy(() => import("./pages/ProfilePage"));
const JoinPage = lazy(() => import("./pages/JoinPage"));
const InferencePage = lazy(() => import("./pages/InferencePage"));
const NotFound = lazy(() => import("./pages/NotFound"));
const PrivacyPage = lazy(() => import("./pages/PrivacyPage"));
const TermsPage = lazy(() => import("./pages/TermsPage"));
const CookiesPage = lazy(() => import("./pages/CookiesPage"));

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <AuthProvider>
            <FuturisticCursor />
            <Suspense fallback={
              <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 to-black">
                <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
              </div>
            }>
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
                <Route path="/auth" element={<AuthPage />} />
                <Route path="/admin" element={<AdminPage />} />
                <Route path="/admin-login" element={<AdminLogin />} />
                <Route path="/dashboard" element={<UserDashboard />} />
                <Route path="/profile" element={<ProfilePage />} />
                <Route path="/join" element={<JoinPage />} />
                <Route path="/inference" element={<InferencePage />} />
                <Route path="/privacy" element={<PrivacyPage />} />
                <Route path="/terms" element={<TermsPage />} />
                <Route path="/cookies" element={<CookiesPage />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </Suspense>
          </AuthProvider>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
