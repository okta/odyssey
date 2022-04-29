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

import React from "react";
import { Story } from "@storybook/react";
import { FormEventHandler } from "react";
import {
  Toast,
  ToastProps,
  ToastObject,
  useToast,
  Box,
  Select,
  FieldGroup,
  TextInput,
  Button,
  Form,
} from "@okta/odyssey-react";
import { Toast as Source } from "../../../../odyssey-react/src";

import ToastMdx from "./Toast.mdx";

export default {
  title: `Components/Toast`,
  component: Source,
  parameters: {
    layout: "fullscreen",
    docs: {
      page: ToastMdx,
    },
  },
  argTypes: {
    heading: {
      defaultValue: "Heading",
      control: {
        type: "text",
      },
    },
    body: {
      defaultValue: "Toast body text.",
      control: { type: "text" },
    },
    dismissButtonLabel: {
      defaultValue: "Close Toast",
      control: { type: "text" },
    },
  },
};

const Template: Story<ToastProps> = (args) => <Toast {...args} />;
const TemplateProvider: Story<ToastProps> = () => {
  return (
    <Toast.Provider
      dismissButtonLabel="Close Toast"
      onToastExit={(id) => {
        console.log(`toastExited: ${id}`);
      }}
    >
      <DemoApp />
    </Toast.Provider>
  );
};

/**
 * A simple demo application which shows how to implement
 * the Toast.Provider in your own app.
 */
const DemoApp = () => {
  const { addToast } = useToast();

  const handleSubmit: FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const toastObj = {
      heading: formData.get("heading"),
      body: formData.get("body"),
      variant: formData.get("variant"),
    } as ToastObject;

    addToast(toastObj);
  };

  return (
    <Box padding="m">
      <Form onSubmit={handleSubmit}>
        <Form.Main>
          <FieldGroup
            legend="Toast Provider Demo"
            desc="This demo shows you how the toast should appear within an app!"
          >
            <Select
              defaultValue="info"
              label="The visual variant to be displayed to the user."
              name="variant"
              id="variant"
            >
              <Select.Option value="info">info</Select.Option>
              <Select.Option value="success">success</Select.Option>
              <Select.Option value="caution">caution</Select.Option>
              <Select.Option value="danger">danger</Select.Option>
            </Select>
            <TextInput
              label="Heading"
              hint="The heading to be displayed on the toast."
              name="heading"
              id="heading"
              defaultValue="Shuttle Endeavour has reached the hangar"
            />
            <TextInput
              label="Body"
              hint="Supplemental information. Be concise - less than three lines of content - as your Toast will soon vanish!"
              name="body"
              id="body"
              defaultValue="No further action is necessary at this time."
            />
          </FieldGroup>
        </Form.Main>
        <Form.Actions>
          <Button type="submit">Emit toast</Button>
        </Form.Actions>
      </Form>
    </Box>
  );
};

export const Info = Template.bind({});
Info.args = {
  variant: "info",
};

export const Success = Template.bind({});
Success.args = {
  variant: "success",
};

export const Caution = Template.bind({});
Caution.args = {
  variant: "caution",
};

export const Danger = Template.bind({});
Danger.args = {
  variant: "danger",
};

export const ToastProvider = TemplateProvider.bind({});
ToastProvider.storyName = "Toast.Provider";
ToastProvider.args = {};
