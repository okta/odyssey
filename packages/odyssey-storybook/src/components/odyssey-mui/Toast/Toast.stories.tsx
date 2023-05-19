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
import { Button, Toast, ToastProps, ToastStack } from "@okta/odyssey-react-mui";
import { useCallback, useState } from "react";

import { MuiThemeDecorator } from "../../../../.storybook/components";

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
  decorators: [MuiThemeDecorator],
};

export default meta;

const Single: StoryObj<ToastProps> = {
  render: function C(props) {
    const [isVisible, setIsVisible] = useState(false);
    const openToast = useCallback(() => setIsVisible(true), []);
    return (
      <>
        <Button
          variant="primary"
          onClick={openToast}
          text={`Open ${props.severity} toast`}
        />
        <ToastStack>
          <Toast
            autoHideDuration={props.autoHideDuration}
            isDismissable={props.isDismissable}
            linkText={props.linkText}
            linkUrl={props.linkUrl}
            isVisible={isVisible}
            onHide={() => setIsVisible(false)}
            role={props.role}
            severity={props.severity}
            text={props.text}
          />
        </ToastStack>
      </>
    );
  },
  args: {
    severity: "info",
    linkText: "Info",
    text: "The mission to Sagittarius A is set for January 7.",
  },
};

const Static: StoryObj<ToastProps> = {
  ...Single,
  args: {
    isVisible: true,
    severity: "info",
    text: "The mission to Sagittarius A is set for January 7.",
  },
};

export const Info: StoryObj<ToastProps> = {
  ...Single,
  args: {
    isVisible: true,
    text: "Testing",
    severity: "info",
  },
};

export const InfoStatic: StoryObj<ToastProps> = {
  ...Static,
  args: {
    isVisible: true,
    text: "Hello world!",
    severity: "info",
  },
};

export const Error = {
  ...Single,
  args: {
    text: "Security breach in Hangar 18",
    role: "alert",
    severity: "error",
  },
};

export const ErrorStatic: StoryObj<ToastProps> = {
  ...Static,
  args: {
    isVisible: true,
    text: "Security breach in Hangar 18",
    role: "alert",
    severity: "error",
  },
};

export const Warning: StoryObj<ToastProps> = {
  ...Single,
  args: {
    text: "Severe solar winds may delay local system flights",
    role: "status",
    severity: "warning",
  },
};

export const WarningStatic: StoryObj<ToastProps> = {
  ...Static,
  args: {
    isVisible: true,
    text: "Severe solar winds may delay local system flights",
    role: "status",
    severity: "warning",
  },
};

export const Success: StoryObj<ToastProps> = {
  ...Single,
  args: {
    text: "Docking completed",
    role: "status",
    severity: "success",
  },
};

export const SuccessStatic: StoryObj<ToastProps> = {
  ...Static,
  args: {
    isVisible: true,
    text: "Docking completed",
    role: "status",
    severity: "success",
  },
};

export const Dismissible: StoryObj<ToastProps> = {
  ...Single,
  args: {
    isDismissable: true,
    linkText: "View report",
    linkUrl: "#",
  },
};

export const DismissibleStatic: StoryObj<ToastProps> = {
  ...Static,
  args: {
    isVisible: true,
    isDismissable: true,
    linkText: "View report",
    linkUrl: "#",
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
      />,
      <Toast
        isDismissable
        isVisible={true}
        severity="success"
        text="Docking completed."
      />,
    ]);

    const addToast = () => {
      const toastOptions = [
        <Toast
          isVisible={true}
          severity="info"
          text={`The mission to Sagittarius A is set for January 7.`}
        />,
        <Toast
          isVisible={true}
          severity="success"
          text={`Docking completed.`}
        />,
        <Toast
          isVisible={true}
          severity="warning"
          isDismissable
          text={`Severe solar winds may delay local system flights.`}
        />,
        <Toast
          isVisible={true}
          severity="error"
          isDismissable
          text={`Security breach in Hangar 10.`}
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
