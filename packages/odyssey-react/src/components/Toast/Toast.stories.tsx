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

import { Story } from "@storybook/react";
import { FormEventHandler } from "react";
import Toast, { useToast } from ".";
import type { PropsToast, ToastVariants } from ".";

export default {
  title: `Components/Toast`,
  component: Toast,
  argTypes: {
    title: {
      defaultValue: "Title",
      control: { 
        type: "text",
      }
    },
    body: {
      defaultValue: "Toast body text.",
      control: { type: "text" }
    }
  },
};

const Template: Story<PropsToast> = (args) => <Toast {...args} />;
const TemplateProvider: Story<PropsToast> = () => {
  return (
    <Toast.Provider onToastExit={(id) => { console.log(`toastExited: ${id}`)}}>
      <DemoApp />
    </Toast.Provider>
  )
};

/**
 * A simple demo application which shows how to implement
 * the Toast.Provider in your own app.
 * 
 * @todo Replace vanilla HTML with Odyssey form components once finalized
 */
const DemoApp = () => {
  const addToast = useToast();
  
  const handleSubmit: FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();
    
    const formData = new FormData(event.currentTarget);

    addToast({
      title: formData.get('title') as string,
      body: formData.get('body') as string,
      variant: formData.get('variant') as ToastVariants
    })
  }

  return (
    <form id="form-toast-demo" onSubmit={handleSubmit}> 
        <label htmlFor="variant">Variant</label>
        <select id="variant" name="variant">
          <option>info</option>
          <option>success</option>
          <option>caution</option>
          <option>danger</option>
        </select>
        <label htmlFor="title">Title</label>
        <input id="title" name="title" type="text" defaultValue="Title" required/>
        <label htmlFor="body">Body</label>
        <input id="body" name="body" defaultValue="Descriptive body content (optional)"/>
        <input type="submit" defaultValue="Emit toast" />
    </form>
  )
}

export const Info = Template.bind({});
Info.args = {
  variant: "info"
};

export const Success = Template.bind({});
Success.args = {
  variant: "success"
};

export const Caution = Template.bind({});
Caution.args = {
  variant: "caution"
};

export const Danger = Template.bind({});
Danger.args = {
  variant: "danger"
};

export const ToastProvider = TemplateProvider.bind({});
ToastProvider.storyName = "Toast.Provider";
ToastProvider.args = {};
