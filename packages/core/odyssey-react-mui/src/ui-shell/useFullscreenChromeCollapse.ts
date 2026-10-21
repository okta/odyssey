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

import { type RefObject, useLayoutEffect, useRef, useState } from "react";

import { useAnimation } from "../AnimationContext.js";
import { fullscreenTransitionTokens } from "../pendingDesignTokens/fullscreenTransitionTokens.js";

export type UseFullscreenChromeCollapseArgs = {
  /** The part of the shell that shrinks away while fullscreen is active. */
  chromeElementRef: RefObject<HTMLElement | null>;
  /** The side that shrinks: `height` for a bar across the shell, `width` for a column beside the app. */
  collapsedDimension: "height" | "width";
  /** If `true`, fullscreen is active and the chrome collapses. */
  isCollapsed: boolean;
};

/**
 * Shrinks a part of the shell to nothing when fullscreen starts, and grows it back when fullscreen ends, so the user can see where the navigation went.
 *
 * Returns `isChromeHidden`, which turns `true` only once the collapse has finished.
 */
export const useFullscreenChromeCollapse = ({
  chromeElementRef,
  collapsedDimension,
  isCollapsed,
}: UseFullscreenChromeCollapseArgs) => {
  const hasAnimations = useAnimation();
  const [hasFinishedCollapsing, setHasFinishedCollapsing] =
    useState(isCollapsed);
  const previousIsCollapsedRef = useRef(isCollapsed);
  const interruptedSizeRef = useRef<number>(undefined);

  // A layout effect, so the first keyframe applies before the browser paints the new state.
  useLayoutEffect(() => {
    const hasCollapseChanged = previousIsCollapsedRef.current !== isCollapsed;
    previousIsCollapsedRef.current = isCollapsed;

    if (!isCollapsed) {
      setHasFinishedCollapsing(false);
    }

    const chromeElement = chromeElementRef.current;

    if (!hasCollapseChanged || !hasAnimations || !chromeElement) {
      return;
    }

    const expandedKeyframe = {
      [collapsedDimension]: `${chromeElement.getBoundingClientRect()[collapsedDimension]}px`,
      overflow: "hidden",
    };
    const collapsedKeyframe = {
      [collapsedDimension]: "0px",
      overflow: "hidden",
    };
    // Fullscreen can end before the collapse finishes. Starting from the size the chrome had reached keeps it from snapping shut before it grows back.
    const interruptedSize = interruptedSizeRef.current;
    interruptedSizeRef.current = undefined;
    const restingStartKeyframe = isCollapsed
      ? expandedKeyframe
      : collapsedKeyframe;
    const startKeyframe =
      interruptedSize === undefined
        ? restingStartKeyframe
        : { [collapsedDimension]: `${interruptedSize}px`, overflow: "hidden" };

    const chromeAnimation = chromeElement.animate(
      isCollapsed
        ? [startKeyframe, collapsedKeyframe]
        : [startKeyframe, expandedKeyframe],
      {
        duration: fullscreenTransitionTokens.durationMilliseconds,
        easing: fullscreenTransitionTokens.easing,
        // Holds the collapsed size until React hides the element. Without it, the chrome springs back to full size for a frame after the animation ends.
        fill: isCollapsed ? "forwards" : "none",
      },
    );

    if (isCollapsed) {
      chromeAnimation.addEventListener("finish", () => {
        setHasFinishedCollapsing(true);
      });
    }

    return () => {
      // Read before cancelling, while the animation still holds the in-between size.
      interruptedSizeRef.current =
        chromeAnimation.playState === "running"
          ? chromeElement.getBoundingClientRect()[collapsedDimension]
          : undefined;
      chromeAnimation.cancel();
    };
  }, [chromeElementRef, collapsedDimension, hasAnimations, isCollapsed]);

  return {
    isChromeHidden: isCollapsed && (hasFinishedCollapsing || !hasAnimations),
  };
};
