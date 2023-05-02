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

import { Story } from "@storybook/react";
import { createElement } from "react";
import type { ReactElement } from "react";
import {
  Icon,
  iconDictionary,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "../../../../../odyssey-react-mui/src";
import { MuiThemeDecorator } from "../../../../.storybook/components/MuiThemeDecorator";

export default {
  title: `MUI Components/Icon`,
  component: Icon,
  decorators: [MuiThemeDecorator],
};

const Template: Story = ({ ...args }) => (
  <Icon name={args.name} titleAccess={args.title} />
);

export const Default = Template.bind({});

Default.argTypes = {
  name: {
    defaultValue: "warningtrianglefilled",
    control: { type: "select" },
  },
  title: {
    defaultValue: "Caution",
    control: { type: "text" },
  },
};

const meta: Array<{ name: keyof typeof iconDictionary; use: string }> = [
  { name: "addcircle", use: "--" },
  { name: "add", use: "--" },
  { name: "alertdiamondfilled", use: "--" },
  { name: "alertdiamond", use: "--" },
  { name: "arrowdown", use: "--" },
  { name: "arrowleft", use: "--" },
  { name: "arrowlowerleft", use: "--" },
  { name: "arrowlowerright", use: "--" },
  { name: "arrowright", use: "--" },
  { name: "arrowupdown", use: "--" },
  { name: "arrowup", use: "--" },
  { name: "arrowupperleft", use: "--" },
  { name: "arrowupperright", use: "--" },
  { name: "bug", use: "--" },
  { name: "calendar", use: "--" },
  { name: "call", use: "--" },
  { name: "chat", use: "--" },
  { name: "checkcirclefilled", use: "--" },
  { name: "check", use: "--" },
  { name: "chevrondown", use: "--" },
  { name: "chevronleft", use: "--" },
  { name: "chevronright", use: "--" },
  { name: "chevronup", use: "--" },
  { name: "clock", use: "--" },
  { name: "closecirclefilled", use: "--" },
  { name: "close", use: "--" },
  { name: "collapseleft", use: "--" },
  { name: "collapseright", use: "--" },
  { name: "copy", use: "--" },
  { name: "delete", use: "--" },
  { name: "deny", use: "--" },
  { name: "devices", use: "--" },
  { name: "documentation", use: "--" },
  { name: "download", use: "--" },
  { name: "draghandle", use: "--" },
  { name: "edit", use: "--" },
  { name: "expandleft", use: "--" },
  { name: "expandright", use: "--" },
  { name: "filter", use: "--" },
  { name: "folder", use: "--" },
  { name: "globe", use: "--" },
  { name: "grid", use: "--" },
  { name: "group", use: "--" },
  { name: "hide", use: "--" },
  { name: "home", use: "--" },
  { name: "informationcirclefilled", use: "--" },
  { name: "informationcircle", use: "--" },
  { name: "linkexternal", use: "--" },
  { name: "link", use: "--" },
  { name: "list", use: "--" },
  { name: "lock", use: "--" },
  { name: "notification", use: "--" },
  { name: "overflowvertical", use: "--" },
  { name: "pause", use: "--" },
  { name: "questioncirclefilled", use: "--" },
  { name: "questioncircle", use: "--" },
  { name: "refresh", use: "--" },
  { name: "reset", use: "--" },
  { name: "resume", use: "--" },
  { name: "search", use: "--" },
  { name: "server", use: "--" },
  { name: "show", use: "--" },
  { name: "subtract", use: "--" },
  { name: "sync", use: "--" },
  { name: "unlock", use: "--" },
  { name: "upload", use: "--" },
  { name: "user", use: "--" },
  { name: "video", use: "--" },
  { name: "warningtrianglefilled", use: "--" },
  { name: "warningtriangle", use: "--" },
];

export const Library = (): ReactElement => {
  return (
    <TableContainer>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Icon</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Class Name</TableCell>
            <TableCell>Use</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {meta.map(({ name, use }) => {
            return (
              <TableRow key={`${name}_row`}>
                <TableCell>{createElement(iconDictionary[name])}</TableCell>
                <TableCell>{name}</TableCell>
                <TableCell>{iconDictionary[name].displayName}</TableCell>
                <TableCell>{use}</TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
