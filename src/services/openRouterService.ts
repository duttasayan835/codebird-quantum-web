
// OpenRouter API service for AI assistant functionality

const OPENROUTER_API_KEY = "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";
const SITE_URL = window.location.origin;
const SITE_NAME = "CodeBird Club";

export interface Message {
  role: "user" | "assistant" | "system";
  content: string;
  id?: string;
  timestamp?: Date;
  typingEffect?: boolean;
}

export interface ChatCompletionResponse {
  id: string;
  choices: {
    message: {
      role: string;
      content: string;
    };
    finish_reason: string;
  }[];
}

// Pre-process the text to convert markdown to HTML
export const processMarkdownText = (text: string): string => {
  return text
    // Convert markdown headings to styled elements
    .replace(/^###\s+(.*?)$/gm, '<h3 class="text-primary font-bold text-lg mt-4 mb-2">$1</h3>')
    .replace(/^##\s+(.*?)$/gm, '<h2 class="text-primary font-bold text-xl mt-5 mb-3">$1</h2>')
    .replace(/^#\s+(.*?)$/gm, '<h1 class="text-primary font-bold text-2xl mt-6 mb-4">$1</h1>')
    
    // Convert code blocks
    .replace(/```(\w*)\n([\s\S]*?)\n```/g, '<div class="bg-muted/30 p-3 rounded-md my-3 font-mono text-sm overflow-x-auto">$2</div>')
    
    // Convert inline code
    .replace(/`([^`]+)`/g, '<code class="bg-muted/30 px-1 py-0.5 rounded text-accent-foreground font-mono text-sm">$1</code>')
    
    // Convert bold
    .replace(/\*\*(.*?)\*\*/g, '<strong class="font-bold">$1</strong>')
    
    // Convert italic
    .replace(/\*(.*?)\*/g, '<em class="italic">$1</em>')
    
    // Convert lists
    .replace(/^(\d+)\.\s+(.*?)$/gm, '<div class="flex gap-2 my-1"><span class="text-primary font-medium">$1.</span><span>$2</span></div>')
    .replace(/^-\s+(.*?)$/gm, '<div class="flex gap-2 my-1"><span class="text-primary">•</span><span>$1</span></div>')
    
    // Convert links (including special format for internal routes)
    .replace(/\[(.*?)\]\((\/.*?)\)/g, '<a href="$2" class="text-primary underline hover:text-primary/80 transition-colors">$1</a>')
    .replace(/\[(.*?)\]\((https?:\/\/.*?)\)/g, '<a href="$2" target="_blank" rel="noopener noreferrer" class="text-primary underline hover:text-primary/80 transition-colors">$1</a>')
    
    // Add paragraph spacing
    .replace(/\n\n/g, '<div class="my-3"></div>');
};

export const fetchChatCompletion = async (messages: Message[]): Promise<string> => {
  try {
    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${OPENROUTER_API_KEY}`,
        "HTTP-Referer": SITE_URL,
        "X-Title": SITE_NAME,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        "model": "qwen/qwen3-32b:free",
        "messages": messages.map(({ role, content }) => ({ role, content }))
      })
    });

    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }

    const data: ChatCompletionResponse = await response.json();
    return processMarkdownText(data.choices[0].message.content);
  } catch (error) {
    console.error("Error fetching chat completion:", error);
    return "Sorry, I encountered an error. Please try again later.";
  }
};

// Prepare helpful responses about website navigation and CodeBird Club information
export const getSystemPrompt = (): string => {
  return `You are the CodeBird Club AI assistant. Help users with:
- Website navigation: explain how to use features from login/signup to accessing different pages
- Information about CodeBird Club events, resources, and membership
- Programming help and guidance on web development, coding practices, and technical skills
- Keep responses concise, friendly and helpful
- For better readability and engagement:
  - Use proper headings with # or ## for section titles
  - Use **bold** for emphasis on important points
  - Format code with \`inline code\` or \`\`\`code blocks\`\`\`
  - Use [text](/route) for internal links (use / prefix) and [text](https://example.com) for external links
  - Use emojis where appropriate to make your responses friendly 😊
- If asked about events, always mention they can visit /events page or check their profile dashboard
- If asked about sensitive information, politely decline and redirect to safer topics
- Make your responses visually engaging by using proper formatting and structure`;
};

// Function to detect user intent for better responses
export const detectIntent = (input: string): string => {
  const lowercaseInput = input.toLowerCase();
  
  if (lowercaseInput.includes('login') || lowercaseInput.includes('sign') || lowercaseInput.includes('account')) {
    return 'auth';
  } else if (lowercaseInput.includes('event') || lowercaseInput.includes('workshop') || lowercaseInput.includes('meetup')) {
    return 'events';
  } else if (lowercaseInput.includes('resource') || lowercaseInput.includes('learn') || lowercaseInput.includes('tutorial')) {
    return 'resources';
  }
  
  return 'general';
};

// Enhanced text with interactive links for events
export const getEnhancedEventsText = (): string => {
  return `✨ Check out the CodeBird Club [Events page](/events) on our website for the latest schedule of workshops, hackathons, and coding challenges! If you're a member, event updates are also posted in your [dashboard](/profile) and featured in our weekly newsletter. For real-time notifications, follow our [@CodeBirdClub](https://twitter.com/codebirdclub) social media handles or chat with a mentor! Let me know if you need help finding anything specific. 🐦💻`;
};
