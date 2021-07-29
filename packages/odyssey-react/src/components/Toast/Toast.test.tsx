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
import { act, render, fireEvent, screen, within, waitForElementToBeRemoved } from "@testing-library/react";
import Toast, { useToast } from ".";
import type { ToastObject } from ".";

const role = 'status';
const title = 'Toast';    
const body = 'Descriptive body content (optional)';
const id = 'my-toast';
const handleDismiss = jest.fn();

describe("Toast", () => {
  it("renders the toast", () => {
    const { getByRole } = render(
      <Toast title={title} body={body} onDismiss={handleDismiss} />
    );

    expect(getByRole(role)).toBeInTheDocument();
  });

  it("renders the toast title", () => {
    const { queryByText } = render(
      <Toast title={title} body={body} onDismiss={handleDismiss} />
    );

    expect(queryByText(title)).toBeInTheDocument();
  });

  it("renders the toast body", () => {
    const { queryByText } = render(
      <Toast title={title} body={body} onDismiss={handleDismiss} />
    );

    expect(queryByText(title)).toBeInTheDocument();
  });
  
  it("does NOT render the toast body if the title prop is not present", () => {
    const { queryByText } = render(
      <Toast title={title} onDismiss={handleDismiss} />
    );

    expect(queryByText(body)).toBeNull();
  });
  
  it("dismisses the toast when the dismiss button is pressed", () => {
    const { getByRole } = render(
      <Toast title={title} body={body} onDismiss={handleDismiss} />
    );

    fireEvent.click(getByRole('button'));
    expect(handleDismiss).toHaveBeenCalledTimes(1);
  });

  a11yCheck(() => render(
    <Toast
      id={id}
      title={title} 
      body={body}
      onDismiss={handleDismiss}
    />
  ))
});

function setup() {
  let addToast: undefined | ((t: ToastObject) => void)

  const Component = () => {
    addToast = useToast()
    return null
  }

  render(
    <Toast.Provider>
      <Component />
    </Toast.Provider>
  )

  return addToast
}

describe("Toast.Provider", () => {
  
  beforeEach(() => {
    jest.setTimeout(10000);
  });

  it('should add a toast', () => {
    const addToast = setup()
    act(() => { addToast?.({ title, body }) })
    const toastNode = screen.getByRole(role)

    expect(within(toastNode).getByText(body)).toBeVisible();
  })

  // @todo: figure out why this times out, the element is not removed.
  // something to do with setup?
  // it('toast should be removed ', async () => {
  //   const addToast = setup()
  //   act(() => { addToast?.({ title, body }) })
  //   const toastNode = screen.getByRole(role)

  //   await waitForElementToBeRemoved(toastNode, { timeout: 10000 });

  //   expect(toastNode).toBeNull();
  // })
});
