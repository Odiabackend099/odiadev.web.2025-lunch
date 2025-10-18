# Chat Widget Architecture

## System Overview

```
┌─────────────────────────────────────────────────────────────────┐
│                     ODIADEV Website (index.html)                │
│                                                                 │
│  ┌─────────────────────────────────────────────────────────┐  │
│  │                    Chat Widget UI                        │  │
│  │  ┌──────────┐  ┌────────────────┐  ┌──────────────┐   │  │
│  │  │   FAB    │  │  Chat Window   │  │   Messages   │   │  │
│  │  │  Button  │  │   (Header)     │  │   Container  │   │  │
│  │  └──────────┘  └────────────────┘  └──────────────┘   │  │
│  │                                                          │  │
│  │  ┌──────────────────────────────────────────────────┐  │  │
│  │  │           Input Area                             │  │  │
│  │  │  [Text Input] [🎤 Voice] [➤ Send]              │  │  │
│  │  └──────────────────────────────────────────────────┘  │  │
│  └─────────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│                   Chat Widget Controller                        │
│                    (chat-widget.js)                             │
│                                                                 │
│  • Manages UI state (open/close)                               │
│  • Handles user interactions                                    │
│  • Coordinates speech & API modules                             │
│  • Manages message history                                      │
│  • Persists chat to localStorage                                │
└─────────────────────────────────────────────────────────────────┘
           │                    │                    │
           ▼                    ▼                    ▼
┌──────────────────┐  ┌──────────────────┐  ┌──────────────────┐
│  Speech Handler  │  │   Groq Client    │  │ Company Knowledge│
│ (speech-handler) │  │  (groq-client)   │  │ (company-know.)  │
│                  │  │                  │  │                  │
│ • Web Speech API │  │ • API requests   │  │ • Products info  │
│ • Voice-to-text  │  │ • Streaming      │  │ • Team details   │
│ • Error handling │  │ • History mgmt   │  │ • Services list  │
│ • Browser check  │  │ • Rate limiting  │  │ • System prompt  │
└──────────────────┘  └──────────────────┘  └──────────────────┘
           │                    │
           │                    ▼
           │          ┌──────────────────┐
           │          │   Groq API       │
           │          │ (External Service)│
           │          │                  │
           │          │ • Mixtral-8x7b   │
           │          │ • Streaming resp │
           │          │ • Real-time AI   │
           │          └──────────────────┘
           │
           ▼
┌──────────────────────────────────┐
│   Browser Web Speech API         │
│   (Native Browser Feature)       │
│                                  │
│   • Speech Recognition           │
│   • Microphone Access            │
│   • Transcription                │
└──────────────────────────────────┘
```

---

## Component Architecture

### 1. Chat Widget Controller (`chat-widget.js`)
**Responsibility**: Main orchestrator

```javascript
ChatWidget
├── initElements()          // Get DOM references
├── initEventListeners()    // Setup UI events
├── initSpeechHandlers()    // Connect speech callbacks
├── toggleChat()            // Open/close window
├── sendMessage()           // Handle message sending
├── addMessage()            // Add message to UI
├── showTypingIndicator()   // Show AI thinking
├── saveChatHistory()       // Persist to localStorage
└── loadChatHistory()       // Restore from localStorage
```

**Dependencies**:
- GroqClient (API communication)
- SpeechHandler (voice input)
- COMPANY_KNOWLEDGE (context data)

---

### 2. Groq Client (`groq-client.js`)
**Responsibility**: API communication

```javascript
GroqClient
├── sendMessage()              // Send to Groq API
├── handleStreamingResponse()  // Process streaming data
├── addMessage()               // Add to conversation history
├── canMakeRequest()           // Rate limiting check
├── clearHistory()             // Reset conversation
└── getHistory()               // Get conversation array
```

**Features**:
- Streaming responses (real-time)
- Conversation history management
- Rate limiting (1 req/sec)
- Error handling

---

### 3. Speech Handler (`speech-handler.js`)
**Responsibility**: Voice input

```javascript
SpeechHandler
├── initRecognition()    // Setup Web Speech API
├── start()              // Start recording
├── stop()               // Stop recording
├── toggle()             // Start/stop toggle
├── isSupported()        // Check browser support
└── setCallbacks()       // onResult, onError, onStart, onEnd
```

**Features**:
- Nigerian English support (`en-NG`)
- Real-time transcription
- Error handling
- Browser compatibility check

---

### 4. Company Knowledge (`company-knowledge.js`)
**Responsibility**: Context data

```javascript
COMPANY_KNOWLEDGE
├── company              // Name, location, mission
├── products             // Adaqua AI, Cross AI, MISS Legal AI
├── team                 // CEO, directors
├── partnerships         // Universities, partners
├── contact              // Email, phone, location
├── services             // Service offerings
├── differentiators      // Unique selling points
└── faqs                 // Common questions

generateSystemPrompt()   // Create AI system prompt
```

---

### 5. Configuration (`config.js`)
**Responsibility**: Settings

```javascript
CONFIG
├── groq                 // API key, model, settings
├── speech               // Language, recognition settings
├── widget               // UI preferences
└── rateLimiting         // Request throttling
```

---

## Data Flow

### Text Message Flow
```
User types message
       │
       ▼
ChatWidget.sendMessage()
       │
       ├─► Add user message to UI
       │
       ├─► Show typing indicator
       │
       ▼
GroqClient.sendMessage()
       │
       ├─► Add to conversation history
       │
       ├─► Send to Groq API (with system prompt)
       │
       ▼
Groq API processes (streaming)
       │
       ├─► Chunk 1: "ODIADEV"
       ├─► Chunk 2: " AI is"
       ├─► Chunk 3: " Nigeria's..."
       │
       ▼
ChatWidget receives chunks
       │
       ├─► Update message in real-time
       │
       ▼
Complete response displayed
       │
       ├─► Save to localStorage
       │
       ▼
Ready for next message
```

---

### Voice Message Flow
```
User clicks microphone button
       │
       ▼
SpeechHandler.start()
       │
       ├─► Request microphone permission
       │
       ├─► Start Web Speech API
       │
       ├─► Show recording indicator (red pulse)
       │
       ▼
User speaks: "What is Adaqua AI?"
       │
       ▼
Web Speech API transcribes
       │
       ├─► Interim results (real-time)
       ├─► Final result
       │
       ▼
SpeechHandler.onResult()
       │
       ├─► Pass transcript to ChatWidget
       │
       ▼
ChatWidget receives text
       │
       ├─► Fill input field
       │
       ├─► User can edit or send
       │
       ▼
User clicks send
       │
       ▼
[Follow Text Message Flow]
```

---

## Storage Architecture

### LocalStorage Structure
```javascript
// Chat messages
localStorage['odiadev_chat_history'] = [
  { role: 'user', content: 'Hello', timestamp: 1234567890 },
  { role: 'assistant', content: 'Hi! How can I help?', timestamp: 1234567891 }
]

// Groq conversation history (for context)
localStorage['odiadev_groq_history'] = [
  { role: 'user', content: 'Hello' },
  { role: 'assistant', content: 'Hi! How can I help?' }
]
```

**Persistence Strategy**:
- Save after each message
- Load on widget initialization
- Limit to 50 messages (configurable)
- Clear on user request

---

## API Integration

### Groq API Request
```javascript
POST https://api.groq.com/openai/v1/chat/completions

Headers:
  Authorization: Bearer YOUR_GROQ_API_KEY_HERE
  Content-Type: application/json

Body:
{
  "model": "mixtral-8x7b-32768",
  "messages": [
    { "role": "system", "content": "You are an AI assistant for ODIADEV AI LTD..." },
    { "role": "user", "content": "Tell me about Adaqua AI" }
  ],
  "max_tokens": 1024,
  "temperature": 0.7,
  "stream": true
}
```

### Streaming Response
```javascript
// Server-Sent Events format
data: {"choices":[{"delta":{"content":"ODIADEV"}}]}
data: {"choices":[{"delta":{"content":" AI"}}]}
data: {"choices":[{"delta":{"content":" is"}}]}
...
data: [DONE]
```

---

## Security Architecture

### Current (Development)
```
Browser → Groq API (direct)
         ↑
    API Key exposed in client code
```

### Recommended (Production)
```
Browser → Vercel Edge Function → Groq API
         ↑                      ↑
    No API key            API key in env variable
```

**Implementation**:
```javascript
// /api/chat.js (Vercel Edge Function)
export default async function handler(req, res) {
  const { message, history } = req.body;
  
  // Server-side API call
  const response = await fetch('https://api.groq.com/...', {
    headers: {
      'Authorization': `Bearer ${process.env.GROQ_API_KEY}`
    },
    body: JSON.stringify({ messages: history })
  });
  
  return res.json(await response.json());
}
```

---

## Error Handling

### Error Flow
```
Error occurs (network, API, speech)
       │
       ▼
Component catches error
       │
       ├─► SpeechHandler → onError callback
       ├─► GroqClient → throw error
       │
       ▼
ChatWidget.catch()
       │
       ├─► Hide typing indicator
       │
       ├─► Show error message (red box)
       │
       ├─► Log to console
       │
       ▼
User can retry
```

### Error Types Handled
1. **Network errors** - "Please check your connection"
2. **API errors** - "Failed to get response"
3. **Speech errors** - "Microphone not available"
4. **Rate limiting** - "Please wait before sending"
5. **Browser support** - "Feature not supported"

---

## Performance Optimizations

### 1. Lazy Loading
- Widget HTML always in DOM
- JavaScript loads as ES6 module
- CSS loads separately (non-blocking)

### 2. Streaming
- No waiting for full response
- Progressive rendering
- Better perceived performance

### 3. Caching
- LocalStorage for history
- No repeated API calls for same context

### 4. Debouncing
- 1 second between API requests
- Prevents spam

### 5. Mobile Optimization
- Minimal CSS payload
- Touch-friendly targets (44px)
- Works on 2G/3G networks

---

## Browser Compatibility Matrix

| Feature              | Chrome | Safari | Firefox | Edge |
|---------------------|--------|--------|---------|------|
| Text Chat           | ✅     | ✅     | ✅      | ✅   |
| Voice Input         | ✅     | ✅     | ❌      | ✅   |
| Streaming           | ✅     | ✅     | ✅      | ✅   |
| LocalStorage        | ✅     | ✅     | ✅      | ✅   |
| ES6 Modules         | ✅     | ✅     | ✅      | ✅   |
| CSS Grid/Flexbox    | ✅     | ✅     | ✅      | ✅   |

---

## Deployment Architecture

### Development
```
Local Machine
├── serve . -p 3000
└── http://localhost:3000
```

### Production (Vercel)
```
GitHub Repository
       │
       ▼
Vercel Auto-Deploy
       │
       ├─► Build (none needed - static)
       ├─► Deploy to CDN
       ├─► Edge Functions (optional)
       │
       ▼
https://odia.dev
```

---

## Module Dependencies

```
chat-widget.js
├── config.js
├── groq-client.js
│   └── config.js
│   └── company-knowledge.js
├── speech-handler.js
│   └── config.js
└── company-knowledge.js
```

**No external dependencies** - Pure vanilla JavaScript!

---

## File Size Analysis

| File                    | Size    | Purpose                |
|------------------------|---------|------------------------|
| chat-widget.css        | ~15 KB  | Styling                |
| chat-widget.js         | ~12 KB  | Main controller        |
| groq-client.js         | ~5 KB   | API integration        |
| speech-handler.js      | ~4 KB   | Voice input            |
| company-knowledge.js   | ~6 KB   | Context data           |
| config.js              | ~1 KB   | Configuration          |
| **Total**              | **~43 KB** | **Uncompressed**    |

**Gzipped**: ~12 KB (estimated)

---

## Scalability Considerations

### Current Capacity
- ✅ Handles 1000s of concurrent users
- ✅ No server-side state
- ✅ CDN-distributed (Vercel)

### Future Scaling
- Add Redis for session management
- Implement WebSocket for real-time updates
- Add load balancing for API calls
- Implement message queue for high traffic

---

## Monitoring & Analytics (Future)

### Metrics to Track
- Chat open rate
- Messages per session
- Voice vs text usage
- Response time
- Error rate
- User satisfaction

### Tools
- Google Analytics events
- Vercel Analytics
- Custom dashboard (future)

---

**Architecture designed for scalability, maintainability, and performance.**
