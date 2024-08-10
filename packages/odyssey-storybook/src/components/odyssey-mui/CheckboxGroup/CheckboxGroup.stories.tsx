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
  Box,
  Checkbox,
  CheckboxGroup,
  CheckboxGroupProps,
  Link,
  FieldLabel,
  FieldHint,
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
    externalLabelId: {
      control: "text",
      description:
        "The ID of the consumer-provided FieldLabel component. Required only if hasInternalLabel is false",
      table: {
        type: {
          summary: "string",
        },
      },
    },
    hasInternalLabel: {
      control: "boolean",
      description:
        "If true, renders the label within the component. If false, externalLabelId is required and consumer must provide their own `FieldLabel`",
      table: {
        type: {
          summary: "boolean",
        },
        defaultValue: {
          summary: true,
        },
      },
    },
    hint: fieldComponentPropsMetaData.hint,
    HintLinkComponent: fieldComponentPropsMetaData.HintLinkComponent,
    isDisabled: fieldComponentPropsMetaData.isDisabled,
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
export const ExternalLabel: StoryObj<CheckboxGroupStoryProps> = {
  parameters: {
    docs: {
      description: {
        story:
          "Demonstrates using an independent label and hint with the CheckboxGroup component.",
      },
    },
  },
  render: function ExternalLabelStory(args) {
    const labelId = "external-label-id";
    const hintId = "external-hint-id";
    return (
      <Box sx={{ display: "flex", flexDirection: "column" }}>
        <Box
          sx={{
            display: "flex",
            alignItems: "flex-start",
            marginBottom: "8px",
          }}
        >
          <Box sx={{ marginRight: "16px", maxWidth: "400px" }}>
            <FieldLabel
              id={labelId}
              inputId={args.id || "checkbox-group-with-external-label"}
              hasVisibleLabel={true}
              isOptional={false}
              text={"End-user experience"}
            />
            <FieldHint
              id={hintId}
              text={
                "When IdP routing rules are configured to select a provider based on the end user's domain or attributes, the end user sees a modified sign-in screen that accepts the email and short names."
              }
            />
          </Box>
          <Box sx={{ marginTop: "8px" }}>
            <CheckboxGroup
              {...args}
              id={args.id || "checkbox-group-with-external-label"}
              hasInternalLabel={false}
              externalLabelId={labelId}
              hint={undefined}
              ariaDescribedBy={hintId}
            >
              <Checkbox
                label="On-network vs. off-network"
                name="on-network"
                value="on-network"
              />
              <Checkbox
                label="Hub-and-spoke organizations"
                name="hub-spoke"
                value="hub-spoke"
              />
              <Checkbox
                label="Desktop SSO"
                name="desktop-sso"
                value="desktop-sso"
              />
            </CheckboxGroup>
          </Box>
        </Box>
      </Box>
    );
  },
  args: {
    hint: "Select 1 or more systems to check before initiating warp.",
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
