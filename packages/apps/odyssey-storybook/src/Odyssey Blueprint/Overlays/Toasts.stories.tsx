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

// Toasts render visible rather than behind a `play` function, and `autoHideDuration`
// is set long enough that the capture is not a race against the hide timer.
const storybookMeta: Meta<OdysseyBlueprintRendererProps> = {
  component: OdysseyBlueprintRenderer,
  decorators: [OdysseyBlueprintStorybookThemeDecorator],
  parameters: {
    layout: "padded",
  },
  tags: ["alpha"],
  args: {
    blueprint: {
      from: "odyssey-blueprint/toast@1",
      instanceId: "playground.toast",
      inputs: {
        autoHideDuration: 600000,
        isDefaultVisible: true,
        message: "App saved",
        role: "status",
        severity: "success",
      },
    },
  },
};

export default storybookMeta;

type Story = StoryObj<OdysseyBlueprintRendererProps>;

export const Playground: Story = {};

// The family's one true board: `toast-stack@1` is built to hold several toasts at
// once, so every severity fits in a single capture. Each nested entry needs its own
// `instanceId`, because instance registration is keyed by it.
export const AllVariants: Story = {
  parameters: staticBoardParameters,
  args: {
    blueprint: {
      from: "odyssey-blueprint/toast-stack@1",
      instanceId: "variants.toasts",
      inputs: {
        content: [
          {
            from: "odyssey-blueprint/toast@1",
            instanceId: "variants.toasts.success",
            inputs: {
              autoHideDuration: 600000,
              isDefaultVisible: true,
              message: "App saved",
              role: "status",
              severity: "success",
            },
          },
          {
            from: "odyssey-blueprint/toast@1",
            instanceId: "variants.toasts.info",
            inputs: {
              autoHideDuration: 600000,
              isDefaultVisible: true,
              message: "Provisioning is queued",
              role: "status",
              severity: "info",
            },
          },
          {
            from: "odyssey-blueprint/toast@1",
            instanceId: "variants.toasts.warning",
            inputs: {
              autoHideDuration: 600000,
              isDefaultVisible: true,
              message: "Two assignments were skipped",
              role: "status",
              severity: "warning",
            },
          },
          {
            from: "odyssey-blueprint/toast@1",
            instanceId: "variants.toasts.error",
            inputs: {
              autoHideDuration: 600000,
              isDefaultVisible: true,
              message: "Could not save the app",
              role: "alert",
              severity: "error",
            },
          },
        ],
      },
    },
  },
};

export const AllStates: Story = {
  parameters: staticBoardParameters,
  args: {
    blueprint: {
      from: "odyssey-blueprint/toast-stack@1",
      instanceId: "states.toasts",
      inputs: {
        content: [
          {
            from: "odyssey-blueprint/toast@1",
            instanceId: "states.toasts.dismissable",
            inputs: {
              autoHideDuration: 600000,
              isDefaultVisible: true,
              isDismissable: true,
              message: "Dismissable, so it waits for the user",
              role: "status",
              severity: "info",
            },
          },
          {
            from: "odyssey-blueprint/toast@1",
            instanceId: "states.toasts.link",
            inputs: {
              autoHideDuration: 600000,
              isDefaultVisible: true,
              linkText: "View app",
              linkUrl: "https://www.okta.com/",
              message: "App created",
              role: "status",
              severity: "success",
            },
          },
        ],
      },
    },
  },
};

// A stack driven from data rather than an enumerated list: the `each:` form expands
// one toast per source row, and a `join:` operator derives a distinct `instanceId`
// for each.
export const DataDrivenStack: Story = {
  parameters: staticBoardParameters,
  args: {
    blueprint: {
      from: "odyssey-blueprint/toast-stack@1",
      instanceId: "states.dataDriven",
      inputs: {
        content: {
          as: "notification",
          each: [
            { key: "directory", message: "Could not reach the directory" },
            { key: "save", message: "Could not save the app" },
          ],
          entry: {
            from: "odyssey-blueprint/toast@1",
            instanceId: {
              join: {
                values: [
                  "states.dataDriven.",
                  { iterator: { name: "notification", path: ["key"] } },
                ],
              },
            },
            inputs: {
              autoHideDuration: 600000,
              isDefaultVisible: true,
              message: {
                iterator: { name: "notification", path: ["message"] },
              },
              role: "alert",
              severity: "error",
            },
          },
        },
      },
    },
  },
};
