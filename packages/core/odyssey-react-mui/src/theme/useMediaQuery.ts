/*!
 * Copyright (c) 2025-present, Okta, Inc. and/or its affiliates. All rights reserved.
 * The Okta software accompanied by this notice is provided pursuant to the Apache License, Version 2.0 (the "License.")
 *
 * You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0.
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *
 * See the License for the specific language governing permissions and limitations under the License.
 */

import { useCallback, useMemo } from "react";
// React's `useSyncExternalStore` does not exist before React 18. Import it from
// the official backport shim so the hook resolves on React 16.8+/17 consumers
// too; the shim delegates to the native hook when running on React 18.
import { useSyncExternalStore } from "use-sync-external-store/shim";

import { StringWithValue } from "../StringWithValue.js";

/**
 * Subscribes to a CSS media query and returns whether it currently matches,
 * re-rendering when the match state changes. Accepts the query with or without
 * a leading `@media` prefix. Uses `useSyncExternalStore` so the match is read
 * synchronously at render time (no tearing, no stale first frame), and
 * degrades to `false` in environments without `matchMedia` (server render,
 * jsdom).
 */
export const useMediaQuery = <MediaQuery extends string>(
  mediaQuery: StringWithValue<MediaQuery>,
) => {
  // A leading `@media` prefix is valid CSS but is rejected by
  // `window.matchMedia`, so strip it to accept either form of the query.
  const normalizedMediaQuery = mediaQuery.replace(/^@media( ?)/m, "");

  // jsdom and server environments may not implement `matchMedia`. Guard so the
  // hook degrades to "no match" instead of throwing during render.
  const supportsMatchMedia =
    typeof window !== "undefined" && typeof window.matchMedia !== "undefined";

  const mediaQueryList = useMemo(
    () => (supportsMatchMedia ? window.matchMedia(normalizedMediaQuery) : null),
    [supportsMatchMedia, normalizedMediaQuery],
  );

  // `useSyncExternalStore` reads the match synchronously at render time, so
  // every component in a concurrent render sees a consistent value (no
  // tearing) and there is no stale first frame before an effect runs.
  const subscribe = useCallback(
    (notifyReactOfChange: () => void) => {
      if (!mediaQueryList) {
        return () => {};
      }

      mediaQueryList.addEventListener("change", notifyReactOfChange);

      return () => {
        mediaQueryList.removeEventListener("change", notifyReactOfChange);
      };
    },
    [mediaQueryList],
  );

  const getSnapshot = useCallback(
    () => mediaQueryList?.matches ?? false,
    [mediaQueryList],
  );

  // Server render (and any environment without `matchMedia`) resolves to "no
  // match", consistent with the guard above.
  const getServerSnapshot = useCallback(() => false, []);

  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
};

/**
 * The absolute minimum viewport width, in CSS pixels, that the UI supports.
 * WCAG 1.4.10 (Reflow) requires content to remain usable down to 320px, so
 * this is the hard floor below which layout must not lose information or
 * functionality.
 */
export const ABSOLUTE_MINIMUM_WIDTH = 320;

/**
 * The absolute minimum viewport height, in CSS pixels, that the UI supports:
 * the hard floor below which layout must not lose information or functionality.
 */
export const ABSOLUTE_MINIMUM_HEIGHT = 256;

// Each axis starts adapting a set distance above its absolute-minimum floor so
// the UI gets breathing room instead of snapping exactly at the floor. Width
// uses a small buffer just above the reflow floor. Height uses a much larger
// one: around 500px the app starts to feel cramped (still usable, but not
// pleasant), so we adapt the layout there rather than waiting for the 256px
// floor.
const COMPACT_WIDTH_ACTIVATION_BUFFER = 80;
const COMPACT_HEIGHT_ACTIVATION_BUFFER = 244;

/**
 * The widest viewport, in CSS pixels, still treated as compact-width. At or
 * below this width the layout adapts toward the absolute-minimum floor.
 */
export const COMPACT_MAX_WIDTH =
  ABSOLUTE_MINIMUM_WIDTH + COMPACT_WIDTH_ACTIVATION_BUFFER;

/**
 * The tallest viewport, in CSS pixels, still treated as compact-height. At or
 * below this height the layout adapts toward the absolute-minimum floor.
 */
export const COMPACT_MAX_HEIGHT =
  ABSOLUTE_MINIMUM_HEIGHT + COMPACT_HEIGHT_ACTIVATION_BUFFER;

/**
 * The `matchMedia` and CSS condition for each axis. This is the only place that
 * turns a threshold into a condition string, so the hook and the style overrides
 * cannot drift.
 */
const COMPACT_CONDITION_BY_AXIS = {
  height: `(max-height: ${COMPACT_MAX_HEIGHT}px)`,
  width: `(max-width: ${COMPACT_MAX_WIDTH}px)`,
} as const;

/** The axis names that `toCompactMediaQuery` accepts. */
export type CompactViewportAxis = keyof typeof COMPACT_CONDITION_BY_AXIS;

/**
 * Builds the compact CSS `@media` rule for the given axes. The rule matches when
 * any one of those axes is compact. Use the result as a key in a style override
 * object, where a React hook cannot run.
 *
 * Give the name of an axis, not a condition string. The function holds the
 * threshold, so no caller can pass a wrong pixel value, and the compact
 * conditions need no export at all.
 *
 * A viewport has two axes, so the parameters spell out every legal call: one
 * axis, then at most one axis that the first call did not name. TypeScript
 * rejects a call with no axis, a repeated axis, or a third axis.
 *
 * Call `useCompactViewportMatches` in a component instead.
 *
 * This function stays internal to the package. Add it to the public `index.ts`
 * only when a consumer outside the package needs it.
 */
export const toCompactMediaQuery = <FirstAxis extends CompactViewportAxis>(
  firstAxis: FirstAxis,
  otherAxis?: Exclude<CompactViewportAxis, FirstAxis>,
) =>
  `@media ${[firstAxis, otherAxis]
    .filter((axis) => axis !== undefined)
    .map((axis) => COMPACT_CONDITION_BY_AXIS[axis])
    .join(",")}`;

/**
 * Reports whether the viewport is within the compact range, i.e. approaching
 * the absolute minimum supported size along either axis (each axis activates at
 * its own buffer above the floor). Returns a match per dimension plus a combined
 * flag so callers can adapt layout (e.g. switch a Dialog to full-screen) as the
 * viewport approaches the WCAG 1.4.10 reflow floor rather than snapping exactly
 * at it.
 *
 * `isWithinCompactWidthOrHeight` is `true` when either dimension is compact. It
 * matches a style override that gives both axes to `toCompactMediaQuery`.
 */
export const useCompactViewportMatches = () => {
  const isWithinCompactWidth = useMediaQuery(COMPACT_CONDITION_BY_AXIS.width);
  const isWithinCompactHeight = useMediaQuery(COMPACT_CONDITION_BY_AXIS.height);

  return useMemo(
    () => ({
      isWithinCompactWidth,
      isWithinCompactHeight,
      isWithinCompactWidthOrHeight:
        isWithinCompactWidth || isWithinCompactHeight,
    }),
    [isWithinCompactWidth, isWithinCompactHeight],
  );
};
