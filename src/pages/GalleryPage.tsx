
import React from "react";
import AnimatedPage from "../components/AnimatedPage";
import { motion } from "framer-motion";
import { AspectRatio } from "@/components/ui/aspect-ratio";

const GalleryPage = () => {
  // In a real app, these would be actual images from your project or API
  const galleryItems = [
    { id: 1, title: "Annual Hackathon", category: "Events" },
    { id: 2, title: "Workshop Series", category: "Education" },
    { id: 3, title: "Team Building", category: "Community" },
    { id: 4, title: "Conference Presentations", category: "Events" },
    { id: 5, title: "Design Sprint", category: "Projects" },
    { id: 6, title: "Community Meetup", category: "Community" },
    { id: 7, title: "Project Launch", category: "Projects" },
    { id: 8, title: "Coding Sessions", category: "Education" }
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
          Gallery
        </motion.h1>
        
        <motion.div 
          className="max-w-3xl mx-auto mb-12 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <p className="text-lg mb-8">
            Explore photos and media from our events, workshops, and community activities.
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {galleryItems.map((item, index) => (
            <motion.div
              key={item.id}
              className="relative overflow-hidden rounded-lg cursor-pointer group"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, delay: 0.05 * index }}
              whileHover={{ scale: 1.03 }}
            >
              <AspectRatio ratio={1 / 1}>
                <div className="absolute inset-0 bg-gradient-to-br from-indigo-500 to-purple-700 opacity-80" />
                <div 
                  className="absolute inset-0 bg-cover bg-center" 
                  style={{ backgroundImage: `url(https://source.unsplash.com/random/300x300?${item.category.toLowerCase()})` }}
                />
                <div className="absolute inset-0 bg-black/30 transition-opacity group-hover:opacity-20" />
                <div className="absolute inset-0 flex flex-col justify-end p-4 text-white">
                  <h3 className="text-lg font-semibold">{item.title}</h3>
                  <p className="text-sm opacity-80">{item.category}</p>
                </div>
              </AspectRatio>
            </motion.div>
          ))}
        </div>
      </div>
    </AnimatedPage>
  );
};

export default GalleryPage;
