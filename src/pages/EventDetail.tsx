
import React from "react";
import AnimatedPage from "../components/AnimatedPage";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CalendarIcon, MapPinIcon, UsersIcon, ClockIcon } from "lucide-react";
import { useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const EventDetail = () => {
  const { id } = useParams();
  
  // Mock event data (in a real app, you would fetch this from an API)
  const event = {
    id: id,
    title: "CodeBird Society Annual Hackathon",
    date: "2023-11-15",
    time: "09:00 - 21:00",
    location: "Tech Hub, 123 Innovation Street",
    image: "https://images.unsplash.com/photo-1515169067868-5387ec356754?auto=format&fit=crop&q=80&w=1470&ixlib=rb-4.0.3",
    description: "Join us for our annual 24-hour hackathon where developers, designers, and tech enthusiasts come together to build innovative solutions to real-world problems. This year's theme is 'Technology for Social Good'.",
    attendees: 120,
    categories: ["Hackathon", "Coding", "Networking"],
    speakers: [
      {
        name: "Jane Smith",
        role: "CTO at TechStart",
        topic: "Building Scalable Solutions"
      },
      {
        name: "John Doe",
        role: "Lead Developer at CodeCorp",
        topic: "Working with AI APIs"
      }
    ]
  };
  
  return (
    <AnimatedPage>
      <Navbar />
      <div className="container mx-auto px-4 py-16">
        <motion.div 
          className="max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="mb-6 flex items-center gap-2">
            {event.categories.map((category, index) => (
              <Badge key={index} variant="outline" className="text-sm">
                {category}
              </Badge>
            ))}
          </div>
          
          <h1 className="text-4xl font-bold mb-4">{event.title}</h1>
          
          <div className="aspect-video w-full mb-8 overflow-hidden rounded-lg">
            <img src={event.image} alt={event.title} className="w-full h-full object-cover" />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="flex items-center">
              <CalendarIcon className="h-5 w-5 mr-2 text-primary" />
              <span>{event.date}</span>
            </div>
            
            <div className="flex items-center">
              <ClockIcon className="h-5 w-5 mr-2 text-primary" />
              <span>{event.time}</span>
            </div>
            
            <div className="flex items-center">
              <MapPinIcon className="h-5 w-5 mr-2 text-primary" />
              <span>{event.location}</span>
            </div>
          </div>
          
          <div className="bg-card rounded-lg p-6 mb-8">
            <h2 className="text-xl font-semibold mb-4">About This Event</h2>
            <p className="mb-4">{event.description}</p>
            
            <div className="flex items-center text-sm text-muted-foreground">
              <UsersIcon className="h-4 w-4 mr-1" />
              <span>{event.attendees} attendees</span>
            </div>
          </div>
          
          <div className="bg-card rounded-lg p-6 mb-8">
            <h2 className="text-xl font-semibold mb-4">Featured Speakers</h2>
            <div className="space-y-4">
              {event.speakers.map((speaker, index) => (
                <div key={index} className="flex items-start">
                  <div className="h-10 w-10 rounded-full bg-primary/20 flex items-center justify-center mr-3">
                    <span className="font-medium text-primary">{speaker.name.charAt(0)}</span>
                  </div>
                  <div>
                    <h3 className="font-medium">{speaker.name}</h3>
                    <p className="text-sm text-muted-foreground">{speaker.role}</p>
                    <p className="text-sm">{speaker.topic}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div className="flex justify-center">
            <Button size="lg" className="mr-4">Register Now</Button>
            <Button variant="outline" size="lg">Add to Calendar</Button>
          </div>
        </motion.div>
      </div>
      <Footer />
    </AnimatedPage>
  );
};

export default EventDetail;
