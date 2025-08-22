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

import { normalizeText, validateHtmlElement } from "./sanityChecks.js";

// Code modified from: https://github.com/testing-library/jest-dom/blob/main/src/to-have-accessible-errormessage.js

/** @see https://www.w3.org/TR/wai-aria-1.2/#aria-errormessage */
export const getComputedAccessibleErrorMessageText = (
  htmlElement: HTMLElement,
) => {
  validateHtmlElement(htmlElement);

  const ariaErrorMessageId = htmlElement.getAttribute("aria-errormessage");

  // `aria-errormessage` only supports a single `id`.
  if (Boolean(ariaErrorMessageId) && /\s+/.test(ariaErrorMessageId || "")) {
    throw new Error(
      "`aria-errormessage` needs to have a single `id`.".concat(
        "\n",
        `Received: ${ariaErrorMessageId}`,
      ),
    );
  }

  /** @see https://www.w3.org/TR/wai-aria-1.2/#aria-invalid */
  const ariaInvalid = htmlElement.getAttribute("aria-invalid");

  // `aria-invalid` only supports `true` when getting an error message.
  if (!htmlElement.hasAttribute("aria-invalid") || ariaInvalid === "false") {
    throw new Error(
      "`aria-invalid` must be `true` when getting an accessible error message.".concat(
        "\n",
        `Received: ${ariaInvalid}`,
      ),
    );
  }

  return normalizeText(
    htmlElement.ownerDocument.getElementById(ariaErrorMessageId || "")
      ?.textContent ?? "",
  );
};
