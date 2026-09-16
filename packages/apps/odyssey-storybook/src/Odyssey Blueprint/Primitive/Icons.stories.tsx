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
import { iconNames } from "@okta/odyssey-react-mui/icon-names";

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
      from: "odyssey-blueprint/icon@1",
      instanceId: "playground.icon",
      inputs: {
        fontSize: "large",
        name: "Settings",
        titleAccess: "Settings",
      },
    },
  },
};

export default storybookMeta;

type Story = StoryObj<OdysseyBlueprintRendererProps>;

export const Playground: Story = {};

// One renderer per cell rather than one blueprint holding every glyph:
// `OdysseyBlueprintRenderer` takes a single root entry, and there is no container
// block yet to nest siblings under. Each entry needs its own `instanceId` because
// instance registration is keyed by it.
//
// The icon gallery is driven by Odyssey's own `iconNames` rather than a list copied
// into this file, so a glyph added to the set shows up here without an edit. A name
// Odyssey ships that `icon@1` has no entry for renders as an empty cell, which is
// exactly the drift worth seeing.
export const AllVariants: Story = {
  parameters: staticBoardParameters,
  render: function C() {
    return (
      <>
        <StorySection title="Every glyph in the Odyssey icon set, rendered through icon@1.">
          <StoryGrid columns={6}>
            {iconNames.map((iconName) => (
              <StoryCell key={iconName} label={iconName}>
                <OdysseyBlueprintRenderer
                  blueprint={{
                    from: "odyssey-blueprint/icon@1",
                    instanceId: `variants.icon.${iconName}`,
                    inputs: { name: iconName },
                  }}
                />
              </StoryCell>
            ))}
          </StoryGrid>
        </StorySection>

        <StorySection title="Every brand mark in the Odyssey logo set, rendered through logo@1.">
          <StoryGrid columns={6}>
            {(
              [
                "Duo",
                "GoogleAuth",
                "OktaVerify",
                "Persona",
                "SymantecVip",
                "Yubikey",
              ] as const
            ).map((logoName) => (
              <StoryCell key={logoName} label={logoName}>
                <OdysseyBlueprintRenderer
                  blueprint={{
                    from: "odyssey-blueprint/logo@1",
                    instanceId: `variants.logo.${logoName}`,
                    inputs: { fontSize: "large", name: logoName },
                  }}
                />
              </StoryCell>
            ))}
          </StoryGrid>
        </StorySection>
      </>
    );
  },
};

export const AllStates: Story = {
  parameters: staticBoardParameters,
  render: function C() {
    return (
      <StorySection title="Accessibility treatment and the fallback, across both blocks.">
        <StoryGrid columns={3}>
          <StoryCell label="icon, decorative">
            <OdysseyBlueprintRenderer
              blueprint={{
                from: "odyssey-blueprint/icon@1",
                instanceId: "states.icon.decorative",
                inputs: { fontSize: "large", name: "InformationCircle" },
              }}
            />
          </StoryCell>

          <StoryCell label="icon, meaningful">
            <OdysseyBlueprintRenderer
              blueprint={{
                from: "odyssey-blueprint/icon@1",
                instanceId: "states.icon.meaningful",
                inputs: {
                  fontSize: "large",
                  name: "InformationCircle",
                  titleAccess: "More information",
                },
              }}
            />
          </StoryCell>

          <StoryCell label="icon, own id">
            <OdysseyBlueprintRenderer
              blueprint={{
                from: "odyssey-blueprint/icon@1",
                instanceId: "states.icon.id",
                inputs: {
                  fontSize: "large",
                  id: "information-glyph",
                  name: "InformationCircle",
                  titleAccess: "More information",
                },
              }}
            />
          </StoryCell>

          <StoryCell label="icon, name outside the set">
            <OdysseyBlueprintRenderer
              blueprint={{
                from: "odyssey-blueprint/icon@1",
                instanceId: "states.icon.unknown",
                inputs: { fontSize: "large", name: "DefinitelyNotAnIcon" },
              }}
            />
          </StoryCell>

          <StoryCell label="logo, decorative">
            <OdysseyBlueprintRenderer
              blueprint={{
                from: "odyssey-blueprint/logo@1",
                instanceId: "states.logo.decorative",
                inputs: { fontSize: "large", name: "OktaVerify" },
              }}
            />
          </StoryCell>

          <StoryCell label="logo, meaningful">
            <OdysseyBlueprintRenderer
              blueprint={{
                from: "odyssey-blueprint/logo@1",
                instanceId: "states.logo.meaningful",
                inputs: {
                  fontSize: "large",
                  name: "OktaVerify",
                  titleAccess: "Okta Verify",
                },
              }}
            />
          </StoryCell>
        </StoryGrid>
      </StorySection>
    );
  },
};

export const AllSizes: Story = {
  parameters: staticBoardParameters,
  render: function C() {
    return (
      <StorySection title="Every fontSize, which is how Odyssey's theme sizes a glyph.">
        <StoryGrid columns={4}>
          {(["inherit", "small", "medium", "large"] as const).map(
            (fontSize) => (
              <StoryCell key={`icon-${fontSize}`} label={`icon, ${fontSize}`}>
                <OdysseyBlueprintRenderer
                  blueprint={{
                    from: "odyssey-blueprint/icon@1",
                    instanceId: `sizes.icon.${fontSize}`,
                    inputs: { fontSize, name: "Settings" },
                  }}
                />
              </StoryCell>
            ),
          )}

          {(["inherit", "small", "medium", "large"] as const).map(
            (fontSize) => (
              <StoryCell key={`logo-${fontSize}`} label={`logo, ${fontSize}`}>
                <OdysseyBlueprintRenderer
                  blueprint={{
                    from: "odyssey-blueprint/logo@1",
                    instanceId: `sizes.logo.${fontSize}`,
                    inputs: { fontSize, name: "Duo" },
                  }}
                />
              </StoryCell>
            ),
          )}
        </StoryGrid>
      </StorySection>
    );
  },
};
