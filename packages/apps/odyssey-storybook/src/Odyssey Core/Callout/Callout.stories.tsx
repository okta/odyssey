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

import {
  Callout,
  CalloutProps,
  calloutRoleValues,
  calloutSeverityValues,
} from "@okta/odyssey-react-mui";
import { Meta, StoryObj } from "@storybook/react-vite";

import {
  staticBoardParameters,
  StoryCell,
  StoryGrid,
  StorySection,
} from "../../tools/boardStoryHelpers.js";
import { OdysseyStorybookThemeDecorator } from "../../tools/OdysseyStorybookThemeDecorator.js";

const storybookMeta: Meta<CalloutProps> = {
  component: Callout,
  decorators: [OdysseyStorybookThemeDecorator],
  tags: ["autodocs"],
  argTypes: {
    children: {
      control: "text",
      description: "Used to optionally pass a text list to the component",
      table: {
        type: {
          summary: "ReactNode | Array<ReactNode>",
        },
      },
      type: {
        name: "other",
        value: "ReactNode | Array<ReactNode>",
      },
    },
    linkRel: {
      control: "text",
      description:
        "The rel attribute defines the relationship between a linked resource and the current document.",
      table: {
        type: {
          summary: "string",
        },
      },
    },
    linkTarget: {
      control: "text",
      description:
        "The target property of the `HTMLAnchorElement` interface is a string that indicates where to display the linked resource.",
      table: {
        type: {
          summary: "string",
        },
      },
    },
    linkText: {
      control: "text",
      description:
        "If linkUrl is defined, this is the text of the link. If left blank, it defaults to 'Learn more'. Note that linkText does nothing if linkUrl is not defined",
      table: {
        type: {
          summary: "string",
        },
      },
    },
    linkUrl: {
      control: "text",
      description: "If defined, the Callout will include a link to the URL",
      table: {
        type: {
          summary: "string",
        },
      },
    },
    onLinkClick: {
      description: "Function to call when the link is clicked",
      table: {
        type: {
          summary: "func",
        },
      },
    },
    role: {
      options: calloutRoleValues,
      control: { type: "radio" },
      description:
        "Sets the ARIA role of the Callout ('status' for something that dynamically updates, 'alert' for errors, null for something unchanging)",
      table: {
        type: {
          summary: calloutRoleValues.join(" | "),
        },
      },
    },
    severity: {
      options: calloutSeverityValues,
      control: { type: "radio" },
      description: "Determine the color and icon of the Callout",
      table: {
        type: {
          summary: calloutSeverityValues.join(" | "),
        },
      },
      type: {
        name: "other",
        value: "radio",
      },
    },
    text: {
      control: "text",
      description: "The content of the Callout",
      table: {
        type: {
          summary: "string",
        },
      },
      type: {
        name: "string",
      },
    },
    title: {
      control: "text",
      description: "The title of the Callout",
      table: {
        type: {
          summary: "string",
        },
      },
    },
  },
  args: {
    text: "You're signed in from Moonbase Alpha-6, located on Luna.",
    severity: "info",
  },
};

export default storybookMeta;

export const Playground: StoryObj<CalloutProps> = {
  args: {
    role: "status",
    severity: "info",
    title: "Authentication status",
    text: "You're signed in from Moonbase Alpha-6, located on Luna.",
  },
};

export const AllVariants: StoryObj<CalloutProps> = {
  parameters: staticBoardParameters,
  render: function C() {
    return (
      <StorySection title="Every severity.">
        <StoryGrid columns={2}>
          {calloutSeverityValues.map((severity) => (
            <StoryCell key={severity} label={severity}>
              <Callout
                role={severity === "error" ? "alert" : "status"}
                severity={severity}
                text={`This is a ${severity} callout.`}
                title={`${severity} title`}
              />
            </StoryCell>
          ))}
        </StoryGrid>
      </StorySection>
    );
  },
};

export const WithLink: StoryObj<CalloutProps> = {
  args: {
    role: "alert",
    severity: "error",
    title: "Safety checks failed",
    text: "There is an issue with the fuel mixture ratios. Reconfigure the fuel mixture and perform the safety checks again.",
    linkText: "Visit fueling console",
    linkUrl: "#",
  },
};

export const WithLinkAndTarget: StoryObj<CalloutProps> = {
  args: {
    role: "alert",
    severity: "error",
    title: "Safety checks failed",
    text: "There is an issue with the fuel mixture ratios. Reconfigure the fuel mixture and perform the safety checks again.",
    linkTarget: "_blank",
    linkText: "Visit fueling console",
    linkUrl: "#",
  },
};

export const ChildrenWithList: StoryObj<CalloutProps> = {
  args: {
    role: "status",
    severity: "info",
    title: "Delivery details needed to complete your user profile",
    text: undefined,
    children: (
      <ul>
        <li>Secondary email</li>
        <li>Street address</li>
        <li>City</li>
      </ul>
    ),
  },
};
