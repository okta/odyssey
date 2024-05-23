/*!
 * Copyright (c) 2023-present, Okta, Inc. and/or its affiliates. All rights reserved.
 * The Okta software accompanied by this notice is provided pursuant to the Apache License, Version 2.0 (the "License.")
 *
 * You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0.
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *
 * See the License for the specific language governing permissions and limitations under the License.
 */

import type { Meta, StoryObj } from "@storybook/react";
import { DataView, type DataViewProps } from "@okta/odyssey-react-mui/labs";
import { MuiThemeDecorator } from "../../../../.storybook/components";
import {
  Person,
  columns as personColumns,
  data as personData,
} from "./personData";
import { filterData, reorderData } from "./dataFunctions";
import { useCallback, useState } from "react";
import {
  DataTableGetDataType,
  DataTableOnReorderRowsType,
  DataTableRowSelectionState,
} from "@okta/odyssey-react-mui";

const storybookMeta: Meta<DataViewProps> = {
  title: "Labs Components/Data components",
  component: DataView,
  argTypes: {},
  decorators: [MuiThemeDecorator],
};

export default storybookMeta;

export const Default: StoryObj<DataViewProps> = {
  args: {},
  render: function C() {
    const [data, setData] = useState<Person[]>(personData);

    const getData = useCallback(
      ({ ...props }: DataTableGetDataType) => {
        return filterData({ data, ...props });
      },
      [data],
    );

    const onReorderRows = useCallback(
      ({ ...props }: DataTableOnReorderRowsType) => {
        const reorderedData = reorderData({ data, ...props });
        setData(reorderedData);
      },
      [data],
    );

    const onChangeRowSelection = useCallback(
      (rowSelection: DataTableRowSelectionState) => {
        if (Object.keys(rowSelection).length > 0) {
          console.log(`${Object.keys(rowSelection).length} selected`);
        }
      },
      [],
    );

    return (
      <DataView
        getData={getData}
        onReorderRows={onReorderRows}
        onChangeRowSelection={onChangeRowSelection}
        hasPagination
        hasFilters
        hasSearch
        hasRowReordering
        tableOptions={{
          columns: personColumns,
          hasChangeableDensity: true,
          hasColumnResizing: true,
          hasColumnVisibility: true,
          hasSorting: true,
        }}
      />
    );
  },
};
