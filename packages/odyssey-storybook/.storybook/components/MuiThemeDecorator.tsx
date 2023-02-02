import {
  CssBaseline,
  odysseyTheme,
  OdysseyThemeProvider,
  ScopedCssBaseline,
} from "@okta/odyssey-react-mui";
import { ThemeProvider as StorybookThemeProvider } from "@storybook/theming";
import type { DecoratorFn } from "@storybook/react";
import { Fragment } from "react";

const styles = {
  fontFamily:
    "'Public Sans', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'Oxygen-Sans', 'Ubuntu', 'Cantarell', 'Helvetica Neue', 'Noto Sans Arabic', sans-serif",
};

export const MuiThemeDecorator: DecoratorFn = (Story) => (
  <OdysseyThemeProvider>
    <StorybookThemeProvider theme={odysseyTheme}>
      <Fragment>
        <CssBaseline />
        <div style={styles}>
          <ScopedCssBaseline>
            <Story />
          </ScopedCssBaseline>
        </div>
      </Fragment>
    </StorybookThemeProvider>
  </OdysseyThemeProvider>
);
