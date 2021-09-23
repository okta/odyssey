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

import { act, render, fireEvent, screen, within } from "@testing-library/react";
import Toast, { useToast } from ".";
import type { Context } from ".";

const role = "status";
const title = "Toast";
const body = "Descriptive body content (optional)";
const id = "my-toast";

describe("Toast", () => {
  it("renders the toast", () => {
    const { getByRole } = render(<Toast title={title} body={body} />);

    expect(getByRole(role)).toBeInTheDocument();
  });

  it("renders the toast title", () => {
    const { queryByText } = render(<Toast title={title} body={body} />);

    expect(queryByText(title)).toBeInTheDocument();
  });

  it("renders the toast body", () => {
    const { queryByText } = render(<Toast title={title} body={body} />);

    expect(queryByText(title)).toBeInTheDocument();
  });

  it("does NOT render the toast body if the title prop is not present", () => {
    const { queryByText } = render(<Toast title={title} />);

    expect(queryByText(body)).toBeNull();
  });

  it("dismisses the toast when the dismiss button is pressed", () => {
    const handleDismiss = jest.fn();

    const { getByRole } = render(
      <Toast title={title} body={body} onDismiss={handleDismiss} />
    );

    fireEvent.click(getByRole("button"));
    expect(handleDismiss).toHaveBeenCalledTimes(1);
  });

  a11yCheck(() =>
    render(<Toast id={id} title={title} body={body} onDismiss={() => void 0} />)
  );
});

describe("Toast.Provider", () => {
  const handleToastExit = jest.fn();

  function setup() {
    let toaster!: Context;

    const Component = () => {
      toaster = useToast();
      return null;
    };

    render(
      <Toast.Provider onToastExit={handleToastExit}>
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
