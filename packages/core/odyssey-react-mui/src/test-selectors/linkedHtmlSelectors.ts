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

import { getRole } from "dom-accessibility-api";
import { type AriaRole } from "react";

import { ElementError } from "./sanityChecks.js";

/**
 * For `aria-haspopup`:
 * @see https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-haspopup
 * For `datalist`:
 * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Element/datalist
 */
export const getControlledElement = ({
  element,
  role,
}: {
  element: HTMLElement;
  /** If this element controls multiple items, it might be valuable to help narrow down the specific item's `role`. */
  role?: AriaRole;
}) => {
  if (element instanceof HTMLInputElement && element.list) {
    return element.list;
  }

  if (element.getAttribute("aria-expanded") === "false") {
    throw new ElementError(
      "Popup isn't open in ARIA; therefore, it cannot be captured.",
      element,
    );
  }

  const linkedElementIds =
    element.getAttribute("aria-controls") || element.getAttribute("aria-owns");

  if (!linkedElementIds) {
    throw new ElementError(
      "Popup isn't linked; therefore, it cannot be captured.",
      element,
    );
  }

  const linkedElement = linkedElementIds
    .split(" ")
    .map((linkedElementId) =>
      element.ownerDocument.getElementById(linkedElementId),
    )
    // This can be `.filter(Boolean)` when Inferred Type Predicates is in TypeScript (which should be part of the version we're using): https://www.typescriptlang.org/docs/handbook/release-notes/typescript-5-5.html#:~:text=Inferred%20Type%20Predicates,Thanks%20Dan!
    .filter((linkedElement): linkedElement is HTMLElement =>
      Boolean(linkedElement),
    )
    .find((linkedElement) =>
      role ? getRole(linkedElement) === role : Boolean(linkedElement),
    );

  if (!linkedElement) {
    throw new ElementError(
      "Controlled element isn't available; therefore, it cannot be captured.",
      element,
    );
  }

  return linkedElement;
};
