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
import { Infobox } from ".";

const statusRole = "status";
const heading = "Infobox heading";
const content = "Infobox Content";
const actions = "<a href='https://www.okta.com'>click me</a>";

describe("Infobox", () => {
  it("renders visibly", () => {
    render(<Infobox heading={heading} content={content} actions={actions} />);

    expect(screen.getByRole(statusRole)).toBeVisible();
    expect(screen.getByText(heading)).toBeVisible();
    expect(screen.getByText(content)).toBeVisible();
    expect(screen.getByText(actions)).toBeVisible();
  });

  it("restricts heading and content props via types", () => {
    // @ts-expect-error requires heading or content prop
    <Infobox />;

    <Infobox heading={heading} />;
    <Infobox content={content} />;
    <Infobox heading={heading} content={content} />;
  });

  it("restricts children prop via types and does not render them", () => {
    render(
      // @ts-expect-error never type for children
      <Infobox heading={heading} children="child" />
    );

    expect(screen.queryByText("child")).toBeNull();
  });

  it("invokes ref with expected args after render", () => {
    const ref = jest.fn();

    render(<Infobox ref={ref} heading={heading} actions={actions} />);

    expect(ref).toHaveBeenCalledTimes(1);
    expect(ref).toHaveBeenLastCalledWith(screen.getByRole(statusRole));
  });

  a11yCheck(() =>
    render(<Infobox heading={heading} content={content} actions={actions} />)
  );
});
