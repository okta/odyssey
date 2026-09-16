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

import { type RefObject, useEffect, useRef, useState } from "react";

export type UseContainerQueryProps = {
  /** Inclusive upper bound on the target's block-size (px). */
  maxHeight?: number;
  /** Inclusive upper bound on the target's inline-size (px). */
  maxWidth?: number;
  /** Inclusive lower bound on the target's block-size (px). */
  minHeight?: number;
  /** Inclusive lower bound on the target's inline-size (px). */
  minWidth?: number;
  /**
   * Element to observe, passed as a ref or a raw element. The hook returns
   * `false` until an element is present.
   */
  target: RefObject<HTMLElement | null> | HTMLElement | null;
};

const resolveTargetElement = (target: UseContainerQueryProps["target"]) =>
  target && "current" in target ? target.current : target;

/**
 * `borderBoxSize` is typed as an array but is absent in older browsers and a
 * single object in some, so it is narrowed through a predicate that keeps the
 * element type intact (`Array.isArray` alone widens a readonly array to `any[]`).
 */
const isResizeObserverSizeList = (
  borderBoxSize: ResizeObserverSize | readonly ResizeObserverSize[] | undefined,
): borderBoxSize is readonly ResizeObserverSize[] =>
  Array.isArray(borderBoxSize);

const resolveBorderBoxSize = (
  borderBoxSize: ResizeObserverSize | readonly ResizeObserverSize[] | undefined,
): ResizeObserverSize | undefined =>
  isResizeObserverSizeList(borderBoxSize) ? borderBoxSize[0] : borderBoxSize;

const doesSizeMatchQuery = ({
  blockSize,
  inlineSize,
  maxHeight,
  maxWidth,
  minHeight,
  minWidth,
}: {
  blockSize: number;
  inlineSize: number;
} & Omit<UseContainerQueryProps, "target">) =>
  (minWidth === undefined || inlineSize >= minWidth) &&
  (maxWidth === undefined || inlineSize <= maxWidth) &&
  (minHeight === undefined || blockSize >= minHeight) &&
  (maxHeight === undefined || blockSize <= maxHeight);

/**
 * Reports whether an element's size satisfies a container query, mirroring
 * `useMediaQuery` but observing an element with `ResizeObserver` instead of the
 * viewport. Bounds are matched against the target's `inline-size` (width) and
 * `block-size` (height); an omitted bound is always satisfied. Returns `false`
 * until the target element exists (and when `ResizeObserver` is unavailable,
 * e.g. during server rendering).
 */
export const useContainerQuery = ({
  target,
  minWidth,
  maxWidth,
  minHeight,
  maxHeight,
}: UseContainerQueryProps) => {
  const resolvedTargetElement = resolveTargetElement(target);

  const [hasMatches, setHasMatches] = useState(() => {
    if (!resolvedTargetElement) {
      return false;
    }

    const { height, width } = resolvedTargetElement.getBoundingClientRect();

    return doesSizeMatchQuery({
      blockSize: height,
      inlineSize: width,
      maxHeight,
      maxWidth,
      minHeight,
      minWidth,
    });
  });

  const animationFrameIdRef = useRef<number | null>(null);

  useEffect(() => {
    // Resolve the element inside the effect: a `RefObject`'s `current` is `null`
    // during render and only populated after commit, so resolving here (rather
    // than during render) is what lets a ref target attach the observer.
    const targetElement = resolveTargetElement(target);

    if (typeof ResizeObserver === "undefined" || !targetElement) {
      return;
    }

    const resizeObserver = new ResizeObserver(([resizeObserverEntry]) => {
      if (animationFrameIdRef.current !== null) {
        cancelAnimationFrame(animationFrameIdRef.current);
      }

      animationFrameIdRef.current = requestAnimationFrame(() => {
        animationFrameIdRef.current = null;

        if (!resizeObserverEntry) {
          return;
        }

        const borderBoxSize = resolveBorderBoxSize(
          resizeObserverEntry.borderBoxSize,
        );

        setHasMatches(
          doesSizeMatchQuery({
            blockSize:
              borderBoxSize?.blockSize ??
              resizeObserverEntry.contentRect.height,
            inlineSize:
              borderBoxSize?.inlineSize ??
              resizeObserverEntry.contentRect.width,
            maxHeight,
            maxWidth,
            minHeight,
            minWidth,
          }),
        );
      });
    });

    resizeObserver.observe(targetElement);

    return () => {
      resizeObserver.disconnect();

      if (animationFrameIdRef.current !== null) {
        cancelAnimationFrame(animationFrameIdRef.current);
        animationFrameIdRef.current = null;
      }
    };
  }, [maxHeight, maxWidth, minHeight, minWidth, target]);

  return hasMatches;
};
