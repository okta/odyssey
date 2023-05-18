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

import { Meta, Story } from "@storybook/react";
import {
  Button,
  Fieldset,
  Form,
  Infobox,
  TextField,
} from "@okta/odyssey-react-mui";
import { MuiThemeDecorator } from "../../../../.storybook/components";

import FormMdx from "./Form.mdx";

const storybookMeta: Meta = {
  title: `MUI Components/Forms/Form`,
  component: Form,
  parameters: {
    docs: {
      page: FormMdx,
    },
  },
  argTypes: {
    title: {
      control: "text",
      defaultValue: "Docking registration",
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
    formActions: {
      control: "text",
      defaultValue: (
        <>
          <Button text="Submit" />
          <Button variant="secondary" text="Reset" />
        </>
      ),
    },
    hasAutoComplete: {
      control: "boolean",
      defaultValue: undefined,
    },
    encodingType: {
      control: "text",
      defaultValue: undefined,
    },
    method: {
      control: "text",
      defaultValue: undefined,
    },
    noValidate: {
      control: "boolean",
      defaultValue: undefined,
    },
    target: {
      control: "text",
      defaultValue: undefined,
    },
    id: {
      control: "text",
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

const Template: Story = (args) => {
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
};

// States

export const Simple = Template.bind({});
Simple.args = {};

export const Fieldsets = Template.bind({});
Fieldsets.args = {
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
};

export const Description = Template.bind({});
Description.args = {
  description:
    "Before docking with the station, please register your ship and crew.",
};

export const Alert = Template.bind({});
Alert.args = {
  alert: (
    <Infobox severity="error" role="alert" title="Something's wrong">
      Something has gone horribly awry.
    </Infobox>
  ),
};

export const KitchenSink = Template.bind({});
KitchenSink.args = {
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
};
