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
import { DataFilter } from "../DataFilters";
import { UniversalProps, TableProps } from "./componentTypes";
import { DataTableColumn } from "../../DataTable";
import { MRT_RowData } from "material-react-table";

type FilterConversionType = {
  filters?: UniversalProps["filters"];
  columns?: TableProps["columns"];
};

export const useFilterConversion = ({
  filters,
  columns,
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
    const providedFilters = filters || columns;
    if (!providedFilters) {
      return [];
    }
    return providedFilters.reduce<DataFilter[]>((accumulator, item) => {
      if (typeof item === "string") {
        const foundColumn = columns?.find(
          (column) => column.accessorKey === item,
        );
        if (foundColumn) {
          const filter = convertColumnToFilter(foundColumn);
          if (filter) {
            return accumulator.concat(filter);
          }
        }
      } else if ("accessorKey" in item) {
        // Checks if it's a column
        const filter = convertColumnToFilter(item);
        if (filter) {
          return accumulator.concat(filter);
        }
      } else if ("label" in item) {
        // Checks if it's a DataFilter
        return accumulator.concat(item);
      }
      // If none of the conditions match, item is ignored (not mapping to undefined)
      return accumulator;
    }, []);
  }, [columns, filters]);

  return dataTableFilters;
};
