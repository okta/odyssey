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
  component: PageTemplate,
  decorators: [
    OdysseyStorybookThemeDecorator,
    ResourceAccessPolicyComponentsStorybookThemeDecorator,
  ],
  parameters: {
    layout: "fullscreen",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof PageTemplate>;

export default meta;

type Story = StoryObj<{ isFullWidth?: boolean; testId?: string }>;

export const Default: Story = {
  render: (args) => (
    <PageTemplate
      headerComponent={
        <PageHeader>
          <PageHeader.Breadcrumbs homeHref="#" key="breadcrumbs">
            <Breadcrumb
              href="#"
              key="page1"
              onClick={action("Page Title click")}
            >
              Page Title
            </Breadcrumb>
            <Breadcrumb key="current">Current Page</Breadcrumb>
          </PageHeader.Breadcrumbs>
          <PageHeader.Title
            key="title"
            overline="OVERLINE"
            status={{ label: "BETA", severity: "info" }}
          >
            Title
          </PageHeader.Title>
          <PageHeader.Metadata
            items={["Metadata A", "Metadata B", "Metadata C"]}
            key="metadata"
          />
          <PageHeader.Description key="description">
            Cultellus conforto bos adinventitias compello delibero usitas
            confugo statim. Tres tenax comes quaerat arguo cibus absorbeo
            debilito.
          </PageHeader.Description>
          <PageHeader.Documentation
            href="#"
            key="documentation"
            label="Documentation"
          />
          <PageHeader.Actions key="actions">
            <MenuButton buttonLabel="Secondary" key="secondary">
              <MenuItem onClick={action("Action click")}>Action</MenuItem>
            </MenuButton>
            <Button
              key="primary"
              label="Primary"
              onClick={action("primary click")}
              variant="primary"
            />
          </PageHeader.Actions>
        </PageHeader>
      }
      isFullWidth={args.isFullWidth}
    >
      <Layout regions={[1]}>
        <Surface>
          <Form
            formActions={
              <>
                <Button key="reset" label="Reset" variant="secondary" />
                <Button
                  key="submit"
                  label="Submit"
                  type="submit"
                  variant="primary"
                />
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
    </PageTemplate>
  ),
};

export const OverlayDrawer: Story = {
  render: function C() {
    const [isDrawerVisible, setIsDrawerVisible] = useState(false);

    const onOpenEmbeddedDrawer = useCallback(() => {
      setIsDrawerVisible(true);
    }, []);

    const onCloseEmbeddedDrawer = useCallback(() => {
      setIsDrawerVisible(false);
    }, []);

    return (
      <PageTemplate
        drawer={
          <Drawer
            hasDividers
            isOpen={isDrawerVisible}
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
          <PageHeader>
            <PageHeader.Title key="title">Title</PageHeader.Title>
            <PageHeader.Description key="description">
              Cultellus conforto bos adinventitias compello delibero usitas
              confugo statim. Tres tenax comes quaerat arguo cibus absorbeo
              debilito.
            </PageHeader.Description>
            <PageHeader.Documentation
              href="#"
              key="documentation"
              label="Documentation"
            />
            <PageHeader.Actions key="actions">
              <Button
                label={
                  isDrawerVisible
                    ? "Close embedded drawer"
                    : "Open embedded drawer"
                }
                onClick={
                  isDrawerVisible ? onCloseEmbeddedDrawer : onOpenEmbeddedDrawer
                }
                variant="primary"
              />
            </PageHeader.Actions>
          </PageHeader>
        }
      >
        <Layout regions={[1]}>
          <Surface>
            <Form
              formActions={
                <>
                  <Button key="reset" label="Reset" variant="secondary" />
                  <Button
                    key="submit"
                    label="Submit"
                    type="submit"
                    variant="primary"
                  />
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
      </PageTemplate>
    );
  },
};

export const EmbeddedDrawer: Story = {
  render: function C() {
    const [isDrawerVisible, setIsDrawerVisible] = useState(false);

    const onOpenEmbeddedDrawer = useCallback(() => {
      setIsDrawerVisible(true);
    }, []);

    const onCloseEmbeddedDrawer = useCallback(() => {
      setIsDrawerVisible(false);
    }, []);

    return (
      <PageTemplate
        drawer={
          <Drawer
            hasDividers
            isOpen={isDrawerVisible}
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
          <PageHeader>
            <PageHeader.Title key="title">Title</PageHeader.Title>
            <PageHeader.Description key="description">
              Cultellus conforto bos adinventitias compello delibero usitas
              confugo statim. Tres tenax comes quaerat arguo cibus absorbeo
              debilito.
            </PageHeader.Description>
            <PageHeader.Documentation
              href="#"
              key="documentation"
              label="Documentation"
            />
            <PageHeader.Actions key="actions">
              <Button
                label={
                  isDrawerVisible
                    ? "Close embedded drawer"
                    : "Open embedded drawer"
                }
                onClick={
                  isDrawerVisible ? onCloseEmbeddedDrawer : onOpenEmbeddedDrawer
                }
                variant="primary"
              />
            </PageHeader.Actions>
          </PageHeader>
        }
      >
        <Layout regions={[1]}>
          <Surface>
            <Form
              formActions={
                <>
                  <Button key="reset" label="Reset" variant="secondary" />
                  <Button
                    key="submit"
                    label="Submit"
                    type="submit"
                    variant="primary"
                  />
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
      </PageTemplate>
    );
  },
};

export const FullWidth: Story = {
  render: () => (
    <PageTemplate
      headerComponent={
        <PageHeader>
          <PageHeader.Breadcrumbs homeHref="#" key="breadcrumbs">
            <Breadcrumb
              href="#"
              key="page1"
              onClick={action("Page Title click")}
            >
              Page Title
            </Breadcrumb>
            <Breadcrumb key="current">Current Page</Breadcrumb>
          </PageHeader.Breadcrumbs>
          <PageHeader.Title
            key="title"
            overline="OVERLINE"
            status={{ label: "BETA", severity: "info" }}
          >
            Title
          </PageHeader.Title>
          <PageHeader.Metadata
            items={["Metadata A", "Metadata B", "Metadata C"]}
            key="metadata"
          />
          <PageHeader.Description key="description">
            Cultellus conforto bos adinventitias compello delibero usitas
            confugo statim. Tres tenax comes quaerat arguo cibus absorbeo
            debilito.
          </PageHeader.Description>
          <PageHeader.Documentation
            href="#"
            key="documentation"
            label="Documentation"
          />
          <PageHeader.Actions key="actions">
            <MenuButton buttonLabel="Secondary" key="secondary">
              <MenuItem onClick={action("Action click")}>Action</MenuItem>
            </MenuButton>
            <Button
              key="primary"
              label="Primary"
              onClick={action("primary click")}
              variant="primary"
            />
          </PageHeader.Actions>
        </PageHeader>
      }
      isFullWidth
    >
      <Layout regions={[1]}>
        <Surface>
          <Form
            formActions={
              <>
                <Button key="reset" label="Reset" variant="secondary" />
                <Button
                  key="submit"
                  label="Submit"
                  type="submit"
                  variant="primary"
                />
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
    </PageTemplate>
  ),
};
