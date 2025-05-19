
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import './particles.css'

// Remove the direct rendering of ThreeDBackground and ParticlesBackground components here
// They are already being rendered inside specific pages

createRoot(document.getElementById("root")!).render(
  <App />
);
