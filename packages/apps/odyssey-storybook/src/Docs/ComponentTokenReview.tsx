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
  Banner,
  type BannerProps,
  type ColorScheme,
  createOdysseyStyledComponent,
  Link,
  OdysseyThemeProvider,
  Status,
  type StatusProps,
  Tabs,
  Tag,
  type TagProps,
  Toast,
  type ToastProps,
  Typography,
} from "@okta/odyssey-react-mui";
import { GroupIcon } from "@okta/odyssey-react-mui/icons";
import { Fragment, memo, type ReactNode } from "react";

import {
  calculateContrastRatio,
  getBlendedHex,
  getRgbaFromHex,
} from "./colorMath.js";
import {
  CellRow,
  PairingTable,
  Swatch,
  TableScrollArea,
} from "./reviewTableStyles.js";

type Surface = "page" | "card";
type ResolvedScheme = "light" | "dark";

/**
 * `text` is held to WCAG 1.4.3 (4.5:1). `nonText` covers icons, dots, borders, and indicators, held to WCAG 1.4.11 (3:1).
 */
type ElementKind = "text" | "nonText";

type TokenPairing = {
  backgroundAlphaToken?: string;
  backgroundToken: string;
  /**
   * The token a component uses in dark mode when it differs from the light one, such as a lamp dot remapped one step for contrast.
   */
  darkForegroundToken?: string;
  element: string;
  foregroundToken: string;
  kind: ElementKind;
  state: string;
};

type ComponentVariant = {
  getPairings: ({ surface }: { surface: Surface }) => TokenPairing[];
  renderPreview: () => ReactNode;
  variantName: string;
};

type ComponentSection = {
  componentName: string;
  summary: string;
  variants: ComponentVariant[];
};

type ResolvedPairing = {
  backgroundHex?: string;
  backgroundOpacity?: number;
  contrastRatio?: number;
  foregroundHex?: string;
};

// Anything that cannot appear in a readable fragment id, such as the spaces and
// comma in "Selected, resting, disabled". The global flag is needed because a
// variant name can hold several runs.
const NON_ANCHOR_CHARACTERS = /[^a-z0-9]+/g;

const tokensByScheme: Record<ResolvedScheme, Record<string, unknown>> = {
  dark: DarkTokens,
  light: LightTokens,
};

const SURFACE_TOKENS: Record<Surface, string> = {
  card: "hue.neutral.white",
  page: "hue.neutral.50",
};

const SCHEMES: Array<{ colorScheme: ResolvedScheme; label: string }> = [
  { colorScheme: "light", label: "Light" },
  { colorScheme: "dark", label: "Dark" },
];

const SURFACES: Array<{ label: string; surface: Surface }> = [
  { label: "On page", surface: "page" },
  { label: "On card", surface: "card" },
];

const MINIMUM_CONTRAST: Record<ElementKind, number> = {
  nonText: 3,
  text: 4.5,
};

// Style Dictionary flattens `palette.primary.heading` to `PalettePrimaryHeading`
// and `hue.accentOne.200` to `HueAccentOne200`.
const getBuildKey = ({ tokenPath }: { tokenPath: string }) =>
  tokenPath
    .split(".")
    .map((segment) => `${segment.charAt(0).toUpperCase()}${segment.slice(1)}`)
    .join("");

const resolveToken = ({
  colorScheme,
  tokenPath,
}: {
  colorScheme: ResolvedScheme;
  tokenPath: string;
}) => {
  const value = tokensByScheme[colorScheme][getBuildKey({ tokenPath })];

  return typeof value === "string" ? value : undefined;
};

const getForegroundToken = ({
  colorScheme,
  pairing,
}: {
  colorScheme: ResolvedScheme;
  pairing: TokenPairing;
}) =>
  colorScheme === "dark"
    ? (pairing.darkForegroundToken ?? pairing.foregroundToken)
    : pairing.foregroundToken;

const resolvePairing = ({
  colorScheme,
  pairing,
  surface,
}: {
  colorScheme: ResolvedScheme;
  pairing: TokenPairing;
  surface: Surface;
}): ResolvedPairing => {
  const foregroundHex = resolveToken({
    colorScheme,
    tokenPath: getForegroundToken({ colorScheme, pairing }),
  });
  const backgroundBaseHex = resolveToken({
    colorScheme,
    tokenPath: pairing.backgroundToken,
  });
  const backgroundAlpha = pairing.backgroundAlphaToken
    ? resolveToken({ colorScheme, tokenPath: pairing.backgroundAlphaToken })
    : undefined;
  const surfaceHex = resolveToken({
    colorScheme,
    tokenPath: SURFACE_TOKENS[surface],
  });

  // The theme builds a translucent fill by appending an alpha token to a hue,
  // `HueBlue50.concat(PaletteAlphaSemi)`, so the same string is rebuilt here and
  // composited over the surface, which is the color the user actually sees.
  const backgroundHex =
    backgroundBaseHex && backgroundAlpha && surfaceHex
      ? getBlendedHex({
          backgroundHex: surfaceHex,
          foregroundHex: `${backgroundBaseHex}${backgroundAlpha}`,
        })
      : backgroundBaseHex;

  const backgroundOpacity = backgroundBaseHex
    ? Math.round(
        (getRgbaFromHex({
          hex: `${backgroundBaseHex}${backgroundAlpha ?? ""}`,
        })?.alpha ?? 1) * 100,
      )
    : undefined;

  return {
    backgroundHex,
    backgroundOpacity,
    contrastRatio:
      foregroundHex && backgroundHex
        ? calculateContrastRatio({
            backgroundHex,
            foregroundHex,
          })
        : undefined,
    foregroundHex,
  };
};

const getVariantAnchorId = ({
  componentName,
  variantName,
}: {
  componentName: string;
  variantName: string;
}) =>
  `review-${componentName}-${variantName}`
    .toLowerCase()
    .replace(NON_ANCHOR_CHARACTERS, "-");

const doNothing = () => {};

const PreviewRow = createOdysseyStyledComponent({ tag: "div" })(
  ({ odysseyDesignTokens }) => ({
    alignItems: "center",
    display: "flex",
    flexWrap: "wrap",
    gap: odysseyDesignTokens.Spacing2,
  }),
);

const SurfaceColumns = createOdysseyStyledComponent({ tag: "div" })(
  ({ odysseyDesignTokens }) => ({
    display: "grid",
    gap: odysseyDesignTokens.Spacing5,
    gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
  }),
);

const SurfaceColumnContainer = createOdysseyStyledComponent({ tag: "div" })(
  ({ odysseyDesignTokens }) => ({
    display: "flex",
    flexDirection: "column",
    gap: odysseyDesignTokens.Spacing3,
    minWidth: 0,
  }),
);

const SchemeSectionContainer = createOdysseyStyledComponent({ tag: "div" })(
  ({ odysseyDesignTokens }) => ({
    display: "flex",
    flexDirection: "column",
    gap: odysseyDesignTokens.Spacing3,
    marginBlockStart: odysseyDesignTokens.Spacing5,
  }),
);

// The panel paints the surface from the tokens of the scheme it sits in, and the
// provider nested inside it detects contrast mode from that paint, the way an
// app does. That is what makes Tag and Status pick their page or card colors.
const SurfacePanel = createOdysseyStyledComponent({
  tag: "div",
  shouldForwardProp: (prop) => prop !== "surface",
})<{ surface: Surface }>(({ odysseyDesignTokens, surface }) => ({
  backgroundColor:
    surface === "page"
      ? odysseyDesignTokens.HueNeutral50
      : odysseyDesignTokens.HueNeutralWhite,
  border: `1px solid ${odysseyDesignTokens.HueNeutral200}`,
  borderRadius: odysseyDesignTokens.BorderRadiusTight,
  height: "100%",
  overflow: "hidden",
  padding: odysseyDesignTokens.Spacing4,
}));

const VariantSection = createOdysseyStyledComponent({ tag: "section" })(
  ({ odysseyDesignTokens }) => ({
    borderBlockStart: `2px solid ${odysseyDesignTokens.HueNeutral200}`,
    marginBlockStart: odysseyDesignTokens.Spacing8,
    paddingBlockStart: odysseyDesignTokens.Spacing5,
    scrollMarginBlockStart: odysseyDesignTokens.Spacing6,
  }),
);

const IndexNavigation = createOdysseyStyledComponent({ tag: "nav" })(
  ({ odysseyDesignTokens }) => ({
    backgroundColor: odysseyDesignTokens.HueNeutral50,
    borderRadius: odysseyDesignTokens.BorderRadiusMain,
    display: "grid",
    gap: odysseyDesignTokens.Spacing4,
    gridTemplateColumns: "repeat(5, minmax(0, 1fr))",
    marginBlockStart: odysseyDesignTokens.Spacing4,
    padding: odysseyDesignTokens.Spacing4,
  }),
);

const IndexList = createOdysseyStyledComponent({ tag: "ul" })(
  ({ odysseyDesignTokens }) => ({
    display: "flex",
    flexDirection: "column",
    gap: odysseyDesignTokens.Spacing1,
    listStyle: "none",
    margin: 0,
    marginBlockStart: odysseyDesignTokens.Spacing2,
    padding: 0,
  }),
);

const renderTags = ({
  colorVariant,
}: {
  colorVariant: NonNullable<TagProps["colorVariant"]>;
}) => (
  <PreviewRow>
    <Tag colorVariant={colorVariant} label="Resting" />
    <Tag colorVariant={colorVariant} icon={<GroupIcon />} label="Icon" />
    <Tag colorVariant={colorVariant} label="Clickable" onClick={doNothing} />
    <Tag colorVariant={colorVariant} label="Removable" onRemove={doNothing} />
    <Tag colorVariant={colorVariant} isDisabled label="Disabled" />
  </PreviewRow>
);

const renderStatuses = ({
  severity,
}: {
  severity: StatusProps["severity"];
}) => (
  <PreviewRow>
    <Status label="Lamp" severity={severity} variant="lamp" />
    <Status label="Pill" severity={severity} variant="pill" />
  </PreviewRow>
);

const renderBanner = ({ severity }: { severity: BannerProps["severity"] }) => (
  <Banner
    linkText="Learn more"
    linkUrl="#"
    onClose={doNothing}
    severity={severity}
    text="Banner message text."
  />
);

const renderToast = ({ severity }: { severity: ToastProps["severity"] }) => (
  <Toast
    isDismissable
    isVisible
    linkText="Learn more"
    linkUrl="#"
    severity={severity}
    text="Toast message text."
  />
);

const renderTabs = () => (
  <Tabs
    tabs={[
      { children: null, label: "Selected", value: "selected" },
      { children: null, label: "Resting", value: "resting-one" },
      { children: null, label: "Resting", value: "resting-two" },
      {
        children: null,
        isDisabled: true,
        label: "Disabled",
        value: "disabled",
      },
    ]}
  />
);

const getTagPairings = ({
  hueName,
  pageTextStep = "700",
  surface,
}: {
  hueName: string;
  pageTextStep?: string;
  surface: Surface;
}): TokenPairing[] => {
  const isPage = surface === "page";
  const fillToken = `hue.${hueName}.${isPage ? "200" : "100"}`;

  return [
    {
      backgroundToken: fillToken,
      darkForegroundToken: isPage ? `hue.${hueName}.800` : undefined,
      element: "Label text",
      foregroundToken: `hue.${hueName}.${isPage ? pageTextStep : "700"}`,
      kind: "text",
      state: "Resting",
    },
    {
      backgroundToken: fillToken,
      darkForegroundToken: isPage ? `hue.${hueName}.600` : undefined,
      element: "Remove icon",
      foregroundToken: `hue.${hueName}.500`,
      kind: "nonText",
      state: "Resting",
    },
    {
      backgroundToken: fillToken,
      element: "Label text",
      foregroundToken: `hue.${hueName}.${isPage ? "400" : "300"}`,
      kind: "text",
      state: "Disabled",
    },
    {
      backgroundToken: SURFACE_TOKENS[surface],
      element: "Border",
      foregroundToken: `hue.${hueName}.200`,
      kind: "nonText",
      state: "Clickable only",
    },
  ];
};

const getStatusPairings = ({
  cardPillBackgroundToken,
  cardPillTextToken,
  darkLampToken,
  lampToken,
  pagePillBackgroundToken,
  pagePillTextToken,
  surface,
}: {
  cardPillBackgroundToken: string;
  cardPillTextToken: string;
  darkLampToken?: string;
  lampToken: string;
  pagePillBackgroundToken: string;
  pagePillTextToken: string;
  surface: Surface;
}): TokenPairing[] => [
  {
    backgroundToken: SURFACE_TOKENS[surface],
    darkForegroundToken: darkLampToken,
    element: "Lamp dot",
    foregroundToken: lampToken,
    kind: "nonText",
    state: "Lamp",
  },
  {
    backgroundToken: SURFACE_TOKENS[surface],
    element: "Lamp label",
    foregroundToken: "typography.color.body",
    kind: "text",
    state: "Lamp",
  },
  {
    backgroundToken:
      surface === "page" ? pagePillBackgroundToken : cardPillBackgroundToken,
    element: "Pill label",
    foregroundToken: surface === "page" ? pagePillTextToken : cardPillTextToken,
    kind: "text",
    state: "Pill",
  },
];

const getAlertPairings = ({
  backgroundAlphaToken,
  borderToken,
  hueName,
  iconToken,
  paletteName,
  surface,
}: {
  backgroundAlphaToken?: string;
  borderToken: string;
  hueName: string;
  iconToken: string;
  paletteName: string;
  surface: Surface;
}): TokenPairing[] => {
  const backgroundToken = `hue.${hueName}.50`;

  return [
    {
      backgroundAlphaToken,
      backgroundToken,
      element: "Message text",
      foregroundToken: `palette.${paletteName}.heading`,
      kind: "text",
      state: "—",
    },
    {
      backgroundAlphaToken,
      backgroundToken,
      element: "Link and close icon",
      foregroundToken: "typography.color.body",
      kind: "text",
      state: "—",
    },
    {
      backgroundAlphaToken,
      backgroundToken,
      element: "Severity icon",
      foregroundToken: iconToken,
      kind: "nonText",
      state: "—",
    },
    // The border is the edge between the component and the surface around it,
    // so it is measured against that surface, not against its own fill.
    {
      backgroundToken: SURFACE_TOKENS[surface],
      element: "Border",
      foregroundToken: borderToken,
      kind: "nonText",
      state: "—",
    },
  ];
};

const SEVERITY_TOKENS = [
  {
    borderStep: "200",
    hueName: "blue",
    iconToken: "palette.primary.main",
    paletteName: "primary",
    severity: "info",
  },
  {
    borderStep: "200",
    hueName: "green",
    iconToken: "palette.success.main",
    paletteName: "success",
    severity: "success",
  },
  {
    borderStep: "500",
    hueName: "yellow",
    iconToken: "hue.yellow.400",
    paletteName: "warning",
    severity: "warning",
  },
  {
    borderStep: "200",
    hueName: "red",
    iconToken: "palette.danger.main",
    paletteName: "danger",
    severity: "error",
  },
] as const;

const componentSections: ComponentSection[] = [
  {
    componentName: "Tag",
    summary:
      "Solid backgrounds. Page and card use different steps because Tag reads the surface it sits on.",
    variants: (
      [
        { colorVariant: "default", hueName: "neutral" },
        { colorVariant: "info", hueName: "blue" },
        { colorVariant: "accentOne", hueName: "accentOne" },
        {
          colorVariant: "accentTwo",
          hueName: "accentTwo",
          pageTextStep: "800",
        },
        { colorVariant: "accentThree", hueName: "accentThree" },
        { colorVariant: "accentFour", hueName: "accentFour" },
      ] as const
    ).map(({ colorVariant, hueName, ...pairingOverrides }) => ({
      getPairings: ({ surface }) =>
        getTagPairings({ hueName, surface, ...pairingOverrides }),
      renderPreview: () => renderTags({ colorVariant }),
      variantName: colorVariant,
    })),
  },
  {
    componentName: "Tabs",
    summary:
      "No background of its own: every label sits directly on the page or card surface.",
    variants: [
      {
        getPairings: ({ surface }) =>
          [
            {
              element: "Selected label",
              foregroundToken: "typography.color.action",
              kind: "text" as const,
              state: "Selected",
            },
            {
              element: "Selected indicator",
              foregroundToken: "palette.primary.main",
              kind: "nonText" as const,
              state: "Selected",
            },
            {
              element: "Label",
              foregroundToken: "hue.neutral.600",
              kind: "text" as const,
              state: "Resting",
            },
            {
              element: "Label",
              foregroundToken: "typography.color.disabled",
              kind: "text" as const,
              state: "Disabled",
            },
          ].map((pairing) => ({
            ...pairing,
            backgroundToken: SURFACE_TOKENS[surface],
          })),
        renderPreview: renderTabs,
        variantName: "Selected, resting, disabled",
      },
    ],
  },
  {
    componentName: "Status",
    summary:
      "Lamp is a dot plus body text on the surface. Pill has a solid background whose tokens change between page and card.",
    variants: [
      {
        getPairings: ({ surface }) =>
          getStatusPairings({
            cardPillBackgroundToken: "hue.neutral.50",
            cardPillTextToken: "typography.color.subordinate",
            lampToken: "hue.neutral.600",
            pagePillBackgroundToken: "hue.neutral.200",
            pagePillTextToken: "hue.neutral.700",
            surface,
          }),
        renderPreview: () => renderStatuses({ severity: "default" }),
        variantName: "default",
      },
      ...(
        [
          {
            cardPillTextToken: "palette.primary.text",
            pagePillStep: "100",
            severityTokens: SEVERITY_TOKENS[0],
            textHueName: "blue",
          },
          {
            cardPillTextToken: "typography.color.success",
            pagePillStep: "200",
            severityTokens: SEVERITY_TOKENS[1],
            textHueName: "green",
          },
          {
            cardPillTextToken: "typography.color.warning",
            pagePillStep: "100",
            severityTokens: SEVERITY_TOKENS[2],
            textHueName: "yellow",
          },
          {
            cardPillTextToken: "typography.color.danger",
            pagePillStep: "100",
            severityTokens: SEVERITY_TOKENS[3],
            textHueName: "red",
          },
        ] as const
      ).map(
        ({
          cardPillTextToken,
          pagePillStep,
          severityTokens,
          textHueName,
        }): ComponentVariant => ({
          getPairings: ({ surface }) =>
            getStatusPairings({
              cardPillBackgroundToken: `palette.${severityTokens.paletteName}.lighter`,
              cardPillTextToken,
              darkLampToken:
                severityTokens.severity === "warning"
                  ? "hue.yellow.300"
                  : undefined,
              lampToken:
                severityTokens.severity === "warning"
                  ? "hue.yellow.200"
                  : `palette.${severityTokens.paletteName}.main`,
              pagePillBackgroundToken: `hue.${textHueName}.${pagePillStep}`,
              pagePillTextToken: `hue.${textHueName}.700`,
              surface,
            }),
          renderPreview: () =>
            renderStatuses({ severity: severityTokens.severity }),
          variantName: severityTokens.severity,
        }),
      ),
    ],
  },
  {
    componentName: "Banner",
    summary:
      "Solid background (hue.*.50). Everything in front of it is measured against that one fill.",
    variants: SEVERITY_TOKENS.map(
      ({ borderStep, hueName, iconToken, paletteName, severity }) => ({
        getPairings: ({ surface }) =>
          getAlertPairings({
            borderToken: `hue.${hueName}.${borderStep}`,
            hueName,
            iconToken,
            paletteName,
            surface,
          }),
        renderPreview: () => renderBanner({ severity }),
        variantName: severity,
      }),
    ),
  },
  {
    componentName: "Toast",
    summary:
      "The only translucent background here: hue.*.50 at palette.alpha.semi (BF, about 75%) with a backdrop blur. Contrast is measured on the blended color, over each surface.",
    variants: SEVERITY_TOKENS.map(
      ({ borderStep, hueName, iconToken, paletteName, severity }) => ({
        getPairings: ({ surface }) =>
          getAlertPairings({
            backgroundAlphaToken: "palette.alpha.semi",
            borderToken: `hue.${hueName}.${borderStep}`,
            hueName,
            iconToken,
            paletteName,
            surface,
          }),
        renderPreview: () => renderToast({ severity }),
        variantName: severity,
      }),
    ),
  },
];

// Token names stay unbroken inside a segment and may wrap only after a dot, so a
// long name like `typography.color.subordinate` fits a narrow column without
// splitting a word.
const TokenName = ({ tokenPath }: { tokenPath: string }) => (
  <code>
    {tokenPath.split(".").map((segment, index, segments) => (
      <Fragment key={`${segment}-${index}`}>
        {segment}
        {index < segments.length - 1 && (
          <>
            .<wbr />
          </>
        )}
      </Fragment>
    ))}
  </code>
);

const TokenCell = ({
  hex,
  note,
  tokenPath,
}: {
  hex?: string;
  note?: ReactNode;
  tokenPath: string;
}) => (
  <td>
    <CellRow>
      {hex ? (
        <Swatch swatchColor={hex} title={hex.toLowerCase()} />
      ) : (
        "Not found"
      )}
      <TokenName tokenPath={tokenPath} />
    </CellRow>
    {note}
  </td>
);

const ContrastCell = ({
  contrastRatio,
  kind,
}: {
  contrastRatio?: number;
  kind: ElementKind;
}) => {
  if (contrastRatio === undefined) {
    return <td>–</td>;
  }

  const isPassing = contrastRatio >= MINIMUM_CONTRAST[kind];

  return (
    <td>
      <CellRow>
        <strong>{contrastRatio.toFixed(2)}:1</strong>
        <Status
          label={isPassing ? "Pass" : "Fail"}
          severity={isPassing ? "success" : "error"}
        />
      </CellRow>
    </td>
  );
};

const PairingRows = ({
  colorScheme,
  pairings,
  surface,
}: {
  colorScheme: ResolvedScheme;
  pairings: TokenPairing[];
  surface: Surface;
}) => (
  <TableScrollArea>
    <PairingTable>
      <thead>
        <tr>
          <th>Element</th>
          <th>State</th>
          <th>Foreground</th>
          <th>Background</th>
          <th>Opacity</th>
          <th>Contrast</th>
        </tr>
      </thead>
      <tbody>
        {pairings.map((pairing) => {
          const resolved = resolvePairing({ colorScheme, pairing, surface });

          return (
            <tr key={`${pairing.element}-${pairing.state}`}>
              <td>
                {pairing.element}
                <Typography color="textSecondary" variant="support">
                  {pairing.kind === "text" ? "Text" : "Non-text"}, needs{" "}
                  {MINIMUM_CONTRAST[pairing.kind]}:1
                </Typography>
              </td>
              <td>{pairing.state}</td>
              <TokenCell
                hex={resolved.foregroundHex}
                note={
                  colorScheme === "dark" &&
                  pairing.darkForegroundToken &&
                  pairing.darkForegroundToken !== pairing.foregroundToken && (
                    <Typography color="textSecondary" variant="support">
                      Dark only. Light uses{" "}
                      <code>{pairing.foregroundToken}</code>
                    </Typography>
                  )
                }
                tokenPath={getForegroundToken({ colorScheme, pairing })}
              />
              <TokenCell
                hex={resolved.backgroundHex}
                note={
                  pairing.backgroundAlphaToken && (
                    <Typography color="textSecondary" variant="support">
                      at <code>{pairing.backgroundAlphaToken}</code>, swatch
                      shows the mix with the surface
                    </Typography>
                  )
                }
                tokenPath={pairing.backgroundToken}
              />
              <td>{resolved.backgroundOpacity ?? "–"}%</td>
              <ContrastCell
                contrastRatio={resolved.contrastRatio}
                kind={pairing.kind}
              />
            </tr>
          );
        })}
      </tbody>
    </PairingTable>
  </TableScrollArea>
);

const SchemeSurface = ({
  colorScheme,
  renderPreview,
  surface,
}: {
  colorScheme: ColorScheme;
  renderPreview: () => ReactNode;
  surface: Surface;
}) => (
  <OdysseyThemeProvider colorScheme={colorScheme}>
    <SurfacePanel surface={surface}>
      <OdysseyThemeProvider>{renderPreview()}</OdysseyThemeProvider>
    </SurfacePanel>
  </OdysseyThemeProvider>
);

const SchemeSection = ({
  colorScheme,
  getPairings,
  label,
  renderPreview,
}: {
  colorScheme: ResolvedScheme;
  getPairings: ComponentVariant["getPairings"];
  label: string;
  renderPreview: () => ReactNode;
}) => (
  <SchemeSectionContainer>
    <Typography variant="h3">{label}</Typography>
    <SurfaceColumns>
      {SURFACES.map(({ label: surfaceLabel, surface }) => (
        <SurfaceColumnContainer key={surface}>
          <div>
            <Typography variant="h4">{surfaceLabel}</Typography>
            <Typography color="textSecondary" variant="support">
              Background <code>{SURFACE_TOKENS[surface]}</code>
            </Typography>
          </div>
          <SchemeSurface
            colorScheme={colorScheme}
            renderPreview={renderPreview}
            surface={surface}
          />
          <PairingRows
            colorScheme={colorScheme}
            pairings={getPairings({ surface })}
            surface={surface}
          />
        </SurfaceColumnContainer>
      ))}
    </SurfaceColumns>
  </SchemeSectionContainer>
);

const ReviewIndex = () => (
  <IndexNavigation aria-label="Components on this page">
    {componentSections.map(({ componentName, variants }) => (
      <div key={componentName}>
        <Link
          href={`#${getVariantAnchorId({ componentName, variantName: variants[0]?.variantName ?? "" })}`}
        >
          <strong>{componentName}</strong>
        </Link>
        <IndexList>
          {variants.map(({ variantName }) => (
            <li key={variantName}>
              <Link
                href={`#${getVariantAnchorId({ componentName, variantName })}`}
              >
                {variantName}
              </Link>
            </li>
          ))}
        </IndexList>
      </div>
    ))}
  </IndexNavigation>
);

const ComponentTokenReview = () => (
  <>
    <Typography>
      Each variant has a Light and a Dark section. Each section shows the
      component on the page (hue.neutral.50) and on a card (hue.neutral.white),
      with a table under each preview that covers only that setup: the token of
      every foreground element, the token behind it, and their contrast. Text
      passes at 4.5:1; icons, dots, borders and indicators at 3:1. Hover a
      swatch to see its hex value.
    </Typography>

    <ReviewIndex />

    {componentSections.flatMap(({ componentName, summary, variants }) =>
      variants.map(({ getPairings, renderPreview, variantName }) => (
        <VariantSection
          id={getVariantAnchorId({ componentName, variantName })}
          key={`${componentName}-${variantName}`}
        >
          <Typography variant="h2">
            {componentName} · {variantName}
          </Typography>
          <Typography color="textSecondary">{summary}</Typography>
          {SCHEMES.map(({ colorScheme, label }) => (
            <SchemeSection
              colorScheme={colorScheme}
              getPairings={getPairings}
              key={colorScheme}
              label={label}
              renderPreview={renderPreview}
            />
          ))}
        </VariantSection>
      )),
    )}
  </>
);

const MemoizedComponentTokenReview = memo(ComponentTokenReview);
MemoizedComponentTokenReview.displayName = "ComponentTokenReview";

export { MemoizedComponentTokenReview as ComponentTokenReview };
