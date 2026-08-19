/*!
 * Copyright (c) 2025-present, Okta, Inc. and/or its affiliates. All rights reserved.
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

import { DataView } from "@okta/odyssey-contributions-ud-components";
import {
  type DataGetDataType,
  type TableLayoutProps,
} from "@okta/odyssey-react-mui/labs";
import { useCallback, useMemo } from "react";

import { filterData } from "../../Odyssey Core/Data Visualizations/DataView/dataFunctions.js";
import {
  type Person,
  columns as personColumns,
  data as personData,
} from "../../Odyssey Core/Data Visualizations/DataView/personData.js";
import { OdysseyStorybookThemeDecorator } from "../../tools/OdysseyStorybookThemeDecorator.js";
import { UDComponentsStorybookThemeDecorator } from "../../tools/UDComponentsStorybookThemeDecorator.js";

const meta = {
  component: DataView,
  decorators: [
    OdysseyStorybookThemeDecorator,
    UDComponentsStorybookThemeDecorator,
  ],
  tags: ["autodocs"],
  argTypes: {
    getData: { table: { type: { summary: "" } } },
    hasRowSelection: { control: "boolean" },
    hasPagination: { control: "boolean" },
    isSelectAllButtonHidden: { control: "boolean" },
    maxSelectedRows: { control: "number" },
  },
} satisfies Meta<typeof DataView>;

export default meta;

type Story = StoryObj<typeof DataView>;

export const SelectAllButtonHidden: Story = {
  args: {
    hasPagination: true,
    hasRowSelection: true,
    isSelectAllButtonHidden: true,
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
        getData={getData}
        hasPagination={args.hasPagination}
        hasRowSelection={args.hasRowSelection}
        isSelectAllButtonHidden={args.isSelectAllButtonHidden}
        tableLayoutOptions={tableLayoutOptions}
        totalRows={personData.length}
      />
    );
  },
  parameters: {
    docs: {
      description: {
        story:
          'The "Select All" button is hidden. Row checkboxes and the "Select None" button remain active.',
      },
    },
  },
};

export const MaxSelectedRows: Story = {
  args: {
    hasPagination: true,
    hasRowSelection: true,
    isSelectAllButtonHidden: true,
    maxSelectedRows: 5,
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
        getData={getData}
        hasPagination={args.hasPagination}
        hasRowSelection={args.hasRowSelection}
        isSelectAllButtonHidden={args.isSelectAllButtonHidden}
        maxSelectedRows={args.maxSelectedRows}
        tableLayoutOptions={tableLayoutOptions}
        totalRows={personData.length}
      />
    );
  },
  parameters: {
    docs: {
      description: {
        story:
          'Selection is capped at 5 rows across all pages. Once the limit is reached, the checkboxes of unselected rows that are otherwise selectable are disabled and their tooltip reads "Selection limit reached"; rows excluded by `isRowSelectionDisabled` keep their default disabled state and tooltip. The header "select all" checkbox is never disabled, and its checked/indeterminate/unchecked state reflects only the rows on the current page. While any row on the current page is selected, clicking it clears the page rather than selecting more. The "Select All" toolbar button ignores the cap.',
      },
    },
  },
};
