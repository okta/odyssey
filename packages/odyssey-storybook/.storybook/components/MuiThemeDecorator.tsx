import {
  createOdysseyMuiTheme,
  CssBaseline,
  OdysseyProvider,
} from "@okta/odyssey-react-mui";
// import { ScopedCssBaseline } from "@mui/material";
import { ThemeProvider as StorybookThemeProvider } from "@storybook/theming";
import type { Decorator } from "@storybook/react";
import * as odysseyTokens from "@okta/odyssey-design-tokens";

const styles = {
  fontFamily:
    "'Inter', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'Oxygen-Sans', 'Ubuntu', 'Cantarell', 'Helvetica Neue', 'Noto Sans Arabic', sans-serif",
};

const odysseyTheme = createOdysseyMuiTheme({ odysseyTokens });

export const MuiThemeDecorator: Decorator = (Story, context) => {
  const {
    globals: { locale },
  } = context;
  return (
    <OdysseyProvider languageCode={locale}>
      {/* @ts-expect-error type mismatch on "typography" */}
      <StorybookThemeProvider theme={odysseyTheme}>
        <CssBaseline />
        <div style={styles} lang={locale}>
          {/* <ScopedCssBaseline> */}
          <Story />
          {/* </ScopedCssBaseline> */}
        </div>
      </StorybookThemeProvider>
    </OdysseyProvider>
  );
};
