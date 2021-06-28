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
// import type { EventType } from "@testing-library/dom";
import Link from ".";

const link = 'link';
const href = `#anchor`;
const label = `Link label`;


describe("Checkbox", () => {
  it('renders visibly into the document', () => {
    const { getByRole } = render(
      <Link href={href}>{label}</Link>
    );

    expect(getByRole(link)).toBeVisible();
  });

  it('renders href attributed as expected for link', () => {
    const { getByRole } = render(
      <Link href={href}>{label}</Link>
    );

    expect(getByRole(link)).toHaveAttribute('href', href);
  });

  it('renders target attributed as expected for link', () => {
    const { getByRole } = render(
      <Link href={href} target="_blank">{label}</Link>
    );

    expect(getByRole(link)).toHaveAttribute('target', '_blank');
  });

  it('renders rel attributed as expected for link', () => {
    const { getByRole } = render(
      <Link href={href} rel="noopener">{label}</Link>
    );

    expect(getByRole(link)).toHaveAttribute('rel', 'noopener');
  });

  a11yCheck(() => render(<Link href={href}>{label}</Link>))
});
