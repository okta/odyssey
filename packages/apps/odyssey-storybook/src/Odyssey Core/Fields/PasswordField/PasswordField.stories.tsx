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

import {
  deepmerge,
  PasswordField,
  PasswordFieldProps,
  Stack,
} from "@okta/odyssey-react-mui";
import { Meta, StoryObj } from "@storybook/react-vite";
import { ChangeEvent } from "react";
import { action } from "storybook/actions";
import { useCallback } from "storybook/preview-api";

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
  component: PasswordField,
  decorators: [OdysseyStorybookThemeDecorator],
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
    hasShowPassword: {
      control: "boolean",
      description: "If `true`, the show/hide eye icon is not shown to the user",
      table: {
        category: "Visual",
        type: {
          summary: "boolean",
        },
        defaultValue: {
          summary: "true",
        },
      },
    },
    showPasswordToggleAriaLabel: {
      control: "text",
      description:
        "Stable accessible name for the password visibility toggle. Override per instance when a page has more than one `PasswordField` so screen-reader users can tell the toggles apart. The name does not change on toggle — `aria-pressed` conveys the show/hide state.",
      table: {
        category: "Functional",
        type: {
          summary: "string",
        },
      },
    },
    hint: fieldComponentPropsMetaData.hint,
    id: fieldComponentPropsMetaData.id,
    isDisabled: fieldComponentPropsMetaData.isDisabled,
    isFullWidth: fieldComponentPropsMetaData.isFullWidth,
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
    autoCompleteType: "current-password",
    hasShowPassword: true,
    id: "password-input",
    isOptional: false,
    label: "Password",
    onBlur: action("onBlur"),
    onChange: action("onChange"),
    onFocus: action("onFocus"),
    value: "",
  },
} satisfies Meta<typeof PasswordField>;

export default meta;

type Story = StoryObj<typeof meta>;

const PasswordFieldTemplate: Story = {
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
      PasswordFieldProps,
      "value"
    >({
      args,
      argKey: "value",
      context,
      defaultValue: args.value ?? "",
    });

    const handleChange = useCallback(
      (event: ChangeEvent<HTMLInputElement>) => {
        setValue(event.target.value);
      },
      [setValue],
    );

    return <PasswordField {...props} onChange={handleChange} value={value} />;
  },
};

export const Playground: Story = {
  ...deepmerge(PasswordFieldTemplate, {
    args: {
      value: "password",
    },
  }),
};

export const CustomToggleAriaLabels: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "When a page has more than one `PasswordField`, give each visibility toggle a distinct, stable accessible name via `showPasswordToggleAriaLabel` so screen-reader users can tell them apart. The name does not change on toggle — `aria-pressed` conveys the show/hide state.",
      },
    },
  },
  render: function C() {
    return (
      <Stack spacing={2}>
        <PasswordField
          autoCompleteType="new-password"
          label="Password"
          showPasswordToggleAriaLabel="Show entered password"
        />
        <PasswordField
          autoCompleteType="new-password"
          label="Re-enter password"
          showPasswordToggleAriaLabel="Show re-entered password"
        />
      </Stack>
    );
  },
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
    defaultValue: "Initial password",
    value: undefined,
  },
  argTypes: {
    value: { control: false },
  },
  render: (props) => {
    const { value, ...rest } = props;
    void value;
    return <PasswordField {...rest} />;
  },
};

export const AllStates: Story = {
  parameters: staticBoardParameters,
  render: function C() {
    return (
      <StorySection title="Every prop-driven state a PasswordField can render.">
        <StoryGrid columns={3}>
          <StoryCell label="default">
            <PasswordField label="Password" />
          </StoryCell>

          <StoryCell label="disabled">
            <PasswordField
              defaultValue="password"
              isDisabled
              label="Password"
            />
          </StoryCell>

          <StoryCell label="read-only">
            <PasswordField
              defaultValue="password"
              isReadOnly
              label="Password"
            />
          </StoryCell>

          <StoryCell label="optional">
            <PasswordField isOptional label="Password" />
          </StoryCell>

          <StoryCell label="error">
            <PasswordField errorMessage="Error Message" label="Password" />
          </StoryCell>

          <StoryCell label="errors list">
            <PasswordField
              errorMessage="Error Message"
              errorMessageList={["Error A"]}
              label="Password"
            />
          </StoryCell>

          <StoryCell label="hint">
            <PasswordField hint="Hint text" label="Password" />
          </StoryCell>

          <StoryCell label="no show password toggle">
            <PasswordField hasShowPassword={false} label="Password" />
          </StoryCell>

          <StoryCell label="focused">
            <PasswordField hasInitialFocus label="Password" />
          </StoryCell>
        </StoryGrid>
      </StorySection>
    );
  },
};
