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
import { NativeSelect, Link } from "@okta/odyssey-react-mui";

import { fieldComponentPropsMetaData } from "../../../fieldComponentPropsMetaData";
import { MuiThemeDecorator } from "../../../../.storybook/components";
import { useCallback, useState } from "react";
import { SelectChangeEvent } from "@mui/material";

const storybookMeta: Meta<typeof NativeSelect> = {
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
          summary: "string | string[] | undefined",
        },
      },
    },
    errorMessage: fieldComponentPropsMetaData.errorMessage,
    errorMessageList: fieldComponentPropsMetaData.errorMessageList,
    hasVisibleLabel: fieldComponentPropsMetaData.hasVisibleLabel,
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
        type: {
          summary: "boolean",
        },
        defaultValue: {
          summary: false,
        },
      },
    },
    isOptional: fieldComponentPropsMetaData.isOptional,
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
    defaultValue: "",
  },
  decorators: [MuiThemeDecorator],
  tags: ["autodocs"],
};

export default storybookMeta;

const Template: StoryObj<typeof NativeSelect> = {
  render: function C(args) {
    return (
      <NativeSelect
        {...args}
        id={args.id}
        label={args.label}
        hint={args.hint}
        defaultValue={args.defaultValue}
        errorMessage={args.errorMessage}
        errorMessageList={args.errorMessageList}
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

const GroupTemplate: StoryObj<typeof NativeSelect> = {
  render: function C(args) {
    return (
      <NativeSelect
        {...args}
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

export const Default: StoryObj<typeof NativeSelect> = {
  ...Template,
};

export const DefaultDisabled: StoryObj<typeof NativeSelect> = {
  ...Template,
  args: {
    isDisabled: true,
  },
};

export const NoVisibleLabel: StoryObj<typeof NativeSelect> = {
  ...Template,
  args: {
    hasVisibleLabel: false,
  },
};

export const DefaultError: StoryObj<typeof NativeSelect> = {
  ...Template,
  args: {
    errorMessage: "Select your destination.",
  },
};

export const ErrorsList: StoryObj<typeof NativeSelect> = {
  ...Template,
  args: {
    errorMessage: "Select your destination.",
    errorMessageList: ["Select 1 planet", "Select 1 moon"],
  },
};

export const DefaultGrouped: StoryObj<typeof NativeSelect> = {
  ...GroupTemplate,
};

export const Multi: StoryObj<typeof NativeSelect> = {
  ...Template,
  args: {
    hasMultipleChoices: true,
    defaultValue: [],
  },
};

export const Optional: StoryObj<typeof NativeSelect> = {
  ...Template,
  args: {
    isOptional: true,
  },
};

export const HintLink: StoryObj<typeof NativeSelect> = {
  ...Template,
  args: {
    HintLinkComponent: <Link href="/learn-more">Learn more</Link>,
  },
};

export const Controlled: StoryObj<typeof NativeSelect> = {
  parameters: {
    docs: {
      description: {
        story:
          "When the component is controlled, the parent component is responsible for passing `value` to the component and listening for changes with `onChange`",
      },
    },
  },
  args: {},
  render: function C(args) {
    const [localValue, setLocalValue] = useState("");
    const onChange = useCallback(
      (event: SelectChangeEvent<string | string[]>) =>
        setLocalValue(event.target.value as string),
      [],
    );
    return (
      <NativeSelect
        {...args}
        value={localValue}
        onChange={onChange}
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

export const ControlledMultiselect: StoryObj<typeof NativeSelect> = {
  parameters: {
    docs: {
      description: {
        story:
          "When the component is controlled, the parent component is responsible for passing `value` to the component and listening for changes with `onChange`",
      },
    },
  },
  render: function C(args) {
    const [localValue, setLocalValue] = useState([""]);
    const onChange = useCallback(
      (event: SelectChangeEvent<string | string[]>) => {
        // We need to fix the typing issue here to get the options from the event target
        const options = (
          event as unknown as React.ChangeEvent<HTMLSelectElement>
        ).target.options;
        const selectedOptions: string[] = [...options]
          .filter((option) => option.selected)
          .map((selectedOption) => selectedOption.value);
        setLocalValue(selectedOptions);
      },
      [],
    );
    return (
      <NativeSelect
        {...args}
        defaultValue={undefined}
        hasMultipleChoices={true}
        value={localValue}
        onChange={onChange}
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

export const ControlledPreselected: StoryObj<typeof NativeSelect> = {
  parameters: {
    docs: {
      description: {
        story:
          "When the component is controlled, the parent component is responsible for passing `value` to the component and listening for changes with `onChange`",
      },
    },
  },
  args: {},
  render: function C(args) {
    const [localValue, setLocalValue] = useState("Laconia");
    const onChange = useCallback(
      (event: SelectChangeEvent<string | string[]>) =>
        setLocalValue(event.target.value as string),
      [],
    );
    return (
      <NativeSelect
        {...args}
        value={localValue}
        onChange={onChange}
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

export const ControlledPreselectedMultiselect: StoryObj<typeof NativeSelect> = {
  parameters: {
    docs: {
      description: {
        story:
          "When the component is controlled, the parent component is responsible for passing `value` to the component and listening for changes with `onChange`.\n\nPreselected values are referenced by the value of the `value` attritube on `option` elements.",
      },
    },
  },
  render: function C(args) {
    const [localValue, setLocalValue] = useState(["laconia", "new-terra"]);
    const onChange = useCallback(
      (event: SelectChangeEvent<string | string[]>) => {
        // We need to fix the typing issue here to get the options from the event target
        const options = (
          event as unknown as React.ChangeEvent<HTMLSelectElement>
        ).target;
        const selectedOptions: string[] = [...options]
          .filter((option) => option.selected)
          .map((selectedOption) => selectedOption.value);
        setLocalValue(selectedOptions);
      },
      [],
    );
    return (
      <NativeSelect
        {...args}
        defaultValue={undefined}
        hasMultipleChoices={true}
        value={localValue}
        onChange={onChange}
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
