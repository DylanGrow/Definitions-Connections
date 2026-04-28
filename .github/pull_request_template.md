## Summary
<!-- One sentence: what does this PR do and why? -->

---

## Changes
<!-- Bullet list of what changed -->
-
-

---

## Verification Checklist

### 🔒 Security
- [ ] No new external scripts, fonts, or CDN imports added
- [ ] CSP policy not weakened (no `unsafe-eval`, no wildcard origins)
- [ ] No API keys, tokens, or secrets in code or comments
- [ ] No `eval()`, `innerHTML` with unescaped user input, or `document.write()`

### 📱 Mobile & UI
- [ ] Tested on a real mobile device or DevTools mobile emulation
- [ ] All interactive elements are at least 44×44px touch targets
- [ ] No horizontal scroll on 375px viewport
- [ ] Readable in direct sunlight (high contrast verified)

### ⚡ Performance
- [ ] No new render-blocking scripts added (all JS uses `defer` or `async`)
- [ ] New images are compressed and sized appropriately
- [ ] Service Worker precache list updated if new files were added
- [ ] No memory leaks (event listeners cleaned up)

### ♿ Accessibility
- [ ] All images have descriptive `alt` text
- [ ] All interactive elements are keyboard accessible
- [ ] Color is not the sole means of conveying information
- [ ] Focus indicators are visible

### 🧹 Code Quality
- [ ] No `console.log` statements
- [ ] No `// TODO` or placeholder comments
- [ ] All new functions have JSDoc comments
- [ ] No magic numbers (all constants named and commented)
- [ ] Follows Conventional Commits format

### ✅ Final
- [ ] Works when opened fresh in a private/incognito browser window
- [ ] Works offline after first load (service worker confirmed active)
- [ ] `README.md` updated if behavior changed
