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
  LabelDescription,
  LabelDescriptionMetadata,
  OptionLabelOnly,
  PickerProps,
} from "@okta/odyssey-react-mui/labs";
import { ArgTypes } from "@storybook/react-vite";

import { pick } from "../../../.storybook/utils.js";
import { fieldComponentPropsMetaData } from "./fieldComponentPropsMetaData.js";
import { htmlPropsMetaData } from "./htmlPropsMetaData.js";

type PickerType = PickerProps<
  OptionLabelOnly | LabelDescription | LabelDescriptionMetadata,
  boolean,
  boolean
>;

const getOptionDescription = (hasAdornment = false) => {
  const adornmentProp = hasAdornment
    ? `\n  adornment: ReactNode | string;`
    : "";

  return `The array of options to be displayed in the dropdown.

<details>
<summary><strong>View Option Structure</strong></summary>

All options must have a \`label\` and \`value\`.

**1. Base Option**\n
\`\`\`javascript
{
  label: string;
  value: string | number;
  group?: string;${adornmentProp}
}
\`\`\`

**2. With Description**\n
\`\`\`JSON
{
  label: string;
  value: string | number;
  group?: string;
  description?: string;${adornmentProp}
}
\`\`\`

**3. With Metadata**\n
\`\`\`tsx
{
  label: string;
  value: string | number;
  group?: string;
  description?: string;${adornmentProp}
  metaData: {
    detailText: string;
    icon: ReactElement;
  }[];
}
\`\`\`

</details>`;
};

export const pickerComponentPropsMetaData = (
  hasAdornment = false,
): ArgTypes<Required<PickerType>> => ({
  ...fieldComponentPropsMetaData,
  ...pick(htmlPropsMetaData, ["ariaDescribedBy", "testId", "translate"]),
  // --- VISUAL PROPS ---
  label: {
    control: "text",
    description: "The label text displayed for the input field.",
    table: {
      category: "Visual",
      type: { summary: "string" },
    },
  },
  emptyOptionsText: {
    control: "text",
    description: "Text displayed when there are no options.",
    table: {
      category: "Visual",
      type: { summary: "string" },
      defaultValue: { summary: "No options" },
    },
  },
  isLoading: {
    control: "boolean",
    description: "If `true`, the component displays a loading indicator.",
    table: {
      category: "Visual",
      type: { summary: "boolean" },
      defaultValue: { summary: "false" },
    },
  },
  groupOptionsBy: {
    control: false,
    description:
      "If provided, the options will be grouped under the returned string. The returned value is used as the text for group headings.",
    table: {
      category: "Visual",
      type: {
        summary: "(option: Option) => string",
      },
    },
  },
  // --- FUNCTIONAL PROPS ---
  options: {
    control: "object",
    description: getOptionDescription(hasAdornment),
    table: {
      category: "Functional",
      type: { summary: "Option[]" },
    },
  },
  value: {
    control: "object",
    description:
      "The value of the autocomplete. Use this prop to control the component.",
    table: {
      category: "Functional",
      type: { summary: "Option | Option[] | null" },
    },
  },
  defaultValue: {
    control: "object",
    description: "The default value. Use when the component is not controlled.",
    table: {
      category: "Functional",
      type: { summary: "Option | Option[] | null" },
    },
  },
  inputValue: {
    control: "text",
    description:
      "The value of the text input. Use this to control the text value of the input element.",
    table: {
      category: "Functional",
      type: { summary: "string" },
    },
  },
  hasMultipleChoices: {
    control: "boolean",
    description:
      "If `true`, `value` must be an array and the menu will support multiple selections.",
    table: {
      category: "Functional",
      type: { summary: "boolean" },
      defaultValue: { summary: "false" },
    },
  },
  isCustomValueAllowed: {
    control: "boolean",
    description:
      "If `true`, the user is allowed to type arbitrary values that are not in the `options` array (Free Solo).",
    table: {
      category: "Functional",
      type: { summary: "boolean" },
      defaultValue: { summary: "false" },
    },
  },
  isVirtualized: {
    control: "boolean",
    description:
      "If `true`, the list of options will be virtualized to improve performance for large datasets.",
    table: {
      category: "Functional",
      type: { summary: "boolean" },
      defaultValue: { summary: "false" },
    },
  },
  getIsOptionEqualToValue: {
    control: false,
    description:
      "Used to determine if an option matches the current value. Uses strict equality by default.",
    table: {
      category: "Functional",
      type: { summary: "(option, value) => boolean" },
    },
  },
  onChange: {
    action: "changed",
    description: "Callback fired when the value changes.",
    table: {
      category: "Functional",
      type: { summary: "(event, value, reason, details) => void" },
    },
  },
  onInputChange: {
    action: "input changed",
    description: "Callback fired when the input value changes.",
    table: {
      category: "Functional",
      type: { summary: "(event, value, reason) => void" },
    },
  },
  onBlur: {
    action: "blurred",
    description: "Callback fired when the input element loses focus.",
    table: {
      category: "Functional",
      type: { summary: "FocusEventHandler" },
    },
  },
  onFocus: {
    action: "focused",
    description: "Callback fired when the input element gets focus.",
    table: {
      category: "Functional",
      type: { summary: "FocusEventHandler" },
    },
  },
});
