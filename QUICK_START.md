# 🚀 Quick Start Guide - ODIADEV Chat Widget

## ⚡ 60-Second Setup

### 1. Open Terminal
```bash
cd "/Users/odiadev/Desktop/odiadev ai ltd 2025/odiadev.web.2025-lunch"
```

### 2. Start Server
```bash
serve . -p 3000
```

### 3. Open Browser
Visit: **http://localhost:3000** (or the port shown in terminal)

### 4. Test Chat Widget
1. Look for **blue chat button** in bottom-right corner
2. Click to open chat window
3. Try: "Tell me about Adaqua AI"
4. Click **microphone button** to test voice input

---

## ✅ Verification Checklist

### Visual Check
- [ ] Blue chat button appears in bottom-right
- [ ] Button has smooth hover effect
- [ ] Clicking opens chat window with animation
- [ ] Header shows "ODIADEV AI Assistant"
- [ ] Welcome message displays
- [ ] 4 suggested prompts visible

### Functional Check
- [ ] Type message and press Enter → AI responds
- [ ] Click suggested prompt → Sends automatically
- [ ] Click microphone → Records voice (Chrome/Safari)
- [ ] Close and reopen → Messages persist
- [ ] Refresh page → Chat history remains

### Mobile Check
- [ ] Open DevTools (F12)
- [ ] Toggle device toolbar (Ctrl+Shift+M)
- [ ] Select iPhone/Android
- [ ] Chat adapts to mobile screen

---

## 🎯 Test These Questions

Try asking the AI:
1. **"Who is the CEO?"** → Should say Austyn Eguale
2. **"What is Adaqua AI?"** → Should explain flagship product
3. **"How do I contact sales?"** → Should give sales@odia.dev
4. **"Where are you located?"** → Should say Lagos, Nigeria
5. **"What services do you offer?"** → Should list voice AI services

---

## 📁 Project Structure

```
odiadev.web.2025-lunch/
├── 📄 index.html              ← Chat widget HTML added
├── 🎨 chat-widget.css         ← NEW: Widget styling
├── 📂 chat/                   ← NEW: Chat modules
│   ├── chat-widget.js         ← Main controller
│   ├── groq-client.js         ← API integration
│   ├── speech-handler.js      ← Voice input
│   ├── company-knowledge.js   ← Company data
│   └── config.js              ← Configuration (API key)
├── 📖 planning.md             ← Implementation plan
├── 📖 CHAT_WIDGET_README.md   ← Full documentation
├── 📖 TESTING_GUIDE.md        ← Test cases
├── 📖 IMPLEMENTATION_SUMMARY.md ← Project summary
├── 📖 ARCHITECTURE.md         ← System architecture
└── 📖 QUICK_START.md          ← This file
```

---

## 🔧 Configuration

### API Key (Already Set)
The Groq API key is configured in `chat/config.js`:
```javascript
apiKey: 'YOUR_GROQ_API_KEY_HERE'
```

**Note**: The actual API key is in `chat/config.js` (gitignored for security)

### Customization Options
Edit `chat/config.js` to customize:
- **Model**: Change AI model (default: mixtral-8x7b-32768)
- **Language**: Change speech language (default: en-NG)
- **Welcome Message**: Customize greeting
- **Suggested Prompts**: Add/edit quick questions

---

## 🎨 Styling

### Brand Colors (Already Matched)
- **Primary Blue**: `#1e3a8a` (ODIADEV blue)
- **Gold Accent**: `#d97706` (ODIADEV gold)

### Customize Appearance
Edit `chat-widget.css` to change:
- Colors, fonts, spacing
- Button size and position
- Animation speeds
- Mobile breakpoints

---

## 🐛 Troubleshooting

### Chat button not visible?
```bash
# Hard refresh browser
Ctrl + Shift + R (Windows/Linux)
Cmd + Shift + R (Mac)
```

### Voice button not working?
- Only works in **Chrome** and **Safari**
- Firefox not supported (shows error message)
- Must allow microphone permissions

### API errors?
- Check browser console (F12)
- Verify API key in `chat/config.js`
- Check internet connection

### Server won't start?
```bash
# Install serve globally
npm install -g serve

# Then try again
serve . -p 3000
```

---

## 📚 Documentation

### Quick Reference
- **CHAT_WIDGET_README.md** - Complete usage guide
- **TESTING_GUIDE.md** - Detailed test cases
- **ARCHITECTURE.md** - System design
- **planning.md** - Implementation phases

### Key Features
✅ Real-time AI chat (Groq API)  
✅ Speech-to-text (Web Speech API)  
✅ Company knowledge (products, team, services)  
✅ Chat history (localStorage)  
✅ Mobile responsive  
✅ Accessible (WCAG AA)  

---

## 🚀 Deployment

### Deploy to Production (Vercel)
```bash
# 1. Commit changes
git add .
git commit -m "Add chat widget"

# 2. Push to GitHub
git push origin main

# 3. Auto-deploys to Vercel
# Visit: https://odiadev-web-2025.vercel.app
```

### Manual Deploy
```bash
vercel --prod
```

---

## 📞 Support

### Need Help?
- **Email**: contact@odia.dev
- **Documentation**: See files above
- **Browser Console**: F12 for error messages

### Common Questions

**Q: Can I change the AI model?**  
A: Yes! Edit `chat/config.js` → `groq.model`

**Q: How do I add more company info?**  
A: Edit `chat/company-knowledge.js`

**Q: Can I customize the colors?**  
A: Yes! Edit `chat-widget.css` → `:root` variables

**Q: Is the API key secure?**  
A: For production, move to serverless function (see README)

---

## ✨ What's Next?

### Immediate
1. ✅ Test all features (use TESTING_GUIDE.md)
2. ✅ Deploy to production
3. ✅ Monitor for errors

### Future Enhancements
- [ ] WhatsApp integration
- [ ] Multi-language support (Yoruba, Igbo, Hausa)
- [ ] Voice output (text-to-speech)
- [ ] Admin dashboard
- [ ] Analytics tracking

---

## 🎉 You're Ready!

The chat widget is **fully functional** and ready to use. 

**Test it now**: http://localhost:3000

**Questions?** Check the documentation files or contact support.

---

**Built with ❤️ for ODIADEV AI LTD**
