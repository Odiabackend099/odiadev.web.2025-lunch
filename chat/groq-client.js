// Groq API Client for ODIADEV Chat Widget
// Handles real-time AI responses with streaming support

import { CONFIG } from './config.js';
import { generateSystemPrompt } from './company-knowledge.js';

export class GroqClient {
  constructor() {
    this.apiKey = CONFIG.groq.apiKey;
    this.apiUrl = CONFIG.groq.apiUrl;
    this.model = CONFIG.groq.model;
    this.conversationHistory = [];
    this.systemPrompt = generateSystemPrompt();
    this.lastRequestTime = 0;
  }

  // Rate limiting check
  canMakeRequest() {
    const now = Date.now();
    const timeSinceLastRequest = now - this.lastRequestTime;
    
    if (timeSinceLastRequest < CONFIG.rateLimiting.requestDelay) {
      return false;
    }
    
    return true;
  }

  // Add message to conversation history
  addMessage(role, content) {
    this.conversationHistory.push({ role, content });
    
    // Limit history length
    if (this.conversationHistory.length > CONFIG.widget.maxHistoryLength) {
      // Keep system message and trim old messages
      this.conversationHistory = [
        this.conversationHistory[0],
        ...this.conversationHistory.slice(-CONFIG.widget.maxHistoryLength + 1)
      ];
    }
  }

  // Send message and get response
  async sendMessage(userMessage, onChunk = null) {
    // Rate limiting
    if (!this.canMakeRequest()) {
      throw new Error('Please wait a moment before sending another message');
    }

    this.lastRequestTime = Date.now();

    // Add user message to history
    this.addMessage('user', userMessage);

    // Prepare messages for API
    const messages = [
      { role: 'system', content: this.systemPrompt },
      ...this.conversationHistory
    ];

    try {
      const response = await fetch(this.apiUrl, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${this.apiKey}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          model: this.model,
          messages: messages,
          max_tokens: CONFIG.groq.maxTokens,
          temperature: CONFIG.groq.temperature,
          stream: CONFIG.groq.streamingEnabled
        })
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error?.message || `API error: ${response.status}`);
      }

      // Handle streaming response
      if (CONFIG.groq.streamingEnabled) {
        return await this.handleStreamingResponse(response, onChunk);
      } else {
        return await this.handleNonStreamingResponse(response);
      }
    } catch (error) {
      console.error('Groq API error:', error);
      throw error;
    }
  }

  // Handle streaming response
  async handleStreamingResponse(response, onChunk) {
    const reader = response.body.getReader();
    const decoder = new TextDecoder();
    let fullResponse = '';

    try {
      while (true) {
        const { done, value } = await reader.read();
        
        if (done) break;

        const chunk = decoder.decode(value);
        const lines = chunk.split('\n');

        for (const line of lines) {
          if (line.startsWith('data: ')) {
            const data = line.slice(6);
            
            if (data === '[DONE]') {
              break;
            }

            try {
              const parsed = JSON.parse(data);
              const content = parsed.choices?.[0]?.delta?.content;
              
              if (content) {
                fullResponse += content;
                if (onChunk) {
                  onChunk(content, fullResponse);
                }
              }
            } catch (e) {
              // Skip invalid JSON
              continue;
            }
          }
        }
      }

      // Add assistant response to history
      this.addMessage('assistant', fullResponse);
      
      return fullResponse;
    } catch (error) {
      console.error('Streaming error:', error);
      throw error;
    }
  }

  // Handle non-streaming response
  async handleNonStreamingResponse(response) {
    const data = await response.json();
    const assistantMessage = data.choices?.[0]?.message?.content || '';
    
    // Add assistant response to history
    this.addMessage('assistant', assistantMessage);
    
    return assistantMessage;
  }

  // Clear conversation history
  clearHistory() {
    this.conversationHistory = [];
  }

  // Get conversation history
  getHistory() {
    return this.conversationHistory;
  }

  // Set custom system prompt (optional)
  setSystemPrompt(prompt) {
    this.systemPrompt = prompt;
  }
}
