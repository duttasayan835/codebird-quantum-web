
import React, { useState, useEffect } from "react";
import AnimatedPage from "@/components/AnimatedPage";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { CalendarDays, Clock, MapPin } from "lucide-react";
import { differenceInDays, differenceInHours, differenceInMinutes, differenceInSeconds, format } from "date-fns";

interface Event {
  id: string;
  title: string;
  description: string;
  date: Date;
  location: string;
  type: "workshop" | "meetup" | "conference" | "hackathon";
  image: string;
}

const events: Event[] = [
  {
    id: "1",
    title: "React Advanced Workshop",
    description: "Deep dive into advanced React patterns and performance optimizations.",
    date: new Date(new Date().getTime() + 7 * 24 * 60 * 60 * 1000), // 7 days from now
    location: "Codebird HQ, San Francisco",
    type: "workshop",
    image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=2670&auto=format&fit=crop"
  },
  {
    id: "2",
    title: "JavaScript Meetup",
    description: "Monthly meetup discussing the latest in JavaScript and web development.",
    date: new Date(new Date().getTime() + 14 * 24 * 60 * 60 * 1000), // 14 days from now
    location: "Tech Hub, New York",
    type: "meetup",
    image: "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?q=80&w=2532&auto=format&fit=crop"
  },
  {
    id: "3",
    title: "WebDev Conference 2025",
    description: "Annual conference bringing together developers from around the world.",
    date: new Date(new Date().getTime() + 60 * 24 * 60 * 60 * 1000), // 60 days from now
    location: "Convention Center, London",
    type: "conference",
    image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=2670&auto=format&fit=crop"
  },
  {
    id: "4",
    title: "AI & ML Hackathon",
    description: "48-hour hackathon focused on artificial intelligence and machine learning projects.",
    date: new Date(new Date().getTime() + 30 * 24 * 60 * 60 * 1000), // 30 days from now
    location: "Innovation Center, Berlin",
    type: "hackathon",
    image: "https://images.unsplash.com/photo-1504639725590-34d0984388bd?q=80&w=2574&auto=format&fit=crop"
  }
];

// Sort events by date
const sortedEvents = [...events].sort((a, b) => a.date.getTime() - b.date.getTime());
const nextEvent = sortedEvents[0];

const getTypeColor = (type: Event["type"]) => {
  switch(type) {
    case "workshop": return "bg-blue-500";
    case "meetup": return "bg-green-500";
    case "conference": return "bg-purple-500";
    case "hackathon": return "bg-orange-500";
    default: return "bg-gray-500";
  }
};

const EventsPage = () => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  useEffect(() => {
    const calculateTimeLeft = () => {
      const days = differenceInDays(nextEvent.date, new Date());
      const hours = differenceInHours(nextEvent.date, new Date()) % 24;
      const minutes = differenceInMinutes(nextEvent.date, new Date()) % 60;
      const seconds = differenceInSeconds(nextEvent.date, new Date()) % 60;

      setTimeLeft({ days, hours, minutes, seconds });
    };

    calculateTimeLeft();
    const timerId = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(timerId);
  }, []);

  const timeUnits = [
    { label: "Days", value: timeLeft.days },
    { label: "Hours", value: timeLeft.hours },
    { label: "Minutes", value: timeLeft.minutes },
    { label: "Seconds", value: timeLeft.seconds }
  ];

  return (
    <AnimatedPage>
      <Navbar />
      <div className="container mx-auto px-4 py-16">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold">Upcoming Events</h1>
          <p className="mt-4 text-lg max-w-2xl mx-auto">
            Join us at one of our upcoming events to learn, connect, and grow with the community.
          </p>
        </motion.div>

        {/* Countdown to next event */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <Card className="overflow-hidden bg-black/40 backdrop-blur-lg border border-white/10">
            <div className="relative h-64 md:h-80">
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent z-10" />
              <div 
                className="h-full w-full bg-cover bg-center"
                style={{ backgroundImage: `url(${nextEvent.image})` }}
              />
              <div className="absolute bottom-6 left-6 z-20 max-w-2xl">
                <Badge className={`${getTypeColor(nextEvent.type)} mb-2`}>
                  {nextEvent.type.toUpperCase()}
                </Badge>
                <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">{nextEvent.title}</h2>
                <div className="flex items-center space-x-4 text-white/80">
                  <div className="flex items-center">
                    <CalendarDays size={16} className="mr-1" />
                    <span>{format(nextEvent.date, 'MMM d, yyyy')}</span>
                  </div>
                  <div className="flex items-center">
                    <MapPin size={16} className="mr-1" />
                    <span>{nextEvent.location}</span>
                  </div>
                </div>
              </div>
            </div>
            
            <CardContent className="p-6">
              <h3 className="text-xl font-semibold mb-2">Countdown to Next Event</h3>
              <p className="mb-6 text-muted-foreground">{nextEvent.description}</p>
              
              <div className="grid grid-cols-4 gap-4 max-w-2xl mx-auto">
                {timeUnits.map((unit) => (
                  <motion.div 
                    key={unit.label}
                    className="flex flex-col items-center p-4 rounded-lg bg-background/60"
                    whileHover={{ scale: 1.05 }}
                    transition={{ type: "spring", stiffness: 400, damping: 10 }}
                  >
                    <span className="text-3xl md:text-4xl font-bold text-primary">{unit.value}</span>
                    <span className="text-xs md:text-sm text-muted-foreground">{unit.label}</span>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Timeline track */}
          <div className="absolute left-0 md:left-1/2 transform md:-translate-x-1/2 h-full w-1 bg-primary/30" />

          {/* Event cards */}
          {events.map((event, index) => (
            <motion.div
              key={event.id}
              className="mb-12 relative"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 * index }}
            >
              <div className={`flex flex-col ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} items-center`}>
                {/* Timeline dot */}
                <div className="absolute left-0 md:left-1/2 transform md:-translate-x-1/2 w-4 h-4 rounded-full bg-primary animate-pulse z-10" />
                
                {/* Date marker */}
                <div className="mb-4 md:mb-0 md:w-1/2 flex justify-center md:justify-end md:pr-8">
                  <div className={`md:text-right ${index % 2 === 1 ? 'md:text-left md:pl-8' : ''}`}>
                    <div className="inline-block px-4 py-2 rounded-lg bg-primary text-primary-foreground">
                      <Clock size={16} className="inline-block mr-2" />
                      {format(event.date, 'MMM d, yyyy')}
                    </div>
                  </div>
                </div>
                
                {/* Event card */}
                <div className="md:w-1/2 md:pl-8">
                  <Card className="overflow-hidden bg-black/40 backdrop-blur-lg border border-white/10">
                    <div className="h-48 relative">
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10" />
                      <div 
                        className="h-full w-full bg-cover bg-center"
                        style={{ backgroundImage: `url(${event.image})` }}
                      />
                      <div className="absolute bottom-4 left-4 z-20">
                        <Badge className={`${getTypeColor(event.type)}`}>
                          {event.type.toUpperCase()}
                        </Badge>
                      </div>
                    </div>
                    
                    <CardContent className="p-4">
                      <h3 className="text-lg font-semibold mb-2">{event.title}</h3>
                      <p className="text-sm text-muted-foreground mb-3">{event.description}</p>
                      <div className="flex items-center text-sm text-muted-foreground">
                        <MapPin size={14} className="mr-1" />
                        <span>{event.location}</span>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
      <Footer />
    </AnimatedPage>
  );
};

export default EventsPage;
