
import React, { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowLeft, ArrowRight, Trophy, Star, Clock, Users } from "lucide-react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import AnimatedPage from "../components/AnimatedPage";

const challenges = [
  {
    id: 1,
    title: "API Design Challenge",
    description: "Test your skills by designing a RESTful API for a fictional application with specific requirements and constraints.",
    longDescription: "In this challenge, you'll design a comprehensive RESTful API for a fictional social media application. You'll need to define endpoints, request/response formats, authentication methods, and error handling strategies. Your API should follow best practices and handle complex relationships between resources.",
    difficulty: "Advanced",
    duration: "1-2 weeks",
    participants: 143,
    skills: ["Backend Development", "API Design", "Documentation"],
    image: "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80",
    featured: true
  },
  {
    id: 2,
    title: "Algorithm Problem Solving",
    description: "A collection of algorithm challenges with increasing difficulty to sharpen your problem-solving skills.",
    longDescription: "Take on our curated collection of algorithmic challenges that range from beginner-friendly to competition-level difficulty. Each challenge comes with comprehensive test cases and performance benchmarks. You'll tackle problems involving data structures, sorting, searching, graph traversal, dynamic programming, and more.",
    difficulty: "All Levels",
    duration: "Ongoing",
    participants: 287,
    skills: ["Algorithms", "Data Structures", "Problem Solving"],
    image: "https://images.unsplash.com/photo-1509228627152-72ae9ae6848d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80",
    featured: true
  },
  {
    id: 3,
    title: "Build a Real-time Chat App",
    description: "Challenge yourself to build a complete real-time chat application with user authentication and message persistence.",
    longDescription: "In this comprehensive challenge, you'll build a fully functional real-time chat application from scratch. Your solution should include user authentication, real-time message delivery, message persistence, typing indicators, read receipts, and media sharing. You can choose any tech stack, but your final product must be deployed and accessible online.",
    difficulty: "Intermediate",
    duration: "3-4 weeks",
    participants: 89,
    skills: ["Frontend", "Backend", "Real-time Communication", "Database"],
    image: "https://images.unsplash.com/photo-1611606063065-ee7946f0787a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1769&q=80",
    featured: true
  },
  {
    id: 4,
    title: "Accessible Form Components",
    description: "Design and implement form components that are fully accessible and provide an excellent user experience.",
    longDescription: "This challenge focuses on creating form components (inputs, selects, checkboxes, etc.) that are not only visually appealing but also fully accessible. Your components should work with screen readers, support keyboard navigation, provide appropriate feedback, and follow WCAG guidelines. You'll be judged on both technical implementation and user experience.",
    difficulty: "Intermediate",
    duration: "1-2 weeks",
    participants: 56,
    skills: ["Frontend", "Accessibility", "UI/UX", "HTML/CSS"],
    image: "https://images.unsplash.com/photo-1587614382346-4ec70e388b28?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80",
    featured: false
  },
  {
    id: 5,
    title: "Data Visualization Dashboard",
    description: "Create an interactive dashboard to visualize and explore a complex dataset in an intuitive way.",
    longDescription: "In this challenge, you'll work with a provided dataset to create an insightful, interactive dashboard that helps users explore and understand the data. Your solution should include multiple visualization types, filtering capabilities, responsive design, and performance optimizations for large datasets. Focus on creating visualizations that reveal meaningful patterns and insights.",
    difficulty: "Intermediate",
    duration: "2-3 weeks",
    participants: 72,
    skills: ["Data Visualization", "Frontend", "Data Analysis"],
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80",
    featured: false
  },
  {
    id: 6,
    title: "Microservice Architecture Implementation",
    description: "Design and implement a system using microservices architecture to solve a specific problem domain.",
    longDescription: "This advanced challenge tasks you with designing a microservice-based backend system for an e-commerce platform. You'll need to identify appropriate service boundaries, implement inter-service communication, handle distributed data, ensure system resilience, and set up monitoring. Your solution should handle common microservice challenges like eventual consistency and service discovery.",
    difficulty: "Advanced",
    duration: "4-6 weeks",
    participants: 38,
    skills: ["System Design", "Microservices", "Backend", "DevOps"],
    image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80",
    featured: false
  }
];

const difficultyColors = {
  "Beginner": "bg-green-500/20 text-green-400",
  "Intermediate": "bg-blue-500/20 text-blue-400",
  "Advanced": "bg-purple-500/20 text-purple-400",
  "All Levels": "bg-yellow-500/20 text-yellow-400"
};

const ChallengesPage = () => {
  const [activeFilter, setActiveFilter] = useState("All");
  
  const filters = ["All", "Beginner", "Intermediate", "Advanced"];
  
  const filteredChallenges = activeFilter === "All" 
    ? challenges 
    : challenges.filter(challenge => challenge.difficulty === activeFilter);
  
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
            Coding Challenges
          </motion.h1>
          
          <motion.p 
            className="text-xl text-foreground/70 max-w-3xl mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            Test your skills, learn new concepts, and build your portfolio with our 
            collection of programming challenges.
          </motion.p>
          
          <motion.div 
            className="flex flex-wrap gap-2 mb-10"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            {filters.map(filter => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`px-4 py-2 rounded-full transition-all ${
                  activeFilter === filter 
                    ? 'bg-primary text-white' 
                    : 'bg-white/10 hover:bg-white/20'
                }`}
              >
                {filter}
              </button>
            ))}
          </motion.div>
          
          <motion.div 
            className="grid grid-cols-1 lg:grid-cols-2 gap-8"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {filteredChallenges.map((challenge) => (
              <motion.div
                key={challenge.id}
                className="glass-card overflow-hidden h-full flex flex-col"
                variants={itemVariants}
                whileHover={{ y: -5, transition: { duration: 0.2 } }}
              >
                <div className="h-48 overflow-hidden">
                  <img 
                    src={challenge.image} 
                    alt={challenge.title}
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                  />
                </div>
                <div className="p-6 flex flex-col flex-grow">
                  <div className="flex justify-between items-start mb-3">
                    <span className={`text-xs py-1 px-2 rounded-full ${difficultyColors[challenge.difficulty]}`}>
                      {challenge.difficulty}
                    </span>
                    
                    {challenge.featured && (
                      <div className="flex items-center gap-1 text-yellow-400 text-xs">
                        <Trophy size={14} />
                        <span>Featured</span>
                      </div>
                    )}
                  </div>
                  
                  <h3 className="text-xl font-bold mb-2">{challenge.title}</h3>
                  
                  <p className="text-foreground/70 mb-6 flex-grow">
                    {challenge.description}
                  </p>
                  
                  <div className="flex flex-wrap gap-2 mb-4">
                    {challenge.skills.slice(0, 3).map(skill => (
                      <span 
                        key={skill}
                        className="text-xs bg-primary/10 text-primary py-1 px-2 rounded-full"
                      >
                        {skill}
                      </span>
                    ))}
                    
                    {challenge.skills.length > 3 && (
                      <span className="text-xs text-foreground/60">+{challenge.skills.length - 3} more</span>
                    )}
                  </div>
                  
                  <div className="flex items-center justify-between text-sm text-foreground/70 mb-4">
                    <div className="flex items-center gap-1">
                      <Clock size={14} />
                      <span>{challenge.duration}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Users size={14} />
                      <span>{challenge.participants} participants</span>
                    </div>
                  </div>
                  
                  <Link
                    to={`/resources/challenges/${challenge.id}`}
                    className="mt-auto inline-flex items-center gap-1 text-primary hover:text-primary/80 transition-colors"
                  >
                    View Challenge <ArrowRight size={16} />
                  </Link>
                </div>
              </motion.div>
            ))}
          </motion.div>
          
          <motion.div 
            className="mt-16 glass-card p-8 text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            <h2 className="text-2xl font-bold mb-4">Ready to create your own challenge?</h2>
            <p className="text-foreground/70 max-w-2xl mx-auto mb-6">
              Have an interesting problem or project idea? Submit your own challenge
              to share with the Codebird community.
            </p>
            <Link
              to="/contact"
              className="inline-block px-8 py-3 bg-primary hover:bg-primary/90 rounded-full text-white transition-all shadow-lg hover:shadow-primary/40"
            >
              Submit a Challenge
            </Link>
          </motion.div>
        </div>
      </main>
      <Footer />
    </AnimatedPage>
  );
};

export default ChallengesPage;
