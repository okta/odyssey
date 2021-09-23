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
import Title from ".";

const heading = "heading";
const titleText = "This is a title.";

describe("Title", () => {
  it("render the title", () => {
    render(<Title children={ titleText } />);

    const headingElement = screen.getByRole(heading);
    expect(headingElement).toBeVisible();
    expect(headingElement.tagName).toBe('H1');
  });

  it('changes the semantic tag based on the level prop', () => {
    render(<Title level="3" children={ titleText } />);

    expect(screen.getByRole(heading).tagName).toBe('H3');
  });

  it('changes the visual appearance based on the visualLevel prop', () => {
    render(<Title level="3" visualLevel="6" children={ titleText } />);
    const component = screen.getByRole(heading);

    expect(component.tagName).toBe('H3');
    expect(component.classList).toContain('level6');
  });

  it('enforces types for polymorphic rest props', () => {
    render(
      // @ts-expect-error heading element does not have href attribute
      <Title href="/foo/bar.baz" children={ titleText } />
    );
    const component = screen.getByRole(heading);
    expect(component).toHaveAttribute('href');
  });

  a11yCheck(() => render(<Title level="1" children={ titleText } />));
});
