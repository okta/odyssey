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

import { render, screen } from "@testing-library/react";
import { Text } from "./";

const children = "Text child content.";

describe("Text", () => {
  it("renders visibly into the document", () => {
    render(<Text children={children} />);

    expect(screen.getByText(children)).toBeVisible();
  });

  it("it allows the user to change the tagName using the as prop", () => {
    const tagName = "abbr";
    const { container } = render(<Text as={tagName} children={children} />);

    expect(container.querySelector(tagName)).toBeVisible();
  });

  it("restricts children via types", () => {
    // @ts-expect-error children are typed as required ReactNode
    <Text />;
  });

  it("restricts style prop via types", () => {
    // @ts-expect-error style is omitted
    <Text style={{ color: "#BADA55" }} children={children} />;
  });

  it("restricts className prop via types", () => {
    // @ts-expect-error className is omitted
    <Text className="foo" children={children} />;
  });

  describe("polymorphism", () => {
    it("restricts `as` prop", () => {
      // @ts-expect-error foo is invalid 'as' value
      <Text as="foo" children={children} />;
      // @ts-expect-error aside is invalid 'as' value
      <Text as="aside" children={children} />;

      // valid
      <Text children={children} />;
      <Text as="address" children={children} />;
      <Text as="code" children={children} />;
      <Text as="blockquote" children={children} />;
    });

    it("restricts polymorphic props based on `as` prop", () => {
      const cite = "https://www.example.com";
      // @ts-expect-error cite is not a valid attr for span
      <Text as="span" cite={cite} children={children} />;
      // @ts-expect-error cite should be string
      <Text as="blockquote" cite={123} children={children} />;

      // valid
      <Text as="blockquote" cite={cite} children={children} />;
    });
  });

  a11yCheck(() => render(<Text children={children} />));
});
