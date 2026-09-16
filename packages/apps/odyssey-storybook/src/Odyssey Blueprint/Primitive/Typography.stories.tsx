/*!
 * Copyright (c) 2026-present, Okta, Inc. and/or its affiliates. All rights reserved.
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

import {
  OdysseyBlueprintRenderer,
  type OdysseyBlueprintRendererProps,
} from "@okta/odyssey-blueprint";

import {
  staticBoardParameters,
  StoryCell,
  StoryGrid,
  StorySection,
} from "../../tools/boardStoryHelpers.js";
import { OdysseyBlueprintStorybookThemeDecorator } from "../../tools/OdysseyBlueprintStorybookThemeDecorator.js";

const storybookMeta: Meta<OdysseyBlueprintRendererProps> = {
  component: OdysseyBlueprintRenderer,
  decorators: [OdysseyBlueprintStorybookThemeDecorator],
  parameters: {
    layout: "padded",
  },
  tags: ["autodocs", "alpha"],
  args: {
    blueprint: {
      from: "odyssey-blueprint/heading@1",
      instanceId: "playground.heading",
      inputs: {
        level: 3,
        text: "Sign-on policies",
      },
    },
  },
};

export default storybookMeta;

type Story = StoryObj<OdysseyBlueprintRendererProps>;

export const Playground: Story = {};

// One renderer per cell rather than one blueprint holding every block:
// `OdysseyBlueprintRenderer` takes a single root entry, and each entry needs its
// own `instanceId` because instance registration is keyed by it.
export const AllVariants: Story = {
  parameters: staticBoardParameters,
  render: function C() {
    return (
      <StorySection title="Every typography block, plus every heading level and link variant.">
        {/* The heading cells run 1 through 6 in DOM order so the board does not
            skip a level and trip the heading-order rule the a11y check enforces. */}
        <StoryGrid columns={3}>
          <StoryCell label="heading@1, level 1">
            <OdysseyBlueprintRenderer
              blueprint={{
                from: "odyssey-blueprint/heading@1",
                instanceId: "variants.heading.one",
                inputs: { level: 1, text: "Applications" },
              }}
            />
          </StoryCell>

          <StoryCell label="heading@1, level 2">
            <OdysseyBlueprintRenderer
              blueprint={{
                from: "odyssey-blueprint/heading@1",
                instanceId: "variants.heading.two",
                inputs: { level: 2, text: "Sign-on policies" },
              }}
            />
          </StoryCell>

          <StoryCell label="heading@1, level 3">
            <OdysseyBlueprintRenderer
              blueprint={{
                from: "odyssey-blueprint/heading@1",
                instanceId: "variants.heading.three",
                inputs: { level: 3, text: "Group rules" },
              }}
            />
          </StoryCell>

          <StoryCell label="heading@1, level 4">
            <OdysseyBlueprintRenderer
              blueprint={{
                from: "odyssey-blueprint/heading@1",
                instanceId: "variants.heading.four",
                inputs: { level: 4, text: "Authenticators" },
              }}
            />
          </StoryCell>

          <StoryCell label="heading@1, level 5">
            <OdysseyBlueprintRenderer
              blueprint={{
                from: "odyssey-blueprint/heading@1",
                instanceId: "variants.heading.five",
                inputs: { level: 5, text: "Factor enrollment" },
              }}
            />
          </StoryCell>

          <StoryCell label="heading@1, level 6">
            <OdysseyBlueprintRenderer
              blueprint={{
                from: "odyssey-blueprint/heading@1",
                instanceId: "variants.heading.six",
                inputs: { level: 6, text: "Session lifetime" },
              }}
            />
          </StoryCell>
        </StoryGrid>

        <StoryGrid columns={3}>
          <StoryCell label="paragraph@1">
            <OdysseyBlueprintRenderer
              blueprint={{
                from: "odyssey-blueprint/paragraph@1",
                instanceId: "variants.paragraph",
                inputs: {
                  text: "A sign-on policy decides which authenticators a user is asked for when they access an app.",
                },
              }}
            />
          </StoryCell>

          <StoryCell label="link@1, default">
            <OdysseyBlueprintRenderer
              blueprint={{
                from: "odyssey-blueprint/link@1",
                instanceId: "variants.link.default",
                inputs: {
                  href: "https://okta.com",
                  text: "Manage authenticators",
                },
              }}
            />
          </StoryCell>

          <StoryCell label="link@1, monochrome">
            <OdysseyBlueprintRenderer
              blueprint={{
                from: "odyssey-blueprint/link@1",
                instanceId: "variants.link.monochrome",
                inputs: {
                  href: "https://okta.com",
                  text: "Manage authenticators",
                  variant: "monochrome",
                },
              }}
            />
          </StoryCell>
        </StoryGrid>
      </StorySection>
    );
  },
};

export const AllStates: Story = {
  parameters: staticBoardParameters,
  render: function C() {
    return (
      <StorySection title="Every prop-driven state, across the blocks that support it.">
        <StoryGrid columns={3}>
          <StoryCell label="paragraph, color primary">
            <OdysseyBlueprintRenderer
              blueprint={{
                from: "odyssey-blueprint/paragraph@1",
                instanceId: "states.paragraph.primary",
                inputs: { color: "primary", text: "Policy applied to 12 apps" },
              }}
            />
          </StoryCell>

          <StoryCell label="paragraph, color textPrimary">
            <OdysseyBlueprintRenderer
              blueprint={{
                from: "odyssey-blueprint/paragraph@1",
                instanceId: "states.paragraph.textPrimary",
                inputs: {
                  color: "textPrimary",
                  text: "Policy applied to 12 apps",
                },
              }}
            />
          </StoryCell>

          <StoryCell label="paragraph, color secondary">
            <OdysseyBlueprintRenderer
              blueprint={{
                from: "odyssey-blueprint/paragraph@1",
                instanceId: "states.paragraph.secondary",
                inputs: {
                  color: "secondary",
                  text: "Policy applied to 12 apps",
                },
              }}
            />
          </StoryCell>

          <StoryCell label="paragraph, color textSecondary">
            <OdysseyBlueprintRenderer
              blueprint={{
                from: "odyssey-blueprint/paragraph@1",
                instanceId: "states.paragraph.textSecondary",
                inputs: {
                  color: "textSecondary",
                  text: "Policy applied to 12 apps",
                },
              }}
            />
          </StoryCell>

          <StoryCell label="paragraph, color error">
            <OdysseyBlueprintRenderer
              blueprint={{
                from: "odyssey-blueprint/paragraph@1",
                instanceId: "states.paragraph.error",
                inputs: {
                  color: "error",
                  text: "This policy has no assigned groups",
                },
              }}
            />
          </StoryCell>

          <StoryCell label="paragraph, as span">
            <OdysseyBlueprintRenderer
              blueprint={{
                from: "odyssey-blueprint/paragraph@1",
                instanceId: "states.paragraph.span",
                inputs: {
                  component: "span",
                  text: "Inline body text inside a span",
                },
              }}
            />
          </StoryCell>

          {/* `component: "div"` keeps the visual heading level while emitting a
              non-heading element, so a state board can show heading styling
              without adding out-of-order headings to the canvas. */}
          <StoryCell label="heading, color error, as div">
            <OdysseyBlueprintRenderer
              blueprint={{
                from: "odyssey-blueprint/heading@1",
                instanceId: "states.heading.error",
                inputs: {
                  color: "error",
                  component: "div",
                  level: 4,
                  text: "Enrollment failed",
                },
              }}
            />
          </StoryCell>

          <StoryCell label="heading, color secondary, as div">
            <OdysseyBlueprintRenderer
              blueprint={{
                from: "odyssey-blueprint/heading@1",
                instanceId: "states.heading.secondary",
                inputs: {
                  color: "secondary",
                  component: "div",
                  level: 5,
                  text: "Last evaluated 2 minutes ago",
                },
              }}
            />
          </StoryCell>

          <StoryCell label="heading, aria label, as div">
            <OdysseyBlueprintRenderer
              blueprint={{
                from: "odyssey-blueprint/heading@1",
                instanceId: "states.heading.ariaLabel",
                inputs: {
                  ariaLabel: "Multifactor authentication policies",
                  component: "div",
                  level: 4,
                  text: "MFA policies",
                },
              }}
            />
          </StoryCell>

          <StoryCell label="link, new tab">
            <OdysseyBlueprintRenderer
              blueprint={{
                from: "odyssey-blueprint/link@1",
                instanceId: "states.link.newTab",
                inputs: {
                  href: "https://okta.com",
                  rel: "noopener noreferrer",
                  target: "_blank",
                  text: "Okta documentation",
                },
              }}
            />
          </StoryCell>

          <StoryCell label="link, aria label">
            <OdysseyBlueprintRenderer
              blueprint={{
                from: "odyssey-blueprint/link@1",
                instanceId: "states.link.ariaLabel",
                inputs: {
                  ariaLabel: "Read the group rules guide",
                  href: "https://okta.com",
                  text: "Learn more",
                },
              }}
            />
          </StoryCell>

          <StoryCell label="link, untranslated">
            <OdysseyBlueprintRenderer
              blueprint={{
                from: "odyssey-blueprint/link@1",
                instanceId: "states.link.untranslated",
                inputs: {
                  href: "https://okta.com",
                  text: "Okta Verify",
                  translate: "no",
                },
              }}
            />
          </StoryCell>
        </StoryGrid>
      </StorySection>
    );
  },
};
