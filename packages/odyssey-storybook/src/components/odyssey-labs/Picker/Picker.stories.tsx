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
  Picker,
} from "@okta/odyssey-react-mui/labs";
import { Meta, StoryObj } from "@storybook/react";
import {
  FolderIcon,
  GlobeIcon,
  SettingsIcon,
  VideoIcon,
} from "@okta/odyssey-react-mui/icons";

import { fieldComponentPropsMetaData } from "../../../fieldComponentPropsMetaData";
import { pickerComponentPropsMetadata } from "../../../pickerComponentPropsMetadata";
import { MuiThemeDecorator } from "../../../../.storybook/components";

const languagesNoDescription = [
  { value: "en", label: "English", description: "", icon: <VideoIcon /> },
  {
    value: "fr",
    label: "French",
  },
  {
    value: "jp",
    label: "Japanese",
  },
  {
    value: "es",
    label: "Spanish",
  },
];

const languagesNoMetadata = [
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

const languagesKitchenSink = [
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

type PickerType = typeof Picker<
  LabelDescription | LabelDescriptionMetadata,
  boolean,
  boolean
>;

const meta = {
  title: "Labs Components/Odyssey Pickers/Picker",
  component: Picker,
  argTypes: {
    ...(pickerComponentPropsMetadata as Partial<PickerType>),
    hint: fieldComponentPropsMetaData.hint,
    HintLinkComponent: fieldComponentPropsMetaData.HintLinkComponent,
  },
  args: {
    label: "Picker label",
    hint: "Optional hint text for picker",
    options: languagesNoDescription,
  },
  decorators: [MuiThemeDecorator],
  tags: ["autodocs"],
} satisfies Meta<typeof Picker>;

export default meta;

type Story = StoryObj<typeof meta>;

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

export const MultipleSelect: Story = {
  args: {
    hasMultipleChoices: true,
  },
};

export const Disabled: Story = {
  args: {
    isDisabled: true,
    value: languagesNoDescription[0],
  },
};
