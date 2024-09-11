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

import {
  Checkbox,
  CheckboxGroup,
  CheckboxGroupProps,
  Link,
} from "@okta/odyssey-react-mui";
import { Meta, StoryObj } from "@storybook/react";

import { fieldComponentPropsMetaData } from "../../../fieldComponentPropsMetaData";
import { MuiThemeDecorator } from "../../../../.storybook/components";

type CheckboxGroupStoryProps = CheckboxGroupProps & {
  isDefaultChecked: Parameters<typeof Checkbox>[0]["isDefaultChecked"];
  isIndeterminate: Parameters<typeof Checkbox>[0]["isIndeterminate"];
};

const storybookMeta: Meta<CheckboxGroupStoryProps> = {
  title: "MUI Components/Forms/CheckboxGroup",
  component: CheckboxGroup,
  argTypes: {
    children: {
      control: null,
      description: "A single Checkbox element or an array of Checkbox elements",
      table: {
        type: {
          summary:
            "ReactElement<typeof Checkbox> | Array<ReactElement<typeof Checkbox>>",
        },
      },
      type: {
        required: true,
        name: "other",
        value:
          "ReactElement<typeof Checkbox> | Array<ReactElement<typeof Checkbox>>",
      },
    },
    errorMessage: fieldComponentPropsMetaData.errorMessage,
    errorMessageList: fieldComponentPropsMetaData.errorMessageList,
    hint: fieldComponentPropsMetaData.hint,
    HintLinkComponent: fieldComponentPropsMetaData.HintLinkComponent,
    isDisabled: fieldComponentPropsMetaData.isDisabled,
    isReadOnly: {
      control: "boolean",
      description: "If `true`, the checkbox group is read-only",
      table: {
        type: {
          summary: "boolean",
        },
        defaultValue: {
          summary: false,
        },
      },
    },
    isRequired: {
      control: "boolean",
      description: "If `true`, the checkbox group is required",
      table: {
        type: {
          summary: "boolean",
        },
        defaultValue: {
          summary: false,
        },
      },
    },
    label: {
      control: "text",
      description: "The label text for the checkbox group",
      table: {
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
  decorators: [MuiThemeDecorator],
  tags: ["autodocs"],
};

export default storybookMeta;

const GroupTemplate: StoryObj<CheckboxGroupProps> = {
  render: (args) => (
    <CheckboxGroup
      errorMessage={args.errorMessage}
      errorMessageList={args.errorMessageList}
      hint={args.hint}
      HintLinkComponent={args.HintLinkComponent}
      isDisabled={args.isDisabled}
      isReadOnly={args.isReadOnly}
      label="Systems check"
      isRequired={args.isRequired}
    >
      <Checkbox label="Life support" name="life-support" value="life-support" />
      <Checkbox
        label="Warp core containment"
        name="warp-core"
        value="warp-core"
      />
      <Checkbox label="Cetacean ops" name="cetacean-ops" value="cetacean-ops" />
    </CheckboxGroup>
  ),
  parameters: {
    controls: {
      exclude: ["isDefaultChecked", "isIndeterminate"],
    },
  },
};

export const Group: StoryObj<CheckboxGroupStoryProps> = {
  ...GroupTemplate,
};

export const Disabled: StoryObj<CheckboxGroupStoryProps> = {
  ...GroupTemplate,
  parameters: {
    controls: {
      exclude: ["isDefaultChecked", "isIndeterminate"],
    },
  },
  args: {
    isDisabled: true,
  },
};

export const ReadOnly: StoryObj<CheckboxGroupStoryProps> = {
  ...GroupTemplate,
  parameters: {
    controls: {
      exclude: ["isDefaultChecked", "isIndeterminate"],
    },
  },
  args: {
    isReadOnly: true,
  },
};

export const Error: StoryObj<CheckboxGroupStoryProps> = {
  ...GroupTemplate,
  parameters: {
    controls: {
      exclude: ["isDefaultChecked", "isIndeterminate"],
    },
    docs: {
      description: {
        story:
          "Unlike Radio Buttons, Checkboxes validate individually, not as a group. Validity must be set individually on each checkbox using the `isInvalid` prop, even if the group has an `errorMessage` set.",
      },
    },
  },
  args: {
    errorMessage: "Select 1 or more systems to check before initiating warp.",
  },
};

export const ErrorsList: StoryObj<CheckboxGroupStoryProps> = {
  ...GroupTemplate,
  args: {
    isRequired: true,
    errorMessage: "System check is required",
    errorMessageList: [
      "Select at least one item",
      "Select no more than 3 items",
    ],
  },
};

export const Hint: StoryObj<CheckboxGroupStoryProps> = {
  ...GroupTemplate,
  args: {
    hint: "Select 1 or more systems to check before initiating warp.",
  },
};

export const HintLink: StoryObj<CheckboxGroupStoryProps> = {
  ...GroupTemplate,
  args: {
    hint: "Select 1 or more systems to check before initiating warp.",
    HintLinkComponent: <Link href="/learn-more">Learn more</Link>,
  },
};

export const Required: StoryObj<CheckboxGroupStoryProps> = {
  ...GroupTemplate,
  args: {
    isRequired: true,
  },
};

export const MixedError: StoryObj<CheckboxGroupStoryProps> = {
  render: (args) => (
    <CheckboxGroup
      isDisabled={args.isDisabled}
      errorMessage={args.errorMessage}
      hint={args.hint}
      label="Who will you invite to your birthday?"
      isRequired={args.isRequired}
    >
      <Checkbox label="Alfred" name="alfred" value="alfred" validity="valid" />
      <Checkbox
        isDefaultChecked
        label="Barbara Gordon"
        name="barbara-gordon"
        value="barbara-gordon"
      />
      <Checkbox
        label="Hal Jordan"
        name="hal-jordan"
        value="hal-jordan"
        validity="valid"
      />
      <Checkbox
        isDefaultChecked
        label="The Joker"
        name="the-joker"
        value="the-joker"
      />
    </CheckboxGroup>
  ),
  parameters: {
    controls: {
      exclude: ["isDefaultChecked", "isIndeterminate"],
    },
    docs: {
      description: {
        story:
          "Individual checkboxes can take a different validity than the whole group; if a group is invalid, individual checkboxes can be marked valid, and vice versa. This is particularly useful in cases where the state of particular checkboxes affect the validity of the entire group.",
      },
    },
  },
  args: {
    errorMessage: "These choices are incompatible.",
  },
};
