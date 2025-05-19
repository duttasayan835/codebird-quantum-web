
import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Button from "@/components/atoms/Button";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar } from "@/components/ui/avatar";
import { Loader2, Send, Minimize2, Bot, BookOpen, Code, Sparkles } from "lucide-react";

interface Message {
  id: string;
  content: string;
  role: "user" | "assistant";
  timestamp: Date;
}

interface AIAssistantProps {
  initialPrompt?: string;
  apiKey?: string;
  onClose?: () => void;
}

const AIAssistant: React.FC<AIAssistantProps> = ({
  initialPrompt = "How can I help you today?",
  apiKey,
  onClose,
}) => {
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
  const [apiKeyInput, setApiKeyInput] = useState(apiKey || "");
  const [isSettingApiKey, setIsSettingApiKey] = useState(!apiKey);
  const [activeTab, setActiveTab] = useState<string>("chat");

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  // Auto-scroll to bottom of messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Focus input on mount
  useEffect(() => {
    if (!isSettingApiKey) {
      inputRef.current?.focus();
    }
  }, [isSettingApiKey]);

  const handleSendMessage = async () => {
    if (!input.trim() || isLoading || !apiKeyInput) return;

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

    try {
      // Here we would normally use a real AI service
      // Since this is a demo, we'll simulate a response
      await new Promise((resolve) => setTimeout(resolve, 1000));

      const mockResponse = getMockResponse(input);

      setMessages((prev) => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          content: mockResponse,
          role: "assistant",
          timestamp: new Date(),
        },
      ]);
    } catch (error) {
      console.error("Error calling AI service:", error);
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

  const getMockResponse = (query: string): string => {
    const normalizedQuery = query.toLowerCase();
    
    if (normalizedQuery.includes("hello") || normalizedQuery.includes("hi")) {
      return "Hello! I'm your Codebird assistant. How can I help you today?";
    }
    
    if (normalizedQuery.includes("event")) {
      return "Our next event is a Web3 Hackathon on June 15th. Would you like me to sign you up?";
    }
    
    if (normalizedQuery.includes("javascript") || normalizedQuery.includes("js")) {
      return "JavaScript is a versatile language! Here's a code snippet to get you started:\n\n```javascript\nconst greeting = 'Hello, Codebird!';\nconsole.log(greeting);\n```";
    }
    
    if (normalizedQuery.includes("join")) {
      return "To join the Codebird Club, visit our /join page and fill out the application form. We're always looking for passionate developers!";
    }
    
    if (normalizedQuery.includes("code") || normalizedQuery.includes("help")) {
      return "Need help with code? Our resources page has tutorials on React, Node.js, and more. Or you can ask me a specific coding question!";
    }

    return "I'm not sure I understand. Could you provide more details or rephrase your question?";
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const saveApiKey = () => {
    if (!apiKeyInput.trim()) return;
    // In a real app, we'd store this securely
    console.log("API Key saved:", apiKeyInput);
    setIsSettingApiKey(false);
  };

  // Preset recommendations based on user context
  const recommendations = [
    {
      title: "Web Development Roadmap",
      description: "A step-by-step guide to becoming a web developer",
      icon: <BookOpen className="h-5 w-5" />,
    },
    {
      title: "React Component Patterns",
      description: "Learn advanced component design in React",
      icon: <Code className="h-5 w-5" />,
    },
    {
      title: "Join our next hackathon",
      description: "Virtual event starting next weekend",
      icon: <Sparkles className="h-5 w-5" />,
    },
  ];

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

      {isSettingApiKey ? (
        <div className="p-4 space-y-4">
          <p className="text-sm text-muted-foreground">
            Please enter your Qwen3 API key to continue. You can get one from the Qwen3 dashboard.
          </p>
          <Textarea
            value={apiKeyInput}
            onChange={(e) => setApiKeyInput(e.target.value)}
            placeholder="Enter your API key..."
            className="resize-none"
            autoFocus
          />
          <Button onClick={saveApiKey} className="w-full">
            Save API Key
          </Button>
        </div>
      ) : (
        <>
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
                    <Card key={index} className="cursor-pointer hover:bg-accent/50 transition-colors">
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
        </>
      )}
    </motion.div>
  );
};

export default AIAssistant;
