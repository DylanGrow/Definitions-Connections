# Contributing

Thank you for taking the time to contribute. Please read these guidelines before opening a pull request.

---

## Code of Conduct

Be professional. Be respectful. Be direct.

---

## Getting Started

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/your-feature-name`
3. Make your changes
4. Verify against the checklist below
5. Open a Pull Request against `main`

---

## Code Standards

### HTML
- Semantic elements only (`<main>`, `<section>`, `<article>`, not `<div>` soup)
- All interactive elements must be keyboard-accessible
- All images must have descriptive `alt` attributes
- No inline `style=""` attributes — use CSS classes

### CSS
- Use existing CSS custom properties (`--color-*`, `--space-*`) before creating new ones
- Mobile-first: base styles for small screens, `@media (min-width: ...)` for larger
- Minimum touch target: 44×44px for all interactive elements
- No `!important` unless absolutely justified with a comment

### JavaScript
- `'use strict'` at the top of every file
- No `var` — use `const` and `let`
- No external libraries or CDN imports
- No `console.log` in merged code (use `console.warn` or `console.error` for genuine issues)
- All functions must have a JSDoc comment
- No magic numbers — assign them to named constants with comments

### Commits
Follow [Conventional Commits](https://www.conventionalcommits.org/):

```
feat: add search filter to main list
fix: correct time format on 12-hour clock
docs: update README deployment steps
style: normalize spacing on card component
chore: update .gitignore for Windows temp files
```

---

## Pull Request Requirements

All PRs must pass the checklist in `.github/pull_request_template.md` before review.

---

## What We Will Not Merge

- External framework or library dependencies (React, Vue, Bootstrap, etc.)
- External API calls at runtime
- Code that breaks the CSP policy
- `console.log` statements
- Placeholder/TODO comments
- Code without JSDoc on functions
