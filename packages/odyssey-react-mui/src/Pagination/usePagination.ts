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

import { Pagination } from "./constants";

interface UsePaginationParams {
  pagination: Pagination;
  totalRows?: number;
}

export const usePagination = ({
  pagination,
  totalRows,
}: UsePaginationParams) => {
  const firstRow = pagination.pageSize * (pagination.pageIndex - 1) + 1;
  const lastRow = firstRow + (pagination.pageSize - 1);
  return {
    firstRow,
    // If the last eligible row is greater than the number of total rows,
    // show the number of total rows instead (ie, if we're showing rows
    // 180-200 but there are only 190 rows, show 180-190 instead)
    lastRow: totalRows && lastRow > totalRows ? totalRows : lastRow,
  };
};
