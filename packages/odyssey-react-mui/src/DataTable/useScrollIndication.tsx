/*!
 * Copyright (c) 2023-present, Okta, Inc. and/or its affiliates. All rights reserved.
 * The Okta software accompanied by this notice is provided pursuant to the Apache License, Version 2.0 (the "License.")
 *
 * You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0.
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *
 * See the License for the specific language governing permissions and limitations under the License.
 */

import {
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  useRef,
} from "react";

type UseScrollIndicationProps = {
  tableOuterContainer: HTMLDivElement | null;
  tableInnerContainer: HTMLDivElement | null;
  setIsTableContainerScrolledToStart: Dispatch<SetStateAction<boolean>>;
  setIsTableContainerScrolledToEnd: Dispatch<SetStateAction<boolean>>;
  setTableInnerContainerWidth: Dispatch<SetStateAction<string>>;
};
export const useScrollIndication = ({
  tableOuterContainer,
  tableInnerContainer,
  setIsTableContainerScrolledToStart,
  setIsTableContainerScrolledToEnd,
  setTableInnerContainerWidth,
}: UseScrollIndicationProps) => {
  const animationFrameIdRef = useRef<number | null>(null);

  const resizeObserverRef = useRef<ResizeObserver | null>(null);

  const checkScrollIndicators = useCallback(() => {
    if (!tableOuterContainer || !tableInnerContainer) return;

    const containerWidth = tableOuterContainer.clientWidth;
    const contentWidth = tableInnerContainer.scrollWidth;
    const containerStartScrollPosition = tableInnerContainer.scrollLeft;
    const containerEndScrollPosition =
      containerStartScrollPosition + containerWidth;

    setIsTableContainerScrolledToStart(containerStartScrollPosition <= 16);
    setIsTableContainerScrolledToEnd(
      containerEndScrollPosition >= contentWidth - 16,
    );
  }, [
    tableInnerContainer,
    tableOuterContainer,
    setIsTableContainerScrolledToEnd,
    setIsTableContainerScrolledToStart,
  ]);

  useEffect(() => {
    // Avoid creating multiple observers or if ResizeObserver is unsupported
    if (typeof ResizeObserver === "undefined" || resizeObserverRef.current) {
      return;
    }

    let debounceTimer: ReturnType<typeof setTimeout>;

    resizeObserverRef.current = new ResizeObserver(() => {
      clearTimeout(debounceTimer);
      debounceTimer = setTimeout(() => {
        if (!animationFrameIdRef.current) {
          animationFrameIdRef.current = requestAnimationFrame(() => {
            checkScrollIndicators();
            animationFrameIdRef.current = null;
          });
        }

        setTableInnerContainerWidth(
          tableInnerContainer?.clientWidth
            ? `${tableInnerContainer.clientWidth}px`
            : "100%",
        );
      }, 100); // debounce delay
    });

    if (tableOuterContainer && tableOuterContainer.parentElement) {
      resizeObserverRef.current.observe(tableOuterContainer.parentElement);
    }

    return () => {
      if (resizeObserverRef.current) {
        resizeObserverRef.current.disconnect();
        resizeObserverRef.current = null;
      }
      clearTimeout(debounceTimer); // Ensure timer is cleared on component unmount
      if (animationFrameIdRef.current) {
        cancelAnimationFrame(animationFrameIdRef.current);
        animationFrameIdRef.current = null;
      }
    };
  }, [
    checkScrollIndicators,
    setTableInnerContainerWidth,
    tableOuterContainer,
    tableInnerContainer,
    setIsTableContainerScrolledToStart,
    setIsTableContainerScrolledToEnd,
  ]);

  useEffect(() => {
    tableInnerContainer?.addEventListener("scroll", checkScrollIndicators);
    return () =>
      tableInnerContainer?.removeEventListener("scroll", checkScrollIndicators);
  }, [tableInnerContainer, checkScrollIndicators]); // Re-run when innerContainerRef changes

  // Initial check to set state correctly on mount
  useEffect(() => {
    checkScrollIndicators();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
};
