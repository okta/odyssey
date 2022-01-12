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
import { screen, render } from "@testing-library/react";
import { ScreenReaderText } from ".";

const content = "This string is visually hidden, but screen-reader accessible.";

describe("ScreenReaderText", () => {
  it("renders visible only to screen readers", () => {
    render(<ScreenReaderText>{content}</ScreenReaderText>);

    expect(screen.getByText(content)).toBeVisible();
    expect(screen.getByText(content)).toHaveStyle(`clip: rect(0 0 0 0)`);
  });

  it("it allows the user to change the tagName using the as prop", () => {
    const tagName = "em";
    const { container } = render(
      <ScreenReaderText as={tagName} children={content} />
    );

    expect(container.querySelector(tagName)).toBeVisible();
  });

  describe("polymorphism", () => {
    it("restricts `as` prop", () => {
      // @ts-expect-error foo is invalid 'as' value
      <ScreenReaderText as="foo" />;
      // @ts-expect-error aside is invalid 'as' value
      <ScreenReaderText as="aside" />;

      // valid
      <ScreenReaderText children={content} />;
      <ScreenReaderText as="span" children={content} />;
      <ScreenReaderText as="em" children={content} />;
      <ScreenReaderText as="strong" children={content} />;
    });
  });

  a11yCheck(() => render(<ScreenReaderText children={content} />));
});
