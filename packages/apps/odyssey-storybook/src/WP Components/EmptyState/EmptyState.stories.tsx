/*!
 * Copyright (c) 2025-present, Okta, Inc. and/or its affiliates. All rights reserved.
 * The Okta software accompanied by this notice is provided pursuant to the Apache License, Version 2.0 (the "License.")
 *
 * You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0.
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *
 * See the License for the specific language governing permissions and limitations under the License.
 */

import { EmptyState } from "@okta/odyssey-contributions-wp-components";
import { Button } from "@okta/odyssey-react-mui";
import {
  AddCircleIcon,
  ArrowRightIcon,
  FolderIcon,
  GlobeIcon,
  SearchIcon,
  SettingsIcon,
} from "@okta/odyssey-react-mui/icons";
import { Meta, StoryObj } from "@storybook/react-vite";

import {
  staticBoardParameters,
  StoryCell,
  StoryGrid,
  StorySection,
} from "../../tools/boardStoryHelpers.js";
import { OdysseyStorybookThemeDecorator } from "../../tools/OdysseyStorybookThemeDecorator.js";
import { WpComponentsStorybookThemeDecorator } from "../../tools/WpComponentsStorybookThemeDecorator.js";

const meta = {
  component: EmptyState,
  decorators: [
    OdysseyStorybookThemeDecorator,
    WpComponentsStorybookThemeDecorator,
  ],
  tags: ["autodocs"],
} satisfies Meta<typeof EmptyState>;

export default meta;

type Story = StoryObj<typeof EmptyState>;

export const Playground: Story = {
  args: {
    description:
      "Begin by adding the AI agent client credentials to your application.",
    heading: "Set up integrations to begin importing AI Agents",
  },
};

export const AllFeatures: Story = {
  name: "All features",
  args: {
    actions: (
      <>
        <Button label="Add new application" variant="primary" />
        <Button
          label="Add AI agent import to existing app"
          variant="secondary"
        />
      </>
    ),
    description:
      "Begin by adding the AI agent client credentials to your application. Once connected, you can import and manage your AI agents.",
    heading: "Set up integrations to begin importing AI Agents",
    icons: [
      <SettingsIcon key="1" />,
      <ArrowRightIcon key="2" />,
      <GlobeIcon key="3" />,
    ],
  },
  parameters: {
    ...staticBoardParameters,
    docs: {
      description: {
        story:
          "Demonstrates all features: icon row, title, description, and action buttons.",
      },
    },
  },
};

export const AllVariants: Story = {
  name: "All variants",
  parameters: staticBoardParameters,
  render: function C() {
    return (
      <StorySection title="Every combination of icons, description, and actions.">
        <StoryGrid columns={2}>
          <StoryCell label="heading only">
            <EmptyState heading="No items found" />
          </StoryCell>

          <StoryCell label="heading + description">
            <EmptyState
              description="Try adjusting your search criteria or filters to find what you are looking for."
              heading="No results"
            />
          </StoryCell>

          <StoryCell label="single icon">
            <EmptyState
              description="We could not find any results matching your search. Try different keywords."
              heading="No search results"
              icons={[<SearchIcon key="1" />]}
            />
          </StoryCell>

          <StoryCell label="multiple icons">
            <EmptyState
              description="Sync your local folders with cloud storage to access files from anywhere."
              heading="Connect your folders to the cloud"
              icons={[
                <FolderIcon key="1" />,
                <ArrowRightIcon key="2" />,
                <GlobeIcon key="3" />,
              ]}
            />
          </StoryCell>

          <StoryCell label="single action">
            <EmptyState
              actions={<Button label="Add application" variant="primary" />}
              description="Add your first application to get started with identity management."
              heading="No applications configured"
            />
          </StoryCell>

          <StoryCell label="three actions">
            <EmptyState
              actions={
                <>
                  <Button label="Create new project" variant="primary" />
                  <Button label="Import existing" variant="secondary" />
                  <Button label="Learn more" variant="floating" />
                </>
              }
              description="Create a new project from scratch or import an existing one."
              heading="Get started with your project"
              icons={[<AddCircleIcon key="1" />]}
            />
          </StoryCell>

          <StoryCell label="no-data use case">
            <EmptyState
              description="There is no data to display at this time. Data will appear here once it becomes available."
              heading="No data available"
              icons={[<FolderIcon key="1" />]}
            />
          </StoryCell>

          <StoryCell label="error use case">
            <EmptyState
              actions={
                <>
                  <Button label="Retry" variant="primary" />
                  <Button label="Go back" variant="secondary" />
                </>
              }
              description="We encountered an error while loading the data. Please try again later."
              heading="Something went wrong"
            />
          </StoryCell>
        </StoryGrid>
      </StorySection>
    );
  },
};
