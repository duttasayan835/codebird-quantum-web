
import React, { useState } from "react";
import AnimatedPage from "../components/AnimatedPage";
import { motion, useAnimation } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import Button from "@/components/atoms/Button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "@/components/ui/use-toast";
import useConfetti from "@/hooks/use-confetti";

const joinFormSchema = z.object({
  firstName: z.string().min(2, "First name must be at least 2 characters"),
  lastName: z.string().min(2, "Last name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().optional(),
  skillLevel: z.enum(["beginner", "intermediate", "advanced", "expert"]),
  interests: z.array(z.string()).min(1, "Please select at least one interest"),
  whyJoin: z.string().min(10, "Please tell us a bit more about why you want to join"),
  termsAccepted: z.boolean().refine(val => val === true, {
    message: "You must accept the terms and conditions",
  }),
});

type JoinFormValues = z.infer<typeof joinFormSchema>;

const JoinPage = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const controls = useAnimation();
  const { triggerConfetti } = useConfetti();
  
  const form = useForm<JoinFormValues>({
    resolver: zodResolver(joinFormSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      skillLevel: "intermediate",
      interests: [],
      whyJoin: "",
      termsAccepted: false,
    },
  });
  
  const onSubmit = async (data: JoinFormValues) => {
    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    console.log("Form submitted:", data);
    setIsSubmitting(false);
    setIsSubmitted(true);
    
    // Trigger confetti effect
    triggerConfetti();
    
    // Animate the success message
    controls.start({
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { type: "spring", stiffness: 100 }
    });
    
    toast({
      title: "Application Submitted!",
      description: "We've received your application and will be in touch soon.",
    });
  };
  
  const interestOptions = [
    { label: "Web Development", value: "web" },
    { label: "Mobile Development", value: "mobile" },
    { label: "Machine Learning", value: "ml" },
    { label: "Blockchain", value: "blockchain" },
    { label: "DevOps", value: "devops" },
    { label: "Design", value: "design" },
    { label: "Data Science", value: "data" },
  ];
  
  return (
    <AnimatedPage>
      <div className="container mx-auto px-4 py-16 max-w-5xl">
        <motion.h1 
          className="text-4xl font-bold mb-2 text-center"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Join Codebird Club
        </motion.h1>
        
        <motion.p
          className="text-xl text-center text-muted-foreground mb-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          Become part of our community of passionate developers, designers, and tech enthusiasts.
        </motion.p>
        
        {!isSubmitted ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="bg-card p-8 rounded-xl shadow-lg border border-border"
          >
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="firstName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>First Name</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter your first name" {...field} />
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
                          <Input placeholder="Enter your last name" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter your email address" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Phone (Optional)</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter your phone number" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                
                <FormField
                  control={form.control}
                  name="skillLevel"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Skill Level</FormLabel>
                      <FormControl>
                        <Select 
                          onValueChange={field.onChange} 
                          defaultValue={field.value}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select your skill level" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="beginner">Beginner</SelectItem>
                            <SelectItem value="intermediate">Intermediate</SelectItem>
                            <SelectItem value="advanced">Advanced</SelectItem>
                            <SelectItem value="expert">Expert</SelectItem>
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="interests"
                  render={() => (
                    <FormItem>
                      <FormLabel>Areas of Interest</FormLabel>
                      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 pt-1">
                        {interestOptions.map((interest) => (
                          <FormField
                            key={interest.value}
                            control={form.control}
                            name="interests"
                            render={({ field }) => {
                              return (
                                <FormItem
                                  key={interest.value}
                                  className="flex items-center space-x-2 space-y-0"
                                >
                                  <FormControl>
                                    <Checkbox
                                      checked={field.value?.includes(interest.value)}
                                      onCheckedChange={(checked) => {
                                        const updatedList = checked
                                          ? [...field.value, interest.value]
                                          : field.value.filter((val) => val !== interest.value);
                                        field.onChange(updatedList);
                                      }}
                                    />
                                  </FormControl>
                                  <FormLabel className="font-normal cursor-pointer">
                                    {interest.label}
                                  </FormLabel>
                                </FormItem>
                              );
                            }}
                          />
                        ))}
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="whyJoin"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Why do you want to join?</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="Tell us a bit about yourself and why you want to join the Codebird Club..." 
                          className="min-h-24"
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="termsAccepted"
                  render={({ field }) => (
                    <FormItem className="flex items-start space-x-2 space-y-0">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <div className="space-y-1 leading-none">
                        <FormLabel className="font-normal cursor-pointer">
                          I agree to the{" "}
                          <a href="/terms" className="text-primary hover:underline">
                            terms and conditions
                          </a>{" "}
                          and{" "}
                          <a href="/privacy" className="text-primary hover:underline">
                            privacy policy
                          </a>
                        </FormLabel>
                        <FormMessage />
                      </div>
                    </FormItem>
                  )}
                />
                
                <div className="pt-4">
                  <Button
                    type="submit"
                    isLoading={isSubmitting}
                    loadingText="Submitting..."
                    fullWidth
                    size="lg"
                  >
                    Submit Application
                  </Button>
                </div>
              </form>
            </Form>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={controls}
            className="text-center space-y-6 py-12"
          >
            <div className="w-24 h-24 rounded-full bg-primary/20 mx-auto flex items-center justify-center">
              <motion.svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="w-12 h-12 text-primary"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 1, delay: 0.2 }}
              >
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                <polyline points="22 4 12 14.01 9 11.01"></polyline>
              </motion.svg>
            </div>
            <h2 className="text-3xl font-bold">Application Submitted!</h2>
            <p className="text-xl text-muted-foreground">
              Thank you for your interest in joining the Codebird Club. We'll review your application and get back to you soon.
            </p>
            <div className="pt-6">
              <Button
                variant="outline"
                size="lg"
                onClick={() => {
                  form.reset();
                  setIsSubmitted(false);
                }}
              >
                Submit Another Application
              </Button>
            </div>
          </motion.div>
        )}
      </div>
    </AnimatedPage>
  );
};

export default JoinPage;
