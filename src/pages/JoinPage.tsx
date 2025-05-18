
import React, { useState } from "react";
import AnimatedPage from "../components/AnimatedPage";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { toast } from "sonner";

const JoinPage = () => {
  const [formSubmitted, setFormSubmitted] = useState(false);
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, you'd handle form submission here
    setFormSubmitted(true);
    toast.success("Application submitted successfully!");
  };
  
  return (
    <AnimatedPage>
      <div className="container mx-auto px-4 py-16">
        <motion.h1 
          className="text-4xl font-bold mb-8 text-center"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Join CodeBird Society
        </motion.h1>
        
        <motion.div 
          className="max-w-3xl mx-auto mb-12 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <p className="text-lg mb-8">
            Become a part of our vibrant community of developers, designers, and tech enthusiasts. Fill out the form below to apply for membership.
          </p>
        </motion.div>
        
        <div className="max-w-3xl mx-auto">
          {formSubmitted ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-12"
            >
              <div className="text-6xl mb-6">🎉</div>
              <h2 className="text-2xl font-bold mb-4">Application Submitted!</h2>
              <p className="text-lg mb-8">
                Thank you for your interest in joining CodeBird Society. We'll review your application and get back to you soon.
              </p>
              <Button onClick={() => setFormSubmitted(false)}>Submit Another Application</Button>
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <Card className="p-6">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="space-y-4">
                    <h2 className="text-xl font-semibold">Personal Information</h2>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="firstName">First Name</Label>
                        <Input id="firstName" required />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="lastName">Last Name</Label>
                        <Input id="lastName" required />
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input id="email" type="email" required />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="github">GitHub Profile (optional)</Label>
                      <Input id="github" placeholder="https://github.com/username" />
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <h2 className="text-xl font-semibold">Professional Background</h2>
                    
                    <div className="space-y-2">
                      <Label>Primary Role</Label>
                      <RadioGroup defaultValue="developer">
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="developer" id="developer" />
                          <Label htmlFor="developer">Developer</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="designer" id="designer" />
                          <Label htmlFor="designer">Designer</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="product" id="product" />
                          <Label htmlFor="product">Product Manager</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="other" id="other" />
                          <Label htmlFor="other">Other</Label>
                        </div>
                      </RadioGroup>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="experience">Years of Experience</Label>
                      <Input id="experience" type="number" min="0" max="50" />
                    </div>
                    
                    <div className="space-y-2">
                      <Label>Technologies/Skills</Label>
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                        {['React', 'Three.js', 'TypeScript', 'Node.js', 'UI/UX', 'WebGL'].map((skill) => (
                          <div className="flex items-center space-x-2" key={skill}>
                            <Checkbox id={skill.toLowerCase()} />
                            <Label htmlFor={skill.toLowerCase()}>{skill}</Label>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <h2 className="text-xl font-semibold">Additional Information</h2>
                    
                    <div className="space-y-2">
                      <Label htmlFor="motivation">Why do you want to join CodeBird Society?</Label>
                      <Textarea id="motivation" rows={4} required />
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <Checkbox id="terms" required />
                      <Label htmlFor="terms">I agree to the Terms and Conditions</Label>
                    </div>
                  </div>
                  
                  <Button type="submit" size="lg" className="w-full sm:w-auto">Submit Application</Button>
                </form>
              </Card>
            </motion.div>
          )}
        </div>
      </div>
    </AnimatedPage>
  );
};

export default JoinPage;
