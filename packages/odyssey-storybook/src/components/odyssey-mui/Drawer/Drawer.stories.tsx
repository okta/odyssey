/*!
 * Copyright (c) 2024-present, Okta, Inc. and/or its affiliates. All rights reserved.
 * The Okta software accompanied by this notice is provided pursuant to the Apache License, Version 2.0 (the "License.")
 *
 * You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0.
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *
 * See the License for the specific language governing permissions and limitations under the License.
 */

import {
  Accordion,
  Box,
  Button,
  Drawer,
  DrawerProps,
  variantValues,
} from "@okta/odyssey-react-mui";
import { Meta, StoryObj } from "@storybook/react";
import { userEvent, waitFor, within } from "@storybook/test";
import { useCallback, useState } from "react";

import { axeRun } from "../../../axe-util.js";
import { MuiThemeDecorator } from "../../../../.storybook/components/index.js";

const gridStubText = (
  <>
    <Box sx={{ maxWidth: "850px" }}>
      Multifactor authentication (MFA) means that users must verify their
      identity in two or more ways to gain access to their account. This makes
      it harder for unauthorized parties to sign in to a user’s account because
      it’s unlikely that they have access to all of the user’s authentication
      methods. Adding authenticators with different factor types and method
      characteristics strengthens your MFA strategy. You can require
      authenticators for apps or groups of users and specify which ones can be
      used for account recovery.
    </Box>
    <br />
    <ul>
      <li>
        Device-bound: These authenticators are associated with a specific
        device.
      </li>
      <li>
        Hardware-protected: These authenticators require a physical device to
        authenticate.
      </li>
      <li>
        Phishing-resistant: These authenticators don’t provide any
        authentication data that a user can share with others. Users therefore
        can’t be tricked into sharing their credentials in phishing campaigns.
        See Phishing-resistant authentication and Okta solutions for phishing
        resistance.
      </li>
      <li>User presence: These authenticators require human interaction.</li>
      <li>
        User verifying: These authenticators prove that a specific user is the
        one who is authenticating.
      </li>
    </ul>
  </>
);

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

const meta = {
  title: "MUI Components/Drawer",
  component: Drawer,
  argTypes: {
    primaryCallToActionComponent: {
      description:
        "An optional Button object to be situated in the Drawer footer. Should almost always be of variant `primary`.",
      table: {
        type: {
          summary: "<Button />",
        },
      },
    },
    secondaryCallToActionComponent: {
      description:
        "An optional Button object to be situated in the Drawer footer, alongside the `callToActionPrimaryComponent`.",
      table: {
        type: {
          summary: "<Button />",
        },
      },
    },
    tertiaryCallToActionComponent: {
      description:
        "An optional Button object to be situated in the Drawer footer, alongside the other two `callToAction` components.",
      table: {
        type: {
          summary: "<Button />",
        },
      },
    },
    children: {
      control: "text",
      description:
        "The content of the Drawer. May be a `string` or any other `ReactNode` or array of `ReactNode`s.",
      table: {
        type: {
          summary: "ReactNode | Array<ReactNode>",
        },
      },
      type: {
        required: true,
        name: "other",
        value: "ReactNode | Array<ReactNode>",
      },
    },
    isOpen: {
      control: "boolean",
      description: "When set to `true`, the drawer will be visible.",
      table: {
        type: {
          summary: "boolean",
        },
      },
      type: {
        name: "boolean",
      },
    },
    onClose: {
      description:
        "Callback that controls what happens when the drawer is dismissed",
      table: {
        type: {
          summary: "func",
        },
      },
    },
    showDividers: {
      control: "text",
      description:
        "Shows divider lines separating header, content, and footer (if using action buttons)",
      table: {
        type: {
          summary: "boolean",
        },
        defaultValue: {
          summary: "false",
        },
      },
      type: {
        required: true,
        name: "string",
      },
    },
    title: {
      control: "text",
      table: {
        type: {
          summary: "string",
        },
      },
      type: {
        required: true,
        name: "string",
      },
    },
    variant: {
      options: variantValues,
      control: { type: "radio" },
      description: "The type of drawer",
      table: {
        type: {
          summary: variantValues.join(" | "),
        },
        defaultValue: {
          summary: "temporary",
        },
      },
      type: {
        required: true,
        name: "string",
      },
    },

    ariaLabel: {
      type: {
        required: true,
        name: "string",
      },
      control: "text",
    },
  },
  args: {
    children: drawerLongText,
    ariaLabel: "close",
  },
  decorators: [MuiThemeDecorator],
  tags: ["autodocs"],
} satisfies Meta<typeof Drawer>;

export default meta;

type Story = StoryObj<typeof meta>;

const DefaultTemplate: Story = {
  args: {} as DrawerProps, // This is a hack
  render: function C(props) {
    const [isVisible, setIsVisible] = useState(false);
    const onOpen = useCallback(() => {
      setIsVisible(true);
    }, []);

    const onClose = useCallback(() => {
      setIsVisible(false);
    }, []);

    const gridLayout = (
      <Box
        sx={{
          "@keyframes animate-drawer-open": {
            "0%": {
              gridTemplateColumns: "minmax(0, 2fr) 0",
            },
            "100%": {
              gridTemplateColumns: "minmax(0, 2fr) 360px",
            },
          },
          "@keyframes animate-drawer-close": {
            "0%": {
              gridTemplateColumns: "minmax(0, 2fr) 360px",
            },
            "100%": {
              gridTemplateColumns: "minmax(0, 2fr) 0",
            },
          },
          display: "grid",
          maxWidth: "1000px",
          padding: "24px",
          gridColumnGap: "24px",
          gridTemplateColumns: "minmax(0, 2fr) auto",
          animation: isVisible
            ? "animate-drawer-open 225ms cubic-bezier(0, 0, 0.2, 1)"
            : "animate-drawer-close 225ms cubic-bezier(0, 0, 0.2, 1)",
        }}
      >
        <Box>
          <h2>CSS Grid Layout</h2>
          {gridStubText}
        </Box>
        {isVisible ? (
          <Box>
            <Drawer
              {...props}
              primaryCallToActionComponent={
                <Button label="Primary" onClick={onClose} variant="primary" />
              }
              secondaryCallToActionComponent={
                <Button
                  label="Secondary"
                  onClick={onClose}
                  variant="secondary"
                />
              }
              onClose={onClose}
              isOpen={isVisible}
            />
          </Box>
        ) : null}
      </Box>
    );

    return (
      <>
        {props.variant === "persistent" ? (
          <>
            <Button
              label={isVisible ? "Close drawer" : "Open drawer"}
              onClick={() => {
                if (isVisible) {
                  onClose();
                } else {
                  onOpen();
                }
              }}
              variant="primary"
            />
            {gridLayout}
          </>
        ) : (
          <>
            <Button label="Open drawer" onClick={onOpen} variant="primary" />
            <Drawer
              {...props}
              primaryCallToActionComponent={
                <Button label="Primary" onClick={onClose} variant="primary" />
              }
              secondaryCallToActionComponent={
                <Button
                  label="Secondary"
                  onClick={onClose}
                  variant="secondary"
                />
              }
              tertiaryCallToActionComponent={
                <Button label="Cancel" onClick={onClose} variant="floating" />
              }
              onClose={onClose}
              isOpen={isVisible}
            />
          </>
        )}
      </>
    );
  },
};

export const Overlay: Story = {
  ...DefaultTemplate,
  parameters: {
    docs: {
      description: {
        story:
          "Overlay blocks all other page actions and sits on top page content.",
      },
    },
  },
  args: {
    children: drawerLongText,
    title: "Okta Privileged Access",
  } as DrawerProps, // This is a hack,
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);
    await step("open Default Drawer", async () => {
      const buttonElement = canvas.getByText("Open drawer");
      await userEvent.click(buttonElement);
      await waitFor(async () => {
        await axeRun("Default Drawer");
      });
    });
  },
};

export const Persistent: Story = {
  ...DefaultTemplate,
  parameters: {
    docs: {
      description: {
        story:
          "Persistent is embedded in the content like a dismissable sidebar",
      },
    },
  },
  args: {
    variant: "persistent",
    children: (
      <>
        <Accordion label="User and resource details">
          This is the third accordion item.
        </Accordion>
        <Accordion label="First-level review details">
          This is the fourth accordion item.
        </Accordion>
        <Accordion label="Second-level review details">
          This is the fifth accordion item.
        </Accordion>
      </>
    ),
    title: "Profile details",
  } as DrawerProps, // This is a hack,
};

export const ShowDividers: Story = {
  ...DefaultTemplate,
  parameters: {
    docs: {
      description: {
        story: "Persistent Drawer with Dividers lines enabled",
      },
    },
  },
  args: {
    variant: "persistent",
    showDividers: true,
    children: (
      <>
        <Accordion label="User and resource details">
          This is the third accordion item.
        </Accordion>
        <Accordion label="First-level review details">
          This is the fourth accordion item.
        </Accordion>
        <Accordion label="Second-level review details">
          This is the fifth accordion item.
        </Accordion>
      </>
    ),
    title: "Profile details",
  } as DrawerProps, // This is a hack
};

export const NoFooter: Story = {
  render: function C(props) {
    const [isVisible, setIsVisible] = useState(false);

    const onOpen = useCallback(() => {
      setIsVisible(true);
    }, []);

    const onClose = useCallback(() => {
      setIsVisible(false);
    }, []);

    return (
      <>
        <Button label="Open drawer" onClick={onOpen} variant="primary" />
        <Drawer {...props} onClose={onClose} isOpen={isVisible} />
      </>
    );
  },
  args: {
    children: drawerLongText,
    title: "Okta Privileged Access",
  } as DrawerProps, // This is a hack
};
