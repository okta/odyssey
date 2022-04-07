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

import React from "react";
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
    defaultValue: "alert-triangle-filled",
    control: { type: "select" },
  },
  title: {
    defaultValue: "Caution",
    control: { type: "text" },
  },
};

const meta = [
  { name: "add", classname: "AddIcon", use: "To add" },
  {
    name: "add-circle",
    classname: "AddCircleIcon",
    use: "To add",
  },
  {
    name: "alert-circle",
    classname: "AlertCircleIcon",
    use: "To indicate an error",
  },
  {
    name: "alert-circle-filled",
    classname: "AlertCircleFilledIcon",
    use: "To indicate an error",
  },
  {
    name: "alert-triangle-filled",
    classname: "AlertTriangleFilledIcon",
    use: "To indicate a crucial decision",
  },
  {
    name: "anchor",
    classname: "AnchorIcon",
    use: "UI indicator - element contains in page anchor link",
  },
  {
    name: "arrow-down",
    classname: "ArrowDownIcon",
    use: "",
  },
  {
    name: "arrow-left",
    classname: "ArrowLeftIcon",
    use: "",
  },
  {
    name: "arrow-right",
    classname: "ArrowRightIcon",
    use: "",
  },
  {
    name: "arrow-up",
    classname: "ArrowUpIcon",
    use: "",
  },
  {
    name: "calendar",
    classname: "CalendarIcon",
    use: "",
  },
  {
    name: "check",
    classname: "CheckIcon",
    use: "UI indicator - custom checkbox",
  },
  {
    name: "check",
    classname: "CheckCircleFilledIcon",
    use: "To show a completed process",
  },
  {
    name: "chevron-down",
    classname: "ChevronDownIcon",
    use: "UI indicator - element triggers open",
  },
  {
    name: "chevron-up",
    classname: "ChevronUpIcon",
    use: "UI indicator - element triggers close",
  },
  {
    name: "close",
    classname: "CloseIcon",
    use: "To close a modal or other UI",
  },
  {
    name: "close-circle-filled",
    classname: "CloseCircleFilledIcon",
    use: "",
  },
  { name: "copy", classname: "CopyIcon", use: "To copy text" },
  { name: "delete", classname: "DeleteIcon", use: "To delete something" },
  { name: "download", classname: "DownloadIcon", use: "To download" },
  {
    name: "drag-handle",
    classname: "DragHandleIcon",
    use: "Element is draggable",
  },
  { name: "edit", classname: "EditIcon", use: "To edit something" },
  {
    name: "external-link",
    classname: "ExternalLinkIcon",
    use: "UI indicator - external link",
  },
  { name: "eye", classname: "EyeIcon", use: "To make something visible" },
  { name: "eye-off", classname: "EyeOffIcon", use: "To make something hidden" },
  { name: "filter", classname: "FilterIcon", use: "To filter results" },
  { name: "globe", classname: "GlobeIcon", use: "" },
  { name: "home", classname: "HomeIcon", use: "" },
  {
    name: "information-circle",
    classname: "InformationCircleIcon",
    use: "To get information",
  },
  {
    name: "information-circle-filled",
    classname: "InformationCircleFilledIcon",
    use: "To get information",
  },
  {
    name: "notification",
    classname: "NotificationIcon",
    use: "To notify the user of something",
  },
  { name: "overflow-vertical", classname: "OverflowVerticalIcon", use: "" },
  {
    name: "question-circle",
    classname: "QuestionCircleIcon",
    use: "To provide clarification",
  },
  {
    name: "question-circle-filled",
    classname: "QuestionCircleFilledIcon",
    use: "To provide clarification",
  },
  { name: "search", classname: "SearchIcon", use: "To search for something" },
  {
    name: "settings",
    classname: "SettingsIcon",
    use: "To edit user or app settings",
  },
  {
    name: "subtract",
    classname: "SubtractIcon",
    use: "To subtract or remove",
  },
  { name: "user", classname: "UserIcon", use: "To support a user name" },
];

export const Library = (): ReactElement => {
  return (
    <Table caption="Library" screenReaderCaption="Available Odyssey Icons">
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
