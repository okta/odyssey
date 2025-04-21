/*!
 * Copyright (c) 2024-present, Okta, Inc. and/or its affiliates. All rights reserved.
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
import { Typography, Heading1 } from "./Typography.js";

describe("Typography", () => {
  test("renders Overline", () => {
    render(
      <Typography ariaLabel="overline" variant="overline">
        Overline test
      </Typography>,
    );

    expect(screen.getByLabelText("overline")).toBeVisible();
  });

  test("renders with role", () => {
    render(
      <Typography ariaLabel="heading" variant="h1" isPresentational>
        Heading test
      </Typography>,
    );

    const element = screen.getByLabelText("heading");
    expect(element).toBeVisible();
    expect(element).toHaveAttribute("role", "presentation");
  });

  test("does not render role attribute when undefined", () => {
    render(
      <Typography ariaLabel="heading" variant="h1">
        Heading test
      </Typography>,
    );

    const element = screen.getByLabelText("heading");
    expect(element).toBeVisible();
    expect(element).not.toHaveAttribute("role");
  });

  describe("Heading1", () => {
    test("renders correctly with isPresentional prop", () => {
      render(
        <Heading1 ariaLabel="heading" variant="h1" isPresentational>
          Heading test
        </Heading1>,
      );

      const element = screen.getByLabelText("heading");
      expect(element).toBeVisible();
      expect(element).toHaveAttribute("role", "presentation");
    });

    test("renders correctly with isPresentional prop", () => {
      render(
        <Heading1 ariaLabel="heading" variant="h1">
          Heading test
        </Heading1>,
      );

      const element = screen.getByLabelText("heading");
      expect(element).toBeVisible();
      expect(element).not.toHaveAttribute("role");
    });
  });
});
