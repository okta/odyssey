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

// Brings in the provider's augmentation of `BrowserCommandContext`, which adds `page`.
import type {} from "@vitest/browser-playwright";
import type { BrowserCommand } from "vitest/node";

// Runs in Node beside Playwright, because only the real mouse can leave the
// page. `userEvent.unhover` hovers `<body>`, which puts the pointer at the
// body's center, on top of whatever a test rendered there. A point above and
// left of the viewport hits no element, so the element under the pointer gets
// its `mouseleave` and nothing can be hovered by accident.
export const parkPointer: BrowserCommand<[]> = async ({ page, provider }) => {
  if (provider.name !== "playwright") {
    throw new Error(`parkPointer needs Playwright, not ${provider.name}.`);
  }

  await page.mouse.move(-1, -1);
};
