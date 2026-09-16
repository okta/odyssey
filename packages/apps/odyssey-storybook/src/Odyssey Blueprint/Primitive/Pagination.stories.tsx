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
      from: "odyssey-blueprint/pagination@1",
      instanceId: "playground.pagination",
      inputs: {
        currentRowsCount: 25,
        defaultPageSize: 25,
        totalRows: 500,
        variant: "paged",
      },
    },
  },
};

export default storybookMeta;

type Story = StoryObj<OdysseyBlueprintRendererProps>;

export const Playground: Story = {};

// One renderer per cell rather than one blueprint holding both variants:
// `OdysseyBlueprintRenderer` takes a single root entry, and there is no container
// block yet to nest siblings under. Each entry needs its own `instanceId` because
// instance registration is keyed by it. One cell per row throughout, because the
// paged variant spreads its row-count segment and its controls across the full
// width of whatever contains it.
export const AllVariants: Story = {
  parameters: staticBoardParameters,
  render: function C() {
    return (
      <StorySection title="Both pagination types, over the same 500 rows.">
        <StoryGrid columns={1}>
          <StoryCell label='variant: "paged"'>
            <OdysseyBlueprintRenderer
              blueprint={{
                from: "odyssey-blueprint/pagination@1",
                instanceId: "variants.paged",
                inputs: {
                  currentRowsCount: 25,
                  defaultPageSize: 25,
                  totalRows: 500,
                  variant: "paged",
                },
              }}
            />
          </StoryCell>

          <StoryCell label='variant: "loadMore"'>
            <OdysseyBlueprintRenderer
              blueprint={{
                from: "odyssey-blueprint/pagination@1",
                instanceId: "variants.loadMore",
                inputs: {
                  currentRowsCount: 25,
                  defaultPageSize: 25,
                  totalRows: 500,
                  variant: "loadMore",
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
      <StorySection title="Every prop-driven state, seeded so the row range is stable.">
        <StoryGrid columns={1}>
          <StoryCell label="seeded page 3 of 20">
            <OdysseyBlueprintRenderer
              blueprint={{
                from: "odyssey-blueprint/pagination@1",
                instanceId: "states.seededPage",
                inputs: {
                  currentRowsCount: 25,
                  defaultPageIndex: 3,
                  defaultPageSize: 25,
                  totalRows: 500,
                  variant: "paged",
                },
              }}
            />
          </StoryCell>

          <StoryCell label="row count without a total">
            <OdysseyBlueprintRenderer
              blueprint={{
                from: "odyssey-blueprint/pagination@1",
                instanceId: "states.noTotal",
                inputs: {
                  currentRowsCount: 25,
                  defaultPageSize: 25,
                  variant: "paged",
                },
              }}
            />
          </StoryCell>

          <StoryCell label="hasPageInput: false">
            <OdysseyBlueprintRenderer
              blueprint={{
                from: "odyssey-blueprint/pagination@1",
                instanceId: "states.noPageInput",
                inputs: {
                  currentRowsCount: 25,
                  defaultPageSize: 25,
                  hasPageInput: false,
                  totalRows: 500,
                  variant: "paged",
                },
              }}
            />
          </StoryCell>

          <StoryCell label="hasRowCountInput: false">
            <OdysseyBlueprintRenderer
              blueprint={{
                from: "odyssey-blueprint/pagination@1",
                instanceId: "states.noRowCountInput",
                inputs: {
                  currentRowsCount: 25,
                  defaultPageSize: 25,
                  hasRowCountInput: false,
                  totalRows: 500,
                  variant: "paged",
                },
              }}
            />
          </StoryCell>

          <StoryCell label="hasRowCountLabel: false">
            <OdysseyBlueprintRenderer
              blueprint={{
                from: "odyssey-blueprint/pagination@1",
                instanceId: "states.noRowCountLabel",
                inputs: {
                  currentRowsCount: 25,
                  defaultPageSize: 25,
                  hasRowCountLabel: false,
                  totalRows: 500,
                  variant: "paged",
                },
              }}
            />
          </StoryCell>

          <StoryCell label="isDisabled: true">
            <OdysseyBlueprintRenderer
              blueprint={{
                from: "odyssey-blueprint/pagination@1",
                instanceId: "states.disabled",
                inputs: {
                  currentRowsCount: 25,
                  defaultPageIndex: 2,
                  defaultPageSize: 25,
                  isDisabled: true,
                  totalRows: 500,
                  variant: "paged",
                },
              }}
            />
          </StoryCell>

          <StoryCell label="isMoreDisabled: true, on the last page">
            <OdysseyBlueprintRenderer
              blueprint={{
                from: "odyssey-blueprint/pagination@1",
                instanceId: "states.moreDisabled",
                inputs: {
                  currentRowsCount: 25,
                  defaultPageIndex: 20,
                  defaultPageSize: 25,
                  isMoreDisabled: true,
                  lastRow: 500,
                  totalRows: 500,
                  variant: "paged",
                },
              }}
            />
          </StoryCell>

          <StoryCell label="capped by maxPageIndex and maxPageSize">
            <OdysseyBlueprintRenderer
              blueprint={{
                from: "odyssey-blueprint/pagination@1",
                instanceId: "states.capped",
                inputs: {
                  currentRowsCount: 25,
                  defaultPageSize: 25,
                  maxPageIndex: 20,
                  maxPageSize: 100,
                  totalRows: 500,
                  variant: "paged",
                },
              }}
            />
          </StoryCell>

          <StoryCell label="overridden labels">
            <OdysseyBlueprintRenderer
              blueprint={{
                from: "odyssey-blueprint/pagination@1",
                instanceId: "states.labels",
                inputs: {
                  currentPageLabel: "Sheet",
                  currentRowsCount: 25,
                  defaultPageSize: 25,
                  nextLabel: "Later users",
                  previousLabel: "Earlier users",
                  rowsPerPageLabel: "Users per sheet",
                  totalRows: 500,
                  variant: "paged",
                },
              }}
            />
          </StoryCell>

          <StoryCell label="loadMore with an overridden label">
            <OdysseyBlueprintRenderer
              blueprint={{
                from: "odyssey-blueprint/pagination@1",
                instanceId: "states.loadMoreLabel",
                inputs: {
                  currentRowsCount: 25,
                  defaultPageSize: 25,
                  loadMoreLabel: "Load 25 more users",
                  totalRows: 500,
                  variant: "loadMore",
                },
              }}
            />
          </StoryCell>

          <StoryCell label="loadMore exhausted">
            <OdysseyBlueprintRenderer
              blueprint={{
                from: "odyssey-blueprint/pagination@1",
                instanceId: "states.loadMoreExhausted",
                inputs: {
                  currentRowsCount: 25,
                  defaultPageSize: 25,
                  isMoreDisabled: true,
                  totalRows: 500,
                  variant: "loadMore",
                },
              }}
            />
          </StoryCell>
        </StoryGrid>
      </StorySection>
    );
  },
};
