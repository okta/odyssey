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

import { Meta, ReactRenderer, StoryObj } from "@storybook/react";
import {
  Button,
  ButtonProps,
  Toast,
  ToastProps,
  ToastStack,
} from "@okta/odyssey-react-mui";
import { useCallback, useState } from "react";

import { MuiThemeDecorator } from "../../../../.storybook/components";

import { userEvent, waitFor, within } from "@storybook/testing-library";
import { expect } from "@storybook/jest";
import { axeRun } from "../../../axe-util";
// eslint-disable-next-line import/no-extraneous-dependencies
import { StepFunction } from "@storybook/types";

const meta: Meta<ToastProps> = {
  title: "MUI Components/Alerts/Toast",
  component: Toast,
  argTypes: {
    autoHideDuration: {
      control: "number",
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
    role: {
      control: "radio",
      options: ["alert", "status", undefined],
    },
    severity: {
      control: "radio",
      options: ["error", "info", "success", "warning"],
    },
    text: {
      control: "text",
    },
  },
  args: {
    severity: "info",
    role: "status",
    linkText: "Info",
    text: "The mission to Sagittarius A is set for January 7.",
  },
  decorators: [MuiThemeDecorator],
};

export default meta;

const openToast = async (
  args: ToastProps,
  canvasElement: HTMLElement,
  step: StepFunction<ReactRenderer, ButtonProps>,
  action: string
) => {
  await step("open toast, and dismiss", async () => {
    const canvas = within(canvasElement);
    const button = canvas.getByText(`Open ${args.severity} toast`);
    await userEvent.tab();
    await userEvent.click(button);
    await userEvent.tab();
    await axeRun(action);

    const toast = await canvas.getByRole(args.role || "status");
    const dismissToast =
      toast && (await toast.querySelector('[aria-label="close"]'));
    if (dismissToast) {
      setTimeout(async () => {
        dismissToast && (await waitFor(() => userEvent.click(dismissToast)));
        toast && (await waitFor(() => expect(toast).not.toBeVisible()));
      }, 1000);
    }
  });
};

const Single: StoryObj<ToastProps> = {
  args: {
    isVisible: false,
    role: "status",
  },
  render: function C(args) {
    const [isVisible, setIsVisible] = useState(args.isVisible);
    const openToast = useCallback(() => setIsVisible(true), []);
    return (
      <>
        <Button
          variant="primary"
          onClick={openToast}
          text={`Open ${args.severity} toast`}
        />
        <ToastStack>
          <Toast
            autoHideDuration={args.autoHideDuration}
            isDismissable={args.isDismissable}
            linkText={args.linkText}
            linkUrl={args.linkUrl}
            isVisible={isVisible}
            onHide={() => setIsVisible(false)}
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
    openToast(args, canvasElement, step, "Info Toast");
  },
};

export const ErrorToast: StoryObj<ToastProps> = {
  ...Single,
  args: {
    text: "Security breach in Hangar 18",
    role: "alert",
    severity: "error",
  },
  play: async ({ args, canvasElement, step }) => {
    openToast(args, canvasElement, step, "Error Toast");
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
    openToast(args, canvasElement, step, "Warning Toast");
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
    openToast(args, canvasElement, step, "Success Toast");
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
    openToast(args, canvasElement, step, "Dismissible Toast");
  },
};

export const MultipleToasts: StoryObj<ToastProps> = {
  render: function C() {
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
          text={`Security breach in Hangar 10!`}
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
        <Button onClick={addToast} text="Open another Toast" />
        <ToastStack>{toasts}</ToastStack>
      </>
    );
  },
};
