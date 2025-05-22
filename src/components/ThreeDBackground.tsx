
import React, { useRef } from "react";
import * as THREE from "three";
import { useFrame, Canvas } from "@react-three/fiber";
import { OrbitControls, Sphere } from "@react-three/drei";

interface ParticleProps {
  count?: number;
  color?: string;
}

interface ParticlePosition {
  x: number;
  y: number;
  z: number;
}

const Particles: React.FC<ParticleProps> = ({ count = 1000, color = "#8B5CF6" }) => {
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
        z: temp.position.z 
      });
    }
    
    mesh.current.instanceMatrix.needsUpdate = true;
  }, [count]);
  
  useFrame(({ clock }) => {
    if (!mesh.current || particles.current.length === 0) return;
    
    const time = clock.getElapsedTime() * 0.1;
    const temp = new THREE.Object3D();
    
    for (let i = 0; i < particles.current.length; i++) {
      const particle = particles.current[i];
      
      // Rotate around y axis
      const x = particle.x;
      const z = particle.z;
      
      temp.position.x = x * Math.cos(time) + z * Math.sin(time);
      temp.position.z = -x * Math.sin(time) + z * Math.cos(time);
      temp.position.y = particle.y;
      
      const scale = (Math.sin(time * 2 + i) * 0.2 + 0.8) * 0.3;
      temp.scale.set(scale, scale, scale);
      
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
      <meshBasicMaterial color={color} transparent opacity={0.6} />
    </instancedMesh>
  );
};

const GradientSphere = () => {
  const mesh = useRef<THREE.Mesh>(null);
  
  useFrame(({ clock }) => {
    if (!mesh.current) return;
    
    mesh.current.rotation.z = clock.getElapsedTime() * 0.1;
    mesh.current.rotation.y = clock.getElapsedTime() * 0.15;
  });
  
  return (
    <Sphere 
      args={[8, 64, 64]} 
      ref={mesh}
    >
      <meshBasicMaterial color="#4F46E5" wireframe opacity={0.2} transparent />
    </Sphere>
  );
};

const ThreeDBackground: React.FC = () => {
  // Add error handling for the Canvas component
  const [hasError, setHasError] = React.useState(false);
  
  // If WebGL is not supported or we encountered an error, show a simple fallback
  if (hasError) {
    return (
      <div className="fixed inset-0 -z-10 bg-gradient-to-br from-background to-background/80 via-primary/5"></div>
    );
  }
  
  return (
    <div className="fixed inset-0 -z-10">
      <React.Suspense fallback={<div className="fixed inset-0 -z-10 bg-gradient-to-br from-background to-background/80 via-primary/5"></div>}>
        <ErrorBoundary onError={() => setHasError(true)}>
          <Canvas camera={{ position: [0, 0, 20], fov: 60 }}>
            <ambientLight intensity={0.5} />
            <directionalLight position={[10, 10, 10]} intensity={1} />
            <GradientSphere />
            <Particles count={500} color="#8B5CF6" />
            <Particles count={300} color="#06B6D4" />
            <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={0.5} />
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
