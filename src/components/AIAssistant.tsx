import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Button from "@/components/atoms/Button";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar } from "@/components/ui/avatar";
import { Loader2, Send, Minimize2, Bot, BookOpen, Code, Sparkles, Calendar, Users, School } from "lucide-react";
import { fetchChatCompletion, getSystemPrompt, detectIntent, Message } from "@/services/openRouterService";
import { useToast } from "@/hooks/use-toast";
import { Link } from "react-router-dom";

interface AIAssistantProps {
  initialPrompt?: string;
  onClose?: () => void;
}

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

  // Enhanced text with interactive links
  const getEnhancedEventsText = () => {
    return `✨ Check out the CodeBird Club **[Events page](/events)** on our website for the latest schedule of workshops, hackathons, and coding challenges! If you're a member, event updates are also posted in your **[dashboard](/profile)** and featured in our weekly newsletter. For real-time notifications, follow our [@CodeBirdClub](https://twitter.com/codebirdclub) social media handles or chat with a mentor! Let me know if you need help finding anything specific. 🐦💻`;
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

  // Improved recommendations with attractive visualizations and transitions
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
    if (recommendation.link) {
      // If there's a direct link, add a message about navigating
      setMessages(prev => [
        ...prev,
        {
          id: Date.now().toString(),
          content: `I'll take you to ${recommendation.title}. Just a moment...`,
          role: "assistant",
          timestamp: new Date()
        }
      ]);
      
      // Wait a moment before redirecting
      setTimeout(() => {
        window.location.href = recommendation.link;
      }, 1000);
      
      return;
    }
    
    // Otherwise handle as a query
    setInput(recommendation.query);
    setActiveTab("chat");
    setTimeout(() => {
      handleSendMessage();
    }, 100);
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
                    <div
                      className={`max-w-[80%] p-3 rounded-lg ${
                        msg.role === "assistant"
                          ? "bg-secondary text-secondary-foreground"
                          : "bg-primary text-primary-foreground"
                      }`}
                    >
                      <div 
                        className="whitespace-pre-wrap text-sm"
                        dangerouslySetInnerHTML={{ 
                          __html: msg.content
                            .replace(/\*\*\[(.*?)\]\((\/.*?)\)\*\*/g, '<a href="$2" class="font-bold text-primary hover:underline">$1</a>')
                            .replace(/\[(.*?)\]\((\/.*?)\)/g, '<a href="$2" class="text-primary hover:underline">$1</a>')
                            .replace(/\[(.*?)\]\((https?:\/\/.*?)\)/g, '<a href="$2" target="_blank" rel="noopener noreferrer" class="text-primary hover:underline">$1</a>')
                            .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
                        }}
                      />
                    </div>
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
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Card 
                      className={`cursor-pointer hover:shadow-md transition-all duration-300 ${rec.color} border-none`}
                      onClick={() => handleRecommendationClick(rec)}
                    >
                      <CardContent className="p-4 flex items-center gap-4">
                        <div className="bg-primary/20 p-3 rounded-full text-primary">
                          {rec.icon}
                        </div>
                        <div className="flex-1">
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
