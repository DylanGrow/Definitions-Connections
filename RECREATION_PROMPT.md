# Network Terminology Connections PWA - Complete Recreation Prompt

## Project Overview
Build an offline-capable PWA (Progressive Web App) that teaches networking terminology through a Connections-style game (like NY Times Connections). Terms are grouped by **OSI Layer** (Physical, Data Link, Network, Transport, Session, Presentation, Application).

---

## Core Requirements

### 1. **Technology Stack**
- **Framework**: React (single .jsx artifact)
- **Styling**: Tailwind CSS only (no custom CSS except for animations)
- **Fonts**: Inter (primary), monospace fallback for code terms
- **Libraries**: lucide-react (icons), recharts (optional for stats)
- **PWA**: manifest.json + service-worker.js
- **No external APIs** - all game logic frontend-only (AI integration can be added later)

### 2. **Data Structure (JSON Array)**
```javascript
// Sample structure for your database
const networkTermsDB = [
  {
    id: "tcp",
    term: "TCP",
    osiLayer: 4, // Transport
    category: "Connection Protocols",
    description: "Transmission Control Protocol - connection-oriented",
    difficulty: 1
  },
  {
    id: "udp",
    term: "UDP",
    osiLayer: 4, // Transport
    category: "Connection Protocols",
    description: "User Datagram Protocol - connectionless",
    difficulty: 1
  },
  // ... more terms
];

// OSI Layers mapping:
// Layer 1: Physical (cables, signals, hubs)
// Layer 2: Data Link (MAC, switches, frames)
// Layer 3: Network (IP, routers, packets)
// Layer 4: Transport (TCP, UDP, ports)
// Layer 5: Session (session management, RPC)
// Layer 6: Presentation (encryption, compression)
// Layer 7: Application (HTTP, DNS, SMTP)
```

### 3. **Game Mechanics (Connections Rules)**
- **4x4 Grid** of 16 networking terms (shuffled each game)
- **4 Categories** of 4 terms each (each category = 1 OSI Layer or concept group)
- **Click to Select** - tap terms, highlight selected (max 4)
- **Submit Guess** - "Submit" button when 4 terms selected
- **Feedback**:
  - ✅ Correct = terms remove, show category name + color
  - ❌ Wrong = shake animation, counter decrements (4 mistakes = game over)
  - ⚠️ One away = "One away" message if 3/4 correct
- **Deselect** - click selected term to unselect
- **Shuffle** - reshuffle remaining terms
- **Hint System** - reveal one category (limited uses)
- **Streak Tracking** - track consecutive wins (localStorage)

### 4. **UI/UX Requirements**

#### Mobile-First Design
- Touch-optimized buttons (min 44px)
- Responsive grid (4 cols on desktop, 2-4 on mobile depending on screen)
- No Cumulative Layout Shift (CLS)
- Safe area padding for notched devices

#### Visual Hierarchy
- **Header**: Game title, stats (streak, mistakes remaining)
- **Grid Area**: 4x4 grid of term cards (clickable)
- **Controls**: Submit, Shuffle, Hint, New Game buttons
- **Footer**: Score, completed categories

#### Design Aesthetic
**Tech-forward network visualization theme:**
- Dark background: `#0f172a` (slate-900)
- Accent colors per OSI layer:
  - Layer 1-2: Purple (`#a78bfa`)
  - Layer 3-4: Cyan (`#06b6d4`)
  - Layer 5-6: Green (`#10b981`)
  - Layer 7: Amber (`#f59e0b`)
- Unselected cards: `#1e293b` (slate-800)
- Selected cards: Bright accent color with glow effect
- Correct category reveal: Full color saturation, white text
- Animations: Smooth 300ms transitions, shake effect on wrong guess

### 5. **Game Flow**
1. **Load** → Fetch 16 random terms from DB, organize into 4 categories
2. **Display** → Shuffle and render 4x4 grid
3. **Play** → Player selects terms, submits guesses
4. **Win State** → All 4 categories solved → Show completion message → "New Game" button
5. **Lose State** → 4 mistakes made → Show game over → Allow retry
6. **Persistence** → Save streak, high score to localStorage

### 6. **PWA Features**
- **Install Button** → "Add to Home Screen" prompt
- **Offline Support** → Service worker caches app shell + data
- **Manifest.json** → App metadata, icons, theme colors
- **Service Worker** → Network-first for online, cache-first fallback
- **App Icons** → SVG icons (192px, 512px) with network node visualization

### 7. **Data Format for Your Database**
Provide terms as JSON with this structure:
```javascript
{
  "id": "unique-id",
  "term": "TCP",
  "osiLayer": 4,
  "category": "Connection Protocols",
  "description": "Connection-oriented transport protocol",
  "difficulty": 1-3
}
```

---

## Sample Game Data (Starter Set)

**Layer 1 (Physical):** Hub, Repeater, Ethernet, Cable  
**Layer 2 (Data Link):** Switch, MAC Address, Frame, ARP  
**Layer 3 (Network):** Router, IP Address, ICMP, BGP  
**Layer 4 (Transport):** TCP, UDP, Port, SCTP  
**Layer 5+ (Upper):** DNS, HTTP, HTTPS, SMTP, SSL/TLS, Session, Gateway  

---

## Code Structure

```
App (main component)
├── Header (title, stats, streak)
├── GameBoard
│   ├── Grid (4x4 cards)
│   ├── Card (term, selection state)
│   ├── SelectedTerms (display selected 4)
│   └── CategoryRevealed (show completed category)
├── Controls
│   ├── SubmitButton
│   ├── ShuffleButton
│   ├── HintButton
│   └── NewGameButton
├── GameState (React Context or useState)
│   ├── terms (16 current terms)
│   ├── selected (selected term IDs)
│   ├── solved (completed categories)
│   ├── mistakes (remaining guesses)
│   ├── streak (consecutive wins)
│   └── gameOver (bool)
└── localStorage hooks
    ├── saveStreak()
    ├── loadStreak()
    ├── saveGameState()
    └── loadGameState()
```

---

## Key Features to Implement

✅ **Game Logic**
- Category validation (check if 4 selected terms match 1 category)
- Shuffle algorithm (randomize grid without duplicates)
- Mistake counting (4 strikes = game over)
- Streak tracking

✅ **UI Interactions**
- Click-to-select term cards
- Visual feedback (highlight, glow, animation)
- Shake animation on wrong guess
- Smooth category reveal on correct guess
- Loading state for new game

✅ **Accessibility**
- ARIA labels for cards
- Keyboard support (arrow keys, Enter to submit)
- High contrast colors
- Touch-friendly button sizes

✅ **Performance**
- No layout shifts (fixed grid dimensions)
- CSS animations only (no JS animations)
- Lazy load (optional): defer non-critical images

✅ **PWA**
- Add-to-home-screen prompt (or automatic)
- Works offline after first load
- Persists game progress (localStorage)
- Installable on iOS, Android, desktop

---

## Files to Create

1. **index.jsx** (or artifact.jsx) - React app
2. **manifest.json** - PWA metadata
3. **service-worker.js** - Offline caching
4. **styles.css** (optional) - any custom animations not in Tailwind

---

## Color Palette (Tailwind)

```
Background: slate-950 (#03020e)
Card bg: slate-800 (#1e293b)
Card border: slate-700 (#334155)
Selected: accent color with glow
Correct reveal: 
  - Layer 1-2: violet-500 (#a78bfa)
  - Layer 3-4: cyan-400 (#06b6d4)
  - Layer 5-6: emerald-500 (#10b981)
  - Layer 7: amber-500 (#f59e0b)
Text: slate-100 (#f1f5f9)
Accent: blue-500 (#3b82f6)
```

---

## Instructions for Recreation

1. **Create React artifact** with Tailwind, no build tools
2. **Include sample terms** organized by OSI layer
3. **Implement game logic**: select, validate, track mistakes
4. **Add animations**: smooth transitions, shake on error
5. **Build controls**: submit, shuffle, hint, new game
6. **Add PWA files**: manifest.json + service-worker.js
7. **Store progress**: localStorage for streak + game state
8. **Test on mobile**: ensure responsive, no CLS
9. **Deploy**: make installable on home screen

---

## Future Enhancements (After AI Integration)

- 🤖 **Cloudflare Workers + Llama** → Generate new categories dynamically
- 📊 **Stats Dashboard** → Games played, win rate, accuracy by OSI layer
- 🎯 **Daily Challenge** → Same game for all users daily
- 🏆 **Leaderboard** → Compare streaks with friends
- 🔊 **Sound Effects** → Correct/wrong guess sounds (Tone.js)
- 🌍 **Multi-language** → Support Spanish, French, etc.

---

## Testing Checklist

- [ ] All 4 categories validate correctly
- [ ] Mistakes counter decrements on wrong guess
- [ ] Game over after 4 mistakes
- [ ] New game reshuffles without duplicates
- [ ] Streak persists on localStorage
- [ ] Mobile responsive (test on iPhone, Android)
- [ ] No layout shift (CLS = 0)
- [ ] PWA installable
- [ ] Works offline after first load
- [ ] Service worker caches assets
- [ ] Touch interactions smooth and responsive

---

## Quick Start Command

```bash
# If using Claude API to regenerate:
"Build a Connections game PWA for learning networking terminology. Terms grouped by OSI layer. Include manifest.json and service-worker.js. Use React + Tailwind. Mobile-first design. Dark theme with accent colors per layer. LocalStorage for streak tracking. All logic frontend-only."
```

---

## Questions Before Building

- How many total terms in your database?
- Do you want difficulty-based games or fixed curriculum?
- Should categories mix multiple OSI layers or stay pure?
- Any custom color scheme preferences beyond dark theme?
- Want hint system? (reveal category name, reveal one term, reveal category color)
