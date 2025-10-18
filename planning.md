# Chat Widget Implementation Plan

## Problem Statement
Create an intelligent chat widget for ODIADEV AI LTD website with:
- Speech-to-text functionality for voice input
- Real-time AI responses using Groq API
- Company knowledge base integration
- Modern, accessible UI matching the site's design

## Implementation Phases

### Phase 1: Core Chat Widget UI & Structure
**Objective**: Build the visual chat widget interface with toggle, message display, and input controls

**Tasks**:
1. Create chat widget HTML structure (floating button + chat window)
2. Style chat widget to match ODIADEV brand (blue/gold theme)
3. Implement open/close animations
4. Add message display area with user/bot message differentiation
5. Create input area with text input and voice button
6. Ensure mobile responsiveness

**Deliverables**:
- `chat-widget.css` - Styling for chat interface
- Updated `index.html` - Chat widget markup
- Basic toggle functionality in `script.js`

**Testing Criteria**:
- Widget opens/closes smoothly
- Responsive on mobile (320px+) and desktop
- Matches ODIADEV brand colors
- Accessible (keyboard navigation, ARIA labels)

---

### Phase 2: Speech-to-Text Integration
**Objective**: Implement browser-based speech recognition for voice input

**Tasks**:
1. Integrate Web Speech API (SpeechRecognition)
2. Create voice recording UI feedback (visual indicator)
3. Handle speech-to-text conversion
4. Add error handling for unsupported browsers
5. Implement start/stop recording controls
6. Display transcribed text in input field

**Deliverables**:
- `speech-handler.js` - Speech recognition logic
- Voice button with recording states (idle/recording/processing)
- Fallback message for unsupported browsers

**Testing Criteria**:
- Voice recording starts/stops on button click
- Transcribed text appears in input field
- Works on Chrome, Edge, Safari (WebKit)
- Graceful degradation for Firefox/unsupported browsers
- Visual feedback during recording

---

### Phase 3: Groq API Integration & Company Knowledge
**Objective**: Connect to Groq API for real-time AI responses with company context

**Tasks**:
1. Create `groq-client.js` for API communication
2. Implement secure API key handling (environment variable pattern)
3. Build company knowledge base context (from README, website content)
4. Create system prompt with ODIADEV company information
5. Implement streaming responses for real-time feel
6. Add typing indicators and loading states
7. Handle API errors and rate limits
8. Implement message history management

**Deliverables**:
- `groq-client.js` - Groq API integration
- `company-knowledge.js` - Company context data
- Message streaming UI
- Error handling and retry logic

**Testing Criteria**:
- API calls succeed with valid responses
- Company knowledge accurately reflected in responses
- Streaming responses display in real-time
- Error messages shown for API failures
- Rate limiting handled gracefully
- Chat history maintained during session

---

### Phase 4: Optimization & Polish
**Objective**: Refine performance, security, and user experience

**Tasks**:
1. Implement message persistence (localStorage)
2. Add chat history clear function
3. Optimize API calls (debouncing, caching)
4. Add analytics tracking (optional)
5. Implement copy-to-clipboard for messages
6. Add keyboard shortcuts (Esc to close, Enter to send)
7. Security audit (XSS prevention, API key protection)
8. Performance optimization (lazy loading, code splitting)
9. Add welcome message and suggested prompts
10. Implement dark mode support (if needed)

**Deliverables**:
- Optimized `chat-widget.js` bundle
- Security hardening
- Performance improvements
- Enhanced UX features

**Testing Criteria**:
- Chat history persists across page reloads
- No XSS vulnerabilities
- Fast load time (<100ms for widget appearance)
- Keyboard shortcuts work correctly
- Welcome message displays on first open
- All features work on 3G networks (Nigerian context)

---

## Technical Requirements

### APIs & Libraries
- **Groq API**: Real-time LLM inference
  - Endpoint: `https://api.groq.com/openai/v1/chat/completions`
  - API Key: Configured in `chat/config.js` (gitignored)
  - Model: `mixtral-8x7b-32768` or `llama-3.1-70b-versatile`
  
- **Web Speech API**: Browser-native speech recognition
  - `SpeechRecognition` or `webkitSpeechRecognition`
  - Language: `en-NG` (Nigerian English) with fallback to `en-US`

### Company Knowledge Base
Extract from:
- Company description: "Nigeria's Voice-AI Infrastructure Platform"
- Products: Adaqua AI (flagship), Cross AI, MISS Legal AI
- Team: Austyn Eguale (CEO), Peter Ntaji, Benjamin Nwoye
- Location: Lagos, Nigeria
- Contact: contact@odia.dev, sales@odia.dev
- Partnerships: Mudiame International University, Cross AI International, Intech Wealth Advisory AI

### Technology Stack
- **Frontend**: Vanilla JavaScript (ES6+)
- **Styling**: CSS3 with CSS variables (matching existing theme)
- **Storage**: localStorage for chat history
- **Network**: Fetch API for Groq requests
- **Speech**: Web Speech API

### Security Considerations
1. **API Key Protection**: 
   - Store in separate config file
   - Add to `.gitignore`
   - Use environment variables for production
   
2. **Input Sanitization**:
   - Escape HTML in user messages
   - Prevent XSS attacks
   
3. **Rate Limiting**:
   - Client-side throttling (max 1 request/second)
   - Queue management for multiple requests

### Performance Targets
- Widget load: <100ms
- API response: <2s (Groq is fast)
- Speech recognition: <1s latency
- Mobile-first: Works on 2G/3G networks

---

## Testing Criteria

### Unit Tests
- Speech recognition start/stop
- Message formatting and sanitization
- API request/response handling
- Error handling for network failures

### Integration Tests
- End-to-end chat flow (text input → API → response display)
- Voice input → transcription → API → response
- Chat history persistence
- Widget open/close with messages

### Acceptance Criteria
1. ✅ User can open chat widget from any page
2. ✅ User can type messages and receive AI responses
3. ✅ User can click voice button and speak their message
4. ✅ AI responses include accurate ODIADEV company information
5. ✅ Chat works on mobile devices (iOS Safari, Android Chrome)
6. ✅ Widget matches ODIADEV brand design
7. ✅ Chat history persists across page navigation
8. ✅ Graceful error handling for API/network failures
9. ✅ Accessible (WCAG 2.1 AA compliance)
10. ✅ Fast performance on slow networks

---

## File Structure

```
odiadev.web.2025-lunch/
├── index.html                 # Updated with chat widget markup
├── styles.css                 # Existing styles
├── chat-widget.css           # NEW: Chat widget styles
├── script.js                  # Updated with chat initialization
├── chat/
│   ├── chat-widget.js        # NEW: Main chat logic
│   ├── groq-client.js        # NEW: Groq API integration
│   ├── speech-handler.js     # NEW: Speech recognition
│   ├── company-knowledge.js  # NEW: Company context data
│   └── config.js             # NEW: Configuration (API keys)
├── .gitignore                # Updated to exclude config.js
└── planning.md               # This file
```

---

## Implementation Notes

### Why This Approach?
1. **Vanilla JS**: Matches existing tech stack, no build process needed
2. **Modular Structure**: Separate concerns for maintainability
3. **Progressive Enhancement**: Works without JS (fallback to contact form)
4. **Mobile-First**: Critical for Nigerian market (primary mobile users)
5. **Groq API**: Fast inference, cost-effective, good for real-time chat

### Potential Challenges
1. **Speech API Browser Support**: Limited on Firefox, older browsers
   - Solution: Graceful degradation, show text-only input
   
2. **API Key Security**: Exposed in client-side code
   - Solution: Move to serverless function (Vercel Edge Function) in production
   
3. **Nigerian Accent Recognition**: Web Speech API may not handle well
   - Solution: Use `en-NG` locale, provide text input alternative
   
4. **Network Reliability**: 2G/3G common in Nigeria
   - Solution: Retry logic, offline detection, loading states

### Future Enhancements (Post-MVP)
- WhatsApp integration (link to WhatsApp chat)
- Email transcript of conversation
- Multi-language support (Yoruba, Igbo, Hausa)
- Voice output (text-to-speech responses)
- Admin dashboard for chat analytics
- Integration with Adaqua AI platform

---

## Next Steps
1. Get approval on this plan
2. Begin Phase 1 implementation
3. Test each phase before moving to next
4. Deploy incrementally to production
