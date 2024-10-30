/*!
 * Copyright (c) 2023-present, Okta, Inc. and/or its affiliates. All rights reserved.
 * The Okta software accompanied by this notice is provided pursuant to the Apache License, Version 2.0 (the "License.")
 *
 * You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0.
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *
 * See the License for the specific language governing permissions and limitations under the License.
 */

import { Meta, StoryObj } from "@storybook/react";

import { MuiThemeDecorator } from "../../../../.storybook/components";
import {
  Person,
  columns as personColumns,
  data as personData,
} from "../../odyssey-mui/DataTable/personData";
import {
  Layout,
  PageTemplate,
  PageTemplateProps,
} from "@okta/odyssey-react-mui/labs";
import {
  Box,
  Button,
  Checkbox,
  DataTable,
  Dialog,
  Drawer,
  Form as OdysseyForm,
  Heading3,
  Heading5,
  MenuButton,
  MenuItem,
  Paragraph,
  Support,
  Surface,
  TextField,
  useOdysseyDesignTokens,
} from "@okta/odyssey-react-mui";
import { useCallback, useState } from "react";

const drawerLongText = (
  <>
    <div>
      Okta Privileged Access is a Privileged Access Management (PAM) solution
      designed to help customers mitigate the risk of unauthorized access to
      resources, a critical area of security and risk management in any
      organization. Okta Privileged Access builds on the current server access
      control capabilities provided with Okta Advanced Server Access and
      delivers a unified approach to managing access to all your privileged
      accounts. It securely connects people, machines, and applications to
      privileged resources such as servers, containers, and enterprise apps.
    </div>
    <div>
      A critical capability that Okta Privileged Access offers is the separation
      of administrative roles and responsibilities. Management of users and
      groups, resources, and security are separated, with each administrative
      role designed to perform a specific function. For example, the management
      of security policies to access resources is separated and decoupled from
      the administration of the resources. To meet this requirement, the team
      that sets the policy is separated from the team that administers the
      resource. Likewise, the administrator managing users and groups can only
      perform user and group management tasks and isn't involved in
      administering resources or creating security policies.
    </div>
    <div>
      The level of access within a Okta Privileged Access team depends on the
      role that you're assigned and the permissions granted to that role. The
      table below discusses the types of roles, and each has a unique set of
      permissions and restrictions.To start using Okta Privileged Access, you
      need to add the Okta Privileged Access OIN application to your Okta org.
      You can then sync your users and groups from the Okta Universal Directory
      by configuring SCIM. End users must install the Okta Privileged Access
      client in their local machine, enroll the client, and then access their
      dashboard using the link provided by their team administrator.
    </div>
  </>
);

const drawerShortText = (
  <div>
    Okta Privileged Access is a Privileged Access Management (PAM) solution
    designed to help customers mitigate the risk of unauthorized access to
    resources, a critical area of security and risk management in any
    organization. Okta Privileged Access builds on the current server access
    control capabilities provided with Okta Advanced Server Access and delivers
    a unified approach to managing access to all your privileged accounts. It
    securely connects people, machines, and applications to privileged resources
    such as servers, containers, and enterprise apps.
  </div>
);

const storybookMeta: Meta<PageTemplateProps> = {
  title: "Labs Components/PageTemplate",
  component: PageTemplate,
  argTypes: {
    title: {
      control: "text",
      description: "The title to be situated in the `PageTemplate` header",
      table: {
        type: {
          summary: "string",
        },
      },
    },
    description: {
      control: "text",
      description:
        "A supplementary description to be situated in the `PageTemplate` header",
      table: {
        type: {
          summary: "string",
        },
      },
    },
    documentationLink: {
      control: "text",
      description:
        "The destination for a documentation `Link` to be situated in the `PageTemplate` header",
      table: {
        type: {
          summary: "string",
        },
      },
    },
    documentationText: {
      control: "text",
      description:
        "The text for a documentation `Link` to be situated in the `PageTemplate` header",
      table: {
        type: {
          summary: "string",
        },
      },
    },
    drawer: {
      control: null,
      description:
        "An optional `Drawer` object. Can be of variant 'temporary' or 'persistent'.",
      table: {
        type: {
          summary: "ReactElement<typeof Drawer>",
        },
      },
    },
    primaryCallToActionComponent: {
      control: null,
      description:
        "An optional `Button` object to be situated in the `PageTemplate` header. Should almost always be of variant `primary`.",
      table: {
        type: {
          summary: "ReactElement<typeof Button>",
        },
      },
    },
    secondaryCallToActionComponent: {
      control: null,
      description:
        "An optional `Button` object to be situated in the `PageTemplate` header, alongside the `callToActionPrimaryComponent`.",
      table: {
        type: {
          summary: "ReactElement<typeof Button>",
        },
      },
    },
    tertiaryCallToActionComponent: {
      control: null,
      description:
        "An optional `Button` object to be situated in the `PageTemplate` header, alongside the other two `callToAction` components.",
      table: {
        type: {
          summary: "ReactElement<typeof Button>",
        },
      },
    },
    children: {
      control: null,
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
          summary: false,
        },
      },
    },
  },
  decorators: [MuiThemeDecorator],
};

export default storybookMeta;

export const KitchenSink: StoryObj<PageTemplateProps> = {
  args: {
    title: "Table title",
    description: "Optional brief description about the page",
    documentationLink: "https://www.okta.com",
    documentationText: "Documentation",
    isFullWidth: false,
  },
  render: function C(args) {
    const [data] = useState<Person[]>(personData.slice(0, 10));
    const [isOverlayDrawerVisible, setIsOverlayVisible] = useState(false);
    const [isDialogVisible, setIsDialogVisible] = useState(false);

    const getData = useCallback(() => {
      return data;
    }, [data]);

    const onOpenOverlayDrawer = useCallback(() => {
      setIsOverlayVisible(true);
    }, []);

    const onCloseOverlayDrawer = useCallback(() => {
      setIsOverlayVisible(false);
    }, []);

    const onOpenDialog = useCallback(() => {
      setIsDialogVisible(true);
    }, []);

    const onCloseDialog = useCallback(() => {
      setIsDialogVisible(false);
    }, []);

    return (
      <PageTemplate
        title={args.title}
        description={args.description}
        documentationLink={args.documentationLink}
        documentationText={args.documentationText}
        primaryCallToActionComponent={
          <Button
            label={
              isOverlayDrawerVisible
                ? "Close overlay drawer"
                : "Open overlay drawer"
            }
            variant="primary"
            onClick={
              isOverlayDrawerVisible
                ? onCloseOverlayDrawer
                : onOpenOverlayDrawer
            }
          />
        }
        secondaryCallToActionComponent={
          <Button
            label={isDialogVisible ? "Close dialog" : "Open dialog"}
            onClick={isDialogVisible ? onCloseDialog : onOpenDialog}
            variant="secondary"
          />
        }
        tertiaryCallToActionComponent={
          <MenuButton
            buttonLabel="More actions"
            children={[
              <MenuItem key="1">View details</MenuItem>,
              <MenuItem key="2">Edit configuration</MenuItem>,
              <MenuItem key="3">Launch</MenuItem>,
            ]}
          />
        }
        drawer={
          <Drawer
            variant="temporary"
            title="Drawer title"
            primaryCallToActionComponent={
              <Button
                label="Primary"
                onClick={onCloseOverlayDrawer}
                variant="primary"
              />
            }
            onClose={onCloseOverlayDrawer}
            isOpen={isOverlayDrawerVisible}
            showDividers
          >
            {drawerLongText}
          </Drawer>
        }
        isFullWidth={args.isFullWidth}
      >
        <Dialog
          title="Dialog title"
          children="Consistently named a Leader by major analyst firms. Trusted by 15,000+ customers to secure digital interactions and accelerate innovation."
          primaryCallToActionComponent={
            <Button
              label="Button label"
              onClick={onCloseDialog}
              variant="primary"
            />
          }
          secondaryCallToActionComponent={
            <Button
              label="Cancel"
              onClick={onCloseDialog}
              variant="secondary"
            />
          }
          onClose={onCloseDialog}
          isOpen={isDialogVisible}
        />
        <Layout regions={[3, 1]}>
          <Surface>
            <DataTable
              columns={personColumns}
              getData={getData}
              hasSearch
              hasFilters
              totalRows={10}
            />
          </Surface>
          <Surface>
            <Heading3>Some supporting content could go here</Heading3>
            <Paragraph>
              Lorem ipsum odor amet, consectetuer adipiscing elit. Inceptos
              turpis mattis; tempor proin per natoque. Ex eu dictum varius
              tristique himenaeos aenean sem consectetur urna. Curabitur
              ultricies aptent ac tempus natoque tellus. Rutrum facilisi
              facilisi ligula aenean sociosqu nec velit parturient id. Egestas
              viverra tempus non, turpis ad ex penatibus. Scelerisque maximus
              etiam arcu laoreet nam vitae platea. Non fermentum potenti cursus,
              varius augue varius. Cubilia imperdiet aptent viverra mus urna. Et
              netus at ad lorem; hac eu.
            </Paragraph>
          </Surface>
        </Layout>
      </PageTemplate>
    );
  },
};

export const EmbeddedDrawer: StoryObj<PageTemplateProps> = {
  args: {
    title: "Table title",
    description: "Optional brief description about the page",
    documentationLink: "https://www.okta.com",
    documentationText: "Documentation",
    isFullWidth: false,
  },
  render: function C(args) {
    const [data] = useState<Person[]>(personData.slice(0, 10));
    const [isEmbeddedDrawerVisible, setIsEmbeddedVisible] = useState(false);

    const getData = useCallback(() => {
      return data;
    }, [data]);

    const onOpenEmbeddedDrawer = useCallback(() => {
      setIsEmbeddedVisible(true);
    }, []);

    const onCloseEmbeddedDrawer = useCallback(() => {
      setIsEmbeddedVisible(false);
    }, []);

    return (
      <PageTemplate
        title={args.title}
        description={args.description}
        documentationLink={args.documentationLink}
        documentationText={args.documentationText}
        primaryCallToActionComponent={
          <Button
            label={
              isEmbeddedDrawerVisible
                ? "Close embedded drawer"
                : "Open embedded drawer"
            }
            variant="primary"
            onClick={
              isEmbeddedDrawerVisible
                ? onCloseEmbeddedDrawer
                : onOpenEmbeddedDrawer
            }
          />
        }
        drawer={
          <Drawer
            variant="persistent"
            title="Drawer title"
            primaryCallToActionComponent={
              <Button
                label="Primary"
                onClick={onCloseEmbeddedDrawer}
                variant="primary"
              />
            }
            onClose={onCloseEmbeddedDrawer}
            isOpen={isEmbeddedDrawerVisible}
            showDividers
          >
            {drawerShortText}
          </Drawer>
        }
        isFullWidth={args.isFullWidth}
      >
        <Layout regions={[1]}>
          <Surface>
            <DataTable
              columns={personColumns}
              getData={getData}
              hasSearch
              hasFilters
              totalRows={10}
            />
          </Surface>
        </Layout>
      </PageTemplate>
    );
  },
};

export const Form: StoryObj<PageTemplateProps> = {
  args: {
    title: "People",
    description: "Optional brief description about the page",
    documentationLink: "https://www.okta.com",
    documentationText: "Help",
    isFullWidth: false,
  },
  render: function C(args) {
    return (
      <PageTemplate
        title={args.title}
        description={args.description}
        documentationLink={args.documentationLink}
        documentationText={args.documentationText}
        isFullWidth={args.isFullWidth}
        primaryCallToActionComponent={
          <Button label="Reset passwords" variant="primary" />
        }
      >
        <Layout regions={[1]}>
          <Surface>
            <OdysseyForm
              title="Add Person"
              name="Add Person"
              formActions={
                <>
                  <Button label="Reset" variant="secondary" />
                  <Button type="submit" label="Submit" variant="primary" />
                </>
              }
            >
              <TextField label="First name" />
              <TextField label="Last name" />
              <TextField label="Email" />
            </OdysseyForm>
          </Surface>
        </Layout>
      </PageTemplate>
    );
  },
};

export const Dashboard: StoryObj<PageTemplateProps> = {
  args: {
    title: "Account",
    documentationLink: "https://www.okta.com",
    documentationText: "Help",
    isFullWidth: false,
  },
  render: function C(args) {
    const organizationData = [
      { field: "Company name", value: "ACME Corporation" },
      { field: "Telephone number", value: "012-345-6789" },
      { field: "Address 1", value: undefined },
      { field: "Address 2", value: undefined },
    ];
    const endUserData = [
      {
        field: "Technical contact",
        value: "Add-Min O'Cloudy (admin@okta.com)",
      },
      { field: "Support phone", value: "012-345-6789" },
      { field: "Help link", value: undefined },
      { field: "End User Help Form", value: undefined },
    ];
    const odysseyDesignTokens = useOdysseyDesignTokens();

    return (
      <PageTemplate
        title={args.title}
        description={args.description}
        documentationLink={args.documentationLink}
        documentationText={args.documentationText}
        isFullWidth={args.isFullWidth}
      >
        <Layout regions={[2, 1]}>
          <Surface>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "flex-end",
              }}
            >
              <Heading5>Organization Contact</Heading5>
              <Button label="Edit" variant="floating" />
            </Box>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                rowGap: odysseyDesignTokens.Spacing4,
                marginTop: odysseyDesignTokens.Spacing4,
              }}
            >
              {organizationData.map((data, index) => {
                return (
                  <Box
                    key={index}
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                    }}
                  >
                    <Paragraph>{data.field}</Paragraph>
                    <Paragraph>{data.value}</Paragraph>
                  </Box>
                );
              })}
            </Box>
          </Surface>
          <Surface>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "flex-end",
              }}
            >
              <Heading5>Billing information</Heading5>
              <Button label="Edit" variant="floating" />
            </Box>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                rowGap: odysseyDesignTokens.Spacing2,
                marginTop: odysseyDesignTokens.Spacing4,
              }}
            >
              <Support>
                The billing contact can be contacted by Okta for the purposes of
                billing inquiries.
              </Support>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                }}
              >
                <Paragraph>Billing contact</Paragraph>
                <Paragraph>Add-Min O'Cloudy (admin@okta.com)</Paragraph>
              </Box>
            </Box>
          </Surface>
        </Layout>
        <Layout regions={[1, 1, 1]}>
          <Surface>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "flex-end",
              }}
            >
              <Heading5>Give Access to Okta Support</Heading5>
              <Button label="Edit" variant="floating" />
            </Box>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                rowGap: odysseyDesignTokens.Spacing2,
                marginTop: odysseyDesignTokens.Spacing4,
              }}
            >
              <Support>
                For troubleshooting purposes, you can let Okta Support login to
                your account as an administrator.
              </Support>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                }}
              >
                <Paragraph>Okta Support access</Paragraph>
                <Paragraph>Disabled</Paragraph>
              </Box>
            </Box>
          </Surface>
          <Surface>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "flex-end",
              }}
            >
              <Heading5>End User Support</Heading5>
              <Button label="Edit" variant="floating" />
            </Box>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                rowGap: odysseyDesignTokens.Spacing2,
                marginTop: odysseyDesignTokens.Spacing4,
              }}
            >
              <Support>
                For troubleshooting purposes, you can let Okta Support login to
                your account as an administrator.
              </Support>
              {endUserData.map((data, index) => {
                return (
                  <Box
                    key={index}
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                    }}
                  >
                    <Paragraph>{data.field}</Paragraph>
                    <Paragraph>{data.value}</Paragraph>
                  </Box>
                );
              })}
            </Box>
          </Surface>
          <Surface>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "flex-end",
              }}
            >
              <Heading5>Third-Party Admins</Heading5>
              <Button label="Edit" variant="floating" />
            </Box>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                rowGap: odysseyDesignTokens.Spacing2,
                marginTop: odysseyDesignTokens.Spacing4,
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  columnGap: odysseyDesignTokens.Spacing8,
                }}
              >
                <Paragraph>Manage Third-Party Admins</Paragraph>
                <Checkbox label="This org contains third-party admins that need to be fully excluded from all Okta communications, including admin-related system notifications. Once enabled, you can exclude individual admins from communications by editing their admin record." />
              </Box>
            </Box>
          </Surface>
        </Layout>
      </PageTemplate>
    );
  },
};

export const FullWidth: StoryObj<PageTemplateProps> = {
  args: {
    title: "Full-width Table",
    documentationLink: "https://www.okta.com",
    documentationText: "Help",
    isFullWidth: true,
  },
  render: function C(args) {
    const [data] = useState<Person[]>(personData.slice(0, 10));

    const getData = useCallback(() => {
      return data;
    }, [data]);

    return (
      <PageTemplate
        title={args.title}
        documentationLink={args.documentationLink}
        documentationText={args.documentationText}
        isFullWidth={args.isFullWidth}
      >
        <Layout regions={[1]}>
          <Surface>
            <DataTable
              columns={personColumns}
              getData={getData}
              hasSearch
              hasFilters
              totalRows={10}
            />
          </Surface>
        </Layout>
      </PageTemplate>
    );
  },
};
