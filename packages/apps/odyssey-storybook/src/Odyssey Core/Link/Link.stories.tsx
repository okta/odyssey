/*!
 * Copyright (c) 2022-present, Okta, Inc. and/or its affiliates. All rights reserved.
 * The Okta software accompanied by this notice is provided pursuant to the Apache License, Version 2.0 (the "License.")
 *
 * You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0.
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *
 * See the License for the specific language governing permissions and limitations under the License.
 */

import type { Meta, StoryObj } from "@storybook/react-vite";

import { Link, linkVariantValues } from "@okta/odyssey-react-mui";
import { InformationCircleFilledIcon } from "@okta/odyssey-react-mui/icons";

import {
  staticBoardParameters,
  StoryCell,
  StoryRow,
  StorySection,
} from "../../tools/boardStoryHelpers.js";
import icons from "../../tools/iconUtils.js";
import { OdysseyStorybookThemeDecorator } from "../../tools/OdysseyStorybookThemeDecorator.js";

const meta = {
  component: Link,
  decorators: [OdysseyStorybookThemeDecorator],
  tags: ["autodocs"],
  argTypes: {
    children: {
      control: "text",
      description: "Content rendered inside the link component",
      table: {
        category: "Visual",
        type: {
          summary: "ReactNode",
        },
      },
      type: {
        name: "string",
        required: true,
      },
    },
    href: {
      control: "text",
      description:
        "Destination URL applied to the underlying `<a href>` attribute",
      table: {
        category: "Functional",
        type: {
          summary: "string",
        },
      },
      type: {
        name: "string",
        required: true,
      },
    },
    icon: {
      control: {
        type: "select",
      },
      options: Object.keys(icons),
      mapping: icons,
      description: "An optional icon to display at the start of the Link",
      table: {
        category: "Visual",
        type: {
          summary: "<Icon />",
        },
      },
    },
    linkRef: {
      control: false,
      description: "Forwarded ref that exposes the link focus handle",
      table: {
        category: "Functional",
        type: {
          summary: "RefObject<FocusHandle>",
        },
      },
    },
    rel: {
      control: "text",
      description:
        'Relationship hints passed to the browser (for example `"noopener"` when using `target="_blank"`)',
      table: {
        category: "Functional",
        type: {
          summary: "string",
        },
      },
    },
    target: {
      control: "text",
      description: "If set to `_blank`, the Link will display an external icon",
      table: {
        category: "Functional",
        type: {
          summary: "string",
        },
      },
    },
    variant: {
      control: { type: "radio" },
      options: linkVariantValues,
      description: "The color and style of the link component",
      table: {
        category: "Visual",
        type: {
          summary: linkVariantValues.join(" | "),
        },
        defaultValue: {
          summary: "default",
        },
      },
    },
    onClick: {
      action: true,
      control: false,
      description: "Callback fired when the link is clicked",
      table: {
        category: "Functional",
        type: {
          summary: "(event: MouseEvent<HTMLAnchorElement, MouseEvent>) => void",
        },
        defaultValue: {
          summary: undefined,
        },
      },
    },
    ariaLabel: {
      control: "text",
      description:
        "Accessible HTML attribute that provides a text description for interactive elements when there's no visible text",
      table: {
        category: "Functional",
        type: {
          summary: "string",
        },
      },
    },
    testId: {
      control: "text",
      description:
        "Adds a `data-se` attribute for integration tests and analytics hooks",
      table: {
        category: "Functional",
        type: {
          summary: "string",
        },
      },
    },
    translate: {
      control: {
        type: "select",
      },
      options: [undefined, "yes", "no"],
      description:
        "HTML translate attribute that signals whether the link text should be localized",
      table: {
        category: "Functional",
        type: {
          summary: "'yes' | 'no'",
        },
      },
    },
  },
  args: {
    children: "Link text",
    href: "#anchor",
    variant: "default",
  },
} satisfies Meta<typeof Link>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

export const AllVariants: Story = {
  parameters: {
    ...staticBoardParameters,
    docs: {
      description: {
        story:
          'Static showcase. The Playground story is the interactive one where controls apply. When navigating to an external domain, combine `target="_blank"`, `rel="noopener"`, and an accessible label to clarify the behavior.',
      },
    },
  },
  render: function C() {
    return (
      <StorySection title="Every link variant, plus the leading-icon and external-link content variations.">
        <StoryRow>
          {linkVariantValues.map((variant) => (
            <StoryCell key={variant} label={variant}>
              <Link href="#anchor" variant={variant}>
                Link text
              </Link>
            </StoryCell>
          ))}

          <StoryCell label="with icon">
            <Link href="#anchor" icon={<InformationCircleFilledIcon />}>
              Link text
            </Link>
          </StoryCell>

          {/* target="_blank" appends the external-link icon. */}
          <StoryCell label='target="_blank"'>
            <Link
              ariaLabel="External Link"
              href="#anchor"
              rel="noopener"
              target="_blank"
            >
              Link text
            </Link>
          </StoryCell>
        </StoryRow>
      </StorySection>
    );
  },
};
