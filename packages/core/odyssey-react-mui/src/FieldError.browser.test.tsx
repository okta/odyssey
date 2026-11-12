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

import { renderWithOdysseyProvider } from "@okta/odyssey-test-tooling/browser";
import { page } from "vitest/browser";

import { FieldError } from "./FieldError.js";

describe(FieldError.displayName!, () => {
  test("message list", async () => {
    await renderWithOdysseyProvider(
      <FieldError messageList={["Too short", "Missing digit"]} />,
    );

    await expect.element(page.getByText("Too short")).toBeVisible();
    await expect.element(page.getByText("Missing digit")).toBeVisible();
  });
});
