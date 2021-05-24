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
import { action } from '@storybook/addon-actions';
import React from "react";
import Tooltip, { TooltipProps } from "./Tooltip";

import { Button } from '../../';

export default {
  title: `Components/Tooltip`,
  component: Tooltip,
  parameters:{
    layout:'centered',
  }
};

const Template: Story<TooltipProps> = () => (
  <>
    <Tooltip label="Top tooltip label" position="top">
      <Button variant="primary" onClick={action('Top button clicked')}>Top</Button>
    </Tooltip>
    <Tooltip label="Right tooltip label" position="right">
      <Button onClick={action('Right button clicked')} variant="clear">Right</Button>
    </Tooltip>
    <Tooltip label="Bottom tooltip label" position="bottom">
      <Button onClick={action('Bottom button clicked')} variant="clear">Bottom</Button>
    </Tooltip>
    <Tooltip label="Left tooltip label" position="left">
      <Button onClick={action('Left button clicked')} variant="clear">Left</Button>
    </Tooltip>
  </>
)

export const Default = Template.bind({});
