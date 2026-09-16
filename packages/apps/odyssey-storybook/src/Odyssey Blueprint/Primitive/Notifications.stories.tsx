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
      from: "odyssey-blueprint/banner@1",
      instanceId: "playground.banner",
      inputs: {
        severity: "info",
        text: "Okta Verify enrollment is now required for admins.",
      },
    },
  },
};

export default storybookMeta;

type Story = StoryObj<OdysseyBlueprintRendererProps>;

export const Playground: Story = {};

// One renderer per cell rather than one blueprint holding every notification:
// `OdysseyBlueprintRenderer` takes a single root entry, and each entry needs its
// own `instanceId` because instance registration is keyed by it.
export const AllVariants: Story = {
  parameters: staticBoardParameters,
  render: function C() {
    return (
      <StorySection title="Every severity, for both notification blocks.">
        <StoryGrid columns={2}>
          <StoryCell label="banner@1, success">
            <OdysseyBlueprintRenderer
              blueprint={{
                from: "odyssey-blueprint/banner@1",
                instanceId: "variants.banner.success",
                inputs: {
                  severity: "success",
                  text: "Salesforce was assigned to 4 groups.",
                },
              }}
            />
          </StoryCell>

          <StoryCell label="callout@1, success">
            <OdysseyBlueprintRenderer
              blueprint={{
                from: "odyssey-blueprint/callout@1",
                instanceId: "variants.callout.success",
                inputs: {
                  severity: "success",
                  text: "Salesforce was assigned to 4 groups.",
                },
              }}
            />
          </StoryCell>

          <StoryCell label="banner@1, info">
            <OdysseyBlueprintRenderer
              blueprint={{
                from: "odyssey-blueprint/banner@1",
                instanceId: "variants.banner.info",
                inputs: {
                  severity: "info",
                  text: "Group rules run once every 24 hours.",
                },
              }}
            />
          </StoryCell>

          <StoryCell label="callout@1, info">
            <OdysseyBlueprintRenderer
              blueprint={{
                from: "odyssey-blueprint/callout@1",
                instanceId: "variants.callout.info",
                inputs: {
                  severity: "info",
                  text: "Group rules run once every 24 hours.",
                },
              }}
            />
          </StoryCell>

          <StoryCell label="banner@1, warning">
            <OdysseyBlueprintRenderer
              blueprint={{
                from: "odyssey-blueprint/banner@1",
                instanceId: "variants.banner.warning",
                inputs: {
                  severity: "warning",
                  text: "This sign-on policy has no assigned groups.",
                },
              }}
            />
          </StoryCell>

          <StoryCell label="callout@1, warning">
            <OdysseyBlueprintRenderer
              blueprint={{
                from: "odyssey-blueprint/callout@1",
                instanceId: "variants.callout.warning",
                inputs: {
                  severity: "warning",
                  text: "This sign-on policy has no assigned groups.",
                },
              }}
            />
          </StoryCell>

          <StoryCell label="banner@1, error">
            <OdysseyBlueprintRenderer
              blueprint={{
                from: "odyssey-blueprint/banner@1",
                instanceId: "variants.banner.error",
                inputs: {
                  severity: "error",
                  text: "Factor enrollment failed for 2 users.",
                },
              }}
            />
          </StoryCell>

          <StoryCell label="callout@1, error">
            <OdysseyBlueprintRenderer
              blueprint={{
                from: "odyssey-blueprint/callout@1",
                instanceId: "variants.callout.error",
                inputs: {
                  severity: "error",
                  text: "Factor enrollment failed for 2 users.",
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
        <StoryGrid columns={2}>
          <StoryCell label="banner, dismissible">
            <OdysseyBlueprintRenderer
              blueprint={{
                from: "odyssey-blueprint/banner@1",
                instanceId: "states.banner.dismissible",
                inputs: {
                  isDismissible: true,
                  severity: "info",
                  text: "A new admin console is available.",
                },
              }}
            />
          </StoryCell>

          <StoryCell label="banner, role alert">
            <OdysseyBlueprintRenderer
              blueprint={{
                from: "odyssey-blueprint/banner@1",
                instanceId: "states.banner.roleAlert",
                inputs: {
                  role: "alert",
                  severity: "error",
                  text: "Your session expires in 2 minutes.",
                },
              }}
            />
          </StoryCell>

          <StoryCell label="banner, link with url">
            <OdysseyBlueprintRenderer
              blueprint={{
                from: "odyssey-blueprint/banner@1",
                instanceId: "states.banner.linkUrl",
                inputs: {
                  linkText: "Review policies",
                  linkUrl: "https://okta.com",
                  severity: "warning",
                  text: "3 sign-on policies are unassigned.",
                },
              }}
            />
          </StoryCell>

          {/* Setting `linkText` without `linkUrl` is how the schema selects
              Odyssey's click-mode link, where the `linkClick` event is the only
              thing a click does. */}
          <StoryCell label="banner, click-only link">
            <OdysseyBlueprintRenderer
              blueprint={{
                from: "odyssey-blueprint/banner@1",
                instanceId: "states.banner.linkClick",
                inputs: {
                  linkText: "Retry enrollment",
                  severity: "error",
                  text: "Factor enrollment failed for 2 users.",
                },
              }}
            />
          </StoryCell>

          <StoryCell label="banner, dismissible with link">
            <OdysseyBlueprintRenderer
              blueprint={{
                from: "odyssey-blueprint/banner@1",
                instanceId: "states.banner.dismissibleLink",
                inputs: {
                  isDismissible: true,
                  linkText: "Open group rules",
                  linkUrl: "https://okta.com",
                  severity: "success",
                  text: "Group rule Engineering ran successfully.",
                },
              }}
            />
          </StoryCell>

          <StoryCell label="callout, title">
            <OdysseyBlueprintRenderer
              blueprint={{
                from: "odyssey-blueprint/callout@1",
                instanceId: "states.callout.title",
                inputs: {
                  severity: "warning",
                  text: "Users in this group keep app access until the next sync.",
                  title: "Assignment removal is delayed",
                },
              }}
            />
          </StoryCell>

          <StoryCell label="callout, link with url">
            <OdysseyBlueprintRenderer
              blueprint={{
                from: "odyssey-blueprint/callout@1",
                instanceId: "states.callout.linkUrl",
                inputs: {
                  linkText: "View sign-on policy",
                  linkUrl: "https://okta.com",
                  severity: "info",
                  text: "This app inherits the org default sign-on policy.",
                  title: "Inherited policy",
                },
              }}
            />
          </StoryCell>

          <StoryCell label="callout, click-only link">
            <OdysseyBlueprintRenderer
              blueprint={{
                from: "odyssey-blueprint/callout@1",
                instanceId: "states.callout.linkClick",
                inputs: {
                  linkText: "Resend enrollment email",
                  severity: "error",
                  text: "The invitation to enroll Okta Verify was not delivered.",
                },
              }}
            />
          </StoryCell>

          <StoryCell label="callout, nested paragraph body">
            <OdysseyBlueprintRenderer
              blueprint={{
                from: "odyssey-blueprint/callout@1",
                instanceId: "states.callout.nested",
                inputs: {
                  content: {
                    from: "odyssey-blueprint/paragraph@1",
                    instanceId: "states.callout.nested.paragraph",
                    inputs: {
                      text: "Password, Okta Verify and security question are all required for this policy.",
                    },
                  },
                  severity: "info",
                  title: "Required authenticators",
                },
              }}
            />
          </StoryCell>

          <StoryCell label="callout, role alert">
            <OdysseyBlueprintRenderer
              blueprint={{
                from: "odyssey-blueprint/callout@1",
                instanceId: "states.callout.roleAlert",
                inputs: {
                  role: "alert",
                  severity: "error",
                  text: "The policy could not be saved.",
                },
              }}
            />
          </StoryCell>
        </StoryGrid>
      </StorySection>
    );
  },
};
