
import React, { useState } from "react";
import AnimatedPage from "@/components/AnimatedPage";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import Button from "@/components/atoms/Button";
import { Star, ThumbsUp, MessageSquare, Check } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { useAuth } from "@/contexts/AuthContext";

// Review categories
const CATEGORIES = [
  { value: "general", label: "General Feedback" },
  { value: "techstack", label: "Tech Stacks" },
  { value: "events", label: "Events & Workshops" },
  { value: "community", label: "Community Experience" },
  { value: "platform", label: "Website & Platform" },
];

// Sample existing reviews for demonstration
const SAMPLE_REVIEWS = [
  {
    id: 1,
    author: "Sarah L.",
    category: "techstack",
    rating: 5,
    content: "The React and Next.js workshops were incredibly helpful for my career growth. I've learned more in 2 months than I did in a year of self-study.",
    likes: 12,
    date: "2025-05-20",
    avatar: "/placeholder.svg"
  },
  {
    id: 2,
    author: "Michael T.",
    category: "events",
    rating: 4,
    content: "The hackathon was extremely well organized. The mentors were knowledgeable and the challenges were engaging. Looking forward to the next one!",
    likes: 8,
    date: "2025-05-18",
    avatar: "/placeholder.svg"
  },
  {
    id: 3,
    author: "Priya K.",
    category: "community",
    rating: 5,
    content: "CodeBird's community is so welcoming and supportive. I've made valuable connections and found collaborators for my projects.",
    likes: 15,
    date: "2025-05-15",
    avatar: "/placeholder.svg"
  }
];

const InferencePage = () => {
  const { toast } = useToast();
  const { user, profile } = useAuth();
  const [selectedCategory, setSelectedCategory] = useState("general");
  const [rating, setRating] = useState(0);
  const [feedback, setFeedback] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [activeTab, setActiveTab] = useState("submit");
  const [reviews, setReviews] = useState(SAMPLE_REVIEWS);

  const handleRatingClick = (value: number) => {
    setRating(value);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (rating === 0) {
      toast({
        title: "Rating Required",
        description: "Please provide a rating before submitting your feedback.",
        variant: "destructive",
      });
      return;
    }

    if (!feedback.trim()) {
      toast({
        title: "Feedback Required",
        description: "Please provide your feedback before submitting.",
        variant: "destructive",
      });
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // In a real application, we would send this data to a backend
      // Simulating API call with setTimeout
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const newReview = {
        id: Date.now(),
        author: profile?.full_name || user?.email?.split('@')[0] || "Anonymous",
        category: selectedCategory,
        rating,
        content: feedback,
        likes: 0,
        date: new Date().toISOString().split('T')[0],
        avatar: profile?.avatar_url || "/placeholder.svg"
      };
      
      // Add the new review to our state
      setReviews(prev => [newReview, ...prev]);
      
      setIsSubmitted(true);
      toast({
        title: "Feedback Submitted",
        description: "Thank you for sharing your experience with us!",
      });
      
      // Reset form after successful submission
      setTimeout(() => {
        setIsSubmitted(false);
        setRating(0);
        setFeedback("");
        setActiveTab("browse");
      }, 2000);
      
    } catch (error) {
      console.error("Error submitting feedback:", error);
      toast({
        title: "Submission Failed",
        description: "An error occurred while submitting your feedback. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };
  
  const handleLike = (id: number) => {
    setReviews(prev => 
      prev.map(review => 
        review.id === id ? { ...review, likes: review.likes + 1 } : review
      )
    );
  };

  return (
    <AnimatedPage>
      <Navbar />
      <div className="container mx-auto px-4 py-16">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-8"
        >
          <h1 className="text-4xl font-bold mb-2">Community Inference</h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Share your experiences, provide feedback on tech stacks, events, and more to help us improve and grow together.
          </p>
        </motion.div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="max-w-4xl mx-auto">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="submit">Submit Feedback</TabsTrigger>
            <TabsTrigger value="browse">Browse Reviews</TabsTrigger>
          </TabsList>
          
          <TabsContent value="submit">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              <Card className="bg-card border border-border shadow-lg">
                <CardHeader>
                  <CardTitle>Share Your Experience</CardTitle>
                  <CardDescription>
                    Your insights help us improve the CodeBird Club community and offerings.
                  </CardDescription>
                </CardHeader>
                
                <CardContent>
                  {isSubmitted ? (
                    <motion.div 
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="text-center py-8"
                    >
                      <div className="mx-auto w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mb-4">
                        <Check className="w-8 h-8 text-green-600 dark:text-green-400" />
                      </div>
                      <h3 className="text-xl font-semibold mb-2">Thank You!</h3>
                      <p className="text-muted-foreground">
                        Your feedback has been submitted successfully.
                      </p>
                    </motion.div>
                  ) : (
                    <form onSubmit={handleSubmit} className="space-y-6">
                      <div className="space-y-2">
                        <Label htmlFor="category">Category</Label>
                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                          {CATEGORIES.map((category) => (
                            <Button
                              key={category.value}
                              type="button"
                              variant={selectedCategory === category.value ? "default" : "outline"}
                              onClick={() => setSelectedCategory(category.value)}
                              className="justify-start"
                            >
                              {category.label}
                            </Button>
                          ))}
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <Label>Rating</Label>
                        <div className="flex items-center gap-2">
                          {[1, 2, 3, 4, 5].map((value) => (
                            <button
                              key={value}
                              type="button"
                              onClick={() => handleRatingClick(value)}
                              className="focus:outline-none"
                            >
                              <Star 
                                className={`w-8 h-8 ${
                                  rating >= value 
                                    ? "fill-yellow-400 text-yellow-400" 
                                    : "text-gray-300 dark:text-gray-600"
                                }`} 
                              />
                            </button>
                          ))}
                          <span className="ml-2 text-sm text-muted-foreground">
                            {rating > 0 ? `${rating} out of 5` : "Select a rating"}
                          </span>
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="feedback">Your Feedback</Label>
                        <Textarea
                          id="feedback"
                          value={feedback}
                          onChange={(e) => setFeedback(e.target.value)}
                          placeholder="Share your experience, suggestions, or questions..."
                          rows={5}
                          className="resize-none"
                        />
                      </div>
                    </form>
                  )}
                </CardContent>
                
                <CardFooter>
                  {!isSubmitted && (
                    <Button 
                      onClick={handleSubmit}
                      className="ml-auto"
                      isLoading={isSubmitting}
                      loadingText="Submitting..."
                    >
                      Submit Feedback
                    </Button>
                  )}
                </CardFooter>
              </Card>
            </motion.div>
          </TabsContent>
          
          <TabsContent value="browse">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
              className="space-y-6"
            >
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-semibold">Community Reviews</h2>
                <div className="text-sm text-muted-foreground">
                  Showing {reviews.length} reviews
                </div>
              </div>
              
              {reviews.map((review) => (
                <motion.div
                  key={review.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <Card className="overflow-hidden">
                    <CardHeader className="pb-2">
                      <div className="flex justify-between">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full overflow-hidden bg-muted">
                            <img 
                              src={review.avatar} 
                              alt={review.author}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div>
                            <CardTitle className="text-md">{review.author}</CardTitle>
                            <div className="flex items-center text-xs text-muted-foreground mt-1">
                              <div className="flex">
                                {Array.from({ length: 5 }).map((_, i) => (
                                  <Star 
                                    key={i} 
                                    size={12} 
                                    className={i < review.rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"} 
                                  />
                                ))}
                              </div>
                              <span className="mx-2">•</span>
                              <span>{review.date}</span>
                              <span className="mx-2">•</span>
                              <span className="capitalize">{CATEGORIES.find(c => c.value === review.category)?.label}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardHeader>
                    
                    <CardContent className="py-2">
                      <p className="text-sm">{review.content}</p>
                    </CardContent>
                    
                    <CardFooter className="pt-2 border-t">
                      <button 
                        onClick={() => handleLike(review.id)}
                        className="flex items-center text-xs text-muted-foreground hover:text-foreground transition-colors"
                      >
                        <ThumbsUp size={14} className="mr-1" /> {review.likes}
                      </button>
                      
                      <button className="flex items-center text-xs text-muted-foreground hover:text-foreground transition-colors ml-4">
                        <MessageSquare size={14} className="mr-1" /> Reply
                      </button>
                    </CardFooter>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          </TabsContent>
        </Tabs>
      </div>
      <Footer />
    </AnimatedPage>
  );
};

export default InferencePage;
