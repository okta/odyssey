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
  Status,
  type StatusProps,
  Typography,
} from "@okta/odyssey-react-mui";
import { memo, type ReactNode } from "react";

import {
  calculateContrastRatio,
  calculateRelativeLuminance,
  getBlendedHex,
} from "./colorMath.js";
import {
  CellRow,
  PairingTable,
  Swatch,
  TableScrollArea,
} from "./reviewTableStyles.js";

type Verdict = "pass" | "attention" | "fail";
type Severity = "high" | "medium" | "low";

const VERDICT_STATUS: Record<
  Verdict,
  { label: string; severity: StatusProps["severity"] }
> = {
  attention: { label: "Needs attention", severity: "warning" },
  fail: { label: "Fail", severity: "error" },
  pass: { label: "Pass", severity: "success" },
};

const SEVERITY_STATUS: Record<
  Severity,
  { label: string; severity: StatusProps["severity"] }
> = {
  high: { label: "High", severity: "error" },
  low: { label: "Low", severity: "info" },
  medium: { label: "Medium", severity: "warning" },
};

// The backdrop is written as a literal in `theme/components/Backdrop.tsx`, not a
// token, so the report restates it to measure what a Dialog sits on.
const BACKDROP_RGBA = { alpha: 0.75, blue: 33, green: 29, red: 29 };
const RECOMMENDED_DARK_BACKDROP_RGBA = {
  alpha: 0.6,
  blue: 0,
  green: 0,
  red: 0,
};

const toHexChannel = ({ channel }: { channel: number }) =>
  Math.round(channel).toString(16).padStart(2, "0");

const getRgbaHex = ({
  rgba,
}: {
  rgba: { alpha: number; blue: number; green: number; red: number };
}) =>
  `#${[rgba.red, rgba.green, rgba.blue].map((channel) => toHexChannel({ channel })).join("")}${toHexChannel({ channel: rgba.alpha * 255 })}`;

// CIE L*, perceived lightness from 0 (black) to 100 (white). The elevation rule
// asks for steps "5 to 8% lighter", and L* is the scale on which a percentage
// step looks the same at the dark and light ends.
const getPerceivedLightness = ({ hex }: { hex: string }) => {
  const luminance = calculateRelativeLuminance({ hex }) ?? 0;

  return luminance > 216 / 24389
    ? 116 * Math.cbrt(luminance) - 16
    : (24389 / 27) * luminance;
};

const formatRatio = ({ ratio }: { ratio?: number }) =>
  ratio === undefined ? "–" : `${ratio.toFixed(2)}:1`;

const formatLightness = ({ hex }: { hex: string }) =>
  getPerceivedLightness({ hex }).toFixed(1);

const getContrast = ({
  backgroundHex,
  foregroundHex,
}: {
  backgroundHex: string;
  foregroundHex: string;
}) => calculateContrastRatio({ backgroundHex, foregroundHex });

const dark = DarkTokens;
const light = LightTokens;

const darkBackdropOverPage =
  getBlendedHex({
    backgroundHex: dark.HueNeutral50,
    foregroundHex: getRgbaHex({ rgba: BACKDROP_RGBA }),
  }) ?? dark.HueNeutral50;

const lightBackdropOverPage =
  getBlendedHex({
    backgroundHex: light.HueNeutral50,
    foregroundHex: getRgbaHex({ rgba: BACKDROP_RGBA }),
  }) ?? light.HueNeutral50;

const recommendedDarkBackdropOverPage =
  getBlendedHex({
    backgroundHex: dark.HueNeutral50,
    foregroundHex: getRgbaHex({ rgba: RECOMMENDED_DARK_BACKDROP_RGBA }),
  }) ?? dark.HueNeutral50;

const measurements = {
  baseToRaisedStep:
    getPerceivedLightness({ hex: dark.HueNeutralWhite }) -
    getPerceivedLightness({ hex: dark.HueNeutral50 }),
  darkDialogOnBackdrop: getContrast({
    backgroundHex: darkBackdropOverPage,
    foregroundHex: dark.HueNeutralWhite,
  }),
  lightDialogOnBackdrop: getContrast({
    backgroundHex: lightBackdropOverPage,
    foregroundHex: light.HueNeutralWhite,
  }),
  primaryMainOnElevated: getContrast({
    backgroundHex: dark.HueNeutral100,
    foregroundHex: dark.PalettePrimaryMain,
  }),
  raisedToElevatedStep:
    getPerceivedLightness({ hex: dark.HueNeutral100 }) -
    getPerceivedLightness({ hex: dark.HueNeutralWhite }),
};

const SURFACE_ROLES: Array<{
  role: string;
  tokenKey:
    | "HueNeutral50"
    | "HueNeutralWhite"
    | "HueNeutral100"
    | "HueNeutral900";
  tokenName: string;
  usedBy: string;
}> = [
  {
    role: "Base (canvas)",
    tokenKey: "HueNeutral50",
    tokenName: "hue.neutral.50",
    usedBy: "Page background, UI Shell app area",
  },
  {
    role: "Raised",
    tokenKey: "HueNeutralWhite",
    tokenName: "hue.neutral.white",
    usedBy: "Card, Surface, Paper, inputs, side nav",
  },
  {
    role: "Elevated",
    tokenKey: "HueNeutral100",
    tokenName: "hue.neutral.100",
    usedBy: "Menu and list hover, Autocomplete options",
  },
  {
    role: "Overlay",
    tokenKey: "HueNeutralWhite",
    tokenName: "hue.neutral.white",
    usedBy: "Dialog, Drawer, Menu, Popover (via palette.background.paper)",
  },
  {
    role: "Tooltip",
    tokenKey: "HueNeutral900",
    tokenName: "hue.neutral.900",
    usedBy: "Tooltip background",
  },
];

const SCORECARD: Array<{
  criterion: string;
  note: string;
  verdict: Verdict;
}> = [
  {
    criterion: "1a. Canvas base avoids pure black",
    note: `Base is ${dark.HueNeutral50}, L* ${formatLightness({ hex: dark.HueNeutral50 })}. Inside the #0A0A0A to #161616 range, at its dark end, and strongly blue-tinted.`,
    verdict: "attention",
  },
  {
    criterion: "1b. Elevation by luminance step-ups",
    note: `Base to raised is ${measurements.baseToRaisedStep.toFixed(1)} L*, under the 5 to 8 target. Dark shadows are black at 40% on a near-black page, so they add almost nothing.`,
    verdict: "fail",
  },
  {
    criterion: "1c. At least 4 distinct surface levels",
    note: "Overlays reuse the raised token, so only 3 levels exist. A Dialog is the same color as a card.",
    verdict: "fail",
  },
  {
    criterion: "2a. Front surfaces lighter than background",
    note: "Card is lighter than page in both modes. But the dark ramp is out of order (white sits between 50 and 100), and light 'elevated' is darker than raised.",
    verdict: "attention",
  },
  {
    criterion: "2b. Components use semantic surface tokens",
    note: "There are no surface tokens. Components read raw scale steps (hue.neutral.50, .white, .100) and a hard-coded backdrop color.",
    verdict: "fail",
  },
  {
    criterion: "3a. Text and essential UI at WCAG AA",
    note: `All text roles pass on every surface. Non-text accents do not: primary.main on an elevated surface is ${formatRatio({ ratio: measurements.primaryMainOnElevated })}, under 3:1.`,
    verdict: "attention",
  },
  {
    criterion: "3b. Off-white body text, no pure white",
    note: `Body text is ${dark.TypographyColorBody}, L* ${formatLightness({ hex: dark.TypographyColorBody })}. Inside the #E0E0E0 to #F0F0F0 band, at its bright edge.`,
    verdict: "pass",
  },
  {
    criterion: "4. Accents re-mapped for dark",
    note: "Accent text is re-derived and reads well. Accent fills (palette.*.main) are near copies of light, and their hover and pressed steps collapse into one color.",
    verdict: "fail",
  },
];

type Issue = {
  detail: ReactNode;
  severity: Severity;
  title: string;
};

const ISSUE_GROUPS: Array<{ groupName: string; issues: Issue[] }> = [
  {
    groupName: "1. Surface elevation and canvas",
    issues: [
      {
        detail: (
          <>
            Overlays use <code>hue.neutral.white</code>, the same token as a
            card. The backdrop is a hard-coded{" "}
            <code>rgba(29, 29, 33, 0.75)</code>, a mid gray that{" "}
            <em>lightens</em> the dark page to {darkBackdropOverPage}. A dark
            Dialog then sits at{" "}
            {formatRatio({ ratio: measurements.darkDialogOnBackdrop })} against
            the backdrop, so its edge disappears. In light the same pair is{" "}
            {formatRatio({ ratio: measurements.lightDialogOnBackdrop })}.
          </>
        ),
        severity: "high",
        title: "Dialog and Drawer blend into the backdrop",
      },
      {
        detail: (
          <>
            A card is {measurements.baseToRaisedStep.toFixed(1)} L* above the
            page. The rule asks for 5 to 8. Cards read as flat, and the black
            shadows that would separate them in light mode are invisible here.
            Raised to elevated is {measurements.raisedToElevatedStep.toFixed(1)}{" "}
            L*, at the top of the range, so the steps are uneven.
          </>
        ),
        severity: "medium",
        title: "The page-to-card step is too small",
      },
      {
        detail: (
          <>
            The page is {dark.HueNeutral50} at L*{" "}
            {formatLightness({ hex: dark.HueNeutral50 })}, inside the target
            range but at its darkest. It also carries 35% saturation, which
            reads as navy next to neutral grays and accent fills.
          </>
        ),
        severity: "low",
        title: "The canvas is at the dark limit and blue-tinted",
      },
    ],
  },
  {
    groupName: "2. Light-to-dark mapping",
    issues: [
      {
        detail: (
          <>
            No surface roles exist as tokens. The theme overrides read raw steps
            such as <code>HueNeutral50</code>, <code>HueNeutralWhite</code> and{" "}
            <code>HueNeutral100</code> directly, about 140 times. Each dark fix
            so far (the Status lamp, the Tag page text) had to branch inside a
            component, because there was no role-level token to remap once.
          </>
        ),
        severity: "high",
        title: "Components consume raw scale steps, not semantic surfaces",
      },
      {
        detail: (
          <>
            In dark, <code>hue.neutral.white</code> ({dark.HueNeutralWhite})
            sits between <code>.50</code> and <code>.100</code>, so the ramp is
            out of order. In light, <code>.100</code> is darker than the card;
            in dark it is lighter. Components that pick colors by &ldquo;page or
            card&rdquo; (Tag, Status, Input, Table) end up with different
            relative weights in each mode.
          </>
        ),
        severity: "medium",
        title: "The neutral ramp doesn't map one-to-one between modes",
      },
    ],
  },
  {
    groupName: "3. Text and accessibility",
    issues: [
      {
        detail: (
          <>
            <code>palette.primary.main</code> is used for focus rings, the
            selected tab indicator and icons. On the elevated surface it is{" "}
            {formatRatio({ ratio: measurements.primaryMainOnElevated })}, under
            the 3:1 non-text minimum. It passes on the page and on a card.
          </>
        ),
        severity: "high",
        title: "Primary indicator fails on elevated surfaces",
      },
      {
        detail: (
          <>
            The dark tooltip is {dark.HueNeutral900}, a near-white block on a
            near-black interface. Its text contrast is fine, but it is the
            brightest thing on screen, which is exactly the glare the halation
            rule tries to avoid.
          </>
        ),
        severity: "medium",
        title: "The tooltip inverts to a bright slab",
      },
      {
        detail: (
          <>
            Body, support, subordinate and every status text color pass 4.5:1 on
            the page, a card and an elevated surface. Body text is off-white,
            not pure white. Disabled text is below 4.5:1, which is allowed.
          </>
        ),
        severity: "low",
        title: "Text tokens pass (no action needed)",
      },
    ],
  },
  {
    groupName: "4. Accent and brand colors",
    issues: [
      {
        detail: (
          <>
            <code>palette.primary.main</code> goes from{" "}
            {light.PalettePrimaryMain} to {dark.PalettePrimaryMain}: the same
            lightness and saturation, a copy rather than a re-mapping. Danger,
            success and warning do the same. And <code>.dark</code> and{" "}
            <code>.darker</code> are both {dark.PalettePrimaryDark}, almost
            identical to <code>.main</code>, so buttons lose their hover and
            pressed states.
          </>
        ),
        severity: "high",
        title: "Accent fills are copied from light, and states collapse",
      },
      {
        detail: (
          <>
            <code>palette.*.text</code> was re-derived for dark (lightness up
            from about 47 to 75). It loses saturation instead of gaining the +10
            to 20% the rule suggests, but it still reads as its hue and passes
            on every surface. Keep it.
          </>
        ),
        severity: "low",
        title: "Accent text deviates from the rule, but works",
      },
    ],
  },
];

type RemapCheck = {
  backgroundHex: string;
  foregroundHex: string;
  label: string;
  minimumRatio?: number;
};

type Remap = {
  currentDark: string;
  currentLight: string;
  getChecks: (args: { recommendedHex: string }) => RemapCheck[];
  recommendedDark: string;
  tokenName: string;
};

// WCAG AA: 4.5:1 for text, 3:1 for icons, focus rings and other indicators.
const TEXT_MINIMUM = 4.5;
const NON_TEXT_MINIMUM = 3;

const getTextChecks = ({ recommendedHex }: { recommendedHex: string }) => [
  {
    backgroundHex: recommendedHex,
    foregroundHex: dark.TypographyColorBody,
    label: "Body",
    minimumRatio: TEXT_MINIMUM,
  },
  {
    backgroundHex: recommendedHex,
    foregroundHex: dark.TypographyColorSubordinate,
    label: "Subordinate",
    minimumRatio: TEXT_MINIMUM,
  },
];

const getWhiteLabelCheck = ({
  recommendedHex,
}: {
  recommendedHex: string;
}) => ({
  backgroundHex: recommendedHex,
  foregroundHex: "#ffffff",
  label: "White label",
  minimumRatio: TEXT_MINIMUM,
});

const getIndicatorChecks = ({ recommendedHex }: { recommendedHex: string }) => [
  {
    backgroundHex: dark.HueNeutral50,
    foregroundHex: recommendedHex,
    label: "On page",
    minimumRatio: NON_TEXT_MINIMUM,
  },
  {
    backgroundHex: dark.HueNeutral100,
    foregroundHex: recommendedHex,
    label: "On elevated",
    minimumRatio: NON_TEXT_MINIMUM,
  },
];

const REMAPS: Remap[] = [
  {
    currentDark: dark.HueNeutral50,
    currentLight: light.HueNeutral50,
    getChecks: getTextChecks,
    recommendedDark: "#111317",
    tokenName: "surface.base (from hue.neutral.50)",
  },
  {
    currentDark: dark.HueNeutralWhite,
    currentLight: light.HueNeutralWhite,
    getChecks: getTextChecks,
    recommendedDark: "#1c1f25",
    tokenName: "surface.raised (from hue.neutral.white)",
  },
  {
    currentDark: dark.HueNeutral100,
    currentLight: light.HueNeutral100,
    getChecks: getTextChecks,
    recommendedDark: "#25282e",
    tokenName: "surface.elevated (from hue.neutral.100)",
  },
  {
    currentDark: dark.HueNeutralWhite,
    currentLight: light.HueNeutralWhite,
    // Surface separation has no WCAG minimum, so it is shown for comparison
    // with today's figure and does not decide the result.
    getChecks: ({ recommendedHex }) => [
      ...getTextChecks({ recommendedHex }),
      {
        backgroundHex: recommendedDarkBackdropOverPage,
        foregroundHex: recommendedHex,
        label: `Edge vs backdrop (now ${formatRatio({ ratio: measurements.darkDialogOnBackdrop })})`,
      },
    ],
    recommendedDark: dark.HueNeutral100,
    tokenName: "surface.overlay (new)",
  },
  {
    currentDark: getRgbaHex({ rgba: BACKDROP_RGBA }),
    currentLight: getRgbaHex({ rgba: BACKDROP_RGBA }),
    getChecks: () => [
      {
        backgroundHex: recommendedDarkBackdropOverPage,
        foregroundHex: dark.HueNeutral100,
        label: `Overlay edge (now ${formatRatio({ ratio: measurements.darkDialogOnBackdrop })})`,
      },
    ],
    recommendedDark: getRgbaHex({ rgba: RECOMMENDED_DARK_BACKDROP_RGBA }),
    tokenName: "backdrop (new)",
  },
  {
    currentDark: dark.PalettePrimaryMain,
    currentLight: light.PalettePrimaryMain,
    getChecks: getIndicatorChecks,
    recommendedDark: dark.HueBlue500,
    tokenName: "palette.primary.indicator (new: focus, icons, tab indicator)",
  },
  {
    currentDark: dark.PalettePrimaryMain,
    currentLight: light.PalettePrimaryMain,
    getChecks: ({ recommendedHex }) => [getWhiteLabelCheck({ recommendedHex })],
    recommendedDark: dark.PalettePrimaryMain,
    tokenName: "palette.primary.main (keep as the button fill)",
  },
  {
    currentDark: dark.PalettePrimaryDark,
    currentLight: light.PalettePrimaryDark,
    getChecks: ({ recommendedHex }) => [getWhiteLabelCheck({ recommendedHex })],
    recommendedDark: dark.HueBlue400,
    tokenName: "palette.primary.dark (hover, from hue.blue.400)",
  },
  {
    currentDark: dark.PalettePrimaryDarker,
    currentLight: light.PalettePrimaryDarker,
    getChecks: ({ recommendedHex }) => [getWhiteLabelCheck({ recommendedHex })],
    recommendedDark: dark.HueBlue300,
    tokenName: "palette.primary.darker (pressed, from hue.blue.300)",
  },
  {
    currentDark: dark.PaletteDangerMain,
    currentLight: light.PaletteDangerMain,
    getChecks: getIndicatorChecks,
    recommendedDark: dark.HueRed500,
    tokenName: "palette.danger.indicator (new)",
  },
  {
    currentDark: dark.PaletteSuccessMain,
    currentLight: light.PaletteSuccessMain,
    getChecks: getIndicatorChecks,
    recommendedDark: "#2f9e5c",
    tokenName: "palette.success.indicator (new)",
  },
  {
    currentDark: dark.HueNeutral900,
    currentLight: light.HueNeutral900,
    getChecks: ({ recommendedHex }) => [
      {
        backgroundHex: recommendedHex,
        foregroundHex: dark.TypographyColorBody,
        label: "Body",
        minimumRatio: TEXT_MINIMUM,
      },
    ],
    recommendedDark: dark.HueNeutral200,
    tokenName: "tooltip.background (new)",
  },
];

const getRemapVerdict = ({ checks }: { checks: RemapCheck[] }) => {
  const gatedChecks = checks.filter(
    ({ minimumRatio }) => minimumRatio !== undefined,
  );

  if (gatedChecks.length === 0) {
    return undefined;
  }

  return gatedChecks.every(
    ({ backgroundHex, foregroundHex, minimumRatio = 0 }) =>
      (getContrast({ backgroundHex, foregroundHex }) ?? 0) >= minimumRatio,
  )
    ? "pass"
    : "fail";
};

const NEXT_STEPS: Array<{ detail: string; title: string }> = [
  {
    detail:
      "Add surface.base, surface.raised, surface.elevated and surface.overlay, plus backdrop and tooltip.background. Point light at today's values, so light mode does not change. Move Dialog, Drawer, Menu and Popover onto surface.overlay. This fixes the vanishing Dialog edge, gives you four levels, and lets later dark fixes be one token change instead of a component branch.",
    title: "Introduce semantic surface tokens",
  },
  {
    detail:
      "If the surface tokens wait for the larger token project, make the dark backdrop a darker black (about 60%) on its own. It is an isolated change and restores the Dialog edge right away.",
    title: "Darken the dark backdrop now",
  },
  {
    detail:
      "Keep palette.*.main as the button fill, where white labels need it dark. Add an indicator role, one step lighter, for focus rings, icons and the tab indicator. Give dark and darker their own steps (hue.blue.400 and .300) so hover and pressed are visible. They go darker and more muted rather than lighter, because a lighter blue drops the white label under 4.5:1.",
    title: "Split accent fills from accent indicators",
  },
  {
    detail:
      "Lower the canvas saturation, raise the card about 6 L* above the page, and keep the ramp in order (white above 50, below 100). Do this with the larger token project and the Figma variables, since it moves every surface.",
    title: "Rebalance the dark neutral ramp",
  },
  {
    detail:
      "Use a mid-gray surface with body text instead of the near-white inversion.",
    title: "Give the dark tooltip a surface",
  },
  {
    detail:
      "Text tokens, accent text, the disabled mapping, and the Tag and Status fixes already pass. Leave them as they are.",
    title: "Keep what works",
  },
];

const ReportSection = createOdysseyStyledComponent({ tag: "section" })(
  ({ odysseyDesignTokens }) => ({
    display: "flex",
    flexDirection: "column",
    gap: odysseyDesignTokens.Spacing3,
    marginBlockStart: odysseyDesignTokens.Spacing7,
  }),
);

const IssueList = createOdysseyStyledComponent({ tag: "ol" })(
  ({ odysseyDesignTokens }) => ({
    display: "flex",
    flexDirection: "column",
    gap: odysseyDesignTokens.Spacing4,
    margin: 0,
    paddingInlineStart: odysseyDesignTokens.Spacing5,

    "& code": {
      fontFamily: odysseyDesignTokens.TypographyFamilyMono,
    },
  }),
);

const ColorValue = ({ hex }: { hex: string }) => (
  <CellRow>
    <Swatch swatchColor={hex} />
    <code>{hex.toLowerCase()}</code>
  </CellRow>
);

const VerdictStatus = ({ verdict }: { verdict: Verdict }) => (
  <Status
    label={VERDICT_STATUS[verdict].label}
    severity={VERDICT_STATUS[verdict].severity}
  />
);

const DarkModeAuditReport = () => (
  <>
    <ReportSection>
      <Typography variant="h2">Executive summary</Typography>
      <Typography>
        Dark mode text is in good shape: every text role passes WCAG AA on every
        surface, and body text is off-white. The weak spot is surfaces. Overlays
        share the card color and sit on a backdrop that lightens the page, so a
        Dialog has no visible edge. The page-to-card step is too small, and
        there are no semantic surface tokens, which is why each fix so far has
        been a component-level patch. Accent fills are near copies of light, so
        indicators fail on elevated surfaces and hover and pressed states
        disappear.
      </Typography>
      <Typography color="textSecondary" variant="support">
        All current values and ratios on this tab are computed from the built
        tokens, so they update when tokens change. Recommended values are
        proposals only; nothing here has been applied.
      </Typography>
      <TableScrollArea>
        <PairingTable>
          <thead>
            <tr>
              <th>Criterion</th>
              <th>Result</th>
              <th>Why</th>
            </tr>
          </thead>
          <tbody>
            {SCORECARD.map(({ criterion, note, verdict }) => (
              <tr key={criterion}>
                <td>{criterion}</td>
                <td>
                  <VerdictStatus verdict={verdict} />
                </td>
                <td>{note}</td>
              </tr>
            ))}
          </tbody>
        </PairingTable>
      </TableScrollArea>
    </ReportSection>

    <ReportSection>
      <Typography variant="h2">Surface levels today</Typography>
      <TableScrollArea>
        <PairingTable>
          <thead>
            <tr>
              <th>Role</th>
              <th>Token</th>
              <th>Light</th>
              <th>Dark</th>
              <th>Dark L*</th>
              <th>Body text on it (dark)</th>
              <th>Used by</th>
            </tr>
          </thead>
          <tbody>
            {SURFACE_ROLES.map(({ role, tokenKey, tokenName, usedBy }) => (
              <tr key={role}>
                <td>{role}</td>
                <td>
                  <code>{tokenName}</code>
                </td>
                <td>
                  <ColorValue hex={light[tokenKey]} />
                </td>
                <td>
                  <ColorValue hex={dark[tokenKey]} />
                </td>
                <td>{formatLightness({ hex: dark[tokenKey] })}</td>
                <td>
                  {tokenKey === "HueNeutral900"
                    ? "Uses inverse text"
                    : formatRatio({
                        ratio: getContrast({
                          backgroundHex: dark[tokenKey],
                          foregroundHex: dark.TypographyColorBody,
                        }),
                      })}
                </td>
                <td>{usedBy}</td>
              </tr>
            ))}
          </tbody>
        </PairingTable>
      </TableScrollArea>
    </ReportSection>

    <ReportSection>
      <Typography variant="h2">Issues</Typography>
      {ISSUE_GROUPS.map(({ groupName, issues }) => (
        <div key={groupName}>
          <Typography variant="h4">{groupName}</Typography>
          <IssueList>
            {issues.map(({ detail, severity, title }) => (
              <li key={title}>
                <CellRow>
                  <Status
                    label={SEVERITY_STATUS[severity].label}
                    severity={SEVERITY_STATUS[severity].severity}
                  />
                  <strong>{title}</strong>
                </CellRow>
                <Typography>{detail}</Typography>
              </li>
            ))}
          </IssueList>
        </div>
      ))}
    </ReportSection>

    <ReportSection>
      <Typography variant="h2">Proposed token remapping</Typography>
      <Typography color="textSecondary">
        Light values stay as they are. &ldquo;New&rdquo; means the token does
        not exist yet. Checks are measured against the dark page unless the row
        says otherwise.
      </Typography>
      <TableScrollArea>
        <PairingTable>
          <thead>
            <tr>
              <th>Token</th>
              <th>Current light</th>
              <th>Current dark</th>
              <th>Recommended dark</th>
              <th>Contrast check</th>
              <th>Result</th>
            </tr>
          </thead>
          <tbody>
            {REMAPS.map(
              ({
                getChecks,
                currentDark,
                currentLight,
                recommendedDark,
                tokenName,
              }) => {
                const checks = getChecks({ recommendedHex: recommendedDark });
                const verdict = getRemapVerdict({ checks });

                return (
                  <tr key={tokenName}>
                    <td>
                      <code>{tokenName}</code>
                    </td>
                    <td>
                      <ColorValue hex={currentLight} />
                    </td>
                    <td>
                      <ColorValue hex={currentDark} />
                    </td>
                    <td>
                      <ColorValue hex={recommendedDark} />
                    </td>
                    <td>
                      {checks.map(
                        ({
                          backgroundHex,
                          foregroundHex,
                          label,
                          minimumRatio,
                        }) => (
                          <div key={label}>
                            {label}{" "}
                            {formatRatio({
                              ratio: getContrast({
                                backgroundHex,
                                foregroundHex,
                              }),
                            })}
                            {minimumRatio === undefined
                              ? ""
                              : ` (needs ${minimumRatio}:1)`}
                          </div>
                        ),
                      )}
                    </td>
                    <td>
                      {verdict === undefined ? (
                        "No WCAG minimum"
                      ) : (
                        <VerdictStatus verdict={verdict} />
                      )}
                    </td>
                  </tr>
                );
              },
            )}
          </tbody>
        </PairingTable>
      </TableScrollArea>
      <Typography color="textSecondary" variant="support">
        Trade-off on accents: a lighter primary fill would fix the indicators,
        but white labels on it drop to about 3.5:1. That is why the proposal
        keeps <code>main</code> as the button fill and adds a separate indicator
        role instead of brightening <code>main</code>.
      </Typography>
    </ReportSection>

    <ReportSection>
      <Typography variant="h2">Next steps, by impact</Typography>
      <IssueList>
        {NEXT_STEPS.map(({ detail, title }) => (
          <li key={title}>
            <strong>{title}</strong>
            <Typography>{detail}</Typography>
          </li>
        ))}
      </IssueList>
    </ReportSection>
  </>
);

const MemoizedDarkModeAuditReport = memo(DarkModeAuditReport);
MemoizedDarkModeAuditReport.displayName = "DarkModeAuditReport";

export { MemoizedDarkModeAuditReport as DarkModeAuditReport };
