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

import { sandboxAttribute } from "./src/test-utils/appendToSandbox.js";

// Tests that build DOM imperatively (outside React) append via `appendToSandbox(element)`, which marks the element with `[data-sandbox-root]`. We remove only those nodes, NOT `document.body.innerHTML = ""`, because MUI portals (Dialog, Select, Tooltip, DatePicker, Autocomplete, etc.) mount into body and must be cleaned up by React's own unmount path; wiping body races that unmount and throws `NotFoundError: Failed to execute 'removeChild'`.
afterEach(() => {
  document
    .querySelectorAll(`[${sandboxAttribute}]`)
    .forEach((sandboxElement) => sandboxElement.remove());
});
