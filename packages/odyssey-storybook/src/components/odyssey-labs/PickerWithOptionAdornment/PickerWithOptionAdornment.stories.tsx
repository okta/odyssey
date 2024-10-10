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
  adornmentSizeValues,
  AdornmentOptionType,
  PickerWithOptionAdornment,
  PickerWithOptionAdornmentProps,
} from "@okta/odyssey-react-mui/labs";
import { Meta, StoryObj } from "@storybook/react";
import {
  FolderIcon,
  GlobeIcon,
  SettingsIcon,
  SyncIcon,
  VideoIcon,
} from "@okta/odyssey-react-mui/icons";

import { fieldComponentPropsMetaData } from "../../../fieldComponentPropsMetaData";
import { MuiThemeDecorator } from "../../../../.storybook/components";
import PlaceholderLogo from "./PlaceholderLogo";

const optionsSmall = [
  {
    value: "a",
    label: "An Option label",
    // description: "Some optional descriptive text",
    adornment: <FolderIcon />,
  },
  {
    value: "fr",
    label: "The Option label",
    description: "Some optional descriptive text",
    adornment: <GlobeIcon />,
  },
  {
    value: "jp",
    label: "Another Option label",
    description: "Some optional descriptive text",
    adornment: <SettingsIcon />,
  },
  {
    value: "es",
    label: "This Option label",
    description: "Some optional descriptive text",
    adornment: <SyncIcon />,
  },
  {
    value: "image-as-logo",
    label: "The last Option label",
    description: "Some optional descriptive text.",
    adornment: <VideoIcon />,
  },
];

const optionsLarge = [
  {
    value: "a",
    label: "An Option label",
    description: "Some optional descriptive text",
    adornment: <PlaceholderLogo.One />,
  },
  {
    value: "fr",
    label: "The Option label",
    description: "Some optional descriptive text",
    adornment: <PlaceholderLogo.Two />,
  },
  {
    value: "jp",
    label: "Another Option label",
    description: "Some optional descriptive text",
    adornment: <PlaceholderLogo.Three />,
  },
  {
    value: "es",
    label: "This Option label",
    description: "Some optional descriptive text",
    adornment: <PlaceholderLogo.Four />,
  },
  {
    value: "image-as-logo",
    label: "The last Option label",
    description: "Some optional descriptive text.",
    adornment: <PlaceholderLogo.Five />,
  },
];

type PickerWithOptionAdornmentType = typeof PickerWithOptionAdornment<
  AdornmentOptionType,
  boolean,
  boolean
>;

const storybookMeta: Meta<PickerWithOptionAdornmentType> = {
  title: "Labs Components/Pickers/PickerWithOptionAdornment",
  component: PickerWithOptionAdornment,
  argTypes: {
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
    options: optionsSmall,
  },
  decorators: [MuiThemeDecorator],
  tags: ["autodocs"],
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

export const MultiSelect: StoryObj<PickerWithOptionAdornmentPropsType> = {
  args: {
    hasMultipleChoices: true,
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
