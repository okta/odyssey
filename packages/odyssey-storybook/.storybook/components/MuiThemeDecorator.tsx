import React from "react";
import { ThemeProvider as MuiThemeProvider } from "@mui/material/styles";
import { CssBaseline } from "@mui/material";
import { ThemeProvider } from "@storybook/theming";
import { odysseyTheme as theme } from "@okta/odyssey-react-mui";
import type { DecoratorFn } from "@storybook/react";

export const MuiThemeDecorator: DecoratorFn = (Story) => (
  <MuiThemeProvider theme={theme}>
    <ThemeProvider theme={theme}>
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
  </MuiThemeProvider>
);
