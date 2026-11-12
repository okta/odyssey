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

import * as LightTokens from "@okta/odyssey-design-tokens";
import * as DarkTokens from "@okta/odyssey-design-tokens/dark";
import {
  createOdysseyStyledComponent,
  type DataTableColumn,
  Status,
  Tabs,
  Typography,
} from "@okta/odyssey-react-mui";
import { DataView } from "@okta/odyssey-react-mui/labs";
import { memo } from "react";

import {
  calculateContrastRatio,
  calculateHueChange,
  calculateRelativeLuminance,
  calculateSaturationChange,
  getHsbFromHex,
  type Hsb,
  type SaturationChange,
} from "./colorMath.js";
import { ComponentTokenReview } from "./ComponentTokenReview.js";
import { DarkModeAuditReport } from "./DarkModeAuditReport.js";
import { UiShellReview } from "./UiShellReview.js";

// Splits a flat build name such as `HueAccentOne500` or `HueNeutralWhite` into its
// family and step. The family is the PascalCase run before the step, and the step
// is digits or `White`, the only non-numeric step in `src/hue.json`.
const HUE_TOKEN_NAME = /^Hue(?<family>[A-Z][A-Za-z]*?)(?<step>\d+|White)$/;

// The order families are authored in `src/hue.json`. The build output is an ES
// module namespace, whose keys are alphabetical, so the source order is lost.
const FAMILY_ORDER = [
  "Neutral",
  "Blue",
  "Green",
  "Red",
  "Yellow",
  "AccentOne",
  "AccentTwo",
  "AccentThree",
  "AccentFour",
];

// A hue change past this many degrees is visible as a different color family on a
// swatch, not as a shade of the same one.
const HUE_DRIFT_THRESHOLD_DEGREES = 10;

type PrimitiveTokenRow = {
  brightnessChange?: number;
  contrastDark?: number;
  contrastLight?: number;
  darkHex: string;
  darkHsb?: Hsb;
  family: string;
  flags: string[];
  hueChange?: number;
  lightHex: string;
  lightHsb?: Hsb;
  saturationChange?: SaturationChange;
  step: string;
  tokenName: string;
};

type PrimitiveTokenFamily = {
  family: string;
  rows: PrimitiveTokenRow[];
};

const lightTokensByName: Record<string, unknown> = LightTokens;
const darkTokensByName: Record<string, unknown> = DarkTokens;

const getStepOrder = ({ step }: { step: string }) =>
  step === "White" ? -1 : Number(step);

const getDottedFamilyName = ({ family }: { family: string }) =>
  `${family.charAt(0).toLowerCase()}${family.slice(1)}`;

const getDuplicateFlags = ({
  hexByTokenName,
  modeLabel,
}: {
  hexByTokenName: Array<{ hex: string; tokenName: string }>;
  modeLabel: string;
}) =>
  hexByTokenName.map(({ hex, tokenName }) =>
    hexByTokenName
      .filter(
        (otherToken) =>
          otherToken.tokenName !== tokenName &&
          otherToken.hex.toLowerCase() === hex.toLowerCase(),
      )
      .map((otherToken) => `${modeLabel} same as ${otherToken.tokenName}`),
  );

const getLightnessOrderFlags = ({ rows }: { rows: PrimitiveTokenRow[] }) =>
  rows.map((row, index) => {
    const previousRow = rows[index - 1];
    const previousLuminance =
      previousRow && calculateRelativeLuminance({ hex: previousRow.darkHex });
    const luminance = calculateRelativeLuminance({ hex: row.darkHex });

    return previousRow &&
      previousLuminance !== undefined &&
      luminance !== undefined &&
      luminance <= previousLuminance
      ? [`Dark not lighter than ${previousRow.tokenName}`]
      : [];
  });

const getPrimitiveTokenFamilies = (): PrimitiveTokenFamily[] => {
  const lightSurfaceHex = String(lightTokensByName.HueNeutralWhite);
  const darkSurfaceHex = String(darkTokensByName.HueNeutralWhite);

  const unflaggedRows = Object.keys(lightTokensByName)
    .flatMap((buildName) => {
      const groups = HUE_TOKEN_NAME.exec(buildName)?.groups;
      const lightValue = lightTokensByName[buildName];
      const darkValue = darkTokensByName[buildName];

      if (
        !groups?.family ||
        !groups.step ||
        typeof lightValue !== "string" ||
        typeof darkValue !== "string"
      ) {
        return [];
      }

      const lightHsb = getHsbFromHex({ hex: lightValue });
      const darkHsb = getHsbFromHex({ hex: darkValue });
      const isNeutral = groups.family === "Neutral";
      const hueChange =
        lightHsb && darkHsb
          ? calculateHueChange({ darkHue: darkHsb.hue, lightHue: lightHsb.hue })
          : undefined;

      return [
        {
          brightnessChange:
            lightHsb && darkHsb
              ? darkHsb.brightness - lightHsb.brightness
              : undefined,
          contrastDark: calculateContrastRatio({
            backgroundHex: darkSurfaceHex,
            foregroundHex: darkValue,
          }),
          contrastLight: calculateContrastRatio({
            backgroundHex: lightSurfaceHex,
            foregroundHex: lightValue,
          }),
          darkHex: darkValue,
          darkHsb,
          family: groups.family,
          // Light neutrals are pure gray, so their hue is 0° by convention and any
          // dark hue reads as a jump. The saturation column shows the tint instead.
          flags:
            !isNeutral &&
            hueChange !== undefined &&
            Math.abs(hueChange) > HUE_DRIFT_THRESHOLD_DEGREES
              ? [`Hue drift ${hueChange > 0 ? "+" : ""}${hueChange}°`]
              : [],
          hueChange,
          lightHex: lightValue,
          lightHsb,
          saturationChange:
            lightHsb && darkHsb
              ? calculateSaturationChange({
                  darkSaturation: darkHsb.saturation,
                  lightSaturation: lightHsb.saturation,
                })
              : undefined,
          step: groups.step,
          tokenName: `hue.${getDottedFamilyName({ family: groups.family })}.${groups.step === "White" ? "white" : groups.step}`,
        } satisfies PrimitiveTokenRow,
      ];
    })
    .toSorted(
      (first, second) =>
        getStepOrder({ step: first.step }) -
        getStepOrder({ step: second.step }),
    );

  const familyNames = [
    ...new Set(unflaggedRows.map(({ family }) => family)),
  ].toSorted(
    (first, second) =>
      (FAMILY_ORDER.indexOf(first) + 1 || FAMILY_ORDER.length + 1) -
      (FAMILY_ORDER.indexOf(second) + 1 || FAMILY_ORDER.length + 1),
  );

  return familyNames.map((family) => {
    const familyRows = unflaggedRows.filter((row) => row.family === family);
    const lightDuplicateFlags = getDuplicateFlags({
      hexByTokenName: familyRows.map(({ lightHex, tokenName }) => ({
        hex: lightHex,
        tokenName,
      })),
      modeLabel: "Light",
    });
    const darkDuplicateFlags = getDuplicateFlags({
      hexByTokenName: familyRows.map(({ darkHex, tokenName }) => ({
        hex: darkHex,
        tokenName,
      })),
      modeLabel: "Dark",
    });
    const lightnessOrderFlags = getLightnessOrderFlags({ rows: familyRows });

    return {
      family,
      rows: familyRows.map((row, index) => ({
        ...row,
        flags: [
          ...row.flags,
          ...(lightDuplicateFlags[index] ?? []),
          ...(darkDuplicateFlags[index] ?? []),
          ...(lightnessOrderFlags[index] ?? []),
        ],
      })),
    };
  });
};

const primitiveTokenFamilies = getPrimitiveTokenFamilies();

const formatSigned = ({ value, unit }: { unit: string; value?: number }) =>
  value === undefined ? "–" : `${value > 0 ? "+" : ""}${value}${unit}`;

const formatHsb = ({ hsb }: { hsb?: Hsb }) =>
  hsb ? `${hsb.hue} ${hsb.saturation} ${hsb.brightness}` : "invalid";

const formatContrast = ({ ratio }: { ratio?: number }) =>
  ratio === undefined ? "–" : `${ratio.toFixed(2)}:1`;

const SwatchCell = createOdysseyStyledComponent({ tag: "div" })(
  ({ odysseyDesignTokens }) => ({
    alignItems: "center",
    display: "flex",
    gap: odysseyDesignTokens.Spacing2,
  }),
);

// The swatch sits on a checkerboard so a translucent token shows as translucent,
// and has a fixed gray border so both near-white and near-black swatches keep an
// edge in either Storybook color scheme.
const Swatch = createOdysseyStyledComponent({
  tag: "span",
  shouldForwardProp: (prop) => prop !== "swatchColor",
})<{ swatchColor: string }>(({ odysseyDesignTokens, swatchColor }) => ({
  background: `linear-gradient(${swatchColor}, ${swatchColor}), repeating-conic-gradient(#cccccc 0% 25%, #ffffff 0% 50%) 0 0 / 8px 8px`,
  border: "1px solid #8d8d8d",
  borderRadius: odysseyDesignTokens.BorderRadiusTight,
  display: "inline-block",
  flexShrink: 0,
  height: odysseyDesignTokens.Spacing6,
  width: odysseyDesignTokens.Spacing6,
}));

const StackedText = createOdysseyStyledComponent({ tag: "div" })(() => ({
  display: "flex",
  flexDirection: "column",
}));

const FlagList = createOdysseyStyledComponent({ tag: "div" })(
  ({ odysseyDesignTokens }) => ({
    display: "flex",
    flexDirection: "column",
    gap: odysseyDesignTokens.Spacing1,
  }),
);

// Storybook caps docs content at 1000px, too narrow for ten columns. The review
// table breaks out to the viewport width so it reads without sideways scrolling.
const FullWidthArea = createOdysseyStyledComponent({ tag: "div" })(() => ({
  insetInlineStart: "50%",
  position: "relative",
  transform: "translateX(-50%)",
  width: "calc(100vw - 64px)",
}));

const FamilySection = createOdysseyStyledComponent({ tag: "section" })(
  ({ odysseyDesignTokens }) => ({
    marginBlockEnd: odysseyDesignTokens.Spacing6,
  }),
);

const ColorValue = ({ hex, hsb }: { hex: string; hsb?: Hsb }) => (
  <SwatchCell>
    <Swatch swatchColor={hex} />
    <StackedText>
      <Typography>{formatHsb({ hsb })}</Typography>
      <Typography color="textSecondary" variant="support">
        {hex.toLowerCase()}
      </Typography>
    </StackedText>
  </SwatchCell>
);

const columns: DataTableColumn<PrimitiveTokenRow>[] = [
  {
    accessorKey: "tokenName",
    size: 170,
    header: "Token name",
  },
  {
    accessorKey: "lightHex",
    Cell: ({ row }) => (
      <ColorValue hex={row.original.lightHex} hsb={row.original.lightHsb} />
    ),
    header: "Light HSB",
  },
  {
    accessorKey: "darkHex",
    Cell: ({ row }) => (
      <ColorValue hex={row.original.darkHex} hsb={row.original.darkHsb} />
    ),
    header: "Dark mode HSB",
  },
  {
    accessorKey: "saturationChange",
    size: 150,
    Cell: ({ row }) => {
      const saturationChange = row.original.saturationChange;

      return (
        <StackedText>
          <Typography>
            {formatSigned({ unit: " pts", value: saturationChange?.points })}
          </Typography>
          <Typography color="textSecondary" variant="support">
            {saturationChange?.relativePercent === undefined
              ? "n/a (light is 0)"
              : formatSigned({
                  unit: "%",
                  value: saturationChange.relativePercent,
                })}
          </Typography>
        </StackedText>
      );
    },
    header: "Saturation change",
  },
  {
    accessorKey: "hueChange",
    size: 110,
    Cell: ({ row }) => (
      <Typography>
        {row.original.lightHsb?.saturation === 0
          ? "n/a (gray)"
          : formatSigned({ unit: "°", value: row.original.hueChange })}
      </Typography>
    ),
    header: "Δ Hue",
  },
  {
    accessorKey: "brightnessChange",
    size: 120,
    Cell: ({ row }) => (
      <Typography>
        {formatSigned({ unit: " pts", value: row.original.brightnessChange })}
      </Typography>
    ),
    header: "Δ Brightness",
  },
  {
    accessorKey: "lightHsb",
    size: 130,
    Cell: ({ row }) => (
      <Typography>
        {row.original.lightHsb?.alpha ?? "–"}% /{" "}
        {row.original.darkHsb?.alpha ?? "–"}%
      </Typography>
    ),
    header: "Transparency (light / dark)",
  },
  {
    accessorKey: "contrastLight",
    size: 110,
    Cell: ({ row }) => (
      <Typography>
        {formatContrast({ ratio: row.original.contrastLight })}
      </Typography>
    ),
    header: "Contrast light",
  },
  {
    accessorKey: "contrastDark",
    size: 110,
    Cell: ({ row }) => (
      <Typography>
        {formatContrast({ ratio: row.original.contrastDark })}
      </Typography>
    ),
    header: "Contrast dark",
  },
  {
    accessorKey: "flags",
    size: 280,
    Cell: ({ row }) => (
      <FlagList>
        {row.original.flags.map((flag) => (
          <Status key={flag} label={flag} severity="warning" />
        ))}
      </FlagList>
    ),
    header: "Flags",
  },
];

const availableLayouts = ["table" as const];
const tableLayoutOptions = {
  columns,
  hasSorting: false,
};

const PrimitiveTokenTables = () =>
  primitiveTokenFamilies.map(({ family, rows }) => (
    <FamilySection key={family}>
      <Typography variant="h4">
        hue.{getDottedFamilyName({ family })}
      </Typography>
      <DataView
        availableLayouts={availableLayouts}
        getData={() => rows}
        getRowId={({ tokenName }) => tokenName}
        tableLayoutOptions={tableLayoutOptions}
      />
    </FamilySection>
  ));

const DarkModeTokenReview = () => (
  <FullWidthArea>
    <Tabs
      tabs={[
        {
          children: <PrimitiveTokenTables />,
          label: "Primitives",
          value: "primitives",
        },
        {
          children: <ComponentTokenReview />,
          label: "Components",
          value: "components",
        },
        {
          children: <UiShellReview />,
          label: "UiShell",
          value: "ui-shell",
        },
        {
          children: <DarkModeAuditReport />,
          label: "Audit",
          value: "audit",
        },
      ]}
    />
  </FullWidthArea>
);

const MemoizedDarkModeTokenReview = memo(DarkModeTokenReview);
MemoizedDarkModeTokenReview.displayName = "DarkModeTokenReview";

export { MemoizedDarkModeTokenReview as DarkModeTokenReview };
