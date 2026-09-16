/*!
 * Copyright (c) 2026-present, Okta, Inc. and/or its affiliates. All rights reserved.
 * The Okta software accompanied by this notice is provided pursuant to the Apache License, Version 2.0 (the "License.")
 *
 * You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0.
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *
 * See the License for the specific language governing permissions and limitations under the License.
 */

import type { Meta, StoryObj } from "@storybook/react-vite";

import {
  AgentGatewayGraphNodeCard,
  AiAgentGraphNodeCard,
  ApplicationGraphNodeCard,
  AuthorizationServerGraphNodeCard,
  GraphCanvasStateProvider,
  GraphNodeAttribute,
  GraphNodeCard,
  GroupGraphNodeCard,
  McpServerGraphNodeCard,
  OktaAuraIcon,
  ResourceServerGraphNodeCard,
  SecretGraphNodeCard,
  UserGraphNodeCard,
} from "@okta/odyssey-contributions-wp-components";
import { UserIcon } from "@okta/odyssey-react-mui/icons";
import { type ComponentProps, useEffect } from "react";
import { useArgs } from "storybook/preview-api";

import {
  staticBoardParameters,
  StoryCell,
  StoryGrid,
  StorySection,
} from "../../tools/boardStoryHelpers.js";
import icons from "../../tools/iconUtils.js";
import { OdysseyStorybookThemeDecorator } from "../../tools/OdysseyStorybookThemeDecorator.js";
import { WpComponentsStorybookThemeDecorator } from "../../tools/WpComponentsStorybookThemeDecorator.js";

const attributesListOptions = [
  "none",
  "one label",
  "one label with icon",
  "one label with value",
  "one label with warning",
  "one label with icon and value",
  "one label with value and warning",
  "multiple",
] as const;

/**
 * Custom story args that are not props of the component being rendered,
 * but are used to control the story's rendering.
 */
type CustomStoryArgs = {
  attributesListOption: (typeof attributesListOptions)[number];
  expanded: boolean;
};

type StoryArgs = ComponentProps<typeof GraphNodeCard> & CustomStoryArgs;

const meta = {
  component: GraphNodeCard,
  decorators: [
    OdysseyStorybookThemeDecorator,
    WpComponentsStorybookThemeDecorator,
  ],
  tags: ["autodocs"],
  argTypes: {
    actions: {
      control: { type: "check" },
      description:
        "Controls the actions rendered in the card. This is only for demonstration purposes in Storybook; the actions are typically determined by the node data.",
      name: "actions",
      mapping: {
        "Add graph node action": "addGraphNode",
      },
      options: ["Add graph node action"],
    },
    attributes: {
      control: false,
      table: {
        disable: true,
      },
    },
    attributesListOption: {
      control: "select",
      description: "Controls the attributes rendered in the card.",
      name: "attributes",
      options: attributesListOptions,
    },
    viewDetailsLabel: {
      control: "text",
      description: "Overrides the accessible name and tooltip.",
    },
    expanded: {
      control: "boolean",
      description:
        "Overrides the default collapsed state of the card. This is only for demonstration purposes in Storybook; the card's expanded/collapsed state is controlled by the GraphCanvasStateProvider.",
    },
    icon: {
      control: "select",
      description:
        "The icon to display in the card. This is only for demonstration purposes in Storybook; the icon is typically determined by the node type.",
      mapping: icons,
      options: Object.keys(icons),
    },
    iconBackgroundColor: {
      control: "color",
      description:
        "The background color of the icon in the card. This is only for demonstration purposes in Storybook; the icon background color is typically determined by the node type.",
    },
    iconColor: {
      control: "color",
      description:
        "The color of the icon in the card. This is only for demonstration purposes in Storybook; the icon color is typically determined by the node type.",
    },
    title: {
      control: "text",
      description:
        "The title of the card. This is only for demonstration purposes in Storybook; the title is typically determined by the node data.",
    },
    type: {
      control: "text",
      description:
        "The type of the node. This is only for demonstration purposes in Storybook; the type is typically determined by the node data.",
    },
    moreConnectionsCount: {
      control: "number",
      description:
        "The number of additional connections to display in the card's disclosure indicator. If this is set, the card will render a disclosure indicator with the number of additional connections.",
    },
    moreConnectionsLabel: {
      control: "text",
      description:
        'Overrides the connections disclosure indicator\'s label while collapsed. Expanding it always shows "Hide connections" regardless of this override.',
    },
    nodeId: {
      control: false,
      description: "The unique identifier for the node.",
    },
  },
  args: {
    attributes: [],
    attributesListOption: "none",
    expanded: true,
    icon: <UserIcon />,
    iconBackgroundColor: "#EAEAEA",
    iconColor: "#272727",
    nodeId: "node-1",
    title: "John Doe",
    type: "user",
  },
} satisfies Meta<StoryArgs>;

export default meta;

type Story = StoryObj<StoryArgs>;

export const Playground: Story = {
  render: function C({ expanded, ...args }) {
    const [{ attributes, attributesListOption: attributeList }, updateArgs] =
      useArgs<StoryArgs>();

    useEffect(() => {
      switch (attributeList) {
        case "multiple":
          updateArgs({
            attributes: [
              <GraphNodeAttribute key="1" label="https://www.web.com/" />,
              <GraphNodeAttribute
                icon={<OktaAuraIcon />}
                key="2"
                label="first.last@email.com"
              />,
              <GraphNodeAttribute
                key="3"
                label="Profile"
                value="4 attributes"
              />,
              <GraphNodeAttribute
                key="4"
                label="Incomplete profile"
                status="warning"
              />,
              <GraphNodeAttribute
                icon={<OktaAuraIcon />}
                key="5"
                label="Domain"
                value="2 entries"
              />,
              <GraphNodeAttribute
                key="6"
                label="Manages"
                status="warning"
                value="3 users"
              />,
            ],
          });
          break;
        case "none":
          updateArgs({ attributes: [] });
          break;
        case "one label":
          updateArgs({
            attributes: <GraphNodeAttribute label="https://www.web.com/" />,
          });
          break;
        case "one label with icon":
          updateArgs({
            attributes: (
              <GraphNodeAttribute
                icon={<OktaAuraIcon />}
                label="first.last@email.com"
              />
            ),
          });
          break;
        case "one label with icon and value":
          updateArgs({
            attributes: (
              <GraphNodeAttribute
                icon={<OktaAuraIcon />}
                label="Domain"
                value="2 entries"
              />
            ),
          });
          break;
        case "one label with value":
          updateArgs({
            attributes: (
              <GraphNodeAttribute
                key="Profile"
                label="Profile"
                value="4 attributes"
              />
            ),
          });
          break;
        case "one label with value and warning":
          updateArgs({
            attributes: (
              <GraphNodeAttribute
                label="Manages"
                status="warning"
                value="3 users"
              />
            ),
          });
          break;
        case "one label with warning":
          updateArgs({
            attributes: (
              <GraphNodeAttribute label="Incomplete profile" status="warning" />
            ),
          });
          break;
      }
    }, [attributeList, updateArgs]);

    return (
      // Added a key to force a re-render of the GraphCanvasStateProvider when the expanded arg changes,
      // so that the card's expanded/collapsed state updates in Storybook.
      <GraphCanvasStateProvider
        initialAllNodesExpanded={expanded}
        key={`${expanded}`}
      >
        <GraphNodeCard {...args} attributes={attributes} />
      </GraphCanvasStateProvider>
    );
  },
};

export const AllCollapsedEntityPatterns: Story = {
  name: "All collapsed entity patterns",
  parameters: staticBoardParameters,
  render: function C(args) {
    return (
      <StorySection title="Every combination of collapsed entity nodes. Focus / hover a card to reveal its tooltip and add connection button. Focus / hover the add connection button to reveal its tooltip.">
        <StoryGrid columns={2}>
          <StoryCell label="default">
            <GraphCanvasStateProvider initialAllNodesExpanded={false}>
              <GraphNodeCard
                actions={["addGraphNode"]}
                icon={args.icon}
                nodeId="node-1"
                title="John Doe"
                type={args.type}
              />
            </GraphCanvasStateProvider>
          </StoryCell>

          <StoryCell label="with connections">
            <GraphCanvasStateProvider initialAllNodesExpanded={false}>
              <GraphNodeCard
                actions={["addGraphNode"]}
                icon={args.icon}
                moreConnectionsCount={3}
                nodeId="node-1"
                title="John Doe"
                type={args.type}
              />
            </GraphCanvasStateProvider>
          </StoryCell>
        </StoryGrid>
      </StorySection>
    );
  },
};

export const AllCollapsedConsolidatedPatterns: Story = {
  name: "All collapsed consolidated patterns",
  parameters: staticBoardParameters,
  render: function C(args) {
    return (
      <StorySection title="Every combination of collapsed consolidated nodes. Focus / hover a card to reveal its overridden tooltip and add connection button. Focus / hover the add connection button to reveal its tooltip.">
        <StoryGrid columns={2}>
          <StoryCell label="default">
            <GraphCanvasStateProvider initialAllNodesExpanded={false}>
              <GraphNodeCard
                actions={["addGraphNode"]}
                icon={args.icon}
                nodeId="node-1"
                title="10 users"
                type={args.type}
                viewDetailsLabel="View all users"
              />
            </GraphCanvasStateProvider>
          </StoryCell>

          <StoryCell label="with connections">
            <GraphCanvasStateProvider initialAllNodesExpanded={false}>
              <GraphNodeCard
                actions={["addGraphNode"]}
                icon={args.icon}
                moreConnectionsCount={3}
                nodeId="node-1"
                title="10 users"
                type={args.type}
                viewDetailsLabel="View all users"
              />
            </GraphCanvasStateProvider>
          </StoryCell>
        </StoryGrid>
      </StorySection>
    );
  },
};

export const AllExpandedEntityPatterns: Story = {
  name: "All expanded entity patterns",
  parameters: staticBoardParameters,
  render: function C(args) {
    return (
      <StorySection title="Every combination of expanded entity nodes. Focus / hover a card to reveal its tooltip and add connection button. Focus / hover the add connection button to reveal its tooltip.">
        <StoryGrid columns={3}>
          <StoryCell label="no attributes">
            <GraphCanvasStateProvider>
              <GraphNodeCard
                actions={["addGraphNode"]}
                icon={args.icon}
                nodeId="node-1"
                title="John Doe"
                type={args.type}
              />
            </GraphCanvasStateProvider>
          </StoryCell>

          <StoryCell label="no attributes with connections indicator">
            <GraphCanvasStateProvider>
              <GraphNodeCard
                actions={["addGraphNode"]}
                icon={args.icon}
                moreConnectionsCount={3}
                nodeId="node-1"
                title="John Doe"
                type={args.type}
              />
            </GraphCanvasStateProvider>
          </StoryCell>

          <StoryCell label="no attributes with connections indicator label override">
            <GraphCanvasStateProvider>
              <GraphNodeCard
                actions={["addGraphNode"]}
                icon={args.icon}
                moreConnectionsCount={3}
                moreConnectionsLabel="View all connections"
                nodeId="node-1"
                title="John Doe"
                type={args.type}
              />
            </GraphCanvasStateProvider>
          </StoryCell>

          <StoryCell label="one attribute">
            <GraphCanvasStateProvider>
              <GraphNodeCard
                actions={["addGraphNode"]}
                attributes={<GraphNodeAttribute label="https://www.web.com/" />}
                icon={args.icon}
                nodeId="node-1"
                title="John Doe"
                type={args.type}
              />
            </GraphCanvasStateProvider>
          </StoryCell>

          <StoryCell label="one attribute with connections indicator">
            <GraphCanvasStateProvider>
              <GraphNodeCard
                actions={["addGraphNode"]}
                attributes={<GraphNodeAttribute label="https://www.web.com/" />}
                icon={args.icon}
                moreConnectionsCount={3}
                nodeId="node-1"
                title="John Doe"
                type={args.type}
              />
            </GraphCanvasStateProvider>
          </StoryCell>

          <StoryCell label="one attribute with connections indicator label override">
            <GraphCanvasStateProvider>
              <GraphNodeCard
                actions={["addGraphNode"]}
                attributes={<GraphNodeAttribute label="https://www.web.com/" />}
                icon={args.icon}
                moreConnectionsCount={3}
                moreConnectionsLabel="View all connections"
                nodeId="node-1"
                title="John Doe"
                type={args.type}
              />
            </GraphCanvasStateProvider>
          </StoryCell>

          <StoryCell label="multiple attributes">
            <GraphCanvasStateProvider>
              <GraphNodeCard
                actions={["addGraphNode"]}
                attributes={[
                  <GraphNodeAttribute
                    key="john.doe@email.com"
                    label="john.doe@email.com"
                  />,
                  <GraphNodeAttribute
                    key="Profile"
                    label="Profile"
                    value="4 attributes"
                  />,
                  <GraphNodeAttribute
                    key="Manages"
                    label="Manages"
                    status="warning"
                    value="3 users"
                  />,
                ]}
                icon={args.icon}
                nodeId="node-1"
                title="John Doe"
                type={args.type}
              />
            </GraphCanvasStateProvider>
          </StoryCell>

          <StoryCell label="multiple attributes with connections indicator">
            <GraphCanvasStateProvider>
              <GraphNodeCard
                actions={["addGraphNode"]}
                attributes={[
                  <GraphNodeAttribute
                    key="john.doe@email.com"
                    label="john.doe@email.com"
                  />,
                  <GraphNodeAttribute
                    key="Profile"
                    label="Profile"
                    value="4 attributes"
                  />,
                  <GraphNodeAttribute
                    key="Manages"
                    label="Manages"
                    status="warning"
                    value="3 users"
                  />,
                ]}
                icon={args.icon}
                moreConnectionsCount={3}
                nodeId="node-1"
                title="John Doe"
                type={args.type}
              />
            </GraphCanvasStateProvider>
          </StoryCell>

          <StoryCell label="multiple attributes with connections indicator label override">
            <GraphCanvasStateProvider>
              <GraphNodeCard
                actions={["addGraphNode"]}
                attributes={[
                  <GraphNodeAttribute
                    key="john.doe@email.com"
                    label="john.doe@email.com"
                  />,
                  <GraphNodeAttribute
                    key="Profile"
                    label="Profile"
                    value="4 attributes"
                  />,
                  <GraphNodeAttribute
                    key="Manages"
                    label="Manages"
                    status="warning"
                    value="3 users"
                  />,
                ]}
                icon={args.icon}
                moreConnectionsCount={3}
                moreConnectionsLabel="View all connections"
                nodeId="node-1"
                title="John Doe"
                type={args.type}
              />
            </GraphCanvasStateProvider>
          </StoryCell>
        </StoryGrid>
      </StorySection>
    );
  },
};

export const AllExpandedConsolidatedPatterns: Story = {
  name: "All expanded consolidated patterns",
  parameters: staticBoardParameters,
  render: function C(args) {
    return (
      <StorySection title="Every combination of expanded consolidated nodes. Focus / hover a card to reveal its overridden tooltip and add connection button. Focus / hover the add connection button to reveal its tooltip.">
        <StoryGrid columns={3}>
          <StoryCell label="no attributes">
            <GraphCanvasStateProvider>
              <GraphNodeCard
                actions={["addGraphNode"]}
                icon={args.icon}
                nodeId="node-1"
                title="10 users"
                type={args.type}
                viewDetailsLabel="View all users"
              />
            </GraphCanvasStateProvider>
          </StoryCell>

          <StoryCell label="no attributes with connections indicator">
            <GraphCanvasStateProvider>
              <GraphNodeCard
                actions={["addGraphNode"]}
                icon={args.icon}
                moreConnectionsCount={3}
                nodeId="node-1"
                title="10 users"
                type={args.type}
                viewDetailsLabel="View all users"
              />
            </GraphCanvasStateProvider>
          </StoryCell>

          <StoryCell label="no attributes with connections indicator label override">
            <GraphCanvasStateProvider>
              <GraphNodeCard
                actions={["addGraphNode"]}
                icon={args.icon}
                moreConnectionsCount={3}
                moreConnectionsLabel="View all connections"
                nodeId="node-1"
                title="10 users"
                type={args.type}
                viewDetailsLabel="View all users"
              />
            </GraphCanvasStateProvider>
          </StoryCell>

          <StoryCell label="one attribute">
            <GraphCanvasStateProvider>
              <GraphNodeCard
                actions={["addGraphNode"]}
                attributes={<GraphNodeAttribute label="https://www.web.com/" />}
                icon={args.icon}
                nodeId="node-1"
                title="10 users"
                type={args.type}
                viewDetailsLabel="View all users"
              />
            </GraphCanvasStateProvider>
          </StoryCell>

          <StoryCell label="one attribute with connections indicator">
            <GraphCanvasStateProvider>
              <GraphNodeCard
                actions={["addGraphNode"]}
                attributes={<GraphNodeAttribute label="https://www.web.com/" />}
                icon={args.icon}
                moreConnectionsCount={3}
                nodeId="node-1"
                title="10 users"
                type={args.type}
                viewDetailsLabel="View all users"
              />
            </GraphCanvasStateProvider>
          </StoryCell>

          <StoryCell label="one attribute with connections indicator label override">
            <GraphCanvasStateProvider>
              <GraphNodeCard
                actions={["addGraphNode"]}
                attributes={<GraphNodeAttribute label="https://www.web.com/" />}
                icon={args.icon}
                moreConnectionsCount={3}
                moreConnectionsLabel="View all connections"
                nodeId="node-1"
                title="10 users"
                type={args.type}
                viewDetailsLabel="View all users"
              />
            </GraphCanvasStateProvider>
          </StoryCell>

          <StoryCell label="multiple attributes">
            <GraphCanvasStateProvider>
              <GraphNodeCard
                actions={["addGraphNode"]}
                attributes={[
                  <GraphNodeAttribute
                    key="john.doe@email.com"
                    label="john.doe@email.com"
                  />,
                  <GraphNodeAttribute
                    key="Profile"
                    label="Profile"
                    value="4 attributes"
                  />,
                  <GraphNodeAttribute
                    key="Manages"
                    label="Manages"
                    status="warning"
                    value="3 users"
                  />,
                ]}
                icon={args.icon}
                nodeId="node-1"
                title="10 users"
                type={args.type}
                viewDetailsLabel="View all users"
              />
            </GraphCanvasStateProvider>
          </StoryCell>

          <StoryCell label="multiple attributes with connections indicator">
            <GraphCanvasStateProvider>
              <GraphNodeCard
                actions={["addGraphNode"]}
                attributes={[
                  <GraphNodeAttribute
                    key="john.doe@email.com"
                    label="john.doe@email.com"
                  />,
                  <GraphNodeAttribute
                    key="Profile"
                    label="Profile"
                    value="4 attributes"
                  />,
                  <GraphNodeAttribute
                    key="Manages"
                    label="Manages"
                    status="warning"
                    value="3 users"
                  />,
                ]}
                icon={args.icon}
                moreConnectionsCount={3}
                nodeId="node-1"
                title="10 users"
                type={args.type}
                viewDetailsLabel="View all users"
              />
            </GraphCanvasStateProvider>
          </StoryCell>

          <StoryCell label="multiple attributes with connections indicator label override">
            <GraphCanvasStateProvider>
              <GraphNodeCard
                actions={["addGraphNode"]}
                attributes={[
                  <GraphNodeAttribute
                    key="john.doe@email.com"
                    label="john.doe@email.com"
                  />,
                  <GraphNodeAttribute
                    key="Profile"
                    label="Profile"
                    value="4 attributes"
                  />,
                  <GraphNodeAttribute
                    key="Manages"
                    label="Manages"
                    status="warning"
                    value="3 users"
                  />,
                ]}
                icon={args.icon}
                moreConnectionsCount={3}
                moreConnectionsLabel="View all connections"
                nodeId="node-1"
                title="10 users"
                type={args.type}
                viewDetailsLabel="View all users"
              />
            </GraphCanvasStateProvider>
          </StoryCell>
        </StoryGrid>
      </StorySection>
    );
  },
};

export const AllPerTypeCards: Story = {
  name: "All per-type cards",
  parameters: staticBoardParameters,
  render: function C() {
    return (
      <StorySection title="Every per-type GraphNodeCard wrapper, each fixing its own type, icon, and swatch colors.">
        <StoryGrid columns={3}>
          <StoryCell label="AiAgentGraphNodeCard (default)">
            <GraphCanvasStateProvider>
              <AiAgentGraphNodeCard nodeId="node-1" title="Support agent" />
            </GraphCanvasStateProvider>
          </StoryCell>

          <StoryCell label="AiAgentGraphNodeCard (isFocal)">
            <GraphCanvasStateProvider>
              <AiAgentGraphNodeCard
                isFocal
                nodeId="node-2"
                title="Escalation agent"
              />
            </GraphCanvasStateProvider>
          </StoryCell>

          <StoryCell label="ApplicationGraphNodeCard">
            <GraphCanvasStateProvider>
              <ApplicationGraphNodeCard nodeId="node-3" title="Workday" />
            </GraphCanvasStateProvider>
          </StoryCell>

          <StoryCell label="GroupGraphNodeCard">
            <GraphCanvasStateProvider>
              <GroupGraphNodeCard nodeId="node-4" title="Engineering" />
            </GraphCanvasStateProvider>
          </StoryCell>

          <StoryCell label="UserGraphNodeCard">
            <GraphCanvasStateProvider>
              <UserGraphNodeCard nodeId="node-5" title="Jane Doe" />
            </GraphCanvasStateProvider>
          </StoryCell>

          <StoryCell label="AgentGatewayGraphNodeCard">
            <GraphCanvasStateProvider>
              <AgentGatewayGraphNodeCard
                nodeId="node-6"
                title="Production gateway"
              />
            </GraphCanvasStateProvider>
          </StoryCell>

          <StoryCell label="McpServerGraphNodeCard">
            <GraphCanvasStateProvider>
              <McpServerGraphNodeCard
                nodeId="node-7"
                title="Search MCP server"
              />
            </GraphCanvasStateProvider>
          </StoryCell>

          <StoryCell label="AuthorizationServerGraphNodeCard">
            <GraphCanvasStateProvider>
              <AuthorizationServerGraphNodeCard
                nodeId="node-8"
                title="Default authorization server"
              />
            </GraphCanvasStateProvider>
          </StoryCell>

          <StoryCell label="SecretGraphNodeCard">
            <GraphCanvasStateProvider>
              <SecretGraphNodeCard nodeId="node-9" title="API key" />
            </GraphCanvasStateProvider>
          </StoryCell>

          <StoryCell label="ResourceServerGraphNodeCard">
            <GraphCanvasStateProvider>
              <ResourceServerGraphNodeCard
                nodeId="node-10"
                title="Payments API"
              />
            </GraphCanvasStateProvider>
          </StoryCell>
        </StoryGrid>
      </StorySection>
    );
  },
};
