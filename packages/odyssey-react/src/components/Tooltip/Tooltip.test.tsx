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
import Tooltip from ".";

const label = "label";
const tooltip = "tooltip";
const button = "button";

describe("Tooltip", () => {
  it("renders the tooltip and children as expected", () => {
    const { getByRole } = render(
      <Tooltip label={label} position="top">
        <button>Top</button>
      </Tooltip>
    );

    expect(getByRole(tooltip)).toBeInTheDocument();
    expect(getByRole(button)).toBeInTheDocument();
  });

  it('renders a provided id associating the tooltip and child', () => {
    const { getByRole } = render(
      <Tooltip label={label} position="bottom" id="foo">
        <button>Bottom</button>
      </Tooltip>
    );

    expect(getByRole(button)).toHaveAttribute('aria-describedby', 'foo');
    expect(getByRole(tooltip)).toHaveAttribute('id', 'foo');
  });

  a11yCheck(() => render(<Tooltip label="foo" children={<span>"bar"</span>}/>))
});
