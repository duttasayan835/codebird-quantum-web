
import React from "react";
import { Link } from "react-router-dom";
import { Calendar, Clock, MapPin, ArrowRight } from "lucide-react";

const events = [
  {
    id: 1,
    title: "Web3 Development Workshop",
    date: "June 15, 2023",
    time: "2:00 PM - 5:00 PM",
    location: "Virtual Event",
    image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80"
  },
  {
    id: 2,
    title: "AI & Machine Learning Hackathon",
    date: "July 8-9, 2023",
    time: "9:00 AM - 6:00 PM",
    location: "Tech Innovation Center",
    image: "https://images.unsplash.com/photo-1581094794329-c8112a89af12?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80"
  },
  {
    id: 3,
    title: "Frontend Development Masterclass",
    date: "August 22, 2023",
    time: "1:00 PM - 4:00 PM",
    location: "Virtual Event",
    image: "https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80"
  }
];

const EventCard = ({ event }: { event: typeof events[0] }) => {
  return (
    <div className="glass-card overflow-hidden group">
      <div className="relative h-48 overflow-hidden">
        <img 
          src={event.image} 
          alt={event.title} 
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent"></div>
      </div>
      <div className="p-6">
        <h3 className="text-xl font-bold mb-3">{event.title}</h3>
        <div className="space-y-2 text-sm text-foreground/70 mb-4">
          <div className="flex items-center gap-2">
            <Calendar size={16} />
            <span>{event.date}</span>
          </div>
          <div className="flex items-center gap-2">
            <Clock size={16} />
            <span>{event.time}</span>
          </div>
          <div className="flex items-center gap-2">
            <MapPin size={16} />
            <span>{event.location}</span>
          </div>
        </div>
        <Link
          to={`/events/${event.id}`}
          className="inline-flex items-center gap-1 text-primary hover:text-primary/80 transition-colors"
        >
          Register now <ArrowRight size={16} />
        </Link>
      </div>
    </div>
  );
};

const UpcomingEventsSection = () => {
  return (
    <section className="py-20 bg-gradient-to-b from-background to-background/90">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Upcoming <span className="text-gradient">Events</span>
            </h2>
            <p className="text-xl text-foreground/70 max-w-2xl">
              Join our workshops, hackathons, and meetups to learn and connect with the community
            </p>
          </div>
          <Link
            to="/events"
            className="mt-4 md:mt-0 inline-flex items-center text-primary hover:text-primary/80 transition-colors"
          >
            View all events <ArrowRight size={16} className="ml-1" />
          </Link>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {events.map(event => (
            <EventCard key={event.id} event={event} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default UpcomingEventsSection;
