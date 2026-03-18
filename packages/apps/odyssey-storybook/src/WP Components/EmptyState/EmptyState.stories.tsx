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

export const AllFeatures: Story = {
  args: {
    icons: [
      <SettingsIcon key="1" />,
      <ArrowRightIcon key="2" />,
      <GlobeIcon key="3" />,
    ],
    heading: "Setup integrations to begin importing AI Agents",
    description:
      "Begin by adding the AI agent client credentials to your application. Once connected, you can import and manage your AI agents.",
    actions: (
      <>
        <Button label="Add new application" variant="primary" />
        <Button
          label="Add AI agent import to existing app"
          variant="secondary"
        />
      </>
    ),
  },
  parameters: {
    docs: {
      description: {
        story:
          "Demonstrates all features: icon row, title, description, and action buttons.",
      },
    },
  },
};

export const Minimal: Story = {
  args: {
    heading: "No items found",
  },
  parameters: {
    docs: {
      description: {
        story: "Minimal example with just a required title.",
      },
    },
  },
};

export const WithDescription: Story = {
  args: {
    heading: "No results",
    description:
      "Try adjusting your search criteria or filters to find what you are looking for.",
  },
  parameters: {
    docs: {
      description: {
        story: "Empty state with title and description text.",
      },
    },
  },
};

export const WithSingleIcon: Story = {
  args: {
    icons: [<SearchIcon key="1" />],
    heading: "No search results",
    description:
      "We could not find any results matching your search. Try different keywords.",
  },
  parameters: {
    docs: {
      description: {
        story: "Empty state with a single icon above the title.",
      },
    },
  },
};

export const WithMultipleIcons: Story = {
  args: {
    icons: [
      <FolderIcon key="1" />,
      <ArrowRightIcon key="2" />,
      <GlobeIcon key="3" />,
    ],
    heading: "Connect your folders to the cloud",
    description:
      "Sync your local folders with cloud storage to access files from anywhere.",
  },
  parameters: {
    docs: {
      description: {
        story:
          "Multiple icons are automatically laid out in a centered row with consistent spacing.",
      },
    },
  },
};

export const WithActions: Story = {
  args: {
    heading: "No applications configured",
    description:
      "Add your first application to get started with identity management.",
    actions: <Button label="Add application" variant="primary" />,
  },
  parameters: {
    docs: {
      description: {
        story: "Empty state with a single action button.",
      },
    },
  },
};

export const WithMultipleActions: Story = {
  args: {
    icons: [<AddCircleIcon key="1" />],
    heading: "Get started with your project",
    description: "Create a new project from scratch or import an existing one.",
    actions: (
      <>
        <Button label="Create new project" variant="primary" />
        <Button label="Import existing" variant="secondary" />
        <Button label="Learn more" variant="floating" />
      </>
    ),
  },
  parameters: {
    docs: {
      description: {
        story: "Empty state with multiple action buttons arranged in a row.",
      },
    },
  },
};

export const NoDataState: Story = {
  args: {
    icons: [<FolderIcon key="1" />],
    heading: "No data available",
    description:
      "There is no data to display at this time. Data will appear here once it becomes available.",
  },
  parameters: {
    docs: {
      description: {
        story: "Common use case for tables or lists with no data.",
      },
    },
  },
};

export const ErrorState: Story = {
  args: {
    heading: "Something went wrong",
    description:
      "We encountered an error while loading the data. Please try again later.",
    actions: (
      <>
        <Button label="Retry" variant="primary" />
        <Button label="Go back" variant="secondary" />
      </>
    ),
  },
  parameters: {
    docs: {
      description: {
        story: "Empty state used for error scenarios with retry option.",
      },
    },
  },
};
