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
  formEncodingTypeValues,
  formAutoCompleteTypeValues,
  formMethodValues,
  Callout,
  Link,
  Paragraph,
  TextField,
} from "@okta/odyssey-react-mui";

import { MuiThemeDecorator } from "../../../../.storybook/components/index.js";
import { fieldComponentPropsMetaData } from "../../../fieldComponentPropsMetaData.js";

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
      control: "object",
      description: "Field or FieldSet components within the Form",
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
    alert: {
      description: "A Callout indicating a Form-wide error or status update",
      table: {
        type: {
          summary: "ReactElement<typeof Callout>",
        },
      },
    },
    autoCompleteType: {
      options: formAutoCompleteTypeValues,
      control: { type: "radio" },
      description:
        "Indicates whether input elements can have their values automatically completed by the browser",
      table: {
        type: {
          summary: formAutoCompleteTypeValues.join(" | "),
        },
      },
    },
    isFullWidth: fieldComponentPropsMetaData.isFullWidth,
    name: {
      control: "text",
      description:
        "The name of the form. The value must not be an empty string and must be unique among the form elements",
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
    noValidate: {
      control: "boolean",
      description:
        "This Boolean attribute indicates that the form shouldn't be validated when submitted",
      table: {
        type: {
          summary: "boolean",
        },
        defaultValue: {
          summary: "false",
        },
      },
    },
    encodingType: {
      options: formEncodingTypeValues,
      control: { type: "radio" },
      description:
        "If the method attribute is set to 'post', the MIME type of the form submission",
      table: {
        type: {
          summary: formEncodingTypeValues.join(" | "),
        },
      },
    },
    method: {
      options: formMethodValues,
      control: { type: "radio" },
      description: "The HTTP method to submit the form with",
      table: {
        type: {
          summary: formMethodValues.join(" | "),
        },
      },
    },
    target: {
      control: "text",
      description:
        "Indicates where to display the response after submitting the form",
      table: {
        type: {
          summary: "string",
        },
      },
    },
    formActions: {
      control: "object",
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
        <TextField label="Vessel name" />
        <TextField isMultiline label="Reason for visit" />
      </>
    ),
    formActions: (
      <>
        <Button label="Reset" variant="secondary" />
        <Button type="submit" label="Submit" variant="primary" />
      </>
    ),
  },
  decorators: [MuiThemeDecorator],
  tags: ["autodocs"],
};

export default storybookMeta;

// States

export const Simple: StoryObj<FormProps> = {
  args: {
    children: (
      <>
        <TextField label="Vessel name" />
        <TextField isMultiline label="Reason for visit" />
      </>
    ),
  },
};

export const Fieldsets: StoryObj<FormProps> = {
  args: {
    children: (
      <>
        <Fieldset legend="Vessel information" name="vessel">
          <TextField label="Vessel name" />
          <TextField isMultiline label="Reason for visit" />
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
  args: {
    description: "Register your ship before docking with the station.",
  },
};

export const Alert: StoryObj<FormProps> = {
  args: {
    alert: (
      <Callout severity="error" role="alert" title="Something went wrong">
        Please try your request again later.
      </Callout>
    ),
  },
};

export const FullWidth: StoryObj<FormProps> = {
  args: {
    isFullWidth: true,
    children: (
      <>
        <TextField isFullWidth label="Vessel name" />
        <TextField isFullWidth isMultiline label="Reason for visit" />
      </>
    ),
  },
};

export const KitchenSink: StoryObj<FormProps> = {
  args: {
    alert: (
      <Callout severity="error" role="alert" title="Something went wrong">
        Please try your request again later.
      </Callout>
    ),
    children: (
      <>
        <Fieldset
          legend="Vessel information"
          name="vessel"
          description="This information is used to verify vessel ownership and origin."
        >
          <TextField
            label="Vessel name"
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
            <Callout severity="error" role="alert" title="Standby for boarding">
              <Paragraph>
                There is an issue with the fuel mixture ratios. Reconfigure the
                fuel mixture and perform the safety checks again.
              </Paragraph>

              <Link href="#" variant="monochrome">
                Visit fueling console
              </Link>
            </Callout>
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
    description: "Register your ship before docking with the station.",
  },
};
