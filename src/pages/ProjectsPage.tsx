
import React from "react";
import AnimatedPage from "../components/AnimatedPage";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

const ProjectsPage = () => {
  return (
    <AnimatedPage>
      <div className="container mx-auto px-4 py-16">
        <motion.h1 
          className="text-4xl font-bold mb-8 text-center"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Our Projects
        </motion.h1>
        
        <motion.div 
          className="max-w-4xl mx-auto mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div className="flex justify-center space-x-4 mb-12">
            <Link to="/projects" className="px-6 py-3 rounded-full bg-primary text-primary-foreground font-medium">
              All Projects
            </Link>
            <Link to="/projects/featured" className="px-6 py-3 rounded-full bg-secondary text-secondary-foreground font-medium">
              Featured Projects
            </Link>
            <Link to="/projects/open-source" className="px-6 py-3 rounded-full bg-secondary text-secondary-foreground font-medium">
              Open Source
            </Link>
          </div>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3, 4, 5, 6].map((item) => (
            <motion.div
              key={item}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 * item }}
            >
              <Card className="h-full flex flex-col">
                <CardHeader>
                  <CardTitle>Project {item}</CardTitle>
                </CardHeader>
                <CardContent className="flex-grow">
                  <p>An innovative project that showcases our technical expertise and creative problem-solving abilities.</p>
                </CardContent>
                <CardFooter>
                  <button className="text-primary hover:underline">Learn more</button>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </AnimatedPage>
  );
};

export default ProjectsPage;
