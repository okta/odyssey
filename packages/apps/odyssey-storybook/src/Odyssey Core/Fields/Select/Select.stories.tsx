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

import type { Meta, StoryContext, StoryObj } from "@storybook/react-vite";

import { SelectChangeEvent } from "@mui/material";
import { Link, Select, type SelectProps } from "@okta/odyssey-react-mui";
import { action } from "storybook/actions";
import { screen, userEvent, within } from "storybook/test";

import {
  staticBoardParameters,
  StoryCell,
  StoryContrastBoard,
  StoryGrid,
  StorySection,
} from "../../../tools/boardStoryHelpers.js";
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
    onBlur: action("onBlur"),
    onChange: action("onChange"),
    onFocus: action("onFocus"),
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

export const Playground: Story = {
  ...singleSelectTemplate,
  play: async ({ canvasElement, step }) => {
    await step("Open dropdown", async () => {
      const canvas = within(canvasElement);
      await userEvent.click(canvas.getByRole("combobox"));
    });
  },
  tags: ["!autodocs"],
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
  play: async ({ canvasElement, step }) => {
    await step("Open dropdown", async () => {
      const canvas = within(canvasElement);
      await userEvent.click(canvas.getByRole("combobox"));
    });
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
  play: async ({ canvasElement, step }) => {
    await step("Open dropdown", async () => {
      const canvas = within(canvasElement);
      await userEvent.click(canvas.getByRole("combobox"));
    });
  },
};

export const MultiSelect: Story = {
  ...multiSelectTemplate,
  parameters: {
    a11y: {
      config: {
        rules: [
          // MUI's multi-select renders per-option checkboxes without explicit
          // <label> elements — the label comes from the parent <li role="option">
          // via visual association. This is a MUI internals issue that cannot be
          // fixed without a MUI-level change.
          { id: "label", enabled: false },
        ],
      },
    },
  },
  args: {
    hasMultipleChoices: true,
    value: [],
  },
  argTypes: {
    value: { control: { type: "check" }, options: baseOptionLabels },
  },
  play: async ({ canvasElement, step }) => {
    await step("Select one option to show tag", async () => {
      const canvas = within(canvasElement);
      await userEvent.click(canvas.getByRole("combobox"));
      const listbox = screen.getByRole("listbox");
      await userEvent.click(
        within(listbox).getByRole("option", { name: "Option A" }),
      );
    });
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

export const AllStates: Story = {
  parameters: staticBoardParameters,
  render: function C() {
    return (
      <StorySection title="Every prop-driven state a Select can render.">
        <StoryGrid columns={3}>
          <StoryCell label="default">
            <Select
              label="Label"
              options={["Option A", "Option B", "Option C"]}
            />
          </StoryCell>

          <StoryCell label="disabled">
            <Select
              isDisabled
              label="Label"
              options={["Option A", "Option B", "Option C"]}
            />
          </StoryCell>

          <StoryCell label="read-only">
            <Select
              defaultValue="Option C"
              isReadOnly
              label="Label"
              options={["Option A", "Option B", "Option C"]}
            />
          </StoryCell>

          <StoryCell label="optional">
            <Select
              isOptional
              label="Label"
              options={["Option A", "Option B", "Option C"]}
            />
          </StoryCell>

          <StoryCell label="error">
            <Select
              errorMessage="Select an option."
              label="Label"
              options={["Option A", "Option B", "Option C"]}
            />
          </StoryCell>

          <StoryCell label="errors list">
            <Select
              errorMessage="Select an option."
              errorMessageList={["Error A", "Error B"]}
              label="Label"
              options={["Option A", "Option B", "Option C"]}
            />
          </StoryCell>

          <StoryCell label="hint">
            <Select
              hint="Hint text"
              label="Label"
              options={["Option A", "Option B", "Option C"]}
            />
          </StoryCell>

          <StoryCell label="hint with link">
            <Select
              hint="Hint text"
              HintLinkComponent={<Link href="#">Link</Link>}
              label="Label"
              options={["Option A", "Option B", "Option C"]}
            />
          </StoryCell>

          <StoryCell label="read-only multi-select">
            <Select
              defaultValue={["Option A", "Option C"]}
              hasMultipleChoices
              isReadOnly
              label="Label"
              options={["Option A", "Option B", "Option C", "Option D"]}
            />
          </StoryCell>

          {/* Non-Latin option text exercises the fonts and line metrics the
              Latin-only options never reach. */}
          <StoryCell label="non-Latin options">
            <Select defaultValue="ja" label="Label" options={languageOptions} />
          </StoryCell>
        </StoryGrid>

        <StoryGrid columns={1}>
          <StoryCell label="full width">
            <Select
              isFullWidth
              label="Label"
              options={["Option A", "Option B", "Option C"]}
            />
          </StoryCell>
        </StoryGrid>
      </StorySection>
    );
  },
};

export const Contrast: Story = {
  parameters: staticBoardParameters,
  render: function C() {
    return (
      <StorySection title="Selected chips in a multi-select shift shade with the surface contrast (white vs gray).">
        <StoryContrastBoard>
          <Select
            defaultValue={["Option A", "Option B", "Option C"]}
            hasMultipleChoices
            label="Label"
            options={["Option A", "Option B", "Option C", "Option D"]}
          />
        </StoryContrastBoard>
      </StorySection>
    );
  },
};
