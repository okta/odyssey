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
import { Icon } from "./Icon";

const title = "Icon";
const name = "check";

describe("Icon", () => {
  it("renders a titled image icon visibly into document", () => {
    render(<Icon name={name} title={title} />);

    const svgElement = screen.getByRole("img");
    expect(svgElement).toBeVisible();
    expect(screen.getByLabelText(title)).toEqual(svgElement);
  });

  it("renders a presentation icon visibly into document", () => {
    render(<Icon name={name} />);

    const svgElement = screen.getByRole("presentation");
    expect(svgElement).toBeVisible();
  });

  it("restricts children prop via types and does not render them", () => {
    render(
      // @ts-expect-error never type for children
      <Icon name={name} children="child" />
    );

    expect(screen.queryByText("child")).toBeNull();
  });

  a11yCheck(() => render(<Icon name={name} title={title} />));
});
