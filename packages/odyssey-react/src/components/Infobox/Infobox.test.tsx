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
import Infobox from ".";

const role = "status";
const infoboxTitle = "Infobox title";
const infoboxContent = "Infobox.Content container.";
const infoboxActions = "Infobox.Actions container, <a href='https://www.okta.com'>with a link</a>.";

describe("Infobox", () => {
  it('renders the Infobox', () => {
    const { getByRole } = render(
      <Infobox title={infoboxTitle}>
        <Infobox.Content>{infoboxContent}</Infobox.Content>
      </Infobox>
    );

    expect(getByRole(role)).toBeInTheDocument();
  });

  it('renders the Infobox title', () => {
    const { getByText } = render(
      <Infobox title={infoboxTitle}>
        <Infobox.Content>{infoboxContent}</Infobox.Content>
      </Infobox>
    );

    expect(getByText(infoboxTitle)).toBeInTheDocument();
  });

  it('renders the Infobox.Content', () => {
    const { getByText } = render(
      <Infobox>
        <Infobox.Content>{infoboxContent}</Infobox.Content>
      </Infobox>
    );
    expect(getByText(infoboxContent)).toBeInTheDocument();
  });

  it('renders the Infobox.Actions', () => {
    const { getByText } = render(
      <Infobox>
        <Infobox.Actions>{infoboxActions}</Infobox.Actions>
      </Infobox>
    );
    expect(getByText(infoboxActions)).toBeInTheDocument();
  });

  it('renders through children that are not expected', () => {
    render(
      // @ts-expect-error Infobox does not accept text as children
      <Infobox>
        oops
      </Infobox>
    );

    expect(screen.getByRole(role)).toContainHTML('oops');
  });

  a11yCheck(() => render(
      <Infobox title={infoboxTitle}>
        <Infobox.Content>{infoboxContent}</Infobox.Content>
        <Infobox.Actions>{infoboxActions}</Infobox.Actions>
      </Infobox>
    ))
});
