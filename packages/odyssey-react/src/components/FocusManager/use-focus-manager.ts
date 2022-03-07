/*!
 * Copyright (c) 2021-present, Okta, Inc. and/or its affiliates. All rights reserved.
 * The Okta software accompanied by this notice is provided pursuant to the Apache License, Version 2.0 (the "License.")
 *
 * You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0.
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *
 * See the License for the specific language governing permissions and limitations under the License.
 */

/*
 * Adapted from Pluralsight Design System's Focus Manager
 * @see https://github.com/pluralsight/design-system/blob/master/packages/focusmanager/src/react/use-focus-manager.ts
 */

import React from "react";

const FOCUSABLE_SELECTORS = [
  '[contenteditable]:not([contenteditable="false"])',
  "[tabindex]",
  "a[href]",
  "audio[controls]",
  "button",
  "iframe",
  "input",
  "select",
  "textarea",
  "video[controls]",
];

export function canUseDOM(): boolean {
  return !!(
    typeof window !== "undefined" &&
    window.document &&
    window.document.createElement
  );
}

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export function useFocusManager(
  ref: React.RefObject<HTMLDivElement>,
  {
    autofocus,
    returnFocus,
    trapped,
  }: {
    autofocus: boolean;
    returnFocus: boolean;
    trapped: boolean;
  }
) {
  const prevActiveElRef = React.useRef<HTMLElement>(null);
  React.useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore: read-only prop
    prevActiveElRef.current = document.activeElement;
  }, []);

  const [node, setNode] = React.useState<HTMLDivElement | null>(null);
  React.useEffect(() => {
    setNode(ref.current);
  }, [ref]);

  const [focusableNodes, setFocusableEls] = React.useState<HTMLElement[]>([]);
  const firstNode = React.useMemo(() => focusableNodes[0], [focusableNodes]);
  const lastNode = React.useMemo(
    () => focusableNodes[focusableNodes.length - 1],
    [focusableNodes]
  );

  React.useEffect(() => {
    const el = ref.current as HTMLDivElement;
    if (focusableNodes.length === 0) {
      el && el.setAttribute("tabindex", "0");
    } else {
      el && el.removeAttribute("tabindex");
    }
  }, [focusableNodes, ref]);

  React.useEffect(() => {
    let observer: MutationObserver | undefined;
    if (canUseDOM() && node instanceof Node) {
      observer = new MutationObserver((mutationList) => {
        mutationList.forEach((mutation) => {
          if (mutation.type === "childList") {
            const nextEls = getFocusableChildNodes(node);
            setFocusableEls(nextEls);
          } else if (
            mutation.type === "attributes" &&
            mutation.attributeName === "hidden"
          ) {
            // Focus on first element if children of observed node are unhidden (e.g. modal is opened)
            // NOTE: Do NOT simplify below to "if (mutation.oldValue) ...",
            //       as an empty string means there is a hidden attribute introduced during the mutation.
            if (mutation.oldValue !== null) {
              const nextEls = getFocusableChildNodes(node);
              nextEls.length && nextEls[0].focus();
            }
          }
        });
      });
      observer.observe(node, {
        attributes: true,
        attributeOldValue: true,
        childList: true,
        subtree: true,
      });
    }

    const nextEls = getFocusableChildNodes(node);
    setFocusableEls(nextEls);

    return () => {
      observer?.disconnect();
    };
  }, [node]);

  React.useEffect(() => {
    if (!autofocus) return;

    const toFocus = firstNode || ref.current;
    toFocus.focus();
  }, [firstNode, autofocus, ref]);

  const handleKeyDown = React.useCallback(
    (evt) => {
      if (!isTab(evt)) return;

      const { activeElement: curActive } = document;

      const reverse = withShift(evt);
      if (curActive === firstNode && reverse) {
        lastNode.focus();
        evt.preventDefault();
        evt.stopPropagation();
      } else if (curActive === lastNode && !reverse) {
        firstNode.focus();
        evt.preventDefault();
        evt.stopPropagation();
      }
    },
    [firstNode, lastNode]
  );
  React.useEffect(
    function bind() {
      if (!trapped) return;

      window.addEventListener("keydown", handleKeyDown);

      return function unbind() {
        window.removeEventListener("keydown", handleKeyDown);
      };
    },
    [handleKeyDown, autofocus, returnFocus, trapped]
  );

  React.useEffect(() => {
    if (!returnFocus) return;

    return function returnFocusWhenUnmounted() {
      if (prevActiveElRef.current) prevActiveElRef.current.focus();
    };
  }, [returnFocus]);
}

function hasNegativeTabIndex(el: Element) {
  return el.getAttribute("tabindex") && Number(el.getAttribute("tabindex")) < 0;
}

function withShift(evt: React.KeyboardEvent) {
  return evt.shiftKey;
}

function isTab(evt: React.KeyboardEvent) {
  return evt.key === "Tab";
}

function getFocusableChildNodes(el?: Element | null) {
  if (!el) return [];

  const selectAll = FOCUSABLE_SELECTORS.join(",");
  const nodelist = el.querySelectorAll(selectAll);

  return Array.from(nodelist || []).filter(
    (node) => !hasNegativeTabIndex(node)
  ) as HTMLElement[];
}
