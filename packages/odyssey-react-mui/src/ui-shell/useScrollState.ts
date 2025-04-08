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

import { useEffect, useMemo, useState } from "react";

export const getIsScrollHeightElement = ({
  containerElement,
  scrollableElement,
}: {
  containerElement: HTMLElement;
  scrollableElement: HTMLElement;
}) => {
  const containerElementHeight =
    containerElement.getBoundingClientRect().height;
  const scrollableElementHeight =
    scrollableElement.getBoundingClientRect().height;

  return scrollableElementHeight - containerElementHeight >= 0;
};

export const getIsYAxisScrollContainer = (element: HTMLElement) => {
  const overflowY = window.getComputedStyle(element).overflowY;

  return overflowY === "auto" || overflowY === "scroll";
};

export const getIsYAxisScrolling = (element: HTMLElement) =>
  element.scrollHeight > element.clientHeight
    ? getIsYAxisScrollContainer(element)
    : false;

// export const getIsEqualScrollingZone = ({
//   element,
// }: {
//   element: HTMLElement,
// }) => (
//   element.scrollHeight > element.clientHeight
//   ? getIsYAxisScrollContainer(element)
//   : false
// )

export const getNestedScrollContainers = (containerElement: HTMLElement) =>
  Array.from(containerElement.querySelectorAll<HTMLElement>("*"))
    .filter((element) => getIsYAxisScrollContainer(element))
    .filter((scrollableElement) =>
      getIsScrollHeightElement({
        containerElement,
        scrollableElement,
      }),
    );

export const useScrollState = <
  ContainerElement extends HTMLElement = HTMLDivElement,
>(
  /**
   * The element containing a scroll area.
   */
  containerElement: ContainerElement,
) => {
  const [isScrolled, setIsScrolled] = useState(false);

  // TODO: This will need to be part of `MutationObserver` and `useEffect`.
  const scrollableElements = useMemo(
    () => getNestedScrollContainers(containerElement).concat(containerElement),
    [containerElement],
  );

  useEffect(() => {
    let requestedAnimationFrameId: number;

    const updateScrollState = () => {
      cancelAnimationFrame(requestedAnimationFrameId);

      requestedAnimationFrameId = requestAnimationFrame(() => {
        setIsScrolled(
          scrollableElements.reduce(
            (isScrolled, scrollableElement) =>
              isScrolled || scrollableElement.scrollTop > 0,
            false,
          ),
        );
      });
    };

    scrollableElements.forEach((scrollableElement) => {
      scrollableElement.addEventListener("scroll", updateScrollState);
    });

    updateScrollState();

    return () => {
      scrollableElements.forEach((scrollableElement) => {
        scrollableElement.removeEventListener("scroll", updateScrollState);
      });

      cancelAnimationFrame(requestedAnimationFrameId);
    };
  }, [scrollableElements]);

  return {
    isContentScrolled: isScrolled,
  };
};
