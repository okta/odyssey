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

import { describe, expect, test } from "vitest";

import {
  hexToRgb,
  isValidHexString,
  rgbComponentsToString,
} from "./hexToRgb.js";

describe(hexToRgb.name, () => {
  test("six digit hex", () => {
    expect(hexToRgb("#0a141e")).toStrictEqual({
      red: 10,
      green: 20,
      blue: 30,
      asFormattedString: "rgb(10, 20, 30)",
    });
  });
});

describe(isValidHexString.name, () => {
  test("three and six digit hex", () => {
    expect([
      isValidHexString("#fff"),
      isValidHexString("#ffffff"),
    ]).toStrictEqual([true, true]);
  });

  test("missing hash or wrong length", () => {
    expect([
      isValidHexString("ffffff"),
      isValidHexString("#ffff"),
    ]).toStrictEqual([false, false]);
  });
});

describe(rgbComponentsToString.name, () => {
  test("three components", () => {
    expect(rgbComponentsToString({ red: 1, green: 2, blue: 3 })).toBe(
      "1, 2, 3",
    );
  });
});
