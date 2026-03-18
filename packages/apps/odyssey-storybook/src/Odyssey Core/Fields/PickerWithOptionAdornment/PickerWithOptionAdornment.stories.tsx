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
import { Meta, StoryObj } from "@storybook/react-vite";

import { StrictArgTypes } from "../../../../.storybook/types.js";
import { OdysseyStorybookThemeDecorator } from "../../../tools/OdysseyStorybookThemeDecorator.js";
import { pickerComponentPropsMetaData } from "../pickerComponentPropsMetaData.js";
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

type StoryPickerWithOptionAdornmentType<
  T extends AdornmentOptionType = AdornmentOptionType,
> = PickerWithOptionAdornmentProps<T, boolean, boolean>;

const argTypes: StrictArgTypes<StoryPickerWithOptionAdornmentType> = {
  ...pickerComponentPropsMetaData(true),
  adornmentSize: {
    control: "radio",
    options: adornmentSizeValues,
    description: "The size for the leading adornment.",
    table: {
      category: "Visual",
      defaultValue: { summary: "small" },
      type: {
        summary: adornmentSizeValues.join(" | "),
      },
    },
  },
};

const storybookMeta = {
  component: PickerWithOptionAdornment,
  decorators: [OdysseyStorybookThemeDecorator],
  argTypes,
  args: {
    label: "Picker with option adornment label",
    hint: "Optional hint text for picker",
    options: optionsSmall,
  },
  tags: ["labs-export"],
} satisfies Meta<StoryPickerWithOptionAdornmentType>;

export default storybookMeta;

type Story<T extends AdornmentOptionType = AdornmentOptionType> = StoryObj<
  StoryPickerWithOptionAdornmentType<T>
>;

export const SmallAdornment: Story = {};

export const SmallAdornmentAndMetaData: Story = {
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

export const LargeAdornment: Story = {
  args: {
    adornmentSize: "large",
    options: optionsLarge,
  },
};

export const LargeAdornmentAndMetaData: Story = {
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

export const WithGroups: Story = {
  args: {
    options: [
      {
        value: "an",
        label: "An Option label",
        description: "Some optional descriptive text",
        adornment: <FolderIcon />,
        group: "Icons",
      },
      {
        value: "the",
        label: "The Option label",
        description:
          "Some optional descriptive text that in this particular case is really quite long and verbose and if this were real should probably be shortened.",
        adornment: <GlobeIcon />,
        group: "Icons",
      },
      {
        value: "image",
        label: "This adornment is an image",
        description: "Some optional descriptive text.",
        adornment: "https://placehold.co/400x600",
        group: "Image Strings",
      },
    ],
    groupOptionsBy: (option) => option.group ?? "",
  },
};

export const Disabled: Story = {
  args: {
    isDisabled: true,
    value: optionsSmall[0],
  },
};

export const SmallAdornmentMultiSelect: Story = {
  args: {
    hasMultipleChoices: true,
  },
};

export const LargeAdornmentMultiSelect: Story = {
  args: {
    hasMultipleChoices: true,
    adornmentSize: "large",
    options: optionsLarge,
  },
};

export const MultiSelectDisabled: Story = {
  args: {
    isDisabled: true,
    hasMultipleChoices: true,
    value: [optionsSmall[0], optionsSmall[1]],
  },
};
