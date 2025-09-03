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

import {
  Button,
  createUniqueId,
  Toast,
  ToastProps,
  toastRoleValues,
  toastSeverityValues,
  ToastStack,
} from "@okta/odyssey-react-mui";
import { Meta, StoryObj } from "@storybook/react";
import { expect, userEvent, waitFor, within } from "@storybook/test";
import { useCallback, useState } from "react";

import { axeRun } from "../../../axe-util.js";

const meta = {
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
          summary: "6000",
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
          summary: "false",
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
  tags: ["autodocs"],
} satisfies Meta<typeof Toast>;

export default meta;

type Story = StoryObj<typeof meta>;

const openToast =
  (actionName: string): Story["play"] =>
  ({ args, canvasElement, step }) =>
    step(`open ${actionName}`, async () => {
      await waitFor(async () => {
        const buttonElement = within(canvasElement).getByText(
          `Open ${args.severity} toast`,
        );
        await userEvent.hover(buttonElement);
        await userEvent.click(buttonElement);
        await userEvent.tab();
      });

      await waitFor(() => axeRun(actionName));
    });

const Single: Story = {
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
            isVisible={isVisible}
            linkText={args.linkText}
            linkUrl={args.linkUrl}
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

export const Info: Story = {
  ...Single,
  args: {
    text: "The mission to Sagittarius A is set for January 7.",
    severity: "info",
  },
  play: openToast("Info Toast"),
};

export const ErrorToast: Story = {
  ...Single,
  name: "Error",
  args: {
    text: "Security breach in Hangar 18",
    role: "alert",
    severity: "error",
  },
  play: openToast("Error Toast"),
};

export const Warning: Story = {
  ...Single,
  args: {
    text: "Severe solar winds may delay local system flights",
    role: "status",
    severity: "warning",
  },
  play: openToast("Warning Toast"),
};

export const Success: Story = {
  ...Single,
  args: {
    text: "Docking completed",
    role: "status",
    severity: "success",
  },
  play: openToast("Success Toast"),
};

export const Dismissible: Story = {
  ...Single,
  args: {
    isDismissable: true,
    linkText: "View report",
    linkUrl: "#",
  },
  play: async ({ args, canvasElement, step }) => {
    const canvas = within(canvasElement);
    await step(`open Dismissible Toast}`, async () => {
      await waitFor(async () => {
        const buttonElement = canvas.getByText(`Open ${args.severity} toast`);
        await userEvent.hover(buttonElement);
        await userEvent.click(buttonElement);
        await userEvent.tab();
      });
    });

    await step("link in toast", async () => {
      await waitFor(() => {
        const toastLink = canvas.getByText(args.linkText || "");
        expect(toastLink).toHaveAttribute("href", args.linkUrl);
      });
    });

    await step("dismiss toast and reopen", async () => {
      await waitFor(async () => {
        const toastElement = canvas.getByRole("status");
        if (toastElement) {
          const dismissToastButton = within(toastElement).getByRole("button", {
            name: "Close",
          });
          if (dismissToastButton) {
            await userEvent.click(dismissToastButton);
            await waitFor(async () => {
              expect(toastElement).not.toBeVisible();

              const buttonElement = canvas.getByText(
                `Open ${args.severity} toast`,
              );
              await userEvent.click(buttonElement);
            });
          }
        }
      });

      await waitFor(() => axeRun("Dismissible Toast"));
    });
  },
};

export const MultipleToasts: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "`Toast` handles the visual appearance and show/hide logic, but not positioning. To have a Toast positioned correctly, it must be wrapped inside a `ToastStack`. There should only be one ToastStack per screen, regardless of how many Toasts there are, since a single ToastStack can accept multiple Toasts as children and will manage positioning accordingly.",
      },
    },
  },
  render: function C() {
    type ToastWithId = ToastProps & { id: string };

    const unstableToasts = [
      {
        id: createUniqueId(),
        severity: "info" as const,
        text: "The mission to Sagittarius A is set for January 7.",
        isDismissable: true,
        isVisible: true,
      },
      {
        id: createUniqueId(),
        severity: "success" as const,
        text: "Docking completed.",
        isDismissable: true,
        isVisible: true,
      },
    ];

    const [toasts, setToasts] = useState<ToastWithId[]>(unstableToasts);

    const addToast = useCallback(() => {
      const toastOptions = [
        {
          severity: "warning" as const,
          text: "Severe solar winds may delay local system flights.",
          isDismissable: true,
          isVisible: true,
        },
        {
          severity: "error" as const,
          text: "Security breach in Hangar 10.",
          isDismissable: true,
          isVisible: true,
        },
      ];

      const randomToast =
        toastOptions[Math.floor(Math.random() * toastOptions.length)];
      setToasts((prevToasts) => [
        ...prevToasts,
        { ...randomToast, id: createUniqueId() },
      ]);
    }, []);

    const handleDismiss = useCallback((toastId: string) => {
      setToasts((prevToasts) =>
        prevToasts.filter((toast) => toast.id !== toastId),
      );
    }, []);

    return (
      <>
        <Button
          label="Open another Toast"
          onClick={addToast}
          variant="primary"
        />
        <ToastStack>
          {toasts.map((toast) => (
            <Toast
              isDismissable={toast.isDismissable}
              isVisible={toast.isVisible}
              key={toast.id}
              onHide={() => handleDismiss(toast.id)}
              severity={toast.severity}
              text={toast.text}
            />
          ))}
        </ToastStack>
      </>
    );
  },
};
