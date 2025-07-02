/*!
 * Copyright (c) 2024-present, Okta, Inc. and/or its affiliates. All rights reserved.
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

export const getIsScrollHeightElement = ({
  containerElement,
  element,
}: {
  containerElement: HTMLElement;
  element: HTMLElement;
}) => {
  const containerElementHeight =
    containerElement.getBoundingClientRect().height;
  const elementHeight = element.getBoundingClientRect().height;

  return elementHeight - containerElementHeight >= 0;
};

export const getIsYAxisScrollContainer = (element: HTMLElement) => {
  const overflowY = window.getComputedStyle(element).overflowY;

  return overflowY === "auto" || overflowY === "scroll";
};

export const getIsYAxisScrolling = (element: HTMLElement) =>
  element.scrollHeight > element.clientHeight
    ? getIsYAxisScrollContainer(element)
    : false;

export const getNestedScrollContainers = (containerElement: HTMLElement) =>
  Array.from(containerElement.querySelectorAll<HTMLElement>("*"))
    .filter((element) =>
      getIsScrollHeightElement({
        containerElement,
        element,
      }),
    )
    .filter((scrollHeightElement) =>
      getIsYAxisScrollContainer(scrollHeightElement),
    );

export const fakeDefaultContainerElement = document.createElement("div");

export const useScrollState = <
  ContainerElement extends HTMLElement = HTMLDivElement,
>(
  /**
   * The element containing a scroll area.
   */
  containerElement: ContainerElement | null,
) => {
  const [isScrolled, setIsScrolled] = useState(false);

  const requestedAnimationFrameIdRef = useRef(0);
  const scrollableElementsRef = useRef<HTMLElement[]>([]);

  const updateScrollState = useCallback(() => {
    cancelAnimationFrame(requestedAnimationFrameIdRef.current);

    requestedAnimationFrameIdRef.current = requestAnimationFrame(() => {
      setIsScrolled(
        scrollableElementsRef.current.reduce(
          (isScrolled, scrollableElement) =>
            isScrolled || scrollableElement.scrollTop > 0,
          false,
        ),
      );
    });
  }, []);

  const addScrollEventListeners = useCallback(() => {
    scrollableElementsRef.current.forEach((scrollableElement) => {
      scrollableElement.addEventListener("scroll", updateScrollState);
    });
  }, [updateScrollState]);

  const removeScrollEventListeners = useCallback(() => {
    scrollableElementsRef.current.forEach((scrollableElement) => {
      scrollableElement.removeEventListener("scroll", updateScrollState);
    });
  }, [updateScrollState]);

  const updateScrollableElements = useCallback(() => {
    const computedContainerElement =
      containerElement || fakeDefaultContainerElement;

    scrollableElementsRef.current = getNestedScrollContainers(
      computedContainerElement,
    ).concat(computedContainerElement);
  }, [containerElement]);

  const updateScrollListeners = useCallback(() => {
    removeScrollEventListeners();
    updateScrollableElements();
    addScrollEventListeners();
    updateScrollState();
  }, [
    addScrollEventListeners,
    removeScrollEventListeners,
    updateScrollableElements,
    updateScrollState,
  ]);

  useEffect(() => {
    const mutationObserver = new MutationObserver(() => {
      updateScrollListeners();
    });

    if (containerElement) {
      mutationObserver.observe(containerElement, {
        attributes: true,
        attributeFilter: ["style"],
        childList: true,
        subtree: true,
      });
    }

    updateScrollListeners();

    return () => {
      cancelAnimationFrame(requestedAnimationFrameIdRef.current);
      removeScrollEventListeners();
      mutationObserver.disconnect();
    };
  }, [containerElement, removeScrollEventListeners, updateScrollListeners]);

  return {
    isContentScrolled: isScrolled,
  };
};
