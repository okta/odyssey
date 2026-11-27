---
summary: Emotion cache uses speedy mode, style tags carry no readable CSS text
affectedExports:
  - OdysseyProvider
  - OdysseyCacheProvider
files:
  - packages/odyssey-react-mui/src/OdysseyCacheProvider.tsx
  - packages/odyssey-react-mui/src/OdysseyProvider.tsx
commit: 68bce285f
---

Emotion's cache is created with speedy: true whenever no shadow DOM element is supplied. It was unconditionally false before. With speedy on, Emotion inserts rules through CSSStyleSheet.insertRule, so the generated <style> elements carry no readable text content. Check anything that reads or serializes Odyssey's style tags: snapshot tests that assert on emitted CSS, style extraction in a test renderer, or tooling that scrapes cssRules text. Rendering in the browser is unchanged.
