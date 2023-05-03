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

import { Meta, Story } from "@storybook/react";
import { Button, Toast, ToastProps, ToastStack } from "@okta/odyssey-react-mui";
import { useCallback, useState } from "react";

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

export default storybookMeta;

const DefaultTemplate: Story<ToastProps> = (args) => {
  const [isVisible, setIsVisible] = useState(false);

  const openToast = useCallback(() => {
    setIsVisible(true);
  }, []);

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
};

DefaultTemplate.args = {
  severity: "info",
  text: "The mission to Sagittarius A is set for January 7.",
};

const StaticTemplate: Story<ToastProps> = (args) => {
  return <Toast {...args}></Toast>;
};

StaticTemplate.args = {
  isVisible: true,
};

StaticTemplate.args = {
  severity: "info",
  text: "The mission to Sagittarius A is set for January 7.",
};

const MultipleTemplate: Story<ToastProps> = () => {
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
      <Toast isVisible={true} severity="success" text={`Docking completed.`} />,
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
};

export const DismissibleStatic = StaticTemplate.bind({});
DismissibleStatic.args = {
  isDismissable: true,
  linkText: "View report",
  linkUrl: "#",
};

export const MultipleToasts = MultipleTemplate.bind({});
MultipleToasts.args = {};
