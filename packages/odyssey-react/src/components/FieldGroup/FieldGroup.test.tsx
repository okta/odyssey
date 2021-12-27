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
import { render, screen } from "@testing-library/react";
import { FieldGroup } from ".";

const tree = () => (
  <FieldGroup title="foo" desc="bar" children={<input aria-label="baz" />} />
);

describe("FieldGroup", () => {
  it("renders visibly", () => {
    render(tree());
    expect(screen.getByRole("group", { name: "foo" })).toBeVisible();
  });

  it("renders description visibly", () => {
    render(tree());
    expect(screen.getByText("bar")).toBeVisible();
  });

  a11yCheck(() => render(tree()));

  describe("FieldGroup.Error", () => {
    const tree = () => <FieldGroup.Error children="error" />;

    it("renders visibly", () => {
      render(tree());
      expect(screen.getByText("error")).toBeVisible();
    });

    a11yCheck(() => render(tree()));
  });
});
