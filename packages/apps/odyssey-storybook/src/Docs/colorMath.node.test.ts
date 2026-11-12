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
  calculateContrastRatio,
  calculateHueChange,
  calculateSaturationChange,
  getBlendedHex,
  getHsbFromHex,
  getRgbaFromHex,
} from "./colorMath.js";

describe(getRgbaFromHex.name, () => {
  test("8-digit hex with alpha", () => {
    expect(getRgbaFromHex({ hex: "#FF000080" })).toStrictEqual({
      alpha: 128 / 255,
      blue: 0,
      green: 0,
      red: 255,
    });
  });

  test("3-digit shorthand", () => {
    expect(getRgbaFromHex({ hex: "#fff" })).toBeUndefined();
  });
});

describe(getHsbFromHex.name, () => {
  test("light hue.neutral.500", () => {
    expect(getHsbFromHex({ hex: "#8d8d8d" })).toStrictEqual({
      alpha: 100,
      brightness: 55,
      hue: 0,
      saturation: 0,
    });
  });

  test("light hue.red.500", () => {
    expect(getHsbFromHex({ hex: "#e72500" })).toStrictEqual({
      alpha: 100,
      brightness: 91,
      hue: 10,
      saturation: 100,
    });
  });

  test("uppercase light hue.blue.600", () => {
    expect(getHsbFromHex({ hex: "#4C64E1" })).toStrictEqual({
      alpha: 100,
      brightness: 88,
      hue: 230,
      saturation: 66,
    });
  });
});

describe(calculateSaturationChange.name, () => {
  test("light color with no saturation", () => {
    expect(
      calculateSaturationChange({ darkSaturation: 7, lightSaturation: 0 }),
    ).toStrictEqual({ points: 7 });
  });

  test("light color with saturation", () => {
    expect(
      calculateSaturationChange({ darkSaturation: 10, lightSaturation: 72 }),
    ).toStrictEqual({ points: -62, relativePercent: -86 });
  });
});

describe(calculateHueChange.name, () => {
  test("change that crosses 0°", () => {
    expect(calculateHueChange({ darkHue: 10, lightHue: 350 })).toBe(20);
  });

  test("decrease within the wheel", () => {
    expect(calculateHueChange({ darkHue: 237, lightHue: 259 })).toBe(-22);
  });
});

describe(calculateContrastRatio.name, () => {
  test("white on black", () => {
    expect(
      calculateContrastRatio({
        backgroundHex: "#000000",
        foregroundHex: "#ffffff",
      }),
    ).toBe(21);
  });

  test("invalid foreground", () => {
    expect(
      calculateContrastRatio({
        backgroundHex: "#000000",
        foregroundHex: "red",
      }),
    ).toBeUndefined();
  });
});

describe(getBlendedHex.name, () => {
  test("half-transparent white over black", () => {
    expect(
      getBlendedHex({ backgroundHex: "#000000", foregroundHex: "#ffffff80" }),
    ).toBe("#808080");
  });

  test("opaque foreground", () => {
    expect(
      getBlendedHex({ backgroundHex: "#000000", foregroundHex: "#4C64E1" }),
    ).toBe("#4c64e1");
  });
});
