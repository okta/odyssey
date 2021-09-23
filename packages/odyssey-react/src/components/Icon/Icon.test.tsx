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

import { render } from "@testing-library/react";
import Icon from "./Icon";

const iconTitle = 'Icon';

describe("Icon", () => {
  it("render the icon", () => {
    const { getByTitle } = render(<Icon title={iconTitle}><svg></svg></Icon>);
    const svgElement = getByTitle(iconTitle).parentElement;
    expect(svgElement).toBeVisible();
    expect(svgElement).toHaveAttribute('role', 'img');
  });

  it("has presentation role without title", () => {
    const { getByRole } = render(<Icon><svg></svg></Icon>);
    const svgElement = getByRole('presentation');
    expect(svgElement).toBeVisible();
  });

  a11yCheck(() => render(<Icon><svg></svg></Icon>));
});
