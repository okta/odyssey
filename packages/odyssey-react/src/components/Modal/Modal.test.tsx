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
import Modal from ".";

const role = "dialog";
const testid = "ods-modal";
const modalTitle = "Modal Title";

describe("Modal", () => {
  it("renders into the document", () => {
    const handleClose = jest.fn();
    const { getByRole, getByTestId } = render(
      <Modal open={true} onClose={handleClose}>
        <Modal.Header>{modalTitle}</Modal.Header>
      </Modal>
    );

    expect(getByRole(role)).toBeInTheDocument();
    expect(getByTestId(testid)).toHaveAttribute("aria-hidden", "false");
  });

  it("should be hidden when open prop is set to `false`", () => {
    const handleClose = jest.fn();
    const { getByTestId } = render(
      <Modal open={false} onClose={handleClose}>
        <Modal.Header>{modalTitle}</Modal.Header>
      </Modal>
    );

    expect(getByTestId(testid)).toHaveAttribute("aria-hidden", "true");
  });

  it("should invoke onOpen callback when open", () => {
    const handleClose = jest.fn();
    const handleOpen = jest.fn();
    render(
      <Modal open={true} onOpen={handleOpen} onClose={handleClose}>
        <Modal.Header>{modalTitle}</Modal.Header>
      </Modal>
    );

    expect(handleOpen).toHaveBeenCalledTimes(1);
  });

  it("should invoke onClose callback when dismiss button is clicked", () => {
    const handleClose = jest.fn();
    const { getByRole } = render(
      <Modal open={true} onClose={handleClose}>
        <Modal.Header>{modalTitle}</Modal.Header>
      </Modal>
    );

    fireEvent.click(getByRole("button"));

    expect(handleClose).toHaveBeenCalledTimes(1);
  });

  it("should NOT invoke onClose callback when Modal.Button without close prop is clicked", () => {
    const handleClose = jest.fn();
    const { getByText } = render(
      <Modal open={true} onClose={handleClose}>
        <Modal.Header>{modalTitle}</Modal.Header>
        <Modal.Footer>
          <Modal.Button variant="clear">Cancel</Modal.Button>
          <Modal.Button close>Continue</Modal.Button>
        </Modal.Footer>
      </Modal>
    );

    fireEvent.click(getByText("Cancel"));

    expect(handleClose).toHaveBeenCalledTimes(0);
  });

  it("should invoke onClose callback when Modal.Button with prop close is clicked", () => {
    const handleClose = jest.fn();
    const { getByText } = render(
      <Modal open={true} onClose={handleClose}>
        <Modal.Header>{modalTitle}</Modal.Header>
        <Modal.Footer>
          <Modal.Button variant="clear">Cancel</Modal.Button>
          <Modal.Button close>Continue</Modal.Button>
        </Modal.Footer>
      </Modal>
    );

    fireEvent.click(getByText("Continue"));

    expect(handleClose).toHaveBeenCalledTimes(1);
  });

  a11yCheck(() =>
    render(
      <Modal
        open={true}
        onClose={() => {
          console.log("onClose");
        }}
      >
        <Modal.Header>Modal Title</Modal.Header>
        <Modal.Body>
          <p>
            This is the modal content area. It's width is determined based on
            the amount of content within it.
          </p>
        </Modal.Body>
        <Modal.Footer>
          <Modal.Button variant="clear" close>
            Cancel
          </Modal.Button>
          <Modal.Button close>Continue</Modal.Button>
        </Modal.Footer>
      </Modal>
    )
  );
});
