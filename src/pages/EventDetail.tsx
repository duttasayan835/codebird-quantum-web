
import React from "react";
import { useParams, Link } from "react-router-dom";
import AnimatedPage from "../components/AnimatedPage";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, Clock, MapPin, Users, ArrowLeft } from "lucide-react";
import { Card } from "@/components/ui/card";

const EventDetail = () => {
  const { id } = useParams();
  
  // Mock data - in a real app, you would fetch this data based on the ID
  const event = {
    id: Number(id),
    title: "CodeBird Annual Conference",
    date: "June 15-17, 2023",
    location: "Moscone Center, San Francisco, CA",
    time: "9:00 AM - 5:00 PM",
    category: "Conference",
    description: "Join us for our flagship annual conference where we'll explore the latest trends in web development, design systems, artificial intelligence, and more. Connect with industry leaders and fellow developers in this 3-day event packed with workshops, talks, and networking opportunities.",
    speakers: [
      { name: "Alex Johnson", topic: "The Future of Web Development" },
      { name: "Samantha Lee", topic: "Building Accessible Design Systems" },
      { name: "Marcus Chen", topic: "AI-Powered Development Workflows" },
      { name: "Priya Patel", topic: "Performance Optimization Strategies" }
    ],
    attendees: 350
  };

  return (
    <AnimatedPage>
      <div className="container mx-auto px-4 py-16">
        <Link to="/events" className="flex items-center gap-2 text-primary hover:underline mb-8">
          <ArrowLeft size={16} />
          Back to all events
        </Link>
        
        <div className="max-w-4xl mx-auto">
          <motion.div 
            className="mb-8"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-4">
              <h1 className="text-4xl font-bold">{event.title}</h1>
              <Badge size="lg" className="text-sm px-3 py-1">{event.category}</Badge>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="flex items-center gap-2">
                <Calendar size={20} className="text-primary" />
                <span>{event.date}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock size={20} className="text-primary" />
                <span>{event.time}</span>
              </div>
              <div className="flex items-center gap-2">
                <Users size={20} className="text-primary" />
                <span>{event.attendees} Attendees</span>
              </div>
            </div>
            
            <div className="flex items-center gap-2 mb-8">
              <MapPin size={20} className="text-primary" />
              <span>{event.location}</span>
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Card className="p-6 mb-8">
              <h2 className="text-2xl font-semibold mb-4">About this event</h2>
              <p className="mb-6">{event.description}</p>
              <Button size="lg">Register Now</Button>
            </Card>
            
            <h2 className="text-2xl font-semibold mb-4">Featured Speakers</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
              {event.speakers.map((speaker, index) => (
                <motion.div
                  key={speaker.name}
                  className="p-4 border rounded-md"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: 0.1 * index }}
                >
                  <h3 className="font-semibold">{speaker.name}</h3>
                  <p className="text-muted-foreground">{speaker.topic}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </AnimatedPage>
  );
};

export default EventDetail;
