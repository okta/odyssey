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

import { Meta, StoryObj } from "@storybook/react";
import {
  fieldComponentPropsStorybookMetaData,
  NativeSelect,
  NativeSelectProps,
} from "@okta/odyssey-react-mui";
import { MuiThemeDecorator } from "../../../../.storybook/components";

const storybookMeta: Meta<NativeSelectProps> = {
  title: "MUI Components/Forms/NativeSelect",
  component: NativeSelect,
  argTypes: {
    children: {
      control: null,
      description:
        "The options or optgroup elements within the native select component",
      table: {
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
        type: {
          summary: "string | undefined",
        },
      },
    },
    errorMessage: fieldComponentPropsStorybookMetaData.errorMessage,
    hint: fieldComponentPropsStorybookMetaData.hint,
    id: fieldComponentPropsStorybookMetaData.id,
    isDisabled: fieldComponentPropsStorybookMetaData.isDisabled,
    isMultiSelect: {
      control: "boolean",
      description:
        "If `true`, the native select component allows multiple selections",
      table: {
        type: {
          summary: "boolean",
        },
        defaultValue: {
          summary: false,
        },
      },
    },
    isOptional: fieldComponentPropsStorybookMetaData.isOptional,
    label: {
      control: "text",
      description: "The label text for the native select component",
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
    onBlur: {
      control: null,
      description:
        "Callback fired when the native select component loses focus",
      table: {
        type: {
          summary: "func",
        },
      },
    },
    onChange: {
      control: null,
      description:
        "Callback fired when the value of the native select component changes",
      table: {
        type: {
          summary: "func",
        },
      },
    },
    onFocus: {
      control: null,
      description:
        "Callback fired when the native select component gains focus",
      table: {
        type: {
          summary: "func",
        },
      },
    },
    value: {
      control: "text",
      description:
        "The value or values selected in the native select component",
      table: {
        type: {
          summary: "string | string[]",
        },
      },
    },
  },
  args: {
    isDisabled: false,
    hint: "Select your destination in the Sol system.",
    isOptional: false,
    label: "Destination",
    id: "SolarDestination",
  },
  decorators: [MuiThemeDecorator],
  tags: ["autodocs"],
};

export default storybookMeta;

const Template: StoryObj<NativeSelectProps> = {
  render: function C(args) {
    return (
      <NativeSelect
        id={args.id}
        label={args.label}
        hint={args.hint}
        defaultValue={args.defaultValue}
        errorMessage={args.errorMessage}
        isDisabled={args.isDisabled}
        isMultiSelect={args.isMultiSelect}
        isOptional={args.isOptional}
        children={
          <>
            <option value="earth">Earth</option>
            <option value="mars">Mars</option>
            <option value="ceres">Ceres</option>
            <option value="eros">Eros</option>
            <option value="tycho-station">Tycho Station</option>
            <option value="phoebe">Phoebe</option>
            <option value="ganymede">Ganymede</option>
          </>
        }
      />
    );
  },
};

const GroupTemplate: StoryObj<NativeSelectProps> = {
  render: function C(args) {
    return (
      <NativeSelect
        id={args.id}
        label={args.label}
        hint={args.hint}
        errorMessage={args.errorMessage}
        isDisabled={args.isDisabled}
        isMultiSelect={args.isMultiSelect}
        isOptional={args.isOptional}
        children={
          <>
            <optgroup label="Sol System">
              <option value="earth">Earth</option>
              <option value="mars">Mars</option>
              <option value="ceres">Ceres</option>
              <option value="eros">Eros</option>
              <option value="tycho-station">Tycho Station</option>
              <option value="phoebe">Phoebe</option>
              <option value="ganymede">Ganymede</option>
            </optgroup>
            <optgroup label="Extrasolar">
              <option value="auberon">Auberon</option>
              <option value="al-halub">Al-Halub</option>
              <option value="freehold">Freehold</option>
              <option value="laconia">Laconia</option>
              <option value="new-terra">New Terra</option>
            </optgroup>
          </>
        }
      />
    );
  },
};

export const Default: StoryObj<NativeSelectProps> = {
  ...Template,
};

export const DefaultDisabled: StoryObj<NativeSelectProps> = {
  ...Template,
  args: {
    isDisabled: true,
  },
};

export const DefaultError: StoryObj<NativeSelectProps> = {
  ...Template,
  args: {
    errorMessage: "Select your destination.",
  },
};

export const DefaultGrouped: StoryObj<NativeSelectProps> = {
  ...GroupTemplate,
};

export const Multi: StoryObj<NativeSelectProps> = {
  ...Template,
  args: {
    isMultiSelect: true,
  },
};
