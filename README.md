# Hyperweb ADA/WCAG2.2 Compliance Widget (portable)

Live demo here: [https://www.hyperwebmedia.com/ada-widget/demo.html](https://www.hyperwebmedia.com/ada-widget/demo.html)

A self-contained accessibility widget you can drop onto any site. It injects its own markup and styles, persists preferences in `localStorage`, and exposes a small API for scripting.

This is a widget I have been working on at [https://www.hyperwebmedia.com](https://www.hyperwebmedia.com) for some time, and deploying on client websites. I have finally refined it enough to give away to the public.

## Files
- `ada-widget.js` - drop-in script, no build step required.
- `demo.html` / `demo.css` - minimal demo page that showcases the controls and their effects.

## Quick start
1) Copy `ada-widget.js` to your site (e.g., `/js/ada-widget.js`).
2) Include it near the end of `body` (or with `defer`):
   ```html
   <script src="/js/ada-widget.js" defer></script>
   ```
3) (Optional) Set a custom storage key before loading:
   ```html
   <script>window.hwAdaConfig = { storageKey: 'mySiteAdaPrefs' };</script>
   <script src="/js/ada-widget.js" defer></script>
   ```

Open `demo.html` in a browser to see the widget running against typical content.

## Features
- Toggles: large text, spacing, high contrast, underline links, highlight links, reduce motion, grayscale, invert, reading guide, screen reader outlines, reset.
- Namespaced classes (`hw-ada-*`) prevent CSS collisions.
- Preferences persist per browser via `localStorage`.
- Two-column panel layout on desktop; stacks on small screens.
- Reading guide bar with stronger contrast for light and dark pages.
- High-contrast mode forces dark background, white text, yellow underlined links, and bordered form controls for legibility.

## Public API
Available on `window.hwAda` after the script loads:
- `hwAda.set(key, value)` - enable/disable a feature (`largeText`, `spacing`, `highContrast`, `underline`, `highlight`, `reduceMotion`, `grayscale`, `invert`, `readingGuide`, `screenReader`).
- `hwAda.reset()` - clear all preferences.
- `hwAda.open()` / `hwAda.close()` — control the panel.
- `hwAda.prefs` - current preference state object.

## Styling and overrides
- All widget styles are injected by `ada-widget.js`; no extra CSS file is required.
- Override with the namespaced classes if you need to match a house style.
- Button text and `aria-label` copy can be adjusted directly in the script for localization.

## Browser support
Modern evergreen browsers. The widget uses standard DOM APIs and degrades gracefully if optional APIs are missing.
