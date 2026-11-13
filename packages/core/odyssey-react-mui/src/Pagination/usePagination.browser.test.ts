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

import { renderHookWithOdysseyProvider } from "@okta/odyssey-test-tooling/browser";

import { usePagination } from "./usePagination.js";

describe(usePagination.name, () => {
  test("page with a known total", async () => {
    const { result } = await renderHookWithOdysseyProvider(() =>
      usePagination({
        currentRowsCount: 10,
        pageIndex: 2,
        pageSize: 10,
        totalRows: 45,
      }),
    );

    expect(result.current).toStrictEqual({
      firstRow: 11,
      lastRow: 20,
      totalRowsLabel: "11-20 of 45 rows",
    });
  });

  test("page without a total", async () => {
    const { result } = await renderHookWithOdysseyProvider(() =>
      usePagination({ currentRowsCount: 10, pageIndex: 1, pageSize: 10 }),
    );

    expect(result.current).toStrictEqual({
      firstRow: 1,
      lastRow: 10,
      totalRowsLabel: "1-10 rows",
    });
  });

  test("page with no rows", async () => {
    const { result } = await renderHookWithOdysseyProvider(() =>
      usePagination({ currentRowsCount: 0, pageIndex: 1, pageSize: 10 }),
    );

    expect(result.current).toStrictEqual({
      firstRow: 1,
      lastRow: 0,
      totalRowsLabel: "0 rows",
    });
  });
});
