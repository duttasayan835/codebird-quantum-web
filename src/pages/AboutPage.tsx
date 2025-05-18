
import React from "react";
import AnimatedPage from "../components/AnimatedPage";
import { motion } from "framer-motion";

const AboutPage = () => {
  return (
    <AnimatedPage>
      <div className="container mx-auto px-4 py-16">
        <motion.h1 
          className="text-4xl font-bold mb-8 text-center"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          About CodeBird Society
        </motion.h1>
        
        <motion.div 
          className="max-w-3xl mx-auto bg-card rounded-lg p-8 shadow-lg"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <h2 className="text-2xl font-semibold mb-4">Our Vision</h2>
          <p className="mb-6">
            CodeBird Society is a community of passionate developers, designers, and tech enthusiasts dedicated to pushing the boundaries of technology and fostering innovation. We believe in the power of collaboration and open-source to create amazing digital experiences and solve real-world problems.
          </p>
          
          <h2 className="text-2xl font-semibold mb-4">Our Mission</h2>
          <p className="mb-6">
            Our mission is to create a vibrant ecosystem where technology meets creativity, where ideas can flourish, and where members can grow both personally and professionally. We aim to be at the forefront of emerging technologies while maintaining a strong focus on accessibility and inclusivity.
          </p>
          
          <h2 className="text-2xl font-semibold mb-4">Our Values</h2>
          <ul className="list-disc pl-6 mb-6 space-y-2">
            <li><strong>Innovation:</strong> We embrace cutting-edge technologies and creative thinking.</li>
            <li><strong>Collaboration:</strong> We believe in the power of working together across disciplines.</li>
            <li><strong>Inclusivity:</strong> We welcome diverse perspectives and backgrounds.</li>
            <li><strong>Education:</strong> We are committed to continuous learning and knowledge sharing.</li>
            <li><strong>Impact:</strong> We strive to create meaningful change through technology.</li>
          </ul>
        </motion.div>
      </div>
    </AnimatedPage>
  );
};

export default AboutPage;
