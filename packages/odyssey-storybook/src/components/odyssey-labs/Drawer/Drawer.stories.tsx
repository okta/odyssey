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

import { Meta, StoryObj } from "@storybook/react";

import {
  Accordion,
  Box,
  Button,
  Drawer,
  variantValues,
  DrawerProps,
} from "@okta/odyssey-react-mui";

import { useCallback, useState } from "react";
import { userEvent, waitFor, within } from "@storybook/testing-library";
import { axeRun } from "../../../axe-util";

import { MuiThemeDecorator } from "../../../../.storybook/components";

const gridStubText = (
  <>
    <div>
      Multifactor authentication (MFA) means that users must verify their
      identity in two or more ways to gain access to their account. This makes
      it harder for unauthorized parties to sign in to a user’s account because
      it’s unlikely that they have access to all of the user’s authentication
      methods. Adding authenticators with different factor types and method
      characteristics strengthens your MFA strategy. You can require
      authenticators for apps or groups of users and specify which ones can be
      used for account recovery.
    </div>
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

const storybookMeta: Meta<DrawerProps> = {
  title: "MUI Components/Drawer",
  component: Drawer,
  argTypes: {
    callToActionFirstComponent: {
      control: null,
      description:
        "An optional Button object to be situated in the Drawer footer. Should almost always be of variant `primary`.",
      table: {
        type: {
          summary: "<Button />",
        },
      },
    },
    callToActionSecondComponent: {
      control: null,
      description:
        "An optional Button object to be situated in the Drawer footer, alongside the `callToActionPrimaryComponent`.",
      table: {
        type: {
          summary: "<Button />",
        },
      },
    },
    callToActionLastComponent: {
      control: null,
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
          required: true,
          summary: "ReactNode | Array<ReactNode>",
        },
      },
      type: {
        required: true,
        name: "other",
        value: "ReactNode | Array<ReactNode>",
      },
    },
    hasVisibleTitle: {
      control: "boolean",
      description: "When set to `true`, title text is visible",
      table: {
        type: {
          summary: "boolean",
        },
      },
      type: {
        required: false,
        name: "boolean",
      },
      defaultValue: {
        summary: "true",
      },
    },
    isOpen: {
      control: "boolean",
      description: "When set to `true`, the drawer will be visible.",
      table: {
        type: {
          required: true,
          summary: "boolean",
        },
      },
      type: {
        name: "boolean",
      },
    },
    onClose: {
      control: "function",
      description:
        "Callback that controls what happens when the drawer is dismissed",
      table: {
        type: {
          summary: "func",
        },
      },
    },
    title: {
      control: "text",
      table: {
        type: {
          required: true,
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
          required: true,
          summary: variantValues.join(" | "),
        },
        defaultValue: {
          summary: "temporary",
        },
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
};

export default storybookMeta;

const DefaultTemplate: StoryObj<DrawerProps> = {
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
        {props.variant === "persistent" ? (
          <>
            <Button label="Open drawer" onClick={onOpen} variant="primary" />
            <Box
              sx={{
                display: "flex",
                gap: "24px",
                padding: "24px",
                justifyContent: "space-between",
                alignItems: "stretch",
                minHeight: "80vh",
                transition: "width ease-out 250ms",
              }}
            >
              <Box
                sx={{
                  flex: 1,
                  paddingTop: "24px",
                }}
              >
                {gridStubText}
              </Box>
              <Box
                sx={{
                  flex: "0 0 auto",
                  overflowY: "auto",
                  maxHeight: "80vh",
                  width: isVisible ? "auto" : 0,
                }}
              >
                <Drawer
                  {...props}
                  callToActionFirstComponent={
                    <Button
                      label="Primary"
                      onClick={onClose}
                      variant="primary"
                    />
                  }
                  callToActionSecondComponent={
                    <Button
                      label="Secondary"
                      onClick={onClose}
                      variant="secondary"
                    />
                  }
                  callToActionLastComponent={
                    <Button
                      label="Cancel"
                      onClick={onClose}
                      variant="floating"
                    />
                  }
                  onClose={onClose}
                  isOpen={isVisible}
                />
              </Box>
            </Box>
          </>
        ) : (
          <>
            <Button label="Open drawer" onClick={onOpen} variant="primary" />
            <Drawer
              {...props}
              callToActionFirstComponent={
                <Button label="Primary" onClick={onClose} variant="primary" />
              }
              callToActionSecondComponent={
                <Button
                  label="Secondary"
                  onClick={onClose}
                  variant="secondary"
                />
              }
              callToActionLastComponent={
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

export const Overlay: StoryObj<DrawerProps> = {
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
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);
    await step("open Default Drawer", async () => {
      const buttonElement = canvas.getByText("Open drawer");
      userEvent.click(buttonElement);
      await waitFor(() => {
        axeRun("Default Drawer");
      });
    });
  },
};

export const Persistent: StoryObj<DrawerProps> = {
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
  },
};

export const NoFooter: StoryObj<DrawerProps> = {
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
  },
};

export const NoVisibleTitle: StoryObj<DrawerProps> = {
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
    hasVisibleTitle: false,
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
  },
};
