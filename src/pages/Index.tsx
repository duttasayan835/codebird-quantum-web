
import React from "react";
import HeroSection from "../components/HeroSection";
import FeaturesSection from "../components/FeaturesSection";
import UpcomingEventsSection from "../components/UpcomingEventsSection";
import CtaSection from "../components/CtaSection";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <main>
        <HeroSection />
        <FeaturesSection />
        <UpcomingEventsSection />
        <CtaSection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
