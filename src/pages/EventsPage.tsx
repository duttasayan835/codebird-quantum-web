
import React from "react";
import AnimatedPage from "../components/AnimatedPage";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar, Clock, MapPin } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const EventsPage = () => {
  const events = [
    {
      id: 1,
      title: "CodeBird Annual Conference",
      date: "June 15-17, 2023",
      location: "San Francisco, CA",
      time: "9:00 AM - 5:00 PM",
      category: "Conference"
    },
    {
      id: 2,
      title: "Web Performance Workshop",
      date: "July 8, 2023",
      location: "Online",
      time: "1:00 PM - 3:00 PM",
      category: "Workshop"
    },
    {
      id: 3,
      title: "React Advanced Meetup",
      date: "July 22, 2023",
      location: "New York, NY",
      time: "6:30 PM - 9:00 PM",
      category: "Meetup"
    },
    {
      id: 4,
      title: "Design Systems Hackathon",
      date: "August 5-6, 2023",
      location: "Austin, TX",
      time: "10:00 AM - 6:00 PM",
      category: "Hackathon"
    }
  ];
  
  return (
    <AnimatedPage>
      <div className="container mx-auto px-4 py-16">
        <motion.h1 
          className="text-4xl font-bold mb-8 text-center"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Upcoming Events
        </motion.h1>
        
        <motion.div 
          className="max-w-4xl mx-auto mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <p className="text-center text-lg mb-8">
            Join us for exciting events, workshops, and meetups. Connect with fellow developers and expand your knowledge.
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {events.map((event, index) => (
            <motion.div
              key={event.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 * index }}
            >
              <Card className="h-full flex flex-col">
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <CardTitle>{event.title}</CardTitle>
                    <Badge>{event.category}</Badge>
                  </div>
                </CardHeader>
                <CardContent className="flex-grow">
                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <Calendar size={18} className="text-muted-foreground" />
                      <span>{event.date}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock size={18} className="text-muted-foreground" />
                      <span>{event.time}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin size={18} className="text-muted-foreground" />
                      <span>{event.location}</span>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Link 
                    to={`/events/${event.id}`}
                    className="text-primary hover:underline"
                  >
                    View details
                  </Link>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </AnimatedPage>
  );
};

export default EventsPage;
