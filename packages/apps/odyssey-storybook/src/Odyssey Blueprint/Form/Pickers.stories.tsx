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
  StoryFilledWidth,
  StoryGrid,
  StorySection,
} from "../../tools/boardStoryHelpers.js";
import { OdysseyBlueprintStorybookThemeDecorator } from "../../tools/OdysseyBlueprintStorybookThemeDecorator.js";

// Shared by every board below, which is what earns the extraction: the boards
// vary the inputs around the option list, not the list itself. Anything used by a
// single story stays inline so Storybook's Code tab shows a copy-pasteable
// blueprint.
const regionOptions = [
  { description: "Northern Virginia", label: "US East", value: "us-east" },
  { description: "Oregon", label: "US West", value: "us-west" },
  { description: "Ireland", label: "EU West", value: "eu-west" },
];

// Inline SVG data URIs rather than hosted logos: an option adornment is an image
// source, and a board that fetches one over the network would capture a broken
// image whenever the request fails, making the visual snapshot nondeterministic.
const buildSquareAdornment = ({ fillColor }: { fillColor: string }) =>
  `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16'%3E%3Crect width='16' height='16' rx='3' fill='%23${fillColor}'/%3E%3C/svg%3E`;

const appOptions = [
  {
    adornment: buildSquareAdornment({ fillColor: "1662DD" }),
    description: "Identity and access management",
    label: "Okta",
    value: "okta",
  },
  {
    adornment: buildSquareAdornment({ fillColor: "6B7C93" }),
    description: "Customer relationship management",
    label: "Salesforce",
    value: "salesforce",
  },
];

const storybookMeta: Meta<OdysseyBlueprintRendererProps> = {
  component: OdysseyBlueprintRenderer,
  decorators: [OdysseyBlueprintStorybookThemeDecorator],
  parameters: {
    layout: "padded",
  },
  tags: ["autodocs", "alpha"],
  args: {
    blueprint: {
      from: "odyssey-blueprint/picker@1",
      instanceId: "playground.picker",
      inputs: {
        hint: "Where your data is stored",
        label: "Region",
        options: regionOptions,
      },
    },
  },
};

export default storybookMeta;

type Story = StoryObj<OdysseyBlueprintRendererProps>;

export const Playground: Story = {};

// One renderer per cell rather than one blueprint holding every picker:
// `OdysseyBlueprintRenderer` takes a single root entry, and there is no container
// block yet to nest siblings under. Each entry needs its own `instanceId` because
// instance registration is keyed by it.
export const AllVariants: Story = {
  parameters: staticBoardParameters,
  render: function C() {
    return (
      <StorySection title="Every picker block, seeded with a representative selection.">
        <StoryGrid columns={2}>
          <StoryCell label="picker@1">
            <StoryFilledWidth>
              <OdysseyBlueprintRenderer
                blueprint={{
                  from: "odyssey-blueprint/picker@1",
                  instanceId: "variants.picker",
                  inputs: {
                    defaultValue: "eu-west",
                    label: "Region",
                    options: regionOptions,
                  },
                }}
              />
            </StoryFilledWidth>
          </StoryCell>

          <StoryCell label="picker-with-option-adornment@1">
            <StoryFilledWidth>
              <OdysseyBlueprintRenderer
                blueprint={{
                  from: "odyssey-blueprint/picker-with-option-adornment@1",
                  instanceId: "variants.pickerWithOptionAdornment",
                  inputs: {
                    defaultValue: "okta",
                    label: "App",
                    options: appOptions,
                  },
                }}
              />
            </StoryFilledWidth>
          </StoryCell>

          <StoryCell label="search-dropdown@1">
            <StoryFilledWidth>
              <OdysseyBlueprintRenderer
                blueprint={{
                  from: "odyssey-blueprint/search-dropdown@1",
                  instanceId: "variants.searchDropdown",
                  inputs: {
                    label: "Search apps",
                    options: appOptions,
                  },
                }}
              />
            </StoryFilledWidth>
          </StoryCell>

          <StoryCell label="composable-picker@1">
            <StoryFilledWidth>
              <OdysseyBlueprintRenderer
                blueprint={{
                  from: "odyssey-blueprint/composable-picker@1",
                  instanceId: "variants.composablePicker",
                  inputs: {
                    defaultValue: "us-east",
                    label: "Region",
                    optionLayout: "labelOnly",
                    options: regionOptions,
                  },
                }}
              />
            </StoryFilledWidth>
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
          <StoryCell label="picker, optional">
            <StoryFilledWidth>
              <OdysseyBlueprintRenderer
                blueprint={{
                  from: "odyssey-blueprint/picker@1",
                  instanceId: "states.picker.optional",
                  inputs: {
                    isOptional: true,
                    label: "Region",
                    options: regionOptions,
                  },
                }}
              />
            </StoryFilledWidth>
          </StoryCell>

          <StoryCell label="picker, hint">
            <StoryFilledWidth>
              <OdysseyBlueprintRenderer
                blueprint={{
                  from: "odyssey-blueprint/picker@1",
                  instanceId: "states.picker.hint",
                  inputs: {
                    hint: "Where your data is stored",
                    label: "Region",
                    options: regionOptions,
                  },
                }}
              />
            </StoryFilledWidth>
          </StoryCell>

          <StoryCell label="picker, disabled">
            <StoryFilledWidth>
              <OdysseyBlueprintRenderer
                blueprint={{
                  from: "odyssey-blueprint/picker@1",
                  instanceId: "states.picker.disabled",
                  inputs: {
                    defaultValue: "eu-west",
                    isDisabled: true,
                    label: "Region",
                    options: regionOptions,
                  },
                }}
              />
            </StoryFilledWidth>
          </StoryCell>

          <StoryCell label="picker, read-only">
            <StoryFilledWidth>
              <OdysseyBlueprintRenderer
                blueprint={{
                  from: "odyssey-blueprint/picker@1",
                  instanceId: "states.picker.readOnly",
                  inputs: {
                    defaultValue: "eu-west",
                    isReadOnly: true,
                    label: "Region",
                    options: regionOptions,
                  },
                }}
              />
            </StoryFilledWidth>
          </StoryCell>

          <StoryCell label="picker, loading">
            <StoryFilledWidth>
              <OdysseyBlueprintRenderer
                blueprint={{
                  from: "odyssey-blueprint/picker@1",
                  instanceId: "states.picker.loading",
                  inputs: {
                    isLoading: true,
                    label: "Region",
                    options: [],
                  },
                }}
              />
            </StoryFilledWidth>
          </StoryCell>

          <StoryCell label="picker, error">
            <StoryFilledWidth>
              <OdysseyBlueprintRenderer
                blueprint={{
                  from: "odyssey-blueprint/picker@1",
                  instanceId: "states.picker.error",
                  inputs: {
                    errorMessage: "Choose a region",
                    label: "Region",
                    options: regionOptions,
                  },
                }}
              />
            </StoryFilledWidth>
          </StoryCell>

          <StoryCell label="picker, errors list">
            <StoryFilledWidth>
              <OdysseyBlueprintRenderer
                blueprint={{
                  from: "odyssey-blueprint/picker@1",
                  instanceId: "states.picker.errorsList",
                  inputs: {
                    errorMessage: "Fix the following",
                    errorMessageList: [
                      "Region is required",
                      "Must be a live region",
                    ],
                    label: "Region",
                    options: regionOptions,
                  },
                }}
              />
            </StoryFilledWidth>
          </StoryCell>

          <StoryCell label="picker, multiple choices">
            <StoryFilledWidth>
              <OdysseyBlueprintRenderer
                blueprint={{
                  from: "odyssey-blueprint/picker@1",
                  instanceId: "states.picker.multiple",
                  inputs: {
                    defaultValue: ["us-east", "eu-west"],
                    hasMultipleChoices: true,
                    label: "Regions",
                    options: regionOptions,
                  },
                }}
              />
            </StoryFilledWidth>
          </StoryCell>

          <StoryCell label="picker, grouped options">
            <StoryFilledWidth>
              <OdysseyBlueprintRenderer
                blueprint={{
                  from: "odyssey-blueprint/picker@1",
                  instanceId: "states.picker.grouped",
                  inputs: {
                    hasGroupedOptions: true,
                    label: "Region",
                    options: [
                      {
                        group: "Americas",
                        label: "US East",
                        value: "us-east",
                      },
                      {
                        group: "Americas",
                        label: "US West",
                        value: "us-west",
                      },
                      { group: "Europe", label: "EU West", value: "eu-west" },
                    ],
                  },
                }}
              />
            </StoryFilledWidth>
          </StoryCell>

          <StoryCell label="adornment picker, multiple choices">
            <StoryFilledWidth>
              <OdysseyBlueprintRenderer
                blueprint={{
                  from: "odyssey-blueprint/picker-with-option-adornment@1",
                  instanceId: "states.adornment.multiple",
                  inputs: {
                    defaultValue: ["okta", "salesforce"],
                    hasMultipleChoices: true,
                    label: "Apps",
                    options: appOptions,
                  },
                }}
              />
            </StoryFilledWidth>
          </StoryCell>

          <StoryCell label="adornment picker, large adornments">
            <StoryFilledWidth>
              <OdysseyBlueprintRenderer
                blueprint={{
                  from: "odyssey-blueprint/picker-with-option-adornment@1",
                  instanceId: "states.adornment.large",
                  inputs: {
                    adornmentSize: "large",
                    label: "App",
                    options: appOptions,
                  },
                }}
              />
            </StoryFilledWidth>
          </StoryCell>

          <StoryCell label="adornment picker, error">
            <StoryFilledWidth>
              <OdysseyBlueprintRenderer
                blueprint={{
                  from: "odyssey-blueprint/picker-with-option-adornment@1",
                  instanceId: "states.adornment.error",
                  inputs: {
                    errorMessage: "Choose an app",
                    label: "App",
                    options: appOptions,
                  },
                }}
              />
            </StoryFilledWidth>
          </StoryCell>

          <StoryCell label="search dropdown, seeded">
            <StoryFilledWidth>
              <OdysseyBlueprintRenderer
                blueprint={{
                  from: "odyssey-blueprint/search-dropdown@1",
                  instanceId: "states.search.seeded",
                  inputs: {
                    defaultValue: "okta",
                    label: "Search apps",
                    options: appOptions,
                  },
                }}
              />
            </StoryFilledWidth>
          </StoryCell>

          <StoryCell label="search dropdown, disabled">
            <StoryFilledWidth>
              <OdysseyBlueprintRenderer
                blueprint={{
                  from: "odyssey-blueprint/search-dropdown@1",
                  instanceId: "states.search.disabled",
                  inputs: {
                    isDisabled: true,
                    label: "Search apps",
                    options: appOptions,
                  },
                }}
              />
            </StoryFilledWidth>
          </StoryCell>

          <StoryCell label="search dropdown, error">
            <StoryFilledWidth>
              <OdysseyBlueprintRenderer
                blueprint={{
                  from: "odyssey-blueprint/search-dropdown@1",
                  instanceId: "states.search.error",
                  inputs: {
                    errorMessage: "Search is unavailable",
                    label: "Search apps",
                    options: appOptions,
                  },
                }}
              />
            </StoryFilledWidth>
          </StoryCell>

          <StoryCell label="composable picker, label only">
            <StoryFilledWidth>
              <OdysseyBlueprintRenderer
                blueprint={{
                  from: "odyssey-blueprint/composable-picker@1",
                  instanceId: "states.composable.labelOnly",
                  inputs: {
                    label: "Region",
                    optionLayout: "labelOnly",
                    options: regionOptions,
                  },
                }}
              />
            </StoryFilledWidth>
          </StoryCell>

          <StoryCell label="composable picker, label and description">
            <StoryFilledWidth>
              <OdysseyBlueprintRenderer
                blueprint={{
                  from: "odyssey-blueprint/composable-picker@1",
                  instanceId: "states.composable.labelDescription",
                  inputs: {
                    label: "Region",
                    optionLayout: "labelDescription",
                    options: regionOptions,
                  },
                }}
              />
            </StoryFilledWidth>
          </StoryCell>

          <StoryCell label="composable picker, custom values allowed">
            <StoryFilledWidth>
              <OdysseyBlueprintRenderer
                blueprint={{
                  from: "odyssey-blueprint/composable-picker@1",
                  instanceId: "states.composable.customValue",
                  inputs: {
                    isCustomValueAllowed: true,
                    label: "Region",
                    options: regionOptions,
                  },
                }}
              />
            </StoryFilledWidth>
          </StoryCell>
        </StoryGrid>
      </StorySection>
    );
  },
};
