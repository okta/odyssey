import {
  createOdysseyMuiTheme,
  OdysseyThemeProvider,
  OdysseyTranslationProvider,
} from "@okta/odyssey-react-mui";
import { CssBaseline, ScopedCssBaseline } from "@mui/material";
import { ThemeProvider as StorybookThemeProvider } from "@storybook/theming";
import type { Decorator } from "@storybook/react";
import * as odysseyTokens from "@okta/odyssey-design-tokens";

const styles = {
  fontFamily:
    "'Inter', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'Oxygen-Sans', 'Ubuntu', 'Cantarell', 'Helvetica Neue', 'Noto Sans Arabic', sans-serif",
};

const odysseyTheme = createOdysseyMuiTheme({ odysseyTokens });

export const MuiThemeDecorator: Decorator = (Story, context) => {
  console.log({ context });

  return (
    <OdysseyThemeProvider>
      <OdysseyTranslationProvider languageCode={context.globals.locale}>
        {/* @ts-expect-error type mismatch on "typography" */}
        <StorybookThemeProvider theme={odysseyTheme}>
          <CssBaseline />
          <div style={styles}>
            <ScopedCssBaseline>
              <Story />
            </ScopedCssBaseline>
          </div>
        </StorybookThemeProvider>
      </OdysseyTranslationProvider>
    </OdysseyThemeProvider>
  );
};
