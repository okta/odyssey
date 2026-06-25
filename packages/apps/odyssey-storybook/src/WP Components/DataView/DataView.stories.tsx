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
  type DataLayout,
  DataView,
  type TableLayoutProps,
} from "@okta/odyssey-contributions-wp-components";
import { type DataGetDataType } from "@okta/odyssey-react-mui/labs";
import { useCallback, useMemo } from "react";
import { userEvent, within } from "storybook/test";

import { filterData } from "../../Odyssey Core/Data Visualizations/DataView/dataFunctions.js";
import {
  type Person,
  columns as personColumns,
  data as personData,
} from "../../Odyssey Core/Data Visualizations/DataView/personData.js";
import { OdysseyStorybookThemeDecorator } from "../../tools/OdysseyStorybookThemeDecorator.js";
import { WpComponentsStorybookThemeDecorator } from "../../tools/WpComponentsStorybookThemeDecorator.js";

const tableLayoutOnly: DataLayout[] = ["table"];

const meta = {
  component: DataView,
  decorators: [
    OdysseyStorybookThemeDecorator,
    WpComponentsStorybookThemeDecorator,
  ],
  tags: ["autodocs"],
  argTypes: {
    getData: {
      table: { type: { summary: "" } },
    },
    hasRowSelection: { control: "boolean" },
    hasBulkSelectionButtons: { control: "boolean" },
    hasPagination: { control: "boolean" },
  },
} satisfies Meta<typeof DataView>;

export default meta;

type Story = StoryObj<typeof DataView>;

export const Default: Story = {
  render: function C() {
    const getData = useCallback(
      (props: DataGetDataType) => filterData({ data: personData, ...props }),
      [],
    );

    const tableLayoutOptions = useMemo<TableLayoutProps<Person>>(
      () => ({ columns: personColumns }),
      [],
    );

    return (
      <DataView<Person>
        availableLayouts={tableLayoutOnly}
        getData={getData}
        tableLayoutOptions={tableLayoutOptions}
      />
    );
  },
};

export const RowSelection: Story = {
  args: {
    hasBulkSelectionButtons: true,
    hasRowSelection: true,
  },
  render: function C(args) {
    const getData = useCallback(
      (props: DataGetDataType) => filterData({ data: personData, ...props }),
      [],
    );

    const tableLayoutOptions = useMemo<TableLayoutProps<Person>>(
      () => ({ columns: personColumns }),
      [],
    );

    return (
      <DataView<Person>
        availableLayouts={tableLayoutOnly}
        getData={getData}
        hasBulkSelectionButtons={args.hasBulkSelectionButtons}
        hasRowSelection={args.hasRowSelection}
        tableLayoutOptions={tableLayoutOptions}
      />
    );
  },
  parameters: {
    docs: {
      description: {
        story:
          "Row selection with the default bulk-selection toolbar — Select all, Select none, and the selected-count actions menu.",
      },
    },
  },
};

export const RowSelectionWithoutBulkButtons: Story = {
  args: {
    hasBulkSelectionButtons: false,
    hasRowSelection: true,
  },
  render: function C(args) {
    const getData = useCallback(
      (props: DataGetDataType) => filterData({ data: personData, ...props }),
      [],
    );

    const tableLayoutOptions = useMemo<TableLayoutProps<Person>>(
      () => ({ columns: personColumns }),
      [],
    );

    return (
      <DataView<Person>
        availableLayouts={tableLayoutOnly}
        getData={getData}
        hasBulkSelectionButtons={args.hasBulkSelectionButtons}
        hasRowSelection={args.hasRowSelection}
        tableLayoutOptions={tableLayoutOptions}
      />
    );
  },
  play: async ({ canvasElement, step }) => {
    await step("Select a row", async () => {
      const canvas = within(canvasElement);
      await userEvent.click(canvas.getAllByRole("checkbox")[1]);
    });
  },
  parameters: {
    docs: {
      description: {
        story:
          "Row checkboxes remain active but the bulk-selection toolbar (Select all, Select none, and the selected-count actions menu) is hidden. Useful when the consumer manages selection state externally via `onRowSelectionChange`.",
      },
    },
  },
};
