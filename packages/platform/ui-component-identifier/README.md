# UI Component Identifier

A tool that scans the React Fiber tree to identify, highlight, and label UI components on the page.

## Installation

```bash
yarn add @okta/odyssey-contributions-ui-component-identifier
```

## Initialization

Initialize the listener in your root component (e.g., `App.tsx`) or `Storybook` preview.

```tsx
import { setupOdysseyDebugListener } from "@okta/odyssey-contributions-ui-component-identifier";

setupOdysseyDebugListener();
```

Once running, press `Ctrl + Shift + L` (Windows) or `Cmd + Shift + L` (Mac) to toggle the debug menu.
