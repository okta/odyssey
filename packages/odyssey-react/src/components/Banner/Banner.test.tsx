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

import { render, fireEvent } from "@testing-library/react";
import Banner from ".";
import styles from "./Banner.module.scss";

const role = "status";
const bannerTitle = "Banner title";
const bannerContent = "Banner content";
const bannerActions =
  "Banner actions <a href='https://www.okta.com'>with a link</a>";
const bannerDismissButtonLabel = "Dismiss message";

describe("Banner", () => {
  it("renders the Banner", () => {
    const { getByRole } = render(
      <Banner open title={bannerTitle} content={bannerContent}>
        {bannerActions}
      </Banner>
    );

    expect(getByRole(role)).toBeInTheDocument();
  });

  it("renders the Banner title", () => {
    const { getByText } = render(
      <Banner open title={bannerTitle} content={bannerContent}>
        {bannerActions}
      </Banner>
    );

    expect(getByText(bannerTitle)).toBeInTheDocument();
  });

  it("renders the content", () => {
    const { getByText } = render(
      <Banner open title={bannerTitle} content={bannerContent}>
        {bannerActions}
      </Banner>
    );
    expect(getByText(bannerContent)).toBeInTheDocument();
  });

  it("renders the action (children) content", () => {
    const { getByText } = render(
      <Banner open title={bannerTitle} content={bannerContent}>
        {bannerActions}
      </Banner>
    );
    expect(getByText(bannerActions)).toBeInTheDocument();
  });

  it("hides the banner if visible prop is set to false", () => {
    const { getByRole } = render(
      <Banner open={false} title={bannerTitle} content={bannerContent}>
        {bannerActions}
      </Banner>
    );

    expect(getByRole(role)).toHaveClass(styles.isDismissed);
  });

  it("should NOT display the dismiss button when the onDismiss callback fn is NOT provided", () => {
    const { queryByRole } = render(
      <Banner open title={bannerTitle} content={bannerContent}>
        {bannerActions}
      </Banner>
    );

    expect(queryByRole("button")).toBeNull();
  });

  it("should display the dismiss button when the onDismiss callback fn is provided", () => {
    const handleDismiss = jest.fn();
    const { getByRole } = render(
      <Banner
        open
        title={bannerTitle}
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
        title={bannerTitle}
        content={bannerContent}
        onDismiss={handleDismiss}
        dismissButtonLabel={bannerDismissButtonLabel}
      >
        {bannerActions}
      </Banner>
    );

    fireEvent.click(getByRole("button"));
    expect(handleDismiss).toHaveBeenCalledTimes(1);
  });

  it("should update the aria-label attribute on the dismiss button if dismissButtonLabel is provided", () => {
    const handleDismiss = jest.fn();
    const { getByRole } = render(
      <Banner
        dismissButtonLabel={bannerDismissButtonLabel}
        open
        title={bannerTitle}
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

  a11yCheck(() =>
    render(
      <Banner open title={bannerTitle} content={bannerContent}>
        {bannerActions}
      </Banner>
    )
  );
});
