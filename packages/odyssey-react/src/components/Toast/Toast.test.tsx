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
import { act, render, fireEvent, screen, within } from "@testing-library/react";
import { Toast, useToast } from ".";

const role = "status";
const title = "Toast";
const body = "Descriptive body content (optional)";
const dismissLabel = "Close Toast";

const tree = (props: Record<string, unknown> = {}) => (
  <Toast
    title={title}
    body={body}
    dismissButtonLabel={dismissLabel}
    {...props}
  />
);

describe("Toast", () => {
  it("renders the toast visibly", () => {
    render(tree());

    expect(screen.getByRole(role)).toBeVisible();
  });

  it("renders the toast title visibly", () => {
    render(tree());

    expect(screen.getByText(title)).toBeVisible();
  });

  it("renders the toast body visibly", () => {
    render(tree());

    expect(screen.getByText(body)).toBeVisible();
  });

  it("dismisses the toast when the dismiss button is pressed", () => {
    const handleDismiss = jest.fn();

    render(tree({ onDismiss: handleDismiss }));

    const target = screen.getByRole("button");
    fireEvent.click(target);

    expect(handleDismiss).toHaveBeenCalledTimes(1);
    expect(handleDismiss).toHaveBeenLastCalledWith(
      expect.objectContaining({
        type: "click",
        target,
      })
    );
  });

  it("restricts children prop via types and does not render them", () => {
    render(
      // @ts-expect-error never type for children
      <Toast title={title} dismissButtonLabel={dismissLabel} children="child" />
    );

    expect(screen.queryByText("child")).toBeNull();
  });

  it("invokes ref with expected args after render", () => {
    const ref = jest.fn();

    render(tree({ ref }));

    expect(ref).toHaveBeenCalledTimes(1);
    expect(ref).toHaveBeenLastCalledWith(screen.getByRole(role));
  });

  a11yCheck(() => render(tree()));
});

describe("Toast.Provider", () => {
  const handleToastExit = jest.fn();

  function setup() {
    let toaster!: ReturnType<typeof useToast>;

    const Component = () => {
      toaster = useToast();
      return null;
    };

    render(
      <Toast.Provider
        onToastExit={handleToastExit}
        dismissButtonLabel={dismissLabel}
      >
        <Component />
      </Toast.Provider>
    );

    return toaster;
  }

  it("should add a toast", () => {
    const { addToast } = setup();
    act(() => {
      addToast({ title, body });
    });
    const toastNode = screen.getByRole(role);

    expect(within(toastNode).getByText(body)).toBeVisible();
  });

  it("should invoke onToastExit when the toast exits", () => {
    const { addToast } = setup();
    act(() => {
      addToast({ title, body });
    });

    fireEvent.click(screen.getByRole("button"));
    expect(handleToastExit).toHaveBeenCalledTimes(1);
  });
});
