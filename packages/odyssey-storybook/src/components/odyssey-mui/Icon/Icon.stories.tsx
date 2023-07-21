/*!
 * Copyright (c) 2022-present, Okta, Inc. and/or its affiliates. All rights reserved.
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
import { createElement } from "react";
import {
  iconDictionary,
  StaticTable,
  type TableColumn,
} from "@okta/odyssey-react-mui";
import { MuiThemeDecorator } from "../../../../.storybook/components";

const storybookMeta: Meta = {
  title: "MUI Components/Icons",
  decorators: [MuiThemeDecorator],
  tags: ["autodocs"],
};

export default storybookMeta;

type IconData = {
  name: keyof typeof iconDictionary;
  use: string;
};

const columns: TableColumn<IconData>[] = [
  {
    accessorKey: "name",
    Cell: ({ cell }) =>
      createElement(iconDictionary[cell.getValue<IconData["name"]>()]),
    header: "Icon",
  },
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "name",
    Cell: ({ cell }) =>
      iconDictionary[cell.getValue<IconData["name"]>()].displayName,
    header: "Class Name",
  },
];

const icons: IconData[] = [
  { name: "add-circle", use: "To add" },
  { name: "add", use: "To add" },
  { name: "apps", use: "" },
  { name: "arrow-down", use: "" },
  { name: "arrow-left", use: "" },
  { name: "arrow-lower-left", use: "" },
  { name: "arrow-lower-right", use: "" },
  { name: "arrow-right", use: "" },
  { name: "arrow-unsorted", use: "" },
  { name: "arrow-up", use: "" },
  { name: "arrow-upper-left", use: "" },
  { name: "arrow-upper-right", use: "" },
  { name: "bug", use: "" },
  { name: "calendar", use: "" },
  { name: "call", use: "" },
  { name: "chat", use: "" },
  { name: "check-circle-filled", use: "" },
  { name: "check", use: "To show a completed process" },
  { name: "chevron-down", use: "UI indicator - element triggers open" },
  { name: "chevron-left", use: "" },
  { name: "chevron-right", use: "" },
  { name: "chevron-up", use: "UI indicator - element triggers close" },
  { name: "clock", use: "" },
  { name: "close-circle-filled", use: "" },
  { name: "close", use: "To close a modal or other UI" },
  { name: "collapse-left", use: "" },
  { name: "collapse-right", use: "" },
  { name: "copy", use: "To copy text" },
  { name: "danger-diamond-filled", use: "" },
  { name: "danger-diamond", use: "" },
  { name: "delete", use: "To delete something" },
  { name: "deny", use: "" },
  { name: "devices", use: "" },
  { name: "directory", use: "" },
  { name: "documentation", use: "" },
  { name: "download", use: "To download" },
  { name: "drag-indicator", use: "" },
  { name: "edit", use: "To edit something" },
  { name: "expand-left", use: "" },
  { name: "expand-right", use: "" },
  { name: "external-link", use: "UI indicator - external link" },
  { name: "filter", use: "To filter results" },
  { name: "folder", use: "" },
  { name: "globe", use: "" },
  { name: "grid", use: "" },
  { name: "group", use: "" },
  { name: "hide", use: "To hide something" },
  { name: "home", use: "" },
  { name: "information-circle-filled", use: "To get information" },
  { name: "information-circle", use: "To get information" },
  { name: "link", use: "" },
  { name: "list", use: "" },
  { name: "lock", use: "" },
  { name: "more", use: "" },
  { name: "notification", use: "To notify the user of something" },
  { name: "pause", use: "" },
  { name: "question-circle-filled", use: "To provide clarification" },
  { name: "question-circle", use: "To provide clarification" },
  { name: "refresh", use: "" },
  { name: "reset", use: "" },
  { name: "resume", use: "" },
  { name: "search", use: "To search for something" },
  { name: "server", use: "" },
  { name: "settings", use: "To edit user or app settings" },
  { name: "show", use: "To show something" },
  { name: "subtract", use: "To subtract or remove" },
  { name: "sync", use: "" },
  { name: "unlock", use: "" },
  { name: "upload", use: "" },
  { name: "user", use: "To support a user name" },
  { name: "video", use: "" },
  { name: "warning-filled", use: "" },
  { name: "warning", use: "" },
];

const getRowId = ({ name }: { name: IconData["name"] }) => name;

export const Default: StoryObj = {
  parameters: {
    docs: {
      description: {
        story:
          "Icons can be included as a component using the class name. For example, to include the add circle icon, use `<AddCircleIcon />`.",
      },
    },
  },
  render: function C() {
    return <StaticTable columns={columns} data={icons} getRowId={getRowId} />;
  },
};
