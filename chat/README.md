# Chat Widget API Key Setup

## Problem
The chat widget was returning "invalid API key" errors because the API key needs to be configured locally but cannot be committed to Git for security reasons.

## Solution
The API key is now stored in `config.local.js` which is gitignored.

## Setup Instructions

### Local Development
The file `config.local.js` already exists with your API key and is ready to use.

**File location**: `/chat/config.local.js`

**Content**:
```javascript
window.__ODIADEV_CHAT_CONFIG__ = {
  apiKey: 'YOUR_GROQ_API_KEY_HERE'
};
```

**Note**: The actual file on your local machine already has the correct API key.

### How It Works
1. `index.html` loads `config.local.js` first
2. This sets `window.__ODIADEV_CHAT_CONFIG__.apiKey`
3. `config.js` reads from this global variable
4. If not found, falls back to placeholder (which will fail)

### For Production (Vercel)
For production deployment, you have two options:

#### Option 1: Environment Variable in Vercel
1. Go to Vercel dashboard → Your project → Settings → Environment Variables
2. Add: `GROQ_API_KEY` = `your_actual_groq_api_key_here`
3. Create `/api/chat.js` serverless function:

```javascript
export default async function handler(req, res) {
  const { message, history } = req.body;
  
  const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${process.env.GROQ_API_KEY}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      model: 'mixtral-8x7b-32768',
      messages: history,
      stream: true
    })
  });
  
  return response;
}
```

4. Update `groq-client.js` to call `/api/chat` instead of Groq directly

#### Option 2: Inject via Vercel Build
Add to `vercel.json`:
```json
{
  "build": {
    "env": {
      "GROQ_API_KEY": "@groq-api-key"
    }
  }
}
```

Then create build script to inject the key.

## Files

- **`config.js`** - Main config (committed to Git, no secrets)
- **`config.local.js`** - Local API key (gitignored, NOT committed)
- **`config.template.js`** - Template for documentation

## Security Notes

✅ **Local**: API key in `config.local.js` (gitignored)  
✅ **Git**: No API key committed  
⚠️ **Production**: Should use serverless function (recommended)  
⚠️ **Current**: API key exposed in browser (OK for demo/testing)  

## Troubleshooting

### "Invalid API key" error
- Check that `chat/config.local.js` exists
- Verify the API key is correct
- Check browser console for the actual key being used
- Refresh the page to reload the config

### File not found
- Ensure you're running from project root
- Check file path: `/chat/config.local.js`
- Verify file is not gitignored accidentally

### Still not working
Open browser console and check:
```javascript
console.log(window.__ODIADEV_CHAT_CONFIG__);
```

Should output:
```javascript
{ apiKey: "your_actual_api_key_here" }
```

## Quick Test

1. Open `http://localhost:3000` (or your dev server)
2. Open browser console (F12)
3. Type: `window.__ODIADEV_CHAT_CONFIG__`
4. Should see your API key
5. Click chat button and send a message
6. Should get AI response

---

**Status**: ✅ Fixed - API key now loaded from local file  
**Committed**: Config structure only, no secrets  
**Next**: Consider serverless function for production
