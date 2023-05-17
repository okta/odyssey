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
  ListItemText,
  MenuItem,
  MenuList,
  MuiThemeProvider,
  OdysseyThemeProvider,
  Paper,
  Radio,
  RadioGroup,
  TextField,
  ThemeOptions,
  TokenOverrideOptions,
  createOdysseyTheme,
  createTheme,
  deepmerge,
} from "@okta/odyssey-react-mui";

import { MuiThemeDecorator } from "../../.storybook/components/MuiThemeDecorator";
import CustomThemeMdx from "./CustomTheme.mdx";
import { useMemo } from "react";

export default {
  title: "Customization/Components",
  decorators: [MuiThemeDecorator],
};

export const ButtonStory: StoryObj = {
  render: function C() {

    const odysseyDesignTokensOverrides: TokenOverrideOptions = {
      BorderRadiusBase: "8px",
      ColorBackgroundBase: "cyan", //focus border color
      ColorPaletteBlue500: "green", //base background color
      ColorPaletteBlue900: "rgb(150,0,0,1)", //used for hover/focus
      FontLineHeightHeading1: 1.2,
      SpaceScale0: "1rem",
    };

    return (
      <OdysseyThemeProvider tokenOverride={odysseyDesignTokensOverrides}>
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
    const odysseyDesignTokensOverrides: TokenOverrideOptions = {
      ColorPaletteBlue500: "orange",
    };

    return (
      <OdysseyThemeProvider tokenOverride={odysseyDesignTokensOverrides}>
        <div>
          <TextField autoCompleteType="name" label="Name" type="text" />
        </div>
      </OdysseyThemeProvider>
    );
  },
};

TextFieldStory.storyName = "TextField";

export const RadioGroupStory: StoryObj = {
  render: function C() {
    const odysseyDesignTokensOverrides: TokenOverrideOptions = {
      ColorPaletteBlue500: "rgba(0, 160, 100, 1)", // THIS IS A SAMPLE. DO NOT USE!
    };

    return (
      <OdysseyThemeProvider tokenOverride={odysseyDesignTokensOverrides}>
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
    const themeOverrides1: ThemeOptions = {
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
    const odysseyTheme = createOdysseyTheme();
    const customOdysseyTheme = useMemo(
      () =>
        themeOverrides1 && createTheme(deepmerge(odysseyTheme, themeOverrides1)),
      [odysseyTheme, themeOverrides1]
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
