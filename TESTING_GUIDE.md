# Chat Widget Testing Guide

## Quick Start Testing

### 1. Start Development Server
```bash
cd /Users/odiadev/Desktop/odiadev\ ai\ ltd\ 2025/odiadev.web.2025-lunch
serve . -p 3000
```

### 2. Open Browser
Visit: `http://localhost:3000` (or the port shown)

### 3. Test Chat Widget

#### Visual Check
- [ ] Blue chat button appears in bottom-right corner
- [ ] Button has chat icon and smooth hover effect
- [ ] Clicking button opens chat window with smooth animation

#### Text Chat Test
1. Click the chat button
2. See welcome message and suggested prompts
3. Click "Tell me about Adaqua AI" or type a message
4. Press Enter or click Send button
5. **Expected**: Typing indicator appears, then AI responds with company info

#### Voice Input Test
1. Click the microphone button (next to send button)
2. Allow microphone permissions if prompted
3. Speak: "What is Cross AI?"
4. Click microphone again to stop
5. **Expected**: Text appears in input field, then send to get response

#### Mobile Responsive Test
1. Open browser DevTools (F12)
2. Toggle device toolbar (Ctrl+Shift+M)
3. Select iPhone or Android device
4. **Expected**: Chat widget adapts to mobile screen

## Detailed Test Cases

### Test 1: Chat Window UI
**Steps**:
1. Click chat button
2. Verify header shows "ODIADEV AI Assistant"
3. Verify welcome message displays
4. Verify 4 suggested prompts are visible
5. Click X button to close
6. **Expected**: Window closes smoothly

**Status**: ⬜ Pass / ⬜ Fail

---

### Test 2: Text Message Flow
**Steps**:
1. Open chat
2. Type: "Tell me about your products"
3. Press Enter
4. **Expected**: 
   - Message appears on right side (blue bubble)
   - Typing indicator shows (3 dots)
   - AI response appears on left side (white bubble)
   - Response mentions Adaqua AI, Cross AI, MISS Legal AI

**Status**: ⬜ Pass / ⬜ Fail

---

### Test 3: Suggested Prompts
**Steps**:
1. Open chat (fresh, no messages)
2. Click "What is Cross AI?"
3. **Expected**:
   - Prompt text appears in input
   - Message sends automatically
   - AI explains Cross AI emergency response system

**Status**: ⬜ Pass / ⬜ Fail

---

### Test 4: Voice Recognition (Chrome/Safari only)
**Steps**:
1. Open chat
2. Click microphone button
3. Button turns red with pulse animation
4. Speak: "How can I contact your team?"
5. Click microphone again
6. **Expected**:
   - Transcribed text appears in input field
   - Can edit text before sending
   - Send button works normally

**Status**: ⬜ Pass / ⬜ Fail

---

### Test 5: Streaming Responses
**Steps**:
1. Send message: "Tell me everything about ODIADEV"
2. Watch response appear
3. **Expected**:
   - Response appears word-by-word (streaming)
   - No delay between typing indicator and response
   - Full response includes company info

**Status**: ⬜ Pass / ⬜ Fail

---

### Test 6: Chat History Persistence
**Steps**:
1. Send 2-3 messages
2. Close chat window
3. Refresh page (F5)
4. Open chat again
5. **Expected**:
   - Previous messages are still visible
   - Can continue conversation
   - AI remembers context

**Status**: ⬜ Pass / ⬜ Fail

---

### Test 7: Error Handling
**Steps**:
1. Disconnect internet (or use DevTools offline mode)
2. Send a message
3. **Expected**:
   - Error message appears in red box
   - Error explains network issue
   - Can retry when back online

**Status**: ⬜ Pass / ⬜ Fail

---

### Test 8: Keyboard Shortcuts
**Steps**:
1. Open chat
2. Type message
3. Press Enter (not Shift+Enter)
4. **Expected**: Message sends
5. Press Escape key
6. **Expected**: Chat closes

**Status**: ⬜ Pass / ⬜ Fail

---

### Test 9: Mobile Responsiveness
**Steps**:
1. Open on mobile device or DevTools mobile view
2. Click chat button
3. **Expected**:
   - Chat takes full width minus margins
   - Input area accessible above keyboard
   - All buttons are touch-friendly (44px min)
   - Scrolling works smoothly

**Status**: ⬜ Pass / ⬜ Fail

---

### Test 10: Company Knowledge Accuracy
**Test Questions**:
1. "Who is the CEO?" → Should mention Austyn Eguale
2. "What is Adaqua AI?" → Should explain flagship product
3. "How do I contact sales?" → Should give sales@odia.dev
4. "What partnerships do you have?" → Should mention Mudiame University
5. "Where are you located?" → Should say Lagos, Nigeria

**Status**: ⬜ Pass / ⬜ Fail

---

## Browser Compatibility

### Desktop
- [ ] Chrome (Latest) - Full support
- [ ] Safari (Latest) - Full support
- [ ] Firefox (Latest) - Text only (no voice)
- [ ] Edge (Latest) - Full support

### Mobile
- [ ] iOS Safari (14.5+) - Full support
- [ ] Chrome Android - Full support
- [ ] Samsung Internet - Text only

## Performance Checks

### Load Time
- [ ] Chat button appears < 1 second
- [ ] Opening chat < 300ms animation
- [ ] First API response < 3 seconds

### Network Conditions
Test on slow 3G (DevTools → Network → Slow 3G):
- [ ] Chat still loads
- [ ] Messages send (may be slower)
- [ ] Error handling works

## Known Issues & Limitations

### Voice Recognition
- ❌ Not supported in Firefox (shows error message)
- ⚠️ Requires HTTPS in production (not localhost)
- ⚠️ Nigerian accent may not be perfectly recognized

### API Key Security
- ⚠️ API key exposed in client code (OK for demo)
- 🔒 For production: Move to serverless function

### Rate Limiting
- ⚠️ Client-side only (1 request/second)
- 🔒 For production: Add server-side limits

## Troubleshooting

### Chat button not visible
**Check**:
1. Browser console for errors
2. `chat-widget.css` loaded (Network tab)
3. No CSS conflicts with main site

**Fix**: Hard refresh (Ctrl+Shift+R)

---

### Voice button not working
**Check**:
1. Browser supports Web Speech API (Chrome/Safari)
2. Microphone permissions granted
3. Using HTTPS (required in production)

**Fix**: Use text input as fallback

---

### API errors
**Check**:
1. API key in `chat/config.js` is correct
2. Groq API status: https://status.groq.com
3. Network connection active
4. Browser console for error details

**Fix**: Verify API key, check rate limits

---

### Messages not persisting
**Check**:
1. localStorage enabled in browser
2. Not in private/incognito mode
3. Browser console for storage errors

**Fix**: Enable localStorage or disable persistence in config

---

## Success Criteria

✅ **Minimum Viable Product (MVP)**:
- [x] Chat widget appears and opens/closes
- [x] Text messages send and receive AI responses
- [x] Voice input transcribes to text
- [x] AI provides accurate company information
- [x] Mobile responsive design
- [x] Chat history persists

✅ **Production Ready**:
- [ ] All test cases pass
- [ ] Tested on 3+ browsers
- [ ] Tested on mobile devices
- [ ] API key moved to serverless function
- [ ] Error handling verified
- [ ] Performance optimized

## Next Steps After Testing

1. **If tests pass**: Deploy to production (Vercel)
2. **If tests fail**: Check console errors, review code
3. **Optimization**: Move API key to serverless function
4. **Enhancement**: Add analytics, multi-language support

## Contact for Support
- **Developer**: Nnamdi Okeke
- **Email**: contact@odia.dev
- **Docs**: See `CHAT_WIDGET_README.md` and `planning.md`
