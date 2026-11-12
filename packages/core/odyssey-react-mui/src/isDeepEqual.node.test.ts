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

import { isDeepEqual } from "./isDeepEqual.js";

const formatter = () => "formatted";

describe(isDeepEqual.name, () => {
  test.each([
    ["the same primitive", 1, 1],
    ["two NaN values", Number.NaN, Number.NaN],
    ["null and null", null, null],
    ["equal dates", new Date(2024, 0, 1), new Date(2024, 0, 1)],
    ["equal regular expressions", /odyssey/gi, /odyssey/gi],
    [
      "nested arrays and objects",
      { series: [{ data: [4.2, null], name: "Events" }] },
      { series: [{ data: [4.2, null], name: "Events" }] },
    ],
    [
      "the same function reference",
      { formatter, label: "Status" },
      { formatter, label: "Status" },
    ],
    [
      "sets with equal object entries",
      new Set([{ label: "Active" }, "inactive"]),
      new Set([{ label: "Active" }, "inactive"]),
    ],
    [
      "maps with object keys",
      new Map([[{ id: "status" }, ["active"]]]),
      new Map([[{ id: "status" }, ["active"]]]),
    ],
    [
      "equal typed arrays",
      new Uint8Array([1, 2, 3]),
      new Uint8Array([1, 2, 3]),
    ],
    [
      "equal array buffers",
      new Uint8Array([1, 2]).buffer,
      new Uint8Array([1, 2]).buffer,
    ],
    [
      "equal data views",
      new DataView(new Uint8Array([1, 2]).buffer),
      new DataView(new Uint8Array([1, 2]).buffer),
    ],
    [
      "maps with structurally equal object keys",
      new Map([
        [{ id: "status" }, "active"],
        [{ id: "status" }, "inactive"],
      ]),
      new Map([
        [{ id: "status" }, "active"],
        [{ id: "status" }, "inactive"],
      ]),
    ],
  ])("%s", (_scenario, firstValue, secondValue) => {
    expect(isDeepEqual({ firstValue, secondValue })).toBe(true);
  });

  test.each([
    ["different primitives", 1, 2],
    ["null and undefined", null, undefined],
    ["an object and null", {}, null],
    ["different dates", new Date(2024, 0, 1), new Date(2024, 0, 2)],
    ["regular expressions with different flags", /odyssey/g, /odyssey/i],
    ["arrays of different lengths", [1, 2], [1, 2, 3]],
    ["an array and an object", [], {}],
    ["objects with a different key", { label: "Status" }, { name: "Status" }],
    ["an object with an extra key", { label: "Status" }, {}],
    [
      "functions with the same body",
      { formatter: () => "formatted" },
      { formatter: () => "formatted" },
    ],
    [
      "sets with different object entries",
      new Set([{ label: "Active" }]),
      new Set([{ label: "Inactive" }]),
    ],
    [
      "maps with different values",
      new Map([["status", "active"]]),
      new Map([["status", "inactive"]]),
    ],
    [
      "maps with different keys and undefined values",
      new Map([["status", undefined]]),
      new Map([["label", undefined]]),
    ],
    [
      "different typed arrays",
      new Uint8Array([1, 2, 3]),
      new Uint8Array([1, 2, 4]),
    ],
    [
      "different data views",
      new DataView(new Uint8Array([1, 2]).buffer),
      new DataView(new Uint8Array([1, 3]).buffer),
    ],
    [
      "sets with a repeated object entry first",
      new Set([{ id: 1 }, { id: 1 }]),
      new Set([{ id: 1 }, { id: 2 }]),
    ],
    [
      "sets with a repeated object entry second",
      new Set([{ id: 1 }, { id: 2 }]),
      new Set([{ id: 1 }, { id: 1 }]),
    ],
    [
      "maps with a repeated object key first",
      new Map([
        [{ id: 1 }, "active"],
        [{ id: 1 }, "active"],
      ]),
      new Map([
        [{ id: 1 }, "active"],
        [{ id: 2 }, "active"],
      ]),
    ],
    [
      "maps with a repeated object key second",
      new Map([
        [{ id: 1 }, "active"],
        [{ id: 2 }, "active"],
      ]),
      new Map([
        [{ id: 1 }, "active"],
        [{ id: 1 }, "active"],
      ]),
    ],
    ["a sparse array first", Array(1), [1]],
    ["a sparse array second", [1], Array(1)],
    ["a hole and an undefined element", Array(1), [undefined]],
    [
      "maps with equal object keys and different values",
      new Map([[{ id: "status" }, "active"]]),
      new Map([[{ id: "status" }, "inactive"]]),
    ],
  ])("%s", (_scenario, firstValue, secondValue) => {
    expect(isDeepEqual({ firstValue, secondValue })).toBe(false);
  });

  test("a copy of a map with distinct empty object keys", () => {
    const originalMap = new Map([
      [{}, 1],
      [{}, 2],
    ]);

    expect(
      isDeepEqual({
        firstValue: originalMap,
        secondValue: new Map(originalMap),
      }),
    ).toBe(true);
  });
});
