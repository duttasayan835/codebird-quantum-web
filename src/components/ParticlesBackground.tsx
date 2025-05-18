
import React, { useEffect } from "react";
import { useCallback } from "react";
import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";
import { Engine } from "tsparticles-engine";

const ParticlesBackground: React.FC = () => {
  const particlesInit = useCallback(async (engine: Engine) => {
    await loadFull(engine);
  }, []);

  useEffect(() => {
    // Setup quantum cursor
    const cursorDot = document.createElement("div");
    const cursorTrails: HTMLDivElement[] = [];
    const numTrails = 10;
    
    cursorDot.classList.add("quantum-cursor");
    document.body.appendChild(cursorDot);
    
    for (let i = 0; i < numTrails; i++) {
      const trail = document.createElement("div");
      trail.classList.add("quantum-cursor-trail");
      document.body.appendChild(trail);
      cursorTrails.push(trail);
    }
    
    let mouseX = 0;
    let mouseY = 0;
    let trailPositions: { x: number; y: number }[] = [];
    
    window.addEventListener("mousemove", (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      
      cursorDot.style.transform = `translate(${mouseX - 10}px, ${mouseY - 10}px)`;
      
      // Update trail positions
      trailPositions.unshift({ x: mouseX, y: mouseY });
      if (trailPositions.length > numTrails) {
        trailPositions = trailPositions.slice(0, numTrails);
      }
      
      // Update trail elements
      cursorTrails.forEach((trail, i) => {
        if (trailPositions[i]) {
          const opacity = 1 - (i / numTrails) * 0.8;
          const scale = 1 - (i / numTrails) * 0.7;
          trail.style.transform = `translate(${trailPositions[i].x - 3}px, ${trailPositions[i].y - 3}px) scale(${scale})`;
          trail.style.opacity = opacity.toString();
        }
      });
    });
    
    return () => {
      // Cleanup
      document.body.removeChild(cursorDot);
      cursorTrails.forEach((trail) => {
        document.body.removeChild(trail);
      });
    };
  }, []);

  return (
    <Particles
      id="particles-js"
      init={particlesInit}
      options={{
        particles: {
          number: {
            value: 100,
            density: { enable: true, value_area: 800 }
          },
          color: {
            value: ["#8B5CF6", "#06B6D4", "#4F46E5"]
          },
          opacity: {
            value: 0.5,
            random: true,
            anim: {
              enable: true,
              speed: 1,
              opacity_min: 0.1,
              sync: false
            }
          },
          size: {
            value: 3,
            random: true,
            anim: {
              enable: true,
              speed: 2,
              size_min: 0.1,
              sync: false
            }
          },
          line_linked: {
            enable: true,
            distance: 150,
            color: "#8B5CF6",
            opacity: 0.2,
            width: 1
          },
          move: {
            enable: true,
            speed: 1,
            direction: "none",
            random: true,
            straight: false,
            out_mode: "out",
            bounce: false,
            attract: {
              enable: true,
              rotateX: 600,
              rotateY: 1200
            }
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
                opacity: 0.5
              }
            },
            push: {
              particles_nb: 3
            }
          }
        },
        retina_detect: true
      }}
    />
  );
};

export default ParticlesBackground;
