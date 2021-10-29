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
import { action } from "@storybook/addon-actions";
import { Tooltip, TooltipProps, Button } from "@okta/odyssey-react";
import { Tooltip as Source } from "../../../../odyssey-react/src";

import TooltipMdx from "./Tooltip.mdx";

export default {
  title: `Components/Tooltip`,
  component: Source,
  parameters: {
    layout: "centered",
    docs: {
      page: TooltipMdx,
    },
  },
};

const Template: Story<TooltipProps> = () => (
  <>
    <Tooltip label="Top tooltip label" position="top">
      <Button variant="primary" onClick={action("Top button clicked")}>
        Top
      </Button>
    </Tooltip>
    <Tooltip label="Ending tooltip label" position="end">
      <Button onClick={action("Ending button clicked")} variant="clear">
        End
      </Button>
    </Tooltip>
    <Tooltip label="Bottom tooltip label" position="bottom">
      <Button onClick={action("Bottom button clicked")} variant="clear">
        Bottom
      </Button>
    </Tooltip>
    <Tooltip label="Starting tooltip label" position="start">
      <Button onClick={action("Starting button clicked")} variant="clear">
        Start
      </Button>
    </Tooltip>
  </>
);

export const Default = Template.bind({});
