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

import { CSSProperties, RefObject, useEffect, useMemo } from "react";
import { DesignTokens } from "../OdysseyDesignTokensContext.js";
import { SharedUnifiedUiShellProps } from "./SharedUnifiedUiShellProps.js";

export const convertCamelCaseToKebabCase = (string: string) =>
  string.replace(/([A-Z])/g, "-$1").toLowerCase();

export const setStylesToMatchElement = ({
  additionalStyles,
  appContainerElement,
  appContentReferenceElement,
}: {
  additionalStyles: CSSProperties;
  appContainerElement: HTMLElement;
  appContentReferenceElement: HTMLElement;
}) => {
  const boundingRect = appContentReferenceElement.getBoundingClientRect();

  appContainerElement.style.setProperty("position", "absolute");
  appContainerElement.style.setProperty("top", `${boundingRect.y}px`);
  appContainerElement.style.setProperty("left", `${boundingRect.x}px`);
  appContainerElement.style.setProperty("width", `${boundingRect.width}px`);
  appContainerElement.style.setProperty("height", `${boundingRect.height}px`);

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

export type UseRepositionAppElementToContainerProps = {
  appContainerRef: RefObject<HTMLDivElement>;
  odysseyDesignTokens: DesignTokens;
  /**
   * Array of refs of items that indirectly resize the app content area such as "side nav" and "top nav".
   */
  resizingRefs: Array<RefObject<HTMLDivElement>>;
} & SharedUnifiedUiShellProps;

export const useRepositionAppElementToContainer = ({
  appContainerElement,
  appContainerScrollingMode,
  appContainerRef,
  hasStandardAppContentPadding,
  odysseyDesignTokens,
  resizingRefs,
}: UseRepositionAppElementToContainerProps) => {
  const appContainerElementStyles = useMemo<CSSProperties>(
    () => ({
      ...(hasStandardAppContentPadding
        ? {
            paddingBlock: odysseyDesignTokens.Spacing5 ?? null,
            paddingInline: odysseyDesignTokens.Spacing8 ?? null,
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
    [
      hasStandardAppContentPadding,
      appContainerScrollingMode,
      odysseyDesignTokens,
    ],
  );

  useEffect(() => {
    // Once `appContainerRef` is rendered, we can position `appContainerElement` on top to match.
    if (appContainerRef.current && appContainerElement) {
      let animationFrameId: number;

      const updateStyles = () => {
        cancelAnimationFrame(animationFrameId);

        animationFrameId = requestAnimationFrame(() => {
          if (appContainerRef.current) {
            setStylesToMatchElement({
              additionalStyles: appContainerElementStyles,
              appContentReferenceElement: appContainerRef.current,
              appContainerElement,
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

      // Setup a mutation observer to sync later updates
      const observer = new ResizeObserver(updateStyles);

      observer.observe(appContainerRef.current);

      resizingElements.forEach((resizingElement) => {
        resizingElement.addEventListener("transitionend", updateStyles);

        observer.observe(resizingElement);
      });

      // Set the initial styles
      updateStyles();

      return () => {
        observer.disconnect();

        resizingElements.forEach((resizingElement) => {
          resizingElement.removeEventListener("transitionend", updateStyles);
        });
      };
    }
    return () => {};
  }, [appContainerElement, appContainerElementStyles, appContainerRef]);
};
