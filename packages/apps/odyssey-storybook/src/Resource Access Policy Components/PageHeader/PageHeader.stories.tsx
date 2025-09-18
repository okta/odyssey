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

import {
  PageHeader,
  type PageHeaderProps,
} from "@okta/odyssey-contributions-resource-access-policy-components";
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
  component: PageHeader as React.ComponentType<PageHeaderProps>,
  argTypes: {
    title: { control: "text", description: "Page title (required)" },
    overline: {
      control: "text",
      description: "Optional overline above the title",
    },
    description: { control: "text" },
    breadcrumbs: { control: false },
    status: { control: "object", description: "Status pill configuration" },
    metadata: { control: "object" },
    documentation: { control: "object" },
    primaryAction: {
      control: false,
      description: "Provide a <Button /> element",
    },
    secondaryAction: {
      control: false,
      description: "Provide a <Button /> element",
    },
    image: { control: false, description: "Custom image / logo node" },
  },
  args: {
    title: "Page title",
    description:
      "Optional brief description about the section or page you are about to encounter below.",
  },
  tags: ["autodocs"],
  decorators: [
    OdysseyStorybookThemeDecorator,
    ResourceAccessPolicyComponentsStorybookThemeDecorator,
  ],
} satisfies Meta<PageHeaderProps>;

export default meta;

type Story = StoryObj<typeof meta>;

export const AllFeatures: Story = {
  args: {
    overline: "OVERLINE",
    breadcrumbs: {
      items: [
        <Breadcrumb href="#" onClick={action("Page Title click")}>
          Page Title
        </Breadcrumb>,
        <Breadcrumb>Current Page</Breadcrumb>,
      ],
      homeHref: "#",
    },
    image: <span style={{ fontSize: 48 }}>👤</span>,
    status: { label: "BETA", severity: "info" },
    metadata: sampleMetadata,
    documentation: { label: "Documentation", href: "#" },
    primaryAction: (
      <Button
        label="Primary"
        onClick={action("primary click")}
        variant="primary"
      />
    ),
    secondaryAction: (
      <MenuButton buttonLabel="Secondary">
        <MenuItem onClick={action("Action click")}>Action</MenuItem>
      </MenuButton>
    ),
    description:
      "Cultellus conforto bos adinventitias compello delibero usitas confugo statim. Tres tenax comes quaerat arguo cibus absorbeo debilito.",
  },
};

export const Default: Story = {};

export const WithBreadcrumbs: Story = {
  args: {
    breadcrumbs: {
      items: [
        <Breadcrumb href="#" onClick={action("Page Title click")}>
          Page Title
        </Breadcrumb>,
        <Breadcrumb>Current Page</Breadcrumb>,
      ],
      homeHref: "#",
    },
  },
};

export const WithBackLink: Story = {
  args: {
    backLink: {
      href: "#",
      label: "Back to list",
      onClick: action("Back to list click"),
    },
  },
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
  args: {
    status: { label: "BETA", severity: "info" },
    metadata: sampleMetadata.slice(0, 2),
  },
};

export const WithDocumentationAndActions: Story = {
  args: {
    documentation: { label: "Documentation", href: "#" },
    primaryAction: (
      <Button
        label="Primary"
        onClick={action("primary click")}
        variant="primary"
      />
    ),
    secondaryAction: (
      <Button
        label="Secondary"
        onClick={action("secondary click")}
        variant="secondary"
      />
    ),
  },
};

export const WithImage: Story = {
  args: {
    image: <span style={{ fontSize: 48 }}>👤</span>,
    status: { label: "ACTIVE", severity: "success" },
    metadata: sampleMetadata,
  },
};

export const OnlyRequired: Story = {
  args: { title: "Title only", description: undefined },
};
