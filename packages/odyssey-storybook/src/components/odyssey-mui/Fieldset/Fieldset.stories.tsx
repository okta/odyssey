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
  Infobox,
  TextField,
} from "@okta/odyssey-react-mui";
import { MuiThemeDecorator } from "../../../../.storybook/components";

const storybookMeta: Meta = {
  title: "MUI Components/Forms/Fieldset",
  component: Fieldset,
  argTypes: {
    legend: {
      control: "text",
      defaultValue: "Ship registration information",
    },
    alert: {
      control: "text",
      defaultValue: undefined,
    },
    children: {
      control: "text",
      defaultValue: (
        <>
          <TextField label="Name of vessel" />
          <TextField isMultiline label="Nature of visit" />
        </>
      ),
    },
    description: {
      control: "text",
      defaultValue: undefined,
    },
    id: {
      control: "text",
      defaultValue: undefined,
    },
    isDisabled: {
      control: "boolean",
      defaultValue: undefined,
    },
    name: {
      control: "text",
      defaultValue: undefined,
    },
  },
  decorators: [MuiThemeDecorator],
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
  args: {
    children: (
      <>
        <TextField label="Name of vessel" />
        <TextField isMultiline label="Nature of visit" />
      </>
    ),
  },
};

// States

export const Simple: StoryObj<FieldsetProps> = {
  ...Template,
};

export const Description: StoryObj<FieldsetProps> = {
  ...Template,
  args: {
    description:
      "Before docking with the station, please register your ship and crew.",
  },
};

export const Alert: StoryObj<FieldsetProps> = {
  ...Template,
  args: {
    alert: (
      <Infobox severity="error" role="alert" title="Something's wrong">
        Something has gone horribly awry.
      </Infobox>
    ),
  },
};
