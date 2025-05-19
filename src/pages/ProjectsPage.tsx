
import React, { useState, useEffect } from "react";
import AnimatedPage from "@/components/AnimatedPage";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Github, ExternalLink, Star, GitFork } from "lucide-react";
import Button from "@/components/atoms/Button";

interface Project {
  id: string;
  name: string;
  description: string;
  url: string;
  github: string;
  image: string;
  category: string[];
  stars: number;
  forks: number;
  language: string;
  languageColor: string;
}

const projects: Project[] = [
  {
    id: "1",
    name: "React Component Library",
    description: "A comprehensive library of reusable React components with accessibility and performance in mind.",
    url: "https://example.com/react-components",
    github: "https://github.com/example/react-components",
    image: "https://images.unsplash.com/photo-1581276879432-15e50529f34b?q=80&w=2670&auto=format&fit=crop",
    category: ["frontend", "react", "library"],
    stars: 342,
    forks: 78,
    language: "TypeScript",
    languageColor: "#3178C6"
  },
  {
    id: "2",
    name: "GraphQL API Framework",
    description: "A scalable GraphQL API framework with built-in authentication, caching, and data validation.",
    url: "https://example.com/graphql-framework",
    github: "https://github.com/example/graphql-framework",
    image: "https://images.unsplash.com/photo-1621839673705-6617adf9e890?q=80&w=2532&auto=format&fit=crop",
    category: ["backend", "api", "graphql"],
    stars: 521,
    forks: 124,
    language: "JavaScript",
    languageColor: "#F7DF1E"
  },
  {
    id: "3",
    name: "AI Image Generation Tool",
    description: "A tool that uses machine learning to generate unique images from text descriptions.",
    url: "https://example.com/ai-image-tool",
    github: "https://github.com/example/ai-image-tool",
    image: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?q=80&w=2670&auto=format&fit=crop",
    category: ["ai", "tool", "fullstack"],
    stars: 895,
    forks: 203,
    language: "Python",
    languageColor: "#3776AB"
  },
  {
    id: "4",
    name: "Mobile App Template",
    description: "A starter template for cross-platform mobile app development using React Native.",
    url: "https://example.com/mobile-template",
    github: "https://github.com/example/mobile-template",
    image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?q=80&w=2670&auto=format&fit=crop",
    category: ["mobile", "react", "template"],
    stars: 214,
    forks: 67,
    language: "JavaScript",
    languageColor: "#F7DF1E"
  },
  {
    id: "5",
    name: "Serverless Function Collection",
    description: "A collection of serverless functions for common web development tasks.",
    url: "https://example.com/serverless-functions",
    github: "https://github.com/example/serverless-functions",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2670&auto=format&fit=crop",
    category: ["backend", "serverless", "cloud"],
    stars: 178,
    forks: 42,
    language: "TypeScript",
    languageColor: "#3178C6"
  },
  {
    id: "6",
    name: "WebAssembly Game Engine",
    description: "A high-performance game engine built with WebAssembly for browser-based gaming.",
    url: "https://example.com/wasm-game-engine",
    github: "https://github.com/example/wasm-game-engine",
    image: "https://images.unsplash.com/photo-1556438064-2d7646166914?q=80&w=2574&auto=format&fit=crop",
    category: ["game", "webassembly", "frontend"],
    stars: 645,
    forks: 132,
    language: "Rust",
    languageColor: "#DEA584"
  }
];

// Generate unique categories from project data
const allCategories = ["all", ...new Set(projects.flatMap(project => project.category))];

const ProjectsPage = () => {
  const [activeTab, setActiveTab] = useState("all");
  const [filteredProjects, setFilteredProjects] = useState(projects);
  
  // Filter projects when tab changes
  useEffect(() => {
    if (activeTab === "all") {
      setFilteredProjects(projects);
    } else {
      setFilteredProjects(projects.filter(project => project.category.includes(activeTab)));
    }
  }, [activeTab]);

  return (
    <AnimatedPage>
      <Navbar />
      <div className="container mx-auto px-4 py-16">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold">Our Projects</h1>
          <p className="mt-4 text-lg max-w-2xl mx-auto">
            Explore our collection of projects that showcase our skills and innovation.
          </p>
        </motion.div>

        <Tabs 
          defaultValue="all" 
          value={activeTab} 
          onValueChange={setActiveTab}
          className="mb-8"
        >
          <div className="flex justify-center">
            <TabsList className="mb-8">
              {allCategories.map(category => (
                <TabsTrigger 
                  key={category} 
                  value={category}
                  className="capitalize"
                >
                  {category}
                </TabsTrigger>
              ))}
            </TabsList>
          </div>

          <TabsContent value={activeTab}>
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
              >
                {filteredProjects.map((project, index) => (
                  <motion.div
                    key={project.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ 
                      opacity: 1, 
                      y: 0,
                      transition: { delay: 0.1 * index, duration: 0.5 }
                    }}
                  >
                    <Card className="h-full flex flex-col bg-black/40 backdrop-blur-lg border border-white/10 overflow-hidden">
                      <div className="relative h-48">
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent z-10" />
                        <div 
                          className="h-full w-full bg-cover bg-center"
                          style={{ backgroundImage: `url(${project.image})` }}
                        />
                        <div className="absolute bottom-4 left-4 z-20 flex flex-wrap gap-2">
                          {project.category.map(cat => (
                            <Badge key={cat} className="capitalize bg-black/60 backdrop-blur-sm">
                              {cat}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      
                      <CardHeader className="pb-2">
                        <CardTitle className="flex items-center justify-between">
                          <span>{project.name}</span>
                          <div 
                            className="h-3 w-3 rounded-full" 
                            style={{ backgroundColor: project.languageColor }}
                          />
                        </CardTitle>
                        <div className="text-sm text-muted-foreground">{project.language}</div>
                      </CardHeader>
                      
                      <CardContent className="flex-grow pb-2">
                        <p className="text-sm text-muted-foreground">{project.description}</p>
                      </CardContent>
                      
                      <CardFooter className="flex justify-between pt-4 border-t border-white/10">
                        <div className="flex space-x-3 text-sm">
                          <div className="flex items-center">
                            <Star size={16} className="mr-1 text-yellow-400" />
                            <span>{project.stars}</span>
                          </div>
                          <div className="flex items-center">
                            <GitFork size={16} className="mr-1 text-muted-foreground" />
                            <span>{project.forks}</span>
                          </div>
                        </div>
                        
                        <div className="flex space-x-2">
                          <Button size="sm" variant="ghost" as="a" href={project.github} target="_blank" rel="noopener noreferrer">
                            <Github size={16} />
                          </Button>
                          <Button size="sm" variant="ghost" as="a" href={project.url} target="_blank" rel="noopener noreferrer">
                            <ExternalLink size={16} />
                          </Button>
                        </div>
                      </CardFooter>
                    </Card>
                  </motion.div>
                ))}
              </motion.div>
            </AnimatePresence>
          </TabsContent>
        </Tabs>
      </div>
      <Footer />
    </AnimatedPage>
  );
};

export default ProjectsPage;
