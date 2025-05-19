
import React, { useEffect, memo } from "react";

const ParticlesBackground = () => {
  useEffect(() => {
    // Load particles.js and configure it
    const loadParticles = async () => {
      try {
        // Create particles container if it doesn't exist
        if (!document.getElementById('particles-js')) {
          const particlesContainer = document.createElement('div');
          particlesContainer.id = 'particles-js';
          particlesContainer.className = 'fixed inset-0 -z-10';
          document.body.appendChild(particlesContainer);
        }
        
        // @ts-ignore - particles.js is loaded externally
        if (window.particlesJS) {
          // @ts-ignore
          window.particlesJS('particles-js', {
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
        } else {
          console.warn('particles.js not loaded');
        }
      } catch (error) {
        console.error("Failed to load particles.js", error);
      }
    };

    // Add a small delay to ensure DOM is fully loaded
    setTimeout(() => {
      loadParticles();
    }, 100);
    
    return () => {
      // Cleanup function
      const particlesContainer = document.getElementById('particles-js');
      if (particlesContainer && particlesContainer.parentNode) {
        particlesContainer.parentNode.removeChild(particlesContainer);
      }
    };
  }, []);

  return null;
};

export default memo(ParticlesBackground);
