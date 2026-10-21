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

import { memo, useEffect } from "react";
import { page, userEvent } from "vitest/browser";

import { Button } from "../Buttons/Button.js";
import {
  createFullscreenModeHost,
  type FullscreenModeHost,
} from "../message-bus/index.js";
import { renderWithOdysseyProvider } from "../test-utils/renderWithOdysseyProvider.js";
import { useFullscreen, useHasActiveFullscreen } from "./useFullscreen.js";

const FullscreenControls = memo(
  ({
    controlsName,
    fullscreenId,
    onRender,
  }: {
    controlsName: string;
    fullscreenId: string;
    onRender?: () => void;
  }) => {
    const {
      enterFullscreen,
      exitFullscreen,
      fullscreenStackIndex,
      hasActiveFullscreen,
      isFullscreen,
      isInFullscreenStack,
    } = useFullscreen({ fullscreenId });

    useEffect(() => {
      onRender?.();
    });

    return (
      <>
        <Button
          label={`Enter ${controlsName}`}
          onClick={enterFullscreen}
          variant="secondary"
        />
        <Button
          label={`Exit ${controlsName}`}
          onClick={exitFullscreen}
          variant="secondary"
        />
        <p>
          {controlsName}: index {fullscreenStackIndex},{" "}
          {hasActiveFullscreen ? "page fullscreen" : "page normal"},{" "}
          {isFullscreen ? "on top" : "not on top"},{" "}
          {isInFullscreenStack ? "in stack" : "not in stack"}
        </p>
      </>
    );
  },
);
FullscreenControls.displayName = "FullscreenControls";

const ChromeReadout = memo(({ onRender }: { onRender: () => void }) => {
  const hasActiveFullscreen = useHasActiveFullscreen();

  useEffect(() => {
    onRender();
  });

  return <p>Chrome: {hasActiveFullscreen ? "hidden" : "shown"}</p>;
});
ChromeReadout.displayName = "ChromeReadout";

const hostState: { host?: FullscreenModeHost } = {};

beforeEach(() => {
  hostState.host = createFullscreenModeHost();
});

afterEach(() => {
  hostState.host?.destroy();
});

describe(useFullscreen.name, () => {
  test("entering and exiting by id", async () => {
    await renderWithOdysseyProvider(
      <FullscreenControls controlsName="Report" fullscreenId="report" />,
    );

    await expect
      .element(
        page.getByText(
          "Report: index -1, page normal, not on top, not in stack",
        ),
      )
      .toBeVisible();

    await userEvent.click(page.getByRole("button", { name: "Enter Report" }));

    await expect
      .element(
        page.getByText("Report: index 0, page fullscreen, on top, in stack"),
      )
      .toBeVisible();

    await userEvent.click(page.getByRole("button", { name: "Exit Report" }));

    await expect
      .element(
        page.getByText(
          "Report: index -1, page normal, not on top, not in stack",
        ),
      )
      .toBeVisible();
  });

  test("two ids in the stack", async () => {
    await renderWithOdysseyProvider(
      <>
        <FullscreenControls controlsName="Outer" fullscreenId="outer" />
        <FullscreenControls controlsName="Inner" fullscreenId="inner" />
      </>,
    );

    await userEvent.click(page.getByRole("button", { name: "Enter Outer" }));
    await userEvent.click(page.getByRole("button", { name: "Enter Inner" }));

    await expect
      .element(
        page.getByText("Outer: index 0, page fullscreen, not on top, in stack"),
      )
      .toBeVisible();
    await expect
      .element(
        page.getByText("Inner: index 1, page fullscreen, on top, in stack"),
      )
      .toBeVisible();

    await userEvent.click(page.getByRole("button", { name: "Exit Outer" }));

    await expect
      .element(
        page.getByText("Inner: index 0, page fullscreen, on top, in stack"),
      )
      .toBeVisible();

    await userEvent.click(page.getByRole("button", { name: "Exit Inner" }));
  });

  test("components that don't depend on what changed", async () => {
    const onChromeRender = vi.fn();
    const onOtherIdRender = vi.fn();

    await renderWithOdysseyProvider(
      <>
        <FullscreenControls controlsName="Outer" fullscreenId="outer" />
        <FullscreenControls controlsName="Inner" fullscreenId="inner" />
        <FullscreenControls
          controlsName="Other"
          fullscreenId="other"
          onRender={onOtherIdRender}
        />
        <ChromeReadout onRender={onChromeRender} />
      </>,
    );

    await userEvent.click(page.getByRole("button", { name: "Enter Outer" }));

    await expect.element(page.getByText("Chrome: hidden")).toBeVisible();

    onChromeRender.mockClear();
    onOtherIdRender.mockClear();

    await userEvent.click(page.getByRole("button", { name: "Enter Inner" }));

    await expect
      .element(
        page.getByText("Inner: index 1, page fullscreen, on top, in stack"),
      )
      .toBeVisible();

    // Something was already in fullscreen, so the chrome's answer didn't change.
    expect(onChromeRender).toHaveBeenCalledTimes(0);
    expect(onOtherIdRender).toHaveBeenCalledTimes(0);

    await userEvent.click(page.getByRole("button", { name: "Exit Inner" }));
    await userEvent.click(page.getByRole("button", { name: "Exit Outer" }));
  });

  test("no fullscreen mode host on the page", async () => {
    hostState.host?.destroy();

    await renderWithOdysseyProvider(
      <FullscreenControls controlsName="Report" fullscreenId="report" />,
    );

    await userEvent.click(page.getByRole("button", { name: "Enter Report" }));

    await expect
      .element(
        page.getByText(
          "Report: index -1, page normal, not on top, not in stack",
        ),
      )
      .toBeVisible();
  });
});
