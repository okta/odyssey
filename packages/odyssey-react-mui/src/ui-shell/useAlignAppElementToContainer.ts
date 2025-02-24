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

import { CSSProperties, RefObject, useEffect, useMemo, useRef } from "react";

import { useOdysseyDesignTokens } from "../OdysseyDesignTokensContext.js";
import { UiShellContentProps } from "./uiShellContentTypes.js";

export const convertCamelCaseToKebabCase = (string: string) =>
  string.replace(/([A-Z])/g, "-$1").toLowerCase();

export const setStylesToMatchElement = ({
  additionalStyles,
  appContainerElement,
  appContentReferenceElement,
  parentElement,
}: {
  additionalStyles: CSSProperties;
  appContainerElement: HTMLElement;
  appContentReferenceElement: HTMLElement;
  parentElement: HTMLElement;
}) => {
  const appContentReferenceRectangle =
    appContentReferenceElement.getBoundingClientRect();
  const parentElementRectangle = parentElement.getBoundingClientRect();

  appContainerElement.style.setProperty("position", "absolute");
  appContainerElement.style.setProperty(
    "top",
    `${appContentReferenceRectangle.top - parentElementRectangle.top}px`,
  );
  appContainerElement.style.setProperty(
    "left",
    `${appContentReferenceRectangle.left - parentElementRectangle.left}px`,
  );
  appContainerElement.style.setProperty(
    "width",
    `${appContentReferenceRectangle.width}px`,
  );
  appContainerElement.style.setProperty(
    "height",
    `${appContentReferenceRectangle.height}px`,
  );
  appContainerElement.style.setProperty("z-index", "1");

  (
    Object.entries(additionalStyles) as Array<
      [
        keyof typeof additionalStyles,
        (typeof additionalStyles)[keyof typeof additionalStyles],
      ]
    >
  ).forEach(([cssPropertyName, cssPropertyValue]) => {
    appContainerElement.style.setProperty(
      convertCamelCaseToKebabCase(cssPropertyName),
      String(cssPropertyValue),
    );
  });
};

export type UseAlignAppElementToContainerProps = {
  /**
   * Ref for the App Container in UI Shell. This should be the one inside the Shell, **not** the element we're going to align.
   */
  appContainerRef: RefObject<HTMLDivElement>;
  /**
   * Padding around the app area. "comfortable" is designed for wider views whereas "compact" is designed for narrower views.
   */
  appContentPadding: "comfortable" | "compact" | "none";
  /**
   * Array of refs of items that indirectly resize the app content area such as "side nav" and "top nav".
   */
  resizingRefs: Array<RefObject<HTMLDivElement>>;
} & Pick<
  UiShellContentProps,
  "appContainerElement" | "appContainerScrollingMode"
>;

export const useAlignAppElementToContainer = ({
  appContainerElement,
  appContainerRef,
  appContainerScrollingMode,
  appContentPadding,
  resizingRefs,
}: UseAlignAppElementToContainerProps) => {
  const odysseyDesignTokens = useOdysseyDesignTokens();

  const parentContainerRef = useRef<HTMLDivElement>(null);

  const appContainerElementStyles = useMemo<CSSProperties>(
    () => ({
      ...(appContentPadding === "comfortable"
        ? {
            paddingBlock: odysseyDesignTokens.Spacing5,
            paddingInline: odysseyDesignTokens.Spacing8,
          }
        : {}),
      ...(appContentPadding === "compact"
        ? {
            paddingBlock: odysseyDesignTokens.Spacing5,
            paddingInline: odysseyDesignTokens.Spacing5,
          }
        : {}),
      ...(appContainerScrollingMode === "horizontal" ||
      appContainerScrollingMode === "both"
        ? {
            overflowX: "auto",
          }
        : {
            overflowX: "hidden",
          }),
      ...(appContainerScrollingMode === "vertical" ||
      appContainerScrollingMode === "both"
        ? {
            overflowY: "auto",
          }
        : {
            overflowY: "hidden",
          }),
    }),
    [appContainerScrollingMode, appContentPadding, odysseyDesignTokens],
  );

  useEffect(() => {
    // Once `appContainerRef` is rendered, we can position `appContainerElement` on top to match.
    if (
      appContainerRef.current &&
      appContainerElement &&
      parentContainerRef.current
    ) {
      let animationFrameId: number;

      const updateStyles = () => {
        cancelAnimationFrame(animationFrameId);

        animationFrameId = requestAnimationFrame(() => {
          if (appContainerRef.current && parentContainerRef.current) {
            setStylesToMatchElement({
              additionalStyles: appContainerElementStyles,
              appContentReferenceElement: appContainerRef.current,
              appContainerElement,
              parentElement: parentContainerRef.current,
            });
          }
        });
      };

      // These refs might change by the time we unsubscribe, so we need to keep references to the original elements.
      const resizingElements = resizingRefs
        .map((resizingRef) => resizingRef.current)
        .filter((element): element is NonNullable<typeof element> =>
          Boolean(element),
        );

      // Set up a mutation observer to sync later updates
      const observer = new ResizeObserver(updateStyles);

      // document.addEventListener("ready", updateStyles);

      resizingElements.forEach((resizingElement) => {
        resizingElement.addEventListener("transitionend", updateStyles);

        observer.observe(resizingElement);
      });

      // Set the initial styles
      updateStyles();

      // setTimeout(updateStyles, 5000)

      return () => {
        observer.disconnect();

        // document.removeEventListener("ready", updateStyles);

        resizingElements.forEach((resizingElement) => {
          resizingElement.removeEventListener("transitionend", updateStyles);
        });
      };
    }
    return () => {};
  }, [appContainerElement, appContainerElementStyles, appContainerRef]);

  return {
    parentContainerRef,
  };
};
