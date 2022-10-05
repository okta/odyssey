import {
  CssBaseline,
  odysseyTheme,
  ThemeProvider as OdysseyMuiThemeProvider,
} from "@okta/odyssey-react-mui";
import { ThemeProvider } from "@storybook/theming";
import type { DecoratorFn } from "@storybook/react";

export const MuiThemeDecorator: DecoratorFn = (Story) => (
  <OdysseyMuiThemeProvider>
    <ThemeProvider theme={odysseyTheme}>
      <CssBaseline />
      <div
        style={{
          fontFamily:
            "'Public Sans', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'Oxygen-Sans', 'Ubuntu', 'Cantarell', 'Helvetica Neue', 'Noto Sans Arabic', sans-serif",
        }}
      >
        <Story />
      </div>
    </ThemeProvider>
  </OdysseyMuiThemeProvider>
);
