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
import { Link } from ".";

const link = "link";
const href = `#anchor`;
const children = `Link label`;

describe("Link", () => {
  it("renders visibly into the document", () => {
    render(<Link href={href}>{children}</Link>);

    expect(screen.getByRole(link)).toBeVisible();
    expect(screen.getByText(children)).toBeVisible();
  });

  it("requires href via types", () => {
    // @ts-expect-error href is required
    <Link children={children} />;

    <Link href={href} children={children} />;
  });

  it("requires children via types", () => {
    // @ts-expect-error children is required
    <Link href={href} />;

    <Link href={href} children={children} />;
  });

  it("restricts children via types", () => {
    // @ts-expect-error children are typed as ReactText
    <Link href={href} children={<div>"child"</div>} />;
  });

  it("restricts style prop via types", () => {
    // @ts-expect-error style is omitted
    <Link href={href} style={{ color: "#BADA55" }} />;
  });

  it("restricts className prop via types", () => {
    // @ts-expect-error className is omitted
    <Link href={href} className="foo" />;
  });

  it("renders href attributed as expected for link", () => {
    render(<Link href={href}>{children}</Link>);

    expect(screen.getByRole(link)).toHaveAttribute("href", href);
  });

  it("renders target attributed as expected for link", () => {
    render(
      <Link href={href} target="_blank">
        {children}
      </Link>
    );

    expect(screen.getByRole(link)).toHaveAttribute("target", "_blank");
  });

  it("renders rel attributed as expected for link", () => {
    render(
      <Link href={href} rel="noopener">
        {children}
      </Link>
    );

    expect(screen.getByRole(link)).toHaveAttribute("rel", "noopener");
  });

  it("renders an icon", () => {
    render(
      <Link
        icon={
          <svg>
            <title>test</title>
          </svg>
        }
        href={href}
      >
        {children}
      </Link>
    );

    expect(screen.getByTitle("test").parentElement).toBeVisible();
  });

  it("invokes ref with expected args after render", () => {
    const ref = jest.fn();

    render(<Link ref={ref} href={href} children={children} />);

    expect(ref).toHaveBeenCalledTimes(1);
    expect(ref).toHaveBeenLastCalledWith(screen.getByRole(link));
  });

  a11yCheck(() => render(<Link href={href}>{children}</Link>));
  a11yCheck(() =>
    render(
      <Link href={href} variant="monochrome">
        {children}
      </Link>
    )
  );
});
