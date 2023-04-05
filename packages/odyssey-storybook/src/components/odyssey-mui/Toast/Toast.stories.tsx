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

import { action } from "@storybook/addon-actions";
import { Meta, Story } from "@storybook/react";
import {
  Button,
  Snackbar,
  Stack,
  Toast,
  ToastProps,
} from "@okta/odyssey-react-mui";
import * as React from "react";

import ToastMdx from "./Toast.mdx";
import { MuiThemeDecorator } from "../../../../.storybook/components";

const storybookMeta: Meta<ToastProps> = {
  title: `MUI Components/Alerts/Toast`,
  component: Toast,
  parameters: {
    docs: {
      page: ToastMdx,
    },
  },
  argTypes: {
    autoHideDuration: {
      control: "number",
      defaultValue: 6000,
    },
    isDismissable: {
      control: "boolean",
    },
    linkText: {
      control: "text",
    },
    linkUrl: {
      control: "text",
    },
    onClose: {
      control: null,
      type: { name: "function", required: false },
      defaultValue: null,
    },
    role: {
      control: "radio",
      options: ["alert", "status", null],
      defaultValue: null,
    },
    severity: {
      control: "radio",
      options: ["error", "info", "success", "warning"],
      defaultValue: "info",
    },
    text: {
      control: "text",
      defaultValue: "The mission to Sagittarius A is set for January 7.",
    },
  },
  decorators: [MuiThemeDecorator],
};

export default storybookMeta;

const DefaultTemplate: Story<ToastProps> = (args) => {
  const [open, setOpen] = React.useState(false);

  const openToast = React.useCallback(() => {
    setOpen(true);
  }, []);
  const closeToast = React.useCallback(() => {
    setOpen(false);
  }, []);

  return (
    <>
      <Button variant="primary" onClick={openToast}>
        Open {args.severity} toast
      </Button>
      <Toast {...args}></Toast>
    </>
  );
};

const StaticTemplate: Story<ToastProps> = (args) => {
  return <Toast {...args}></Toast>;
};

export const Info = DefaultTemplate.bind({});
Info.args = {};

export const InfoStatic = StaticTemplate.bind({});
InfoStatic.args = {};

export const Error = DefaultTemplate.bind({});
Error.args = {
  text: "Security breach in Hangar 18",
  role: "alert",
  severity: "error",
};

export const ErrorStatic = StaticTemplate.bind({});
ErrorStatic.args = {
  text: "Security breach in Hangar 18",
  role: "alert",
  severity: "error",
};

export const Warning = DefaultTemplate.bind({});
Warning.args = {
  text: "Severe solar winds may delay local system flights",
  role: "status",
  severity: "warning",
};

export const WarningStatic = StaticTemplate.bind({});
WarningStatic.args = {
  text: "Severe solar winds may delay local system flights",
  role: "status",
  severity: "warning",
};

export const Success = DefaultTemplate.bind({});
Success.args = {
  text: "Docking completed",
  role: "status",
  severity: "success",
};

export const SuccessStatic = StaticTemplate.bind({});
SuccessStatic.args = {
  text: "Docking completed",
  role: "status",
  severity: "success",
};

export const Dismissible = DefaultTemplate.bind({});
Dismissible.args = {
  isDismissable: true,
  linkText: "View report",
  linkUrl: "#",
  onClose: action("closed"),
};

export const DismissibleStatic = StaticTemplate.bind({});
DismissibleStatic.args = {
  isDismissable: true,
  linkText: "View report",
  linkUrl: "#",
  onClose: action("closed"),
};
