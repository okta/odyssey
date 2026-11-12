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

// Matches `#rrggbb` or `#rrggbbaa`, case-insensitive because the hue sources mix
// `#4C64E1` and `#546be7`. Three-digit shorthand is left out: no token uses it, and
// accepting it would hide a typo that dropped digits from a full value.
const HEX_COLOR =
  /^#(?<red>[\da-f]{2})(?<green>[\da-f]{2})(?<blue>[\da-f]{2})(?<alpha>[\da-f]{2})?$/i;

export type Rgba = {
  alpha: number;
  blue: number;
  green: number;
  red: number;
};

export type Hsb = {
  alpha: number;
  brightness: number;
  hue: number;
  saturation: number;
};

export type SaturationChange = {
  points: number;
  relativePercent?: number;
};

/**
 * Returns red, green, and blue as 0 to 255, and alpha as 0 to 1. Returns `undefined` for anything that is not a 6- or 8-digit hex color.
 */
export const getRgbaFromHex = ({ hex }: { hex: string }): Rgba | undefined => {
  const groups = HEX_COLOR.exec(hex.trim())?.groups;

  if (!groups?.red || !groups.green || !groups.blue) {
    return undefined;
  }

  return {
    alpha: groups.alpha ? Number.parseInt(groups.alpha, 16) / 255 : 1,
    blue: Number.parseInt(groups.blue, 16),
    green: Number.parseInt(groups.green, 16),
    red: Number.parseInt(groups.red, 16),
  };
};

/**
 * Returns hue in degrees and saturation, brightness, and alpha as whole percentages, rounded the way Figma's HSB picker shows them.
 */
export const getHsbFromHex = ({ hex }: { hex: string }): Hsb | undefined => {
  const rgba = getRgbaFromHex({ hex });

  if (!rgba) {
    return undefined;
  }

  const [red, green, blue] = [rgba.red, rgba.green, rgba.blue].map(
    (channel) => channel / 255,
  );
  const maximum = Math.max(red, green, blue);
  const chroma = maximum - Math.min(red, green, blue);

  const hueSixths =
    chroma === 0
      ? 0
      : maximum === red
        ? ((green - blue) / chroma + 6) % 6
        : maximum === green
          ? (blue - red) / chroma + 2
          : (red - green) / chroma + 4;

  return {
    alpha: Math.round(rgba.alpha * 100),
    brightness: Math.round(maximum * 100),
    // A rounded 359.6° would otherwise display as 360°, which is the same hue as 0°.
    hue: Math.round(hueSixths * 60) % 360,
    saturation: maximum === 0 ? 0 : Math.round((chroma / maximum) * 100),
  };
};

/**
 * Returns the change in saturation points, plus the change relative to the light value. The relative change is omitted when the light color has no saturation, because a change from zero has no meaningful ratio.
 */
export const calculateSaturationChange = ({
  darkSaturation,
  lightSaturation,
}: {
  darkSaturation: number;
  lightSaturation: number;
}): SaturationChange => ({
  points: darkSaturation - lightSaturation,
  ...(lightSaturation > 0 && {
    relativePercent: Math.round(
      ((darkSaturation - lightSaturation) / lightSaturation) * 100,
    ),
  }),
});

/**
 * Returns the signed shortest distance between two hues, from -180 to 180, so 350° to 10° reads as +20 and not -340.
 */
export const calculateHueChange = ({
  darkHue,
  lightHue,
}: {
  darkHue: number;
  lightHue: number;
}): number => ((((darkHue - lightHue) % 360) + 540) % 360) - 180;

/**
 * Returns WCAG 2 relative luminance from 0 (black) to 1 (white), which tracks perceived lightness where HSB brightness does not: every pale tint of a hue has brightness 100.
 */
export const calculateRelativeLuminance = ({ hex }: { hex: string }) => {
  const rgba = getRgbaFromHex({ hex });

  return rgba
    ? [rgba.red, rgba.green, rgba.blue]
        .map((channel) => channel / 255)
        .map((channel) =>
          channel <= 0.04045
            ? channel / 12.92
            : ((channel + 0.055) / 1.055) ** 2.4,
        )
        .reduce(
          (luminance, channel, index) =>
            luminance + channel * ([0.2126, 0.7152, 0.0722][index] ?? 0),
          0,
        )
    : undefined;
};

/**
 * Returns the WCAG 2 contrast ratio between two opaque colors, rounded to two decimals. Alpha is ignored, so a translucent color reports the contrast it would have if it were opaque.
 */
export const calculateContrastRatio = ({
  backgroundHex,
  foregroundHex,
}: {
  backgroundHex: string;
  foregroundHex: string;
}): number | undefined => {
  const foregroundLuminance = calculateRelativeLuminance({
    hex: foregroundHex,
  });
  const backgroundLuminance = calculateRelativeLuminance({
    hex: backgroundHex,
  });

  if (foregroundLuminance === undefined || backgroundLuminance === undefined) {
    return undefined;
  }

  const [darker, lighter] = [foregroundLuminance, backgroundLuminance].toSorted(
    (first, second) => first - second,
  );

  return Math.round(((lighter + 0.05) / (darker + 0.05)) * 100) / 100;
};

const toHexChannel = ({ channel }: { channel: number }) =>
  Math.round(channel).toString(16).padStart(2, "0");

/**
 * Returns the opaque color a translucent foreground produces when painted over an opaque background, the way a browser composites it. An opaque foreground comes back unchanged, lowercased.
 */
export const getBlendedHex = ({
  backgroundHex,
  foregroundHex,
}: {
  backgroundHex: string;
  foregroundHex: string;
}): string | undefined => {
  const foreground = getRgbaFromHex({ hex: foregroundHex });
  const background = getRgbaFromHex({ hex: backgroundHex });

  if (!foreground || !background) {
    return undefined;
  }

  const blendChannel = ({
    backgroundChannel,
    foregroundChannel,
  }: {
    backgroundChannel: number;
    foregroundChannel: number;
  }) =>
    toHexChannel({
      channel:
        foregroundChannel * foreground.alpha +
        backgroundChannel * (1 - foreground.alpha),
    });

  return `#${blendChannel({ backgroundChannel: background.red, foregroundChannel: foreground.red })}${blendChannel({ backgroundChannel: background.green, foregroundChannel: foreground.green })}${blendChannel({ backgroundChannel: background.blue, foregroundChannel: foreground.blue })}`;
};
