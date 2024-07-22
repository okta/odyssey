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

import { useTranslation } from "react-i18next";
import { useMemo } from "react";

type UsePaginationType = {
  pageIndex: number;
  pageSize: number;
  totalRows?: number;
};

export const usePagination = ({
  pageIndex,
  pageSize,
  totalRows,
}: UsePaginationType) => {
  const { t } = useTranslation();

  return useMemo(() => {
    const firstRow = pageSize * (pageIndex - 1) + 1;
    let lastRow = firstRow + (pageSize - 1);

    if (totalRows && lastRow > totalRows) {
      lastRow = totalRows;
    }

    const totalRowsLabel = totalRows
      ? t("pagination.rowswithtotal", { firstRow, lastRow, totalRows })
      : t("pagination.rowswithouttotal", { firstRow, lastRow });

    return {
      firstRow,
      lastRow,
      totalRowsLabel,
    };
  }, [pageIndex, pageSize, totalRows, t]);
};
