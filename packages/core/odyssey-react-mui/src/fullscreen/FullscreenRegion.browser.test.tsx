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

import * as Tokens from "@okta/odyssey-design-tokens";
import { memo, type ReactNode } from "react";
import { render } from "vitest-browser-react";
import { page, userEvent } from "vitest/browser";

import { Button } from "../Buttons/Button.js";
import { translate as odysseyTranslate } from "../i18n.generated/i18n.js";
import {
  createFullscreenModeHost,
  createFullscreenModeMessageBus,
  type FullscreenModeHost,
  getFullscreenElementId,
} from "../message-bus/index.js";
import { OdysseyProvider } from "../OdysseyProvider.js";
import { Surface } from "../Surface.js";
import { appendToSandbox } from "../test-utils/appendToSandbox.js";
import { renderWithOdysseyProvider } from "../test-utils/renderWithOdysseyProvider.js";
import { renderUiShell } from "../ui-shell/renderUiShell.js";
import { defaultUiShellBreakpointConfig } from "../ui-shell/useUiShellBreakpoints.js";
import { FullscreenButton } from "./FullscreenButton.js";
import { FullscreenRegion } from "./FullscreenRegion.js";
import { useFullscreen } from "./useFullscreen.js";

const fullscreenButtonLabel = odysseyTranslate("fullscreen.button.label");
const regionLabel = odysseyTranslate("fullscreen.region.label");

const FullscreenReadout = memo(
  ({
    fullscreenId,
    readoutName,
  }: {
    fullscreenId: string;
    readoutName: string;
  }) => {
    const { hasActiveFullscreen, isFullscreen, isInFullscreenStack } =
      useFullscreen({ fullscreenId });

    return (
      <p>
        {readoutName}: {hasActiveFullscreen ? "page fullscreen" : "page normal"}
        , {isFullscreen ? "on top" : "not on top"},{" "}
        {isInFullscreenStack ? "in stack" : "not in stack"}
      </p>
    );
  },
);
FullscreenReadout.displayName = "FullscreenReadout";

const RegionWithButton = memo(
  ({
    buttonLabel,
    children,
    fullscreenId,
  }: {
    buttonLabel?: string;
    children?: ReactNode;
    fullscreenId: string;
  }) => (
    <FullscreenRegion fullscreenId={fullscreenId}>
      {children}
      <FullscreenButton ariaLabel={buttonLabel} fullscreenId={fullscreenId} />
    </FullscreenRegion>
  ),
);
RegionWithButton.displayName = "RegionWithButton";

const getRegionElement = ({ fullscreenId }: { fullscreenId: string }) =>
  document.getElementById(getFullscreenElementId({ fullscreenId }));

// UI Shell runs the host in an app. Each test runs its own and destroys it, which clears the stack, so no test leaks fullscreen into the next.
const hostState: { host?: FullscreenModeHost } = {};

beforeEach(() => {
  hostState.host = createFullscreenModeHost();
});

afterEach(() => {
  hostState.host?.destroy();
});

describe(FullscreenRegion.displayName!, () => {
  test("region toggled by its button", async () => {
    const { container } = await renderWithOdysseyProvider(
      <RegionWithButton fullscreenId="toggled" />,
    );

    const fullscreenButton = page.getByRole("button", {
      name: fullscreenButtonLabel,
    });

    await expect
      .element(fullscreenButton)
      .toHaveAttribute("aria-pressed", "false");
    await expect
      .element(fullscreenButton)
      .toHaveAttribute(
        "aria-controls",
        getFullscreenElementId({ fullscreenId: "toggled" }),
      );
    await expect(container).toBeAccessible();

    await userEvent.click(fullscreenButton);

    await expect
      .element(fullscreenButton)
      .toHaveAttribute("aria-pressed", "true");
    await expect
      .element(page.getByRole("region", { name: regionLabel }))
      .toBeVisible();
    await expect(container).toBeAccessible();

    await userEvent.click(fullscreenButton);

    await expect
      .element(fullscreenButton)
      .toHaveAttribute("aria-pressed", "false");
  });

  test("button outside the region it controls, used from the keyboard", async () => {
    const { container } = await renderWithOdysseyProvider(
      <>
        <Button label="Before region" variant="secondary" />
        <FullscreenButton
          ariaLabel="Enable fullscreen for the report"
          fullscreenId="report"
        />
        <FullscreenRegion fullscreenId="report">
          <Button label="Inside region" variant="secondary" />
          <FullscreenButton fullscreenId="report" />
        </FullscreenRegion>
        <Button label="After region" variant="secondary" />
      </>,
    );

    const outsideFullscreenButton = page.getByRole("button", {
      name: "Enable fullscreen for the report",
    });

    await userEvent.click(page.getByRole("button", { name: "Before region" }));
    await userEvent.tab();

    await expect.element(outsideFullscreenButton).toHaveFocus();

    await userEvent.keyboard("{Enter}");

    // Focus started outside the region, so it moves in, the way a dialog takes focus.
    await expect
      .element(page.getByRole("region", { name: regionLabel }))
      .toHaveFocus();
    await expect(container).toBeAccessible();

    await userEvent.tab();

    await expect
      .element(page.getByRole("button", { name: "Inside region" }))
      .toHaveFocus();

    await userEvent.tab();

    await expect
      .element(
        page.getByRole("button", { exact: true, name: fullscreenButtonLabel }),
      )
      .toHaveFocus();

    await userEvent.tab();

    await expect.element(outsideFullscreenButton).not.toHaveFocus();
    await expect
      .element(page.getByRole("button", { name: "After region" }))
      .not.toHaveFocus();

    await userEvent.click(page.getByRole("button", { name: "Inside region" }));
    await userEvent.tab({ shift: true });

    await expect
      .element(page.getByRole("button", { name: "Before region" }))
      .not.toHaveFocus();
    await expect.element(outsideFullscreenButton).not.toHaveFocus();

    await userEvent.keyboard("{Escape}");

    await expect.element(outsideFullscreenButton).toHaveFocus();
    await expect
      .element(outsideFullscreenButton)
      .toHaveAttribute("aria-pressed", "false");
    await expect(container).toBeAccessible();
  });

  test("page around a region in fullscreen", async () => {
    await renderWithOdysseyProvider(
      <>
        <Button label="Before region" variant="secondary" />
        <RegionWithButton fullscreenId="isolated">
          <Button label="Inside region" variant="secondary" />
        </RegionWithButton>
        <Button label="After region" variant="secondary" />
      </>,
    );

    await userEvent.click(
      page.getByRole("button", { name: fullscreenButtonLabel }),
    );

    // The user pressed the region's own button, so focus stays on it.
    await expect
      .element(page.getByRole("button", { name: fullscreenButtonLabel }))
      .toHaveFocus();
    // Playwright's role queries still find inert elements, so the attribute is how a test can tell they're hidden from screen readers.
    await expect
      .element(page.getByRole("button", { name: "Before region" }))
      .toHaveAttribute("inert");
    await expect
      .element(page.getByRole("button", { name: "After region" }))
      .toHaveAttribute("inert");

    await userEvent.click(
      page.getByRole("button", { name: fullscreenButtonLabel }),
    );

    await expect
      .element(page.getByRole("button", { name: "Before region" }))
      .not.toHaveAttribute("inert");
    await expect
      .element(page.getByRole("button", { name: "After region" }))
      .not.toHaveAttribute("inert");
  });

  test("a region entering fullscreen over another", async () => {
    const { container } = await renderWithOdysseyProvider(
      <RegionWithButton
        buttonLabel="Enable fullscreen for outer"
        fullscreenId="outer"
      >
        <Button label="Inside outer" variant="secondary" />
        <FullscreenReadout fullscreenId="outer" readoutName="Outer" />
        <RegionWithButton
          buttonLabel="Enable fullscreen for inner"
          fullscreenId="inner"
        >
          <Button label="Inside inner" variant="secondary" />
          <FullscreenReadout fullscreenId="inner" readoutName="Inner" />
        </RegionWithButton>
      </RegionWithButton>,
    );

    await userEvent.click(
      page.getByRole("button", { name: "Enable fullscreen for outer" }),
    );
    await userEvent.click(
      page.getByRole("button", { name: "Enable fullscreen for inner" }),
    );

    await expect
      .element(page.getByText("Outer: page fullscreen, not on top, in stack"))
      .toBeInTheDocument();
    await expect
      .element(page.getByText("Inner: page fullscreen, on top, in stack"))
      .toBeVisible();
    await expect
      .element(page.getByRole("button", { name: "Inside outer" }))
      .toHaveAttribute("inert");
    await expect(container).toBeAccessible();

    await userEvent.keyboard("{Escape}");

    await expect
      .element(page.getByText("Outer: page fullscreen, on top, in stack"))
      .toBeVisible();
    await expect
      .element(
        page.getByText("Inner: page fullscreen, not on top, not in stack"),
      )
      .toBeVisible();
    await expect
      .element(page.getByRole("button", { name: "Inside outer" }))
      .not.toHaveAttribute("inert");

    await userEvent.keyboard("{Escape}");

    await expect
      .element(page.getByText("Outer: page normal, not on top, not in stack"))
      .toBeVisible();
  });

  test("the page around stacked regions as the top one exits", async () => {
    await renderWithOdysseyProvider(
      <>
        <Button label="Outside both" variant="secondary" />
        <RegionWithButton
          buttonLabel="Enable fullscreen for outer"
          fullscreenId="outer-page"
        >
          <RegionWithButton
            buttonLabel="Enable fullscreen for inner"
            fullscreenId="inner-page"
          />
        </RegionWithButton>
      </>,
    );

    await userEvent.click(
      page.getByRole("button", { name: "Enable fullscreen for outer" }),
    );
    await userEvent.click(
      page.getByRole("button", { name: "Enable fullscreen for inner" }),
    );
    await userEvent.keyboard("{Escape}");

    await expect
      .element(
        page.getByRole("button", { name: "Enable fullscreen for inner" }),
      )
      .toHaveAttribute("aria-pressed", "false");
    // The outer region is on top again, so the page around it has to stay unreachable.
    await expect
      .element(page.getByRole("button", { name: "Outside both" }))
      .toHaveAttribute("inert");

    await userEvent.keyboard("{Escape}");

    await expect
      .element(page.getByRole("button", { name: "Outside both" }))
      .not.toHaveAttribute("inert");
  });

  test("screen reader announcements through entering and exiting fullscreen", async () => {
    const { container } = await renderWithOdysseyProvider(
      <RegionWithButton fullscreenId="announced" />,
    );

    await expect.element(page.getByRole("status")).toHaveTextContent("");

    await userEvent.click(
      page.getByRole("button", { name: fullscreenButtonLabel }),
    );

    await expect
      .element(page.getByRole("status"))
      .toHaveTextContent(odysseyTranslate("fullscreen.entered.text"));
    await expect(container).toBeAccessible();

    await userEvent.click(
      page.getByRole("button", { name: fullscreenButtonLabel }),
    );

    await expect
      .element(page.getByRole("status"))
      .toHaveTextContent(odysseyTranslate("fullscreen.exited.text"));
    await expect
      .element(page.getByRole("region", { name: regionLabel }))
      .not.toBeInTheDocument();
    await expect(container).toBeAccessible();
  });

  test("region toggled with animations turned off", async () => {
    await render(
      <OdysseyProvider hasAnimations={false}>
        <RegionWithButton fullscreenId="still" />
      </OdysseyProvider>,
    );

    const fullscreenButton = page.getByRole("button", {
      name: fullscreenButtonLabel,
    });

    await userEvent.click(fullscreenButton);

    await expect
      .element(page.getByRole("region", { name: regionLabel }))
      .toBeVisible();

    await userEvent.click(fullscreenButton);

    await expect
      .element(page.getByRole("region", { name: regionLabel }))
      .not.toBeInTheDocument();
  });

  test("region fullscreen seen from separate providers", async () => {
    await render(
      <>
        <OdysseyProvider>
          <FullscreenReadout fullscreenId="shared" readoutName="Other app" />
        </OdysseyProvider>
        <OdysseyProvider>
          <RegionWithButton fullscreenId="shared" />
        </OdysseyProvider>
      </>,
    );

    await userEvent.click(
      page.getByRole("button", { name: fullscreenButtonLabel }),
    );

    await expect
      .element(page.getByText("Other app: page fullscreen, on top, in stack"))
      .toBeInTheDocument();

    await userEvent.click(
      page.getByRole("button", { name: fullscreenButtonLabel }),
    );

    await expect
      .element(
        page.getByText("Other app: page normal, not on top, not in stack"),
      )
      .toBeVisible();
  });

  test("component that mounts while a region is in fullscreen", async () => {
    const { rerender } = await render(
      <>
        <OdysseyProvider>
          <RegionWithButton fullscreenId="early" />
        </OdysseyProvider>
      </>,
    );

    await userEvent.click(
      page.getByRole("button", { name: fullscreenButtonLabel }),
    );

    await expect
      .element(page.getByRole("region", { name: regionLabel }))
      .toBeVisible();

    // The fragment matches the first render's shape, so React keeps the region mounted instead of remounting it.
    await rerender(
      <>
        <OdysseyProvider>
          <RegionWithButton fullscreenId="early" />
        </OdysseyProvider>
        <OdysseyProvider>
          <FullscreenReadout fullscreenId="early" readoutName="Late app" />
        </OdysseyProvider>
      </>,
    );

    await expect
      .element(page.getByText("Late app: page fullscreen, on top, in stack"))
      .toBeInTheDocument();
  });

  test("region unmounted while in fullscreen", async () => {
    const { rerender } = await render(
      <OdysseyProvider>
        <FullscreenReadout fullscreenId="unmounted" readoutName="App" />
        <RegionWithButton fullscreenId="unmounted" />
      </OdysseyProvider>,
    );

    await userEvent.click(
      page.getByRole("button", { name: fullscreenButtonLabel }),
    );

    await expect
      .element(page.getByText("App: page fullscreen, on top, in stack"))
      .toBeInTheDocument();

    await rerender(
      <OdysseyProvider>
        <FullscreenReadout fullscreenId="unmounted" readoutName="App" />
      </OdysseyProvider>,
    );

    await expect
      .element(page.getByText("App: page normal, not on top, not in stack"))
      .toBeVisible();
  });

  test("the only fullscreen component on the page unmounted while in fullscreen", async () => {
    // Enters and watches from outside the hook, so the region is the only component reading the shared connection when it unmounts. A button inside the region would still be reading it.
    const pageFullscreenModeMessageBus = createFullscreenModeMessageBus();

    const { rerender } = await render(
      <OdysseyProvider>
        <FullscreenRegion fullscreenId="only">
          <p>Region content</p>
        </FullscreenRegion>
      </OdysseyProvider>,
    );

    await expect.element(page.getByText("Region content")).toBeVisible();

    pageFullscreenModeMessageBus.enterFullscreen({ fullscreenId: "only" });

    await expect
      .poll(() => pageFullscreenModeMessageBus.getFullscreenState())
      .toStrictEqual({ fullscreenStack: ["only"] });

    await rerender(<OdysseyProvider>{null}</OdysseyProvider>);

    await expect
      .poll(() => pageFullscreenModeMessageBus.getFullscreenState())
      .toStrictEqual({ fullscreenStack: [] });

    pageFullscreenModeMessageBus.destroy();
  });

  test("region removed from the page without unmounting", async () => {
    const regionContainerElement = appendToSandbox(
      document.createElement("div"),
    );

    await render(
      <OdysseyProvider>
        <RegionWithButton fullscreenId="detached" />
      </OdysseyProvider>,
      { container: regionContainerElement },
    );
    await render(
      <OdysseyProvider>
        <FullscreenReadout fullscreenId="detached" readoutName="Page" />
      </OdysseyProvider>,
    );

    await userEvent.click(
      page.getByRole("button", { name: fullscreenButtonLabel }),
    );

    await expect
      .element(page.getByText("Page: page fullscreen, on top, in stack"))
      .toBeInTheDocument();

    // What a Backbone view's `.remove()` does to a React island: the DOM goes, and React is never told.
    regionContainerElement.remove();

    await expect
      .element(page.getByText("Page: page normal, not on top, not in stack"))
      .toBeVisible();
  });

  test("region in fullscreen on the app background", async () => {
    await renderWithOdysseyProvider(<RegionWithButton fullscreenId="gray" />);

    await userEvent.click(
      page.getByRole("button", { name: fullscreenButtonLabel }),
    );

    await expect
      .element(page.getByRole("region", { name: regionLabel }))
      .toBeVisible();
    expect(getRegionElement({ fullscreenId: "gray" })).toHaveStyle({
      backgroundColor: Tokens.HueNeutral50,
    });
  });

  test("region in fullscreen inside the UI Shell app area", async () => {
    // UI Shell runs its own host, so the one from `beforeEach` steps aside to leave one on the page.
    hostState.host?.destroy();

    await page.viewport(defaultUiShellBreakpointConfig.wide, 1000);

    const onRender = vi.fn();

    const { appElement } = renderUiShell({
      appElementScrollingMode: "vertical",
      onRender,
      parentElement: appendToSandbox(document.createElement("div")),
    });

    await vi.waitFor(() => {
      expect(onRender).toHaveBeenCalled();
    });

    // The global baseline paints `<body>` white, the way it does in an app, so the gray has to come from UI Shell.
    await render(
      <OdysseyProvider hasCssBaseline>
        <RegionWithButton fullscreenId="in-shell" />
      </OdysseyProvider>,
      { container: appElement },
    );

    await userEvent.click(
      page.getByRole("button", { name: fullscreenButtonLabel }),
    );

    await expect
      .element(page.getByRole("region", { name: regionLabel }))
      .toBeVisible();
    // UI Shell paints its gray behind the app rather than on one of the app's ancestors, so this is the case reading ancestors alone gets wrong.
    expect(getRegionElement({ fullscreenId: "in-shell" })).toHaveStyle({
      backgroundColor: Tokens.HueNeutral50,
    });

    await userEvent.click(
      page.getByRole("button", { name: fullscreenButtonLabel }),
    );
  });

  test("region in fullscreen inside a Surface", async () => {
    await renderWithOdysseyProvider(
      <Surface>
        <RegionWithButton fullscreenId="white" />
      </Surface>,
    );

    await userEvent.click(
      page.getByRole("button", { name: fullscreenButtonLabel }),
    );

    await expect
      .element(page.getByRole("region", { name: regionLabel }))
      .toBeVisible();
    expect(getRegionElement({ fullscreenId: "white" })).toHaveStyle({
      backgroundColor: Tokens.HueNeutralWhite,
    });
  });
});
