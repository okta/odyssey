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
import { render, fireEvent, screen, waitFor } from "@testing-library/react";
import { Modal } from ".";
import { useState } from "react";

const role = "dialog";
const modalHeading = "Modal Heading";
const message = "Close modal";
const callToAction = "Open Modal";

describe("Modal", () => {
  it("renders visibly into the document", () => {
    const handleClose = jest.fn();
    render(
      <Modal open={true} onClose={handleClose} closeMessage={message}>
        <Modal.Header>{modalHeading}</Modal.Header>
      </Modal>
    );

    expect(screen.getByRole(role)).toBeVisible();
  });

  it("accepts and spreads omitted rest props to the root of each compound static component", () => {
    const handleClose = jest.fn();
    render(
      <Modal
        data-testid="foo"
        open={true}
        onClose={handleClose}
        closeMessage={message}
      >
        <Modal.Header data-testid="bar">{modalHeading}</Modal.Header>
        <Modal.Body data-testid="baz" children="baz" />
        <Modal.Footer data-testid="qux" children="qux" />
        <Modal.Button data-testid="quux" close children="quux" />
      </Modal>
    );

    expect(screen.getByTestId("foo")).toBeVisible();
    expect(screen.getByTestId("bar")).toBeVisible();
    expect(screen.getByTestId("baz")).toBeVisible();
    expect(screen.getByTestId("qux")).toBeVisible();
    expect(screen.getByTestId("quux")).toBeVisible();
  });

  it("should be hidden when open prop is set to `false`", () => {
    const handleClose = jest.fn();
    render(
      <Modal open={false} onClose={handleClose} closeMessage={message}>
        <Modal.Header>{modalHeading}</Modal.Header>
      </Modal>
    );

    const modal = screen.getByRole(role, { hidden: true });
    expect(modal).toBeInTheDocument();
    expect(modal).not.toBeVisible();
  });

  it("should invoke onOpen callback when open", () => {
    const handleClose = jest.fn();
    const handleOpen = jest.fn();
    render(
      <Modal
        open
        onOpen={handleOpen}
        onClose={handleClose}
        closeMessage={message}
      >
        <Modal.Header>{modalHeading}</Modal.Header>
      </Modal>
    );

    expect(handleOpen).toHaveBeenCalledTimes(1);
  });

  it("should invoke onClose callback when dismiss button is clicked", () => {
    const handleClose = jest.fn();
    render(
      <Modal open onClose={handleClose} closeMessage={message}>
        <Modal.Header>{modalHeading}</Modal.Header>
      </Modal>
    );

    fireEvent.click(screen.getByRole("button", { hidden: true }));

    expect(handleClose).toHaveBeenCalledTimes(1);
  });

  it("should NOT invoke onClose callback when Modal.Button without close prop is clicked", () => {
    const handleClose = jest.fn();
    render(
      <Modal open={true} onClose={handleClose} closeMessage={message}>
        <Modal.Header>{modalHeading}</Modal.Header>
        <Modal.Footer>
          <Modal.Button variant="floating">Cancel</Modal.Button>
          <Modal.Button close>Continue</Modal.Button>
        </Modal.Footer>
      </Modal>
    );

    fireEvent.click(screen.getByText("Cancel"));

    expect(handleClose).toHaveBeenCalledTimes(0);
  });

  it("should invoke onClose callback when Modal.Button with prop close is clicked", () => {
    const handleClose = jest.fn();
    render(
      <Modal open={true} onClose={handleClose} closeMessage={message}>
        <Modal.Header>{modalHeading}</Modal.Header>
        <Modal.Footer>
          <Modal.Button variant="floating">Cancel</Modal.Button>
          <Modal.Button close>Continue</Modal.Button>
        </Modal.Footer>
      </Modal>
    );

    fireEvent.click(screen.getByText("Continue"));

    expect(handleClose).toHaveBeenCalledTimes(1);
  });

  const FocusWrapper = () => {
    const [isOpen, setIsOpen] = useState(false);
    return (
      <>
        <button onClick={() => setIsOpen(true)}>{callToAction}</button>
        <Modal
          open={isOpen}
          onClose={() => setIsOpen(false)}
          closeMessage={message}
        >
          <Modal.Header>{modalHeading}</Modal.Header>
        </Modal>
      </>
    );
  };

  it("should initially focus on modal's dismiss icon when opened", async () => {
    render(<FocusWrapper />);
    const dismissIcon = screen.getByTitle(message).closest("button");
    screen.getByText(callToAction).click();
    await waitFor(() => {
      expect(document.activeElement).toBe(dismissIcon);
    });
  });

  it("should restore focus to original focused element when modal is closed", async () => {
    render(<FocusWrapper />);
    const openButton = screen.getByText(callToAction);
    const closeButton = screen.getByTitle(message).closest("button");
    openButton.focus();
    openButton.click();
    await waitFor(() => {
      expect(screen.getByText(modalHeading)).toBeVisible();
    });
    closeButton?.click();
    await waitFor(() => {
      expect(document.activeElement).toBe(openButton);
    });
  });

  a11yCheck(() =>
    render(
      <Modal
        open={true}
        closeMessage={message}
        onClose={() => {
          console.log("onClose");
        }}
      >
        <Modal.Header>Modal Heading</Modal.Header>
        <Modal.Body>
          <p>
            This is the modal content area. It's width is determined based on
            the amount of content within it.
          </p>
        </Modal.Body>
        <Modal.Footer>
          <Modal.Button variant="floating" close>
            Cancel
          </Modal.Button>
          <Modal.Button close>Continue</Modal.Button>
        </Modal.Footer>
      </Modal>
    )
  );
});
