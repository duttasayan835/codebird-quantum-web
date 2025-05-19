
import React from "react";
import HeroSection from "../components/HeroSection";
import FeaturesSection from "../components/FeaturesSection";
import UpcomingEventsSection from "../components/UpcomingEventsSection";
import CtaSection from "../components/CtaSection";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import AnimatedPage from "../components/AnimatedPage";
import ThreeDBackground from "../components/ThreeDBackground";
import ParticlesBackground from "../components/ParticlesBackground";

const Index = () => {
  return (
    <AnimatedPage>
      <ThreeDBackground />
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
