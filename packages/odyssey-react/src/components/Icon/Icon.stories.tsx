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
import * as IconIndex from "./";
import Icon from "./Icon";
import { ReactElement } from "react";
import Table from "../Table";



export default {
  title: `Components/Icon`,
  component: Icon
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
  { "name": "Anchor",  "use": "UI indicator - element contains in page anchor link" },
  { "name": "Caret",  "use": "UI indicator - element triggers expand" },
  { "name": "Caution",  "use": "To indicate a crucial decision" },
  { "name": "Check",  "use": "UI indicator - custom checkbox" },
  { "name": "Close",  "use": "To close a modal or other UI" },
  { "name": "Complete",  "use": "To show a completed process" },
  { "name": "Copy",  "use": "To copy text" }, 
  { "name": "Delete",  "use": "To delete something" },
  { "name": "Download",  "use": "To download" },
  { "name": "Edit",  "use": "To edit something" },
  { "name": "Error",  "use": "To indicate an error" },
  { "name": "External",  "use": "UI indicator - external link" },
  { "name": "Filter",  "use": "To filter results" },
  { "name": "GetInfo",  "use": "To get information" },
  { "name": "GoBackward",  "use": "To navigate backward" },
  { "name": "GoForward",  "use": "To navigate forward" },
  { "name": "Minus",  "use": "To subtract or remove" },
  { "name": "Notification",  "use": "To notify the user of something" },
  { "name": "Plus",  "use": "To add" }, 
  { "name": "Search",  "use": "To search for something" }, 
  { "name": "Settings",  "use": "To edit user or app settings" }, 
  { "name": "Sort",  "use": "UI indicator - Data is sortable" },
  { "name": "SortAsc",  "use": "UI indicator - Data is sorted ascending" },
  { "name": "SortDesc",  "use": "UI indicator - Data is sorted descending" },
  { "name": "User",  "use": "To support a user name" }
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
            const CurrentIcon = IconIndex[row.name];
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
