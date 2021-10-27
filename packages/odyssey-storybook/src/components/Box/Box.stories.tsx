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
import type { ReactElement } from "react";
import { Box as Source } from "../../../../odyssey-react/src";
import { Box, BoxProps, List, Heading, Icon } from "@okta/odyssey-react";

export default {
  title: `Components/Box`,
  component: Source,
  argTypes: { onClick: { action: "clicked" } },
};

const Template: Story<BoxProps> = (args) => <Box {...args}>Box</Box>;

export const Default = Template.bind({});

Default.args = {
  borderColor: "display",
  hoverBorderColor: "interactive",
  borderRadius: "base",
  boxShadow: "default",
  hoverBoxShadow: "default",
  padding: "medium",
  focusRing: "primary",
  tabIndex: 0,
};

export const ActionList = (args: BoxProps): ReactElement => (
  <div className="action-list-container">
    <List unstyled>
      <List.Item>
        <Box
          {...args}
          borderColor="display"
          hoverBorderColor="interactive"
          borderRadius="base"
          boxShadow="default"
          hoverBoxShadow="default"
          padding="medium"
          focusRing="primary"
          tabIndex={0}
          role="button"
          display="flex"
          alignItems="center"
          marginBottom="small"
        >
          <Box marginRight="medium">
            <Icon name="user" />
          </Box>
          <Box flexGrow="1">
            <Heading level="2" visualLevel="6">
              User
            </Heading>
            <p className="action-card-sub">Text related to user</p>
          </Box>
        </Box>
      </List.Item>
      <List.Item>
        <Box
          {...args}
          borderColor="display"
          hoverBorderColor="interactive"
          borderRadius="base"
          boxShadow="default"
          hoverBoxShadow="default"
          padding="medium"
          focusRing="primary"
          tabIndex={0}
          role="button"
          display="flex"
          alignItems="center"
        >
          <Box marginRight="medium">
            <Icon name="settings" />
          </Box>
          <Box flexGrow="1">
            <Heading level="2" visualLevel="6">
              Settings
            </Heading>
            <p className="action-card-sub">Text related to settings</p>
          </Box>
        </Box>
      </List.Item>
    </List>
  </div>
);
