
import React from "react";
import AnimatedPage from "../components/AnimatedPage";
import { motion } from "framer-motion";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar } from "lucide-react";

const BlogPage = () => {
  const blogPosts = [
    {
      id: 1,
      title: "Building Modern Web Applications with React and Three.js",
      excerpt: "Learn how to integrate Three.js with React to create stunning 3D experiences on the web.",
      date: "May 10, 2023",
      author: "Alex Chen",
      tags: ["React", "Three.js", "WebGL"]
    },
    {
      id: 2,
      title: "The Future of Web Animation: GSAP vs Framer Motion",
      excerpt: "A detailed comparison of two powerful animation libraries and when to use each one.",
      date: "April 22, 2023",
      author: "Sophia Williams",
      tags: ["Animation", "GSAP", "Framer Motion"]
    },
    {
      id: 3,
      title: "Optimizing React Applications for Performance",
      excerpt: "Best practices and techniques to improve the performance of your React applications.",
      date: "March 15, 2023",
      author: "Michael Johnson",
      tags: ["React", "Performance", "Optimization"]
    },
    {
      id: 4,
      title: "Creating Accessible Design Systems",
      excerpt: "How to build design systems that are beautiful, functional, and accessible to all users.",
      date: "February 28, 2023",
      author: "Emma Davis",
      tags: ["Design Systems", "Accessibility", "UI/UX"]
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
          Blog
        </motion.h1>
        
        <motion.div 
          className="max-w-3xl mx-auto mb-12 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <p className="text-lg mb-8">
            Insights, tutorials, and news from the CodeBird community. Stay up-to-date with the latest in web development and design.
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {blogPosts.map((post, index) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 * index }}
            >
              <Card className="h-full flex flex-col">
                <CardHeader>
                  <CardTitle>{post.title}</CardTitle>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Calendar size={14} />
                    <span>{post.date}</span>
                    <span>•</span>
                    <span>{post.author}</span>
                  </div>
                </CardHeader>
                <CardContent className="flex-grow">
                  <p className="mb-4">{post.excerpt}</p>
                  <div className="flex flex-wrap gap-2">
                    {post.tags.map(tag => (
                      <Badge key={tag} variant="secondary">{tag}</Badge>
                    ))}
                  </div>
                </CardContent>
                <CardFooter>
                  <button className="text-primary hover:underline">Read more</button>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </AnimatedPage>
  );
};

export default BlogPage;
