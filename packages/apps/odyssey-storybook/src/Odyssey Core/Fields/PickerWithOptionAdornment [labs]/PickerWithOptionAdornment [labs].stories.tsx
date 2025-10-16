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
  GlobeIcon,
  SettingsIcon,
  SyncIcon,
  VideoIcon,
} from "@okta/odyssey-react-mui/icons";
import {
  AdornmentOptionType,
  adornmentSizeValues,
  PickerWithOptionAdornment,
  PickerWithOptionAdornmentProps,
} from "@okta/odyssey-react-mui/labs";
import { Meta, StoryObj } from "@storybook/react";

import { OdysseyStorybookThemeDecorator } from "../../../tools/OdysseyStorybookThemeDecorator.js";
import { fieldComponentPropsMetaData } from "../fieldComponentPropsMetaData.js";
import { pickerComponentPropsMetadata } from "../pickerComponentPropsMetadata.js";
import PlaceholderLogo from "./PlaceholderLogo.js";

const optionsSmall = [
  {
    value: "an",
    label: "An Option label",
    description: "Some optional descriptive text",
    adornment: <FolderIcon />,
  },
  {
    value: "the",
    label: "The Option label",
    description:
      "Some optional descriptive text that in this particular case is really quite long and verbose and if this were real should probably be shortened.",
    adornment: <GlobeIcon />,
  },
  {
    value: "another",
    label: "Another Option label",
    description: "Some optional descriptive text",
    adornment: <SettingsIcon />,
  },
  {
    value: "this",
    label: "This Option label",
    description: "Some optional descriptive text",
    adornment: <SyncIcon />,
  },
  {
    value: "last",
    label: "The last Option label",
    description: "Some optional descriptive text.",
    adornment: <VideoIcon />,
  },
  {
    value: "image",
    label: "This adornment is an image",
    description: "Some optional descriptive text.",
    adornment: "https://placehold.co/400x600",
  },
];

const optionsLarge = [
  {
    value: "an",
    label: "An Option label",
    description: "Some optional descriptive text",
    adornment: <PlaceholderLogo.One />,
  },
  {
    value: "the",
    label: "The Option label",
    description: "Some optional descriptive text",
    adornment: <PlaceholderLogo.Two />,
  },
  {
    value: "another",
    label: "Another Option label",
    description:
      "Some optional descriptive text that in this particular case is really quite long and verbose and if this were real should probably be shortened.",
    adornment: <PlaceholderLogo.Three />,
  },
  {
    value: "this",
    label: "This Option label",
    description: "Some optional descriptive text",
    adornment: <PlaceholderLogo.Four />,
  },
  {
    value: "last",
    label: "The last Option label",
    description: "Some optional descriptive text.",
    adornment: <PlaceholderLogo.Five />,
  },
  {
    value: "image",
    label: "This adornment is an image",
    description: "Some optional descriptive text.",
    adornment: "https://placehold.co/400x600",
  },
];

type PickerWithOptionAdornmentType = typeof PickerWithOptionAdornment<
  AdornmentOptionType,
  boolean,
  boolean
>;

const storybookMeta: Meta<PickerWithOptionAdornmentType> = {
  component: PickerWithOptionAdornment,
  decorators: [OdysseyStorybookThemeDecorator],
  tags: ["autodocs"],
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
    options: optionsSmall,
  },
};

export default storybookMeta;

type PickerWithOptionAdornmentPropsType = PickerWithOptionAdornmentProps<
  AdornmentOptionType,
  boolean | undefined,
  boolean | undefined
>;

export const SmallAdornment: StoryObj<PickerWithOptionAdornmentPropsType> = {};

export const SmallAdornmentAndMetaData: StoryObj<PickerWithOptionAdornmentPropsType> =
  {
    args: {
      options: optionsSmall.map((option) => ({
        ...option,
        metaData: [
          {
            icon: <SettingsIcon />,
            detailText: "10",
          },
          {
            icon: <GlobeIcon />,
            detailText: "1",
          },
          {
            icon: <FolderIcon />,
            detailText: 40,
          },
        ],
      })),
    },
  };

export const LargeAdornment: StoryObj<PickerWithOptionAdornmentPropsType> = {
  args: {
    adornmentSize: "large",
    options: optionsLarge,
  },
};

export const LargeAdornmentAndMetaData: StoryObj<PickerWithOptionAdornmentPropsType> =
  {
    args: {
      adornmentSize: "large",
      options: optionsLarge.map((option) => ({
        ...option,
        metaData: [
          {
            icon: <SettingsIcon />,
            detailText: "10",
          },
          {
            icon: <GlobeIcon />,
            detailText: "1",
          },
          {
            icon: <FolderIcon />,
            detailText: 40,
          },
        ],
      })),
    },
  };

export const Disabled: StoryObj<PickerWithOptionAdornmentPropsType> = {
  args: {
    isDisabled: true,
    value: optionsSmall[0],
  },
};

export const SmallAdornmentMultiSelect: StoryObj<PickerWithOptionAdornmentPropsType> =
  {
    args: {
      hasMultipleChoices: true,
    },
  };

export const LargeAdornmentMultiSelect: StoryObj<PickerWithOptionAdornmentPropsType> =
  {
    args: {
      hasMultipleChoices: true,
      adornmentSize: "large",
      options: optionsLarge,
    },
  };

export const MultiSelectDisabled: StoryObj<PickerWithOptionAdornmentPropsType> =
  {
    args: {
      isDisabled: true,
      hasMultipleChoices: true,
      value: [optionsSmall[0], optionsSmall[1]],
    },
  };
