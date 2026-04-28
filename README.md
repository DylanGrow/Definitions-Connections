# Network Terminology Connections PWA 🌐

A Progressive Web App for learning networking terminology through an interactive Connections-style game. Terms are organized by OSI layers.

**[Live Demo]** (Deploy to your hosting)

---

## 📋 Features

✅ **Interactive Connections Game**
- 4x4 grid of networking terms
- Group terms by OSI layer (1-7)
- 4 mistakes before game over
- Streak tracking (persists in localStorage)

✅ **Mobile-First Design**
- Beautiful dark theme with accent colors per OSI layer
- Touch-optimized controls (44px+ buttons)
- Responsive grid layout
- Zero Cumulative Layout Shift (CLS)

✅ **PWA Capabilities**
- Install to home screen (iOS, Android, desktop)
- Works offline after first load
- Service worker caching
- App icons and splash screens

✅ **Game Features**
- Hint system (reveal category names)
- Shuffle button for remaining terms
- Smooth animations and feedback
- Win/lose states with statistics

---

## 🚀 Quick Start

### 1. **Deploy Files**

You have 5 files to deploy:

```
.
├── index.html              # Main app (complete, no build needed)
├── manifest.json           # PWA metadata
├── service-worker.js       # Offline caching
├── game-component.jsx      # Standalone React component (optional)
├── RECREATION_PROMPT.md    # How to recreate this
└── sample-database.json    # Template for your terms database
```

### 2. **Simple Deployment Options**

#### Option A: Netlify (Recommended - Free, Easy)
```bash
# 1. Drag & drop files to Netlify
# 2. Deploy
# 3. Done!
```
→ Visit https://your-site.netlify.app  
→ Click "Install" in browser menu

#### Option B: GitHub Pages
```bash
git clone your-repo
git add .
git commit -m "Deploy Connections PWA"
git push origin main
```
Enable "Pages" in GitHub Settings → Deploy from main branch

#### Option C: Vercel (Free, Fast)
```bash
# 1. Import your repo
# 2. Deploy (settings auto-detected)
# 3. Done!
```

#### Option D: Self-Hosted (Node, Python, any static server)
```bash
# Node (anywhere)
npx http-server .

# Python 3
python -m http.server 8000

# Docker
docker run -p 8000:80 -v $(pwd):/usr/share/nginx/html nginx
```

### 3. **Verify PWA Installation**

- **Desktop (Chrome/Edge):** Address bar → "Install" button
- **iPhone:** Safari → Share → Add to Home Screen
- **Android:** Chrome menu (3 dots) → "Install app"

---

## 📊 Data Structure: JSON Format

Your terms database should follow this structure:

```json
{
  "terms": [
    {
      "id": "tcp",
      "term": "TCP",
      "osiLayer": 4,
      "category": "Layer 4: Transport",
      "description": "Transmission Control Protocol - connection-oriented",
      "difficulty": 1
    },
    {
      "id": "udp",
      "term": "UDP",
      "osiLayer": 4,
      "category": "Layer 4: Transport",
      "description": "User Datagram Protocol - connectionless",
      "difficulty": 1
    }
  ]
}
```

### JSON Field Definitions

| Field | Type | Required | Notes |
|-------|------|----------|-------|
| `id` | string | ✅ | Unique identifier (lowercase, no spaces) |
| `term` | string | ✅ | Display name (e.g., "TCP", "MAC Address") |
| `osiLayer` | number | ✅ | 1-7 (Layer number) |
| `category` | string | ✅ | "Layer X: Description" format |
| `description` | string | ❌ | Optional explanation (for future features) |
| `difficulty` | number | ❌ | 1-3 (for future difficulty selection) |

### OSI Layers Reference

```
Layer 1: Physical         (cables, signals, hubs, repeaters)
Layer 2: Data Link        (MAC, switches, bridges, frames)
Layer 3: Network          (IP, routers, routing, ICMP)
Layer 4: Transport        (TCP, UDP, ports, SCTP)
Layer 5: Session          (session management, RPC)
Layer 6: Presentation     (encryption, compression, SSL/TLS)
Layer 7: Application      (HTTP, DNS, SMTP, FTP, SSH)
```

See **sample-database.json** for a complete example.

---

## 🎮 Game Rules

**Objective:** Group 4 terms into 1 category (same OSI layer)

**How to Play:**
1. Click 4 terms you think belong together
2. Click "Submit" button
3. ✅ Correct → Category reveals, 4 new terms appear
4. ❌ Wrong → Mistakes decrease (4 strikes = game over)
5. ⚠️ One Away → 3 of 4 are correct (no mistake deducted)

**Controls:**
- **Select:** Tap/click a term
- **Deselect:** Tap/click selected term again
- **Submit:** Click "Submit" button
- **Shuffle:** Reshuffle remaining terms
- **Hint:** Reveal next category name (3 uses)
- **New Game:** Start fresh game

**Winning:** Solve all 4 categories = streak +1

---

## 🛠 Customization

### Change Terms Database

**Edit `index.html` (find this section):**

```javascript
const NETWORKING_TERMS = [
    { id: 'tcp', term: 'TCP', osiLayer: 4, category: 'Layer 4: Transport', difficulty: 1 },
    // Add your terms here
];
```

Replace with your JSON data from `sample-database.json`.

### Change Colors

**Edit `LAYER_COLORS` in `index.html`:**

```javascript
const LAYER_COLORS = {
    1: { bg: 'bg-purple-600', accent: 'bg-purple-500', light: 'bg-purple-100', text: 'text-purple-900' },
    // Change bg, accent, light, text to any Tailwind colors
};
```

### Change Title & Description

**Edit `<title>` and metadata in `index.html`:**

```html
<title>Your App Name</title>
<meta name="description" content="Your custom description">
```

### Update PWA Icons

**Edit `manifest.json` and `<link rel="apple-touch-icon">` in `index.html`:**

Generate SVG icons, update icon URLs in manifest.

---

## 📱 Mobile Optimization

Already built-in:
- ✅ Viewport meta tags for responsive design
- ✅ Safe area padding for notched devices
- ✅ 44px+ buttons for touch
- ✅ No Cumulative Layout Shift
- ✅ Dark theme reduces blue light

To further customize:
- Adjust `padding-safe` in Tailwind config
- Change `theme-color` in manifest.json
- Modify grid columns: `grid-cols-4 → grid-cols-2 sm:grid-cols-4`

---

## 🔌 API Integration (Future)

### Cloudflare Workers + Llama Setup

**When you're ready to add AI:**

1. Deploy Cloudflare Worker:
```javascript
export default {
  async fetch(request) {
    const response = await fetch('https://api.llama.ai/...', {
      method: 'POST',
      body: JSON.stringify({ prompt: '...' })
    });
    return response;
  }
};
```

2. Update `index.html` to call your Worker:
```javascript
const gameData = await fetch('https://your-worker.com/generate-game').then(r => r.json());
```

3. Parse LLM response and generate game dynamically

See **RECREATION_PROMPT.md** for detailed API instructions.

---

## 📊 localStorage Keys

The app uses these localStorage keys (auto-managed):

```javascript
localStorage.getItem('connectionStreak')    // Current streak (number)
localStorage.getItem('connectionGameState') // Current game state (JSON)
```

To reset (in DevTools console):
```javascript
localStorage.clear();
location.reload();
```

---

## 🧪 Testing Checklist

- [ ] All 4 categories validate correctly
- [ ] Mistakes counter decrements
- [ ] Game over after 4 mistakes
- [ ] Streak persists on reload
- [ ] Responsive on mobile (portrait + landscape)
- [ ] No layout shift (Lighthouse CLS < 0.1)
- [ ] PWA installable
- [ ] Service worker active (DevTools → Application → Service Workers)
- [ ] Works offline (DevTools → Network → Offline)
- [ ] Touch controls work smoothly
- [ ] Hint system limits to 3 uses

---

## 🐛 Troubleshooting

### PWA Won't Install
- **Fix 1:** Check manifest.json is served (DevTools → Application → Manifest)
- **Fix 2:** Ensure HTTPS (required for PWA, except localhost)
- **Fix 3:** Check service worker registered (DevTools → Service Workers)

### Service Worker Issues
- Check browser console for errors
- Clear cache: DevTools → Application → Clear site data
- Re-register: `navigator.serviceWorker.getRegistrations().then(r => r.forEach(rr => rr.unregister()))`

### Game Logic Not Working
- Check browser console (F12) for JavaScript errors
- Verify NETWORKING_TERMS array is defined
- Check React is loaded from CDN

### Offline Not Working
- Verify service-worker.js is deployed
- Check DevTools → Network → Offline
- Service worker takes ~30 seconds to activate

---

## 📈 Stats & Analytics (Optional)

To track gameplay (Google Analytics example):

```javascript
// Add to index.html before </body>
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'GA_ID');
  
  // Track game wins
  function trackWin() {
    gtag('event', 'game_win', { streak });
  }
</script>
```

---

## 📚 Resources

- **Tailwind CSS:** https://tailwindcss.com
- **MDN OSI Model:** https://developer.mozilla.org/en-US/docs/Glossary/OSI
- **PWA Basics:** https://web.dev/progressive-web-apps/
- **Service Workers:** https://developer.mozilla.org/en-US/docs/Web/API/Service_Worker_API
- **React Hooks:** https://react.dev/reference/react

---

## 🤝 Contributing

Want to add features?

**Suggested Enhancements:**
- 🎯 Difficulty levels (beginner/intermediate/expert)
- 📊 Stats dashboard (games played, win rate, accuracy)
- 🏆 Leaderboard (compare with friends)
- 🌍 Multi-language support
- 🔊 Sound effects (Tone.js)
- 🎨 Custom themes/skins

---

## 📄 License

Free to use, modify, and distribute. No attribution required.

---

## 🚀 Deployment Checklist

Before going live:

- [ ] Update `NETWORKING_TERMS` with your data
- [ ] Update `manifest.json` (title, description, icons)
- [ ] Update `index.html` (title, meta tags)
- [ ] Test on mobile (iOS + Android)
- [ ] Test offline mode
- [ ] Enable HTTPS
- [ ] Set up custom domain (optional)
- [ ] Test PWA installation
- [ ] Run Lighthouse audit (target 90+)
- [ ] Monitor service worker in production

---

## 💬 Questions?

Refer to:
- **RECREATION_PROMPT.md** – Complete rebuild instructions
- **sample-database.json** – Data format examples
- Browser DevTools → Console for errors

---

**Happy learning! 🎓**
