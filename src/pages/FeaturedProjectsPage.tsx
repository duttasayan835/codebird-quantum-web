
import React from "react";
import AnimatedPage from "../components/AnimatedPage";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const FeaturedProjectsPage = () => {
  const featuredProjects = [
    {
      id: 1,
      title: "Quantum Code Editor",
      description: "Next-generation code editor with AI-powered suggestions and real-time collaboration features.",
      tags: ["React", "TypeScript", "WebAssembly"]
    },
    {
      id: 2,
      title: "Nebula Design System",
      description: "A comprehensive design system for building scalable and accessible web applications.",
      tags: ["Design System", "CSS", "Accessibility"]
    },
    {
      id: 3,
      title: "CodeBird Terminal",
      description: "An innovative terminal experience with enhanced visualization and productivity features.",
      tags: ["Electron", "Node.js", "WebGL"]
    }
  ];

  return (
    <AnimatedPage>
      <div className="container mx-auto px-4 py-16">
        <motion.h1 
          className="text-4xl font-bold mb-8 text-center"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Featured Projects
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
            <Link to="/projects/featured" className="px-6 py-3 rounded-full bg-primary text-primary-foreground font-medium">
              Featured Projects
            </Link>
            <Link to="/projects/open-source" className="px-6 py-3 rounded-full bg-secondary text-secondary-foreground font-medium">
              Open Source
            </Link>
          </div>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredProjects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 * index }}
            >
              <Card className="h-full flex flex-col border-2 border-primary">
                <CardHeader>
                  <CardTitle>{project.title}</CardTitle>
                </CardHeader>
                <CardContent className="flex-grow">
                  <p className="mb-4">{project.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map(tag => (
                      <Badge key={tag} variant="outline">{tag}</Badge>
                    ))}
                  </div>
                </CardContent>
                <CardFooter>
                  <button className="text-primary hover:underline">View Project</button>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </AnimatedPage>
  );
};

export default FeaturedProjectsPage;
