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
  GroupPicker,
  GroupPickerProps,
  GroupPickerOptionType,
} from "@okta/odyssey-react-mui/labs";

import { Meta, StoryObj } from "@storybook/react";

import demoImage from "./demo.png";

const stations: ReadonlyArray<GroupPickerOptionType> = [
  { id: "en", name: "English", description: "", logo: demoImage },
  {
    id: "fr",
    name: "French",
    description: "Français",
    logo: "",
    usersCount: 100,
    appsCount: 200,
  },
  {
    id: "jp",
    name: "Japanese",
    description: "日本語",
    logo: demoImage,
    usersCount: 0,
    appsCount: 0,
  },
  {
    id: "es",
    name: "Spanish",
    description: "Español",
    logo: demoImage,
    usersCount: 101,
    appsCount: 202,
    groupPushMappingsCount: 303,
  },
];

const storybookMeta: Meta<typeof GroupPicker> = {
  title: "Labs Components/GroupPicker",
  component: GroupPicker,
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
    hint: {
      control: "text",
      description: "The hint text for the autocomplete input",
      table: {
        type: {
          summary: "string",
        },
      },
    },
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
      description: "Disables the autocomplete input",
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
      description: "Makes the autocomplete input read-only",
      table: {
        type: {
          summary: "boolean",
        },
      },
    },
    label: {
      control: "text",
      description: "The label text for the autocomplete input",
      table: {
        type: {
          summary: "string",
        },
      },
    },
    onChange: {
      description:
        "Callback fired when the value of the autocomplete input changes",
      table: {
        type: {
          summary: "func",
        },
      },
    },
    onInputChange: {
      description:
        "Callback fired when the input value of the autocomplete input changes",
      table: {
        type: {
          summary: "func",
        },
      },
    },
    options: {
      description: "The options for the autocomplete input",
      table: {
        type: {
          summary:
            "Array<OptionType> | GroupedOptionType<OptionType>[] | Promise<Array<OptionType> | GroupedOptionType<OptionType>[]>",
        },
      },
    },
    value: {
      description: "The value of the autocomplete input",
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
          summary: "false",
        },
      },
    },
  },
  args: {
    label: "Languages",
    hint: "Languages supported by the system",
    options: stations,
  },
  tags: ["autodocs"],
};

export default storybookMeta;

type GroupPickerPropsType = GroupPickerProps<
  GroupPickerOptionType | undefined,
  boolean | undefined,
  boolean | undefined
>;

export const GroupPickerDefault: StoryObj<GroupPickerPropsType> = {};

export const Multiple: StoryObj<GroupPickerPropsType> = {
  args: {
    hasMultipleChoices: true,
  },
};

export const Disabled: StoryObj<GroupPickerPropsType> = {
  args: {
    isDisabled: true,
    hasMultipleChoices: true,
    value: [
      { id: "en", name: "English", description: "", logo: demoImage },
      {
        id: "jp",
        name: "Japanese",
        description: "日本語",
        logo: demoImage,
        usersCount: 0,
        appsCount: 0,
      },
    ],
  },
};
