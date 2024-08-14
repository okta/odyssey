/*!
 * Copyright (c) 2024-present, Okta, Inc. and/or its affiliates. All rights reserved.
 * The Okta software accompanied by this notice is provided pursuant to the Apache License, Version 2.0 (the "License.")
 *
 * You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0.
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *
 * See the License for the specific language governing permissions and limitations under the License.
 */

import { useCallback, useMemo } from "react";
import { MRT_RowData } from "material-react-table";

import { DataFilter } from "../DataFilters";
import { DataTableColumn } from "../../DataTable";
import { UniversalProps, TableLayoutProps } from "./componentTypes";

type FilterConversionType = {
  columns?: TableLayoutProps["columns"];
  filters?: UniversalProps["filters"];
};

export const useFilterConversion = ({
  columns,
  filters,
}: FilterConversionType) => {
  const convertFilterSelectOptions = useCallback(
    (options: DataTableColumn<MRT_RowData>["filterSelectOptions"]) =>
      options?.map((option) =>
        typeof option === "string"
          ? {
              label: option,
              value: option,
            }
          : {
              // If the option isn't a string, it must have value and/or option defined
              // If either is undefined, use the other
              label: option.label ?? option.value,
              value: option.value ?? option.label,
            },
      ),
    [],
  );

  const convertColumnToFilter = useCallback(
    (column: DataTableColumn<MRT_RowData>) =>
      column.enableColumnFilter !== false && column.accessorKey
        ? ({
            id: column.accessorKey,
            label: column.header,
            variant: column.filterVariant,
            options: convertFilterSelectOptions(column.filterSelectOptions),
          } satisfies DataFilter as DataFilter)
        : null,
    [convertFilterSelectOptions],
  );

  const dataTableFilters = useMemo(() => {
    // Filters may be manually set via the `filters` variable;
    // If not, they may be inferred from `columns`
    const providedFilters = filters || columns || [];

    return providedFilters.reduce<DataFilter[]>((accumulator, item) => {
      if (typeof item === "string") {
        const foundColumn = columns?.find(
          (column) => column.accessorKey === item,
        );
        const filter = foundColumn && convertColumnToFilter(foundColumn);
        return filter ? accumulator.concat(filter) : accumulator;
      }

      if ("accessorKey" in item) {
        const filter = convertColumnToFilter(item);
        return filter ? accumulator.concat(filter) : accumulator;
      }

      if ("label" in item) {
        return accumulator.concat(item);
      }

      return accumulator;
    }, []);
  }, [columns, filters]);

  return dataTableFilters;
};
