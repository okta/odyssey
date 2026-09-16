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
import { densityValues } from "@okta/odyssey-react-mui";

import {
  staticBoardParameters,
  StoryCell,
  StoryGrid,
  StorySection,
} from "../../tools/boardStoryHelpers.js";
import { OdysseyBlueprintStorybookThemeDecorator } from "../../tools/OdysseyBlueprintStorybookThemeDecorator.js";

// The one fixture genuinely shared across every board cell. Extracting it keeps a
// dozen cells honest about showing the same data under different props, and the
// values are fixed so visual regression captures never drift.
const userColumns = [
  { accessorKey: "name", header: "Name", isSortable: true },
  { accessorKey: "role", header: "Role" },
  { accessorKey: "status", filterVariant: "select", header: "Status" },
];

const userRows = [
  { id: "user-1", name: "Ada Lovelace", role: "Admin", status: "Active" },
  { id: "user-2", name: "Grace Hopper", role: "Auditor", status: "Active" },
  { id: "user-3", name: "Alan Turing", role: "Read only", status: "Inactive" },
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
      from: "odyssey-blueprint/data-table@1",
      instanceId: "playground.table",
      inputs: {
        columns: [
          { accessorKey: "name", header: "Name", isSortable: true },
          { accessorKey: "role", header: "Role" },
        ],
        hasSorting: true,
        rows: [
          { id: "user-1", name: "Ada Lovelace", role: "Admin" },
          { id: "user-2", name: "Grace Hopper", role: "Auditor" },
        ],
      },
    },
  },
};

export default storybookMeta;

type Story = StoryObj<OdysseyBlueprintRendererProps>;

export const Playground: Story = {};

// One renderer per cell rather than one blueprint holding every table:
// `OdysseyBlueprintRenderer` takes a single root entry and rejects arrays, and
// there is no container block yet, so one blueprint cannot hold a whole board.
// Each entry needs its own `instanceId` because instance registration is keyed by
// it.
export const AllVariants: Story = {
  parameters: staticBoardParameters,
  render: function C() {
    return (
      <StorySection title="Every affordance the block exposes, over the same rows.">
        <StoryGrid columns={1}>
          <StoryCell label="columns and rows only">
            <OdysseyBlueprintRenderer
              blueprint={{
                from: "odyssey-blueprint/data-table@1",
                instanceId: "variants.plain",
                inputs: { columns: userColumns, rows: userRows },
              }}
            />
          </StoryCell>

          <StoryCell label="hasSearch, hasFilters, hasColumnVisibility">
            <OdysseyBlueprintRenderer
              blueprint={{
                from: "odyssey-blueprint/data-table@1",
                instanceId: "variants.controls",
                inputs: {
                  columns: userColumns,
                  filters: ["status"],
                  hasColumnVisibility: true,
                  hasFilters: true,
                  hasSearch: true,
                  rows: userRows,
                },
              }}
            />
          </StoryCell>

          <StoryCell label="hasRowSelection with a bulk action menu">
            <OdysseyBlueprintRenderer
              blueprint={{
                from: "odyssey-blueprint/data-table@1",
                instanceId: "variants.selection",
                inputs: {
                  bulkActionMenuItems: [
                    { actionId: "deactivate", label: "Deactivate" },
                    {
                      actionId: "delete",
                      label: "Delete",
                      variant: "destructive",
                    },
                  ],
                  columns: userColumns,
                  hasRowSelection: true,
                  rows: userRows,
                },
              }}
            />
          </StoryCell>

          <StoryCell label="rowActionButtons and rowActionMenuItems">
            <OdysseyBlueprintRenderer
              blueprint={{
                from: "odyssey-blueprint/data-table@1",
                instanceId: "variants.rowActions",
                inputs: {
                  columns: userColumns,
                  rowActionButtons: [{ actionId: "edit", label: "Edit" }],
                  rowActionMenuItems: [
                    { actionId: "deactivate", label: "Deactivate" },
                  ],
                  rows: userRows,
                },
              }}
            />
          </StoryCell>

          <StoryCell label="hasPagination with a total row count">
            <OdysseyBlueprintRenderer
              blueprint={{
                from: "odyssey-blueprint/data-table@1",
                instanceId: "variants.pagination",
                inputs: {
                  columns: userColumns,
                  hasPagination: true,
                  resultsPerPage: 2,
                  rows: userRows,
                  totalRows: 24,
                },
              }}
            />
          </StoryCell>

          <StoryCell label="detailPanel reading the expanded row">
            <OdysseyBlueprintRenderer
              blueprint={{
                from: "odyssey-blueprint/data-table@1",
                instanceId: "variants.detailPanel",
                inputs: {
                  columns: userColumns,
                  detailPanel: {
                    from: "odyssey-blueprint/data-table-empty-state@1",
                    // Derived from the row so two expanded rows stay distinct
                    // instances.
                    instanceId: {
                      format: {
                        template: "variants.detailPanel.{0}",
                        values: [{ iterator: { name: "row", path: ["id"] } }],
                      },
                    },
                    inputs: {
                      description: "Role and status come from the row.",
                      heading: { iterator: { name: "row", path: ["name"] } },
                    },
                  },
                  rows: userRows,
                },
              }}
            />
          </StoryCell>

          <StoryCell label="data-table-empty-state@1 on its own">
            <OdysseyBlueprintRenderer
              blueprint={{
                from: "odyssey-blueprint/data-table-empty-state@1",
                instanceId: "variants.emptyState",
                inputs: {
                  description: "Invite someone to get started.",
                  heading: "No users yet",
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
      <StorySection title="Every prop-driven state the block can be put into.">
        <StoryGrid columns={1}>
          <StoryCell label="errorMessage">
            <OdysseyBlueprintRenderer
              blueprint={{
                from: "odyssey-blueprint/data-table@1",
                instanceId: "states.error",
                inputs: {
                  columns: userColumns,
                  errorMessage: "We could not load users.",
                  rows: userRows,
                },
              }}
            />
          </StoryCell>

          <StoryCell label="no rows, with an emptyPlaceholder entry">
            <OdysseyBlueprintRenderer
              blueprint={{
                from: "odyssey-blueprint/data-table@1",
                instanceId: "states.empty",
                inputs: {
                  columns: userColumns,
                  emptyPlaceholder: {
                    from: "odyssey-blueprint/data-table-empty-state@1",
                    instanceId: "states.empty.placeholder",
                    inputs: {
                      description: "Invite someone to get started.",
                      heading: "No users yet",
                    },
                  },
                  rows: [],
                },
              }}
            />
          </StoryCell>

          <StoryCell label="no rows, with the default placeholder">
            <OdysseyBlueprintRenderer
              blueprint={{
                from: "odyssey-blueprint/data-table@1",
                instanceId: "states.emptyDefault",
                inputs: { columns: userColumns, rows: [] },
              }}
            />
          </StoryCell>

          <StoryCell label="defaultSelectedRowIds seeding two rows">
            <OdysseyBlueprintRenderer
              blueprint={{
                from: "odyssey-blueprint/data-table@1",
                instanceId: "states.seededSelection",
                inputs: {
                  columns: userColumns,
                  defaultSelectedRowIds: ["user-1", "user-3"],
                  hasRowSelection: true,
                  rows: userRows,
                },
              }}
            />
          </StoryCell>

          <StoryCell label="initialSearchValue seeding the search field">
            <OdysseyBlueprintRenderer
              blueprint={{
                from: "odyssey-blueprint/data-table@1",
                instanceId: "states.seededSearch",
                inputs: {
                  columns: userColumns,
                  hasSearch: true,
                  initialSearchValue: "Ada",
                  rows: userRows,
                  searchFieldLabel: "Search users",
                },
              }}
            />
          </StoryCell>

          <StoryCell label="loadMore pagination, next disabled">
            <OdysseyBlueprintRenderer
              blueprint={{
                from: "odyssey-blueprint/data-table@1",
                instanceId: "states.loadMoreDisabled",
                inputs: {
                  columns: userColumns,
                  hasPagination: true,
                  isPaginationMoreDisabled: true,
                  paginationType: "loadMore",
                  rows: userRows,
                },
              }}
            />
          </StoryCell>

          <StoryCell label="a disabled row action">
            <OdysseyBlueprintRenderer
              blueprint={{
                from: "odyssey-blueprint/data-table@1",
                instanceId: "states.disabledRowAction",
                inputs: {
                  columns: userColumns,
                  rowActionButtons: [
                    { actionId: "edit", isDisabled: true, label: "Edit" },
                  ],
                  rows: userRows,
                },
              }}
            />
          </StoryCell>
        </StoryGrid>
      </StorySection>
    );
  },
};

// Density is the block's size axis: `initialDensity` sets the row height and
// padding, and `hasChangeableDensity` lets the end user switch between them.
export const AllSizes: Story = {
  parameters: staticBoardParameters,
  render: function C() {
    return (
      <StorySection title="Every initialDensity Odyssey exports.">
        <StoryGrid columns={1}>
          {densityValues.map((densityValue) => (
            <StoryCell
              key={densityValue}
              label={`initialDensity ${densityValue}`}
            >
              <OdysseyBlueprintRenderer
                blueprint={{
                  from: "odyssey-blueprint/data-table@1",
                  instanceId: `sizes.${densityValue}`,
                  inputs: {
                    columns: userColumns,
                    hasChangeableDensity: true,
                    initialDensity: densityValue,
                    rows: userRows,
                  },
                }}
              />
            </StoryCell>
          ))}
        </StoryGrid>
      </StorySection>
    );
  },
};
