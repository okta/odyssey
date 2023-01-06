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

import type { Story } from "@storybook/react";
import {
  Button,
  FormControlLabel,
  OdysseyThemeProvider,
  Radio,
  RadioGroup,
  TextField,
  ThemeOptions,
} from "@okta/odyssey-react-mui";

import CustomThemeMdx from "./CustomTheme.mdx";

export default {
  title: "Customization/Components",
  parameters: {
    docs: {
      page: CustomThemeMdx,
    },
  },
};

const customTheme: ThemeOptions = {
  palette: {
    primary: {
      main: "rgba(233, 0, 0, 1)", // THIS IS A SAMPLE. DO NOT USE!
    },
  },
};

export const ButtonStory: Story = () => (
  <OdysseyThemeProvider customTheme={customTheme}>
    <div>
      <Button variant="primary">Primary</Button>
    </div>
  </OdysseyThemeProvider>
);

ButtonStory.name = "Button";

export const TextFieldStory: Story = () => (
  <OdysseyThemeProvider customTheme={customTheme}>
    <div>
      <TextField autoCompleteType="name" type="text" />
    </div>
  </OdysseyThemeProvider>
);

TextFieldStory.name = "TextField";

export const RadioGroupStory: Story = () => (
  <OdysseyThemeProvider customTheme={customTheme}>
    <div>
      <RadioGroup
        defaultValue="Lightspeed"
        name="radio-buttons-group"
        aria-describedby="radio-hint radio-error"
      >
        <FormControlLabel
          value="Lightspeed"
          control={<Radio />}
          label="Lightspeed"
        />
        <FormControlLabel
          value="Warp speed"
          control={<Radio />}
          label="Warp speed"
        />
        <FormControlLabel
          value="Ludicrous speed"
          control={<Radio />}
          label="Ludicrous speed"
        />
      </RadioGroup>
    </div>
  </OdysseyThemeProvider>
);

RadioGroupStory.name = "RadioGroup";
