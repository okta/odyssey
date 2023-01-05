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
    action: {
      control: "text",
      default: null,
    },
    content: {
      control: "text",
      defaultValue:
        "The mission to Sagitarius A has been scheduled for January 7.",
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

  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  return (
    <>
      <Button variant="primary" onClick={handleClick}>
        Open {args.severity} toast
      </Button>
      <Stack spacing={2} sx={{ width: "100%" }}>
        <Snackbar
          open={open}
          autoHideDuration={args.isDismissible === true ? undefined : 6000}
          onClose={handleClose}
        >
          <Alert
            severity={args.severity}
            variant="toast"
            action={
              args.isDismissible && (
                <Button
                  aria-label="close"
                  onClick={() => {
                    setOpen(false);
                  }}
                  variant="floating"
                  size="s"
                >
                  <CloseIcon fontSize="inherit" />
                </Button>
              )
            }
          >
            <AlertTitle>{args.content}</AlertTitle>
            {args.action && args.action}
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
            size="s"
            startIcon={<CloseIcon />}
          ></Button>
        )
      }
    >
      <AlertTitle>{args.content}</AlertTitle>
      {args.action && args.action}
    </Alert>
  );
};

export const Info = DefaultTemplate.bind({});
Info.args = {};

export const InfoStatic = StaticTemplate.bind({});
InfoStatic.args = {};

export const Error = DefaultTemplate.bind({});
Error.args = {
  content: "Hangar 18 has been compromised.",
  role: "alert",
  severity: "error",
};

export const ErrorStatic = StaticTemplate.bind({});
ErrorStatic.args = {
  content: "Hangar 18 has been compromised.",
  role: "alert",
  severity: "error",
};

export const Warning = DefaultTemplate.bind({});
Warning.args = {
  content: "Severe solar winds detected. Local system flights may be delayed.",
  role: "status",
  severity: "warning",
};

export const WarningStatic = StaticTemplate.bind({});
WarningStatic.args = {
  content: "Severe solar winds detected. Local system flights may be delayed.",
  role: "status",
  severity: "warning",
};

export const Success = DefaultTemplate.bind({});
Success.args = {
  content: "Docking completed successfully.",
  role: "status",
  severity: "success",
};

export const SuccessStatic = StaticTemplate.bind({});
SuccessStatic.args = {
  content: "Docking completed successfully.",
  role: "status",
  severity: "success",
};

export const Dismissible = DefaultTemplate.bind({});
Dismissible.args = {
  action: (
    <Link href="#anchor" variant="monochrome">
      View report
    </Link>
  ),
  isDismissible: true,
};

export const DismissibleStatic = StaticTemplate.bind({});
DismissibleStatic.args = {
  action: (
    <Link href="#anchor" variant="monochrome">
      View report
    </Link>
  ),
  isDismissible: true,
};
