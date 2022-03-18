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

type OptionalHTMLElement = HTMLElement | null;

interface UseFocusHook {
  restoreFocus: (current: OptionalHTMLElement) => void;
  setFocus: (elem: OptionalHTMLElement) => OptionalHTMLElement;
}

const FOCUSABLE_ITEMS = [
  "button",
  "[href]",
  "input",
  "select",
  "textarea",
  "[tabindex]",
];

const FOCUSABLE_ITEMS_SELECTOR = FOCUSABLE_ITEMS.join(",");

/**
 * Set focus on first focusable element inside node tree
 * @param {HTMLElement} elem - parent element that contains focusable child elements
 * @returns {void}
 */
function setFocus(elem: OptionalHTMLElement): OptionalHTMLElement {
  if (!elem) {
    return null;
  }
  const allItems: NodeListOf<HTMLElement> = elem.querySelectorAll(
    FOCUSABLE_ITEMS_SELECTOR
  );
  const focusableItems = Array.from(allItems).filter((el) => {
    if (el.tabIndex === -1) {
      return false;
    }
    return true;
  });
  // Capture original focused element before setting focus inside modal dialog
  const lastFocusedElement = document.activeElement;
  if (focusableItems.length > 0) {
    requestAnimationFrame(() => {
      // Focus on first focusable element inside dialog
      focusableItems[0].focus();
    });
  }
  return lastFocusedElement as OptionalHTMLElement;
}

/**
 * Restore focus to element with original focus prior to opening modal dialog
 * @param {OptionalHTMLElement} elem
 */
function restoreFocus(elem: OptionalHTMLElement): void {
  if (elem && document.contains(elem)) {
    requestAnimationFrame(() => {
      elem.focus();
    });
  }
}

/**
 * Custom React Hook to provide set/restore focus helper methods
 * @returns {UseFocusHook}
 */
export function useFocus(): UseFocusHook {
  return {
    restoreFocus,
    setFocus,
  };
}
