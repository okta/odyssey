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
import { Meta, StoryObj } from "@storybook/react-vite";
import { useMemo } from "react";
import { useCallback, useState } from "storybook/preview-api";

import { staticBoardParameters } from "../../../tools/boardStoryHelpers.js";
import { OdysseyStorybookThemeDecorator } from "../../../tools/OdysseyStorybookThemeDecorator.js";
import { useStoryArgOrLocalState } from "../../../tools/useStoryArgOrLocalState.js";

const meta = {
  component: Toast,
  decorators: [OdysseyStorybookThemeDecorator],
  argTypes: {
    autoHideDuration: {
      control: "number",
      description:
        "If set, this determines how long the toast should appear before automatically disappearing in milliseconds. It will only take effect if the toast is not dismissible. If left blank, it defaults to 6000",
      table: {
        category: "Functional",
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
        category: "Visual",
        type: {
          summary: "boolean",
        },
        defaultValue: {
          summary: "false",
        },
      },
    },
    isVisible: {
      control: { type: "boolean" },
      description: "If true, the Toast is visible",
      table: {
        category: "Functional",
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
        category: "Visual",
        type: {
          summary: "string",
        },
      },
    },
    linkUrl: {
      control: "text",
      description: "If defined, the alert will include a link to the URL",
      table: {
        category: "Functional",
        type: {
          summary: "string",
        },
      },
    },
    onHide: {
      control: false,
      description: "An optional function to run when the Toast is closed",
      table: {
        category: "Functional",
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
        category: "Functional",
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
        category: "Visual",
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
        category: "Visual",
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
    // Rendered visible by default so Applitools captures the Toast without a play
    // function. The "Open toast" button still shows/hides it in Canvas.
    isVisible: true,
    severity: "info",
    role: "status",
    linkText: "Info",
    text: "The mission to Sagittarius A is set for January 7.",
    autoHideDuration: 10000,
  },
} satisfies Meta<typeof Toast>;

export default meta;

type Story = StoryObj<typeof meta>;

const Single: Story = {
  args: {
    isVisible: true,
    role: "status",
  },
  render: function C(args, context) {
    const { value, setValue } = useStoryArgOrLocalState<
      ToastProps,
      "isVisible"
    >({
      args,
      context,
      argKey: "isVisible",
      defaultValue: args.isVisible,
      defaultStoryName: "Playground",
    });

    const showToast = useCallback(() => {
      setValue(true);
    }, [setValue]);

    const handleHide = useCallback(() => {
      setValue(false);
    }, [setValue]);

    return (
      <>
        <Button
          label={`Open ${args.severity} toast`}
          onClick={showToast}
          variant="primary"
        />
        <ToastStack>
          <Toast {...args} isVisible={value} onHide={handleHide} />
        </ToastStack>
      </>
    );
  },
};

export const Playground: Story = {
  ...Single,
  args: {
    text: "The mission to Sagittarius A is set for January 7.",
    severity: "info",
  },
};

export const AllVariants: Story = {
  parameters: staticBoardParameters,
  render: function C() {
    return (
      <ToastStack>
        {toastSeverityValues.flatMap((severity) =>
          [false, true].map((isDismissable) => (
            // autoHideDuration={0} disables auto-hide so every severity stays on
            // screen for the Applitools capture instead of dismissing after 6s.
            <Toast
              autoHideDuration={0}
              isDismissable={isDismissable}
              isVisible
              key={`${severity}-${isDismissable ? "dismissable" : "plain"}`}
              linkText={isDismissable ? "View report" : undefined}
              linkUrl={isDismissable ? "#" : undefined}
              role={severity === "error" ? "alert" : "status"}
              severity={severity}
              text={
                isDismissable
                  ? `This is a dismissable ${severity} toast.`
                  : `This is a ${severity} toast.`
              }
            />
          )),
        )}
      </ToastStack>
    );
  },
};

export const MultipleToasts: Story = {
  argTypes: {
    autoHideDuration: { control: false },
    isDismissable: { control: false },
    isVisible: { control: false },
    linkText: { control: false },
    linkUrl: { control: false },
    onHide: { control: false },
    role: { control: false },
    severity: { control: false },
    text: { control: false },
  },
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

    const toastData = useMemo(
      () => [
        {
          severity: "info" as const,
          text: "The mission to Sagittarius A is set for January 7.",
          isDismissable: true,
          isVisible: true,
        },
        {
          severity: "success" as const,
          text: "Docking completed.",
          isDismissable: true,
          isVisible: true,
        },
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
      ],
      [],
    );

    // Seeded with three toasts so Applitools captures the stacked state without a
    // play function. The "Open another Toast" button still appends more in Canvas.
    const [toasts, setToasts] = useState<ToastWithId[]>(() =>
      toastData
        .slice(0, 3)
        .map((toast) => ({ ...toast, id: createUniqueId() })),
    );

    const addToast = useCallback(() => {
      setToasts((prevToasts) => [
        ...prevToasts,
        {
          ...toastData[prevToasts.length % toastData.length],
          id: createUniqueId(),
        },
      ]);
    }, [toastData]);

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
