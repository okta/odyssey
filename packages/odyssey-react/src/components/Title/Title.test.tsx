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
import Title from ".";

const title = "heading";
const titleText = "This is a title.";

describe("Title", () => {
  it("render the title", () => {
    const { getByText } = render(<Title level={1} children={titleText} />);

    expect(getByText(titleText)).toBeInTheDocument();
  });

  it('changes the semantic tag based on the level prop', () => {
    const { getByRole } = render(<Title level={3} children={titleText} />);

    expect(getByRole(title).tagName).toBe('H3');
  });

  it('changes the visual appearance based on the visualLevel prop', () => {
    const { getByRole } = render(<Title level={3} visualLevel={6} children={titleText} />);
    const component = getByRole(title);

    expect(component.tagName).toBe('H3');
    expect(component.classList).toContain('level6');
  });

  it('enforces types for polymorphic rest props', () => {
    render(
      // @ts-expect-error heading element does not have href attribute
      <Title href="/foo/bar.baz" children={titleText} />
    );
    const component = screen.getByRole(title);
    expect(component).toHaveAttribute('href');
  });

  a11yCheck(() => render(<Title level={1} children={titleText} />));
});
