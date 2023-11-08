/*!
 * Copyright (c) 2023-present, Okta, Inc. and/or its affiliates. All rights reserved.
 * The Okta software accompanied by this notice is provided pursuant to the Apache License, Version 2.0 (the "License.")
 *
 * You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0.
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *
 * See the License for the specific language governing permissions and limitations under the License.
 */

import { Meta, StoryObj } from "@storybook/react";
import {
  SearchField,
  SearchFieldProps,
} from "@okta/odyssey-react-mui";

import { fieldComponentPropsMetaData } from "../../../fieldComponentPropsMetaData";
import { MuiThemeDecorator } from "../../../../.storybook/components";

const storybookMeta: Meta<SearchFieldProps> = {
  title: "MUI Components/Forms/SearchField",
  component: SearchField,
  argTypes: {
    autoCompleteType: {
      control: "text",
      description:
        "This prop helps users to fill forms faster, especially on mobile devices. The name can be confusing, as it's more like an autofill. You can learn more about it [following the specification](https://html.spec.whatwg.org/multipage/form-control-infrastructure.html#autofill)",
      table: {
        type: {
          summary: "string",
        },
      },
    },
    hasInitialFocus: {
      control: "boolean",
      description: "If `true`, the component will receive focus automatically",
      table: {
        type: {
          summary: "boolean",
        },
      },
    },
    isDisabled: fieldComponentPropsMetaData.isDisabled,
    id: fieldComponentPropsMetaData.id,
    label: {
      control: "text",
      description:
        "This label won't show up visually, but it's required for accessibility",
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
    onBlur: {
      control: "function",
      description: "Callback fired when the `input` element loses focus",
      table: {
        type: {
          summary: "function",
        },
      },
    },
    onClear: {
      control: "function",
      description: "Callback fired when the clear button is pressed",
      table: {
        type: {
          summary: "function",
        },
      },
    },
    onChange: {
      control: "function",
      description: "Callback fired when the value is changed",
      table: {
        type: {
          summary: "function",
        },
      },
    },
    onFocus: {
      control: "function",
      description: "Callback fired when the `input` element gets focus",
      table: {
        type: {
          summary: "function",
        },
      },
    },
    placeholder: {
      control: "text",
      description:
        "The short hint displayed in the `input` before the user enters a value",
      table: {
        type: {
          summary: "string",
        },
      },
    },
    value: {
      control: "text",
      description:
        "The value of the `input` element, required for a controlled component",
      table: {
        type: {
          summary: "string",
        },
      },
    },
  },
  args: {
    label: "Search",
    placeholder: "Search planets",
  },
  decorators: [MuiThemeDecorator],
  tags: ["autodocs"],
};

export default storybookMeta;

export const Default: StoryObj<SearchFieldProps> = {};
