
import React, { useState } from "react";
import AnimatedPage from "../components/AnimatedPage";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Search, X, Download, ChevronLeft, ChevronRight, Info } from "lucide-react";

// Sample gallery images
const galleryImages = [
  {
    id: 1,
    title: "Hackathon Winners 2023",
    category: "Events",
    tags: ["hackathon", "coding", "winners"],
    src: "https://source.unsplash.com/random/800×600/?hackathon&1",
    date: "2023-09-12",
  },
  {
    id: 2,
    title: "Web Development Workshop",
    category: "Workshops",
    tags: ["web", "development", "learning"],
    src: "https://source.unsplash.com/random/800×600/?programming&2",
    date: "2023-10-20",
  },
  {
    id: 3,
    title: "Team Building Retreat",
    category: "Team",
    tags: ["team", "retreat", "fun"],
    src: "https://source.unsplash.com/random/800×600/?team&3",
    date: "2023-11-07",
  },
  {
    id: 4,
    title: "Annual Conference",
    category: "Events",
    tags: ["conference", "speakers", "tech"],
    src: "https://source.unsplash.com/random/800×600/?conference&4",
    date: "2023-05-15",
  },
  {
    id: 5,
    title: "Design Sprint",
    category: "Workshops",
    tags: ["design", "ux", "collaboration"],
    src: "https://source.unsplash.com/random/800×600/?design&5",
    date: "2023-06-28",
  },
  {
    id: 6,
    title: "Virtual Meetup",
    category: "Meetups",
    tags: ["virtual", "online", "community"],
    src: "https://source.unsplash.com/random/800×600/?virtual&6",
    date: "2023-08-09",
  },
  {
    id: 7,
    title: "Coding Boot Camp",
    category: "Workshops",
    tags: ["bootcamp", "intensive", "learning"],
    src: "https://source.unsplash.com/random/800×600/?coding&7",
    date: "2023-04-10",
  },
  {
    id: 8,
    title: "Open Source Contribution Day",
    category: "Events",
    tags: ["opensource", "contribution", "collaboration"],
    src: "https://source.unsplash.com/random/800×600/?opensource&8",
    date: "2023-07-22",
  },
  {
    id: 9,
    title: "AI & Machine Learning Panel",
    category: "Meetups",
    tags: ["ai", "ml", "panel", "discussion"],
    src: "https://source.unsplash.com/random/800×600/?ai&9",
    date: "2023-09-30",
  },
];

const categories = [
  { value: "all", label: "All" },
  { value: "Events", label: "Events" },
  { value: "Workshops", label: "Workshops" },
  { value: "Meetups", label: "Meetups" },
  { value: "Team", label: "Team" },
];

const GalleryPage = () => {
  const [activeCategory, setActiveCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedImage, setSelectedImage] = useState<typeof galleryImages[0] | null>(null);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  
  // Filter images based on category and search
  const filteredImages = galleryImages.filter(image => {
    const matchesCategory = activeCategory === "all" || image.category === activeCategory;
    const matchesSearch = 
      !searchQuery || 
      image.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      image.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    
    return matchesCategory && matchesSearch;
  });
  
  const openLightbox = (image: typeof galleryImages[0]) => {
    setSelectedImage(image);
    setLightboxIndex(filteredImages.findIndex(img => img.id === image.id));
    document.body.style.overflow = "hidden";
  };
  
  const closeLightbox = () => {
    setSelectedImage(null);
    setLightboxIndex(null);
    document.body.style.overflow = "auto";
  };
  
  const goToPrevious = () => {
    if (lightboxIndex === null) return;
    
    const newIndex = (lightboxIndex - 1 + filteredImages.length) % filteredImages.length;
    setSelectedImage(filteredImages[newIndex]);
    setLightboxIndex(newIndex);
  };
  
  const goToNext = () => {
    if (lightboxIndex === null) return;
    
    const newIndex = (lightboxIndex + 1) % filteredImages.length;
    setSelectedImage(filteredImages[newIndex]);
    setLightboxIndex(newIndex);
  };
  
  return (
    <AnimatedPage transitionType="fade">
      <Navbar />
      <div className="container mx-auto px-4 py-16">
        <motion.h1 
          className="text-4xl font-bold mb-8 text-center"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Gallery
        </motion.h1>
        
        <div className="max-w-4xl mx-auto mb-12 text-center">
          <motion.p
            className="text-lg mb-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Browse through moments captured at our events, workshops, and community gatherings.
          </motion.p>
          
          {/* Filters */}
          <motion.div
            className="flex flex-col md:flex-row gap-4 items-center justify-between mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <div className="relative w-full md:w-80">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search gallery..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            
            <Tabs defaultValue="all" value={activeCategory} onValueChange={setActiveCategory} className="w-full md:w-auto">
              <TabsList>
                {categories.map((category) => (
                  <TabsTrigger key={category.value} value={category.value}>
                    {category.label}
                  </TabsTrigger>
                ))}
              </TabsList>
            </Tabs>
          </motion.div>
        </div>
        
        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredImages.map((image, index) => (
            <motion.div
              key={image.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              className="group relative overflow-hidden rounded-lg cursor-pointer"
              onClick={() => openLightbox(image)}
            >
              <div className="aspect-w-3 aspect-h-2">
                <img 
                  src={image.src} 
                  alt={image.title}
                  className="object-cover w-full h-full transform transition-transform duration-500 group-hover:scale-110"
                />
              </div>
              
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
                <h3 className="text-white font-medium">{image.title}</h3>
                <div className="flex flex-wrap gap-2 mt-2">
                  {image.tags.map((tag) => (
                    <Badge key={tag} variant="secondary" className="bg-black/30 text-white">
                      #{tag}
                    </Badge>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
        
        {filteredImages.length === 0 && (
          <div className="text-center py-20">
            <h3 className="text-xl font-medium mb-2">No images found</h3>
            <p className="text-muted-foreground">Try adjusting your search or filter criteria</p>
          </div>
        )}
        
        {/* Lightbox */}
        <AnimatePresence>
          {selectedImage && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center bg-black/90"
              onClick={closeLightbox}
            >
              {/* Close button */}
              <button 
                className="absolute top-4 right-4 z-50 bg-black/50 text-white p-2 rounded-full hover:bg-black/70 transition-colors"
                onClick={(e) => {
                  e.stopPropagation();
                  closeLightbox();
                }}
              >
                <X size={24} />
              </button>
              
              {/* Navigation buttons */}
              <button 
                className="absolute left-4 z-50 bg-black/50 text-white p-2 rounded-full hover:bg-black/70 transition-colors"
                onClick={(e) => {
                  e.stopPropagation();
                  goToPrevious();
                }}
              >
                <ChevronLeft size={24} />
              </button>
              
              <button 
                className="absolute right-4 z-50 bg-black/50 text-white p-2 rounded-full hover:bg-black/70 transition-colors"
                onClick={(e) => {
                  e.stopPropagation();
                  goToNext();
                }}
              >
                <ChevronRight size={24} />
              </button>
              
              {/* Image */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ type: "spring", stiffness: 200, damping: 25 }}
                className="relative max-w-5xl max-h-[80vh] w-full"
                onClick={(e) => e.stopPropagation()}
              >
                <img 
                  src={selectedImage.src} 
                  alt={selectedImage.title} 
                  className="object-contain w-full h-full"
                />
                
                {/* Info overlay at bottom */}
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-4">
                  <div className="flex justify-between items-center">
                    <div>
                      <h3 className="text-white text-xl font-medium">{selectedImage.title}</h3>
                      <p className="text-white/70 text-sm">
                        {new Date(selectedImage.date).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "long",
                          day: "numeric"
                        })}
                      </p>
                    </div>
                    
                    <Button variant="outline" size="sm" className="bg-black/50 border-white/20">
                      <Download size={16} className="mr-2" /> Download
                    </Button>
                  </div>
                  
                  <div className="flex flex-wrap gap-2 mt-3">
                    {selectedImage.tags.map((tag) => (
                      <Badge key={tag} variant="outline" className="text-white border-white/20">
                        #{tag}
                      </Badge>
                    ))}
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      <Footer />
    </AnimatedPage>
  );
};

export default GalleryPage;
