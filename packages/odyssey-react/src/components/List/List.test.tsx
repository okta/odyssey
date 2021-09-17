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
import List from "./List";
import ListItem from "./ListItem";
import DescriptionTerm from "./DescriptionTerm";
import DescriptionDetails from "./DescriptionDetails";

describe("List", () => {
  it('renders visibly into the document', () => {
    const { getByRole } = render(
      <List />
    );

    expect(getByRole('list')).toBeVisible();
  });

  it("displays as an ordered list", () => {
    const { getByRole } = render(
      <List listType={'ordered'} />
    );
    expect(getByRole('list').tagName.toLowerCase() === 'ol').toBe(true);
  });

  it("displays as a description list", () => {
    const { getByRole } = render(
      <List listType={'description'} role="list" />
    );
    expect(getByRole('list').tagName.toLowerCase() === 'dl').toBe(true);
  });

  it("adds the proper class for unstyled prop", () => {
    const { getByRole } = render(
      <List unstyled={true} />
    );
    expect(getByRole('list').classList.contains('unstyled')).toBe(true);
  });
});

describe("ListItem", () => {
  it('renders visibly into the document', () => {
    const { getByRole } = render(
      <List>
        <ListItem>item</ListItem>
      </List>
    );

    expect(getByRole('listitem')).toBeVisible();
  });
});

describe("DescriptionTerm", () => {
  it('renders visibly into the document', () => {
    const { getByText } = render(
      <List listType="description">
        <DescriptionTerm>term</DescriptionTerm>
        <DescriptionDetails>details</DescriptionDetails>
      </List>
    );
    
    // TODO :: Change to getByRole("term") when bug is resolved upstream
    // https://github.com/testing-library/dom-testing-library/issues/703
    expect(getByText('term')).toBeVisible();
  });
});

describe("DescriptionDetails", () => {
  it('renders visibly into the document', () => {
    const { getByRole } = render(
      <List listType="description">
        <DescriptionTerm>term</DescriptionTerm>
        <DescriptionDetails>details</DescriptionDetails>
      </List>
    );

    expect(getByRole('definition')).toBeVisible();
  });
});
