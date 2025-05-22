
import React from "react";
import AnimatedPage from "../components/AnimatedPage";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ExternalLink, Github, Star } from "lucide-react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const OpenSourceProjectsPage = () => {
  const openSourceProjects = [
    {
      id: 1,
      title: "CodeBird UI",
      description: "An open-source UI component library with accessibility and performance in mind.",
      stars: 1245,
      tags: ["React", "TypeScript", "Tailwind"]
    },
    {
      id: 2,
      title: "Quantum State",
      description: "A lightweight state management solution for modern web applications.",
      stars: 867,
      tags: ["JavaScript", "State Management", "Zero Dependencies"]
    },
    {
      id: 3,
      title: "Particle.js Extensions",
      description: "Our community-driven extensions for the popular Particle.js library.",
      stars: 543,
      tags: ["Canvas", "Animation", "WebGL"]
    },
    {
      id: 4,
      title: "React Three Utils",
      description: "Utility functions and hooks for Three.js and React integration.",
      stars: 329,
      tags: ["React", "Three.js", "3D"]
    }
  ];

  return (
    <AnimatedPage>
      <Navbar />
      <div className="container mx-auto px-4 py-16">
        <motion.h1 
          className="text-4xl font-bold mb-8 text-center"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Open Source Projects
        </motion.h1>
        
        <motion.div 
          className="max-w-4xl mx-auto mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div className="flex justify-center space-x-4 mb-12">
            <Link to="/projects" className="px-6 py-3 rounded-full bg-secondary text-secondary-foreground font-medium">
              All Projects
            </Link>
            <Link to="/projects/featured" className="px-6 py-3 rounded-full bg-secondary text-secondary-foreground font-medium">
              Featured Projects
            </Link>
            <Link to="/projects/open-source" className="px-6 py-3 rounded-full bg-primary text-primary-foreground font-medium">
              Open Source
            </Link>
          </div>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {openSourceProjects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 * index }}
            >
              <Card className="h-full flex flex-col">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle>{project.title}</CardTitle>
                    <div className="flex items-center gap-1">
                      <Star size={16} className="fill-yellow-400 stroke-yellow-400" />
                      <span>{project.stars}</span>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="flex-grow">
                  <p className="mb-4">{project.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map(tag => (
                      <Badge key={tag} variant="outline">{tag}</Badge>
                    ))}
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <button className="flex items-center gap-2 text-primary hover:underline">
                    <Github size={16} />
                    View on GitHub
                  </button>
                  <button className="flex items-center gap-2 text-primary hover:underline">
                    <ExternalLink size={16} />
                    Demo
                  </button>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
      <Footer />
    </AnimatedPage>
  );
};

export default OpenSourceProjectsPage;
