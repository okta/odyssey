import {
  CssBaseline,
  odysseyTheme,
  OdysseyThemeProvider,
  OdysseyTranslationProvider,
  ScopedCssBaseline,
} from "@okta/odyssey-react-mui";
import { ThemeProvider as StorybookThemeProvider } from "@storybook/theming";
import type { Decorator } from "@storybook/react";
import { Fragment } from "react";

const styles = {
  fontFamily:
    "'Inter', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'Oxygen-Sans', 'Ubuntu', 'Cantarell', 'Helvetica Neue', 'Noto Sans Arabic', sans-serif",
};

export const MuiThemeDecorator: Decorator = (Story) => (
  <OdysseyThemeProvider>
    <OdysseyTranslationProvider>
      {/* @ts-expect-error type mismatch on "typography" */}
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
    </OdysseyTranslationProvider>
  </OdysseyThemeProvider>
);
