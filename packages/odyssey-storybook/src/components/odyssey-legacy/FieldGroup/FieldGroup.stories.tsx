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
import {
  FieldGroup,
  FieldGroupProps,
  Infobox,
  Select,
  SearchInput,
} from "../../../../../odyssey-react/src";
import FieldGroupMdx from "./FieldGroup.mdx";

export default {
  title: `Legacy Components/FieldGroup`,
  component: FieldGroup,
  parameters: {
    docs: {
      page: FieldGroupMdx,
    },
  },
  argTypes: {
    children: {
      control: { type: null },
    },
    legend: {
      defaultValue: "Origination logistics",
      control: { type: "text" },
    },
    desc: {
      defaultValue:
        "This information is required for your craft to leave the starport.",
      control: { type: "text" },
    },
  },
};

const Template: Story<FieldGroupProps> = ({ legend, desc }) => (
  <FieldGroup legend={legend} desc={desc}>
    <FieldGroup.Error>
      <Infobox
        heading="Route impossible"
        variant="danger"
        content="this is an error"
      />
    </FieldGroup.Error>
    <Select label="Destination" name="destination">
      <Select.Option children="Venus" />
      <Select.Option children="Nessus" />
      <Select.Option children="Europa" />
    </Select>
    <SearchInput label="Flight identifier" />
  </FieldGroup>
);

export const Default = Template.bind({});
