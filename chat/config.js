// Chat Widget Configuration
// WARNING: In production, move API key to serverless function (Vercel Edge Function)
// This is exposed in client-side code - use environment variables for production

export const CONFIG = {
  // Groq API Configuration
  groq: {
    apiKey: (window.__ODIADEV_CHAT_CONFIG__ && window.__ODIADEV_CHAT_CONFIG__.apiKey) || 'YOUR_GROQ_API_KEY_HERE',
    apiUrl: 'https://api.groq.com/openai/v1/chat/completions',
    model: 'mixtral-8x7b-32768', // Fast and capable model
    maxTokens: 1024,
    temperature: 0.7,
    streamingEnabled: true
  },

  // Speech Recognition Configuration
  speech: {
    language: 'en-NG', // Nigerian English
    fallbackLanguage: 'en-US',
    continuous: false,
    interimResults: true,
    maxAlternatives: 1
  },

  // Chat Widget Settings
  widget: {
    position: 'bottom-right', // bottom-right, bottom-left
    welcomeMessage: "Hi! I'm ODIADEV AI Assistant. Ask me anything about our voice-AI solutions, products, or team!",
    suggestedPrompts: [
      "Tell me about Adaqua AI",
      "What is Cross AI?",
      "How can I contact your team?",
      "What services do you offer?"
    ],
    maxHistoryLength: 50,
    persistHistory: true,
    showTimestamps: false
  },

  // Rate Limiting
  rateLimiting: {
    maxRequestsPerMinute: 20,
    requestDelay: 1000 // ms between requests
  }
};
