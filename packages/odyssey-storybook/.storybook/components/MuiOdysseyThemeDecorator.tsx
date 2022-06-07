import React from "react";
import { ThemeProvider as MuiThemeProvider } from "@mui/material/styles";
import { ThemeProvider } from "@storybook/theming";
import { theme } from "@okta/odyssey-react-mui";
import type { DecoratorFn } from "@storybook/react";

export const MuiOdysseyThemeDecorator: DecoratorFn = (Story) => (
  <MuiThemeProvider theme={theme}>
    <ThemeProvider theme={theme}>
      <Story />
    </ThemeProvider>
  </MuiThemeProvider>
);
