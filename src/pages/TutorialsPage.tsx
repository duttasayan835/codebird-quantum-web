
import React, { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowLeft, ArrowRight, Clock, User, BookOpen } from "lucide-react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import AnimatedPage from "../components/AnimatedPage";

const tutorials = [
  {
    id: 1,
    title: "React Component Architecture",
    description: "Learn best practices for structuring React applications with scalable, maintainable component architecture.",
    content: "This tutorial covers advanced patterns for organizing React components, including atomic design principles, compound components, render props, and hooks patterns. You'll learn how to structure complex applications that scale well and remain maintainable.",
    image: "https://images.unsplash.com/photo-1633356122102-3fe601e05bd2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80",
    author: "Sarah Chen",
    authorImage: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80",
    readTime: 15,
    difficulty: "Intermediate",
    tags: ["React", "Architecture", "Frontend"],
    category: "JavaScript"
  },
  {
    id: 2,
    title: "GraphQL Implementation Guide",
    description: "Step-by-step tutorial for implementing GraphQL in your applications, with examples for Node.js and React.",
    content: "This comprehensive tutorial walks you through building a GraphQL API from scratch using Node.js and Express, then connecting it to a React frontend. You'll learn about schema design, resolvers, mutations, authentication, and optimization techniques.",
    image: "https://images.unsplash.com/photo-1537884944318-390069bb8665?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80",
    author: "Michael Zhang",
    authorImage: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1774&q=80",
    readTime: 25,
    difficulty: "Advanced",
    tags: ["GraphQL", "Node.js", "API"],
    category: "Backend"
  },
  {
    id: 3,
    title: "UI Animation Techniques",
    description: "Explore modern UI animation approaches using CSS, JavaScript, and specialized libraries.",
    content: "This tutorial explores various approaches to creating smooth, performant animations in web applications. You'll learn about CSS animations, JavaScript animation libraries like GSAP and Framer Motion, and how to optimize animations for performance.",
    image: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80",
    author: "Emily Rodriguez",
    authorImage: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1776&q=80",
    readTime: 18,
    difficulty: "Intermediate",
    tags: ["Animation", "CSS", "JavaScript"],
    category: "Frontend"
  },
  {
    id: 4,
    title: "Building Accessible Web Forms",
    description: "Learn how to create forms that are usable by everyone, regardless of abilities.",
    content: "This tutorial covers the principles of accessible form design, including proper labeling, keyboard navigation, error handling, and ARIA attributes. You'll build a complex form with validation that meets WCAG accessibility standards.",
    image: "https://images.unsplash.com/photo-1587614382346-4ec70e388b28?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80",
    author: "Alex Johnson",
    authorImage: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80",
    readTime: 12,
    difficulty: "Beginner",
    tags: ["Accessibility", "HTML", "Forms"],
    category: "Frontend"
  },
  {
    id: 5,
    title: "State Management with React Context and Hooks",
    description: "Build a complete state management solution using React's built-in features.",
    content: "This tutorial demonstrates how to create a scalable state management system using React Context and hooks, without reaching for external libraries. You'll learn patterns for managing complex state, optimizing renders, and handling asynchronous actions.",
    image: "https://images.unsplash.com/photo-1555099962-4199c345e5dd?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80",
    author: "James Wilson",
    authorImage: "https://images.unsplash.com/photo-1566492031773-4f4e44671857?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1774&q=80",
    readTime: 20,
    difficulty: "Intermediate",
    tags: ["React", "State Management", "Hooks"],
    category: "JavaScript"
  },
  {
    id: 6,
    title: "TypeScript Advanced Types",
    description: "Master TypeScript's powerful type system to create safer, more maintainable code.",
    content: "This deep dive into TypeScript's type system covers advanced concepts like conditional types, mapped types, template literal types, and type inference. You'll learn how to leverage these features to create flexible, type-safe abstractions.",
    image: "https://images.unsplash.com/photo-1542831371-29b0f74f9713?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80",
    author: "David Kim",
    authorImage: "https://images.unsplash.com/photo-1562788869-4ed32648eb72?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1772&q=80",
    readTime: 22,
    difficulty: "Advanced",
    tags: ["TypeScript", "Static Typing", "JavaScript"],
    category: "TypeScript"
  }
];

const difficultyColors = {
  "Beginner": "bg-green-500/20 text-green-400",
  "Intermediate": "bg-blue-500/20 text-blue-400",
  "Advanced": "bg-purple-500/20 text-purple-400"
};

const categories = ["All", "JavaScript", "TypeScript", "Frontend", "Backend"];

const TutorialsPage = () => {
  const [activeCategory, setActiveCategory] = useState("All");
  
  const filteredTutorials = activeCategory === "All" 
    ? tutorials 
    : tutorials.filter(tutorial => tutorial.category === activeCategory);
  
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };
  
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <AnimatedPage>
      <Navbar />
      <main className="pt-32 pb-20">
        <div className="container mx-auto px-4">
          <Link
            to="/resources"
            className="inline-flex items-center gap-1 text-foreground/70 hover:text-foreground mb-6 transition-colors"
          >
            <ArrowLeft size={16} /> Back to Resources
          </Link>
          
          <motion.h1 
            className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-gradient"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            Tutorials
          </motion.h1>
          
          <motion.p 
            className="text-xl text-foreground/70 max-w-3xl mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            Comprehensive, step-by-step guides to help you master new skills 
            and technologies.
          </motion.p>
          
          <motion.div 
            className="flex flex-wrap gap-2 mb-10"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            {categories.map(category => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`px-4 py-2 rounded-full transition-all ${
                  activeCategory === category 
                    ? 'bg-primary text-white' 
                    : 'bg-white/10 hover:bg-white/20'
                }`}
              >
                {category}
              </button>
            ))}
          </motion.div>
          
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {filteredTutorials.map((tutorial) => (
              <motion.div
                key={tutorial.id}
                className="glass-card overflow-hidden h-full flex flex-col"
                variants={itemVariants}
                whileHover={{ y: -5, transition: { duration: 0.2 } }}
              >
                <div className="h-48 overflow-hidden">
                  <img 
                    src={tutorial.image} 
                    alt={tutorial.title}
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                  />
                </div>
                <div className="p-6 flex flex-col flex-grow">
                  <span className={`text-xs py-1 px-2 rounded-full inline-block mb-3 ${difficultyColors[tutorial.difficulty]}`}>
                    {tutorial.difficulty}
                  </span>
                  
                  <h3 className="text-xl font-bold mb-2">{tutorial.title}</h3>
                  
                  <p className="text-foreground/70 mb-6 flex-grow">
                    {tutorial.description}
                  </p>
                  
                  <div className="flex flex-wrap gap-2 mb-4">
                    {tutorial.tags.map(tag => (
                      <span 
                        key={tag}
                        className="text-xs bg-primary/10 text-primary py-1 px-2 rounded-full"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                      <img 
                        src={tutorial.authorImage} 
                        alt={tutorial.author}
                        className="w-6 h-6 rounded-full object-cover"
                      />
                      <span className="text-xs text-foreground/70">{tutorial.author}</span>
                    </div>
                    <div className="flex items-center gap-1 text-xs text-foreground/70">
                      <Clock size={14} />
                      <span>{tutorial.readTime} min read</span>
                    </div>
                  </div>
                  
                  <Link
                    to={`/resources/tutorials/${tutorial.id}`}
                    className="mt-auto inline-flex items-center gap-1 text-primary hover:text-primary/80 transition-colors"
                  >
                    Read Tutorial <ArrowRight size={16} />
                  </Link>
                </div>
              </motion.div>
            ))}
          </motion.div>
          
          <motion.div 
            className="mt-16 text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            <p className="text-xl mb-6">
              Want to contribute a tutorial?
            </p>
            <Link
              to="/contact"
              className="inline-block px-8 py-3 bg-primary hover:bg-primary/90 rounded-full text-white transition-all shadow-lg hover:shadow-primary/40"
            >
              Submit a Tutorial
            </Link>
          </motion.div>
        </div>
      </main>
      <Footer />
    </AnimatedPage>
  );
};

export default TutorialsPage;
