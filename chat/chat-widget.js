// ODIADEV AI Chat Widget - Main Controller
// Orchestrates UI, speech recognition, and Groq API integration

import { CONFIG } from './config.js';
import { GroqClient } from './groq-client.js';
import { SpeechHandler } from './speech-handler.js';
import { COMPANY_KNOWLEDGE } from './company-knowledge.js';

export class ChatWidget {
  constructor() {
    this.isOpen = false;
    this.messages = [];
    this.initialized = false;

    if (!this.initElements()) {
      console.warn('ODIADEV Chat Widget: required DOM elements not found. Initialization skipped.');
      return;
    }

    this.groqClient = new GroqClient();
    this.speechHandler = new SpeechHandler();
    this.loadChatHistory();

    this.initialized = true;

    this.initEventListeners();
    this.initSpeechHandlers();
    console.log('ODIADEV Chat Widget initialized');
  }

  initElements() {
    // Get DOM elements
    this.widget = document.getElementById('chat-widget');
    this.fab = document.getElementById('chat-fab');
    this.window = document.getElementById('chat-window');
    this.closeBtn = document.getElementById('chat-close');
    this.messagesContainer = document.getElementById('chat-messages');
    this.inputField = document.getElementById('chat-widget-input');
    this.voiceBtn = document.getElementById('voice-input-btn');
    this.sendBtn = document.getElementById('chat-widget-send-btn');
    this.welcomeSection = document.getElementById('welcome-section');
    this.thinkingIndicator = document.getElementById('thinking-indicator');

    const missing = [];
    if (!this.widget) missing.push('chat-widget');
    if (!this.fab) missing.push('chat-fab');
    if (!this.window) missing.push('chat-window');
    if (!this.closeBtn) missing.push('chat-close');
    if (!this.messagesContainer) missing.push('chat-messages');
    if (!this.inputField) missing.push('chat-input');
    if (!this.voiceBtn) missing.push('voice-button');
    if (!this.sendBtn) missing.push('send-button');

    if (missing.length > 0) {
      console.warn('ODIADEV Chat Widget: missing DOM elements ->', missing.join(', '));
      return false;
    }

    return true;
  }

  initEventListeners() {
    // Toggle chat window
    this.fab.addEventListener('click', () => this.toggleChat());
    this.closeBtn.addEventListener('click', () => this.closeChat());

    // Send message
    this.sendBtn.addEventListener('click', () => this.sendMessage());
    
    // Enter key to send (Shift+Enter for new line)
    this.inputField.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        this.sendMessage();
      }
    });

    // Voice button
    this.voiceBtn.addEventListener('click', () => this.toggleVoice());

    // Suggested prompts
    document.querySelectorAll('.prompt-button').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const prompt = e.target.textContent;
        this.inputField.value = prompt;
        this.sendMessage();
      });
    });

    // Auto-resize textarea
    this.inputField.addEventListener('input', () => {
      this.inputField.style.height = 'auto';
      this.inputField.style.height = Math.min(this.inputField.scrollHeight, 120) + 'px';
    });

    // Close on Escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && this.isOpen) {
        this.closeChat();
      }
    });
  }

  initSpeechHandlers() {
    if (!this.speechHandler.isSupported()) {
      this.voiceBtn.style.display = 'none';
      return;
    }

    this.speechHandler.onResult = (transcript) => {
      this.inputField.value = transcript;
      // Auto-send after a short delay when speech is complete
      setTimeout(() => {
        if (this.inputField.value.trim()) {
          this.sendMessage();
        }
      }, 500);
    };

    this.speechHandler.onError = (error) => {
      console.error('Speech recognition error:', error);
      this.voiceBtn.classList.remove('recording');
      this.thinkingIndicator.textContent = 'Error: ' + error;
      setTimeout(() => {
        this.thinkingIndicator.style.display = 'none';
      }, 3000);
    };

    this.speechHandler.onStart = () => {
      this.voiceBtn.innerHTML = '🎤<span class="pulse"></span>';
      this.voiceBtn.classList.add('recording');
      this.thinkingIndicator.textContent = 'Listening...';
      this.thinkingIndicator.style.display = 'block';
      this.inputField.placeholder = 'Speak now...';
    };

    this.speechHandler.onEnd = () => {
      this.voiceBtn.innerHTML = '🎤';
      this.voiceBtn.classList.remove('recording');
      this.inputField.placeholder = 'Type your message...';
      this.thinkingIndicator.textContent = 'Processing...';
    };
  }

  toggleChat() {
    if (!this.initialized) return;
    if (this.isOpen) {
      this.closeChat();
    } else {
      this.openChat();
    }
  }

  openChat() {
    this.isOpen = true;
    this.window.classList.add('active');
    this.fab.classList.add('active');
    this.inputField.focus();

    // Show welcome message if no messages
    if (this.messages.length === 0) {
      this.showWelcomeMessage();
    }
  }

  closeChat() {
    this.isOpen = false;
    this.window.classList.remove('active');
    this.fab.classList.remove('active');
  }

  showWelcomeMessage() {
    // Welcome message is already in HTML, just ensure it's visible
    if (this.welcomeSection) {
      this.welcomeSection.style.display = 'block';
    }
  }

  hideWelcomeMessage() {
    if (this.welcomeSection) {
      this.welcomeSection.style.display = 'none';
    }
  }

  async sendMessage() {
    if (!this.initialized) return;
    const message = this.inputField.value.trim();
    if (!message) return;

    try {
      // Add user message to chat
      this.addMessage('user', message);
      this.inputField.value = '';
      this.inputField.style.height = 'auto';
      this.thinkingIndicator.style.display = 'none';

      // Show typing indicator
      this.showTypingIndicator();

      // Send to Groq API
      const response = await this.groqClient.sendMessage(message, this.messages);
      
      // Add bot response to chat
      this.hideTypingIndicator();
      if (response) {
        this.addMessage('assistant', response);
      }

      // Save chat history
      this.saveChatHistory();
      
    } catch (error) {
      console.error('Error sending message:', error);
      this.hideTypingIndicator();
      this.showError(error.message || 'Failed to get response. Please try again.');
    }
  }

  addMessage(role, content, isStreaming = false) {
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${role}`;
    
    const avatar = document.createElement('div');
    avatar.className = 'message-avatar';
    avatar.textContent = role === 'user' ? '👤' : '🤖';
    
    const contentDiv = document.createElement('div');
    contentDiv.className = 'message-content';
    
    const bubble = document.createElement('div');
    bubble.className = 'message-bubble';
    bubble.textContent = content;
    
    contentDiv.appendChild(bubble);
    messageDiv.appendChild(avatar);
    messageDiv.appendChild(contentDiv);
    
    this.messagesContainer.appendChild(messageDiv);
    this.scrollToBottom();

    // Store message
    if (!isStreaming) {
      this.messages.push({ role, content, timestamp: Date.now() });
    }

    return messageDiv;
  }

  updateMessage(messageElement, newContent) {
    const bubble = messageElement.querySelector('.message-bubble');
    if (bubble) {
      bubble.textContent = newContent;
      this.scrollToBottom();
    }
  }

  showTypingIndicator() {
    const indicator = document.createElement('div');
    indicator.id = 'typing-indicator';
    indicator.className = 'message bot';
    indicator.innerHTML = `
      <div class="message-avatar">🤖</div>
      <div class="message-content">
        <div class="typing-indicator">
          <div class="typing-dot"></div>
          <div class="typing-dot"></div>
          <div class="typing-dot"></div>
        </div>
      </div>
    `;
    this.messagesContainer.appendChild(indicator);
    this.scrollToBottom();
  }

  hideTypingIndicator() {
    const indicator = document.getElementById('typing-indicator');
    if (indicator) {
      indicator.remove();
    }
  }

  showError(message) {
    const errorDiv = document.createElement('div');
    errorDiv.className = 'error-message';
    errorDiv.innerHTML = `
      <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
      </svg>
      <span>${this.escapeHtml(message)}</span>
    `;
    this.messagesContainer.appendChild(errorDiv);
    this.scrollToBottom();

    // Auto-remove after 5 seconds
    setTimeout(() => errorDiv.remove(), 5000);
  }

  toggleVoice() {
    if (!this.initialized) return;
    if (!this.speechHandler.isSupported()) {
      this.showError('Speech recognition is not supported in your browser. Please use Chrome, Edge, or Safari.');
      return;
    }

    this.speechHandler.toggle();
  }

  scrollToBottom() {
    this.messagesContainer.scrollTop = this.messagesContainer.scrollHeight;
  }

  // Chat history persistence
  saveChatHistory() {
    if (!CONFIG.widget.persistHistory) return;

    try {
      localStorage.setItem('odiadev_chat_history', JSON.stringify(this.messages));
      localStorage.setItem('odiadev_groq_history', JSON.stringify(this.groqClient.getHistory()));
    } catch (error) {
      console.error('Failed to save chat history:', error);
    }
  }

  loadChatHistory() {
    if (!CONFIG.widget.persistHistory) return;

    try {
      const savedMessages = localStorage.getItem('odiadev_chat_history');
      const savedGroqHistory = localStorage.getItem('odiadev_groq_history');

      if (savedMessages) {
        this.messages = JSON.parse(savedMessages);
        
        // Restore messages to UI (limit to last 10 for performance)
        const recentMessages = this.messages.slice(-10);
        recentMessages.forEach(msg => {
          this.addMessage(msg.role, msg.content);
        });

        if (this.messages.length > 0) {
          this.hideWelcomeMessage();
        }
      }

      if (savedGroqHistory) {
        const history = JSON.parse(savedGroqHistory);
        history.forEach(msg => {
          this.groqClient.addMessage(msg.role, msg.content);
        });
      }
    } catch (error) {
      console.error('Failed to load chat history:', error);
    }
  }

  clearHistory() {
    this.messages = [];
    this.groqClient.clearHistory();
    this.messagesContainer.innerHTML = '';
    this.showWelcomeMessage();
    
    try {
      localStorage.removeItem('odiadev_chat_history');
      localStorage.removeItem('odiadev_groq_history');
    } catch (error) {
      console.error('Failed to clear chat history:', error);
    }
  }

  // Utility: Escape HTML to prevent XSS
  escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
  }
}

// Initialize chat widget when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    window.odiadevChat = new ChatWidget();
  });
} else {
  window.odiadevChat = new ChatWidget();
}
