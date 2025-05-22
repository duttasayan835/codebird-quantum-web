import React, { useState } from "react";
import AnimatedPage from "../components/AnimatedPage";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import ButtonLink from "@/components/atoms/ButtonLink";
import { FileText, BookOpen, Lightbulb, Clock, Layout, Code } from "lucide-react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const ResourcesPage = () => {
  const [viewMode, setViewMode] = useState<"list" | "grid">("grid");
  const [searchQuery, setSearchQuery] = useState("");
  
  // Resource categories and items
  const categories = ["All", "Roadmaps", "Guides", "Tutorials", "Challenges"];
  const [activeCategory, setActiveCategory] = useState("All");
  
  const resources = [
    {
      id: 1,
      title: "Frontend Development Roadmap",
      description: "A comprehensive guide to becoming a modern frontend developer",
      category: "Roadmaps",
      image: "https://source.unsplash.com/random/300x200?code",
      tags: ["HTML", "CSS", "JavaScript", "React"],
      link: "/resources/roadmap-frontend"
    },
    {
      id: 2,
      title: "Backend Development Roadmap",
      description: "Learn the path to becoming a backend developer",
      category: "Roadmaps",
      image: "https://source.unsplash.com/random/300x200?server",
      tags: ["Node.js", "Databases", "API", "Security"],
      link: "/resources/roadmap-backend"
    },
    {
      id: 3,
      title: "React Best Practices",
      description: "A guide to writing clean and efficient React code",
      category: "Guides",
      image: "https://source.unsplash.com/random/300x200?react",
      tags: ["React", "JavaScript", "Performance"],
      link: "/resources/react-best-practices"
    },
    {
      id: 4,
      title: "Building with Three.js",
      description: "Learn how to create 3D experiences for the web",
      category: "Tutorials",
      image: "https://source.unsplash.com/random/300x200?3d",
      tags: ["Three.js", "WebGL", "JavaScript"],
      link: "/resources/threejs-tutorial"
    },
    {
      id: 5,
      title: "Data Structures & Algorithms",
      description: "Master the fundamentals of computer science",
      category: "Guides",
      image: "https://source.unsplash.com/random/300x200?algorithm",
      tags: ["Algorithms", "Data Structures", "Problem Solving"],
      link: "/resources/dsa-guide"
    },
    {
      id: 6,
      title: "30-Day JavaScript Challenge",
      description: "Enhance your JS skills with daily coding challenges",
      category: "Challenges",
      image: "https://source.unsplash.com/random/300x200?challenge",
      tags: ["JavaScript", "Challenge", "Practice"],
      link: "/resources/challenges/javascript-30"
    },
    {
      id: 7,
      title: "CSS Layout Mastery",
      description: "Level up your CSS layout skills with practical examples",
      category: "Tutorials",
      image: "https://source.unsplash.com/random/300x200?css",
      tags: ["CSS", "Layout", "Flexbox", "Grid"],
      link: "/resources/css-layout-tutorial"
    },
    {
      id: 8,
      title: "API Design Guide",
      description: "Learn how to design robust and scalable APIs",
      category: "Guides",
      image: "https://source.unsplash.com/random/300x200?api",
      tags: ["API", "RESTful", "Design"],
      link: "/resources/api-design-guide"
    }
  ];
  
  // Filter resources based on active category and search query
  const filteredResources = resources.filter((resource) => {
    const matchesCategory = activeCategory === "All" || resource.category === activeCategory;
    const matchesSearch = 
      resource.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
      resource.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      resource.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    
    return matchesCategory && matchesSearch;
  });
  
  const ResourceCard = ({ resource }: { resource: typeof resources[0] }) => (
    <motion.div 
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      transition={{ duration: 0.4 }}
      className={`overflow-hidden ${viewMode === "grid" ? "h-full" : ""}`}
    >
      <Card className={`h-full ${viewMode === "list" ? "flex flex-row" : ""} overflow-hidden`}>
        <div 
          className={`${viewMode === "list" ? "w-1/4" : "h-40"} bg-cover bg-center`}
          style={{ backgroundImage: `url(${resource.image})` }}
        />
        <CardContent className={`flex flex-col ${viewMode === "list" ? "w-3/4 p-5" : "p-5"}`}>
          <h3 className="text-xl font-semibold mb-2">{resource.title}</h3>
          <p className="text-muted-foreground mb-3 flex-grow">{resource.description}</p>
          <div className="flex flex-wrap gap-2 mb-4">
            {resource.tags.map((tag) => (
              <Badge key={tag} variant="secondary">{tag}</Badge>
            ))}
          </div>
          <ButtonLink 
            to={resource.link}
            variant="outline"
            size="sm"
            className="self-start"
          >
            View Resource
          </ButtonLink>
        </CardContent>
      </Card>
    </motion.div>
  );
  
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
          Resources
        </motion.h1>
        
        <motion.div 
          className="max-w-3xl mx-auto mb-12 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <p className="text-lg mb-8">
            Explore our curated collection of guides, tutorials, and challenges designed to help you level up your skills.
          </p>
        </motion.div>
        
        <div className="mb-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="w-full md:w-1/2">
            <Input
              placeholder="Search resources..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full"
            />
          </div>
          
          <div className="flex gap-2 items-center">
            <span className="text-sm text-muted-foreground mr-2">View:</span>
            <Button
              variant={viewMode === "grid" ? "default" : "outline"}
              size="icon"
              onClick={() => setViewMode("grid")}
            >
              <Layout className="h-4 w-4" />
            </Button>
            <Button
              variant={viewMode === "list" ? "default" : "outline"}
              size="icon"
              onClick={() => setViewMode("list")}
            >
              <FileText className="h-4 w-4" />
            </Button>
          </div>
        </div>
        
        <Tabs defaultValue="All" value={activeCategory} onValueChange={setActiveCategory}>
          <TabsList className="w-full md:w-auto mb-6 grid grid-cols-2 md:flex">
            {categories.map((category) => (
              <TabsTrigger key={category} value={category}>
                {category}
              </TabsTrigger>
            ))}
          </TabsList>
          
          <TabsContent value={activeCategory} className="mt-0">
            <AnimatePresence>
              <div className={`grid gap-6 ${viewMode === "grid" ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-3" : "grid-cols-1"}`}>
                {filteredResources.map((resource) => (
                  <ResourceCard key={resource.id} resource={resource} />
                ))}
              </div>
            </AnimatePresence>
            
            {filteredResources.length === 0 && (
              <div className="text-center py-12">
                <FileText className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
                <h3 className="text-xl font-semibold">No resources found</h3>
                <p className="text-muted-foreground mt-2">
                  Try changing your search or filter criteria
                </p>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
      <Footer />
    </AnimatedPage>
  );
};

export default ResourcesPage;
