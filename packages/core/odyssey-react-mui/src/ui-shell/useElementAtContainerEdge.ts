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

import { useCallback, useEffect, useRef, useState } from "react";

import { getLogicalBoundaries } from "../getLogicalBoundaries.js";

const defaultEdgeState = {
  isAtContainerInlineStart: null,
  isAtContainerInlineEnd: null,
  isAtContainerBlockStart: null,
  isAtContainerBlockEnd: null,
};

type EdgeState =
  | {
      isAtContainerBlockEnd: null;
      isAtContainerBlockStart: null;
      isAtContainerInlineEnd: null;
      isAtContainerInlineStart: null;
    }
  | {
      isAtContainerBlockEnd: boolean;
      isAtContainerBlockStart: boolean;
      isAtContainerInlineEnd: boolean;
      isAtContainerInlineStart: boolean;
    };

/**
 * Determines if an element is at the edge of its container.
 *
 * If `element` is `null`, all returned edge state values will be `null`.
 */
export function useElementAtContainerEdge({
  containerElement,
  element,
  monitoringElement,
}: {
  /**
   * The container element against which the edges are checked. If not provided, it defaults to the document body.
   */
  containerElement?: HTMLElement | null;
  /**
   * The element whose edges you want to track.
   */
  element?: HTMLElement | null;
  /**
   * The element whose mutations you want to track. If not provided, it defaults to the parent element of the `element`.
   */
  monitoringElement?: HTMLElement | null;
}) {
  const [edgeState, setEdgeState] = useState<EdgeState>(defaultEdgeState);

  const requestedAnimationFrameIdRef = useRef(0);

  const resolvedMonitoringElement = monitoringElement ?? element?.parentElement;

  // will check the position of the element and update state accordingly
  const updateEdgeState = useCallback(() => {
    cancelAnimationFrame(requestedAnimationFrameIdRef.current);

    requestedAnimationFrameIdRef.current = requestAnimationFrame(() => {
      if (element) {
        const elementBoundaries = getLogicalBoundaries(element);
        const containerBoundaries = getLogicalBoundaries(
          containerElement ?? document.body,
        );

        setEdgeState({
          isAtContainerInlineStart:
            elementBoundaries.left === containerBoundaries.left,
          isAtContainerInlineEnd:
            elementBoundaries.right === containerBoundaries.right,
          isAtContainerBlockStart:
            elementBoundaries.top === containerBoundaries.top,
          isAtContainerBlockEnd:
            elementBoundaries.bottom === containerBoundaries.bottom,
        });
      } else {
        setEdgeState(defaultEdgeState);
      }
    });
  }, [containerElement, element]);

  useEffect(() => {
    // Listen for mutations that might affect position
    const mutationObserver = new MutationObserver(() => {
      updateEdgeState();
    });

    if (resolvedMonitoringElement) {
      mutationObserver.observe(resolvedMonitoringElement, {
        attributes: true,
        attributeFilter: ["style"],
        childList: true,
        subtree: true,
      });
    }

    // Listen for window resize, which can affect position
    window.addEventListener("resize", updateEdgeState);

    // Initial check
    updateEdgeState();

    // cleanup function to remove listeners and observer
    return () => {
      cancelAnimationFrame(requestedAnimationFrameIdRef.current);
      mutationObserver.disconnect();
      window.removeEventListener("resize", updateEdgeState);
    };
  }, [resolvedMonitoringElement, updateEdgeState]);

  return edgeState;
}
