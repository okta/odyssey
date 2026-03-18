/*!
 * Copyright (c) 2021-present, Okta, Inc. and/or its affiliates. All rights reserved.
 * The Okta software accompanied by this notice is provided pursuant to the Apache License, Version 2.0 (the "License.")
 *
 * You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0.
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *
 * See the License for the specific language governing permissions and limitations under the License.
 */

import type { Meta, StoryObj } from "@storybook/react-vite";

import * as odysseyTokens from "@okta/odyssey-design-tokens";
import {
  Button,
  createOdysseyMuiTheme,
  createTheme,
  deepmerge,
  DesignTokensOverride,
  ListItemText,
  MenuItem,
  MenuList,
  ThemeProvider as MuiThemeProvider,
  OdysseyProvider,
  Paper,
  Radio,
  RadioGroup,
  TextField,
  ThemeOptions,
} from "@okta/odyssey-react-mui";
import { useMemo } from "react";

const meta = {
  component: () => null,
} satisfies Meta;

export default meta;

export const ButtonStory: StoryObj = {
  decorators: [
    (Story, context) => {
      const odysseyDesignTokensOverrides: DesignTokensOverride = {
        BorderRadiusMain: "12px",
        PalettePrimaryMain: "green", //base background color
        PalettePrimaryDark: "rgb(150,0,0,1)", //used for hover/focus
        PalettePrimaryDarker: "rgb(150,0,0,1)", //used for hover/focus
        TypographyLineHeightHeading1: 1.2,
        Spacing0: "1rem",
      };

      const shadowRootElement =
        context.canvasElement.parentElement ?? undefined;

      return (
        <OdysseyProvider
          designTokensOverride={odysseyDesignTokensOverrides}
          hasCssBaseline
          shadowRootElement={shadowRootElement}
        >
          <Story />
        </OdysseyProvider>
      );
    },
  ],
  name: "Button",
  render: function C() {
    return (
      <div>
        <Button label="Primary" variant="primary" />
      </div>
    );
  },
};

export const TextFieldStory: StoryObj = {
  decorators: [
    (Story, context) => {
      const odysseyDesignTokensOverrides: DesignTokensOverride = {
        HueBlue500: "orange",
      };
      const shadowRootElement =
        context.canvasElement.parentElement ?? undefined;
      return (
        <OdysseyProvider
          designTokensOverride={odysseyDesignTokensOverrides}
          hasCssBaseline
          shadowRootElement={shadowRootElement}
        >
          <Story />
        </OdysseyProvider>
      );
    },
  ],
  name: "TextField",
  render: function C() {
    return (
      <>
        <TextField autoCompleteType="name" label="Name" type="text" />
        <TextField autoCompleteType="name" label="Password" type="text" />
      </>
    );
  },
};

export const RadioGroupStory: StoryObj = {
  decorators: [
    (Story, context) => {
      const odysseyDesignTokensOverrides: DesignTokensOverride = {
        HueBlue500: "rgba(0, 160, 100, 1)", // THIS IS A SAMPLE. DO NOT USE!
      };
      const shadowRootElement =
        context.canvasElement.parentElement ?? undefined;
      return (
        <OdysseyProvider
          designTokensOverride={odysseyDesignTokensOverrides}
          hasCssBaseline
          shadowRootElement={shadowRootElement}
        >
          <Story />
        </OdysseyProvider>
      );
    },
  ],
  name: "RadioGroup",
  render: function C() {
    return (
      <RadioGroup
        aria-describedby="radio-hint radio-error"
        defaultValue="Lightspeed"
        id="radio-buttons-group"
        label="Speed"
      >
        <Radio label="Lightspeed" value="lightspeed" />
        <Radio label="Warp Speed" value="Warp Speed" />
        <Radio label="Ludicrous Speed" value="Ludicrous Speed" />
      </RadioGroup>
    );
  },
};

export const CustomComponentStory: StoryObj = {
  name: "CustomComponent",
  render: function C() {
    const themeOverrides: ThemeOptions = useMemo(() => {
      return {
        components: {
          MuiListItemText: {
            styleOverrides: {
              root: {
                color: "red",
              },
            },
          },
        },
      };
    }, []);
    const odysseyTheme = createOdysseyMuiTheme({ odysseyTokens });
    const customOdysseyTheme = useMemo(
      () =>
        themeOverrides && createTheme(deepmerge(odysseyTheme, themeOverrides)),
      [odysseyTheme, themeOverrides],
    );

    return (
      <>
        <Paper>
          <MenuList>
            <MenuItem>
              <MuiThemeProvider theme={customOdysseyTheme}>
                <ListItemText>Cut</ListItemText>
              </MuiThemeProvider>
            </MenuItem>
            <MenuItem>
              <ListItemText>Copy</ListItemText>
            </MenuItem>
          </MenuList>
        </Paper>
      </>
    );
  },
};
