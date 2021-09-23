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

import { Story } from "@storybook/react";
import Form from ".";
import FieldGroup from "../FieldGroup";
import Field from "../Field";
import TextInput from "../TextInput";
import Infobox from "../Infobox";
import Button from "../Button";
import type { Props } from ".";

export default {
  title: `Components/Form`,
  component: Form,
  argTypes: {
    children: {
      control: { type: null },
    },
    title: {
      defaultValue: "Interplanetary flight registration",
      control: { type: "text" },
    },
    desc: {
      defaultValue:
        "Complete this form in order to register for your interplanetary transfer.",
      control: { type: "text" },
    },
  },
};

const Template: Story<Props> = ({ title, desc }) => (
  <Form title={title} desc={desc}>
    <Form.Error>
      <Infobox title="Signal interrupted" variant="danger">
        <Infobox.Content>
          <p>
            Solar flare activity has caused your submission to fail. Please try
            again.
          </p>
        </Infobox.Content>
      </Infobox>
    </Form.Error>
    <Form.Main>
      <FieldGroup
        title="Origination logistics"
        desc="This information is required for your craft to leave the starport."
      >
        <Field
          label="Departure system"
          hint="Your origin system has been prepopulated."
          name="departure"
          value="Sol"
          disabled
        >
          <TextInput />
        </Field>
        <Field
          label="Destination star"
          hint="The stellar object you are traveling to."
          name="destination"
          error="This field cannot be left blank."
        >
          <TextInput />
        </Field>
      </FieldGroup>
    </Form.Main>
    <Form.Actions>
      <Button>Register</Button>
    </Form.Actions>
  </Form>
);

export const Default = Template.bind({});
