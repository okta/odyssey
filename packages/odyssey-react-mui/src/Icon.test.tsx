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
import { Icon } from "./Icon";

const title = "Icon";
const name = "check";

describe("Icon", () => {
  it("renders an icon based on name prop", () => {
    render(<Icon name={name} titleAccess={title} />);

    const svgElement = screen.getByRole("img");
    expect(svgElement).toBeVisible();
    expect(screen.getByTitle(title).parentNode).toEqual(svgElement);
  });

  it("requires name prop", () => {
    const { container } = render(
      // @ts-expect-error requires name prop
      <Icon />
    );

    expect(container).toBeEmptyDOMElement();
  });

  it("restricts children prop via types", () => {
    render(
      // @ts-expect-error never type for children
      <Icon name={name} children="child" />
    );
  });

  /* NOTE: the DOM output here is valid and a11y but we're seeing a violation:
     https://dequeuniversity.com/rules/axe/4.2/svg-img-alt

  a11yCheck(() => {
    const ret = render(<Icon name={name} titleAccess={title} />)
  });
  */
});
