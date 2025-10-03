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
  PageTemplate,
  PageTemplateProps,
} from "@okta/odyssey-contributions-resource-access-policy-components";
import {
  Breadcrumb,
  Button,
  Drawer,
  Form,
  MenuButton,
  MenuItem,
  Surface,
  TextField,
} from "@okta/odyssey-react-mui";
import { Layout } from "@okta/odyssey-react-mui/labs";
import { action } from "@storybook/addon-actions";
import { useCallback, useState } from "react";

import { OdysseyStorybookThemeDecorator } from "../../tools/OdysseyStorybookThemeDecorator.js";
import { ResourceAccessPolicyComponentsStorybookThemeDecorator } from "../../tools/ResourceAccessPolicyComponentsStorybookThemeDecorator.js";

const meta = {
  component: PageTemplate as React.ComponentType<PageTemplateProps>,
  argTypes: {
    headerComponent: {
      description:
        "An optional `PageHeader` object. Can be of variant 'temporary' or 'persistent'.",
      table: {
        type: {
          summary: "ReactElement<typeof PageHeader>",
        },
      },
    },
    drawer: {
      description:
        "An optional `Drawer` object. Can be of variant 'temporary' or 'persistent'.",
      table: {
        type: {
          summary: "ReactElement<typeof Drawer>",
        },
      },
    },
    children: {
      description:
        "The content of the `PageTemplate`. May be a `string` or any other `ReactNode` or array of `ReactNode`s. Will often be `Grid` objects.",
      table: {
        type: {
          summary: "ReactNode",
        },
      },
    },
    isFullWidth: {
      control: "boolean",
      description:
        "When set to `true`, the `PageTemplate` expands past its max width of 1440px and spans the entire available screen width.",
      table: {
        type: {
          summary: "boolean",
        },
        defaultValue: {
          summary: "false",
        },
      },
    },
  },
  args: {
    headerComponent: (
      <PageHeader
        actions={[
          <MenuButton buttonLabel="Secondary" key="secondary">
            <MenuItem onClick={action("Action click")}>Action</MenuItem>
          </MenuButton>,
          <Button
            key="primary"
            label="Primary"
            onClick={action("primary click")}
            variant="primary"
          />,
        ]}
        breadcrumbs={{
          items: [
            <Breadcrumb href="#" onClick={action("Page Title click")}>
              Page Title
            </Breadcrumb>,
            <Breadcrumb>Current Page</Breadcrumb>,
          ],
          homeHref: "#",
        }}
        description="Cultellus conforto bos adinventitias compello delibero usitas confugo statim. Tres tenax comes quaerat arguo cibus absorbeo debilito."
        documentation={{ label: "Documentation", href: "#" }}
        metadata={["Metadata A", "Metadata B", "Metadata C"]}
        overline={"OVERLINE"}
        status={{ label: "BETA", severity: "info" }}
        title="Title"
      />
    ),
    isFullWidth: false,
    children: (
      <Layout regions={[1]}>
        <Surface>
          <Form
            formActions={
              <>
                <Button label="Reset" variant="secondary" />
                <Button label="Submit" type="submit" variant="primary" />
              </>
            }
            name="Add Person"
            title="Add Person"
          >
            <TextField label="First name" />
            <TextField label="Last name" />
            <TextField label="Email" />
          </Form>
        </Surface>
      </Layout>
    ),
  },
  tags: ["autodocs"],
  decorators: [
    OdysseyStorybookThemeDecorator,
    ResourceAccessPolicyComponentsStorybookThemeDecorator,
  ],
} satisfies Meta<PageTemplateProps>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const OverlayDrawer: StoryObj<PageTemplateProps> = {
  render: function C(args) {
    const [isEmbeddedDrawerVisible, setIsEmbeddedVisible] = useState(false);

    const onOpenEmbeddedDrawer = useCallback(() => {
      setIsEmbeddedVisible(true);
    }, []);

    const onCloseEmbeddedDrawer = useCallback(() => {
      setIsEmbeddedVisible(false);
    }, []);

    return (
      <PageTemplate
        drawer={
          <Drawer
            hasDividers
            isOpen={isEmbeddedDrawerVisible}
            onClose={onCloseEmbeddedDrawer}
            primaryCallToActionComponent={
              <Button
                label="Primary"
                onClick={onCloseEmbeddedDrawer}
                variant="primary"
              />
            }
            title="Drawer title"
            variant="temporary"
          >
            <div>
              Okta Privileged Access is a Privileged Access Management (PAM)
              solution designed to help customers mitigate the risk of
              unauthorized access to resources, a critical area of security and
              risk management in any organization. Okta Privileged Access builds
              on the current server access control capabilities provided with
              Okta Advanced Server Access and delivers a unified approach to
              managing access to all your privileged accounts. It securely
              connects people, machines, and applications to privileged
              resources such as servers, containers, and enterprise apps.
            </div>
          </Drawer>
        }
        headerComponent={
          <PageHeader
            actions={[
              <Button
                label={
                  isEmbeddedDrawerVisible
                    ? "Close embedded drawer"
                    : "Open embedded drawer"
                }
                onClick={
                  isEmbeddedDrawerVisible
                    ? onCloseEmbeddedDrawer
                    : onOpenEmbeddedDrawer
                }
                variant="primary"
              />,
            ]}
            description="Cultellus conforto bos adinventitias compello delibero usitas confugo statim. Tres tenax comes quaerat arguo cibus absorbeo debilito."
            documentation={{ label: "Documentation", href: "#" }}
            title="Title"
          />
        }
        isFullWidth
      >
        {args.children}
      </PageTemplate>
    );
  },
};

export const EmbeddedDrawer: StoryObj<PageTemplateProps> = {
  render: function C(args) {
    const [isEmbeddedDrawerVisible, setIsEmbeddedVisible] = useState(false);

    const onOpenEmbeddedDrawer = useCallback(() => {
      setIsEmbeddedVisible(true);
    }, []);

    const onCloseEmbeddedDrawer = useCallback(() => {
      setIsEmbeddedVisible(false);
    }, []);

    return (
      <PageTemplate
        drawer={
          <Drawer
            hasDividers
            isOpen={isEmbeddedDrawerVisible}
            onClose={onCloseEmbeddedDrawer}
            primaryCallToActionComponent={
              <Button
                label="Primary"
                onClick={onCloseEmbeddedDrawer}
                variant="primary"
              />
            }
            title="Drawer title"
            variant="persistent"
          >
            <div>
              Okta Privileged Access is a Privileged Access Management (PAM)
              solution designed to help customers mitigate the risk of
              unauthorized access to resources, a critical area of security and
              risk management in any organization. Okta Privileged Access builds
              on the current server access control capabilities provided with
              Okta Advanced Server Access and delivers a unified approach to
              managing access to all your privileged accounts. It securely
              connects people, machines, and applications to privileged
              resources such as servers, containers, and enterprise apps.
            </div>
          </Drawer>
        }
        headerComponent={
          <PageHeader
            actions={[
              <Button
                label={
                  isEmbeddedDrawerVisible
                    ? "Close embedded drawer"
                    : "Open embedded drawer"
                }
                onClick={
                  isEmbeddedDrawerVisible
                    ? onCloseEmbeddedDrawer
                    : onOpenEmbeddedDrawer
                }
                variant="primary"
              />,
            ]}
            description="Cultellus conforto bos adinventitias compello delibero usitas confugo statim. Tres tenax comes quaerat arguo cibus absorbeo debilito."
            documentation={{ label: "Documentation", href: "#" }}
            title="Title"
          />
        }
        isFullWidth
      >
        {args.children}
      </PageTemplate>
    );
  },
};

export const FullWidth: StoryObj<PageTemplateProps> = {
  render: function C(args) {
    return (
      <PageTemplate headerComponent={args.headerComponent} isFullWidth>
        {args.children}
      </PageTemplate>
    );
  },
};
