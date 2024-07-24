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

/* eslint-disable import/no-extraneous-dependencies */
import { useCallback, memo, useState } from "react";
import { DataTable, DataTableGetDataType } from "@okta/odyssey-react-mui";
import {
  Planet,
  columns as planetColumns,
  data as planetData,
} from "./planetData";

const filterData = ({
  data,
  ...args
}: {
  data: Planet[];
} & DataTableGetDataType) => {
  let filteredData = data;
  const { search, sort, page = 1, resultsPerPage = 20 } = args;

  // Implement text-based query filtering
  if (search) {
    filteredData = filteredData.filter((row) =>
      Object.values(row).some((value) =>
        value.toString().toLowerCase().includes(search.toLowerCase()),
      ),
    );
  }

  // Implement sorting
  if (sort && sort.length > 0) {
    filteredData.sort((a, b) => {
      for (const { id, desc } of sort) {
        const aValue = a[id as keyof Planet];
        const bValue = b[id as keyof Planet];

        if (aValue < bValue) return desc ? 1 : -1;
        if (aValue > bValue) return desc ? -1 : 1;
      }

      return 0;
    });
  }

  // Implement pagination
  const startRow = (page - 1) * resultsPerPage;
  const endRow = startRow + resultsPerPage;
  filteredData = filteredData.slice(startRow, endRow);

  return filteredData;
};

export const InnerRoadmapTable = () => {
  const [data] = useState<Planet[]>(planetData);

  const getData = useCallback(
    ({ ...props }: DataTableGetDataType) => {
      return filterData({ data, ...props });
    },
    [data],
  );

  return <DataTable columns={planetColumns} getData={getData} />;
};

const MemoizedInnerRoadmapTable = memo(InnerRoadmapTable);
const WrappedRoadmapTable = () => {
  return <MemoizedInnerRoadmapTable />;
};

export { WrappedRoadmapTable as RoadmapTable };
