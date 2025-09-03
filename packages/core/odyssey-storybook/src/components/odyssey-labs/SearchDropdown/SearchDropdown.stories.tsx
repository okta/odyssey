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
  FolderIcon,
  SettingsIcon,
  VideoIcon,
} from "@okta/odyssey-react-mui/icons";
import {
  AdornmentOptionType,
  adornmentSizeValues,
  CustomOptionType,
  SearchDropdown,
  SearchDropdownProps,
} from "@okta/odyssey-react-mui/labs";
import { Meta, StoryObj } from "@storybook/react";
import { expect, fn, screen, userEvent, within } from "@storybook/test";

import { fieldComponentPropsMetaData } from "../../../fieldComponentPropsMetaData.js";
import { pickerComponentPropsMetadata } from "../../../pickerComponentPropsMetadata.js";

const optionOnClick = fn();
const optionExtraOnClick = fn();

const optionsWithExtra: CustomOptionType[] = [
  {
    value: "an",
    label: "An Option label",
    adornment: <FolderIcon />,
    extra: {
      content: <SettingsIcon data-testid="option1-extra" />,
      onClick: optionExtraOnClick,
    },
    onClick: optionOnClick,
  },
  {
    value: "another",
    label: "Another Option label",
    description: "Some optional descriptive text",
    adornment: <SettingsIcon />,
    extra: {
      content: <VideoIcon />,
      onClick: optionExtraOnClick,
    },
    onClick: optionOnClick,
  },
  {
    value: "unselectable",
    label: "Unselectable Option",
    description: "Some optional descriptive text",
    isInteractive: false,
    adornment: <SettingsIcon data-testid="unselectable-extra" />,
    extra: {
      content: <VideoIcon />,
      onClick: optionExtraOnClick,
    },
    onClick: optionOnClick,
  },
];

type PickerWithOptionAdornmentType = typeof SearchDropdown<
  AdornmentOptionType,
  boolean,
  boolean
>;

const storybookMeta: Meta<PickerWithOptionAdornmentType> = {
  title: "Labs Components/SearchDropdown",
  component: SearchDropdown,
  argTypes: {
    ...(pickerComponentPropsMetadata as Partial<PickerWithOptionAdornmentType>),
    adornmentSize: {
      control: "radio",
      options: adornmentSizeValues,
      description:
        "Choose the size for the leading adornment. 'small' or 'large'",
      table: {
        type: {
          summary: adornmentSizeValues.join(" | "),
        },
      },
    },
    hint: fieldComponentPropsMetaData.hint,
    HintLinkComponent: fieldComponentPropsMetaData.HintLinkComponent,
  },
  args: {
    label: "Picker with option adornment label",
    hint: "Optional hint text for picker",
    options: optionsWithExtra,
  },
  tags: ["autodocs"],
};

export default storybookMeta;

type PickerWithOptionAdornmentPropsType = SearchDropdownProps<
  CustomOptionType,
  boolean | undefined,
  boolean | undefined
>;

export const SmallAdornmentWithExtra: StoryObj<PickerWithOptionAdornmentPropsType> =
  {
    args: {
      options: optionsWithExtra,
    },
    play: async ({ canvasElement, step }) => {
      const canvas = within(canvasElement);
      const comboBoxElement = canvas.getByRole<HTMLInputElement>("combobox");

      const clearMocks = () => {
        optionOnClick.mockClear();
        optionExtraOnClick.mockClear();
      };

      await step("Click on option triggers option onClick", async () => {
        clearMocks();
        await userEvent.click(comboBoxElement);
        const option = screen.getByText("An Option label");
        await userEvent.click(option);
        expect(optionOnClick).toBeCalled();
        expect(optionExtraOnClick).not.toBeCalled();
      });

      await step(
        "Click on option extra triggers option.extra onClick",
        async () => {
          clearMocks();
          const optionExtra = screen.getByTestId("option1-extra");
          await userEvent.click(optionExtra);
          expect(optionOnClick).not.toBeCalled();
          expect(optionExtraOnClick).toBeCalled();
        },
      );

      await step("Click on unselectable option not trigger onClick", () => {
        clearMocks();
        const unselectableOption = screen.getByText("Unselectable Option");
        expect(unselectableOption).toHaveStyle("pointer-events: none");
        const optionExtra = screen.getByTestId("unselectable-extra");
        expect(optionExtra).toHaveStyle("pointer-events: none");
      });
    },
  };

export const LargeAdornmentWithExtra: StoryObj<PickerWithOptionAdornmentPropsType> =
  {
    args: {
      adornmentSize: "large",
      options: optionsWithExtra,
    },
  };
