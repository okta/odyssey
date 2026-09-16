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

// `screen-reader-text@1` renders nothing a sighted reviewer can see: Odyssey
// clips it out of the layout while leaving it in the accessibility tree. Every
// board below therefore pairs it with visible content, so a cell is never a blank
// square and the announcement has something to describe.
const storybookMeta: Meta<OdysseyBlueprintRendererProps> = {
  component: OdysseyBlueprintRenderer,
  decorators: [OdysseyBlueprintStorybookThemeDecorator],
  parameters: {
    layout: "padded",
  },
  tags: ["autodocs", "alpha"],
  args: {
    blueprint: {
      from: "odyssey-blueprint/form@1",
      instanceId: "playground.screenReaderText.form",
      inputs: {
        content: [
          {
            from: "odyssey-blueprint/screen-reader-text@1",
            instanceId: "playground.screenReaderText",
            inputs: { text: "Sorted by last sign-in, descending" },
          },
          {
            from: "odyssey-blueprint/search-field@1",
            instanceId: "playground.screenReaderText.search",
            inputs: {
              ariaDescribedBy: "playground.screenReaderText",
              label: "Search users",
            },
          },
        ],
        name: "playground-screen-reader-text",
        title: "The announcement above this field is visually hidden",
      },
    },
  },
};

export default storybookMeta;

type Story = StoryObj<OdysseyBlueprintRendererProps>;

export const Playground: Story = {};

export const AllVariants: Story = {
  parameters: staticBoardParameters,
  render: function C() {
    return (
      <StorySection title="A literal announcement and one resolved from a sibling entry's output.">
        <StoryGrid columns={1}>
          <StoryCell label="literal text, referenced by a field's ariaDescribedBy">
            <OdysseyBlueprintRenderer
              blueprint={{
                from: "odyssey-blueprint/form@1",
                instanceId: "variants.screenReaderText.literal.form",
                inputs: {
                  content: [
                    {
                      from: "odyssey-blueprint/screen-reader-text@1",
                      instanceId: "variants.screenReaderText.literal",
                      inputs: {
                        id: "user-search-description",
                        text: "Results update as you type",
                      },
                    },
                    {
                      from: "odyssey-blueprint/search-field@1",
                      instanceId: "variants.screenReaderText.literal.search",
                      inputs: {
                        ariaDescribedBy: "user-search-description",
                        label: "Search users",
                      },
                    },
                  ],
                  name: "variants-screen-reader-text-literal",
                },
              }}
            />
          </StoryCell>

          <StoryCell label="text bound to a sibling field's value">
            <OdysseyBlueprintRenderer
              blueprint={{
                from: "odyssey-blueprint/form@1",
                instanceId: "variants.screenReaderText.bound.form",
                inputs: {
                  content: [
                    {
                      from: "odyssey-blueprint/text-field@1",
                      instanceId: "variants.screenReaderText.bound.filter",
                      inputs: {
                        defaultValue: "Engineering",
                        hint: "The hidden announcement mirrors whatever you type",
                        label: "Filter by group",
                      },
                    },
                    {
                      from: "odyssey-blueprint/screen-reader-text@1",
                      instanceId: "variants.screenReaderText.bound",
                      inputs: {
                        text: {
                          instance: {
                            id: "variants.screenReaderText.bound.filter",
                            name: "value",
                            port: "outputs",
                          },
                        },
                      },
                    },
                  ],
                  name: "variants-screen-reader-text-bound",
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
      <StorySection title="The two attributes that change how the announcement is treated.">
        <StoryGrid columns={2}>
          <StoryCell label="ariaHidden, withheld from assistive technology too">
            <OdysseyBlueprintRenderer
              blueprint={{
                from: "odyssey-blueprint/form@1",
                instanceId: "states.screenReaderText.hidden.form",
                inputs: {
                  content: [
                    {
                      from: "odyssey-blueprint/screen-reader-text@1",
                      instanceId: "states.screenReaderText.hidden",
                      inputs: {
                        ariaHidden: true,
                        text: "Announced to nobody",
                      },
                    },
                    {
                      from: "odyssey-blueprint/text-field@1",
                      instanceId: "states.screenReaderText.hidden.field",
                      inputs: { label: "Display name" },
                    },
                  ],
                  name: "states-screen-reader-text-hidden",
                },
              }}
            />
          </StoryCell>

          <StoryCell label="translate off, left in the authored language">
            <OdysseyBlueprintRenderer
              blueprint={{
                from: "odyssey-blueprint/form@1",
                instanceId: "states.screenReaderText.untranslated.form",
                inputs: {
                  content: [
                    {
                      from: "odyssey-blueprint/screen-reader-text@1",
                      instanceId: "states.screenReaderText.untranslated",
                      inputs: {
                        text: "SAML 2.0",
                        translate: "no",
                      },
                    },
                    {
                      from: "odyssey-blueprint/text-field@1",
                      instanceId: "states.screenReaderText.untranslated.field",
                      inputs: { label: "Protocol" },
                    },
                  ],
                  name: "states-screen-reader-text-untranslated",
                },
              }}
            />
          </StoryCell>
        </StoryGrid>
      </StorySection>
    );
  },
};
