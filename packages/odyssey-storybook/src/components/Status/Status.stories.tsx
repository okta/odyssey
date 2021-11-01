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

import type { Story } from "@storybook/react";
import { Status, StatusProps } from "@okta/odyssey-react";
import { Status as Source } from "../../../../odyssey-react/src";

import StatusMdx from "./Status.mdx";

export default {
  title: `Components/Status`,
  component: Source,
  parameters: {
    layout: "fullscreen",
    docs: {
      page: StatusMdx,
    },
  },
  argTypes: {
    labelHidden: {
      control: { type: "boolean" },
    },
  },
};

const Template: Story<StatusProps> = ({
  label,
  descriptor,
  labelHidden,
  variant,
}) => (
  <Status
    label={label}
    descriptor={descriptor}
    labelHidden={labelHidden}
    variant={variant}
  />
);

export const Neutral = Template.bind({});
Neutral.args = {
  variant: "neutral",
  label: "Status Label",
  descriptor: "Neutral Descriptor",
};

export const Success = Template.bind({});
Success.args = {
  variant: "success",
  label: "Status Label",
  descriptor: "Success Descriptor",
};

export const Caution = Template.bind({});
Caution.args = {
  variant: "caution",
  label: "Status Label",
  descriptor: "Caution Descriptor",
};

export const Danger = Template.bind({});
Danger.args = {
  variant: "danger",
  label: "Status Label",
  descriptor: "Danger Descriptor",
};

export const WithLabelHidden = Template.bind({});
WithLabelHidden.storyName = "with label hidden";
WithLabelHidden.args = {
  labelHidden: true,
  variant: "danger",
  label: "Status Label",
  descriptor: "Danger Descriptor",
};
