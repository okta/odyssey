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

import { useCallback, useState } from "react";
import {
  Box,
  Switch,
  SwitchProps,
  HintLink,
  FieldLabel,
  FieldHint,
} from "@okta/odyssey-react-mui";
import { Meta, StoryObj } from "@storybook/react";
import { userEvent, within } from "@storybook/testing-library";
import { expect } from "@storybook/jest";

import { MuiThemeDecorator } from "../../../../.storybook/components";
import { fieldComponentPropsMetaData } from "../../../fieldComponentPropsMetaData";
import { axeRun } from "../../../axe-util";

const storybookMeta: Meta<SwitchProps> = {
  title: "Labs Components/Switch",
  component: Switch,
  argTypes: {
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
    isChecked: {
      control: "boolean",
      description: "If `true`, the Switch button is checked",
      table: {
        type: {
          summary: "boolean",
        },
      },
    },
    isDefaultChecked: {
      control: "boolean",
      description: "If `true`, the Switch button is checked by default",
      table: {
        type: {
          summary: "boolean",
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
    id: fieldComponentPropsMetaData.id,
    isDisabled: fieldComponentPropsMetaData.isDisabled,
    label: {
      control: "text",
      description: "The label text for the Switch button",
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
    name: fieldComponentPropsMetaData.name,
    value: {
      control: "text",
      description: "The value attribute of the Switch button",
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
  args: {
    hint: "Optional hint text",
    label: "Switch label",
    value: "Switch value",
    HintLinkComponent: <HintLink href="">Some hint link</HintLink>,
    hasInternalLabel: true,
  },
  decorators: [MuiThemeDecorator],
  tags: ["autodocs"],
};

export default storybookMeta;

export const Default: StoryObj<typeof Switch> = {
  play: async ({ canvasElement, step }) => {
    await step("select the switch button", async () => {
      const canvas = within(canvasElement);
      const switchCheckbox = canvas.getByRole("checkbox") as HTMLInputElement;
      if (switchCheckbox) {
        await userEvent.click(switchCheckbox);
      }
      await expect(switchCheckbox).toBeChecked();
      await axeRun("Switch Default");
      await userEvent.tab();
    });
  },
};

export const Disabled: StoryObj<typeof Switch> = {
  args: {
    isDisabled: true,
  },
};

export const CheckedDisabled: StoryObj<typeof Switch> = {
  args: {
    isDisabled: true,
    isDefaultChecked: true,
  },
};

export const ExternalLabel: StoryObj<SwitchProps> = {
  parameters: {
    docs: {
      description: {
        story:
          "Demonstrates using an independent label and hint with the Switch component.",
      },
    },
  },
  render: function ExternalLabelStory() {
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
              inputId="switch-with-external-label"
              hasVisibleLabel={true}
              isOptional={false}
              text="Bulk assign new users"
            />
            <FieldHint
              id={hintId}
              text="You can bulk assign a maximum of 10000 users to a group at a time."
            />
          </Box>
          <Box sx={{ marginTop: "8px" }}>
            <Switch
              id="switch-with-external-label"
              hasInternalLabel={false}
              externalLabelId={labelId}
              label="Enable Feature"
              value="enable-feature"
              hint={undefined}
            />
          </Box>
        </Box>
      </Box>
    );
  },
};

export const Controlled: StoryObj<typeof Switch> = {
  render: function C({ ...props }) {
    const [checked, setChecked] = useState(true);

    const onChange = useCallback<NonNullable<SwitchProps["onChange"]>>(
      ({ checked }) => setChecked(checked),
      [],
    );
    return <Switch {...props} isChecked={checked} onChange={onChange} />;
  },
};
