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
  Button,
  Fieldset,
  Form,
  FormProps,
  Infobox,
  TextField,
} from "@okta/odyssey-react-mui";
import { MuiThemeDecorator } from "../../../../.storybook/components";

const storybookMeta: Meta<FormProps> = {
  title: "MUI Components/Forms/Form",
  component: Form,
  argTypes: {
    title: {
      control: "text",
    },
    alert: {
      control: "text",
    },
    children: {
      control: "text",
    },
    description: {
      control: "text",
    },
    formActions: {
      control: "text",
    },
    hasAutoComplete: {
      control: "boolean",
    },
    encodingType: {
      control: "text",
    },
    method: {
      control: "text",
    },
    noValidate: {
      control: "boolean",
    },
    target: {
      control: "text",
    },
    id: {
      control: "text",
    },
    name: {
      control: "text",
    },
  },
  args: {
    title: "Docking registration",
    children: (
      <>
        <TextField label="Name of vessel" />
        <TextField isMultiline label="Nature of visit" />
      </>
    ),
    formActions: (
      <>
        <Button text="Submit" />
        <Button variant="secondary" text="Reset" />
      </>
    ),
  },
  decorators: [MuiThemeDecorator],
};

export default storybookMeta;

const Template: StoryObj<FormProps> = {
  render: function (args) {
    return (
      <Form
        title={args.title}
        name={args.name}
        description={args.description}
        formActions={args.formActions}
        alert={args.alert}
        hasAutoComplete={args.hasAutoComplete}
        encodingType={args.encodingType}
        method={args.method}
        noValidate={args.noValidate}
        target={args.target}
        id={args.id}
      >
        {args.children}
      </Form>
    );
  },
};

// States

export const Simple: StoryObj<FormProps> = {
  ...Template,
  args: {
    children: (
      <>
        <TextField label="Name of vessel" />
        <TextField isMultiline label="Nature of visit" />
      </>
    ),
  },
};

export const Fieldsets: StoryObj<FormProps> = {
  ...Template,
  args: {
    children: (
      <>
        <Fieldset legend="Vessel information" name="vessel">
          <TextField label="Name of vessel" />
          <TextField isMultiline label="Nature of visit" />
        </Fieldset>
        <Fieldset legend="Passenger information" name="passengers">
          <TextField label="Number of passengers" />
          <TextField label="Captain's name" />
        </Fieldset>
      </>
    ),
  },
};

export const Description: StoryObj<FormProps> = {
  ...Template,
  args: {
    description:
      "Before docking with the station, please register your ship and crew.",
  },
};

export const Alert: StoryObj<FormProps> = {
  ...Template,
  args: {
    alert: (
      <Infobox severity="error" role="alert" title="Something's wrong">
        Something has gone horribly awry.
      </Infobox>
    ),
  },
};

export const KitchenSink: StoryObj<FormProps> = {
  ...Template,
  args: {
    alert: (
      <Infobox severity="error" role="alert" title="Something's wrong">
        Something has gone horribly awry.
      </Infobox>
    ),
    children: (
      <>
        <Fieldset
          legend="Vessel information"
          name="vessel"
          description="This information helps us verify vessel ownership and origination."
        >
          <TextField label="Name of vessel" />
          <TextField isMultiline label="Nature of visit" />
        </Fieldset>
        <Fieldset
          legend="Passenger information"
          name="passengers"
          description="This information will be used to track your passengers' whereabouts."
          alert={
            <Infobox severity="error" role="alert" title="Standby for boarding">
              Your captain is a known space pirate. Your location has been
              reported to Station Control.
            </Infobox>
          }
        >
          <TextField label="Number of passengers" />
          <TextField label="Captain's name" />
        </Fieldset>
      </>
    ),
    description:
      "Before docking with the station, please register your ship and crew.",
  },
};
