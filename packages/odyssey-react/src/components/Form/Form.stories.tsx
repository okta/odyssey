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
import { Form } from ".";
import { FieldGroup } from "../FieldGroup";
import { TextInput } from "../TextInput";
import Infobox from "../Infobox";
import { Button } from "../Button";
import type { FormProps } from ".";

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

const Template: Story<FormProps> = ({ title, desc }) => (
  <Form title={title} desc={desc}>
    <Form.Error>
      <Infobox
        title="Signal interrupted"
        variant="danger"
        content="This is an error."
      />
    </Form.Error>
    <Form.Main>
      <FieldGroup
        title="Origination logistics"
        desc="This information is required for your craft to leave the starport."
      >
        <TextInput label="Foo" hint="Bar" error="Baz" />
      </FieldGroup>
    </Form.Main>
    <Form.Actions>
      <Button>Register</Button>
    </Form.Actions>
  </Form>
);

export const Default = Template.bind({});
