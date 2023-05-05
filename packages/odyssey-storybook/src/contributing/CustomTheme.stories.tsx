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
  OdysseyThemeProvider,
  Radio,
  RadioGroup,
  TextField,
  ThemeOptions,
} from "@okta/odyssey-react-mui";

import { useMemo } from "react";

export default {
  title: "Customization/Components",
};

export const ButtonStory: StoryObj = {
  render: function C() {
    const themeOverride = useMemo<ThemeOptions>(
      () => ({
        palette: {
          primary: {
            main: "rgba(233, 0, 0, 1)", // THIS IS A SAMPLE. DO NOT USE!
          },
        },
      }),
      []
    );

    return (
      <OdysseyThemeProvider themeOverride={themeOverride}>
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
    const themeOverride = useMemo<ThemeOptions>(
      () => ({
        palette: {
          primary: {
            main: "rgba(233, 0, 0, 1)", // THIS IS A SAMPLE. DO NOT USE!
          },
        },
      }),
      []
    );

    return (
      <OdysseyThemeProvider themeOverride={themeOverride}>
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
    const themeOverride = useMemo<ThemeOptions>(
      () => ({
        palette: {
          primary: {
            main: "rgba(233, 0, 0, 1)", // THIS IS A SAMPLE. DO NOT USE!
          },
        },
      }),
      []
    );

    return (
      <OdysseyThemeProvider themeOverride={themeOverride}>
        <div>
          <RadioGroup
            defaultValue="Lightspeed"
            name="radio-buttons-group"
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
