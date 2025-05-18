
import React, { useEffect } from "react";
import HeroSection from "../components/HeroSection";
import FeaturesSection from "../components/FeaturesSection";
import UpcomingEventsSection from "../components/UpcomingEventsSection";
import CtaSection from "../components/CtaSection";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import AnimatedPage from "../components/AnimatedPage";
import ThreeDBackground from "../components/ThreeDBackground";

const Index = () => {
  useEffect(() => {
    // Load particles.js and configure it
    const loadParticles = async () => {
      try {
        // @ts-ignore
        await window.particlesJS?.load('particles-js', {
          particles: {
            number: {
              value: 80,
              density: {
                enable: true,
                value_area: 800
              }
            },
            color: {
              value: "#8B5CF6"
            },
            shape: {
              type: "circle",
              stroke: {
                width: 0,
                color: "#000000"
              },
            },
            opacity: {
              value: 0.5,
              random: false,
            },
            size: {
              value: 3,
              random: true,
            },
            line_linked: {
              enable: true,
              distance: 150,
              color: "#8B5CF6",
              opacity: 0.4,
              width: 1
            },
            move: {
              enable: true,
              speed: 2,
              direction: "none",
              random: false,
              straight: false,
              out_mode: "out",
              bounce: false,
            }
          },
          interactivity: {
            detect_on: "canvas",
            events: {
              onhover: {
                enable: true,
                mode: "grab"
              },
              onclick: {
                enable: true,
                mode: "push"
              },
              resize: true
            },
            modes: {
              grab: {
                distance: 140,
                line_linked: {
                  opacity: 1
                }
              },
              push: {
                particles_nb: 4
              }
            }
          },
          retina_detect: true
        });
      } catch (error) {
        console.error("Failed to load particles.js", error);
      }
    };

    loadParticles();
  }, []);

  return (
    <AnimatedPage>
      <ThreeDBackground />
      <Navbar />
      <div id="particles-js" className="fixed inset-0 -z-10"></div>
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
