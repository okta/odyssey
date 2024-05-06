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

import { Meta, StoryObj } from "@storybook/react";
import {
  Button,
  Toast,
  ToastProps,
  ToastStack,
  toastRoleValues,
  toastSeverityValues,
} from "@okta/odyssey-react-mui";
import { useCallback, useState } from "react";

import { MuiThemeDecorator } from "../../../../.storybook/components";
import { userEvent, waitFor, within } from "@storybook/testing-library";
import { expect } from "@storybook/jest";
import { axeRun } from "../../../axe-util";
import type { PlaywrightProps } from "../storybookTypes";

const meta: Meta<ToastProps> = {
  title: "MUI Components/Toast",
  component: Toast,
  argTypes: {
    autoHideDuration: {
      control: "number",
      description:
        "If set, this determines how long the toast should appear before automatically disappearing in milliseconds. It will only take effect if the toast is not dismissible. If left blank, it defaults to 6000",
      table: {
        type: {
          summary: "number",
        },
        defaultValue: {
          summary: 6000,
        },
      },
    },
    isDismissable: {
      control: "boolean",
      description: "If `true`, the alert will include a close button",
      table: {
        type: {
          summary: "boolean",
        },
        defaultValue: {
          summary: false,
        },
      },
    },
    isVisible: {
      control: "boolean",
      description: "If true, the Toast is visible",
      table: {
        type: {
          summary: "boolean",
        },
      },
    },
    linkText: {
      control: "text",
      description:
        "If linkUrl is defined, this is the text of the link. If left blank, it defaults to 'Learn more'. Note that linkText does nothing if linkUrl is not defined",
      table: {
        type: {
          summary: "string",
        },
      },
    },
    linkUrl: {
      control: "text",
      description: "If defined, the alert will include a link to the URL",
      table: {
        type: {
          summary: "string",
        },
      },
    },
    onHide: {
      control: null,
      description: "An optional function to run when the Toast is closed",
      table: {
        type: {
          summary: "func",
        },
      },
    },
    role: {
      options: toastRoleValues,
      control: { type: "radio" },
      description:
        "Sets the ARIA role of the alert ('status' for something that dynamically updates, 'alert' for errors, null for something unchanging)",
      table: {
        type: {
          summary: toastRoleValues.join(" | "),
        },
      },
    },
    severity: {
      options: toastSeverityValues,
      control: { type: "radio" },
      description: "Determine the color and icon of the alert",
      table: {
        type: {
          summary: toastSeverityValues.join(" | "),
        },
      },
      type: {
        required: true,
        name: "other",
        value: "radio",
      },
    },
    text: {
      control: "text",
      description: "The text content of the alert",
      table: {
        type: {
          summary: "string",
        },
      },
      type: {
        required: true,
        name: "string",
      },
    },
  },
  args: {
    severity: "info",
    role: "status",
    linkText: "Info",
    text: "The mission to Sagittarius A is set for January 7.",
    autoHideDuration: 10000,
  },
  decorators: [MuiThemeDecorator],
  tags: ["autodocs"],
};

export default meta;

const waitForToastOpenTransition = () =>
  new Promise((resolve) => {
    setTimeout(resolve, 1000);
  });

const openToast =
  ({ canvasElement, step }: PlaywrightProps<ToastProps>) =>
  async (args: ToastProps, actionName: string) => {
    const canvas = within(canvasElement);
    await step(`open ${actionName}`, async () => {
      await waitFor(() => {
        const buttonElement = canvas.getByText(`Open ${args.severity} toast`);
        userEvent.hover(buttonElement);
        userEvent.click(buttonElement);
        userEvent.tab();
      });

      await waitForToastOpenTransition();

      await axeRun(actionName);
    });
  };

const Single: StoryObj<ToastProps> = {
  args: {
    isVisible: false,
    role: "status",
  },
  render: function C(args) {
    const [isVisible, setIsVisible] = useState(args.isVisible);
    const showToast = useCallback(() => setIsVisible(true), []);
    const hideToast = useCallback(() => setIsVisible(false), []);
    return (
      <>
        <Button
          label={`Open ${args.severity} toast`}
          onClick={showToast}
          variant="primary"
        />
        <ToastStack>
          <Toast
            autoHideDuration={args.autoHideDuration}
            isDismissable={args.isDismissable}
            linkText={args.linkText}
            linkUrl={args.linkUrl}
            isVisible={isVisible}
            onHide={hideToast}
            role={args.role}
            severity={args.severity}
            text={args.text}
          />
        </ToastStack>
      </>
    );
  },
};

export const Info: StoryObj<ToastProps> = {
  ...Single,
  args: {
    text: "The mission to Sagittarius A is set for January 7.",
    severity: "info",
  },
  play: async ({ args, canvasElement, step }) => {
    await openToast({ canvasElement, step })(args, "Info Toast");
  },
};

export const ErrorToast: StoryObj<ToastProps> = {
  ...Single,
  name: "Error",
  args: {
    text: "Security breach in Hangar 18",
    role: "alert",
    severity: "error",
  },
  play: async ({ args, canvasElement, step }) => {
    await openToast({ canvasElement, step })(args, "Error Toast");
  },
};

export const Warning: StoryObj<ToastProps> = {
  ...Single,
  args: {
    text: "Severe solar winds may delay local system flights",
    role: "status",
    severity: "warning",
  },
  play: async ({ args, canvasElement, step }) => {
    await openToast({ canvasElement, step })(args, "Warning Toast");
  },
};

export const Success: StoryObj<ToastProps> = {
  ...Single,
  args: {
    text: "Docking completed",
    role: "status",
    severity: "success",
  },
  play: async ({ args, canvasElement, step }) => {
    await openToast({ canvasElement, step })(args, "Success Toast");
  },
};

export const Dismissible: StoryObj<ToastProps> = {
  ...Single,
  args: {
    isDismissable: true,
    linkText: "View report",
    linkUrl: "#",
  },
  play: async ({ args, canvasElement, step }) => {
    const canvas = within(canvasElement);
    await step(`open Dismissible Toast}`, async () => {
      await waitFor(() => {
        const buttonElement = canvas.getByText(`Open ${args.severity} toast`);
        userEvent.hover(buttonElement);
        userEvent.click(buttonElement);
        userEvent.tab();
      });
    });

    await step("link in toast", async () => {
      await waitFor(() => {
        const toastLink = canvas.getByText(args.linkText || "");
        expect(toastLink).toHaveAttribute("href", args.linkUrl);
      });
    });

    await step("dismiss toast and reopen", async () => {
      await waitFor(() => {
        const toastElement = canvas.getByRole("status");
        if (toastElement) {
          const dismissToastButton = within(toastElement).getByRole("button", {
            name: "close",
          });
          if (dismissToastButton) {
            userEvent.click(dismissToastButton);
            waitFor(() => {
              expect(toastElement).not.toBeVisible();

              const buttonElement = canvas.getByText(
                `Open ${args.severity} toast`,
              );
              userEvent.click(buttonElement);
            });
          }
        }
      });

      await waitForToastOpenTransition();

      await axeRun("Dismissible Toast");
    });
  },
};

export const MultipleToasts: StoryObj<ToastProps> = {
  parameters: {
    docs: {
      description: {
        story:
          "`Toast` handles the visual appearance and show/hide logic, but not positioning. To have a Toast positioned correctly, it must be wrapped inside a `ToastStack`. There should only be one ToastStack per screen, regardless of how many Toasts there are, since a single ToastStack can accept multiple Toasts as children and will manage positioning accordingly.",
      },
    },
  },
  render: function C({}) {
    const [toasts, setToasts] = useState([
      <Toast
        isDismissable
        isVisible={true}
        severity="info"
        text="The mission to Sagittarius A is set for January 7."
        key={Math.random()}
      />,
      <Toast
        isDismissable
        isVisible={true}
        severity="success"
        text="Docking completed."
        key={Math.random()}
      />,
    ]);

    const addToast = () => {
      const toastOptions = [
        <Toast
          isVisible={true}
          severity="warning"
          isDismissable
          text={`Severe solar winds may delay local system flights.`}
          key={Math.random()}
        />,
        <Toast
          isVisible={true}
          severity="error"
          isDismissable
          text={`Security breach in Hangar 10.`}
          key={Math.random()}
        />,
      ];

      setToasts([
        ...toasts,
        toastOptions[Math.floor(Math.random() * toastOptions.length)],
      ]);
    };

    return (
      <>
        <Button
          label="Open another Toast"
          onClick={addToast}
          variant="primary"
        />
        <ToastStack>{toasts}</ToastStack>
      </>
    );
  },
};
