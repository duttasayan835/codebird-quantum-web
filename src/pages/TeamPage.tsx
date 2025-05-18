
import React from "react";
import { motion } from "framer-motion";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import AnimatedPage from "../components/AnimatedPage";
import { Github, Linkedin, ExternalLink } from "lucide-react";

const teamMembers = [
  {
    id: 1,
    name: "Alex Chen",
    role: "Founder & CEO",
    bio: "Visionary technologist with 15+ years of experience in building innovative software solutions and fostering developer communities.",
    image: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80",
    github: "https://github.com",
    linkedin: "https://linkedin.com",
    website: "https://example.com"
  },
  {
    id: 2,
    name: "Sarah Johnson",
    role: "CTO",
    bio: "Full-stack engineer specializing in scalable architecture and emerging technologies with a passion for open-source contribution.",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1774&q=80",
    github: "https://github.com",
    linkedin: "https://linkedin.com",
    website: "https://example.com"
  },
  {
    id: 3,
    name: "Michael Zhang",
    role: "Head of Development",
    bio: "Expert in React ecosystem and performance optimization. Previously led development teams at several successful tech startups.",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1774&q=80",
    github: "https://github.com",
    linkedin: "https://linkedin.com",
    website: null
  },
  {
    id: 4,
    name: "Emily Rodriguez",
    role: "Lead Designer",
    bio: "Award-winning designer focused on creating innovative, accessible user experiences and digital brand identities.",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1776&q=80",
    github: "https://github.com",
    linkedin: "https://linkedin.com",
    website: "https://example.com"
  },
  {
    id: 5,
    name: "David Kim",
    role: "Community Manager",
    bio: "Developer advocate and community builder with experience organizing tech conferences and fostering inclusive development environments.",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80",
    github: "https://github.com",
    linkedin: "https://linkedin.com",
    website: null
  },
  {
    id: 6,
    name: "Jasmine Lee",
    role: "Education Director",
    bio: "Former university professor with expertise in computer science education and curriculum development for diverse learning styles.",
    image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1722&q=80",
    github: "https://github.com",
    linkedin: "https://linkedin.com",
    website: "https://example.com"
  }
];

const TeamPage = () => {
  return (
    <AnimatedPage>
      <Navbar />
      <main className="pt-32 pb-20">
        <div className="container mx-auto px-4">
          <motion.h1 
            className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-gradient"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            Our Team
          </motion.h1>
          
          <motion.p 
            className="text-xl text-foreground/70 max-w-3xl mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            Meet the passionate individuals behind Codebird Club who are dedicated to 
            empowering developers and fostering an innovative community.
          </motion.p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {teamMembers.map((member, index) => (
              <motion.div
                key={member.id}
                className="glass-card overflow-hidden"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 + index * 0.1 }}
                whileHover={{ y: -5, transition: { duration: 0.2 } }}
              >
                <div className="relative h-64 overflow-hidden">
                  <img 
                    src={member.image} 
                    alt={member.name} 
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent opacity-70"></div>
                </div>
                
                <div className="p-6">
                  <h2 className="text-2xl font-bold mb-1">{member.name}</h2>
                  <p className="text-primary mb-4">{member.role}</p>
                  
                  <p className="text-foreground/70 mb-6">
                    {member.bio}
                  </p>
                  
                  <div className="flex gap-3">
                    <a 
                      href={member.github} 
                      className="p-2 bg-white/10 hover:bg-white/20 rounded-full transition-colors"
                      target="_blank"
                      rel="noreferrer"
                    >
                      <Github size={18} />
                    </a>
                    <a 
                      href={member.linkedin} 
                      className="p-2 bg-white/10 hover:bg-white/20 rounded-full transition-colors"
                      target="_blank"
                      rel="noreferrer"
                    >
                      <Linkedin size={18} />
                    </a>
                    {member.website && (
                      <a 
                        href={member.website} 
                        className="p-2 bg-white/10 hover:bg-white/20 rounded-full transition-colors"
                        target="_blank"
                        rel="noreferrer"
                      >
                        <ExternalLink size={18} />
                      </a>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
          
          <motion.div 
            className="mt-20 glass-card p-8 text-center"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
          >
            <h2 className="text-2xl font-bold mb-4">Join Our Team</h2>
            <p className="text-foreground/70 max-w-2xl mx-auto mb-6">
              We're always looking for passionate individuals to join our mission of empowering 
              developers and creating an innovative community. Check out our open positions and 
              contribute to the future of tech.
            </p>
            <a
              href="/join"
              className="inline-block px-8 py-3 bg-primary hover:bg-primary/90 rounded-full text-white transition-all shadow-lg hover:shadow-primary/40"
            >
              View Open Positions
            </a>
          </motion.div>
        </div>
      </main>
      <Footer />
    </AnimatedPage>
  );
};

export default TeamPage;
