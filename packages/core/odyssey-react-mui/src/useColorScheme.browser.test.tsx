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

import { useTheme } from "@mui/material/styles";
import * as lightModeDesignTokens from "@okta/odyssey-design-tokens";
import * as darkModeDesignTokens from "@okta/odyssey-design-tokens/dark";
import { memo, useContext } from "react";
import { render } from "vitest-browser-react";
import { commands, page } from "vitest/browser";

import { createOdysseyStyledComponent } from "./createOdysseyStyledComponent.js";
import { Dialog } from "./Dialog.js";
import { APP_TILE_IMAGE_HEIGHT, AppTile } from "./labs/AppTile.js";
import { useOdysseyDesignTokens } from "./OdysseyDesignTokensContext.js";
import { OdysseyProvider } from "./OdysseyProvider.js";
import { OdysseyThemeProvider } from "./OdysseyThemeProvider.js";
import { Surface } from "./Surface.js";
import { appendToSandbox } from "./test-utils/appendToSandbox.js";
import { useColorScheme } from "./useColorScheme.js";
import { useContrastModeContext } from "./useContrastMode.js";
import { type ThemeCache, ThemeCacheContext } from "./useThemeCache.js";
import { createShadowDomElements } from "./web-component/createShadowDomElements.js";

const ThemeCacheReadout = ({
  onThemeCache,
}: {
  onThemeCache: (themeCache: ThemeCache) => void;
}) => {
  const themeCache = useContext(ThemeCacheContext);
  if (themeCache) onThemeCache(themeCache);
  return <ColorSchemeReadout />;
};

const StyledReadout = createOdysseyStyledComponent({ tag: "dl" })(
  ({ odysseyDesignTokens }) => ({
    backgroundColor: odysseyDesignTokens.HueNeutralWhite,
    color: odysseyDesignTokens.TypographyColorBody,
  }),
);

// A 128px square, taller than the tile's image slot, so the slot's height rule is what sizes it.
const LARGE_SQUARE_IMAGE_SOURCE = `data:image/svg+xml,${encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" width="128" height="128"><rect width="128" height="128" fill="gray"/></svg>')}`;

const AppTileBoard = memo(
  ({ colorScheme }: { colorScheme: "dark" | "light" }) => (
    <OdysseyProvider colorScheme={colorScheme}>
      <AppTile
        image={<img alt="App logo" src={LARGE_SQUARE_IMAGE_SOURCE} />}
        onClick={() => {}}
        title="App"
      />
    </OdysseyProvider>
  ),
);
AppTileBoard.displayName = "AppTileBoard";

// In a shadow root, a Dialog renders through `FullScreenOverlay`, which builds its own Emotion cache in the overlay container.
const AppTileInShadowDomDialog = memo(
  ({
    colorScheme,
    emotionRootElement,
    shadowRootElement,
  }: {
    colorScheme: "dark" | "light";
    emotionRootElement: HTMLElement;
    shadowRootElement: HTMLElement;
  }) => (
    <OdysseyProvider
      colorScheme={colorScheme}
      emotionRootElement={emotionRootElement}
      shadowRootElement={shadowRootElement}
    >
      <Dialog isOpen onClose={() => {}} title="Apps">
        <AppTile
          image={<img alt="App logo" src={LARGE_SQUARE_IMAGE_SOURCE} />}
          onClick={() => {}}
          title="App"
        />
      </Dialog>
    </OdysseyProvider>
  ),
);
AppTileInShadowDomDialog.displayName = "AppTileInShadowDomDialog";

const renderSlotHeightProbe = async () => {
  const { unmount } = await render(
    <div
      aria-label="Slot height probe"
      role="img"
      style={{ height: APP_TILE_IMAGE_HEIGHT }}
    />,
  );
  const slotHeight = getComputedStyle(
    page.getByRole("img", { name: "Slot height probe" }).element(),
  ).getPropertyValue("height");

  await unmount();

  return slotHeight;
};

const ColorSchemeReadout = memo(() => {
  const colorScheme = useColorScheme();
  const odysseyDesignTokens = useOdysseyDesignTokens();
  const theme = useTheme();

  return (
    <StyledReadout>
      <dt>Color scheme</dt>
      <dd data-testid="color-scheme">{colorScheme}</dd>
      <dt>Surface token</dt>
      <dd data-testid="surface-token">{odysseyDesignTokens.HueNeutralWhite}</dd>
      <dt>Body text token</dt>
      <dd data-testid="body-token">
        {odysseyDesignTokens.TypographyColorBody}
      </dd>
      <dt>MUI palette mode</dt>
      <dd data-testid="palette-mode">{theme.palette.mode}</dd>
    </StyledReadout>
  );
});
ColorSchemeReadout.displayName = "ColorSchemeReadout";

const ContrastModeReadout = memo(({ surfaceName }: { surfaceName: string }) => {
  const { contrastMode } = useContrastModeContext();
  const designTokens = useOdysseyDesignTokens();

  return (
    <span
      data-testid={`${surfaceName}-contrast-mode`}
      style={{ color: designTokens.TypographyColorBody }}
    >
      {contrastMode}
    </span>
  );
});
ContrastModeReadout.displayName = "ContrastModeReadout";

// Each panel paints a token from the active scheme and leaves the contrast mode to detection, the way an app page and a card on it do.
const ContrastDetectionBoard = memo(
  ({ colorScheme }: { colorScheme: "dark" | "light" }) => {
    const designTokens =
      colorScheme === "dark" ? darkModeDesignTokens : lightModeDesignTokens;

    return (
      <OdysseyProvider colorScheme={colorScheme}>
        <div style={{ backgroundColor: designTokens.HueNeutral50 }}>
          <OdysseyThemeProvider>
            <ContrastModeReadout surfaceName="page" />
          </OdysseyThemeProvider>
        </div>
        <div style={{ backgroundColor: designTokens.HueNeutralWhite }}>
          <OdysseyThemeProvider>
            <ContrastModeReadout surfaceName="surface" />
          </OdysseyThemeProvider>
        </div>
      </OdysseyProvider>
    );
  },
);
ContrastDetectionBoard.displayName = "ContrastDetectionBoard";

const readContrastDetectionBoard = async () => {
  await expect.element(page.getByTestId("page-contrast-mode")).toBeAccessible();
  await expect
    .element(page.getByTestId("surface-contrast-mode"))
    .toBeAccessible();
  return {
    page: page.getByTestId("page-contrast-mode").element().textContent,
    surface: page.getByTestId("surface-contrast-mode").element().textContent,
  };
};

const detectedContrastModes = {
  page: "highContrast",
  surface: "lowContrast",
};

const readColorSchemeReadout = async () => {
  await expect.element(page.getByRole("definition").first()).toBeVisible();
  await expect(
    page.getByTestId("color-scheme").element().closest("dl"),
  ).toBeAccessible();
  return {
    bodyToken: page.getByTestId("body-token").element().textContent,
    colorScheme: page.getByTestId("color-scheme").element().textContent,
    paletteMode: page.getByTestId("palette-mode").element().textContent,
    surfaceToken: page.getByTestId("surface-token").element().textContent,
  };
};

const lightReadout = {
  bodyToken: lightModeDesignTokens.TypographyColorBody,
  colorScheme: "light",
  paletteMode: "light",
  surfaceToken: lightModeDesignTokens.HueNeutralWhite,
};

const darkReadout = {
  bodyToken: darkModeDesignTokens.TypographyColorBody,
  colorScheme: "dark",
  paletteMode: "dark",
  surfaceToken: darkModeDesignTokens.HueNeutralWhite,
};

describe(useColorScheme.name, () => {
  test("theme caches across light, dark, and light switches", async () => {
    const firstLight = Promise.withResolvers<ThemeCache>();
    const firstDark = Promise.withResolvers<ThemeCache>();
    const secondLight = Promise.withResolvers<ThemeCache>();
    const { rerender } = await render(
      <OdysseyProvider colorScheme="light">
        <ThemeCacheReadout onThemeCache={firstLight.resolve} />
      </OdysseyProvider>,
    );
    const originalCache = await firstLight.promise;
    const originalTheme = originalCache.get("lowContrast");
    expect(await readColorSchemeReadout()).toStrictEqual(lightReadout);
    await rerender(
      <OdysseyProvider colorScheme="dark">
        <ThemeCacheReadout onThemeCache={firstDark.resolve} />
      </OdysseyProvider>,
    );
    expect((await firstDark.promise).get("lowContrast")).not.toBe(
      originalTheme,
    );
    expect(await readColorSchemeReadout()).toStrictEqual(darkReadout);
    await rerender(
      <OdysseyProvider colorScheme="light">
        <ThemeCacheReadout onThemeCache={secondLight.resolve} />
      </OdysseyProvider>,
    );
    expect((await secondLight.promise).get("lowContrast")).toBe(originalTheme);
    expect(await readColorSchemeReadout()).toStrictEqual(lightReadout);
  });
  afterEach(async () => {
    await commands.emulateColorScheme("no-preference");
  });

  test("no colorScheme prop, with the OS in dark mode", async () => {
    await commands.emulateColorScheme("dark");

    await render(
      <OdysseyProvider>
        <ColorSchemeReadout />
      </OdysseyProvider>,
    );

    expect(await readColorSchemeReadout()).toStrictEqual(lightReadout);
  });

  test("colorScheme dark", async () => {
    await render(
      <OdysseyProvider colorScheme="dark">
        <ColorSchemeReadout />
      </OdysseyProvider>,
    );

    expect(await readColorSchemeReadout()).toStrictEqual(darkReadout);
  });

  test("colorScheme light, with the OS in dark mode", async () => {
    await commands.emulateColorScheme("dark");

    await render(
      <OdysseyProvider colorScheme="light">
        <ColorSchemeReadout />
      </OdysseyProvider>,
    );

    expect(await readColorSchemeReadout()).toStrictEqual(lightReadout);
  });

  test("colorScheme system, with the OS in dark mode", async () => {
    await commands.emulateColorScheme("dark");

    await render(
      <OdysseyProvider colorScheme="system">
        <ColorSchemeReadout />
      </OdysseyProvider>,
    );

    expect(await readColorSchemeReadout()).toStrictEqual(darkReadout);
  });

  test("colorScheme system, while the OS switches from light to dark and back", async () => {
    await commands.emulateColorScheme("light");

    await render(
      <OdysseyProvider colorScheme="system">
        <ColorSchemeReadout />
      </OdysseyProvider>,
    );

    expect(await readColorSchemeReadout()).toStrictEqual(lightReadout);

    await commands.emulateColorScheme("dark");

    await vi.waitFor(async () => {
      expect(await readColorSchemeReadout()).toStrictEqual(darkReadout);
    });

    await commands.emulateColorScheme("light");

    await vi.waitFor(async () => {
      expect(await readColorSchemeReadout()).toStrictEqual(lightReadout);
    });
  });

  test("colorScheme prop changed after the first render", async () => {
    const { rerender } = await render(
      <OdysseyProvider colorScheme="light">
        <ColorSchemeReadout />
      </OdysseyProvider>,
    );

    expect(await readColorSchemeReadout()).toStrictEqual(lightReadout);

    await rerender(
      <OdysseyProvider colorScheme="dark">
        <ColorSchemeReadout />
      </OdysseyProvider>,
    );

    expect(await readColorSchemeReadout()).toStrictEqual(darkReadout);

    await rerender(
      <OdysseyProvider colorScheme="light">
        <ColorSchemeReadout />
      </OdysseyProvider>,
    );

    expect(await readColorSchemeReadout()).toStrictEqual(lightReadout);
  });

  test("Surface inside a dark provider", async () => {
    await render(
      <OdysseyProvider colorScheme="dark">
        <Surface>
          <ColorSchemeReadout />
        </Surface>
      </OdysseyProvider>,
    );

    expect(await readColorSchemeReadout()).toStrictEqual(darkReadout);
  });

  test("Surface inside a dark provider reuses the provider's theme cache", async () => {
    const providerThemeCache = Promise.withResolvers<ThemeCache>();
    const surfaceThemeCache = Promise.withResolvers<ThemeCache>();

    await render(
      <OdysseyProvider colorScheme="dark">
        <ThemeCacheReadout onThemeCache={providerThemeCache.resolve} />
        <Surface>
          <ThemeCacheReadout onThemeCache={surfaceThemeCache.resolve} />
        </Surface>
      </OdysseyProvider>,
    );

    const [providerCache, surfaceCache] = await Promise.all([
      providerThemeCache.promise,
      surfaceThemeCache.promise,
    ]);

    expect(surfaceCache.get("lowContrast")).toBe(
      providerCache.get("lowContrast"),
    );
    expect(surfaceCache.colorScheme).toBe("dark");
  });

  test("provider with its own override keeps its themes while its parent switches", async () => {
    const firstLight = Promise.withResolvers<ThemeCache>();
    const afterDark = Promise.withResolvers<ThemeCache>();
    const designTokensOverride = { HueNeutralWhite: "#fefefe" };

    const { rerender } = await render(
      <OdysseyProvider colorScheme="light">
        <OdysseyThemeProvider
          colorScheme="light"
          designTokensOverride={designTokensOverride}
        >
          <ThemeCacheReadout onThemeCache={firstLight.resolve} />
        </OdysseyThemeProvider>
      </OdysseyProvider>,
    );
    const originalTheme = (await firstLight.promise).get("lowContrast");

    await rerender(
      <OdysseyProvider colorScheme="dark">
        <OdysseyThemeProvider
          colorScheme="light"
          designTokensOverride={designTokensOverride}
        >
          <ThemeCacheReadout onThemeCache={afterDark.resolve} />
        </OdysseyThemeProvider>
      </OdysseyProvider>,
    );

    expect((await afterDark.promise).get("lowContrast")).toBe(originalTheme);
  });

  test("light provider nested inside a dark provider", async () => {
    await render(
      <OdysseyProvider colorScheme="dark">
        <OdysseyThemeProvider colorScheme="light">
          <ColorSchemeReadout />
        </OdysseyThemeProvider>
      </OdysseyProvider>,
    );

    expect(await readColorSchemeReadout()).toStrictEqual(lightReadout);
  });

  test("designTokensOverride keyed by scheme, in dark mode", async () => {
    await render(
      <OdysseyProvider
        colorScheme="dark"
        designTokensOverride={{
          dark: { HueNeutralWhite: "#010203" },
          light: { HueNeutralWhite: "#fefefe" },
        }}
      >
        <ColorSchemeReadout />
      </OdysseyProvider>,
    );

    expect(await readColorSchemeReadout()).toStrictEqual({
      ...darkReadout,
      surfaceToken: "#010203",
    });
  });

  test("designTokensOverride keyed by scheme, in light mode", async () => {
    await render(
      <OdysseyProvider
        colorScheme="light"
        designTokensOverride={{
          dark: { HueNeutralWhite: "#010203" },
          light: { HueNeutralWhite: "#fefefe" },
        }}
      >
        <ColorSchemeReadout />
      </OdysseyProvider>,
    );

    expect(await readColorSchemeReadout()).toStrictEqual({
      ...lightReadout,
      surfaceToken: "#fefefe",
    });
  });

  test("designTokensOverride keyed by scheme with only a light key, in dark mode", async () => {
    await render(
      <OdysseyProvider
        colorScheme="dark"
        designTokensOverride={{ light: { HueNeutralWhite: "#fefefe" } }}
      >
        <ColorSchemeReadout />
      </OdysseyProvider>,
    );

    expect(await readColorSchemeReadout()).toStrictEqual(darkReadout);
  });

  test("flat designTokensOverride in light mode", async () => {
    await render(
      <OdysseyProvider
        colorScheme="light"
        designTokensOverride={{
          HueNeutralWhite: "#f0f1f2",
          TypographyColorBody: "#654321",
        }}
      >
        <ColorSchemeReadout />
      </OdysseyProvider>,
    );

    expect(await readColorSchemeReadout()).toStrictEqual({
      ...lightReadout,
      bodyToken: "#654321",
      surfaceToken: "#f0f1f2",
    });
  });

  test("flat designTokensOverride in dark mode", async () => {
    await render(
      <OdysseyProvider
        colorScheme="dark"
        designTokensOverride={{ HueNeutralWhite: "#f0f1f2" }}
      >
        <ColorSchemeReadout />
      </OdysseyProvider>,
    );

    expect(await readColorSchemeReadout()).toStrictEqual(darkReadout);
  });

  test("flat designTokensOverride while the scheme switches from light to dark and back", async () => {
    const { rerender } = await render(
      <OdysseyProvider
        colorScheme="light"
        designTokensOverride={{ HueNeutralWhite: "#f0f1f2" }}
      >
        <ColorSchemeReadout />
      </OdysseyProvider>,
    );

    expect(await readColorSchemeReadout()).toStrictEqual({
      ...lightReadout,
      surfaceToken: "#f0f1f2",
    });

    await rerender(
      <OdysseyProvider
        colorScheme="dark"
        designTokensOverride={{ HueNeutralWhite: "#f0f1f2" }}
      >
        <ColorSchemeReadout />
      </OdysseyProvider>,
    );

    expect(await readColorSchemeReadout()).toStrictEqual(darkReadout);

    await rerender(
      <OdysseyProvider
        colorScheme="light"
        designTokensOverride={{ HueNeutralWhite: "#f0f1f2" }}
      >
        <ColorSchemeReadout />
      </OdysseyProvider>,
    );

    expect(await readColorSchemeReadout()).toStrictEqual({
      ...lightReadout,
      surfaceToken: "#f0f1f2",
    });
  });
});
test("contrast mode detected on dark mode surfaces", async () => {
  await render(<ContrastDetectionBoard colorScheme="dark" />);

  expect(await readContrastDetectionBoard()).toStrictEqual(
    detectedContrastModes,
  );
});

test("contrast mode detected after switching light, dark, and back to light", async () => {
  const { rerender } = await render(
    <ContrastDetectionBoard colorScheme="light" />,
  );

  expect(await readContrastDetectionBoard()).toStrictEqual(
    detectedContrastModes,
  );

  await rerender(<ContrastDetectionBoard colorScheme="dark" />);

  expect(await readContrastDetectionBoard()).toStrictEqual(
    detectedContrastModes,
  );

  await rerender(<ContrastDetectionBoard colorScheme="light" />);

  expect(await readContrastDetectionBoard()).toStrictEqual(
    detectedContrastModes,
  );
});

// The card theme's `img` rule and the tile's own image rule have equal specificity, so the tile's wins only while it is inserted later. A scheme switch used to regenerate the card's color-bearing class after the tile's and flip the order.
test("AppTile image size after switching light, dark, and back to light", async () => {
  const getImageHeight = () =>
    getComputedStyle(
      page.getByRole("img", { name: "App logo" }).element(),
    ).getPropertyValue("height");

  // The browser rounds a rem height to its layout unit, so the expected value comes from an element laid out at exactly `APP_TILE_IMAGE_HEIGHT`.
  const slotHeight = await renderSlotHeightProbe();

  const { rerender } = await render(<AppTileBoard colorScheme="light" />);

  expect(getImageHeight()).toBe(slotHeight);

  await rerender(<AppTileBoard colorScheme="dark" />);

  expect(getImageHeight()).toBe(slotHeight);

  await rerender(<AppTileBoard colorScheme="light" />);

  expect(getImageHeight()).toBe(slotHeight);
});

test("AppTile image size in a shadow DOM dialog after switching light, dark, and back to light", async () => {
  const slotHeight = await renderSlotHeightProbe();
  const { emotionRootElement, shadowRootElement } = createShadowDomElements(
    appendToSandbox(document.createElement("div")),
  );
  const getImageHeight = () =>
    getComputedStyle(
      page.getByRole("img", { name: "App logo" }).element(),
    ).getPropertyValue("height");

  const { rerender } = await render(
    <AppTileInShadowDomDialog
      colorScheme="light"
      emotionRootElement={emotionRootElement}
      shadowRootElement={shadowRootElement}
    />,
    { container: shadowRootElement },
  );

  await expect
    .element(page.getByRole("img", { name: "App logo" }))
    .toBeVisible();
  expect(getImageHeight()).toBe(slotHeight);

  await rerender(
    <AppTileInShadowDomDialog
      colorScheme="dark"
      emotionRootElement={emotionRootElement}
      shadowRootElement={shadowRootElement}
    />,
  );

  expect(getImageHeight()).toBe(slotHeight);

  await rerender(
    <AppTileInShadowDomDialog
      colorScheme="light"
      emotionRootElement={emotionRootElement}
      shadowRootElement={shadowRootElement}
    />,
  );

  expect(getImageHeight()).toBe(slotHeight);
});
