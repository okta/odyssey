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
import { Box as Source } from "../../../../odyssey-react/src";
import { Box, BoxProps } from "@okta/odyssey-react";

export default {
  title: `Utilities/Box`,
  component: Source,
};

const Template: Story<BoxProps> = (args) => <Box {...args}>Box</Box>;

export const Default = Template.bind({});

Default.args = {
  borderColor: "display",
  hoverBorderColor: "interactive",
  borderRadius: "base",
  boxShadow: "default",
  hoverBoxShadow: "default",
  padding: "m",
  focusRing: "primary",
  tabIndex: 0,
};
