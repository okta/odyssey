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

import { PageHeader } from "@okta/odyssey-contributions-wp-components";
import {
  Breadcrumb,
  Button,
  MenuButton,
  MenuItem,
} from "@okta/odyssey-react-mui";
import {
  LinkIcon,
  NotificationIcon,
  SyncIcon,
  UserIcon,
} from "@okta/odyssey-react-mui/icons";
import { Meta, StoryObj } from "@storybook/react-vite";
import { action } from "storybook/actions";

import {
  staticBoardParameters,
  StoryCell,
  StoryConstrainedWidth,
  StoryGrid,
  StorySection,
} from "../../tools/boardStoryHelpers.js";
import { OdysseyStorybookThemeDecorator } from "../../tools/OdysseyStorybookThemeDecorator.js";
import { WpComponentsStorybookThemeDecorator } from "../../tools/WpComponentsStorybookThemeDecorator.js";

// Helper data generators for richer examples
const sampleMetadata = ["Metadata A", "Metadata B", "Metadata C"];

const meta = {
  component: PageHeader,
  decorators: [
    OdysseyStorybookThemeDecorator,
    WpComponentsStorybookThemeDecorator,
  ],
  tags: ["autodocs"],
} satisfies Meta<typeof PageHeader>;

export default meta;

type Story = StoryObj<{ testId?: string }>;

export const Playground: Story = {
  render: function C(args) {
    return (
      <PageHeader testId={args.testId}>
        <PageHeader.Title>Page title</PageHeader.Title>
        <PageHeader.Description>
          Optional brief description about the section or page you are about to
          encounter below.
        </PageHeader.Description>
      </PageHeader>
    );
  },
};

export const AllFeatures: Story = {
  name: "All features",
  parameters: {
    ...staticBoardParameters,
    docs: {
      description: {
        story:
          "Demonstrates the composable API with all features. Components are automatically organized into the correct layout sections regardless of their order in the JSX.",
      },
    },
  },
  render: () => (
    <PageHeader>
      <PageHeader.Breadcrumbs homeHref="#">
        <Breadcrumb href="#" key="page1" onClick={action("Page Title click")}>
          Page Title
        </Breadcrumb>
        <Breadcrumb key="current">Current Page</Breadcrumb>
      </PageHeader.Breadcrumbs>
      <PageHeader.Image>
        <UserIcon />
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
      <PageHeader.Documentation href="#">
        Documentation
      </PageHeader.Documentation>
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
};

export const AllNavigationVariants: Story = {
  name: "All navigation variants",
  parameters: staticBoardParameters,
  render: function C() {
    return (
      <StorySection title="Every way of getting back up the hierarchy, plus slot order independence.">
        <StoryGrid columns={1}>
          <StoryCell label="PageHeader.Breadcrumbs">
            <PageHeader>
              <PageHeader.Breadcrumbs homeHref="#">
                <Breadcrumb
                  href="#"
                  key="page1"
                  onClick={action("Page Title click")}
                >
                  Page Title
                </Breadcrumb>
                <Breadcrumb key="current">Current Page</Breadcrumb>
              </PageHeader.Breadcrumbs>
              <PageHeader.Title>Page title</PageHeader.Title>
            </PageHeader>
          </StoryCell>

          <StoryCell label="PageHeader.BackLink">
            <PageHeader>
              <PageHeader.BackLink
                href="#"
                onClick={action("Back to list click")}
              >
                Back to list
              </PageHeader.BackLink>
              <PageHeader.Title>Page title</PageHeader.Title>
            </PageHeader>
          </StoryCell>

          <StoryCell label="Slots declared out of order">
            <PageHeader>
              <PageHeader.Actions>
                <Button label="Action First" variant="primary" />
              </PageHeader.Actions>

              <PageHeader.Title>
                Title comes after actions in code
              </PageHeader.Title>

              <PageHeader.Breadcrumbs homeHref="#">
                <Breadcrumb href="#" key="parent">
                  Parent
                </Breadcrumb>
                <Breadcrumb key="current">Current</Breadcrumb>
              </PageHeader.Breadcrumbs>

              <PageHeader.Documentation href="#">Help</PageHeader.Documentation>
            </PageHeader>
          </StoryCell>
        </StoryGrid>
      </StorySection>
    );
  },
};

export const AllTitleVariants: Story = {
  name: "All title variants",
  parameters: staticBoardParameters,
  render: function C() {
    return (
      <StorySection title="Every title decoration: status, imagery, and metadata.">
        <StoryGrid columns={1}>
          <StoryCell label="Title only">
            <PageHeader>
              <PageHeader.Title>Minimal Page</PageHeader.Title>
            </PageHeader>
          </StoryCell>

          <StoryCell label="status + metadata">
            <PageHeader>
              <PageHeader.Title status={{ label: "BETA", severity: "info" }}>
                Page title
              </PageHeader.Title>
              <PageHeader.Metadata items={sampleMetadata.slice(0, 2)} />
            </PageHeader>
          </StoryCell>

          <StoryCell label="PageHeader.Image (sized container)">
            <PageHeader>
              <PageHeader.Title
                status={{ label: "ACTIVE", severity: "success" }}
              >
                Page title
              </PageHeader.Title>
              <PageHeader.Metadata items={sampleMetadata} />
              <PageHeader.Image>
                <UserIcon />
              </PageHeader.Image>
            </PageHeader>
          </StoryCell>

          <StoryCell label="Metadata declared before title, still renders after">
            <PageHeader>
              <PageHeader.Metadata
                items={["Created: 2024", "Updated: 2025", "Version: 1.0"]}
              />

              <PageHeader.Title>Title Always Appears First</PageHeader.Title>

              <PageHeader.Description>
                Even when metadata is declared before the title in JSX, the
                title will always render first.
              </PageHeader.Description>
            </PageHeader>
          </StoryCell>

          <StoryCell label="Metadata with icons and status badges">
            <PageHeader>
              <PageHeader.Title>Default policy</PageHeader.Title>
              <PageHeader.Metadata
                items={[
                  { text: "Staged branch created", icon: <SyncIcon /> },
                  {
                    text: "Monitoring staged branch",
                    icon: <NotificationIcon />,
                    status: { label: "ENABLED", severity: "success" },
                  },
                  {
                    text: "Connection: con_DM5TbREdm8tDPR",
                    icon: <LinkIcon />,
                  },
                ]}
              />
            </PageHeader>
          </StoryCell>
        </StoryGrid>
      </StorySection>
    );
  },
};

export const AllActionVariants: Story = {
  name: "All action variants",
  parameters: staticBoardParameters,
  render: function C() {
    return (
      <StorySection title="Every action arrangement. Only the first three actions render.">
        <StoryGrid columns={1}>
          <StoryCell label="PageHeader.Documentation">
            <PageHeader>
              <PageHeader.Title>Page title</PageHeader.Title>
              <PageHeader.Documentation href="#">
                Documentation
              </PageHeader.Documentation>
            </PageHeader>
          </StoryCell>

          <StoryCell label="Two Buttons">
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
          </StoryCell>

          <StoryCell label="MenuButton mixed with Button">
            <PageHeader>
              <PageHeader.Title>Page title</PageHeader.Title>
              <PageHeader.Actions>
                <MenuButton buttonLabel="Menu" buttonVariant="secondary">
                  <MenuItem onClick={action("Option 1 click")}>
                    Option 1
                  </MenuItem>
                  <MenuItem onClick={action("Option 2 click")}>
                    Option 2
                  </MenuItem>
                </MenuButton>
                <Button
                  label="Save"
                  onClick={action("save click")}
                  variant="primary"
                />
              </PageHeader.Actions>
            </PageHeader>
          </StoryCell>

          <StoryCell label="Five actions supplied, three rendered">
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
          </StoryCell>
        </StoryGrid>
      </StorySection>
    );
  },
};

export const AllOverflowBehaviors: Story = {
  name: "All overflow behaviors",
  parameters: staticBoardParameters,
  render: function C() {
    return (
      <StorySection title="Every clampLines and wordBreak combination on the title and description, in a bounded container.">
        <StoryGrid columns={1}>
          <StoryCell label="Title clampLines={2}">
            <StoryConstrainedWidth width="600px">
              <PageHeader>
                <PageHeader.Title clampLines={2}>
                  This Is A Very Long Page Title That Should Be Clamped To Two
                  Lines And Show Ellipsis When It Overflows The Container Width
                </PageHeader.Title>
                <PageHeader.Description>
                  Description text appears below the clamped title.
                </PageHeader.Description>
              </PageHeader>
            </StoryConstrainedWidth>
          </StoryCell>

          <StoryCell label='Title wordBreak="break-all"'>
            <StoryConstrainedWidth width="600px">
              <PageHeader>
                <PageHeader.Title wordBreak="break-all">
                  ThisIsAnExtremelyLongWordWithoutSpacesThatWouldNormallyOverflowTheContainer_LikeAVeryLongIdentifierOrURL
                </PageHeader.Title>
                <PageHeader.Description>
                  The title above uses wordBreak to handle long unbroken
                  strings.
                </PageHeader.Description>
              </PageHeader>
            </StoryConstrainedWidth>
          </StoryCell>

          <StoryCell label="Description clampLines={3}">
            <StoryConstrainedWidth width="600px">
              <PageHeader>
                <PageHeader.Title>Resource Details</PageHeader.Title>
                <PageHeader.Description clampLines={3}>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  Ut enim ad minim veniam, quis nostrud exercitation ullamco
                  laboris nisi ut aliquip ex ea commodo consequat. Duis aute
                  irure dolor in reprehenderit in voluptate velit esse cillum
                  dolore eu fugiat nulla pariatur.
                </PageHeader.Description>
                <PageHeader.Actions>
                  <Button label="View More" variant="secondary" />
                </PageHeader.Actions>
              </PageHeader>
            </StoryConstrainedWidth>
          </StoryCell>

          <StoryCell label='Description wordBreak="break-all"'>
            <StoryConstrainedWidth width="600px">
              <PageHeader>
                <PageHeader.Title>API Endpoint</PageHeader.Title>
                <PageHeader.Description wordBreak="break-all">
                  Endpoint URL:
                  https://api.example.com/v1/resources/very-long-resource-identifier/sub-resources/another-long-identifier/actions
                </PageHeader.Description>
              </PageHeader>
            </StoryConstrainedWidth>
          </StoryCell>

          <StoryCell label="Title and description combined">
            <StoryConstrainedWidth width="600px">
              <PageHeader>
                <PageHeader.Title clampLines={1} wordBreak="break-word">
                  VeryLongResourceName_WithUnderscores_ThatNeedsToBeHandledProperly
                </PageHeader.Title>
                <PageHeader.Metadata
                  items={["Created: 2024", "Status: Active"]}
                />
                <PageHeader.Description clampLines={2} wordBreak="break-word">
                  This resource has a very long description with URLs like
                  https://example.com/very-long-path/to/resource that need to
                  wrap properly. The description will be clamped to 2 lines with
                  ellipsis.
                </PageHeader.Description>
                <PageHeader.Actions>
                  <Button label="Edit" variant="primary" />
                </PageHeader.Actions>
              </PageHeader>
            </StoryConstrainedWidth>
          </StoryCell>
        </StoryGrid>
      </StorySection>
    );
  },
};
