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

import { page } from "vitest/browser";

import { Breadcrumb, BreadcrumbList } from "./Breadcrumbs.js";
import { renderWithOdysseyProvider } from "./test-utils/renderWithOdysseyProvider.js";

describe(BreadcrumbList.name, () => {
  test("separators are marked to prevent translation", async () => {
    const { container } = await renderWithOdysseyProvider(
      <BreadcrumbList>
        <Breadcrumb href="/home">Home</Breadcrumb>
        <Breadcrumb href="/section">Section</Breadcrumb>
        <Breadcrumb>Current page</Breadcrumb>
      </BreadcrumbList>,
    );

    await expect(container).toBeAccessible();

    const separators = page.getByText(/\//).elements();

    expect(separators).toHaveLength(2);

    separators.forEach((separator) => {
      expect(separator).toHaveAttribute("translate", "no");
    });
  });

  test("home breadcrumb links to homeHref", async () => {
    const { container } = await renderWithOdysseyProvider(
      <BreadcrumbList homeHref="#home">
        <Breadcrumb href="#one">One</Breadcrumb>
        <Breadcrumb href="#two">Two</Breadcrumb>
      </BreadcrumbList>,
    );

    await expect(container).toBeAccessible();

    await expect
      .element(page.getByLabelText("Home"))
      .toHaveAttribute("href", "#home");
  });
});
