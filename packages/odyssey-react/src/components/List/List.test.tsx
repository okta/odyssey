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
import { List } from "./List";

describe("List", () => {
  it("renders visibly into the document", () => {
    render(<List />);
    expect(screen.getByRole("list")).toBeVisible();
  });

  it("displays as an ordered list", () => {
    render(<List listType="ordered" />);
    expect(screen.getByRole("list").tagName.toLowerCase() === "ol").toBe(true);
  });

  it("displays as a description list", () => {
    render(<List listType="description" role="list" />);
    expect(screen.getByRole("list").tagName.toLowerCase() === "dl").toBe(true);
  });

  it("adds the proper class for unstyled prop", () => {
    render(<List unstyled={true} />);
    expect(screen.getByRole("list").classList.contains("unstyled")).toBe(true);
  });

  it("restricts children prop via types", () => {
    // @ts-expect-error ReactElement type for children
    <List children="child" />;
  });

  it("restricts style prop via types", () => {
    // @ts-expect-error style is omitted
    <List style={{ color: "#BADA55" }} />;
  });

  it("restricts className prop via types", () => {
    // @ts-expect-error className is omitted
    <List className="foo" />;
  });

  it("invokes ref with expected args after render", () => {
    const ref = jest.fn();

    render(<List ref={ref} />);

    expect(ref).toHaveBeenCalledTimes(1);
    expect(ref).toHaveBeenLastCalledWith(screen.getByRole("list"));
  });

  a11yCheck(() =>
    render(
      <List>
        <List.Item>Foo</List.Item>
        <List.Item>Bar</List.Item>
        <List.Item>Baz</List.Item>
      </List>
    )
  );
});

describe("ListItem", () => {
  it("renders visibly into the document", () => {
    render(
      <List>
        <List.Item>item</List.Item>
      </List>
    );

    expect(screen.getByRole("listitem")).toBeVisible();
  });

  it("invokes ref with expected args after render", () => {
    const ref = jest.fn();

    render(<List.Item ref={ref} children="item" />);

    expect(ref).toHaveBeenCalledTimes(1);
    expect(ref).toHaveBeenLastCalledWith(screen.getByRole("listitem"));
  });
});

describe("DescriptionTerm", () => {
  it("renders visibly into the document", () => {
    render(
      <List listType="description">
        <List.Term>term</List.Term>
        <List.Details>details</List.Details>
      </List>
    );

    // TODO :: Change to getByRole("term") when bug is resolved upstream
    // https://github.com/testing-library/dom-testing-library/issues/703
    expect(screen.getByText("term")).toBeVisible();
  });

  it("invokes ref with expected args after render", () => {
    const ref = jest.fn();

    render(<List.Term ref={ref} children="term" />);

    expect(ref).toHaveBeenCalledTimes(1);
    expect(ref).toHaveBeenLastCalledWith(screen.getByText("term"));
  });
});

describe("DescriptionDetails", () => {
  it("renders visibly into the document", () => {
    render(
      <List listType="description">
        <List.Term>term</List.Term>
        <List.Details>details</List.Details>
      </List>
    );

    expect(screen.getByRole("definition")).toBeVisible();
  });

  it("invokes ref with expected args after render", () => {
    const ref = jest.fn();

    render(<List.Details ref={ref} />);

    expect(ref).toHaveBeenCalledTimes(1);
    expect(ref).toHaveBeenLastCalledWith(screen.getByRole("definition"));
  });
});
