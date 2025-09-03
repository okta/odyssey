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

import {
  DataTable,
  DataTableColumn,
  DataTableRowData,
} from "@okta/odyssey-react-mui";
import * as iconDictionary from "@okta/odyssey-react-mui/icons";
import { Meta, StoryObj } from "@storybook/react";
import { createElement } from "react";

const storybookMeta: Meta = {
  title: "MUI Components/Icons",
  tags: ["autodocs"],
};

export default storybookMeta;

type IconData = {
  name: keyof typeof iconDictionary;
  use: string;
};

const icons: IconData[] = [
  { name: "AddCircleIcon", use: "To add" },
  { name: "AddIcon", use: "To add" },
  { name: "AppsIcon", use: "" },
  { name: "ArrowDownIcon", use: "" },
  { name: "ArrowLeftIcon", use: "" },
  { name: "ArrowLowerLeftIcon", use: "" },
  { name: "ArrowLowerRightIcon", use: "" },
  { name: "ArrowRightIcon", use: "" },
  { name: "ArrowUnsortedIcon", use: "" },
  { name: "ArrowUpIcon", use: "" },
  { name: "ArrowUpperLeftIcon", use: "" },
  { name: "ArrowUpperRightIcon", use: "" },
  { name: "BugIcon", use: "" },
  { name: "CalendarIcon", use: "" },
  { name: "CallIcon", use: "" },
  { name: "ChatIcon", use: "" },
  { name: "CheckCircleFilledIcon", use: "" },
  { name: "CheckIcon", use: "To show a completed process" },
  { name: "ChevronDownIcon", use: "UI indicator - element triggers open" },
  { name: "ChevronLeftIcon", use: "" },
  { name: "ChevronRightIcon", use: "" },
  { name: "ChevronUpIcon", use: "UI indicator - element triggers close" },
  { name: "ClockIcon", use: "" },
  { name: "CloseCircleFilledIcon", use: "" },
  { name: "CloseIcon", use: "To close a modal or other UI" },
  { name: "CollapseLeftIcon", use: "" },
  { name: "CollapseRightIcon", use: "" },
  { name: "CopyIcon", use: "To copy text" },
  { name: "DangerDiamondFilledIcon", use: "" },
  { name: "DangerDiamondIcon", use: "" },
  { name: "DeleteIcon", use: "To delete something" },
  { name: "DenyIcon", use: "" },
  { name: "DevicesIcon", use: "" },
  { name: "DirectoryIcon", use: "" },
  { name: "DocumentationIcon", use: "" },
  { name: "DownloadIcon", use: "To download" },
  { name: "DragIndicatorIcon", use: "" },
  { name: "EditIcon", use: "To edit something" },
  { name: "ExpandLeftIcon", use: "" },
  { name: "ExpandRightIcon", use: "" },
  { name: "ExternalLinkIcon", use: "UI indicator - external link" },
  { name: "FilterIcon", use: "To filter results" },
  { name: "FolderIcon", use: "" },
  { name: "GlobeIcon", use: "" },
  { name: "GridIcon", use: "" },
  { name: "GroupIcon", use: "" },
  { name: "HideIcon", use: "To hide something" },
  { name: "HomeIcon", use: "" },
  { name: "InformationCircleFilledIcon", use: "To get information" },
  { name: "InformationCircleIcon", use: "To get information" },
  { name: "LinkIcon", use: "" },
  { name: "ListIcon", use: "" },
  { name: "LockIcon", use: "" },
  { name: "MoreIcon", use: "" },
  { name: "NotificationIcon", use: "To notify the user of something" },
  { name: "PauseIcon", use: "" },
  { name: "QuestionCircleFilledIcon", use: "To provide clarification" },
  { name: "QuestionCircleIcon", use: "To provide clarification" },
  { name: "RefreshIcon", use: "" },
  { name: "ResetIcon", use: "" },
  { name: "ResumeIcon", use: "" },
  { name: "SearchIcon", use: "To search for something" },
  { name: "ServerIcon", use: "" },
  { name: "SettingsIcon", use: "To edit user or app settings" },
  { name: "ShowIcon", use: "To show something" },
  { name: "SubtractIcon", use: "To subtract or remove" },
  { name: "SyncIcon", use: "" },
  { name: "UnlockIcon", use: "" },
  { name: "UploadIcon", use: "" },
  { name: "UserIcon", use: "To support a user name" },
  { name: "VideoIcon", use: "" },
  { name: "WarningFilledIcon", use: "" },
  { name: "WarningIcon", use: "" },
];

const columns: DataTableColumn<IconData>[] = [
  {
    accessorKey: "icon",
    Cell: ({ row }) =>
      // TODO: Fix this. There's an error about being unable to validate a computed value.
      // eslint-disable-next-line import/namespace
      createElement(iconDictionary[row.original.name]),
    header: "Icon",
  },
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "className",
    Cell: ({ row }) =>
      // TODO: Fix this. There's an error about being unable to validate a computed value.
      // eslint-disable-next-line import/namespace
      iconDictionary[row.original.name]?.displayName ?? "",
    header: "Class Name",
  },
];

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
    return (
      <DataTable
        // The `as` here shouldn't be required because `DataTable` should be inferring the type of `columns`, but it doesn't take a generic to know that. --Kevin Ghadyani
        columns={columns as DataTableColumn<DataTableRowData>[]}
        getData={() => icons}
        // The `as` here shouldn't be required because `DataTable` should know the return type of `getData` and infer the rest. It needs to ta generic to fix that. --Kevin Ghadyani
        getRowId={(originalRow) =>
          originalRow.name as keyof typeof iconDictionary
        }
        hasSorting={false}
      />
    );
  },
};
