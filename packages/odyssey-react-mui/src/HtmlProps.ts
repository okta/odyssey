/*!
 * Copyright (c) 2023-present, Okta, Inc. and/or its affiliates. All rights reserved.
 * The Okta software accompanied by this notice is provided pursuant to the Apache License, Version 2.0 (the "License.")
 *
 * You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0.
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *
 * See the License for the specific language governing permissions and limitations under the License.
 */

import { HTMLAttributes } from "react";

export type HtmlProps = {
  /**
   * Used in [ARIA live regions](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/ARIA_Live_Regions), the global aria-busy state indicates an element is being modified and that assistive technologies may want to wait until the changes are complete before informing the user about the update.
   */
  ariaBusy?: HTMLAttributes<HTMLElement>["aria-busy"];
  /**
   * The `aria-checked` attribute indicates the current "checked" state of checkboxes, radio buttons, and other widgets.
   *
   * NOTE: Where possible use an HTML `<input>` element with `type="checkbox"` and `type="radio"` as these have built in semantics and do not require ARIA attributes.
   */
  ariaChecked?: HTMLAttributes<HTMLElement>["aria-checked"];
  /**
   * The global `aria-controls` property identifies the element (or elements) whose contents or presence are controlled by the element on which this attribute is set.
   *
   * Value: A space-separated list of one or more ID values referencing the elements being controlled by the current element
   */
  ariaControls?: HTMLAttributes<HTMLElement>["aria-controls"];
  /**
   * The global `aria-describedby` attribute identifies the element (or elements) that describes the element on which the attribute is set.
   *
   * Value: The id or space-separated list of element ids that describe the current element.
   *
   * Note: The `aria-describedby` attribute is not designed to reference descriptions from external resources. It must reference elements in the same DOM document.
   */
  ariaDescribedBy?: HTMLAttributes<HTMLElement>["aria-describedby"];
  /**
   * The `aria-errormessage` attribute on an object identifies the element that provides an error message for that object.
   *
   * Value: The value of the id of the element containing the error message for the current element
   */
  ariaErrorMessage?: HTMLAttributes<HTMLElement>["aria-errormessage"];
  /**
   * The `aria-expanded` attribute is set on an element to indicate if a control is expanded or collapsed, and whether or not the controlled elements are displayed or hidden.
   */
  ariaExpanded?: HTMLAttributes<HTMLElement>["aria-expanded"];
  /**
   * The `aria-haspopup` attribute indicates the availability and type of interactive popup element that can be triggered by the element on which the attribute is set.
   */
  ariaHasPopup?: HTMLAttributes<HTMLElement>["aria-haspopup"];
  ariaHidden?: HTMLAttributes<HTMLElement>["aria-hidden"];
  /**
   * The `aria-label` attribute defines a string value that labels an interactive element.
   */
  ariaLabel?: HTMLAttributes<HTMLElement>["aria-label"];
  /**
   * The `aria-labelledby` attribute identifies the element (or elements) that labels the element it is applied to.
   *
   * Value: Space separated list of one or more ID values referencing the elements that label the current element.
   */
  ariaLabelledBy?: HTMLAttributes<HTMLElement>["aria-labelledby"];
  /**
   * The `aria-pressed` attribute indicates the current "pressed" state of a toggle button.
   */
  ariaPressed?: HTMLAttributes<HTMLElement>["aria-pressed"];
  /**
   * The `tabindex` global attribute allows developers to make HTML elements focusable, allow or prevent them from being sequentially focusable
   *
   * Note: Manipulating the natural tab order is generally advised against
   */
  tabIndex?: HTMLAttributes<HTMLElement>["tabIndex"];
  /**
   * This prop puts a `data` attribute on an HTML element in this component with the value provided.
   *
   * @deprecated **WARNING:** You should be using Semantic Selectors instead of this property. This is a temporary measure for backwards compatibility with existing Selenium tests.
   */
  testId?: string;
  /**
   * This prop puts a `translate` attribute on an HTML element. It should be used to indicate whether text within the element should be translated.
   */
  translate?: "yes" | "no";
};
