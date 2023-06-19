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

import { render, fireEvent, screen, waitFor } from "@testing-library/react";
import { Banner } from "./Banner";

describe("Banner", () => {
  it.each(["status", "alert", undefined])(
    "renders a status based on role",
    (roleType) => {
      const text = "Test Alert";
      const linkTest = "Link Text";
      render(
        <Banner
          role={roleType}
          severity="info"
          text={text}
          linkText={linkTest}
          linkUrl="linkurl"
        />
      );

      expect(screen.getByText(text)).toBeVisible();
      expect(screen.getByText(linkTest)).toBeVisible();
    }
  );

  it("requires link link url when link text is defined", () => {
    render(
      <Banner
        role="status"
        severity="info"
        text="test text"
        linkText="test link text"
      />
    );

    expect(screen.queryByText("test link text")).toBeNull();
  });

  it("calls onclose when close is clicked", async () => {
    const handleOnClose = jest.fn();

    render(<Banner severity="info" text="test text" onClose={handleOnClose} />);

    fireEvent.click(screen.getByTitle("Close"));
    await waitFor(() => expect(handleOnClose).toBeCalled());
  });
});
