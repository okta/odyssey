/*!
 * Copyright (c) 2025-present, Okta, Inc. and/or its affiliates. All rights reserved.
 * The Okta software accompanied by this notice is provided pursuant to the Apache License, Version 2.0 (the "License.")
 *
 * You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0.
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *
 * See the License for the specific language governing permissions and limitations under the License.
 */

import { ReactNode } from "react";
import { render } from "vitest-browser-react";
import { page } from "vitest/browser";

import { ConditionalWrapper } from "./ConditionalWrapper.js";

describe(ConditionalWrapper.name, () => {
  const WRAPPER_TEST_ID = "test-wrapper";
  const Wrapper = (children: ReactNode) => (
    <div data-testid={WRAPPER_TEST_ID}>{children}</div>
  );

  const CHILD_TEXT = "Hello World";
  test("children render without wrapper when condition is false", async () => {
    await render(
      <ConditionalWrapper isWrapped={false} Wrapper={Wrapper}>
        <span>{CHILD_TEXT}</span>
      </ConditionalWrapper>,
    );

    await expect
      .element(page.getByTestId(WRAPPER_TEST_ID))
      .not.toBeInTheDocument();
    await expect.element(page.getByText(CHILD_TEXT)).toBeInTheDocument();
  });

  test("children render inside wrapper when condition is true", async () => {
    await render(
      <ConditionalWrapper isWrapped={true} Wrapper={Wrapper}>
        <span>{CHILD_TEXT}</span>
      </ConditionalWrapper>,
    );

    await expect.element(page.getByTestId(WRAPPER_TEST_ID)).toBeInTheDocument();
    await expect
      .element(page.getByTestId(WRAPPER_TEST_ID).getByText(CHILD_TEXT))
      .toBeInTheDocument();
  });
});
