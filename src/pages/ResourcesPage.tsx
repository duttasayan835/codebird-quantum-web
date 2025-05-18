
import React from "react";
import AnimatedPage from "../components/AnimatedPage";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText, BookOpen, Award } from "lucide-react";

const ResourcesPage = () => {
  const resourceCategories = [
    {
      id: 1,
      title: "Tutorials",
      description: "Step-by-step guides to learn new skills and technologies.",
      icon: <BookOpen className="h-10 w-10 text-primary" />,
      link: "/resources/tutorials"
    },
    {
      id: 2,
      title: "Documentation",
      description: "Comprehensive documentation for our libraries and frameworks.",
      icon: <FileText className="h-10 w-10 text-primary" />,
      link: "#"
    },
    {
      id: 3,
      title: "Challenges",
      description: "Coding challenges to test your skills and learn by doing.",
      icon: <Award className="h-10 w-10 text-primary" />,
      link: "/resources/challenges"
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
          Resources
        </motion.h1>
        
        <motion.div 
          className="max-w-3xl mx-auto mb-12 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <p className="text-lg mb-8">
            Explore our collection of resources designed to help you grow as a developer. From tutorials to challenging exercises, we've got you covered.
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {resourceCategories.map((category, index) => (
            <motion.div
              key={category.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 * index }}
            >
              <Link to={category.link}>
                <Card className="h-full flex flex-col text-center hover:shadow-lg transition-shadow cursor-pointer">
                  <CardHeader className="flex flex-col items-center">
                    {category.icon}
                    <CardTitle className="mt-4">{category.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="flex-grow">
                    <p>{category.description}</p>
                  </CardContent>
                  <CardFooter className="justify-center">
                    <span className="text-primary">Explore {category.title}</span>
                  </CardFooter>
                </Card>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </AnimatedPage>
  );
};

export default ResourcesPage;
