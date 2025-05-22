
import React, { Suspense } from "react";
import HeroSection from "../components/HeroSection";
import FeaturesSection from "../components/FeaturesSection";
import UpcomingEventsSection from "../components/UpcomingEventsSection";
import CtaSection from "../components/CtaSection";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import AnimatedPage from "../components/AnimatedPage";
import ParticlesBackground from "../components/ParticlesBackground";
import { useAuth } from "@/contexts/AuthContext";

// Use lazy loading for ThreeDBackground
const ThreeDBackground = React.lazy(() => 
  import("../components/ThreeDBackground")
    .then(module => ({ default: module.default }))
    .catch(() => ({
      default: () => <div className="fixed inset-0 -z-10 bg-gradient-to-br from-background via-primary/5 to-background/80"></div>
    }))
);

const Index = () => {
  const { user } = useAuth();
  const [backgroundError, setBackgroundError] = React.useState(false);

  const handleBackgroundError = () => {
    console.error("Failed to load ThreeDBackground");
    setBackgroundError(true);
  };

  return (
    <AnimatedPage>
      <Suspense fallback={<div className="fixed inset-0 -z-10 bg-gradient-to-br from-background via-primary/5 to-background/80"></div>}>
        {!backgroundError && (
          <ThreeDBackground onError={handleBackgroundError} />
        )}
      </Suspense>
      <ParticlesBackground />
      <Navbar />
      <main>
        <HeroSection />
        <FeaturesSection />
        <UpcomingEventsSection />
        <CtaSection />
      </main>
      <Footer />
    </AnimatedPage>
  );
};

export default Index;
