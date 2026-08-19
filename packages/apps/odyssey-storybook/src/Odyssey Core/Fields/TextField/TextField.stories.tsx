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
  deepmerge,
  InputAdornment,
  Link,
  TextField,
  TextFieldProps,
  textFieldTypeValues,
} from "@okta/odyssey-react-mui";
import { AddCircleIcon, CallIcon } from "@okta/odyssey-react-mui/icons";
import { Meta, StoryObj } from "@storybook/react-vite";
import { ChangeEvent } from "react";
import { action } from "storybook/actions";
import { useCallback } from "storybook/preview-api";
import { userEvent, within } from "storybook/test";

import {
  staticBoardParameters,
  StoryCell,
  StoryGrid,
  StorySection,
} from "../../../tools/boardStoryHelpers.js";
import { OdysseyStorybookThemeDecorator } from "../../../tools/OdysseyStorybookThemeDecorator.js";
import { useStoryArgOrLocalState } from "../../../tools/useStoryArgOrLocalState.js";
import { fieldComponentPropsMetaData } from "../fieldComponentPropsMetaData.js";

const meta = {
  component: TextField,
  decorators: [OdysseyStorybookThemeDecorator],
  tags: ["autodocs"],
  argTypes: {
    autoCompleteType: {
      control: "text",
      description:
        "The native HTML [autocomplete](https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/autocomplete) attribute for enabling browser autofill (e.g., `email`, `username`, `current-password`)",
      table: {
        category: "Functional",
        type: {
          summary: "string",
        },
      },
    },
    defaultValue: {
      control: "text",
      description:
        "If `value` is undefined, the field is uncontrolled and `defaultValue` provides its initial text",
      table: {
        category: "Functional",
        type: {
          summary: "string",
        },
        defaultValue: {
          summary: undefined,
        },
      },
    },
    endAdornment: {
      control: { type: "select" },
      options: ["None", "String", "Icon"],
      mapping: {
        None: undefined,
        String: "%",
        Icon: <CallIcon />,
      },
      description:
        "Content displayed at the end of the input. Use string for units and symbols, or an Odyssey icon for actions",
      table: {
        category: "Visual",
        type: {
          summary: "string | ReactElement<typeof Icon>",
        },
      },
    },
    errorMessage: fieldComponentPropsMetaData.errorMessage,
    errorMessageList: fieldComponentPropsMetaData.errorMessageList,
    hasInitialFocus: {
      control: false,
      description: "If `true`, the component will receive focus automatically",
      table: {
        category: "Functional",
        type: {
          summary: "boolean",
        },
      },
    },
    hint: fieldComponentPropsMetaData.hint,
    HintLinkComponent: fieldComponentPropsMetaData.HintLinkComponent,
    id: fieldComponentPropsMetaData.id,
    isDisabled: fieldComponentPropsMetaData.isDisabled,
    isFullWidth: fieldComponentPropsMetaData.isFullWidth,
    max: {
      control: "number",
      description: "The maximum value for a `number` input",
      table: {
        category: "Functional",
        type: {
          summary: "number",
        },
      },
    },
    min: {
      control: "number",
      description: "The minimum value for a `number` input",
      table: {
        category: "Functional",
        type: {
          summary: "number",
        },
      },
    },
    isMultiline: {
      control: "boolean",
      description: "If `true`, a `textarea` element is rendered",
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
    isOptional: fieldComponentPropsMetaData.isOptional,
    isReadOnly: fieldComponentPropsMetaData.isReadOnly,
    label: {
      control: "text",
      description: "The label for the `input` element",
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
    name: fieldComponentPropsMetaData.name,
    onBlur: {
      description:
        "Callback fired after the input loses focus; useful for validation or analytics hooks",
      table: {
        category: "Functional",
        type: {
          summary: "func",
        },
      },
    },
    onChange: {
      description:
        "Callback fired whenever the value changes; required when controlling the component via `value`",
      table: {
        category: "Functional",
        type: {
          summary: "func",
        },
      },
    },
    onFocus: {
      description:
        "Callback fired when the input gains focus; helpful for analytics or guided workflows",
      table: {
        category: "Functional",
        type: {
          summary: "func",
        },
      },
    },
    placeholder: {
      control: "text",
      description:
        "The short hint displayed in the `input` before the user enters a value",
      table: {
        category: "Visual",
        type: {
          summary: "string",
        },
      },
    },
    step: {
      control: "number",
      description: "The step interval for a `number` input",
      table: {
        category: "Functional",
        type: {
          summary: "number",
        },
      },
    },
    startAdornment: {
      control: { type: "select" },
      options: ["None", "String", "Icon"],
      mapping: {
        None: undefined,
        String: "$",
        Icon: <AddCircleIcon />,
      },
      description:
        "Content displayed at the start of the input. Use string for units or symbols, or an Odyssey icon for actions",
      table: {
        category: "Visual",
        type: {
          summary: "string | ReactElement<typeof Icon>",
        },
      },
    },
    type: {
      options: textFieldTypeValues,
      control: { type: "radio" },
      description:
        "Type of the `input` element. It should be [a valid HTML5 input type](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#Form_%3Cinput%3E_types)",
      table: {
        category: "Functional",
        type: {
          summary: textFieldTypeValues.join(" | "),
        },
        defaultValue: {
          summary: "text",
        },
      },
    },
    value: {
      control: "text",
      description:
        "If `value` is provided, you control the input externally and must handle updates with `onChange`",
      table: {
        category: "Functional",
        type: {
          summary: "string",
        },
      },
    },
  },
  args: {
    endAdornment: "None",
    label: "Label",
    onBlur: action("onBlur"),
    onChange: action("onChange"),
    onFocus: action("onFocus"),
    startAdornment: "None",
    value: "",
  },
} satisfies Meta<typeof TextField>;

export default meta;

type Story = StoryObj<typeof meta>;

const TextFieldTemplate: Story = {
  args: {
    value: "",
  },
  argTypes: {
    defaultValue: { control: false },
  },
  render: function Render(args, context) {
    const { defaultValue, ...props } = args;
    void defaultValue;

    const { value, setValue } = useStoryArgOrLocalState<
      TextFieldProps,
      "value"
    >({
      args,
      context,
      argKey: "value",
      defaultValue: args.value ?? "",
    });

    const handleChange = useCallback(
      (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setValue(event.target.value);
      },
      [setValue],
    );
    return <TextField {...props} onChange={handleChange} value={value} />;
  },
};

const textFieldPlay: NonNullable<Story["play"]> = async ({
  canvasElement,
  step,
}) => {
  await step("Textfield callback", async () => {
    const canvas = within(canvasElement);
    const textbox = await canvas.findByRole("textbox");
    await userEvent.click(textbox);
    await userEvent.type(textbox, "v");
    await userEvent.clear(textbox);
    await userEvent.tab();
  });
};

export const Playground: Story = {
  ...deepmerge(TextFieldTemplate, {
    play: textFieldPlay,
    tags: ["!autodocs"],
  }),
};

export const Uncontrolled: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "When `value` is omitted the field manages its own state via `defaultValue`.",
      },
    },
  },
  args: {
    defaultValue: "Initial state",
    value: undefined,
  },
  argTypes: {
    value: { control: false },
  },
  render: (props) => {
    const { value, ...rest } = props;
    void value;
    return <TextField {...rest} />;
  },
};

export const AllStates: Story = {
  parameters: staticBoardParameters,
  render: function C() {
    return (
      <StorySection title="Every prop-driven state a TextField can render.">
        <StoryGrid columns={3}>
          <StoryCell label="default">
            <TextField label="Label" />
          </StoryCell>

          <StoryCell label="disabled">
            <TextField defaultValue="Value" isDisabled label="Label" />
          </StoryCell>

          <StoryCell label="read-only">
            <TextField defaultValue="Value" isReadOnly label="Label" />
          </StoryCell>

          <StoryCell label="optional">
            <TextField isOptional label="Label" />
          </StoryCell>

          <StoryCell label="error">
            <TextField errorMessage="Error Message" label="Label" />
          </StoryCell>

          <StoryCell label="errors list">
            <TextField
              errorMessage="Error Message"
              errorMessageList={["Error A"]}
              label="Label"
            />
          </StoryCell>

          <StoryCell label="hint">
            <TextField hint="Hint text" label="Label" />
          </StoryCell>

          <StoryCell label="hint with link">
            <TextField
              hint="Hint text"
              HintLinkComponent={<Link href="#link">Link</Link>}
              label="Label"
            />
          </StoryCell>

          <StoryCell label="placeholder">
            <TextField label="Label" placeholder="Placeholder text" />
          </StoryCell>

          <StoryCell label="adornments">
            <TextField
              endAdornment="%"
              label="Label"
              startAdornment={<AddCircleIcon />}
            />
          </StoryCell>

          <StoryCell label="multiline">
            <TextField isMultiline label="Label" />
          </StoryCell>

          {/* Global phone formats are too varied to validate, so type="tel"
              relies on an adornment for the country code instead. */}
          <StoryCell label='type="tel"'>
            <TextField
              autoCompleteType="mobile tel"
              label="Phone number"
              startAdornment={
                <InputAdornment position="start">+1</InputAdornment>
              }
              type="tel"
            />
          </StoryCell>

          <StoryCell label='type="number"'>
            <TextField
              label="Quantity"
              max={100}
              min={0}
              step={5}
              type="number"
            />
          </StoryCell>

          <StoryCell label="focused">
            <TextField hasInitialFocus label="Label" />
          </StoryCell>
        </StoryGrid>

        <StoryGrid columns={1}>
          <StoryCell label="full width">
            <TextField isFullWidth label="Label" />
          </StoryCell>
        </StoryGrid>
      </StorySection>
    );
  },
};
