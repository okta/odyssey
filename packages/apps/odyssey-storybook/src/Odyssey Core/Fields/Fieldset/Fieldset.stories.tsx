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
  Callout,
  Fieldset,
  FieldsetProps,
  TextField,
} from "@okta/odyssey-react-mui";
import { Meta, StoryObj } from "@storybook/react-vite";

import { OdysseyStorybookThemeDecorator } from "../../../tools/OdysseyStorybookThemeDecorator.js";

const meta = {
  component: Fieldset,
  decorators: [OdysseyStorybookThemeDecorator],
  tags: ["autodocs"],
  argTypes: {
    alert: {
      description:
        "A Callout indicating a Fieldset-wide error or status update",
      table: {
        type: {
          summary: "ReactElement<typeof Callout>",
        },
      },
    },
    children: {
      control: "object",
      description: "Field components within the Fieldset",
      table: {
        type: {
          summary: "ReactElement | Array<ReactElement>",
        },
      },
      type: {
        required: true,
        name: "other",
        value: "ReactElement | Array<ReactElement>",
      },
    },
    description: {
      control: "text",
      description: "A supplementary description",
      table: {
        type: {
          summary: "string",
        },
      },
    },
    id: {
      control: "text",
      description: "Defines a unique identifier (ID) for the Fieldset",
      table: {
        type: {
          summary: "string",
        },
      },
    },
    isDisabled: {
      control: "boolean",
      description: "Disables the component and any wrapped input fields.",
      table: {
        type: {
          summary: "boolean",
        },
      },
    },
    legend: {
      control: "text",
      description: "The title of the Fieldset",
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
    name: {
      control: "text",
      description: "The name associated with the group",
      table: {
        type: {
          summary: "string",
        },
      },
    },
  },
  args: {
    children: (
      <>
        <TextField label="Vessel name" />
        <TextField isMultiline label="Reason for visit" />
      </>
    ),
    legend: "Docking registration",
  },
} satisfies Meta<typeof Fieldset>;

export default meta;

type Story = StoryObj<FieldsetProps>;

export const Simple: Story = {};

export const Description: Story = {
  args: {
    description: "Register your ship before docking with the station.",
  },
};

export const Alert: Story = {
  args: {
    alert: (
      <Callout role="alert" severity="error" title="Something went wrong">
        Please try your request again later.
      </Callout>
    ),
  },
};

export const Disabled: Story = {
  args: {
    isDisabled: true,
  },
};
