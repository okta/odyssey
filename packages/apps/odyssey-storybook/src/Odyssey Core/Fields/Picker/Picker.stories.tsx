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
} from "@okta/odyssey-react-mui/icons";
import {
  LabelDescription,
  LabelDescriptionMetadata,
  OptionLabelOnly,
  Picker,
  PickerProps,
} from "@okta/odyssey-react-mui/labs";
import { Meta, StoryObj } from "@storybook/react-vite";

import { StrictArgTypes } from "../../../../.storybook/types.js";
import { OdysseyStorybookThemeDecorator } from "../../../tools/OdysseyStorybookThemeDecorator.js";
import { pickerComponentPropsMetaData } from "../pickerComponentPropsMetaData.js";

const languagesNoDescription: OptionLabelOnly[] = [
  { value: "en", label: "English" },
  { value: "fr", label: "French" },
  { value: "es", label: "Spanish" },
  { value: "jp", label: "Japanese" },
];

const languagesNoMetadata: LabelDescription[] = [
  {
    value: "en",
    label: "English",
    description: "A description of the English language",
  },
  {
    value: "fr",
    label: "French",
    description: "Français",
  },
  {
    value: "jp",
    label: "Japanese",
    description: "日本語",
  },
  {
    value: "es",
    label: "Spanish",
    description: "Español",
  },
];

const languagesKitchenSink: LabelDescriptionMetadata[] = [
  {
    value: "en",
    label: "English",
    description: "A description of the English language",
    metaData: [
      {
        icon: <FolderIcon />,
        detailText: "1",
      },
    ],
  },
  {
    value: "fr",
    label: "French",
    description: "Français",
    metaData: [
      {
        icon: <SettingsIcon />,
        detailText: "100",
      },
    ],
  },
  {
    value: "jp",
    label: "Japanese",
    description: "日本語",
    metaData: [
      {
        icon: <GlobeIcon />,
        detailText: "1000",
      },
    ],
  },
  {
    value: "es",
    label: "Spanish",
    description: "Español",
    metaData: [
      {
        icon: <SettingsIcon />,
        detailText: "37",
      },
    ],
  },
];

type PickerOptionTypes =
  | OptionLabelOnly
  | LabelDescription
  | LabelDescriptionMetadata;
type StoryPickerProps<T extends PickerOptionTypes = PickerOptionTypes> =
  PickerProps<T, boolean, boolean>;
const argTypes: StrictArgTypes<StoryPickerProps> =
  pickerComponentPropsMetaData();

const meta = {
  component: Picker,
  decorators: [OdysseyStorybookThemeDecorator],
  tags: ["labs-export"],
  argTypes,
  args: {
    label: "Picker label",
    hint: "Optional hint text for picker",
    options: languagesNoDescription,
  },
} satisfies Meta<StoryPickerProps>;

export default meta;

type Story<T extends PickerOptionTypes = PickerOptionTypes> = StoryObj<
  StoryPickerProps<T>
>;

export const LabelOnly: Story = {};

export const WithDescription: Story = {
  args: {
    options: languagesNoMetadata,
  },
};

export const WithMetadata: Story = {
  args: {
    options: languagesKitchenSink,
  },
};

export const WithGroups: Story<Required<OptionLabelOnly>> = {
  args: {
    options: [
      { value: "en", label: "English", group: "Germanic Languages" },
      { value: "fr", label: "French", group: "Romance Languages" },
      { value: "es", label: "Spanish", group: "Romance Languages" },
      { value: "jp", label: "Japanese", group: "Japonic Languages" },
    ],
    groupOptionsBy: (option) => option.group,
  },
};

export const MultipleSelect: Story = {
  args: {
    hasMultipleChoices: true,
  },
};

export const Loading: Story = {
  args: {
    isLoading: true,
    options: [],
  },
};

export const Disabled: Story = {
  args: {
    isDisabled: true,
    value: languagesNoDescription[0],
  },
};
