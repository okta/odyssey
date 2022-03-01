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
  restoreFocus: () => void;
  setFocus: (elem: OptionalHTMLElement) => void;
}

const FOCUSABLE_ITEMS_SELECTOR =
  'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])';

// Store original focused element to restore original focus after modal is closed
const focusedElementMap = new Map();
const originalFocusedElemKey = "originalFocusedElement";

/**
 * Set focus on first focusable element inside node tree
 * @param {HTMLElement} elem - parent element that contains focusable child elements
 * @returns {void}
 */
function setFocus(elem: OptionalHTMLElement): void {
  if (!elem) {
    return;
  }
  const focusableItems: NodeListOf<HTMLElement> = elem.querySelectorAll(
    FOCUSABLE_ITEMS_SELECTOR
  );
  if (focusableItems.length > 0) {
    setTimeout(() => {
      // Capture original focused element before setting focus inside modal dialog
      focusedElementMap.set(originalFocusedElemKey, document.activeElement);
      // Focus on first focusable element inside dialog
      focusableItems[0].focus();
    });
  }
}

/**
 * Restore focus to element with original focus prior to opening modal dialog
 */
function restoreFocus(): void {
  const originalFocusedElem = focusedElementMap.get(originalFocusedElemKey);
  if (originalFocusedElem) {
    setTimeout(() => {
      originalFocusedElem.focus();
    });
  }
}

/**
 * Custom React Hook to obtain the current focused element and provide the setFocus helper method
 * @returns {UseFocusHook}
 */
export function useFocus(): UseFocusHook {
  return {
    restoreFocus,
    setFocus,
  };
}
