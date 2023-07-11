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
  Button,
  MenuItem,
  OdysseyThemeProvider,
  Radio,
  RadioGroup,
  TextField,
  DesignTokensOverride,
  createOdysseyMuiTheme,
  deepmerge,
} from "@okta/odyssey-react-mui";
import {
  ListItemText,
  MenuList,
  ThemeProvider as MuiThemeProvider,
  Paper,
  ThemeOptions,
  createTheme,
} from "@mui/material";

import { MuiThemeDecorator } from "../../.storybook/components/MuiThemeDecorator";
import { useMemo } from "react";
import * as Tokens from "@okta/odyssey-design-tokens";

export default {
  title: "Customization/Components",
  decorators: [MuiThemeDecorator],
};

export const ButtonStory: StoryObj = {
  render: function C() {
    const odysseyDesignTokensOverrides: DesignTokensOverride = {
      BorderRadiusMain: "12px",
      HueBlue500: "green", //base background color
      HueBlue900: "rgb(150,0,0,1)", //used for hover/focus
      TypographyLineHeightHeading1: 1.2,
      Spacing0: "1rem",
    };

    return (
      <OdysseyThemeProvider designTokensOverride={odysseyDesignTokensOverrides}>
        <div>
          <Button variant="primary" text="Primary" />
        </div>
      </OdysseyThemeProvider>
    );
  },
};

ButtonStory.storyName = "Button";

export const TextFieldStory: StoryObj = {
  render: function C() {
    const odysseyDesignTokensOverrides: DesignTokensOverride = {
      HueBlue500: "orange",
    };

    return (
      <>
        <TextField autoCompleteType="name" label="Name" type="text" />
        <OdysseyThemeProvider
          designTokensOverride={odysseyDesignTokensOverrides}
        >
          <div>
            <TextField autoCompleteType="name" label="Password" type="text" />
          </div>
        </OdysseyThemeProvider>
      </>
    );
  },
};

TextFieldStory.storyName = "TextField";

export const RadioGroupStory: StoryObj = {
  render: function C() {
    const odysseyDesignTokensOverrides: DesignTokensOverride = {
      HueBlue500: "rgba(0, 160, 100, 1)", // THIS IS A SAMPLE. DO NOT USE!
    };

    return (
      <OdysseyThemeProvider designTokensOverride={odysseyDesignTokensOverrides}>
        <div>
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
        </div>
      </OdysseyThemeProvider>
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
    const odysseyTheme = createOdysseyMuiTheme(Tokens);
    const customOdysseyTheme = useMemo(
      () =>
        themeOverrides && createTheme(deepmerge(odysseyTheme, themeOverrides)),
      [odysseyTheme, themeOverrides]
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
