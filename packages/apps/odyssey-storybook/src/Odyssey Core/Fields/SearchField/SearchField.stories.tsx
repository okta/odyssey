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

import { SearchField, searchVariantValues } from "@okta/odyssey-react-mui";
import { Meta, StoryObj } from "@storybook/react-vite";
import { ChangeEvent, useCallback, useState } from "react";

import {
  staticBoardParameters,
  StoryCell,
  StoryContrastBoard,
  StoryRow,
  StorySection,
} from "../../../tools/boardStoryHelpers.js";
import { OdysseyStorybookThemeDecorator } from "../../../tools/OdysseyStorybookThemeDecorator.js";
import { fieldComponentPropsMetaData } from "../fieldComponentPropsMetaData.js";

const meta = {
  component: SearchField,
  decorators: [OdysseyStorybookThemeDecorator],
  tags: ["autodocs"],
  argTypes: {
    autoCompleteType: {
      control: "text",
      description:
        "This prop helps users to fill forms faster, especially on mobile devices. The name can be confusing, as it's more like an autofill. You can learn more about it [following the specification](https://html.spec.whatwg.org/multipage/form-control-infrastructure.html#autofill)",
      table: {
        type: {
          summary: "string",
        },
        defaultValue: {
          summary: undefined,
        },
      },
    },
    defaultValue: {
      control: "text",
      description:
        "The value of the `input` element. Use when the component is not controlled",
      table: {
        type: {
          summary: "string",
        },
        defaultValue: {
          summary: undefined,
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
    isFullWidth: fieldComponentPropsMetaData.isFullWidth,
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
      description: "Callback fired when the `input` element loses focus",
      table: {
        type: {
          summary: "function",
        },
      },
    },
    onClear: {
      description: "Callback fired when the clear button is pressed",
      table: {
        type: {
          summary: "function",
        },
      },
    },
    onChange: {
      description: "Callback fired when the value is changed",
      table: {
        type: {
          summary: "function",
        },
      },
    },
    onFocus: {
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
        "The value of the `input` element. Use when the component is controlled",
      table: {
        type: {
          summary: "string",
        },
        defaultValue: {
          summary: undefined,
        },
      },
    },
    variant: {
      options: searchVariantValues,
      control: { type: "radio" },
      description: "The color and style of the button",
      table: {
        type: {
          summary: searchVariantValues.join(" | "),
        },
        defaultValue: {
          summary: "outline",
        },
      },
      type: {
        required: true,
        name: "other",
        value: "radio",
      },
    },
  },
  args: {
    label: "Search",
    placeholder: "Search planets",
  },
} satisfies Meta<typeof SearchField>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Playground: Story = {
  args: {
    defaultValue: "",
  },
};

export const AllStates: Story = {
  parameters: staticBoardParameters,
  render: function C() {
    return (
      <StorySection title="Every variant, plus disabled and filled states.">
        <StoryRow>
          {searchVariantValues.map((variant) => (
            <StoryCell key={variant} label={variant}>
              <SearchField
                label="Search"
                placeholder="Search planets"
                variant={variant}
              />
            </StoryCell>
          ))}

          {searchVariantValues.map((variant) => (
            <StoryCell
              key={`${variant}-disabled`}
              label={`${variant} disabled`}
            >
              <SearchField
                isDisabled
                label="Search"
                placeholder="Search planets"
                variant={variant}
              />
            </StoryCell>
          ))}

          <StoryCell label="with value">
            <SearchField
              defaultValue="Jupiter"
              label="Search"
              variant="outline"
            />
          </StoryCell>
        </StoryRow>
      </StorySection>
    );
  },
};

export const Contrast: Story = {
  parameters: staticBoardParameters,
  render: function C() {
    return (
      <StorySection title="SearchField drops its border on a gray (highContrast) surface.">
        <StoryContrastBoard>
          <SearchField label="Search" placeholder="Search planets" />
        </StoryContrastBoard>
      </StorySection>
    );
  },
};

export const FullWidth: Story = {
  args: {
    isFullWidth: true,
  },
};

export const ControlledSearch: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "When the component is controlled, the parent component is responsible for managing the state of `SearchField`. `onChange` should be used to listen for component changes and to update the values in the `value` prop.",
      },
    },
  },
  args: {
    defaultValue: undefined,
  },
  render: function C(props) {
    const [constrolledValue, setControlledValue] = useState("Jupiter");
    const onChange = useCallback(
      (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
        setControlledValue(event.target.value),
      [],
    );

    const onClear = useCallback(() => {
      setControlledValue("");
    }, []);

    return (
      <SearchField
        {...props}
        onChange={onChange}
        onClear={onClear}
        value={constrolledValue}
      />
    );
  },
};
