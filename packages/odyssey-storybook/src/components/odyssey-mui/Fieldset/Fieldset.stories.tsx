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
import {
  Fieldset,
  FieldsetProps,
  Callout,
  TextField,
} from "@okta/odyssey-react-mui";
import { MuiThemeDecorator } from "../../../../.storybook/components";

const storybookMeta: Meta = {
  title: "MUI Components/Forms/Fieldset",
  component: Fieldset,
  argTypes: {
    legend: {
      control: "text",
      description: "The title of the Fieldset",
      table: {
        type: {
          summary: "string",
        },
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
    children: {
      control: "obj",
      description: "Field components within the Fieldset",
      table: {
        type: {
          summary: "ReactElement | Array<ReactElement>",
        },
      },
    },
    alert: {
      control: null,
      description:
        "An Callout indicating a Fieldset-wide error or status update",
      table: {
        type: {
          summary: "ReactElement<typeof Callout>",
        },
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
    id: {
      control: "text",
      description: "Defines a unique identifier (ID) for the Fieldset",
      table: {
        type: {
          summary: "string",
        },
      },
    },
  },
  args: {
    legend: "Docking registration",
    children: (
      <>
        <TextField label="Vessel name" />
        <TextField isMultiline label="Reason for visit" />
      </>
    ),
  },
  decorators: [MuiThemeDecorator],
  tags: ["autodocs"],
};

export default storybookMeta;

const Template: StoryObj<FieldsetProps> = {
  render: function C(args) {
    return (
      <Fieldset
        legend={args.legend}
        name={args.name}
        description={args.description}
        alert={args.alert}
        id={args.id}
      >
        {args.children}
      </Fieldset>
    );
  },
};

// States

export const Simple: StoryObj<FieldsetProps> = {
  ...Template,
};

export const Description: StoryObj<FieldsetProps> = {
  ...Template,
  args: {
    description: "Register your ship before docking with the station.",
  },
};

export const Alert: StoryObj<FieldsetProps> = {
  ...Template,
  args: {
    alert: (
      <Callout severity="error" role="alert" title="Something went wrong">
        Please try your request again later.
      </Callout>
    ),
  },
};
