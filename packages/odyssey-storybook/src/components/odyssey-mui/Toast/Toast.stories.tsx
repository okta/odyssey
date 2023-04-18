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
import {
  Alert,
  AlertTitle,
  Button,
  CloseIcon,
  Link,
  Snackbar,
  Stack,
} from "@okta/odyssey-react-mui";
import { MuiThemeDecorator } from "../../../../.storybook/components";

import ToastMdx from "./Toast.mdx";

export default {
  title: `MUI Components/Alerts/Toast`,
  component: Alert,
  parameters: {
    docs: {
      page: ToastMdx,
    },
  },
  argTypes: {
    actionLink: {
      control: "text",
      default: null,
    },
    content: {
      control: "text",
      defaultValue: "Mission to Sirius B scheduled for January 7, 2023",
    },
    isDismissible: {
      control: "boolean",
      defaultValue: null,
    },
    role: {
      control: "radio",
      options: ["status", null],
      defaultValue: null,
    },
    severity: {
      control: "radio",
      options: ["error", "info", "success", "warning"],
      defaultValue: "info",
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
      <Button
        variant="primary"
        onClick={openToast}
        text={`Open ${args.severity} snackbar Open ${args.severity} toast`}
      />
      <Stack spacing={2} sx={{ width: "100%" }}>
        <Snackbar
          open={open}
          autoHideDuration={args.isDismissible === true ? undefined : 6000}
          onClose={closeToast}
        >
          <Alert
            severity={args.severity}
            variant="toast"
            action={
              args.isDismissible && (
                <Button
                  aria-label="close"
                  onClick={closeToast}
                  variant="floating"
                  size="small"
                  startIcon={<CloseIcon fontSize="inherit" />}
                />
              )
            }
          >
            <AlertTitle>{args.content}</AlertTitle>
            {args.actionLink && args.actionLink}
          </Alert>
        </Snackbar>
      </Stack>
    </>
  );
};

const StaticTemplate: Story = (args) => {
  return (
    <Alert
      severity={args.severity}
      variant="toast"
      action={
        args.isDismissible && (
          <Button
            aria-label="close"
            variant="floating"
            size="small"
            startIcon={<CloseIcon />}
          />
        )
      }
    >
      <AlertTitle>{args.content}</AlertTitle>
      {args.actionLink && args.actionLink}
    </Alert>
  );
};

export const Info = DefaultTemplate.bind({});
Info.args = {};

export const InfoStatic = StaticTemplate.bind({});
InfoStatic.args = {};

export const Error = DefaultTemplate.bind({});
Error.args = {
  content: "Security breach in Hangar 18",
  role: "alert",
  severity: "error",
};

export const ErrorStatic = StaticTemplate.bind({});
ErrorStatic.args = {
  content: "Security breach in Hangar 18",
  role: "alert",
  severity: "error",
};

export const Warning = DefaultTemplate.bind({});
Warning.args = {
  content: "Severe solar winds may delay local system flights",
  role: "status",
  severity: "warning",
};

export const WarningStatic = StaticTemplate.bind({});
WarningStatic.args = {
  content: "Severe solar winds may delay local system flights",
  role: "status",
  severity: "warning",
};

export const Success = DefaultTemplate.bind({});
Success.args = {
  content: "Docking completed",
  role: "status",
  severity: "success",
};

export const SuccessStatic = StaticTemplate.bind({});
SuccessStatic.args = {
  content: "Docking completed",
  role: "status",
  severity: "success",
};

export const Dismissible = DefaultTemplate.bind({});
Dismissible.args = {
  actionLink: (
    <Link href="#anchor" variant="monochrome">
      View report
    </Link>
  ),
  isDismissible: true,
};

export const DismissibleStatic = StaticTemplate.bind({});
DismissibleStatic.args = {
  actionLink: (
    <Link href="#anchor" variant="monochrome">
      View report
    </Link>
  ),
  isDismissible: true,
};
