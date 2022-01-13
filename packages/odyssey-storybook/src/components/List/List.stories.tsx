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
import type { ReactElement, ReactText, KeyboardEvent } from "react";
import type { Story } from "@storybook/react";
import {
  List,
  ListProps,
  Box,
  Heading,
  UserIcon,
  SettingsIcon,
  Text,
} from "@okta/odyssey-react";
import { List as Source } from "../../../../odyssey-react/src";

export default {
  title: `Components/List`,
  component: Source,
};

const Template: Story<ListProps> = ({ listType, unstyled }) => (
  <List listType={listType} unstyled={unstyled}>
    <List.Item>Item 1</List.Item>
    <List.Item>Item 2</List.Item>
  </List>
);

export const Default = Template.bind({});
Default.args = {
  listType: "unordered",
  unstyled: false,
};

export const OrderedList = (): ReactElement => (
  <List listType="ordered">
    <List.Item>Item 1</List.Item>
    <List.Item>Item 2</List.Item>
  </List>
);

export const DescriptionList = (): ReactElement => (
  <List listType="description">
    <List.Term>Term 1</List.Term>
    <List.Details>Detail 1.1</List.Details>
    <List.Details>Detail 1.2</List.Details>
    <List.Term>Term 2</List.Term>
    <List.Details>Detail 2.1</List.Details>
  </List>
);

export const UnstyledList = (): ReactElement => (
  <List unstyled={true}>
    <List.Item>Item 1</List.Item>
    <List.Item>Item 2</List.Item>
  </List>
);

type ActionCardProps = {
  icon: ReactElement;
  heading: ReactText;
  subHeading: ReactText;
  onClick: () => void;
};

const ActionCard = ({
  icon,
  heading,
  subHeading,
  onClick,
}: ActionCardProps) => {
  function handleKeyPress(event: KeyboardEvent<HTMLDivElement>) {
    if (event.key === " " || event.key === "Enter") {
      onClick();
    }
  }

  return (
    <Box
      borderColor="display"
      hoverBorderColor="ui"
      borderRadius="base"
      boxShadow="default"
      hoverBoxShadow="default"
      padding="m"
      focusRing="primary"
      tabIndex={0}
      role="button"
      display="flex"
      alignItems="center"
      marginBottom="s"
      cursor="pointer"
      onClick={onClick}
      onKeyPress={handleKeyPress}
    >
      <Box marginRight="m">{icon}</Box>
      <Box flexGrow="1" userSelect="none">
        <Heading level="2" visualLevel="6" noEndMargin>
          {heading}
        </Heading>
        <Text marginBottom="0">{subHeading}</Text>
      </Box>
    </Box>
  );
};

export const ActionList = (): ReactElement => (
  <List unstyled={true}>
    <List.Item>
      <ActionCard
        icon={<UserIcon />}
        heading="User"
        subHeading="Text related to user"
        onClick={() => {
          console.log("click user");
        }}
      />
    </List.Item>
    <List.Item>
      <ActionCard
        icon={<SettingsIcon />}
        heading="Settings"
        subHeading="Text related to settings"
        onClick={() => {
          console.log("click settings");
        }}
      />
    </List.Item>
  </List>
);
