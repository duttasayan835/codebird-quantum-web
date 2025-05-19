
import React, { useState, useEffect } from "react";
import AnimatedPage from "../components/AnimatedPage";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, User, Tag, ArrowRight, Search, Filter } from "lucide-react";

// Mock blog data (would normally come from contentlayer/MDX)
const blogPosts = [
  {
    id: 'getting-started-with-react',
    title: 'Getting Started with React',
    summary: 'Learn the basics of React, from components to hooks and beyond.',
    date: '2024-04-15',
    author: 'Jane Cooper',
    authorAvatar: 'https://source.unsplash.com/random/300×300/?portrait&1',
    readTime: 5,
    tags: ['React', 'JavaScript', 'Frontend'],
    featured: true,
    image: 'https://source.unsplash.com/random/800×400/?code&1',
    content: `
      # Getting Started with React

      React is a JavaScript library for building user interfaces. It's declarative, efficient, and flexible.

      ## Creating Components

      \`\`\`jsx
      function Welcome(props) {
        return <h1>Hello, {props.name}</h1>;
      }
      \`\`\`

      ## Using Hooks

      \`\`\`jsx
      function Counter() {
        const [count, setCount] = useState(0);
        return (
          <div>
            <p>You clicked {count} times</p>
            <button onClick={() => setCount(count + 1)}>
              Click me
            </button>
          </div>
        );
      }
      \`\`\`
    `
  },
  {
    id: 'typescript-best-practices',
    title: 'TypeScript Best Practices for 2024',
    summary: 'Maximize your TypeScript productivity with these modern patterns.',
    date: '2024-05-02',
    author: 'John Smith',
    authorAvatar: 'https://source.unsplash.com/random/300×300/?portrait&2',
    readTime: 8,
    tags: ['TypeScript', 'JavaScript', 'Programming'],
    featured: false,
    image: 'https://source.unsplash.com/random/800×400/?typescript&2',
    content: `
      # TypeScript Best Practices for 2024

      TypeScript continues to evolve, and so do the best practices for using it effectively.

      ## Use Discriminated Unions

      \`\`\`typescript
      type Success = {
        status: 'success';
        data: { id: string; name: string };
      };
      
      type Error = {
        status: 'error';
        error: string;
      };
      
      type Result = Success | Error;
      
      function handleResult(result: Result) {
        if (result.status === 'success') {
          // TypeScript knows that result is Success
          console.log(result.data.name);
        } else {
          // TypeScript knows that result is Error
          console.error(result.error);
        }
      }
      \`\`\`

      ## Use Readonly Types

      \`\`\`typescript
      function calculateTotal(items: ReadonlyArray<{ price: number; quantity: number }>) {
        // items can't be modified
        return items.reduce((total, item) => total + item.price * item.quantity, 0);
      }
      \`\`\`
    `
  },
  {
    id: 'mastering-tailwind-css',
    title: 'Mastering Tailwind CSS',
    summary: 'Unlock the full potential of Tailwind CSS in your projects.',
    date: '2024-04-28',
    author: 'Emma Wilson',
    authorAvatar: 'https://source.unsplash.com/random/300×300/?portrait&3',
    readTime: 6,
    tags: ['CSS', 'Tailwind', 'Design'],
    featured: true,
    image: 'https://source.unsplash.com/random/800×400/?design&3',
    content: `
      # Mastering Tailwind CSS

      Tailwind CSS is a utility-first CSS framework that allows you to build designs directly in your markup.

      ## Custom Configuration

      \`\`\`js
      // tailwind.config.js
      module.exports = {
        theme: {
          extend: {
            colors: {
              'brand': {
                light: '#FFEBEE',
                DEFAULT: '#F44336',
                dark: '#B71C1C',
              }
            }
          }
        }
      }
      \`\`\`

      ## Responsive Design

      \`\`\`html
      <div class="text-sm md:text-base lg:text-lg">
        Responsive text size
      </div>
      \`\`\`
    `
  },
  {
    id: 'next-level-git',
    title: 'Taking Your Git Skills to the Next Level',
    summary: 'Advanced Git techniques every developer should know.',
    date: '2024-05-10',
    author: 'Mark Thompson',
    authorAvatar: 'https://source.unsplash.com/random/300×300/?portrait&4',
    readTime: 7,
    tags: ['Git', 'DevOps', 'Tools'],
    featured: false,
    image: 'https://source.unsplash.com/random/800×400/?git&4',
    content: `
      # Taking Your Git Skills to the Next Level

      Git is more than just \`commit\`, \`push\`, and \`pull\`. Let's explore some advanced techniques.

      ## Interactive Rebase

      \`\`\`bash
      git rebase -i HEAD~3
      \`\`\`

      ## Git Bisect

      \`\`\`bash
      git bisect start
      git bisect bad  # Current commit has the bug
      git bisect good v1.0.0  # This version was working
      # Git will now help you find the bad commit
      \`\`\`
    `
  }
];

// Tags extracted from posts for filtering
const allTags = [...new Set(blogPosts.flatMap(post => post.tags))];

const BlogPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTag, setActiveTag] = useState<string | null>(null);
  const [filteredPosts, setFilteredPosts] = useState(blogPosts);
  
  // Filter posts based on search query and active tag
  useEffect(() => {
    const filtered = blogPosts.filter(post => {
      const matchesSearch = 
        !searchQuery ||
        post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
      
      const matchesTag = !activeTag || post.tags.includes(activeTag);
      
      return matchesSearch && matchesTag;
    });
    
    setFilteredPosts(filtered);
  }, [searchQuery, activeTag]);
  
  // Toggle tag selection
  const handleTagClick = (tag: string) => {
    if (activeTag === tag) {
      setActiveTag(null);
    } else {
      setActiveTag(tag);
    }
  };
  
  return (
    <AnimatedPage transitionType="slide">
      <Navbar />
      <div className="container mx-auto px-4 py-16">
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-4xl mx-auto mb-12"
        >
          <h1 className="text-4xl font-bold mb-4 text-center">Codebird Blog</h1>
          <p className="text-xl text-center text-muted-foreground">
            Insights, tutorials, and news from the Codebird community
          </p>
        </motion.div>
        
        {/* Search and Filters */}
        <div className="max-w-6xl mx-auto mb-12">
          <div className="flex flex-col md:flex-row gap-4 items-center mb-8">
            <div className="relative w-full md:max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search articles..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            
            <div className="flex-1 flex justify-end">
              <Button variant="outline" size="sm" className="ml-auto">
                <Filter className="h-4 w-4 mr-2" />
                Filters
              </Button>
            </div>
          </div>
          
          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-8">
            {allTags.map((tag) => (
              <Badge
                key={tag}
                variant={activeTag === tag ? "default" : "outline"}
                className="cursor-pointer"
                onClick={() => handleTagClick(tag)}
              >
                {tag}
              </Badge>
            ))}
          </div>
        </div>
        
        {/* Featured Posts */}
        <div className="max-w-6xl mx-auto mb-16">
          <h2 className="text-2xl font-semibold mb-6 flex items-center">
            <span className="bg-primary/20 text-primary p-1.5 rounded-md mr-2">
              <ArrowRight size={18} />
            </span>
            Featured Articles
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {filteredPosts.filter(post => post.featured).map((post) => (
              <motion.div 
                key={post.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
              >
                <Card className="h-full overflow-hidden hover:shadow-md transition-shadow">
                  <div 
                    className="h-48 bg-cover bg-center"
                    style={{ backgroundImage: `url(${post.image})` }}
                  />
                  <CardHeader>
                    <div className="flex items-center gap-2 mb-2">
                      {post.tags.slice(0, 2).map((tag) => (
                        <Badge key={tag} variant="secondary">{tag}</Badge>
                      ))}
                      {post.tags.length > 2 && <Badge variant="outline">+{post.tags.length - 2}</Badge>}
                    </div>
                    <CardTitle className="text-xl hover:text-primary transition-colors">
                      <a href={`/blog/${post.id}`}>{post.title}</a>
                    </CardTitle>
                    <CardDescription>{post.summary}</CardDescription>
                  </CardHeader>
                  <CardFooter className="flex justify-between text-sm text-muted-foreground">
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded-full bg-cover bg-center" style={{ backgroundImage: `url(${post.authorAvatar})` }} />
                      <span>{post.author}</span>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-1">
                        <Calendar size={14} />
                        <span>{new Date(post.date).toLocaleDateString("en-US", { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock size={14} />
                        <span>{post.readTime} min</span>
                      </div>
                    </div>
                  </CardFooter>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
        
        {/* All Posts */}
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl font-semibold mb-6 flex items-center">
            <span className="bg-primary/20 text-primary p-1.5 rounded-md mr-2">
              <ArrowRight size={18} />
            </span>
            All Articles
          </h2>
          
          <Tabs defaultValue="latest">
            <TabsList>
              <TabsTrigger value="latest">Latest</TabsTrigger>
              <TabsTrigger value="popular">Popular</TabsTrigger>
              <TabsTrigger value="trending">Trending</TabsTrigger>
            </TabsList>
            
            <TabsContent value="latest" className="mt-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredPosts.map((post) => (
                  <motion.div 
                    key={post.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4 }}
                  >
                    <Card className="h-full hover:shadow-md transition-shadow">
                      <div 
                        className="h-40 bg-cover bg-center"
                        style={{ backgroundImage: `url(${post.image})` }}
                      />
                      <CardHeader>
                        <div className="flex items-center gap-2 mb-2">
                          {post.tags.slice(0, 1).map((tag) => (
                            <Badge key={tag} variant="secondary">{tag}</Badge>
                          ))}
                        </div>
                        <CardTitle className="text-lg hover:text-primary transition-colors">
                          <a href={`/blog/${post.id}`}>{post.title}</a>
                        </CardTitle>
                      </CardHeader>
                      <CardFooter className="text-xs text-muted-foreground">
                        <div className="flex items-center gap-4">
                          <div className="flex items-center gap-1">
                            <Calendar size={12} />
                            <span>{new Date(post.date).toLocaleDateString("en-US", { month: 'short', day: 'numeric' })}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Clock size={12} />
                            <span>{post.readTime} min</span>
                          </div>
                        </div>
                      </CardFooter>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="popular">
              <div className="text-center py-12 text-muted-foreground">
                Popular posts coming soon
              </div>
            </TabsContent>
            
            <TabsContent value="trending">
              <div className="text-center py-12 text-muted-foreground">
                Trending posts coming soon
              </div>
            </TabsContent>
          </Tabs>
          
          {filteredPosts.length === 0 && (
            <div className="text-center py-12 my-8">
              <h3 className="text-xl font-medium mb-2">No articles found</h3>
              <p className="text-muted-foreground">Try adjusting your search or filter criteria</p>
            </div>
          )}
          
          <div className="flex justify-center mt-12">
            <Button variant="outline" size="lg">
              Load More
            </Button>
          </div>
        </div>
      </div>
      <Footer />
    </AnimatedPage>
  );
};

export default BlogPage;
