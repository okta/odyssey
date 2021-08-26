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
import FieldGroup from ".";
import Field from "../Field";
import TextInput from "../TextInput";
import Infobox from "../Infobox";
import type { Props } from ".";

export default {
  title: `Components/FieldGroup`,
  component: FieldGroup,
  argTypes: {
    children: {
      control: { type: null }
    },
    title: {
      defaultValue: "Origination logistics",
      control: { type: "text" }
    },
    desc: {
      defaultValue: "This information is required for your craft to leave the starport.",
      control: { type: "text" }
    }
  }
};

const Template: Story<Props> = ({title, desc}) => (
  <FieldGroup title={title} desc={desc}>
    <FieldGroup.Error>
      <Infobox title="Route impossible" variant="danger">
        <Infobox.Content>
          <p>Travel is impossible between these locations. Please select a new destination.</p>
        </Infobox.Content>
      </Infobox>
    </FieldGroup.Error>
    <Field label="Departure system" hint="Your origin system has been prepopulated." name="departure" value="Sol" disabled>
      <TextInput/>
    </Field>
    <Field label="Destination star" hint="The stellar object you are traveling to." name="destination" error="This field cannot be left blank.">
      <TextInput/>
    </Field>
  </FieldGroup>
);

export const Default = Template.bind({});

