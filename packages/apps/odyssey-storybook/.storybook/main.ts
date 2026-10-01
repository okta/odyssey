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

import { createStorybookMain } from "@okta/odyssey-storybook-preset";

// The host Storybook composes the per-package Storybooks named in STORYBOOK_REFS
// on top of its own remaining stories (Odyssey Core, Unified UI Shell, and the
// cross-cutting Docs). Shared stories glob, preview head, addons, framework,
// typescript, and refs come from the preset so every Storybook in the fleet
// stays consistent.
export default createStorybookMain({
  staticDirs: ["../src/static"],
});
