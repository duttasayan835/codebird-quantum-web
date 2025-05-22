
import React, { useRef, useEffect, useState } from "react";
import * as THREE from "three";
import { useFrame, Canvas } from "@react-three/fiber";
import { OrbitControls, Sphere, Environment, useGLTF, MeshDistortMaterial } from "@react-three/drei";

interface ParticleProps {
  count?: number;
  color?: string;
  mousePosition?: { x: number, y: number };
  interactionStrength?: number;
}

interface ParticlePosition {
  x: number;
  y: number;
  z: number;
  originalX: number;
  originalY: number;
  originalZ: number;
  velocity: { x: number, y: number, z: number };
}

interface ThreeDBackgroundProps {
  onError?: () => void;
}

const Particles: React.FC<ParticleProps> = ({ 
  count = 1000, 
  color = "#8B5CF6",
  mousePosition = { x: 0, y: 0 },
  interactionStrength = 0.3
}) => {
  const mesh = useRef<THREE.InstancedMesh>(null);
  const particles = useRef<ParticlePosition[]>([]);
  
  React.useEffect(() => {
    // Initialize particles
    if (!mesh.current) return;
    
    particles.current = [];
    const temp = new THREE.Object3D();
    
    for (let i = 0; i < count; i++) {
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      const radius = 10 + Math.random() * 10;
      
      const x = radius * Math.sin(phi) * Math.cos(theta);
      const y = radius * Math.sin(phi) * Math.sin(theta);
      const z = radius * Math.cos(phi);
      
      temp.position.set(x, y, z);
      
      const scale = Math.random() * 0.5 + 0.1;
      temp.scale.set(scale, scale, scale);
      
      temp.updateMatrix();
      mesh.current.setMatrixAt(i, temp.matrix);
      
      particles.current.push({ 
        x: temp.position.x, 
        y: temp.position.y, 
        z: temp.position.z,
        originalX: temp.position.x,
        originalY: temp.position.y,
        originalZ: temp.position.z,
        velocity: { x: 0, y: 0, z: 0 }
      });
    }
    
    mesh.current.instanceMatrix.needsUpdate = true;
  }, [count]);
  
  useFrame(({ clock, mouse }) => {
    if (!mesh.current || particles.current.length === 0) return;
    
    const time = clock.getElapsedTime() * 0.1;
    const temp = new THREE.Object3D();
    
    // Create 3D mouse position from 2D screen coordinates
    const mouseX = (mousePosition.x - 0.5) * 20;
    const mouseY = (mousePosition.y - 0.5) * -20;
    const mouseVector = new THREE.Vector3(mouseX, mouseY, 15);
    
    for (let i = 0; i < particles.current.length; i++) {
      const particle = particles.current[i];
      
      // Base rotation animation
      const x = particle.originalX;
      const z = particle.originalZ;
      
      particle.x = x * Math.cos(time) + z * Math.sin(time);
      particle.z = -x * Math.sin(time) + z * Math.cos(time);
      particle.y = particle.originalY + Math.sin(time * 2 + i * 0.1) * 0.5;
      
      // Mouse interaction - particles are attracted to mouse position
      const particlePos = new THREE.Vector3(particle.x, particle.y, particle.z);
      const distance = particlePos.distanceTo(mouseVector);
      
      if (distance < 8) {
        // Move towards mouse with an elastic effect
        const force = (8 - distance) / 8; // Normalized force
        const direction = new THREE.Vector3().subVectors(mouseVector, particlePos).normalize();
        
        particle.velocity.x += direction.x * force * interactionStrength;
        particle.velocity.y += direction.y * force * interactionStrength;
        particle.velocity.z += direction.z * force * interactionStrength;
      }
      
      // Apply velocity with damping
      particle.x += particle.velocity.x;
      particle.y += particle.velocity.y;
      particle.z += particle.velocity.z;
      
      particle.velocity.x *= 0.9;
      particle.velocity.y *= 0.9;
      particle.velocity.z *= 0.9;
      
      // Return to original position slowly
      particle.x = particle.x * 0.97 + particle.originalX * 0.03;
      particle.y = particle.y * 0.97 + particle.originalY * 0.03;
      particle.z = particle.z * 0.97 + particle.originalZ * 0.03;
      
      // Apply position and add some "breathing" to the scale
      temp.position.set(particle.x, particle.y, particle.z);
      
      const pulseScale = (Math.sin(time * 2 + i) * 0.2 + 0.8) * 0.3;
      temp.scale.set(pulseScale, pulseScale, pulseScale);
      
      temp.updateMatrix();
      mesh.current.setMatrixAt(i, temp.matrix);
    }
    
    mesh.current.instanceMatrix.needsUpdate = true;
  });
  
  return (
    <instancedMesh 
      ref={mesh} 
      args={[undefined, undefined, count]}
    >
      <sphereGeometry args={[0.5, 8, 8]} />
      <meshPhongMaterial color={color} transparent opacity={0.6} />
    </instancedMesh>
  );
};

const GradientSphere = () => {
  const mesh = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);
  
  useFrame(({ clock }) => {
    if (!mesh.current) return;
    
    mesh.current.rotation.z = clock.getElapsedTime() * 0.1;
    mesh.current.rotation.y = clock.getElapsedTime() * 0.15;
    
    // Apply a pulsing effect when hovered
    if (hovered) {
      const pulse = Math.sin(clock.getElapsedTime() * 3) * 0.05 + 1;
      mesh.current.scale.set(pulse, pulse, pulse);
    }
  });
  
  return (
    <Sphere 
      args={[8, 64, 64]} 
      ref={mesh}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
    >
      <MeshDistortMaterial
        color="#4F46E5"
        attach="material"
        distort={0.3}
        speed={2}
        wireframe={true}
        opacity={0.2}
        transparent={true}
      />
    </Sphere>
  );
};

// Floating cubes that move randomly
const FloatingCubes = () => {
  const cubeRefs = useRef<THREE.Mesh[]>([]);
  
  useFrame(({ clock }) => {
    cubeRefs.current.forEach((cube, i) => {
      if (!cube) return;
      
      const t = clock.getElapsedTime() + i * 100;
      
      // Create a floating motion pattern
      cube.position.y = Math.sin(t * 0.5 + i) * 1.5;
      cube.position.x = Math.cos(t * 0.3 + i * 2) * 1.5;
      cube.position.z = Math.sin(t * 0.2 + i * 3) * 1.5;
      
      // Rotate the cubes
      cube.rotation.x = t * 0.1;
      cube.rotation.y = t * 0.2;
    });
  });
  
  return (
    <group>
      {[...Array(5)].map((_, i) => (
        <mesh 
          key={i} 
          ref={el => el && (cubeRefs.current[i] = el)}
          position={[
            (Math.random() - 0.5) * 20, 
            (Math.random() - 0.5) * 20, 
            (Math.random() - 0.5) * 20
          ]}
          scale={0.5}
        >
          <boxGeometry />
          <meshPhongMaterial 
            color={i % 2 === 0 ? "#06B6D4" : "#8B5CF6"}
            wireframe 
            transparent 
            opacity={0.3}
          />
        </mesh>
      ))}
    </group>
  );
};

const ThreeDBackground: React.FC<ThreeDBackgroundProps> = ({ onError }) => {
  // Track mouse position for particle interaction
  const [mousePosition, setMousePosition] = useState({ x: 0.5, y: 0.5 });
  
  // Add error handling for the Canvas component
  const [hasError, setHasError] = useState(false);
  
  useEffect(() => {
    // Check if WebGL is supported
    try {
      const canvas = document.createElement('canvas');
      const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
      
      if (!gl) {
        throw new Error('WebGL not supported');
      }
      
      // Mouse move event for the entire window
      const handleMouseMove = (e: MouseEvent) => {
        setMousePosition({
          x: e.clientX / window.innerWidth,
          y: e.clientY / window.innerHeight
        });
      };
      
      window.addEventListener('mousemove', handleMouseMove);
      
      return () => {
        window.removeEventListener('mousemove', handleMouseMove);
      };
    } catch (error) {
      console.error("WebGL not supported:", error);
      setHasError(true);
      if (onError) onError();
    }
  }, [onError]);
  
  // If WebGL is not supported or we encountered an error, show a simple fallback
  if (hasError) {
    return (
      <div className="fixed inset-0 -z-10 bg-gradient-to-br from-background to-background/80 via-primary/5"></div>
    );
  }
  
  return (
    <div className="fixed inset-0 -z-10">
      <React.Suspense fallback={<div className="fixed inset-0 -z-10 bg-gradient-to-br from-background to-background/80 via-primary/5"></div>}>
        <ErrorBoundary onError={() => {
          setHasError(true);
          if (onError) onError();
        }}>
          <Canvas camera={{ position: [0, 0, 20], fov: 60 }}>
            <ambientLight intensity={0.5} />
            <directionalLight position={[10, 10, 10]} intensity={1} />
            <spotLight position={[0, 15, 0]} angle={0.3} penumbra={1} castShadow intensity={1} decay={0} />
            
            <GradientSphere />
            <Particles count={500} color="#8B5CF6" mousePosition={mousePosition} interactionStrength={0.3} />
            <Particles count={300} color="#06B6D4" mousePosition={mousePosition} interactionStrength={0.2} />
            <FloatingCubes />
            
            <Environment preset="sunset" />
            <OrbitControls 
              enableZoom={false} 
              enablePan={false} 
              autoRotate 
              autoRotateSpeed={0.5}
              maxPolarAngle={Math.PI / 2}
              minPolarAngle={Math.PI / 2.5}
            />
          </Canvas>
        </ErrorBoundary>
      </React.Suspense>
    </div>
  );
};

// Simple error boundary component
class ErrorBoundary extends React.Component<{
  children: React.ReactNode;
  onError: () => void;
}> {
  componentDidCatch(error: Error) {
    console.error("Error in ThreeDBackground:", error);
    this.props.onError();
  }
  
  render() {
    return this.props.children;
  }
}

export default ThreeDBackground;
