/*!
 * Copyright (c) 2025-present, Okta, Inc. and/or its affiliates. All rights reserved.
 * The Okta software accompanied by this notice is provided pursuant to the Apache License, Version 2.0 (the "License.")
 *
 * You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0.
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *
 * See the License for the specific language governing permissions and limitations under the License.
 */

import type { Decorator } from "@storybook/react";

import * as odysseyTokens from "@okta/odyssey-design-tokens";
import {
  createOdysseyMuiTheme,
  CssBaseline,
  OdysseyProvider,
} from "@okta/odyssey-react-mui";
import { ThemeProvider as StorybookThemeProvider } from "@storybook/theming";

const styles = {
  fontFamily:
    "'Inter', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'Oxygen-Sans', 'Ubuntu', 'Cantarell', 'Helvetica Neue', 'Noto Sans Arabic', sans-serif",
};

const odysseyTheme = createOdysseyMuiTheme({
  odysseyTokens,
});

export const OdysseyStorybookThemeDecorator: Decorator = (Story, context) =>
  context.parameters.hasThemeDecorator ? (
    <OdysseyProvider languageCode={context.globals.locale as string}>
      {/* @ts-expect-error type mismatch on "typography" */}
      <StorybookThemeProvider theme={odysseyTheme}>
        <CssBaseline />
        <div lang={context.globals.locale as string} style={styles}>
          <Story />
        </div>
      </StorybookThemeProvider>
    </OdysseyProvider>
  ) : (
    <Story />
  );
