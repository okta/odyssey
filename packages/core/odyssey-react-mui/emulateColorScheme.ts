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

// Runs in Node beside Playwright, so a browser test can flip the real
// `prefers-color-scheme` the way an OS setting would, rather than faking
// `matchMedia`. The fake would skip the change event `system` mode listens for.
export const emulateColorScheme: BrowserCommand<
  [colorScheme: "dark" | "light" | "no-preference"]
> = async ({ page, provider }, colorScheme) => {
  if (provider.name !== "playwright") {
    throw new Error(
      `emulateColorScheme needs Playwright, not ${provider.name}.`,
    );
  }

  await page.emulateMedia({ colorScheme });
};

declare module "vitest/browser" {
  interface BrowserCommands {
    emulateColorScheme: (
      colorScheme: "dark" | "light" | "no-preference",
    ) => Promise<void>;
  }
}
