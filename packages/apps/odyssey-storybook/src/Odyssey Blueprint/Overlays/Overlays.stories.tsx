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

import { staticBoardParameters } from "../../tools/boardStoryHelpers.js";
import { OdysseyBlueprintStorybookThemeDecorator } from "../../tools/OdysseyBlueprintStorybookThemeDecorator.js";

// Backdrop overlays get one story per state rather than a multi-cell board. Every
// story here renders open, so a board would stack several full-viewport backdrops
// into one capture and show none of them clearly. The stacked-toast board lives in
// `Toasts.stories.tsx`, where a single `toast-stack@1` can hold every severity at
// once.
//
// Rendering open by default is deliberate: it is the state worth capturing, and no
// `play` function is needed to reach it. There is no trigger in these stories because
// master has no button block yet; `actions.open` is the channel a real page uses, and
// the browser tests cover it.
const storybookMeta: Meta<OdysseyBlueprintRendererProps> = {
  component: OdysseyBlueprintRenderer,
  decorators: [OdysseyBlueprintStorybookThemeDecorator],
  parameters: {
    layout: "padded",
  },
  tags: ["alpha"],
  args: {
    blueprint: {
      from: "odyssey-blueprint/dialog@1",
      instanceId: "playground.dialog",
      inputs: {
        content:
          "Description text explaining the consequences and any alternatives.",
        isDefaultOpen: true,
        title: "Delete app",
      },
    },
  },
};

export default storybookMeta;

type Story = StoryObj<OdysseyBlueprintRendererProps>;

export const Playground: Story = {};

export const DialogSecurityVariant: Story = {
  parameters: staticBoardParameters,
  args: {
    blueprint: {
      from: "odyssey-blueprint/dialog@1",
      instanceId: "variants.dialog.security",
      inputs: {
        content: "Re-enter your password to continue.",
        isDefaultOpen: true,
        title: "Verify it is you",
        variant: "security",
      },
    },
  },
};

export const DialogWithNestedContent: Story = {
  parameters: staticBoardParameters,
  args: {
    blueprint: {
      from: "odyssey-blueprint/dialog@1",
      instanceId: "variants.dialog.nested",
      inputs: {
        content: [
          "Type the app name to confirm.",
          {
            from: "odyssey-blueprint/text-field@1",
            instanceId: "variants.dialog.nested.name",
            inputs: { label: "App name", placeholder: "Okta Admin" },
          },
        ],
        isDefaultOpen: true,
        title: "Delete app",
      },
    },
  },
};

export const DrawerWithDividers: Story = {
  parameters: staticBoardParameters,
  args: {
    blueprint: {
      from: "odyssey-blueprint/drawer@1",
      instanceId: "variants.drawer.dividers",
      inputs: {
        // The pinned Odyssey `Drawer` passes `ariaLabel` straight to its close button
        // with no fallback, so every drawer sets one.
        ariaLabel: "Close app settings",
        content: {
          from: "odyssey-blueprint/text-field@1",
          instanceId: "variants.drawer.dividers.name",
          inputs: { hint: "Shown to end users", label: "Display name" },
        },
        hasDividers: true,
        isDefaultOpen: true,
        title: "App settings",
      },
    },
  },
};

export const DrawerPersistent: Story = {
  parameters: staticBoardParameters,
  args: {
    blueprint: {
      from: "odyssey-blueprint/drawer@1",
      instanceId: "variants.drawer.persistent",
      inputs: {
        ariaLabel: "Close activity",
        content:
          "The persistent variant sits beside the page, with no backdrop.",
        isDefaultOpen: true,
        title: "Activity",
        variant: "persistent",
      },
    },
  },
};

export const FullScreenOverlayContent: Story = {
  parameters: staticBoardParameters,
  args: {
    blueprint: {
      from: "odyssey-blueprint/full-screen-overlay@1",
      instanceId: "variants.fullScreenOverlay",
      inputs: {
        content: [
          "Content mounted into Odyssey's shared overlay root.",
          {
            from: "odyssey-blueprint/text-field@1",
            instanceId: "variants.fullScreenOverlay.search",
            inputs: { label: "Search" },
          },
        ],
        overlayType: "default",
      },
    },
  },
};
