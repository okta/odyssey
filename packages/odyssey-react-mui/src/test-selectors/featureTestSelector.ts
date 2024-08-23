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

import {
  type ByRoleOptions,
  type SelectorMatcherOptions,
} from "@testing-library/dom";

import {
  type RoleSelectorMethod,
  type TextSelectorMethod,
} from "./getByQuerySelector";

/**
 * We can't use React's `AriaRole` because it allows any string value. We want to be very specific. This is otherwise copied straight from React's code.
 * @see https://github.com/DefinitelyTyped/DefinitelyTyped/blob/master/types/react/index.d.ts#L2815
 */
export type AriaRole =
  | "alert"
  | "alertdialog"
  | "application"
  | "article"
  | "banner"
  | "button"
  | "cell"
  | "checkbox"
  | "columnheader"
  | "combobox"
  | "complementary"
  | "contentinfo"
  | "definition"
  | "dialog"
  | "directory"
  | "document"
  | "feed"
  | "figure"
  | "form"
  | "grid"
  | "gridcell"
  | "group"
  | "heading"
  | "img"
  | "link"
  | "list"
  | "listbox"
  | "listitem"
  | "log"
  | "main"
  | "marquee"
  | "math"
  | "menu"
  | "menubar"
  | "menuitem"
  | "menuitemcheckbox"
  | "menuitemradio"
  | "navigation"
  | "none"
  | "note"
  | "option"
  | "presentation"
  | "progressbar"
  | "radio"
  | "radiogroup"
  | "region"
  | "row"
  | "rowgroup"
  | "rowheader"
  | "scrollbar"
  | "search"
  | "searchbox"
  | "separator"
  | "slider"
  | "spinbutton"
  | "status"
  | "switch"
  | "tab"
  | "table"
  | "tablist"
  | "tabpanel"
  | "term"
  | "textbox"
  | "timer"
  | "toolbar"
  | "tooltip"
  | "tree"
  | "treegrid"
  | "treeitem";

export type RoleSelector = {
  method: RoleSelectorMethod;
  options: Record<string, keyof ByRoleOptions>;
  role: AriaRole | AriaRole[];
  // | "UNKNOWN" // This should be a `Symbol`, but it can't because this is ultimately going to be JSON stringified.
};

export type TextSelector = {
  method: TextSelectorMethod;
  options: Record<string, keyof SelectorMatcherOptions>;
  text: string;
};

export type Selector = RoleSelector | TextSelector;

export type TestSelector = {
  selector: Selector;
};

export type Feature = Record<
  string,
  FeatureTestSelector & { isControlledElement?: true }
>;

export type FeatureSelector = {
  feature: Feature;
};

export type AccessibleLabelSelectorType =
  | "description"
  | "errorMessage"
  | "label";

export type AccessibleLabelSelector = {
  /** An "accessible -> semantic" name mapping such as "`description` -> `hint`". */
  accessibleText: Record<string, AccessibleLabelSelectorType>;
};

export type FeatureTestSelector =
  | FeatureSelector
  | TestSelector
  | (FeatureSelector & TestSelector)
  | (AccessibleLabelSelector & TestSelector)
  | (FeatureSelector & AccessibleLabelSelector & TestSelector);
