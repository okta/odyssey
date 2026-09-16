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

// The one value shared across every board below. Rows are fixed literals rather
// than generated, so Applitools captures the same table on every run; anything
// derived from a clock or a random id would diff on its own.
const appRows = [
  { id: "verify", name: "Okta Verify", owner: "Platform", seats: 30 },
  { id: "salesforce", name: "Salesforce", owner: "Sales", seats: 120 },
  { id: "workday", name: "Workday", owner: "People", seats: 9 },
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
      from: "odyssey-blueprint/data-view@1",
      instanceId: "playground.view",
      inputs: {
        availableLayouts: ["table", "grid"],
        cardLayoutOptions: {
          cardTemplate: {
            descriptionKey: "owner",
            overlineKey: "id",
            titleKey: "name",
          },
        },
        hasRowSelection: true,
        hasSearch: true,
        initialLayout: "table",
        rowIdKey: "id",
        source: [
          { id: "verify", name: "Okta Verify", owner: "Platform", seats: 30 },
          { id: "salesforce", name: "Salesforce", owner: "Sales", seats: 120 },
          { id: "workday", name: "Workday", owner: "People", seats: 9 },
        ],
        tableLayoutOptions: {
          columns: [
            { header: "Application", id: "name" },
            { header: "Owner", id: "owner" },
            { hasSorting: true, header: "Seats", id: "seats" },
          ],
          hasSorting: true,
        },
      },
    },
  },
};

export default storybookMeta;

type Story = StoryObj<OdysseyBlueprintRendererProps>;

export const Playground: Story = {};

// One renderer per cell rather than one blueprint holding the board:
// `OdysseyBlueprintRenderer` takes a single root entry and rejects an array, and
// master has no container block yet. Each entry needs its own `instanceId` because
// instance registration is keyed by it.
export const AllVariants: Story = {
  parameters: staticBoardParameters,
  render: function C() {
    return (
      <StorySection title="Every block in the data view family, driven from the same rows.">
        <StoryGrid columns={1}>
          <StoryCell label="data-view@1, table layout">
            <OdysseyBlueprintRenderer
              blueprint={{
                from: "odyssey-blueprint/data-view@1",
                instanceId: "variants.view.table",
                inputs: {
                  availableLayouts: ["table"],
                  initialLayout: "table",
                  rowIdKey: "id",
                  source: appRows,
                  tableLayoutOptions: {
                    columns: [
                      { header: "Application", id: "name" },
                      { header: "Owner", id: "owner" },
                      { header: "Seats", id: "seats" },
                    ],
                  },
                },
              }}
            />
          </StoryCell>

          <StoryCell label="data-view@1, grid layout from a card template">
            <OdysseyBlueprintRenderer
              blueprint={{
                from: "odyssey-blueprint/data-view@1",
                instanceId: "variants.view.grid",
                inputs: {
                  availableLayouts: ["grid"],
                  cardLayoutOptions: {
                    cardTemplate: {
                      descriptionKey: "owner",
                      overlineKey: "id",
                      titleKey: "name",
                    },
                    maxGridColumns: 3,
                  },
                  initialLayout: "grid",
                  rowIdKey: "id",
                  source: appRows,
                },
              }}
            />
          </StoryCell>

          <StoryCell label="data-filters@1">
            <OdysseyBlueprintRenderer
              blueprint={{
                from: "odyssey-blueprint/data-filters@1",
                instanceId: "variants.filters",
                inputs: {
                  filters: [
                    {
                      id: "owner",
                      label: "Owner",
                      options: [
                        { label: "Platform", value: "Platform" },
                        { label: "Sales", value: "Sales" },
                      ],
                      variant: "select",
                    },
                  ],
                },
              }}
            />
          </StoryCell>

          <StoryCell label="data-card@1">
            <OdysseyBlueprintRenderer
              blueprint={{
                from: "odyssey-blueprint/data-card@1",
                instanceId: "variants.card",
                inputs: {
                  content: "Assigned to everyone in Engineering",
                  description: "Push notification authenticator",
                  overline: "Authenticator",
                  title: "Okta Verify",
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
  parameters: {
    ...staticBoardParameters,
    // material-react-table picks each loading skeleton's width from Math.random()
    // in a mount effect, so the "view, loading" cell draws different bar widths on
    // every capture and the board would report a diff forever. Ignoring only the
    // skeleton regions leaves the rest of the board pixel-strict.
    eyes: { ignoreRegions: [".MuiSkeleton-root"] },
  },
  render: function C() {
    return (
      <StorySection title="Every prop-driven state, across the blocks that support it.">
        <StoryGrid columns={1}>
          <StoryCell label="view, loading">
            <OdysseyBlueprintRenderer
              blueprint={{
                from: "odyssey-blueprint/data-view@1",
                instanceId: "states.view.loading",
                inputs: {
                  availableLayouts: ["table"],
                  initialLayout: "table",
                  isLoading: true,
                  source: appRows,
                  tableLayoutOptions: {
                    columns: [{ header: "Application", id: "name" }],
                  },
                },
              }}
            />
          </StoryCell>

          <StoryCell label="view, empty with a placeholder string">
            <OdysseyBlueprintRenderer
              blueprint={{
                from: "odyssey-blueprint/data-view@1",
                instanceId: "states.view.empty",
                inputs: {
                  availableLayouts: ["table"],
                  emptyPlaceholder: "No applications have been assigned yet",
                  initialLayout: "table",
                  isEmpty: true,
                  source: [],
                  tableLayoutOptions: {
                    columns: [{ header: "Application", id: "name" }],
                  },
                },
              }}
            />
          </StoryCell>

          <StoryCell label="view, error">
            <OdysseyBlueprintRenderer
              blueprint={{
                from: "odyssey-blueprint/data-view@1",
                instanceId: "states.view.error",
                inputs: {
                  availableLayouts: ["table"],
                  errorMessage: "Applications could not be loaded",
                  initialLayout: "table",
                  source: [],
                  tableLayoutOptions: {
                    columns: [{ header: "Application", id: "name" }],
                  },
                },
              }}
            />
          </StoryCell>

          <StoryCell label="view, selection seeded and metaText">
            <OdysseyBlueprintRenderer
              blueprint={{
                from: "odyssey-blueprint/data-view@1",
                instanceId: "states.view.selected",
                inputs: {
                  availableLayouts: ["table"],
                  hasRowSelection: true,
                  initialLayout: "table",
                  initialRowSelection: { salesforce: true },
                  metaText: "3 applications",
                  rowIdKey: "id",
                  source: appRows,
                  tableLayoutOptions: {
                    columns: [
                      { header: "Application", id: "name" },
                      { header: "Owner", id: "owner" },
                    ],
                  },
                },
              }}
            />
          </StoryCell>

          <StoryCell label="view, paginated two per page">
            <OdysseyBlueprintRenderer
              blueprint={{
                from: "odyssey-blueprint/data-view@1",
                instanceId: "states.view.paginated",
                inputs: {
                  availableLayouts: ["table"],
                  hasPagination: true,
                  hasRowCountLabel: true,
                  initialLayout: "table",
                  resultsPerPage: 2,
                  rowIdKey: "id",
                  source: appRows,
                  tableLayoutOptions: {
                    columns: [{ header: "Application", id: "name" }],
                  },
                },
              }}
            />
          </StoryCell>

          <StoryCell label="table, sortable and resizable columns">
            <OdysseyBlueprintRenderer
              blueprint={{
                from: "odyssey-blueprint/data-view@1",
                instanceId: "states.view.sortable",
                inputs: {
                  availableLayouts: ["table"],
                  source: appRows,
                  tableLayoutOptions: {
                    columns: [
                      { header: "Application", id: "name" },
                      { header: "Seats", id: "seats" },
                    ],
                    hasColumnResizing: true,
                    hasSorting: true,
                  },
                },
              }}
            />
          </StoryCell>

          <StoryCell label="filters, seeded search term">
            <OdysseyBlueprintRenderer
              blueprint={{
                from: "odyssey-blueprint/data-filters@1",
                instanceId: "states.filters.seeded",
                inputs: {
                  defaultSearchTerm: "Okta",
                  filters: [
                    {
                      id: "owner",
                      label: "Owner",
                      options: [{ label: "Platform", value: "Platform" }],
                      variant: "select",
                    },
                  ],
                },
              }}
            />
          </StoryCell>

          <StoryCell label="filters, disabled">
            <OdysseyBlueprintRenderer
              blueprint={{
                from: "odyssey-blueprint/data-filters@1",
                instanceId: "states.filters.disabled",
                inputs: {
                  isDisabled: true,
                  filters: [
                    {
                      id: "owner",
                      label: "Owner",
                      options: [{ label: "Platform", value: "Platform" }],
                      variant: "select",
                    },
                  ],
                },
              }}
            />
          </StoryCell>

          <StoryCell label="card, selectable and selected">
            <OdysseyBlueprintRenderer
              blueprint={{
                from: "odyssey-blueprint/data-card@1",
                instanceId: "states.card.selected",
                inputs: {
                  description: "Push notification authenticator",
                  hasSelection: true,
                  isSelected: true,
                  overline: "Authenticator",
                  title: "Okta Verify",
                },
              }}
            />
          </StoryCell>

          <StoryCell label="card, body from a nested blueprint entry">
            <OdysseyBlueprintRenderer
              blueprint={{
                from: "odyssey-blueprint/data-card@1",
                instanceId: "states.card.nested",
                inputs: {
                  content: {
                    from: "odyssey-blueprint/text-field@1",
                    instanceId: "states.card.nested.note",
                    inputs: {
                      defaultValue: "Reviewed",
                      isOptional: true,
                      label: "Access note",
                    },
                  },
                  title: "Salesforce",
                },
              }}
            />
          </StoryCell>
        </StoryGrid>
      </StorySection>
    );
  },
};
