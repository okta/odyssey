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
import * as IconIndex from "@okta/odyssey-react/dist/components/Icon";
import { Icon, Table } from "@okta/odyssey-react";
import { Icon as Source } from "../../../../odyssey-react/src";
import { ReactElement } from "react";

export default {
  title: `Components/Icon`,
  component: Source,
};

const Template: Story = ({ ...args }) => (
  <Icon name={args.name} title={args.title} />
);

export const Default = Template.bind({});

Default.argTypes = {
  name: {
    defaultValue: "caution",
    control: { type: "select" },
  },
  title: {
    defaultValue: "Caution",
    control: { type: "text" },
  },
};

const meta = [
  {
    name: "anchor",
    classname: "AnchorIcon",
    use: "UI indicator - element contains in page anchor link",
  },
  {
    name: "arrow-down",
    classname: "ArrowDownIcon",
    use: "UI indicator - element triggers collapse",
  },
  {
    name: "arrow-right",
    classname: "ArrowRightIcon",
    use: "UI indicator - element triggers expand",
  },
  {
    name: "caret-down",
    classname: "CaretDownIcon",
    use: "UI indicator - element triggers open",
  },
  {
    name: "caret-up",
    classname: "CaretUpIcon",
    use: "UI indicator - element triggers close",
  },
  {
    name: "caution",
    classname: "CautionIcon",
    use: "To indicate a crucial decision",
  },
  {
    name: "check",
    classname: "CheckIcon",
    use: "UI indicator - custom checkbox",
  },
  {
    name: "close",
    classname: "CloseIcon",
    use: "To close a modal or other UI",
  },
  {
    name: "complete",
    classname: "CompleteIcon",
    use: "To show a completed process",
  },
  { name: "copy", classname: "CopyIcon", use: "To copy text" },
  { name: "delete", classname: "DeleteIcon", use: "To delete something" },
  { name: "download", classname: "DownloadIcon", use: "To download" },
  { name: "edit", classname: "EditIcon", use: "To edit something" },
  { name: "error", classname: "ErrorIcon", use: "To indicate an error" },
  {
    name: "external",
    classname: "ExternalIcon",
    use: "UI indicator - external link",
  },
  { name: "filter", classname: "FilterIcon", use: "To filter results" },
  { name: "get-info", classname: "GetInfoIcon", use: "To get information" },
  {
    name: "go-backward",
    classname: "GoBackwardIcon",
    use: "To navigate backward",
  },
  {
    name: "go-forward",
    classname: "GoForwardIcon",
    use: "To navigate forward",
  },
  { name: "minus", classname: "MinusIcon", use: "To subtract or remove" },
  {
    name: "notification",
    classname: "NotificationIcon",
    use: "To notify the user of something",
  },
  { name: "plus", classname: "PlusIcon", use: "To add" },
  { name: "search", classname: "SearchIcon", use: "To search for something" },
  {
    name: "settings",
    classname: "SettingsIcon",
    use: "To edit user or app settings",
  },
  {
    name: "sort",
    classname: "SortIcon",
    use: "UI indicator - Data is sortable",
  },
  {
    name: "sort-asc",
    classname: "SortAscIcon",
    use: "UI indicator - Data is sorted ascending",
  },
  {
    name: "sort-desc",
    classname: "SortDescIcon",
    use: "UI indicator - Data is sorted descending",
  },
  { name: "user", classname: "UserIcon", use: "To support a user name" },
];

export const Library = (): ReactElement => {
  return (
    <Table title="Library" caption="Available Odyssey Icons">
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell>Icon</Table.HeaderCell>
          <Table.HeaderCell>Name</Table.HeaderCell>
          <Table.HeaderCell>Class Name</Table.HeaderCell>
          <Table.HeaderCell>Use</Table.HeaderCell>
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {meta.map((row) => {
          // eslint-disable-next-line
          // @ts-ignore
          const CurrentIcon = IconIndex[row.classname];
          return (
            <Table.Row key={`${row.name}_row`}>
              <Table.DataCell>
                <CurrentIcon />
              </Table.DataCell>
              <Table.DataCell>{row.name}</Table.DataCell>
              <Table.DataCell>{row.classname}</Table.DataCell>
              <Table.DataCell>{row.use}</Table.DataCell>
            </Table.Row>
          );
        })}
      </Table.Body>
    </Table>
  );
};
