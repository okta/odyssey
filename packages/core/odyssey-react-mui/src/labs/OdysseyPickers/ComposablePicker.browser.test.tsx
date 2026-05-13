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

import { page } from "vitest/browser";

import { renderWithOdysseyProvider } from "../../test-utils/renderWithOdysseyProvider.js";
import { ComposablePicker } from "./ComposablePicker.js";

describe("ComposablePicker", () => {
  test("displays the ComposablePicker", async () => {
    const { container } = await renderWithOdysseyProvider(
      <ComposablePicker
        label="picker label"
        options={[]}
        renderOption={() => <></>}
      />,
    );

    await expect(container).toBeAccessible();

    await expect.element(page.getByLabelText("picker label")).toBeVisible();
  });
});
