
import React, { useState, useRef } from "react";
import AnimatedPage from "../components/AnimatedPage";
import { motion, useAnimation } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/atoms/Button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "sonner";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage, FormDescription } from "@/components/ui/form";
import Confetti from "react-confetti";
import { useWindowSize } from "react-use";

// Define join form schema with Zod
const joinFormSchema = z.object({
  firstName: z.string().min(2, { message: "First name must be at least 2 characters" }),
  lastName: z.string().min(2, { message: "Last name must be at least 2 characters" }),
  email: z.string().email({ message: "Please enter a valid email address" }),
  github: z.string().url({ message: "Please enter a valid URL" }).optional().or(z.string().length(0)),
  role: z.enum(["developer", "designer", "product", "other"], { 
    required_error: "Please select a role" 
  }),
  experience: z.string().transform(val => Number(val)).pipe(
    z.number().min(0).max(50)
  ),
  skills: z.record(z.boolean()).refine(data => 
    Object.values(data).some(value => value === true), {
      message: "Select at least one skill",
    }
  ),
  motivation: z.string().min(30, { message: "Please tell us more about your motivation (at least 30 characters)" }),
  terms: z.boolean().refine(val => val === true, {
    message: "You must agree to the terms and conditions",
  }),
});

type JoinFormValues = z.infer<typeof joinFormSchema>;

const skillsList = [
  'React', 'Three.js', 'TypeScript', 'Node.js', 'UI/UX', 'WebGL',
  'JavaScript', 'Python', 'Go', 'Rust', 'GraphQL', 'Docker'
];

const JoinPage = () => {
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const formControls = useAnimation();
  const { width, height } = useWindowSize();
  const confettiRef = useRef<HTMLDivElement>(null);
  
  const form = useForm<JoinFormValues>({
    resolver: zodResolver(joinFormSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      github: "",
      role: "developer",
      experience: "0",
      skills: skillsList.reduce((acc, skill) => ({ ...acc, [skill.toLowerCase()]: false }), {}),
      motivation: "",
      terms: false,
    },
  });

  const onSubmit = async (values: JoinFormValues) => {
    console.log(values);
    
    // Animate form exit
    await formControls.start({ 
      opacity: 0, 
      scale: 0.8, 
      transition: { duration: 0.5 } 
    });
    
    setShowConfetti(true);
    setFormSubmitted(true);
    toast.success("Application submitted successfully!");
    
    // Stop confetti after 5 seconds
    setTimeout(() => {
      setShowConfetti(false);
    }, 5000);
  };
  
  return (
    <AnimatedPage>
      <div className="container mx-auto px-4 py-16" ref={confettiRef}>
        {showConfetti && (
          <Confetti
            width={width}
            height={height}
            recycle={false}
            numberOfPieces={500}
            gravity={0.2}
          />
        )}
        
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
              <Button onClick={() => {
                setFormSubmitted(false);
                form.reset();
              }}>
                Submit Another Application
              </Button>
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={formControls}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="relative"
            >
              <Card className="p-6">
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                    <div className="space-y-4">
                      <h2 className="text-xl font-semibold">Personal Information</h2>
                      
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <FormField
                          control={form.control}
                          name="firstName"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>First Name</FormLabel>
                              <FormControl>
                                <Input placeholder="Your first name" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={form.control}
                          name="lastName"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Last Name</FormLabel>
                              <FormControl>
                                <Input placeholder="Your last name" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                      
                      <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                              <Input type="email" placeholder="Your email address" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="github"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>GitHub Profile (optional)</FormLabel>
                            <FormControl>
                              <Input placeholder="https://github.com/username" {...field} />
                            </FormControl>
                            <FormDescription>Share your GitHub profile to showcase your projects</FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    
                    <div className="space-y-4">
                      <h2 className="text-xl font-semibold">Professional Background</h2>
                      
                      <FormField
                        control={form.control}
                        name="role"
                        render={({ field }) => (
                          <FormItem className="space-y-3">
                            <FormLabel>Primary Role</FormLabel>
                            <FormControl>
                              <RadioGroup
                                onValueChange={field.onChange}
                                defaultValue={field.value}
                                className="space-y-1"
                              >
                                {["developer", "designer", "product", "other"].map((role) => (
                                  <div key={role} className="flex items-center space-x-2">
                                    <RadioGroupItem value={role} id={role} />
                                    <Label htmlFor={role} className="capitalize">{role}</Label>
                                  </div>
                                ))}
                              </RadioGroup>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="experience"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Years of Experience</FormLabel>
                            <FormControl>
                              <Input
                                type="number"
                                min="0"
                                max="50"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="skills"
                        render={() => (
                          <FormItem>
                            <div className="mb-2">
                              <FormLabel>Technologies/Skills</FormLabel>
                              <FormDescription>
                                Select all that apply to you
                              </FormDescription>
                            </div>
                            
                            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                              {skillsList.map((skill) => (
                                <FormField
                                  key={skill}
                                  control={form.control}
                                  name={`skills.${skill.toLowerCase()}`}
                                  render={({ field }) => (
                                    <FormItem
                                      key={skill}
                                      className="flex items-center space-x-2"
                                    >
                                      <FormControl>
                                        <Checkbox
                                          checked={field.value}
                                          onCheckedChange={field.onChange}
                                        />
                                      </FormControl>
                                      <FormLabel className="text-sm font-normal">
                                        {skill}
                                      </FormLabel>
                                    </FormItem>
                                  )}
                                />
                              ))}
                            </div>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    
                    <div className="space-y-4">
                      <h2 className="text-xl font-semibold">Additional Information</h2>
                      
                      <FormField
                        control={form.control}
                        name="motivation"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Why do you want to join CodeBird Society?</FormLabel>
                            <FormControl>
                              <Textarea
                                placeholder="Tell us about yourself and why you want to join our community..."
                                rows={4}
                                {...field}
                              />
                            </FormControl>
                            <FormDescription>
                              Be specific about what you hope to gain and contribute
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="terms"
                        render={({ field }) => (
                          <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md p-4 border">
                            <FormControl>
                              <Checkbox
                                checked={field.value}
                                onCheckedChange={field.onChange}
                              />
                            </FormControl>
                            <div className="space-y-1 leading-none">
                              <FormLabel>
                                I agree to the Terms and Conditions
                              </FormLabel>
                              <FormDescription>
                                By checking this box, you agree to our{" "}
                                <a href="/terms" className="text-primary hover:underline">
                                  Terms of Service
                                </a>{" "}
                                and{" "}
                                <a href="/privacy" className="text-primary hover:underline">
                                  Privacy Policy
                                </a>
                              </FormDescription>
                            </div>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    
                    <Button 
                      type="submit" 
                      size="lg" 
                      className="w-full sm:w-auto"
                      disabled={form.formState.isSubmitting}
                    >
                      {form.formState.isSubmitting ? "Submitting..." : "Submit Application"}
                    </Button>
                  </form>
                </Form>
              </Card>
            </motion.div>
          )}
        </div>
      </div>
    </AnimatedPage>
  );
};

export default JoinPage;
