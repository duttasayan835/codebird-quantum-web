
import React, { useState, useEffect } from "react";
import AnimatedPage from "../components/AnimatedPage";
import { motion } from "framer-motion";
import ContactMap from "@/components/ContactMap";
import ButtonLink from "@/components/atoms/ButtonLink";
import Button from "@/components/atoms/Button";
import { Github, Twitter, Linkedin, Mail, Phone, MapPin } from "lucide-react";
import useConfetti from "@/hooks/use-confetti";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const ContactPage = () => {
  const [mapboxToken, setMapboxToken] = useState<string>("");
  const { triggerConfetti, ConfettiComponent } = useConfetti();
  
  // Try to get saved token from localStorage
  useEffect(() => {
    const savedToken = localStorage.getItem("mapbox_token");
    if (savedToken) {
      setMapboxToken(savedToken);
    }
  }, []);
  
  // Save token to localStorage when it changes
  useEffect(() => {
    if (mapboxToken) {
      localStorage.setItem("mapbox_token", mapboxToken);
    }
  }, [mapboxToken]);
  
  return (
    <AnimatedPage>
      <Navbar />
      {ConfettiComponent}
      <div className="container mx-auto px-4 py-16">
        <motion.h1 
          className="text-4xl font-bold mb-8 text-center"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Contact Us
        </motion.h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {/* Contact Info Section */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-8"
          >
            <div>
              <h2 className="text-2xl font-semibold mb-4">Get in Touch</h2>
              <p className="text-lg text-muted-foreground mb-6">
                Have a question or want to work with us? We're just a message away.
              </p>
              
              <div className="space-y-6">
                <motion.div 
                  className="flex items-start space-x-4"
                  whileHover={{ x: 5 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <div className="bg-primary/10 p-3 rounded-full">
                    <Mail className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-medium">Email</h3>
                    <p className="text-muted-foreground">contact@codebirdclub.com</p>
                  </div>
                </motion.div>
                
                <motion.div 
                  className="flex items-start space-x-4"
                  whileHover={{ x: 5 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <div className="bg-primary/10 p-3 rounded-full">
                    <Phone className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-medium">Phone</h3>
                    <p className="text-muted-foreground">+1 (555) 123-4567</p>
                  </div>
                </motion.div>
                
                <motion.div 
                  className="flex items-start space-x-4"
                  whileHover={{ x: 5 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <div className="bg-primary/10 p-3 rounded-full">
                    <MapPin className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-medium">Address</h3>
                    <p className="text-muted-foreground">123 Innovation Street, San Francisco, CA</p>
                  </div>
                </motion.div>
              </div>
            </div>
            
            <div>
              <h2 className="text-2xl font-semibold mb-4">Connect With Us</h2>
              <div className="flex space-x-4">
                <motion.a 
                  href="https://github.com/codebirdclub" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-background hover:bg-accent p-3 rounded-full border border-border transition-all duration-300"
                  whileHover={{ y: -5, scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => triggerConfetti()}
                >
                  <Github className="h-6 w-6" />
                </motion.a>
                
                <motion.a 
                  href="https://twitter.com/codebirdclub" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-background hover:bg-accent p-3 rounded-full border border-border transition-all duration-300"
                  whileHover={{ y: -5, scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Twitter className="h-6 w-6" />
                </motion.a>
                
                <motion.a 
                  href="https://linkedin.com/company/codebirdclub" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-background hover:bg-accent p-3 rounded-full border border-border transition-all duration-300"
                  whileHover={{ y: -5, scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Linkedin className="h-6 w-6" />
                </motion.a>
                
                <motion.a 
                  href="mailto:contact@codebirdclub.com" 
                  className="bg-background hover:bg-accent p-3 rounded-full border border-border transition-all duration-300"
                  whileHover={{ y: -5, scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Mail className="h-6 w-6" />
                </motion.a>
              </div>
            </div>
          </motion.div>
          
          {/* Map Section */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="space-y-6"
          >
            <h2 className="text-2xl font-semibold mb-4">Our Location</h2>
            <div className="rounded-lg overflow-hidden border border-border">
              <ContactMap token={mapboxToken} />
            </div>
            
            <div className="mt-4">
              <p className="text-sm text-muted-foreground mb-2">
                To display the map, please enter your Mapbox token in the field above or visit our office.
              </p>
              <Button 
                onClick={() => {
                  window.open('https://maps.google.com/?q=123+Innovation+Street,+San+Francisco,+CA', '_blank');
                }}
              >
                Get Directions
              </Button>
            </div>
          </motion.div>
        </div>
      </div>
      <Footer />
    </AnimatedPage>
  );
};

export default ContactPage;
