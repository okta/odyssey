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

import * as React from "react";
import { Story } from "@storybook/react";
import { Button, Snackbar, Stack, Toast } from "@okta/odyssey-react-mui";
import { MuiThemeDecorator } from "../../../../.storybook/components";

import ToastMdx from "./Toast.mdx";

export default {
  title: `MUI Components/Alerts/Toast`,
  component: Toast,
  parameters: {
    docs: {
      page: ToastMdx,
    },
  },
  argTypes: {
    linkText: {
      control: "text",
    },
    linkUrl: {
      control: "text",
    },
    onClose: {
      control: null,
      type: { required: false, summary: "function" },
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

const DefaultTemplate: Story = (args) => {
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
        Open {args.severity} snackbar Open {args.severity} toast
      </Button>
      <Stack spacing={2} sx={{ width: "100%" }}>
        <Snackbar
          open={open}
          autoHideDuration={args.onClose ? undefined : 6000}
          onClose={closeToast}
        >
          <Toast
            severity={args.severity}
            text={args.text}
            onClose={args.onClose}
            {...args}
          ></Toast>
        </Snackbar>
      </Stack>
    </>
  );
};

const StaticTemplate: Story = (args) => {
  return <Toast severity={args.severity} text={args.text} {...args}></Toast>;
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
  isDismissible: true,
  linkText: "View report",
  linkUrl: "#",
  onClose: () => {
    return true;
  },
};

export const DismissibleStatic = StaticTemplate.bind({});
DismissibleStatic.args = {
  isDismissible: true,
  linkText: "View report",
  linkUrl: "#",
  onClose: () => {
    return true;
  },
};
