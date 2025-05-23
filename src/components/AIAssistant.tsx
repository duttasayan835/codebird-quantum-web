import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Button from "@/components/atoms/Button";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar } from "@/components/ui/avatar";
import { Loader2, Send, Minimize2, Bot, Calendar, Users, School, Sparkles } from "lucide-react";
import { fetchChatCompletion, getSystemPrompt, getEnhancedEventsText, Message } from "@/services/openRouterService";
import { useToast } from "@/hooks/use-toast";

interface AIAssistantProps {
  initialPrompt?: string;
  onClose?: () => void;
}

// Typing effect component for rendering text gradually
const TypingEffect = ({ content }: { content: string }) => {
  const [displayText, setDisplayText] = useState("");
  const [isComplete, setIsComplete] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let currentIndex = 0;
    setDisplayText("");
    setIsComplete(false);
    
    // Choose between character-by-character or word-by-word animation
    const wordByWord = true; // Set to false for character-by-character
    
    if (wordByWord) {
      // Split by spaces but keep HTML tags intact
      const words = [];
      let inTag = false;
      let currentWord = "";
      
      for (let i = 0; i < content.length; i++) {
        const char = content[i];
        
        if (char === '<') inTag = true;
        if (char === '>') {
          inTag = false;
          currentWord += char;
          words.push(currentWord);
          currentWord = "";
          continue;
        }
        
        if (inTag) {
          currentWord += char;
        } else if (char === ' ') {
          words.push(currentWord + ' ');
          currentWord = "";
        } else {
          currentWord += char;
        }
      }
      
      if (currentWord) words.push(currentWord);
      
      const typeNextWord = (index: number) => {
        if (index >= words.length) {
          setIsComplete(true);
          return;
        }
        
        setDisplayText(prev => prev + words[index]);
        
        // Adjust typing speed based on word length and punctuation
        const delay = words[index].includes('.') || words[index].includes('!') || words[index].includes('?') 
          ? 300 // Longer pause after punctuation
          : Math.max(50, 100 - words[index].length * 5); // Shorter delay for longer words
          
        setTimeout(() => typeNextWord(index + 1), delay);
      };
      
      typeNextWord(0);
    } else {
      // Character-by-character animation
      const typeNextChar = () => {
        if (currentIndex >= content.length) {
          setIsComplete(true);
          return;
        }
        
        const nextChar = content[currentIndex];
        setDisplayText(prev => prev + nextChar);
        currentIndex++;
        
        // Adjust typing speed based on character
        const delay = ['.', '!', '?'].includes(nextChar) 
          ? 300 // Longer pause after punctuation
          : nextChar === ' ' ? 50 : 20; // Medium pause for spaces, fast for regular chars
          
        setTimeout(typeNextChar, delay);
      };
      
      typeNextChar();
    }
  }, [content]);

  useEffect(() => {
    if (containerRef.current && isComplete) {
      // Ensure all links inside the typed content are working
      const links = containerRef.current.querySelectorAll('a');
      links.forEach(link => {
        if (link.getAttribute('href')?.startsWith('/')) {
          link.onclick = (e) => {
            e.preventDefault();
            window.location.href = link.getAttribute('href') || '';
          };
        }
      });
    }
  }, [isComplete]);

  return (
    <div 
      ref={containerRef}
      className="whitespace-pre-wrap text-sm"
      dangerouslySetInnerHTML={{ __html: displayText }}
    />
  );
};

const AIAssistant: React.FC<AIAssistantProps> = ({
  initialPrompt = "How can I help you today?",
  onClose,
}) => {
  const { toast } = useToast();
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      content: initialPrompt,
      role: "assistant",
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState<string>("chat");
  const [showSuggestions, setShowSuggestions] = useState(true);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  // Auto-scroll to bottom of messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Focus input on mount
  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const handleSendMessage = async () => {
    if (!input.trim() || isLoading) return;

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      content: input,
      role: "user",
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);
    setShowSuggestions(false);

    try {
      // Format messages for the API, including system prompt
      const apiMessages: Message[] = [
        { role: "system", content: getSystemPrompt() },
        ...messages
          .filter((m) => m.id !== "welcome") // Skip initial welcome message
          .map(({ role, content }) => ({ role, content })),
        { role: "user", content: input }
      ];
      
      // Call OpenRouter API
      const response = await fetchChatCompletion(apiMessages);

      setMessages((prev) => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          content: response,
          role: "assistant",
          timestamp: new Date(),
          typingEffect: true,
        },
      ]);
    } catch (error) {
      console.error("Error calling AI service:", error);
      toast({
        title: "Error",
        description: "Sorry, I encountered an error. Please try again later.",
        variant: "destructive",
      });
      
      setMessages((prev) => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          content: "Sorry, I encountered an error. Please try again later.",
          role: "assistant",
          timestamp: new Date(),
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  // Common user queries for quick access with interactive content
  const suggestions = [
    "How do I sign up for CodeBird Club?",
    "What events are coming up?",
    "Tell me about learning resources",
    "Help me with React coding"
  ];

  const handleSuggestionClick = (suggestion: string) => {
    setInput(suggestion);
    inputRef.current?.focus();
  };

  // Enhanced recommendations with attractive visualizations and transitions
  const recommendations = [
    {
      title: "Upcoming Events & Workshops",
      description: "Discover our exciting hackathons & tech meetups",
      icon: <Calendar className="h-5 w-5" />,
      query: getEnhancedEventsText(),
      color: "bg-gradient-to-br from-blue-500/20 to-purple-500/20",
      link: "/events"
    },
    {
      title: "Learning Pathways",
      description: "Structured roadmaps for your coding journey",
      icon: <School className="h-5 w-5" />,
      query: "Show me CodeBird's learning resources",
      color: "bg-gradient-to-br from-amber-500/20 to-red-500/20",
      link: "/resources"
    },
    {
      title: "Community Projects",
      description: "Collaborate with other developers",
      icon: <Users className="h-5 w-5" />,
      query: "Tell me about open source projects",
      color: "bg-gradient-to-br from-green-500/20 to-emerald-500/20",
      link: "/projects/open-source"
    },
    {
      title: "AI-Powered Coding Help",
      description: "Get assistance with your programming questions",
      icon: <Sparkles className="h-5 w-5" />,
      query: "Help me understand React hooks",
      color: "bg-gradient-to-br from-pink-500/20 to-rose-500/20",
      link: "/resources/tutorials"
    },
  ];

  const handleRecommendationClick = (recommendation: typeof recommendations[0]) => {
    // First, set active tab to chat
    setActiveTab("chat");
    
    if (recommendation.link) {
      // Add AI message about navigation
      setMessages(prev => [
        ...prev,
        {
          id: Date.now().toString(),
          content: `I'll help you explore ${recommendation.title}. Let me guide you there...`,
          role: "assistant",
          timestamp: new Date(),
          typingEffect: true
        }
      ]);
      
      // Wait for the typing effect before redirecting
      setTimeout(() => {
        window.location.href = recommendation.link;
      }, 2000);
      
      return;
    }
    
    // If it's a query, handle as a message
    if (recommendation.query) {
      setInput(recommendation.query);
      setTimeout(() => {
        handleSendMessage();
      }, 100);
    }
  };

  return (
    <motion.div
      className="fixed bottom-6 right-6 z-50 w-80 md:w-96 rounded-lg shadow-xl bg-card border border-border overflow-hidden"
      initial={{ opacity: 0, y: 20, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 20, scale: 0.9 }}
      transition={{ duration: 0.2 }}
    >
      {/* Header */}
      <div className="p-4 bg-primary text-primary-foreground flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Bot size={20} />
          <h3 className="font-medium">Codebird Assistant</h3>
        </div>
        <Button
          variant="ghost"
          size="icon"
          onClick={onClose}
          className="h-7 w-7 text-primary-foreground/90 hover:text-primary-foreground hover:bg-primary/80"
        >
          <Minimize2 size={16} />
        </Button>
      </div>

      <Tabs defaultValue="chat" value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="w-full">
          <TabsTrigger value="chat" className="flex-1">Chat</TabsTrigger>
          <TabsTrigger value="recommendations" className="flex-1">Discover</TabsTrigger>
        </TabsList>

        {/* Chat Tab */}
        <AnimatePresence mode="wait">
          {activeTab === "chat" && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.15 }}
            >
              <div className="h-80 overflow-y-auto p-4 space-y-4">
                {messages.map((msg) => (
                  <div
                    key={msg.id}
                    className={`flex ${
                      msg.role === "assistant" ? "justify-start" : "justify-end"
                    }`}
                  >
                    {msg.role === "assistant" && (
                      <Avatar className="h-8 w-8 mr-2">
                        <div className="bg-primary text-primary-foreground rounded-full w-full h-full flex items-center justify-center">
                          <Bot size={14} />
                        </div>
                      </Avatar>
                    )}
                    <motion.div
                      className={`max-w-[80%] p-3 rounded-lg ${
                        msg.role === "assistant"
                          ? "bg-secondary text-secondary-foreground"
                          : "bg-primary text-primary-foreground"
                      }`}
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      transition={{ duration: 0.3 }}
                    >
                      {msg.typingEffect ? (
                        <TypingEffect content={msg.content} />
                      ) : (
                        <div 
                          className="whitespace-pre-wrap text-sm"
                          dangerouslySetInnerHTML={{ __html: msg.content }}
                        />
                      )}
                    </motion.div>
                  </div>
                ))}
                <div ref={messagesEndRef} />
                
                {/* Quick suggestions */}
                {showSuggestions && messages.length === 1 && (
                  <div className="mt-4">
                    <div className="text-xs text-muted-foreground mb-2">Try asking:</div>
                    <div className="flex flex-wrap gap-2">
                      {suggestions.map((suggestion, idx) => (
                        <motion.button
                          key={idx}
                          onClick={() => handleSuggestionClick(suggestion)}
                          className="text-xs bg-secondary/50 hover:bg-secondary text-secondary-foreground px-2 py-1 rounded-full transition-colors"
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          {suggestion}
                        </motion.button>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <div className="p-4 border-t">
                <div className="flex gap-2">
                  <Textarea
                    ref={inputRef}
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder="Type your message..."
                    className="resize-none"
                    rows={1}
                  />
                  <Button
                    onClick={handleSendMessage}
                    disabled={isLoading || !input.trim()}
                    size="icon"
                  >
                    {isLoading ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                      <Send className="h-4 w-4" />
                    )}
                  </Button>
                </div>
              </div>
            </motion.div>
          )}

          {/* Recommendations Tab */}
          {activeTab === "recommendations" && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.15 }}
              className="p-4 space-y-3 h-[340px] overflow-y-auto"
            >
              <div className="grid grid-cols-1 gap-4">
                {recommendations.map((rec, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ 
                      opacity: 1, 
                      y: 0, 
                      transition: { delay: index * 0.1 } 
                    }}
                    whileHover={{ 
                      scale: 1.03,
                      boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)"
                    }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Card 
                      className={`cursor-pointer transition-all duration-300 ${rec.color} border-none overflow-hidden`}
                      onClick={() => handleRecommendationClick(rec)}
                    >
                      <CardContent className="p-4 flex items-center gap-4 relative">
                        {/* Animated background effect */}
                        <motion.div 
                          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent"
                          animate={{ 
                            x: ["100%", "-100%"]
                          }}
                          transition={{ 
                            repeat: Infinity,
                            duration: 2,
                            ease: "linear"
                          }}
                        />
                        
                        <div className="bg-primary/20 p-3 rounded-full text-primary relative z-10">
                          {rec.icon}
                        </div>
                        <div className="flex-1 relative z-10">
                          <h4 className="font-medium text-base">{rec.title}</h4>
                          <p className="text-xs text-muted-foreground mt-1">{rec.description}</p>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </Tabs>
    </motion.div>
  );
};

export default AIAssistant;
