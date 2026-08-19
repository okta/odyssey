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

import { Radio } from "@okta/odyssey-react-mui";
import { Meta, StoryObj } from "@storybook/react-vite";
import { action } from "storybook/actions";

import {
  staticBoardParameters,
  StoryFieldCell,
  StoryGrid,
  StorySection,
} from "../../../tools/boardStoryHelpers.js";
import { OdysseyStorybookThemeDecorator } from "../../../tools/OdysseyStorybookThemeDecorator.js";
import { fieldComponentPropsMetaData } from "../fieldComponentPropsMetaData.js";

const meta = {
  component: Radio,
  decorators: [OdysseyStorybookThemeDecorator],
  tags: ["autodocs"],
  argTypes: {
    isChecked: {
      control: "boolean",
      description: "If `true`, the radio button is checked",
      table: {
        category: "Visual",
        type: {
          summary: "boolean",
        },
      },
    },
    hint: {
      control: "text",
      description: "The helper text content",
      table: {
        category: "Visual",
        type: {
          summary: "string",
        },
      },
    },
    isDisabled: fieldComponentPropsMetaData.isDisabled,
    isInvalid: {
      control: "boolean",
      description: "If `true`, the radio button has an invalid value",
      table: {
        category: "Visual",
        type: {
          summary: "boolean",
        },
      },
    },
    isReadOnly: {
      control: "boolean",
      description: "If `true`, the radio button is read-only",
      table: {
        category: "Visual",
        type: {
          summary: "boolean",
        },
        defaultValue: {
          summary: "false",
        },
      },
    },
    label: {
      control: "text",
      description: "The label text for the radio button",
      table: {
        category: "Visual",
        type: {
          summary: "string",
        },
      },
      type: {
        required: true,
        name: "string",
      },
    },
    onChange: {
      description: "Callback fired when the the radio button value changes",
      table: {
        category: "Functional",
        type: {
          summary: "func",
        },
      },
    },
    onBlur: {
      description: "Callback fired when the blur event happens",
      table: {
        category: "Functional",
        type: {
          summary: "func",
        },
      },
    },
    name: fieldComponentPropsMetaData.name,
    value: {
      control: "text",
      description: "The value attribute of the radio button",
      table: {
        category: "Functional",
        type: {
          summary: "string",
        },
      },
      type: {
        required: true,
        name: "string",
      },
    },
  },
  args: {
    // Provide a defined value so the underlying input mounts controlled.
    // Otherwise MUI freezes it as uncontrolled and toggling the `isChecked`
    // control in the Docs demo never updates the rendered state.
    isChecked: false,
    label: "Label",
    onBlur: action("onBlur"),
    onChange: action("onChange"),
    value: "Value",
  },
} satisfies Meta<typeof Radio>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

export const AllStates: Story = {
  parameters: staticBoardParameters,
  render: function C() {
    return (
      <StorySection title="Every radio state.">
        <StoryGrid columns={3}>
          <StoryFieldCell>
            <Radio
              label="Unchecked"
              onChange={action("onChange")}
              value="unchecked"
            />
          </StoryFieldCell>

          <StoryFieldCell>
            <Radio
              isChecked
              label="Checked"
              onChange={action("onChange")}
              value="checked"
            />
          </StoryFieldCell>

          <StoryFieldCell>
            <Radio
              isDisabled
              label="Disabled"
              onChange={action("onChange")}
              value="disabled"
            />
          </StoryFieldCell>

          <StoryFieldCell>
            <Radio
              isChecked
              isDisabled
              label="Disabled checked"
              onChange={action("onChange")}
              value="disabledChecked"
            />
          </StoryFieldCell>

          <StoryFieldCell>
            <Radio
              isChecked
              isReadOnly
              label="Read-only"
              onChange={action("onChange")}
              value="readOnly"
            />
          </StoryFieldCell>

          <StoryFieldCell>
            <Radio
              isInvalid
              label="Invalid"
              onChange={action("onChange")}
              value="invalid"
            />
          </StoryFieldCell>

          <StoryFieldCell>
            <Radio
              hint="Hint text"
              label="With hint"
              onChange={action("onChange")}
              value="hint"
            />
          </StoryFieldCell>
        </StoryGrid>
      </StorySection>
    );
  },
};
