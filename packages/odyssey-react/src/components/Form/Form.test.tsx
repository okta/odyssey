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
import { Form } from ".";

const tree = () => (
  <Form title="foo" desc="bar" children={<input aria-label="baz" />} />
);

describe("Form", () => {
  it("renders visibly", () => {
    render(tree());
    const input = screen.getByRole("textbox", {
      name: "baz",
    }) as HTMLInputElement;
    expect(input).toBeVisible();
    expect(input.form).toBeVisible();
  });

  it("renders title heading visibly", () => {
    render(tree());
    expect(screen.getByRole("heading", { name: "foo" })).toBeVisible();
  });

  it("renders description visibly", () => {
    render(tree());
    expect(screen.getByText("bar")).toBeVisible();
  });

  a11yCheck(() => render(tree()));

  describe("Form.Error", () => {
    const tree = () => <Form.Error children="error" />;

    it("renders visibly", () => {
      render(tree());
      expect(screen.getByText("error")).toBeVisible();
    });

    a11yCheck(() => render(tree()));
  });

  describe("Form.Main", () => {
    const tree = () => <Form.Main children="main" />;

    it("renders visibly", () => {
      render(tree());
      expect(screen.getByText("main")).toBeVisible();
    });

    a11yCheck(() => render(tree()));
  });

  describe("Form.Actions", () => {
    const tree = () => <Form.Actions children="actions" />;

    it("renders visibly", () => {
      render(tree());
      expect(screen.getByText("actions")).toBeVisible();
    });

    a11yCheck(() => render(tree()));
  });
});
