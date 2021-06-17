/*!
 * Copyright (c) 2021-present, Okta, Inc. and/or its affiliates. All rights reserved.
 * The Okta software accompanied by this notice is provided pursuant to the Apache License, Version 2.0 (the "License.")
 *
 * You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0.
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *
 * See the License for the specific language governing permissions and limitations under the License.
 */

import React from "react";
import { render } from "@testing-library/react";
import FieldLabel from ".";
import type { FieldLabelVariant } from ".";

const labelText = "Field Label";

describe("FieldLabel", () => {
  it("renders visibly into the document", () => {
    const { getByText } = render(
      <FieldLabel children={labelText} />
    );

    expect(getByText(labelText)).toBeVisible();
  });

  it("renders a provided id", () => {
    const { getByText } = render(
      <FieldLabel children={labelText} id="foo" />
    );

    expect(getByText(labelText)).toHaveAttribute("id", "foo");
  });

  it.each<[FieldLabelVariant, keyof HTMLElementTagNameMap]>([
    ["label", "label"],
    ["hint", "aside"],
    ["error", "aside"],
    ["optional", "aside"]
  ])("renders %s variant with %s node type", (variant, tagName) => {
    const { getByText } = render(
      <FieldLabel variant={variant} children="foo" />
    );

    expect(getByText("foo").tagName.toLowerCase()).toBe(tagName);
  });

  a11yCheck(() => render(<FieldLabel children="foo" />));
});
