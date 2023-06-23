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
  Checkbox,
  CheckboxGroup,
  Fieldset,
  Form,
  FormProps,
  Infobox,
  Link,
  TextField,
  Typography,
} from "@okta/odyssey-react-mui";
import { MuiThemeDecorator } from "../../../../.storybook/components";

const storybookMeta: Meta<FormProps> = {
  title: "MUI Components/Forms/Form",
  component: Form,
  argTypes: {
    title: {
      control: "text",
      description: "The title of the Form",
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
      description: "Field or FieldSet components within the Form",
      table: {
        type: {
          summary: "ReactElement | Array<ReactElement>",
        },
      },
    },
    alert: {
      control: null,
      description: "An Infobox indicating a Form-wide error or status update",
      table: {
        type: {
          summary: "ReactElement<typeof Infobox>",
        },
      },
    },
    hasAutoComplete: {
      options: ["on", "off"],
      control: { type: "radio" },
      description:
        "Indicates whether input elements can have their values automatically completed by the browser",
      table: {
        type: {
          summary: '"on" | "off" | undefined',
        },
      },
    },
    name: {
      control: "text",
      description:
        "The name of the form. The value must not be an empty string and must be unique among the form elements",
      table: {
        type: {
          summary: "string",
        },
      },
    },
    noValidate: {
      control: "boolean",
      description:
        "This Boolean attribute indicates that the form shouldn't be validated when submitted",
      table: {
        type: {
          summary: "boolean",
        },
      },
    },
    encodingType: {
      options: [
        "application/x-www-form-urlencoded",
        "multipart/form-data",
        "text/plain",
      ],
      control: { type: "radio" },
      description:
        "If the method attribute is set to 'post', the MIME type of the form submission",
      table: {
        type: {
          summary:
            '"application/x-www-form-urlencoded" | "multipart/form-data" | "text/plain" | undefined',
        },
      },
    },
    method: {
      options: ["post", "get", "dialog"],
      control: { type: "radio" },
      description: "The HTTP method to submit the form with",
      table: {
        type: {
          summary: '"post" | "get" | "dialog" | undefined',
        },
      },
    },
    target: {
      options: ["post", "get", "dialog"],
      control: { type: "radio" },
      description:
        "Indicates where to display the response after submitting the form",
      table: {
        type: {
          summary: '"post" | "get" | "dialog" | undefined',
        },
      },
    },
    formActions: {
      control: "obj",
      description: "One or more Buttons that conclude the form.",
      table: {
        type: {
          summary:
            "ReactElement<typeof Button> | Array<ReactElement<typeof Button>>",
        },
      },
    },
    id: {
      control: "text",
      description: "Defines a unique identifier (ID) for the Form",
      table: {
        type: {
          summary: "string",
        },
      },
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
  tags: ["autodocs"],
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
          description="Taylor sat back in his chair reading the morning newspaper. The warm kitchen and the smell of coffee blended with the comfort of not having to go to work. This was his Rest Period, the first for a long time, and he was glad of it. He folded the second section back, sighing with contentment."
        >
          <TextField
            label="Name of vessel"
            errorMessage="This field is required."
          />
          <CheckboxGroup label="Systems check" isRequired>
            <Checkbox
              label="Life support"
              name="life-support"
              value="life-support"
            />
            <Checkbox
              label="Warp core containment"
              name="warp-core"
              value="warp-core"
            />
            <Checkbox
              label="Cetacean ops"
              name="cetacean-ops"
              value="cetacean-ops"
            />
          </CheckboxGroup>
        </Fieldset>
        <Fieldset
          legend="Passenger information"
          name="passengers"
          description="This information will be used to track your passengers' whereabouts."
          alert={
            <Infobox severity="error" role="alert" title="Standby for boarding">
              <Typography paragraph>
                There is an issue with the fuel mixture ratios. Reconfigure the
                fuel mixture and perform the safety checks again.
              </Typography>

              <Link href="#" variant="monochrome">
                Visit fueling console
              </Link>
            </Infobox>
          }
        >
          <TextField
            label="Number of passengers"
            hint="Specify your destination within the Sol system."
          />
          <TextField label="Captain's name" />
        </Fieldset>
      </>
    ),
    description:
      "Before docking with the station, please register your ship and crew.",
  },
};
