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

import {
  getBackgroundColor,
  getElementComputedBackgroundColor,
  isTransparentColor,
  normalizeBackgroundColor,
} from "../useContrastMode.js";

type ViewportPoint = {
  x: number;
  y: number;
};

const getVisibleCenter = ({
  element,
}: {
  element: Element;
}): ViewportPoint | undefined => {
  const { bottom, left, right, top } = element.getBoundingClientRect();

  const visibleBottom = Math.min(bottom, document.documentElement.clientHeight);
  const visibleLeft = Math.max(left, 0);
  const visibleRight = Math.min(right, document.documentElement.clientWidth);
  const visibleTop = Math.max(top, 0);

  return visibleLeft < visibleRight && visibleTop < visibleBottom
    ? {
        x: (visibleLeft + visibleRight) / 2,
        y: (visibleTop + visibleBottom) / 2,
      }
    : undefined;
};

/**
 * Every element under a point, front to back, including elements inside open shadow roots. `elementsFromPoint` stops at a shadow host, and UI Shell draws its app area inside one.
 */
const getElementsAtPoint = ({
  root,
  viewportPoint,
}: {
  root: Document | ShadowRoot;
  viewportPoint: ViewportPoint;
}): Element[] =>
  root
    .elementsFromPoint(viewportPoint.x, viewportPoint.y)
    // A shadow root also returns the elements outside it. Those are already in the outer list.
    .filter(
      (elementAtPoint) =>
        root instanceof Document || elementAtPoint.getRootNode() === root,
    )
    .flatMap((elementAtPoint) =>
      elementAtPoint.shadowRoot
        ? getElementsAtPoint({
            root: elementAtPoint.shadowRoot,
            viewportPoint,
          }).concat(elementAtPoint)
        : [elementAtPoint],
    );

/**
 * The background color seen behind an element: the first opaque background under its center that sits behind it.
 *
 * Reading the element's ancestors isn't enough. UI Shell lays the app over its app area rather than inside it, so the gray behind an app is on none of the app's ancestors.
 *
 * Falls back to the element's ancestors when it isn't on screen.
 */
export const getBackgroundColorBehindElement = ({
  element,
}: {
  element: HTMLElement;
}): string => {
  const viewportPoint = getVisibleCenter({ element });

  const elementsAtPoint = viewportPoint
    ? getElementsAtPoint({ root: document, viewportPoint })
    : [];

  const elementIndex = elementsAtPoint.indexOf(element);

  const backgroundColorBehind =
    elementIndex === -1
      ? undefined
      : elementsAtPoint
          .slice(elementIndex + 1)
          .filter(
            (elementBehind): elementBehind is HTMLElement =>
              elementBehind instanceof HTMLElement,
          )
          .map(getElementComputedBackgroundColor)
          .find((backgroundColor) => !isTransparentColor(backgroundColor));

  return backgroundColorBehind
    ? normalizeBackgroundColor(backgroundColorBehind)
    : getBackgroundColor(element);
};
