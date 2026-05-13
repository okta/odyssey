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

export const sandboxAttribute = "data-sandbox-root";

/**
 * Attaches a element to `document.body` and tags it with a
 * data sandbox attribute so the global browser-test `afterEach` (in
 * `vitest-browser-setup.ts`) can remove it between tests.
 *
 * ### Why this exists
 *
 * A handful of tests build DOM nodes imperatively (`document.createElement`)
 * and append them directly to `document.body` to exercise hooks and utilities
 * that read layout/scroll/visibility off real DOM (e.g. `useScrollState`,
 * `useElementAtContainerEdge`, `SkipToContent`'s external-focus scenarios,
 * `UiShell`'s web-component bootstrapping). Those nodes live OUTSIDE React's
 * render tree, so vitest-browser-react's auto-cleanup cannot remove them —
 * without some form of cleanup they leak from one test to the next.
 *
 * ### Why not `document.body.innerHTML = ""` in a global afterEach
 *
 * It breaks every component that uses portals.
 * MUI portals (Dialog, Select, Tooltip, DatePicker, Autocomplete listbox,
 * Drawer, Menu, …) attach their content to `document.body` via
 * `ReactDOM.createPortal`. Wiping body while React is still mid-unmount
 * triggers `NotFoundError: Failed to execute 'removeChild' on 'Node'` because
 * React's reconciler tries to remove portal children that our wipe already
 * removed.
 *
 * ### Usage
 *
 * ```ts
 * const containerElement = document.createElement("div");
 * appendToSandbox(containerElement);
 * ...assertions
 * no per-file afterEach needed — the global setup wipes tagged nodes.
 * ```
 */
export const appendToSandbox = <Element extends globalThis.Element>(
  element: Element,
): Element => {
  element.setAttribute(sandboxAttribute, "");
  document.body.append(element);
  return element;
};
