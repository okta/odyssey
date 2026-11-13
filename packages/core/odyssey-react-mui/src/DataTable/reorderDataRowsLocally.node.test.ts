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

import { reorderDataRowsLocally } from "./reorderDataRowsLocally.js";

describe(reorderDataRowsLocally.name, () => {
  test("row moved forward", () => {
    const rows = [{ id: "a" }, { id: "b" }, { id: "c" }];

    expect(
      reorderDataRowsLocally({
        currentData: rows,
        rowId: "a",
        newRowIndex: 2,
      }),
    ).toStrictEqual([{ id: "b" }, { id: "c" }, { id: "a" }]);
    expect(rows).toStrictEqual([{ id: "a" }, { id: "b" }, { id: "c" }]);
  });

  test("row moved backward", () => {
    expect(
      reorderDataRowsLocally({
        currentData: [{ id: "a" }, { id: "b" }, { id: "c" }],
        rowId: "c",
        newRowIndex: 0,
      }),
    ).toStrictEqual([{ id: "c" }, { id: "a" }, { id: "b" }]);
  });

  test("row moved past the end", () => {
    expect(
      reorderDataRowsLocally({
        currentData: [{ id: "a" }, { id: "b" }, { id: "c" }],
        rowId: "a",
        newRowIndex: 3,
      }),
    ).toStrictEqual([{ id: "a" }, { id: "b" }, { id: "c" }]);
  });
});
