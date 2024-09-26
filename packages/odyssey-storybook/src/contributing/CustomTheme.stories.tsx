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

import type { StoryObj } from "@storybook/react";
import {
  ContrastModeProvider,
  Box,
  Button,
  createOdysseyMuiTheme,
  createTheme,
  deepmerge,
  DesignTokensOverride,
  ListItemText,
  MenuItem,
  MenuList,
  Paper,
  Radio,
  RadioGroup,
  Status,
  TextField,
  ThemeOptions,
  ThemeProvider as MuiThemeProvider,
  OdysseyProvider,
} from "@okta/odyssey-react-mui";

import { MuiThemeDecorator } from "../../.storybook/components/MuiThemeDecorator";
import { useMemo } from "react";
import * as odysseyTokens from "@okta/odyssey-design-tokens";

export default {
  title: "Customization/Components",
  decorators: [MuiThemeDecorator],
};

export const ButtonStory: StoryObj = {
  decorators: [
    (Story, context) => {
      const odysseyDesignTokensOverrides: DesignTokensOverride = {
        BorderRadiusMain: "12px",
        HueBlue500: "green", //base background color
        HueBlue900: "rgb(150,0,0,1)", //used for hover/focus
        TypographyLineHeightHeading1: 1.2,
        Spacing0: "1rem",
      };
      const shadowRootElement =
        context.canvasElement.parentElement ?? undefined;
      return (
        <OdysseyProvider
          designTokensOverride={odysseyDesignTokensOverrides}
          shadowDomElement={shadowRootElement}
        >
          <Story />
        </OdysseyProvider>
      );
    },
  ],
  render: function C() {
    return (
      <div>
        <Button label="Primary" variant="primary" />
      </div>
    );
  },
};

ButtonStory.storyName = "Button";

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
          shadowDomElement={shadowRootElement}
        >
          <Story />
        </OdysseyProvider>
      );
    },
  ],
  render: function C() {
    return (
      <>
        <TextField autoCompleteType="name" label="Name" type="text" />
        <TextField autoCompleteType="name" label="Password" type="text" />
      </>
    );
  },
};

TextFieldStory.storyName = "TextField";

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
          shadowDomElement={shadowRootElement}
        >
          <Story />
        </OdysseyProvider>
      );
    },
  ],
  render: function C() {
    return (
      <RadioGroup
        defaultValue="Lightspeed"
        id="radio-buttons-group"
        label="Speed"
        aria-describedby="radio-hint radio-error"
      >
        <Radio value="lightspeed" label="Lightspeed" />
        <Radio value="Warp Speed" label="Warp Speed" />
        <Radio value="Ludicrous Speed" label="Ludicrous Speed" />
      </RadioGroup>
    );
  },
};

RadioGroupStory.storyName = "RadioGroup";

export const CustomComponentStory: StoryObj = {
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

CustomComponentStory.storyName = "CustomComponent";

export const StatusesOnGrayBackground: StoryObj = {
  name: "ContrastModeProvider on gray background",
  render: () => (
    <Box sx={{ backgroundColor: "#f4f4f4", padding: "24px" }}>
      <ContrastModeProvider>
        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            gap: 2,
          }}
        >
          <Status label="Default" severity="default" />
          <Status label="Error" severity="error" />
          <Status label="Info" severity="info" />
          <Status label="Success" severity="success" />
          <Status label="Warning" severity="warning" />
        </Box>
      </ContrastModeProvider>
    </Box>
  ),
};

StatusesOnGrayBackground.storyName = "ContrastModeProvider";
