
import React, { useState } from "react";
import AnimatedPage from "../components/AnimatedPage";
import { motion, AnimatePresence } from "framer-motion";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

const GalleryPage = () => {
  const [selectedImage, setSelectedImage] = useState<number | null>(null);

  // Gallery items data
  const galleryItems = [
    { 
      id: 1, 
      title: "Annual Hackathon", 
      category: "Events", 
      description: "Our community's annual hackathon brings together the brightest minds to solve real-world problems."
    },
    { 
      id: 2, 
      title: "Workshop Series", 
      category: "Education", 
      description: "Hands-on workshops designed to help our members master new technologies and frameworks."
    },
    { 
      id: 3, 
      title: "Team Building", 
      category: "Community", 
      description: "Building strong relationships through collaborative activities and events."
    },
    { 
      id: 4, 
      title: "Conference Presentations", 
      category: "Events", 
      description: "Our members sharing knowledge at industry conferences and meetups."
    },
    { 
      id: 5, 
      title: "Design Sprint", 
      category: "Projects", 
      description: "Rapid prototyping and ideation sessions to bring concepts to life."
    },
    { 
      id: 6, 
      title: "Community Meetup", 
      category: "Community", 
      description: "Regular gatherings where members connect, share ideas, and inspire each other."
    },
    { 
      id: 7, 
      title: "Project Launch", 
      category: "Projects", 
      description: "Celebrating the successful launch of projects created by our community members."
    },
    { 
      id: 8, 
      title: "Coding Sessions", 
      category: "Education", 
      description: "Collaborative coding sessions where members learn from each other."
    },
    { 
      id: 9, 
      title: "Tech Talks", 
      category: "Education", 
      description: "Expert speakers sharing insights on cutting-edge technologies and industry trends."
    },
    { 
      id: 10, 
      title: "Hackathon Winners", 
      category: "Events", 
      description: "Celebrating the innovative solutions created during our hackathons."
    },
    { 
      id: 11, 
      title: "Office Tour", 
      category: "Community", 
      description: "A glimpse into our collaborative workspace and development environment."
    },
    { 
      id: 12, 
      title: "Product Demo", 
      category: "Projects", 
      description: "Showcasing the features and capabilities of our latest projects."
    }
  ];

  const navigateLightbox = (direction: 'prev' | 'next') => {
    if (selectedImage === null) return;
    
    const currentIndex = galleryItems.findIndex(item => item.id === selectedImage);
    if (direction === 'prev') {
      const prevIndex = (currentIndex - 1 + galleryItems.length) % galleryItems.length;
      setSelectedImage(galleryItems[prevIndex].id);
    } else {
      const nextIndex = (currentIndex + 1) % galleryItems.length;
      setSelectedImage(galleryItems[nextIndex].id);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowLeft') {
      navigateLightbox('prev');
    } else if (e.key === 'ArrowRight') {
      navigateLightbox('next');
    } else if (e.key === 'Escape') {
      setSelectedImage(null);
    }
  };

  // Get the selected image data
  const selectedImageData = galleryItems.find(item => item.id === selectedImage);

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
        
        <motion.div 
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, staggerChildren: 0.1 }}
        >
          {galleryItems.map((item, index) => (
            <motion.div
              key={item.id}
              className="relative overflow-hidden rounded-lg cursor-pointer group"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, delay: 0.05 * index }}
              whileHover={{ scale: 1.03 }}
              onClick={() => setSelectedImage(item.id)}
            >
              <AspectRatio ratio={1 / 1}>
                <div className="absolute inset-0 bg-gradient-to-br from-indigo-500 to-purple-700 opacity-80" />
                <div 
                  className="absolute inset-0 bg-cover bg-center" 
                  style={{ backgroundImage: `url(https://source.unsplash.com/random/800x800?${item.category.toLowerCase()})` }}
                />
                <div className="absolute inset-0 bg-black/30 transition-opacity group-hover:opacity-20" />
                <div className="absolute inset-0 flex flex-col justify-end p-4 text-white">
                  <h3 className="text-lg font-semibold">{item.title}</h3>
                  <p className="text-sm opacity-80">{item.category}</p>
                </div>
              </AspectRatio>
            </motion.div>
          ))}
        </motion.div>
        
        {/* Lightbox Modal */}
        <Dialog open={selectedImage !== null} onOpenChange={(open) => !open && setSelectedImage(null)}>
          <DialogContent 
            className="max-w-5xl p-0 border-0 bg-transparent shadow-none"
            onKeyDown={handleKeyDown}
          >
            <AnimatePresence mode="wait">
              {selectedImageData && (
                <motion.div
                  key={selectedImageData.id}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.3 }}
                  className="bg-background/95 backdrop-blur-sm rounded-lg overflow-hidden relative"
                >
                  <div className="aspect-[16/9] relative">
                    <img 
                      src={`https://source.unsplash.com/random/1600x900?${selectedImageData.category.toLowerCase()}`} 
                      alt={selectedImageData.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  
                  <div className="p-6">
                    <h2 className="text-2xl font-bold mb-2">{selectedImageData.title}</h2>
                    <p className="text-muted-foreground mb-4">{selectedImageData.description}</p>
                    <div className="flex items-center justify-between">
                      <Badge variant="secondary">{selectedImageData.category}</Badge>
                      <div className="flex gap-2">
                        <Button variant="outline" size="icon" onClick={() => navigateLightbox('prev')}>
                          <ChevronLeft className="h-4 w-4" />
                        </Button>
                        <Button variant="outline" size="icon" onClick={() => navigateLightbox('next')}>
                          <ChevronRight className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                  
                  <Button 
                    className="absolute top-4 right-4 bg-background/50 backdrop-blur-sm hover:bg-background/80"
                    size="icon" 
                    variant="ghost" 
                    onClick={() => setSelectedImage(null)}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </motion.div>
              )}
            </AnimatePresence>
          </DialogContent>
        </Dialog>
      </div>
    </AnimatedPage>
  );
};

export default GalleryPage;
