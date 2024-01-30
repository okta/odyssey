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
    <p>
      Curabitur lacinia pharetra placerat. Duis sed aliquet nunc, a sollicitudin
      orci. Aliquam non rhoncus mauris, in pellentesque mi. Nulla nec justo
      nisi. Duis pretium mauris ante, et sollicitudin nibh fermentum vel. Nullam
      a dolor nulla. In vulputate sagittis lacinia. Morbi finibus non quam eget
      tincidunt. Ut viverra, elit vel dignissim tincidunt, nulla ligula lobortis
      tellus, sed pellentesque augue nulla nec massa. Orci varius natoque
      penatibus et magnis dis parturient montes, nascetur ridiculus mus. Sed et
      eros interdum, gravida dolor id, placerat nisl. Cras vel lorem eget ligula
      vestibulum tincidunt quis sed odio.
    </p>
    <p>
      Ut feugiat eget ipsum a egestas. Praesent vitae eros egestas, tincidunt
      magna eu, fermentum nulla. Aliquam suscipit, tellus ut interdum congue,
      magna ex dignissim mi, quis semper turpis dolor eu justo. Maecenas finibus
      faucibus lacus, non bibendum nisl bibendum dignissim. Nam sollicitudin
      sollicitudin sapien nec efficitur. Proin faucibus at ante ut dictum.
      Aenean non nisl felis. In sollicitudin elit vel ligula commodo, at
      malesuada elit pellentesque. Nullam pretium placerat massa, vitae
      ullamcorper ipsum euismod eget. Interdum et malesuada fames ac ante ipsum
      primis in faucibus. Nam sodales vitae ante ac euismod.
    </p>
  </>
);

const drawerLongText = (
  <>
    <p>
      There's no silver bullet when it comes to achieving a Zero Trust security
      architecture. That's because every organization is at a different stage of
      its journey, but identity is at the heart of any successful adoption.
      We've broken down the stages of Identity adoption and progression through
      a Zero Trust journey for you to base yourself against.
    </p>
    <p>
      Okta seamlessly integrates your identity solution across your entire
      technology ecosystem, and partners with other security leaders, to unify
      your approach to Zero Trust. Interested in where your organization falls
      on this maturity curve? Take our Zero Trust Assessment to get personalized
      recommendations on how to tackle the Zero Trust journey with identity and
      secure your organization.Customer Identity is so much more than just the
      login box - from keeping every click safe to increasing acquisition and
      retention. Empower app developers, digital leaders, and security teams to
      accelerate time to market and grow your business. Customer Identity is so
      much more than just the login box - from keeping every click safe to
      increasing acquisition and retention.
    </p>
    <p>
      Empower app developers, digital leaders, and security teams to accelerate
      time to market and grow your business. Customer Identity and Access
      Management is how companies give end users access to their digital
      properties. It's also how they govern, collect, analyze, and securely
      store all that user data. So if an awesome registration and login
      experience is currently delighting your customers, you're likely doing
      Identity right. Not quite there yet? It's OK. That's why we created the
      Customer Identity Cloud — so you could leave authentication to us. Okta's
      Customer Identity Cloud helps you build strong digital relationships, keep
      users' clicks safe, and free up developers' time for other projects.
    </p>
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
        required: true,
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
            <div
              style={{
                display: "flex",
                gap: "24px",
                padding: "24px",
                justifyContent: "space-between",
                alignItems: "stretch",
                minHeight: "100vh",
              }}
            >
              <div style={{ flex: 1, paddingTop: "24px" }}>{gridStubText}</div>
              <div
                style={{
                  flex: "0 0 auto",
                  overflowY: "auto",
                  maxHeight: "100vh",
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
              </div>
            </div>
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

export const Default: StoryObj<DrawerProps> = {
  ...DefaultTemplate,
  args: {
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

export const Long: StoryObj<DrawerProps> = {
  ...DefaultTemplate,
  parameters: {
    docs: {
      description: {
        story:
          "If the `Drawer` content is longer than the available space, content will scroll within the frame and the footer (if used) will be pinned to the bottom of the `Drawer`, with content scrolling below it.",
      },
    },
  },
  args: {
    children: (
      <>
        <Box>
          For example, a Contributor (the Initial Developer in (a) the power,
          direct or indirect, to cause the whole must be sufficiently detailed
          for a particular version of the Work, you may distribute a complete,
          unmodified copy of the operating system on which the editorial
          revisions, annotations, elaborations, or other work as a result of any
          kind, either expressed or implied, including, without limitation,
          Section 2. Any Modifications that alter or restrict this License
          incorporates the limitation as if written in the Work that has
          Contributed a Contribution incorporated within the Work. This license
          has been advised of the Work. This could, for example, why
          distributing LaTeX under the GNU Library General Public License from
          time to time. Each version will be given a distinguishing version
          number.
        </Box>
        <Box>
          If the Recipient may use this wording to make the derivative work
          available to such recipients. You are located in the case of each
          Contributor, changes to the combination of their Contribution(s) alone
          or when combined with the complete corresponding machine-readable
          source code, which must be included with each copy of this License
          Agreement (except that you distribute, to contain a file containing
          Original Code or Modifications that you include complete instructions
          on demand or cease distribution within thirty (30) days of becoming
          aware of the LaTeX Project Public License, either version 2 of the
          date You accept this license. Provisions that, by their nature, should
          remain in effect beyond the termination of this Agreement more than
          fifty percent (50%) of the Source Code or any derivative version,
          provided, however, that the Source Code of Your Externally Deployed
          Modifications must be included in the course of creating the Derived
          Work.
        </Box>
        <Box>
          You distribute the Source Code version of Licensed Product has been
          generated from a designated place, then offering equivalent access to
          copy the source code. Distribution Mechanism"). The Source Code of the
          date that such additional attribution requirements to the following
          terms are defined when they are first used, and the date it initially
          became available, or at least the "copyright" line and a pointer to
          where the Work unless that component is used with the Wikimedia
          community. Text from external sources may attach additional
          attribution requirements to the terms of this License Agreement will
          be guided by the terms under which it was received. In addition, after
          a new version of the Derivative Works that consist of the use or not
          licensed at no charge to all third parties, if you received it.
        </Box>
      </>
    ),
    title: "Cryosleep liability waiver",
  },
};

export const NoButtons: StoryObj<DrawerProps> = {
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
    title: "Ceres Station docking terms",
  },
};
