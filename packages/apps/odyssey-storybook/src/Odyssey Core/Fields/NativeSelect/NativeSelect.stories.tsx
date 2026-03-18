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

import { SelectChangeEvent } from "@mui/material";
import { Link, NativeSelect, NativeSelectProps } from "@okta/odyssey-react-mui";
import { Meta, StoryObj } from "@storybook/react-vite";
import { fn } from "storybook/test";

import { OdysseyStorybookThemeDecorator } from "../../../tools/OdysseyStorybookThemeDecorator.js";
import { useStoryArgOrLocalState } from "../../../tools/useStoryArgOrLocalState.js";
import { fieldComponentPropsMetaData } from "../fieldComponentPropsMetaData.js";

const valueControlOptions = [
  "Option A",
  "Option B",
  "Option C",
  "Option D",
  "Option E",
];

const baseOptions = (
  <>
    {valueControlOptions.map((option) => (
      <option key={option} value={option}>
        {option}
      </option>
    ))}
  </>
);

const storybookMeta: Meta<typeof NativeSelect> = {
  component: NativeSelect,
  decorators: [OdysseyStorybookThemeDecorator],
  argTypes: {
    children: {
      control: false,
      description:
        "The options or optgroup elements within the native select component",
      table: {
        category: "Visual",
        type: {
          summary:
            "ReactElement<'option'> | ReactElement<'optgroup'> | undefined",
        },
      },
    },
    defaultValue: {
      control: "text",
      description:
        "The default value of the native select component. Only applicable if `value` is not provided",
      table: {
        category: "Functional",
        type: {
          summary: "string | string[] | undefined",
        },
      },
    },
    errorMessage: fieldComponentPropsMetaData.errorMessage,
    errorMessageList: fieldComponentPropsMetaData.errorMessageList,
    hint: fieldComponentPropsMetaData.hint,
    HintLinkComponent: fieldComponentPropsMetaData.HintLinkComponent,
    id: fieldComponentPropsMetaData.id,
    isDisabled: fieldComponentPropsMetaData.isDisabled,
    isFullWidth: fieldComponentPropsMetaData.isFullWidth,
    hasMultipleChoices: {
      control: "boolean",
      description:
        "If `true`, the native select component allows multiple selections",
      table: {
        readonly: true,
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
    label: {
      control: "text",
      description: "The label text for the native select component",
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
    onBlur: {
      control: false,
      description:
        "Callback fired when the native select component loses focus",
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
        "Callback fired when the value of the native select component changes",
      table: {
        category: "Functional",
        type: {
          summary: "func",
        },
      },
    },
    onFocus: {
      control: false,
      description:
        "Callback fired when the native select component gains focus",
      table: {
        category: "Functional",
        type: {
          summary: "func",
        },
      },
    },
    value: {
      control: { type: "radio" },
      options: valueControlOptions,
      description:
        "If `value` is provided, you control the field externally and must handle updates with `onChange`.",
      table: {
        category: "Functional",
        type: {
          summary: "string | string[]",
        },
      },
    },
  },
  args: {
    hasMultipleChoices: false,
    hint: "Hint text",
    id: "native-select",
    isDisabled: false,
    isFullWidth: false,
    isOptional: false,
    label: "Label",
    onBlur: fn(),
    onFocus: fn(),
    value: "Option A",
  },
};

export default storybookMeta;

type NativeSelectStoryArgs = NativeSelectProps<string | string[], boolean>;

const singleTemplate: StoryObj<typeof NativeSelect> = {
  args: {
    hasMultipleChoices: false,
  },
  render: function C(args, context) {
    const { value, setValue } = useStoryArgOrLocalState<
      NativeSelectStoryArgs,
      "value"
    >({
      args,
      context,
      argKey: "value",
      defaultValue: args.defaultValue ?? "",
    });

    const handleChange = (event: SelectChangeEvent<string | string[]>) => {
      const target = event.target as HTMLSelectElement;
      setValue(target.value);
    };

    return (
      <NativeSelect
        {...args}
        children={args.children ?? baseOptions}
        defaultValue={undefined}
        hasMultipleChoices={false}
        onChange={handleChange}
        value={value}
      />
    );
  },
};

const multiTemplate: StoryObj<typeof NativeSelect> = {
  args: {
    hasMultipleChoices: true,
    value: [],
  },
  render: function C(args, context) {
    const { value, setValue } = useStoryArgOrLocalState<
      NativeSelectStoryArgs,
      "value"
    >({
      args,
      context,
      argKey: "value",
      defaultValue: args.value ?? [],
    });

    const handleChange = (event: SelectChangeEvent<string | string[]>) => {
      const target = event.target as HTMLSelectElement;
      const selectedValues = Array.from(target.selectedOptions).map(
        (option) => option.value,
      );
      setValue(selectedValues);
    };

    return (
      <NativeSelect
        {...args}
        children={args.children ?? baseOptions}
        defaultValue={undefined}
        hasMultipleChoices
        onChange={handleChange}
        value={value}
      />
    );
  },
};

export const Default: StoryObj<typeof NativeSelect> = {
  ...singleTemplate,
  tags: ["!autodocs"],
};

export const Disabled: StoryObj<typeof NativeSelect> = {
  ...singleTemplate,
  args: {
    isDisabled: true,
  },
};

export const Error: StoryObj<typeof NativeSelect> = {
  ...singleTemplate,
  args: {
    errorMessage: "Select an option.",
  },
};

export const ErrorsList: StoryObj<typeof NativeSelect> = {
  ...singleTemplate,
  args: {
    errorMessage: "Select an option.",
    errorMessageList: ["Error A", "Error B"],
  },
};

export const Grouped: StoryObj<typeof NativeSelect> = {
  ...singleTemplate,
  args: {
    children: (
      <>
        <optgroup label="Group 1">
          <option value="Option A">Option A</option>
          <option value="Option B">Option B</option>
          <option value="Option C">Option C</option>
        </optgroup>
        <optgroup label="Group 2">
          <option value="Option D">Option D</option>
          <option value="Option E">Option E</option>
        </optgroup>
      </>
    ),
    value: "Option A",
  },
  argTypes: {
    children: { control: false },
  },
};

export const Multi: StoryObj<typeof NativeSelect> = {
  ...multiTemplate,
  argTypes: {
    value: { control: { type: "check" }, options: valueControlOptions },
  },
};

export const Optional: StoryObj<typeof NativeSelect> = {
  ...singleTemplate,
  args: {
    isOptional: true,
  },
};

export const HintLink: StoryObj<typeof NativeSelect> = {
  ...singleTemplate,
  args: {
    HintLinkComponent: <Link href="#link">Learn more</Link>,
  },
};

export const Uncontrolled: StoryObj<typeof NativeSelect> = {
  args: {
    defaultValue: "Option B",
    value: undefined,
  },
  argTypes: {
    value: { control: false },
    defaultValue: { control: { type: "radio" }, options: valueControlOptions },
  },
  parameters: {
    docs: {
      description: {
        story:
          "When the component is uncontrolled, it manages its own value. Provide `defaultValue` and omit `value`/`onChange` to let the component handle state internally.",
      },
    },
  },
  render: function UncontrolledStory(args) {
    return <NativeSelect {...args} children={baseOptions} />;
  },
};

export const UncontrolledMulti: StoryObj<typeof NativeSelect> = {
  args: {
    hasMultipleChoices: true,
    defaultValue: ["Option B", "Option C"],
    value: undefined,
  },
  argTypes: {
    value: { control: false },
    defaultValue: { control: { type: "check" }, options: valueControlOptions },
  },
  parameters: {
    docs: {
      description: {
        story:
          "When the component is uncontrolled, it manages its own value. Provide `defaultValue` and omit `value`/`onChange` to let the component handle state internally.",
      },
    },
  },
  render: function UncontrolledMultiStory(args) {
    return <NativeSelect {...args} children={baseOptions} />;
  },
};
