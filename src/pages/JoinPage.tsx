import React, { useState } from "react";
import AnimatedPage from "../components/AnimatedPage";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { CheckCircle } from "lucide-react";
import { toast } from "sonner";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Form, FormField, FormItem, FormControl, FormLabel, FormMessage } from "@/components/ui/form";
import Button from "@/components/atoms/Button";
import TextField from "@/components/atoms/TextField";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import confetti from 'canvas-confetti';

interface FormValues {
  name: string;
  email: string;
  skills: string;
  experienceLevel: string;
  reason: string;
}

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  email: z.string().email({
    message: "Please enter a valid email.",
  }),
  skills: z.string().min(10, {
    message: "Skills must be at least 10 characters.",
  }),
  experienceLevel: z.enum(["beginner", "intermediate", "advanced"], {
    required_error: "Please select an experience level.",
  }),
  reason: z.string().min(20, {
    message: "Reason must be at least 20 characters.",
  }),
})

const JoinPage = () => {
  const [submitted, setSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      skills: "",
      experienceLevel: "beginner",
      reason: "",
    },
  });

  const onSubmit = async (data: FormValues) => {
    setIsLoading(true);
    try {
      console.log("Join request data:", data);
      
      // Here you would typically send the data to your backend
      // For now, we'll just simulate a successful submission
      
      setTimeout(() => {
        setSubmitted(true);
        confetti.addConfetti();
        toast.success("Your application has been submitted successfully!");
      }, 1500);
      
      // If you want to actually store this in Supabase, you would uncomment this:
      /*
      const { error } = await supabase
        .from('join_requests')
        .insert([{ 
          name: data.name,
          email: data.email,
          skills: data.skills,
          experience_level: data.experienceLevel,
          reason: data.reason
        }]);
        
      if (error) throw error;
      */
      
    } catch (error) {
      console.error("Error submitting form:", error);
      toast.error("There was an error submitting your application. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AnimatedPage>
      <Navbar />
      <div className="container mx-auto px-4 py-16">
        <motion.h1 
          className="text-4xl font-bold mb-8 text-center"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Join the CodeBird Society
        </motion.h1>
        
        {submitted ? (
          <motion.div 
            className="max-w-3xl mx-auto bg-card rounded-lg p-8 shadow-lg text-center"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <div className="mb-6">
              <CheckCircle className="w-16 h-16 mx-auto text-primary mb-4" />
              <h2 className="text-2xl font-semibold mb-2">Application Submitted!</h2>
              <p className="mb-6">Thank you for applying to join the CodeBird Society. We'll review your application and get back to you soon.</p>
            </div>
            
            <Button asChild>
              <Link to="/">Return to Home</Link>
            </Button>
          </motion.div>
        ) : (
          <motion.div 
            className="max-w-3xl mx-auto bg-card rounded-lg p-8 shadow-lg"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Name</FormLabel>
                      <FormControl>
                        <TextField placeholder="John Doe" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <TextField placeholder="mail@example.com" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="skills"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Skills</FormLabel>
                      <FormControl>
                        <TextField placeholder="React, Node.js, UI/UX Design" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="experienceLevel"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Experience Level</FormLabel>
                      <select 
                        {...field} 
                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                      >
                        <option value="beginner">Beginner</option>
                        <option value="intermediate">Intermediate</option>
                        <option value="advanced">Advanced</option>
                      </select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="reason"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Why do you want to join?</FormLabel>
                      <FormControl>
                        <TextField placeholder="I want to collaborate with other developers..." {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <Button type="submit" fullWidth isLoading={isLoading} disabled={isLoading}>
                  Submit Application
                </Button>
              </form>
            </Form>
          </motion.div>
        )}
      </div>
      <Footer />
    </AnimatedPage>
  );
};

export default JoinPage;
