
// OpenRouter API service for AI assistant functionality

const OPENROUTER_API_KEY = "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";
const SITE_URL = window.location.origin;
const SITE_NAME = "CodeBird Club";

export interface Message {
  role: "user" | "assistant" | "system";
  content: string;
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
        "messages": messages
      })
    });

    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }

    const data: ChatCompletionResponse = await response.json();
    return data.choices[0].message.content;
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
- If asked about sensitive information, politely decline and redirect to safer topics`;
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
