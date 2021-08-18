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
import Caution from "./Caution";
import * as Icon from "./";
import type { ReactElement } from "react";
import Table from "../Table";

export default {
  title: `Components/Icon`
};

const Template: Story = ({...args}) => (<Caution {...args} />);

export const Default = Template.bind({});

Default.argTypes = {
  title: {
    defaultValue: "Caution",
    control: { type: "text" }
  },
  titleId: {
    control: { type: "text" }
  },
  size: {
    control: { type: "text" }
  },
  color: {
    defaultValue: "#000000",
    control: { type: "color" }
  }
}

const meta = [
  {  "name": "Caution",  "use": "To indicate a crucial decision" }, 
  {  "name": "Search",  "use": "To search for something" }, 
  {  "name": "GetInfo",  "use": "To get information" }, 
  {  "name": "User",  "use": "To support a user name" }, 
  {  "name": "Copy",  "use": "To copy text" }, 
  {  "name": "Delete",  "use": "To delete something" }, 
  {  "name": "Download",  "use": "To download" }, 
  {  "name": "Notification",  "use": "To notify the user of something" }, 
  {  "name": "Close",  "use": "To close a modal or other UI" }, 
  {  "name": "Complete",  "use": "To show a completed process" }, 
  {  "name": "Error",  "use": "To indicate an error" }, 
  {  "name": "GoForward",  "use": "To navigate forward" }, 
  {  "name": "GoBackward",  "use": "To navigate backward" }, 
  {  "name": "Edit",  "use": "To edit something" }, 
  {  "name": "Settings",  "use": "To edit user or app settings" }, 
  {  "name": "Plus",  "use": "To add" }, 
  {  "name": "Minus",  "use": "To subtract or remove" }, 
  {  "name": "Filter",  "use": "To filter results" }
];

export const Library = ():ReactElement => {
  return (
    <Table title="Library" caption="Available Odyssey Icons">
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell>Icon</Table.HeaderCell>
          <Table.HeaderCell>Name</Table.HeaderCell>
          <Table.HeaderCell>Use</Table.HeaderCell>
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {
          meta.map((row) => {
            // eslint-disable-next-line
            // @ts-ignore
            const CurrentIcon = Icon[row.name];
            return (
              <Table.Row>
                <Table.DataCell>
                  <CurrentIcon />
                </Table.DataCell>
                <Table.DataCell>
                  {row.name}
                </Table.DataCell>
                <Table.DataCell>
                  {row.use}
                </Table.DataCell>
              </Table.Row>
            )
          })
        }
      </Table.Body>
    </Table>
  );
}
