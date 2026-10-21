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

import { visuallyHidden } from "@mui/utils";
import {
  memo,
  type ReactNode,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";

import { useAnimation } from "../AnimationContext.js";
import { createOdysseyStyledComponent } from "../createOdysseyStyledComponent.js";
import { useTranslation } from "../i18n.generated/i18n.js";
import {
  getFullscreenElementId,
  watchElementDisconnection,
} from "../message-bus/index.js";
import { fullscreenTransitionTokens } from "../pendingDesignTokens/fullscreenTransitionTokens.js";
import { createStore } from "../tools/createStore.js";
import { easeFullscreenTransition } from "./easeFullscreenTransition.js";
import { getBackgroundColorBehindElement } from "./getBackgroundColorBehindElement.js";
import { useFullscreen } from "./useFullscreen.js";

// Below MUI's app bar (1100), drawer (1200), and modal (1300) layers, so drawers, dialogs, and menus opened from inside the region still appear above it. A region higher in the fullscreen stack adds its position, so it covers the ones under it while staying below those layers.
const FULLSCREEN_REGION_BASE_Z_INDEX = 1000;

// `right` and `bottom` are here because `inset: 0` sets them too. They have to be cleared to `auto`, or they fight the animated `width` and `height`.
const ANIMATED_RECT_PROPERTIES = [
  "bottom",
  "height",
  "left",
  "right",
  "top",
  "width",
] as const;

type RegionRect = {
  height: number;
  left: number;
  top: number;
  width: number;
};

type RegionSize = Pick<RegionRect, "height" | "width">;

const StyledFullscreenRegionPlaceholder = createOdysseyStyledComponent({
  shouldForwardProp: (prop) => prop !== "reservedSize",
  tag: "div",
})<{ reservedSize?: RegionSize }>(({ reservedSize }) =>
  reservedSize
    ? { height: reservedSize.height, width: reservedSize.width }
    : {},
);

const StyledFullscreenRegion = createOdysseyStyledComponent({
  shouldForwardProp: (prop) =>
    prop !== "fullscreenBackgroundColor" &&
    prop !== "fullscreenStackIndex" &&
    prop !== "isFullscreen",
  tag: "div",
})<{
  fullscreenBackgroundColor?: string;
  fullscreenStackIndex: number;
  isFullscreen: boolean;
}>(
  ({
    fullscreenBackgroundColor,
    fullscreenStackIndex,
    isFullscreen,
    odysseyDesignTokens,
  }) =>
    isFullscreen
      ? {
          backgroundColor: fullscreenBackgroundColor,
          inset: 0,
          overflow: "auto",
          ...(isFullscreen ? { padding: odysseyDesignTokens.Spacing5 } : {}),
          position: "fixed",
          zIndex:
            FULLSCREEN_REGION_BASE_Z_INDEX + Math.max(fullscreenStackIndex, 0),
          // The region only takes focus so screen readers start reading inside it. It isn't a control, so a focus ring on the whole viewport would only be noise.
          "&:focus": {
            outline: "none",
          },
        }
      : {},
);

// The same styles as `ScreenReaderText`, which can't carry the `role` a live region needs. They position it out of flow, so it never changes the region's layout or the margins its placeholder holds.
const StyledFullscreenAnnouncement = createOdysseyStyledComponent({
  tag: "span",
})(() => ({ ...visuallyHidden }));

const getElementSize = ({ element }: { element: Element }): RegionSize => {
  const { height, width } = element.getBoundingClientRect();

  return { height, width };
};

const getElementRect = ({ element }: { element: Element }): RegionRect => {
  const { height, left, top, width } = element.getBoundingClientRect();

  return { height, left, top, width };
};

// `clientWidth` and `clientHeight` leave out the scrollbar, the same way `inset: 0` on a fixed element does.
const getViewportRect = (): RegionRect => ({
  height: document.documentElement.clientHeight,
  left: 0,
  top: 0,
  width: document.documentElement.clientWidth,
});

const getInterpolatedRect = ({
  endRect,
  progress,
  startRect,
}: {
  endRect: RegionRect;
  progress: number;
  startRect: RegionRect;
}): RegionRect => ({
  height: startRect.height + (endRect.height - startRect.height) * progress,
  left: startRect.left + (endRect.left - startRect.left) * progress,
  top: startRect.top + (endRect.top - startRect.top) * progress,
  width: startRect.width + (endRect.width - startRect.width) * progress,
});

const applyRegionRect = ({
  element,
  rect,
}: {
  element: HTMLElement;
  rect: RegionRect;
}) => {
  element.style.setProperty("bottom", "auto");
  element.style.setProperty("height", `${rect.height}px`);
  element.style.setProperty("left", `${rect.left}px`);
  element.style.setProperty("right", "auto");
  element.style.setProperty("top", `${rect.top}px`);
  element.style.setProperty("width", `${rect.width}px`);
};

const clearRegionRect = ({ element }: { element: HTMLElement }) => {
  ANIMATED_RECT_PROPERTIES.forEach((propertyName) => {
    element.style.removeProperty(propertyName);
  });
};

// These never render, so making them inert changes nothing and only adds noise to the DOM.
const NON_RENDERED_TAG_NAMES = new Set([
  "LINK",
  "META",
  "SCRIPT",
  "STYLE",
  "TEMPLATE",
]);

/**
 * Every element on the page that is not the given element, one of its ancestors, or inside it. Walks out through shadow roots, so a region rendered inside a web component still isolates the page around that component.
 */
const getElementsOutside = ({ element }: { element: Element }): Element[] => {
  const rootNode = element.getRootNode();
  const siblingContainer =
    element.parentElement ??
    (rootNode instanceof ShadowRoot ? rootNode : undefined);
  const nextElement =
    element.parentElement ??
    (rootNode instanceof ShadowRoot ? rootNode.host : undefined);

  // `<body>` is where the page ends. Its siblings are `<head>` and nothing a user can reach.
  if (element === document.body || !siblingContainer || !nextElement) {
    return [];
  }

  return Array.from(siblingContainer.children)
    .filter((siblingElement) => siblingElement !== element)
    .concat(getElementsOutside({ element: nextElement }));
};

/**
 * Makes everything outside the given element inert, so keyboard and screen reader users can't reach content the element covers.
 *
 * Returns a function that restores those elements. Elements that were already inert are left alone, so restoring never wakes something another component made inert.
 */
const makeElementsOutsideInert = ({ element }: { element: Element }) => {
  const newlyInertElements = getElementsOutside({ element }).filter(
    (outsideElement) =>
      !NON_RENDERED_TAG_NAMES.has(outsideElement.tagName) &&
      !outsideElement.hasAttribute("inert"),
  );

  newlyInertElements.forEach((outsideElement) => {
    outsideElement.setAttribute("inert", "");
  });

  return () => {
    newlyInertElements.forEach((outsideElement) => {
      outsideElement.removeAttribute("inert");
    });
  };
};

/**
 * The focused element, looking inside shadow roots. `document.activeElement` stops at a shadow host.
 */
const getDeepActiveElement = (
  root: Document | ShadowRoot = document,
): Element | null => {
  const { activeElement } = root;

  return activeElement?.shadowRoot
    ? (getDeepActiveElement(activeElement.shadowRoot) ?? activeElement)
    : activeElement;
};

const getIsFocusable = (element: Element): element is HTMLElement =>
  element instanceof HTMLElement && element.isConnected;

/**
 * Isolates the region while it's in fullscreen and points keyboard and screen reader users at it.
 *
 * Focus moves to the region only when it starts outside, such as when another app or UI Shell put the region in fullscreen. A user who pressed the region's own button keeps focus on it. On exit, focus goes back to where it was, the way a dialog returns focus to its opener, unless focus has since left the region, such as into a menu opened from it.
 *
 * Returns a function that undoes both.
 */
const isolateFullscreenRegion = ({
  regionElement,
}: {
  regionElement: HTMLElement;
}) => {
  // Read before the page around the region goes inert, because the browser drops focus from an inert element.
  const previouslyFocusedElement = getDeepActiveElement();
  const restoreElementsOutside = makeElementsOutsideInert({
    element: regionElement,
  });
  const hasMovedFocus =
    previouslyFocusedElement === null ||
    !regionElement.contains(previouslyFocusedElement);

  if (hasMovedFocus) {
    regionElement.focus({ preventScroll: true });
  }

  return () => {
    restoreElementsOutside();

    const focusedElement = getDeepActiveElement();
    const hasFocusStayedInRegion =
      focusedElement === null ||
      focusedElement === document.body ||
      regionElement.contains(focusedElement);

    if (
      hasMovedFocus &&
      hasFocusStayedInRegion &&
      previouslyFocusedElement &&
      getIsFocusable(previouslyFocusedElement)
    ) {
      previouslyFocusedElement.focus({ preventScroll: true });
    }
  };
};

/**
 * Moves a fixed element from one rect to another, one frame at a time. The end rect is read every frame because the page underneath it can move while the shell's navigation grows back.
 *
 * Returns a function that stops the animation and clears its inline styles.
 */
const animateRegionRect = ({
  element,
  getEndRect,
  onFinish,
  startRect,
}: {
  element: HTMLElement;
  getEndRect: () => RegionRect;
  onFinish: () => void;
  startRect: RegionRect;
}) => {
  // Applied before the browser paints, so the region never flashes at its end size first.
  applyRegionRect({ element, rect: startRect });

  // The latest frame request, so stopping cancels whichever frame is pending.
  const animationFrameStore = createStore<{ animationFrameId: number }>();

  // Timed from the first frame's timestamp, not `performance.now()`. A frame's timestamp can be earlier than the moment it was requested, which would make the first frame's progress negative and move the region backward.
  const animateFrame = ({
    frameTime,
    startTime,
  }: {
    frameTime: number;
    startTime: number;
  }) => {
    const progress = Math.min(
      (frameTime - startTime) / fullscreenTransitionTokens.durationMilliseconds,
      1,
    );

    applyRegionRect({
      element,
      rect: getInterpolatedRect({
        endRect: getEndRect(),
        progress: easeFullscreenTransition(progress),
        startRect,
      }),
    });

    if (progress < 1) {
      animationFrameStore.setState(
        "animationFrameId",
        requestAnimationFrame((nextFrameTime) =>
          animateFrame({ frameTime: nextFrameTime, startTime }),
        ),
      );
    } else {
      onFinish();
    }
  };

  animationFrameStore.setState(
    "animationFrameId",
    requestAnimationFrame((frameTime) =>
      animateFrame({ frameTime, startTime: frameTime }),
    ),
  );

  return () => {
    const animationFrameId = animationFrameStore.getState("animationFrameId");

    if (animationFrameId !== undefined) {
      cancelAnimationFrame(animationFrameId);
    }

    clearRegionRect({ element });
  };
};

export type FullscreenRegionProps = {
  /**
   * The content that fills the viewport while the region is in fullscreen.
   */
  children: ReactNode;
  /**
   * This region's id, from `useFullscreenId`. Pass the same id to every `FullscreenButton` that controls it, wherever that button sits on the page.
   */
  fullscreenId: string;
};

/**
 * A part of a page that can go fullscreen on its own. While it's in fullscreen, it fills the viewport, and Unified UI Shell hides its navigation and banners.
 *
 * Give it an id from `useFullscreenId`, and pass the same id to each `FullscreenButton` that controls it. The button can sit inside the region or anywhere else on the page.
 *
 * The region grows from its place on the page to the viewport, and shrinks back when it exits. It keeps its space on the page the whole time, so nothing around it moves.
 *
 * Regions stack. A region that enters fullscreen while another is in fullscreen covers it, and Escape or its own button goes back to the one under it.
 *
 * While it's on top, the rest of the page is `inert`, so keyboard and screen reader users stay inside the region the same way sighted users do. Dialogs, drawers, and menus opened from inside the region still work, because they render after the page around the region was made inert.
 *
 * Entering and exiting fullscreen are announced to screen readers. If focus was outside the region when it entered fullscreen, focus moves to the region, which is labelled "Fullscreen mode", and goes back when it exits.
 *
 * If the region's element leaves the page while it's in fullscreen without React unmounting it, such as a host page removing a view, it exits. Otherwise UI Shell's navigation would stay hidden with nothing on screen to bring it back.
 *
 * @experimental The fullscreen API is in alpha and may change in a future release.
 */
const FullscreenRegion = ({
  children,
  fullscreenId,
}: FullscreenRegionProps) => {
  const hasAnimations = useAnimation();
  const { t } = useTranslation();
  const {
    exitFullscreen,
    fullscreenStackIndex,
    isFullscreen,
    isInFullscreenStack,
  } = useFullscreen({ fullscreenId });

  // Trails `isInFullscreenStack` while the region shrinks back, so it stays fixed until it lands on its placeholder. A region covered by one above it is still in the stack, so it stays fixed underneath.
  const [isDisplayedFullscreen, setIsDisplayedFullscreen] =
    useState(isInFullscreenStack);
  const [placeholderSize, setPlaceholderSize] = useState<RegionSize>();
  // Read from what's behind the region on the page, so a region inside a `Surface` stays white and one on the UI Shell app area stays gray. Its content was designed against that background.
  const [fullscreenBackgroundColor, setFullscreenBackgroundColor] =
    useState<string>();
  // Empty until the first change, so loading a page never announces anything.
  const [fullscreenAnnouncement, setFullscreenAnnouncement] = useState("");
  const hasEnteredFullscreenRef = useRef(isInFullscreenStack);

  const enterStartRectRef = useRef<RegionRect>();
  const inlineSizesRef = useRef<{
    placeholderSize: RegionSize;
    regionSize: RegionSize;
  }>();
  const placeholderRef = useRef<HTMLDivElement>(null);
  const regionRef = useRef<HTMLDivElement>(null);

  // The content inside the region can change size in the same commit that enters fullscreen, such as a component that reads `useFullscreen` and changes its layout. Sizes kept from before that commit let the region start from what the user saw, and keep the page around it from moving.
  useLayoutEffect(() => {
    const placeholderElement = placeholderRef.current;
    const regionElement = regionRef.current;

    if (isDisplayedFullscreen || !placeholderElement || !regionElement) {
      return;
    }

    const storeInlineSizes = () => {
      inlineSizesRef.current = {
        placeholderSize: getElementSize({ element: placeholderElement }),
        regionSize: getElementSize({ element: regionElement }),
      };
    };

    storeInlineSizes();

    const resizeObserver = new ResizeObserver(storeInlineSizes);
    resizeObserver.observe(placeholderElement);
    resizeObserver.observe(regionElement);

    return () => resizeObserver.disconnect();
  }, [isDisplayedFullscreen]);

  // A layout effect, so each measurement and first frame happens before the browser paints.
  useLayoutEffect(() => {
    const placeholderElement = placeholderRef.current;
    const regionElement = regionRef.current;

    if (!placeholderElement || !regionElement) {
      return;
    }

    if (isInFullscreenStack && !isDisplayedFullscreen) {
      const { left, top } = getElementRect({ element: regionElement });
      const inlineSizes = inlineSizesRef.current ?? {
        placeholderSize: getElementSize({ element: placeholderElement }),
        regionSize: getElementSize({ element: regionElement }),
      };

      enterStartRectRef.current = hasAnimations
        ? { ...inlineSizes.regionSize, left, top }
        : undefined;
      setFullscreenBackgroundColor(
        getBackgroundColorBehindElement({ element: placeholderElement }),
      );
      setPlaceholderSize(inlineSizes.placeholderSize);
      setIsDisplayedFullscreen(true);

      return;
    }

    if (isInFullscreenStack && isDisplayedFullscreen) {
      const enterStartRect = enterStartRectRef.current;
      enterStartRectRef.current = undefined;

      if (!enterStartRect) {
        return;
      }

      return animateRegionRect({
        element: regionElement,
        getEndRect: getViewportRect,
        // Hands the size back to `inset: 0`, so the region follows the viewport when the window resizes.
        onFinish: () => clearRegionRect({ element: regionElement }),
        startRect: enterStartRect,
      });
    }

    if (!isInFullscreenStack && isDisplayedFullscreen) {
      if (!hasAnimations) {
        setIsDisplayedFullscreen(false);

        return;
      }

      // The inline styles stay on after the last frame. This effect's cleanup clears them in the same commit that drops the fixed position, so the region never flashes full size.
      return animateRegionRect({
        element: regionElement,
        getEndRect: () => {
          const placeholderRect = getElementRect({
            element: placeholderElement,
          });

          // The placeholder also holds the margin of the region's first and last child, which sits outside the region once it is back inline.
          return {
            ...placeholderRect,
            height:
              inlineSizesRef.current?.regionSize.height ??
              placeholderRect.height,
          };
        },
        onFinish: () => setIsDisplayedFullscreen(false),
        startRect: getElementRect({ element: regionElement }),
      });
    }

    return;
  }, [hasAnimations, isDisplayedFullscreen, isInFullscreenStack]);

  // Only the region on top isolates. One covered by another region gives that up, so focus and the reading order follow whatever the user can see.
  useEffect(() => {
    const regionElement = regionRef.current;

    if (!isFullscreen || !regionElement) {
      return;
    }

    return isolateFullscreenRegion({ regionElement });
  }, [isFullscreen]);

  useEffect(() => {
    if (isInFullscreenStack) {
      hasEnteredFullscreenRef.current = true;
      setFullscreenAnnouncement(t("fullscreen.entered.text"));
    } else if (hasEnteredFullscreenRef.current) {
      setFullscreenAnnouncement(t("fullscreen.exited.text"));
    }
  }, [isInFullscreenStack, t]);

  useEffect(() => {
    const regionElement = regionRef.current;

    if (!isInFullscreenStack || !regionElement) {
      return;
    }

    return watchElementDisconnection({
      element: regionElement,
      onDisconnected: exitFullscreen,
    });
  }, [exitFullscreen, isInFullscreenStack]);

  // A region that unmounts while in fullscreen would otherwise leave the shell's navigation hidden with nothing on screen to bring it back.
  useEffect(() => exitFullscreen, [exitFullscreen]);

  return (
    <StyledFullscreenRegionPlaceholder
      ref={placeholderRef}
      reservedSize={isDisplayedFullscreen ? placeholderSize : undefined}
    >
      <StyledFullscreenRegion
        aria-label={
          isInFullscreenStack ? t("fullscreen.region.label") : undefined
        }
        fullscreenBackgroundColor={fullscreenBackgroundColor}
        fullscreenStackIndex={fullscreenStackIndex}
        id={getFullscreenElementId({ fullscreenId })}
        isFullscreen={isDisplayedFullscreen}
        ref={regionRef}
        role={isInFullscreenStack ? "region" : undefined}
        tabIndex={isFullscreen ? -1 : undefined}
      >
        {children}
        {/* Inside the region, because everything outside it is inert while it's in fullscreen, and an inert live region is never read. */}
        <StyledFullscreenAnnouncement role="status">
          {fullscreenAnnouncement}
        </StyledFullscreenAnnouncement>
      </StyledFullscreenRegion>
    </StyledFullscreenRegionPlaceholder>
  );
};

const MemoizedFullscreenRegion = memo(FullscreenRegion);
MemoizedFullscreenRegion.displayName = "FullscreenRegion";

export { MemoizedFullscreenRegion as FullscreenRegion };
