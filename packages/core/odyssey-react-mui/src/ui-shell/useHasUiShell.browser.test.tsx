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

import { renderHookWithOdysseyProvider } from "@okta/odyssey-test-tooling/browser";

import { appendToSandbox } from "../test-utils/appendToSandbox.js";
import { uiShellDataAttribute, useHasUiShell } from "./useHasUiShell.js";

describe(useHasUiShell.name, () => {
  test("no UI shell element in the document", async () => {
    const { result } = await renderHookWithOdysseyProvider(() =>
      useHasUiShell(),
    );

    expect(result.current).toBe(false);
  });

  test("UI shell element in the document", async () => {
    const shellElement = document.createElement("div");
    shellElement.setAttribute(uiShellDataAttribute, "");
    appendToSandbox(shellElement);

    const { result } = await renderHookWithOdysseyProvider(() =>
      useHasUiShell(),
    );

    await vi.waitFor(() => {
      expect(result.current).toBe(true);
    });
  });
});
