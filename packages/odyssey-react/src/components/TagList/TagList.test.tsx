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
import { TagList } from ".";

const tagList = ["Item one", "Item two", "Item three"];
const list = "list";
const listitem = "listitem";

describe("TagList", () => {
  it("renders the tags as a list", () => {
    render(<TagList tags={tagList} />);

    expect(screen.getByRole(list)).toBeInTheDocument();
  });

  it("renders the tags in the correct order as list items", () => {
    render(<TagList tags={tagList} />);

    const tags = screen.getAllByRole(listitem).map((el) => el.textContent);
    expect(tags).toEqual(tagList);
  });

  it("restricts children prop via types and does not render them", () => {
    render(
      // @ts-expect-error never type for children
      <TagList tags={tagList} children="child" />
    );

    expect(screen.queryByText("child")).toBeNull;
  });

  a11yCheck(() => render(<TagList tags={["foo"]} />));
});
