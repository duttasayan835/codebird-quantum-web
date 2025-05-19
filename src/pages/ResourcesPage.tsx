
import React, { useState } from "react";
import AnimatedPage from "@/components/AnimatedPage";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Toggle } from "@/components/ui/toggle";
import { Link } from "react-router-dom";
import { 
  FileText, BookOpen, Award, Download, 
  GridIcon, List, Grid2x2, Grid3x3, 
  ExternalLink, Clock, ArrowRight 
} from "lucide-react";
import Button from "@/components/atoms/Button";

type ResourceType = "roadmap" | "pdf" | "challenge" | "video";

interface Resource {
  id: string;
  title: string;
  description: string;
  type: ResourceType;
  url: string;
  thumbnail: string;
  downloadable: boolean;
  duration?: string;
  difficulty?: "beginner" | "intermediate" | "advanced";
}

const resources: Resource[] = [
  {
    id: "1",
    title: "Frontend Development Roadmap",
    description: "A comprehensive guide to becoming a frontend developer in 2025.",
    type: "roadmap",
    url: "/resources/frontend-roadmap",
    thumbnail: "https://images.unsplash.com/photo-1587620962725-abab7fe55159?q=80&w=2574&auto=format&fit=crop",
    downloadable: true
  },
  {
    id: "2",
    title: "Backend Development Roadmap",
    description: "Step-by-step path to becoming a backend developer in 2025.",
    type: "roadmap",
    url: "/resources/backend-roadmap",
    thumbnail: "https://images.unsplash.com/photo-1596986104852-7a5b6b13b970?q=80&w=2574&auto=format&fit=crop",
    downloadable: true
  },
  {
    id: "3",
    title: "Modern JavaScript Guide",
    description: "A comprehensive PDF guide to modern JavaScript features and best practices.",
    type: "pdf",
    url: "/resources/js-guide.pdf",
    thumbnail: "https://images.unsplash.com/photo-1579468118864-1b9ea3c0db4a?q=80&w=2670&auto=format&fit=crop",
    downloadable: true
  },
  {
    id: "4",
    title: "React Performance Optimization",
    description: "Learn techniques for optimizing the performance of your React applications.",
    type: "pdf",
    url: "/resources/react-performance.pdf",
    thumbnail: "https://images.unsplash.com/photo-1633356122102-3fe601e05bd2?q=80&w=2670&auto=format&fit=crop",
    downloadable: true
  },
  {
    id: "5",
    title: "Algorithm Challenges Bundle",
    description: "A collection of 50 algorithm challenges to improve your problem-solving skills.",
    type: "challenge",
    url: "/resources/challenges/algorithms",
    thumbnail: "https://images.unsplash.com/photo-1580894732444-8ecded7900cd?q=80&w=2670&auto=format&fit=crop",
    downloadable: false,
    difficulty: "intermediate"
  },
  {
    id: "6",
    title: "CSS Layout Masterclass",
    description: "Master CSS layouts with these interactive challenges and examples.",
    type: "challenge",
    url: "/resources/challenges/css-layout",
    thumbnail: "https://images.unsplash.com/photo-1507721999472-8ed4421c4af2?q=80&w=2670&auto=format&fit=crop",
    downloadable: false,
    difficulty: "beginner"
  },
  {
    id: "7",
    title: "GraphQL Fundamentals",
    description: "Learn the basics of GraphQL and how to implement it in your applications.",
    type: "video",
    url: "/resources/videos/graphql",
    thumbnail: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=2670&auto=format&fit=crop",
    downloadable: false,
    duration: "1h 45m"
  },
  {
    id: "8",
    title: "Docker for Developers",
    description: "A practical introduction to Docker for web developers.",
    type: "video",
    url: "/resources/videos/docker",
    thumbnail: "https://images.unsplash.com/photo-1605745341112-85968b19335b?q=80&w=2670&auto=format&fit=crop",
    downloadable: false,
    duration: "2h 20m"
  }
];

type ViewMode = "grid" | "compact" | "list";
type ResourceTypeFilter = "all" | ResourceType;

const ResourcesPage = () => {
  const [viewMode, setViewMode] = useState<ViewMode>("grid");
  const [activeTab, setActiveTab] = useState<ResourceTypeFilter>("all");
  
  const getFilteredResources = () => {
    if (activeTab === "all") {
      return resources;
    }
    return resources.filter(resource => resource.type === activeTab);
  };
  
  const filteredResources = getFilteredResources();
  
  const resourceTypeIcons = {
    roadmap: <FileText className="h-6 w-6 text-blue-400" />,
    pdf: <BookOpen className="h-6 w-6 text-green-400" />,
    challenge: <Award className="h-6 w-6 text-orange-400" />,
    video: <Clock className="h-6 w-6 text-purple-400" />
  };
  
  const getDifficultyColor = (difficulty?: string) => {
    switch(difficulty) {
      case "beginner": return "text-green-400";
      case "intermediate": return "text-yellow-400";
      case "advanced": return "text-red-400";
      default: return "text-muted-foreground";
    }
  };

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
          <h1 className="text-4xl font-bold">Resources</h1>
          <p className="mt-4 text-lg max-w-2xl mx-auto">
            Discover learning materials, roadmaps, guides, and interactive challenges to boost your skills.
          </p>
        </motion.div>

        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8 gap-4">
          <Tabs 
            defaultValue="all" 
            value={activeTab} 
            onValueChange={(value) => setActiveTab(value as ResourceTypeFilter)}
          >
            <TabsList>
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="roadmap">Roadmaps</TabsTrigger>
              <TabsTrigger value="pdf">PDFs</TabsTrigger>
              <TabsTrigger value="challenge">Challenges</TabsTrigger>
              <TabsTrigger value="video">Videos</TabsTrigger>
            </TabsList>
          </Tabs>
          
          <div className="flex border rounded-md overflow-hidden">
            <Toggle 
              pressed={viewMode === "grid"} 
              onPressedChange={() => setViewMode("grid")}
              aria-label="Grid view"
              className="rounded-none"
            >
              <Grid2x2 size={16} />
            </Toggle>
            <Toggle 
              pressed={viewMode === "compact"} 
              onPressedChange={() => setViewMode("compact")}
              aria-label="Compact grid view"
              className="rounded-none"
            >
              <Grid3x3 size={16} />
            </Toggle>
            <Toggle 
              pressed={viewMode === "list"} 
              onPressedChange={() => setViewMode("list")}
              aria-label="List view"
              className="rounded-none"
            >
              <List size={16} />
            </Toggle>
          </div>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={`${viewMode}-${activeTab}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className={`
              grid gap-6
              ${viewMode === "grid" ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-3" : ""}
              ${viewMode === "compact" ? "grid-cols-2 md:grid-cols-3 lg:grid-cols-4" : ""}
              ${viewMode === "list" ? "grid-cols-1" : ""}
            `}
          >
            {filteredResources.map((resource, index) => (
              <motion.div
                key={resource.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ 
                  opacity: 1, 
                  y: 0,
                  transition: { delay: 0.05 * index, duration: 0.5 }
                }}
              >
                {viewMode === "list" ? (
                  <Card className="flex flex-row h-24 bg-black/40 backdrop-blur-lg border border-white/10 overflow-hidden">
                    <div 
                      className="w-24 bg-cover bg-center"
                      style={{ backgroundImage: `url(${resource.thumbnail})` }}
                    />
                    <div className="flex flex-1 justify-between items-center px-4">
                      <div>
                        <h3 className="font-medium">{resource.title}</h3>
                        <div className="flex items-center text-sm text-muted-foreground">
                          {resourceTypeIcons[resource.type]}
                          <span className="ml-2 capitalize">{resource.type}</span>
                          {resource.duration && (
                            <span className="ml-4 flex items-center">
                              <Clock size={14} className="mr-1" />
                              {resource.duration}
                            </span>
                          )}
                          {resource.difficulty && (
                            <span className={`ml-4 capitalize ${getDifficultyColor(resource.difficulty)}`}>
                              {resource.difficulty}
                            </span>
                          )}
                        </div>
                      </div>
                      <Button size="sm" variant="ghost" rightIcon={<ArrowRight size={14} />}>
                        View
                      </Button>
                    </div>
                  </Card>
                ) : viewMode === "compact" ? (
                  <Card className="overflow-hidden h-40 bg-black/40 backdrop-blur-lg border border-white/10">
                    <div className="relative h-full">
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent z-10" />
                      <div 
                        className="h-full w-full bg-cover bg-center"
                        style={{ backgroundImage: `url(${resource.thumbnail})` }}
                      />
                      <div className="absolute inset-0 z-20 p-3 flex flex-col justify-between">
                        <div className="flex justify-between items-start">
                          {resourceTypeIcons[resource.type]}
                          {resource.downloadable && <Download size={16} className="text-muted-foreground" />}
                        </div>
                        <div>
                          <h3 className="font-medium text-sm mb-1">{resource.title}</h3>
                          <div className="flex justify-between items-center">
                            {resource.duration && (
                              <span className="text-xs flex items-center text-muted-foreground">
                                <Clock size={12} className="mr-1" />
                                {resource.duration}
                              </span>
                            )}
                            {resource.difficulty && (
                              <span className={`text-xs capitalize ${getDifficultyColor(resource.difficulty)}`}>
                                {resource.difficulty}
                              </span>
                            )}
                            <Button size="sm" variant="ghost" className="p-1 h-auto">
                              <ExternalLink size={14} />
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Card>
                ) : (
                  <Card className="overflow-hidden h-full flex flex-col bg-black/40 backdrop-blur-lg border border-white/10">
                    <div className="relative h-36 md:h-40 lg:h-44">
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10" />
                      <div 
                        className="h-full w-full bg-cover bg-center"
                        style={{ backgroundImage: `url(${resource.thumbnail})` }}
                      />
                      <div className="absolute top-3 left-3 z-20">
                        {resourceTypeIcons[resource.type]}
                      </div>
                      {resource.downloadable && (
                        <div className="absolute top-3 right-3 z-20">
                          <Download size={18} className="text-muted-foreground" />
                        </div>
                      )}
                    </div>
                    
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg">{resource.title}</CardTitle>
                    </CardHeader>
                    
                    <CardContent className="flex-grow pb-2">
                      <p className="text-sm text-muted-foreground">{resource.description}</p>
                    </CardContent>
                    
                    <CardFooter className="pt-4 border-t border-white/10 flex justify-between">
                      <div className="flex items-center text-sm">
                        {resource.duration && (
                          <span className="flex items-center text-muted-foreground">
                            <Clock size={14} className="mr-1" />
                            {resource.duration}
                          </span>
                        )}
                        {resource.difficulty && (
                          <span className={`ml-4 capitalize ${getDifficultyColor(resource.difficulty)}`}>
                            {resource.difficulty}
                          </span>
                        )}
                      </div>
                      
                      <Button size="sm" as={Link} to={resource.url} rightIcon={<ArrowRight size={14} />}>
                        View
                      </Button>
                    </CardFooter>
                  </Card>
                )}
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
      <Footer />
    </AnimatedPage>
  );
};

export default ResourcesPage;
