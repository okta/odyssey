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

import { memo, useRef } from "react";
import { render } from "vitest-browser-react";
import { page } from "vitest/browser";

import { fullscreenTransitionTokens } from "../pendingDesignTokens/fullscreenTransitionTokens.js";
import { useFullscreenChromeCollapse } from "./useFullscreenChromeCollapse.js";

const expandedChromeHeight = 100;

const CollapsingChrome = memo(({ isCollapsed }: { isCollapsed: boolean }) => {
  const chromeElementRef = useRef<HTMLDivElement>(null);

  useFullscreenChromeCollapse({
    chromeElementRef,
    collapsedDimension: "height",
    isCollapsed,
  });

  return (
    <div
      aria-label="Chrome"
      ref={chromeElementRef}
      role="banner"
      style={{ height: `${expandedChromeHeight}px` }}
    />
  );
});
CollapsingChrome.displayName = "CollapsingChrome";

const getChromeElement = () => page.getByRole("banner").element();

const getChromeHeight = () => getChromeElement().getBoundingClientRect().height;

const getChromeAnimations = () => getChromeElement().getAnimations();

describe(useFullscreenChromeCollapse.name, () => {
  test("fullscreen exited partway through the chrome collapsing", async () => {
    const { rerender } = await render(<CollapsingChrome isCollapsed={false} />);

    await rerender(<CollapsingChrome isCollapsed />);

    // Moves the collapse to its halfway point. Setting `currentTime` keeps it running, which is what the hook's cleanup reads, so a slow test runner can't let it finish first.
    getChromeAnimations().forEach((collapseAnimation) => {
      collapseAnimation.currentTime =
        fullscreenTransitionTokens.durationMilliseconds / 2;
    });

    const heightWhenReversed = getChromeHeight();

    expect(heightWhenReversed).toBeGreaterThan(0);
    expect(heightWhenReversed).toBeLessThan(expandedChromeHeight);

    await rerender(<CollapsingChrome isCollapsed={false} />);

    // Holds the reverse at its first frame, so the height read is where it starts.
    getChromeAnimations().forEach((expandAnimation) => {
      expandAnimation.pause();
      expandAnimation.currentTime = 0;
    });

    // The chrome grows back from where it was, rather than snapping shut first.
    expect(getChromeHeight()).toBeCloseTo(heightWhenReversed, 0);
  });
});
