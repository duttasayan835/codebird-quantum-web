
import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Button from "@/components/atoms/Button";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar } from "@/components/ui/avatar";
import { Loader2, Send, Minimize2, Bot, BookOpen, Code, Sparkles } from "lucide-react";
import { fetchChatCompletion, getSystemPrompt, detectIntent, Message } from "@/services/openRouterService";
import { useToast } from "@/hooks/use-toast";

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

  // Common user queries for quick access
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

  // Preset recommendations based on user context
  const recommendations = [
    {
      title: "Web Development Roadmap",
      description: "A step-by-step guide to becoming a web developer",
      icon: <BookOpen className="h-5 w-5" />,
      query: "Show me a web development roadmap"
    },
    {
      title: "React Component Patterns",
      description: "Learn advanced component design in React",
      icon: <Code className="h-5 w-5" />,
      query: "Explain React component patterns"
    },
    {
      title: "Join our next hackathon",
      description: "Virtual event starting next weekend",
      icon: <Sparkles className="h-5 w-5" />,
      query: "Tell me about the next hackathon"
    },
  ];

  const handleRecommendationClick = (query: string) => {
    setInput(query);
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
          <TabsTrigger value="recommendations" className="flex-1">Recommendations</TabsTrigger>
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
                      <div className="whitespace-pre-wrap text-sm">{msg.content}</div>
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
                        <button
                          key={idx}
                          onClick={() => handleSuggestionClick(suggestion)}
                          className="text-xs bg-secondary/50 hover:bg-secondary text-secondary-foreground px-2 py-1 rounded-full transition-colors"
                        >
                          {suggestion}
                        </button>
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
              className="p-4 space-y-3"
            >
              {recommendations.map((rec, index) => (
                <Card 
                  key={index} 
                  className="cursor-pointer hover:bg-accent/50 transition-colors"
                  onClick={() => handleRecommendationClick(rec.query)}
                >
                  <CardContent className="p-3 flex items-center gap-3">
                    <div className="bg-primary/10 p-2 rounded-full text-primary">
                      {rec.icon}
                    </div>
                    <div className="flex-1">
                      <h4 className="font-medium text-sm">{rec.title}</h4>
                      <p className="text-xs text-muted-foreground">{rec.description}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </Tabs>
    </motion.div>
  );
};

export default AIAssistant;
