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

import type { Meta, StoryContext, StoryObj } from "@storybook/react";

import { SelectChangeEvent } from "@mui/material";
import { Link, Select, type SelectProps } from "@okta/odyssey-react-mui";
import { fn, screen, userEvent } from "@storybook/test";

import { OdysseyStorybookThemeDecorator } from "../../../tools/OdysseyStorybookThemeDecorator.js";
import { useStoryArgOrLocalState } from "../../../tools/useStoryArgOrLocalState.js";
import { fieldComponentPropsMetaData } from "../fieldComponentPropsMetaData.js";

const baseOptionLabels = [
  "Option A",
  "Option B",
  "Option C",
  "Option D",
  "Option E",
];

const baseValueControlOptions = ["None", ...baseOptionLabels] as const;

const baseValueControlMapping = baseValueControlOptions.reduce<
  Record<string, string>
>((accumulator, option) => {
  accumulator[option] = option === "None" ? "" : option;
  return accumulator;
}, {});

const groupedOptions: SelectProps<string | string[], boolean>["options"] = [
  { text: "Group 1", type: "heading" },
  "Option A",
  "Option B",
  "Option C",
  { text: "Group 2", type: "heading" },
  "Option D",
  "Option E",
];

const objectOptions: SelectProps<string | string[], boolean>["options"] = [
  { text: "Object option A", value: "option-a" },
  { text: "Object option B", value: "option-b" },
  { text: "Object option C", value: "option-c" },
];

const languageOptions = [
  { text: "English", value: "en", language: "en" },
  { text: "Español", value: "es", language: "es" },
  { text: "Français", value: "fr", language: "fr" },
  { text: "Deutsch", value: "de", language: "de" },
  { text: "中文", value: "zh", language: "zh" },
  { text: "日本語", value: "ja", language: "ja" },
  { text: "한국어", value: "ko", language: "ko" },
] satisfies SelectProps<string | string[], boolean>["options"];

type SelectStoryArgs = SelectProps<string | string[], boolean>;

const storybookMeta: Meta<typeof Select> = {
  component: Select,
  decorators: [OdysseyStorybookThemeDecorator],
  tags: ["autodocs"],
  argTypes: {
    ariaDescribedBy: {
      control: "text",
      description:
        "ID of the element that provides additional description for the field",
      table: {
        category: "Functional",
        type: {
          summary: "string",
        },
      },
    },
    defaultValue: {
      control: { type: "text" },
      description:
        "If `value` is undefined, the field is uncontrolled and `defaultValue` provides its initial text",
      table: {
        category: "Functional",
        type: {
          summary: "string | string[]",
        },
      },
    },
    errorMessage: fieldComponentPropsMetaData.errorMessage,
    errorMessageList: fieldComponentPropsMetaData.errorMessageList,
    hasMultipleChoices: {
      control: "boolean",
      description: "If `true`, the Select allows multiple selections",
      table: {
        readonly: true,
        category: "Functional",
        type: {
          summary: "boolean",
        },
        defaultValue: {
          summary: "false",
        },
      },
    },
    hint: fieldComponentPropsMetaData.hint,
    HintLinkComponent: fieldComponentPropsMetaData.HintLinkComponent,
    id: fieldComponentPropsMetaData.id,
    isDisabled: fieldComponentPropsMetaData.isDisabled,
    isFullWidth: fieldComponentPropsMetaData.isFullWidth,
    isOptional: fieldComponentPropsMetaData.isOptional,
    isReadOnly: fieldComponentPropsMetaData.isReadOnly,
    label: {
      control: "text",
      description: "The label text for the select component",
      table: {
        category: "Visual",
        type: {
          summary: "string",
        },
      },
      type: {
        name: "string",
        required: true,
      },
    },
    name: fieldComponentPropsMetaData.name,
    onBlur: {
      control: false,
      description: "Callback fired when the select component loses focus",
      table: {
        category: "Functional",
        type: {
          summary: "func",
        },
      },
    },
    onChange: {
      control: false,
      description:
        "Callback fired when the value of the select component changes",
      table: {
        category: "Functional",
        type: {
          summary: "func",
        },
      },
    },
    onFocus: {
      control: false,
      description: "Callback fired when the select component gains focus",
      table: {
        category: "Functional",
        type: {
          summary: "func",
        },
      },
    },
    options: {
      control: { type: "check" },
      description: "The options for the select component",
      options: baseOptionLabels,
      table: {
        category: "Visual",
        type: {
          summary: "(string | SelectOption)[]",
        },
      },
    },
    testId: {
      control: "text",
      description: "Adds `data-se` attribute",
      table: {
        category: "Functional",
        type: {
          summary: "string",
        },
      },
    },
    translate: {
      control: { type: "radio" },
      options: ["yes", "no"],
      description: "Sets the HTML `translate` attribute on the rendered field",
      table: {
        category: "Functional",
        type: {
          summary: '"yes" | "no"',
        },
      },
    },
    value: {
      control: { type: "radio" },
      options: baseValueControlOptions,
      mapping: baseValueControlMapping,
      description:
        "If `value` is provided, you control the input externally and must handle updates with `onChange`.",
      table: {
        category: "Functional",
        type: {
          summary: "string | string[]",
        },
      },
    },
  },
  args: {
    errorMessageList: [],
    hint: "Hint text",
    label: "Label",
    onBlur: fn(),
    onChange: fn(),
    onFocus: fn(),
    options: baseOptionLabels,
    isDisabled: false,
    isFullWidth: false,
    isOptional: false,
    hasMultipleChoices: false,
    value: "None",
  },
} satisfies Meta<typeof Select>;

export default storybookMeta;

type Story = StoryObj<typeof storybookMeta>;

const singleSelectTemplate: Pick<Story, "render" | "args" | "argTypes"> = {
  args: {
    hasMultipleChoices: false,
  },
  render: function RenderSingle(args, context) {
    const storyArgs = args as SelectStoryArgs;

    const { value, setValue } = useStoryArgOrLocalState<
      SelectStoryArgs,
      "value"
    >({
      args: storyArgs,
      context: context as StoryContext<SelectStoryArgs>,
      argKey: "value",
      defaultValue: typeof storyArgs.value === "string" ? storyArgs.value : "",
    });

    const handleChange = (event: SelectChangeEvent<string | string[]>) => {
      setValue(event.target.value);
    };

    return (
      <Select
        {...storyArgs}
        hasMultipleChoices={false}
        onChange={handleChange}
        value={value}
      />
    );
  },
};

const multiSelectTemplate: Pick<Story, "render" | "args" | "argTypes"> = {
  args: {
    hasMultipleChoices: true,
  },
  render: function RenderMulti(args, context) {
    const storyArgs = args as SelectStoryArgs;

    const { value, setValue } = useStoryArgOrLocalState<
      SelectStoryArgs,
      "value"
    >({
      args: storyArgs,
      context: context as StoryContext<SelectStoryArgs>,
      argKey: "value",
      defaultValue: Array.isArray(storyArgs.value) ? storyArgs.value : [],
    });

    const handleChange = (event: SelectChangeEvent<string | string[]>) => {
      setValue(event.target.value);
    };

    return (
      <Select
        {...storyArgs}
        hasMultipleChoices
        onChange={handleChange}
        value={value}
      />
    );
  },
};

export const Default: Story = {
  ...singleSelectTemplate,
  play: async ({ canvasElement, step }) => {
    await step("Select first option", async () => {
      const trigger = canvasElement.querySelector('[aria-haspopup="listbox"]');
      if (!trigger) {
        return;
      }

      await userEvent.click(trigger);
      const listbox = screen.getByRole("listbox");

      const firstOption = listbox.children[0];
      await userEvent.click(firstOption);
      await userEvent.tab();
    });
  },
  tags: ["!autodocs"],
};

export const Disabled: Story = {
  ...singleSelectTemplate,
  args: {
    isDisabled: true,
  },
};

export const Error: Story = {
  ...singleSelectTemplate,
  args: {
    errorMessage: "Select an option.",
  },
};

export const ErrorsList: Story = {
  ...singleSelectTemplate,
  args: {
    errorMessage: "Select an option.",
    errorMessageList: ["Error A", "Error B"],
  },
};

export const FullWidth: Story = {
  ...singleSelectTemplate,
  args: {
    isFullWidth: true,
  },
};

export const HintLink: Story = {
  ...singleSelectTemplate,
  args: {
    HintLinkComponent: <Link href="#">Link</Link>,
  },
};

export const EmptyOption: Story = {
  ...singleSelectTemplate,
  args: {
    options: ["", ...baseOptionLabels],
    value: "None",
  },
  argTypes: {
    options: { control: false },
  },
  parameters: {
    docs: {
      description: {
        story:
          "Select supports an empty string entry so the first selection renders no visible value",
      },
    },
  },
};

export const OptionsObject: Story = {
  ...singleSelectTemplate,
  args: {
    options: objectOptions,
    value: "option-b",
  },
  argTypes: {
    options: { control: false },
    value: { control: false },
  },
  parameters: {
    docs: {
      description: {
        story:
          "Select supports passing option objects with distinct text and value properties",
      },
    },
  },
};

export const OptionsGrouped: Story = {
  ...singleSelectTemplate,
  args: {
    options: groupedOptions,
  },
  argTypes: {
    options: { control: false },
  },
  parameters: {
    docs: {
      description: {
        story:
          'Options marked with `type: "heading"` create non-selectable group labels',
      },
    },
  },
};

export const MultiSelect: Story = {
  ...multiSelectTemplate,
  args: {
    hasMultipleChoices: true,
    value: [],
  },
  argTypes: {
    value: { control: { type: "check" }, options: baseOptionLabels },
  },
  play: async ({ canvasElement, step }) => {
    await step("Select multiple options", async () => {
      const trigger = canvasElement.querySelector('[aria-haspopup="listbox"]');
      if (!trigger) {
        return;
      }

      await userEvent.click(trigger);
      const listbox = screen.getByRole("listbox");

      await userEvent.click(listbox.children[0]);
      await userEvent.click(listbox.children[1]);
      await userEvent.tab();
    });
  },
};

export const ReadOnly: Story = {
  ...singleSelectTemplate,
  args: {
    isReadOnly: true,
    value: "Option C",
  },
};

export const ReadOnlyMultiSelect: Story = {
  ...multiSelectTemplate,
  args: {
    hasMultipleChoices: true,
    isReadOnly: true,
    value: ["Option A", "Option C", "Option D"],
  },
  argTypes: {
    value: { control: { type: "check" }, options: baseOptionLabels },
  },
};

export const ReadOnlyMultiSelectValue: Story = {
  ...multiSelectTemplate,
  args: {
    hasMultipleChoices: true,
    isReadOnly: true,
    value: ["Option B", "Option E"],
  },
  argTypes: {
    value: { control: { type: "check" }, options: baseOptionLabels },
  },
};

export const MultipleLanguages: Story = {
  ...singleSelectTemplate,
  args: {
    label: "Label",
    options: languageOptions,
    value: "",
  },
  argTypes: {
    options: { control: false },
  },
  parameters: {
    docs: {
      description: {
        story:
          "Showcase the Select component with options for multiple different languages",
      },
    },
  },
};

export const Uncontrolled: Story = {
  args: {
    defaultValue: "Option B",
    value: undefined,
    label: "Label",
    options: baseOptionLabels,
  },
  argTypes: {
    value: { control: false },
    defaultValue: { control: { type: "radio" }, options: baseOptionLabels },
  },
  parameters: {
    docs: {
      description: {
        story:
          "Use the uncontrolled pattern for simple forms where you do not need to react to user selection changes",
      },
    },
  },
  render: (args) => <Select {...(args as SelectStoryArgs)} />,
};

export const UncontrolledMultiSelect: Story = {
  args: {
    defaultValue: ["Option B", "Option C"],
    hasMultipleChoices: true,
    value: undefined,
    label: "Label",
    options: baseOptionLabels,
  },
  argTypes: {
    value: { control: false },
    defaultValue: { control: { type: "check" }, options: baseOptionLabels },
  },
  render: (args) => <Select {...(args as SelectStoryArgs)} />,
};
