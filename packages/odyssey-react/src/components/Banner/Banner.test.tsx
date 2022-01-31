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
import { render, fireEvent, screen } from "@testing-library/react";
import { Banner } from ".";

const role = "status";
const bannerHeading = "Banner heading";
const bannerContent = "Banner content";
const bannerActions =
  "Banner actions <a href='https://www.okta.com'>with a link</a>";
const bannerDismissButtonLabel = "Dismiss message";

describe("Banner", () => {
  it("renders the Banner visibly into document", () => {
    const { getByRole } = render(
      <Banner open heading={bannerHeading} content={bannerContent}>
        {bannerActions}
      </Banner>
    );

    expect(getByRole(role)).toBeVisible();
  });

  it("renders the Banner heading visibly into document", () => {
    const { getByText } = render(
      <Banner open heading={bannerHeading} content={bannerContent}>
        {bannerActions}
      </Banner>
    );

    expect(getByText(bannerHeading)).toBeVisible();
  });

  it("renders the content visibly into document", () => {
    const { getByText } = render(
      <Banner open heading={bannerHeading} content={bannerContent}>
        {bannerActions}
      </Banner>
    );
    expect(getByText(bannerContent)).toBeVisible();
  });

  it("renders the action (children) visibly into document", () => {
    const { getByText } = render(
      <Banner open heading={bannerHeading} content={bannerContent}>
        {bannerActions}
      </Banner>
    );
    expect(getByText(bannerActions)).toBeVisible();
  });

  it("hides the banner if visible prop is set to false", () => {
    const { getByRole } = render(
      <Banner open={false} heading={bannerHeading} content={bannerContent}>
        {bannerActions}
      </Banner>
    );

    expect(getByRole(role, { hidden: true })).not.toBeVisible();
  });

  it("does not render the dismiss button when the onDismiss callback is omitted", () => {
    const { queryByRole } = render(
      <Banner open heading={bannerHeading} content={bannerContent}>
        {bannerActions}
      </Banner>
    );

    expect(queryByRole("button")).toBeNull();
  });

  it("renders the dismiss button when the onDismiss callback is provided", () => {
    const handleDismiss = jest.fn();
    const { getByRole } = render(
      <Banner
        open
        heading={bannerHeading}
        content={bannerContent}
        onDismiss={handleDismiss}
        dismissButtonLabel={bannerDismissButtonLabel}
      >
        {bannerActions}
      </Banner>
    );
    expect(getByRole("button")).toBeInTheDocument();
  });

  it("should call onDismiss when the dismiss button is clicked", () => {
    const handleDismiss = jest.fn();
    const { getByRole } = render(
      <Banner
        open
        heading={bannerHeading}
        content={bannerContent}
        onDismiss={handleDismiss}
        dismissButtonLabel={bannerDismissButtonLabel}
      >
        {bannerActions}
      </Banner>
    );

    const buttonTarget = getByRole("button");
    fireEvent.click(buttonTarget);
    expect(handleDismiss).toHaveBeenCalledTimes(1);
    expect(handleDismiss).toHaveBeenLastCalledWith(
      expect.objectContaining({
        type: "click",
        target: buttonTarget,
      })
    );
  });

  it("should update the aria-label attribute on the dismiss button if dismissButtonLabel is provided", () => {
    const handleDismiss = jest.fn();
    const { getByRole } = render(
      <Banner
        dismissButtonLabel={bannerDismissButtonLabel}
        open
        heading={bannerHeading}
        content={bannerContent}
        onDismiss={handleDismiss}
      >
        {bannerActions}
      </Banner>
    );

    expect(getByRole("button")).toHaveAttribute(
      "aria-label",
      bannerDismissButtonLabel
    );
  });

  it("invokes ref with expected args after render", () => {
    const ref = jest.fn();

    render(
      <Banner ref={ref} open heading={bannerHeading} content={bannerContent} />
    );

    expect(ref).toHaveBeenCalledTimes(1);
    expect(ref).toHaveBeenLastCalledWith(screen.getByRole(role));
  });

  it("restricts onDismiss and dismissButtonLabel via types", () => {
    // @ts-expect-error requires dismissButtonLabel prop with onDismiss prop
    <Banner
      onDismiss={jest.fn()}
      heading={bannerHeading}
      content={bannerContent}
    />;

    // @ts-expect-error requires onDismiss prop with dismissButtonLabel prop
    <Banner
      dismissButtonLabel={bannerDismissButtonLabel}
      heading={bannerHeading}
      content={bannerContent}
    />;

    <Banner
      onDismiss={jest.fn()}
      dismissButtonLabel={bannerDismissButtonLabel}
      heading={bannerHeading}
      content={bannerContent}
    />;
    <Banner heading={bannerHeading} content={bannerContent} />;
  });

  a11yCheck(() =>
    render(
      <Banner open heading={bannerHeading} content={bannerContent}>
        {bannerActions}
      </Banner>
    )
  );
});
