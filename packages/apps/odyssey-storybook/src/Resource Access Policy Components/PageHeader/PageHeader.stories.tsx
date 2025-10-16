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

import type { Meta, StoryObj } from "@storybook/react";

import { PageHeader } from "@okta/odyssey-contributions-resource-access-policy-components";
import {
  Breadcrumb,
  Button,
  MenuButton,
  MenuItem,
} from "@okta/odyssey-react-mui";
import { action } from "@storybook/addon-actions";

import { OdysseyStorybookThemeDecorator } from "../../tools/OdysseyStorybookThemeDecorator.js";
import { ResourceAccessPolicyComponentsStorybookThemeDecorator } from "../../tools/ResourceAccessPolicyComponentsStorybookThemeDecorator.js";

// Helper data generators for richer examples
const sampleMetadata = ["Metadata A", "Metadata B", "Metadata C"];

const meta = {
  component: PageHeader,
  decorators: [
    OdysseyStorybookThemeDecorator,
    ResourceAccessPolicyComponentsStorybookThemeDecorator,
  ],
  tags: ["autodocs"],
} satisfies Meta<typeof PageHeader>;

export default meta;

type Story = StoryObj<{ testId?: string }>;

export const AllFeatures: Story = {
  render: (args) => (
    <PageHeader testId={args.testId}>
      <PageHeader.Breadcrumbs homeHref="#">
        <Breadcrumb href="#" key="page1" onClick={action("Page Title click")}>
          Page Title
        </Breadcrumb>
        <Breadcrumb key="current">Current Page</Breadcrumb>
      </PageHeader.Breadcrumbs>
      <PageHeader.Image>
        <span style={{ fontSize: 48 }}>👤</span>
      </PageHeader.Image>
      <PageHeader.Title
        overline="OVERLINE"
        status={{ label: "BETA", severity: "info" }}
      >
        Page title
      </PageHeader.Title>
      <PageHeader.Metadata items={sampleMetadata} />
      <PageHeader.Description>
        Optional brief description about the section or page you are about to
        encounter below.
      </PageHeader.Description>
      <PageHeader.Documentation href="#" label="Documentation" />
      <PageHeader.Actions>
        <MenuButton buttonLabel="Secondary">
          <MenuItem onClick={action("Action click")}>Action</MenuItem>
        </MenuButton>
        <Button
          label="Primary"
          onClick={action("primary click")}
          variant="primary"
        />
      </PageHeader.Actions>
    </PageHeader>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Demonstrates the composable API with all features. Components are automatically organized into the correct layout sections regardless of their order in the JSX.",
      },
    },
  },
};

export const Default: Story = {
  render: () => (
    <PageHeader>
      <PageHeader.Title>Page title</PageHeader.Title>
      <PageHeader.Description>
        Optional brief description about the section or page you are about to
        encounter below.
      </PageHeader.Description>
    </PageHeader>
  ),
};

export const WithBreadcrumbs: Story = {
  render: () => (
    <PageHeader>
      <PageHeader.Breadcrumbs homeHref="#">
        <Breadcrumb href="#" key="page1" onClick={action("Page Title click")}>
          Page Title
        </Breadcrumb>
        <Breadcrumb key="current">Current Page</Breadcrumb>
      </PageHeader.Breadcrumbs>
      <PageHeader.Title>Page title</PageHeader.Title>
    </PageHeader>
  ),
};

export const WithBackLink: Story = {
  render: () => (
    <PageHeader>
      <PageHeader.BackLink
        href="#"
        label="Back to list"
        onClick={action("Back to list click")}
      />
      <PageHeader.Title>Page title</PageHeader.Title>
    </PageHeader>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Uses the simple backLink variant (no breadcrumbs or custom navigation provided).",
      },
    },
  },
};

export const WithStatus: Story = {
  render: () => (
    <PageHeader>
      <PageHeader.Title status={{ label: "BETA", severity: "info" }}>
        Page title
      </PageHeader.Title>
      <PageHeader.Metadata items={sampleMetadata.slice(0, 2)} />
    </PageHeader>
  ),
};

export const WithDocumentation: Story = {
  render: () => (
    <PageHeader>
      <PageHeader.Title>Page title</PageHeader.Title>
      <PageHeader.Documentation href="#" label="Documentation" />
    </PageHeader>
  ),
  parameters: {
    docs: {
      description: {
        story: "Shows the documentation link in the top-right corner.",
      },
    },
  },
};

export const WithActions: Story = {
  render: () => (
    <PageHeader>
      <PageHeader.Title>Page title</PageHeader.Title>
      <PageHeader.Actions>
        <Button
          label="Secondary"
          onClick={action("secondary click")}
          variant="secondary"
        />
        <Button
          label="Primary"
          onClick={action("primary click")}
          variant="primary"
        />
      </PageHeader.Actions>
    </PageHeader>
  ),
  parameters: {
    docs: {
      description: {
        story: "Demonstrates the actions area with React element buttons.",
      },
    },
  },
};

export const WithMixedActions: Story = {
  render: () => (
    <PageHeader>
      <PageHeader.Title>Page title</PageHeader.Title>
      <PageHeader.Actions>
        <MenuButton buttonLabel="Menu" buttonVariant="secondary">
          <MenuItem onClick={action("Option 1 click")}>Option 1</MenuItem>
          <MenuItem onClick={action("Option 2 click")}>Option 2</MenuItem>
        </MenuButton>
        <Button label="Save" onClick={action("save click")} variant="primary" />
      </PageHeader.Actions>
    </PageHeader>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Demonstrates mixing different types of React elements (MenuButton and Button) in the actions array.",
      },
    },
  },
};

export const WithTooManyActions: Story = {
  render: () => (
    <PageHeader>
      <PageHeader.Title>Page title</PageHeader.Title>
      <PageHeader.Actions>
        <Button
          label="Action 1"
          onClick={action("action 1")}
          variant="secondary"
        />
        <Button
          label="Action 2"
          onClick={action("action 2")}
          variant="secondary"
        />
        <Button
          label="Action 3"
          onClick={action("action 3")}
          variant="secondary"
        />
        <Button
          label="Action 4"
          onClick={action("action 4")}
          variant="primary"
        />
        <Button
          label="Action 5"
          onClick={action("action 5")}
          variant="primary"
        />
      </PageHeader.Actions>
    </PageHeader>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Demonstrates that only the first 3 actions are rendered when more than 3 actions are provided. Actions 4 and 5 are ignored.",
      },
    },
  },
};

export const WithImage: Story = {
  render: () => (
    <PageHeader>
      <PageHeader.Title status={{ label: "ACTIVE", severity: "success" }}>
        Page title
      </PageHeader.Title>
      <PageHeader.Metadata items={sampleMetadata} />
      <PageHeader.Image>
        <span style={{ fontSize: 48 }}>👤</span>
      </PageHeader.Image>
    </PageHeader>
  ),
};

export const OrderIndependent: Story = {
  render: () => (
    <PageHeader>
      {/* Actions declared first but will appear in sidebar */}
      <PageHeader.Actions>
        <Button label="Action First" variant="primary" />
      </PageHeader.Actions>

      {/* Title declared second but will appear in main content */}
      <PageHeader.Title>Title comes after actions in code</PageHeader.Title>

      {/* Breadcrumbs declared last but will appear at top */}
      <PageHeader.Breadcrumbs homeHref="#">
        <Breadcrumb href="#" key="parent">
          Parent
        </Breadcrumb>
        <Breadcrumb key="current">Current</Breadcrumb>
      </PageHeader.Breadcrumbs>

      {/* Documentation also in sidebar */}
      <PageHeader.Documentation href="#" label="Help" />
    </PageHeader>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Demonstrates that component order in JSX doesn't matter - they are automatically organized into the correct layout sections.",
      },
    },
  },
};

export const MetadataBeforeTitle: Story = {
  render: () => (
    <PageHeader>
      {/* Metadata declared before title in JSX */}
      <PageHeader.Metadata
        items={["Created: 2024", "Updated: 2025", "Version: 1.0"]}
      />

      {/* But title will still render first */}
      <PageHeader.Title>Title Always Appears First</PageHeader.Title>

      <PageHeader.Description>
        Even when metadata is declared before the title in JSX, the title will
        always render first.
      </PageHeader.Description>
    </PageHeader>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Demonstrates that title always renders before metadata, regardless of their order in JSX. This ensures consistent visual hierarchy.",
      },
    },
  },
};

export const Minimal: Story = {
  render: () => (
    <PageHeader>
      <PageHeader.Title>Minimal Page</PageHeader.Title>
    </PageHeader>
  ),
  parameters: {
    docs: {
      description: {
        story: "Minimal example with just a title.",
      },
    },
  },
};
