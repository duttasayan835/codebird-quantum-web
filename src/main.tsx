
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import './particles.css'
import ThreeDBackground from './components/ThreeDBackground.tsx'
import ParticlesBackground from './components/ParticlesBackground.tsx'

createRoot(document.getElementById("root")!).render(
  <>
    <ThreeDBackground />
    <ParticlesBackground />
    <App />
  </>
);
