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
import Infobox from ".";
import Link from "../Link";
import type { Props } from ".";

export default {
  title: `Components/Infobox`,
  component: Infobox,
  argTypes: {
    children: {
      control: { type: null },
    },
    title: {
      defaultValue: "Infobox title",
      control: { type: "text" },
    },
  },
};

const content =
  "An infobox is a type of alert that provides feedback in response to a user action or system activity.";
const actions = (
  <Link href="https://ww.okta.com" variant="secondary">
    Link to associated action
  </Link>
);

const Template: Story<Props> = ({ title, variant }) => (
  <Infobox
    title={title}
    variant={variant}
    content={content}
    actions={actions}
  />
);

export const Info = Template.bind({});
Info.args = {
  variant: "info",
};

export const Danger = Template.bind({});
Danger.args = {
  variant: "danger",
};

export const Caution = Template.bind({});
Caution.args = {
  variant: "caution",
};

export const Success = Template.bind({});
Success.args = {
  variant: "success",
};
