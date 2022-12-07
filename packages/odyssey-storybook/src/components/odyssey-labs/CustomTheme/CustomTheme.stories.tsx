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
  InputBase,
  FormControlLabel,
  RadioGroup,
  Radio,
  OdysseyThemeProvider,
} from "@okta/odyssey-react-mui";
import CustomThemeMdx from "./CustomTheme.mdx";

export default {
  title: `Labs Components/Custom Theme`,
  component: Button,
  parameters: {
    docs: {
      page: CustomThemeMdx,
    },
  },
};

const Template: Story = (props) => {
  const customTheme = {
    palette: {
      primary: {
        main: "rgba(233, 0, 0, 1)", // THIS IS A SAMPLE.
      },
    },
  };

  return (
    <OdysseyThemeProvider customTheme={customTheme}>
      <div>
        {props.button && <Button variant="primary">Primary</Button>}
        {props.input && (
          <InputBase
            autoComplete="name"
            endAdornment={null}
            id="demo-text-field"
            inputProps={{
              "aria-describedby": "textfield-hint textfield-error",
            }}
            startAdornment={null}
            type="text"
          />
        )}
        {props.radio && (
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
        )}
      </div>
    </OdysseyThemeProvider>
  );
};

export const ButtonPrimary = Template.bind({});
ButtonPrimary.args = {
  button: true,
};

export const InputDefault = Template.bind({});
InputDefault.args = {
  input: true,
};

export const RadioDefault = Template.bind({});
RadioDefault.args = {
  radio: true,
};
