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

import { Story } from "@storybook/react";
import { useArgs } from "@storybook/client-api";
import { Modal, ModalProps, Button } from "@okta/odyssey-react";
import { Modal as Source } from "../../../../odyssey-react/src";

export default {
  title: `Components/Modal`,
  component: Source,
  argTypes: {
    open: { control: { type: "boolean" } },
  },
};

const Template: Story<ModalProps> = () => {
  const [{ open }, updateArgs] = useArgs();

  const handleOpen = () => {
    console.log("modal/onOpen");
  };

  const handleClose = () => {
    console.log("modal/onClose");
    updateArgs({ open: false });
  };

  return (
    <>
      <Button
        onClick={() => {
          updateArgs({ open: true });
        }}
      >
        Open modal
      </Button>
      <Modal
        open={open}
        onOpen={handleOpen}
        onClose={handleClose}
        closeMessage="close"
      >
        <Modal.Header>Modal Title</Modal.Header>
        <Modal.Body>
          <p>
            This is the modal content area. It's width is determined based on
            the amount of content within it.
          </p>
        </Modal.Body>
        <Modal.Footer>
          <Modal.Button variant="clear">Cancel</Modal.Button>
          <Modal.Button close>Continue</Modal.Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export const Default = Template.bind({});
Default.args = {
  open: true,
};
Default.argTypes = {
  onOpen: { action: "modal/onOpen" },
  onClose: { action: "modal/onClose" },
};
