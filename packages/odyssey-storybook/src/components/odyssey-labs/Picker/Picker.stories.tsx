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
  LabelDescriptionMetaData,
  Picker,
  PickerProps,
} from "@okta/odyssey-react-mui/labs";
import { Meta, StoryObj } from "@storybook/react";
import {
  FolderIcon,
  GlobeIcon,
  SettingsIcon,
  VideoIcon,
} from "@okta/odyssey-react-mui/icons";

import { fieldComponentPropsMetaData } from "../../../fieldComponentPropsMetaData";
import { MuiThemeDecorator } from "../../../../.storybook/components";

const languages = [
  { value: "en", label: "English", description: "", icon: <VideoIcon /> },
  {
    value: "fr",
    label: "French",
    description: "Français",
    metaData: [
      {
        icon: <SettingsIcon />,
        detailText: "10",
      },
    ],
  },
  {
    value: "jp",
    label: "Japanese",
    description: "日本語",
    metaData: [
      {
        icon: <SettingsIcon />,
        detailText: "10",
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
        detailText: "10",
      },
    ],
  },
  {
    value: "image-as-logo",
    label: "Image logo",
    description: "This option has an image for a logo",
  },
];

type PickerType = typeof Picker<
  LabelDescription | LabelDescriptionMetaData,
  boolean,
  boolean
>;

const storybookMeta: Meta<PickerType> = {
  title: "Labs Components/Pickers/Picker",
  component: Picker,
  argTypes: {
    hasMultipleChoices: {
      control: "boolean",
      description: "Enables multiple choice selection",
      table: {
        type: {
          summary: "boolean",
        },
      },
    },
    hint: fieldComponentPropsMetaData.hint,
    HintLinkComponent: fieldComponentPropsMetaData.HintLinkComponent,
    isCustomValueAllowed: {
      control: "boolean",
      description: "Allows the input of custom values",
      table: {
        type: {
          summary: "boolean",
        },
      },
    },
    isDisabled: {
      control: "boolean",
      description: "Disables the Picker input",
      table: {
        type: {
          summary: "boolean",
        },
      },
    },
    isLoading: {
      control: "boolean",
      description: "Displays a loading indicator",
      table: {
        type: {
          summary: "boolean",
        },
      },
    },
    isReadOnly: {
      control: "boolean",
      description: "Makes the Picker input read-only",
      table: {
        type: {
          summary: "boolean",
        },
      },
    },
    label: {
      control: "text",
      description: "The label text for the Picker input",
      table: {
        type: {
          summary: "string",
        },
      },
    },
    onChange: {
      control: null,
      description: "Callback fired when the value of the Picker input changes",
      table: {
        type: {
          summary: "func",
        },
      },
    },
    onInputChange: {
      control: null,
      description:
        "Callback fired when the input value of the Picker input changes",
      table: {
        type: {
          summary: "func",
        },
      },
    },
    options: {
      control: null,
      description: "The options for the Picker input",
      table: {
        type: {
          summary:
            "Array<OptionType> | GroupedOptionType<OptionType>[] | Promise<Array<OptionType> | GroupedOptionType<OptionType>[]>",
        },
      },
    },
    value: {
      control: null,
      description: "The value of the Picker input",
      table: {
        type: {
          summary: "OptionType | OptionType[]",
        },
      },
    },
    isOptional: {
      control: "boolean",
      table: {
        type: {
          summary: "boolean",
        },
        defaultValue: {
          summary: false,
        },
      },
    },
  },
  args: {
    label: "Languages",
    hint: "Languages supported by the system",
    options: languages,
  },
  decorators: [MuiThemeDecorator],
  tags: ["autodocs"],
};

export default storybookMeta;

type PickerPropsType = PickerProps<
  LabelDescription | LabelDescriptionMetaData,
  boolean | undefined,
  boolean | undefined
>;

export const PickerDefault: StoryObj<PickerPropsType> = {};

export const Multiple: StoryObj<PickerPropsType> = {
  args: {
    hasMultipleChoices: true,
  },
};

export const Disabled: StoryObj<PickerPropsType> = {
  args: {
    isDisabled: true,
    value: {
      value: "en",
      label: "English",
      description: "",
    },
  },
};

export const WithMetaData: StoryObj<PickerPropsType> = {
  args: {
    options: [
      {
        value: "en",
        label: "English",
        description: "",
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
      },
      {
        value: "es",
        label: "Spanish",
        description: "",
        metaData: [
          {
            icon: <SettingsIcon />,
            detailText: "10",
          },
        ],
      },
      {
        value: "image-as-logo",
        label: "Image logo",
        description: "This option has an image for a logo",
        metaData: [
          {
            icon: <SettingsIcon />,
            detailText: "10",
          },
        ],
      },
    ],
  },
};
