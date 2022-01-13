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

import React, { createContext, useContext, useMemo, useRef } from "react";
import type {
  FunctionComponent,
  ReactElement,
  ReactNode,
  ReactText,
} from "react";
import { createPortal } from "react-dom";
import { withTheme } from "@okta/odyssey-react-theme";
import { Box } from "../Box";
import { Button as CoreButton } from "../Button";
import type { ButtonProps as CoreButtonProps } from "../Button";
import { Heading } from "../Heading";
import { forwardRefWithStatics, useOid, useCx, useOmit } from "../../utils";
import styles from "./Modal.module.scss";
import { CloseIcon } from "../Icon";

export type ModalProps = {
  /**
   * The modal content, should use the Static components provided by Modal (Modal.Header, Modal.Body and Modal.Footer)
   */
  children: ReactElement | ReactElement[];

  /**
   * The modal id attribute. Automatically generated if not provided.
   */
  id?: string;

  /**
   * Determines whether or not the modal is visible.
   */
  open: boolean;

  /**
   * Callback when the modal is opened.
   */
  onOpen?: () => void;

  /**
   * Callback when the modal is closed.
   */
  onClose: () => void;

  /**
   * Screen reader label for close button.
   */
  closeMessage: string;
};

type PropsModalHeader = {
  children: ReactText;
};

type PropsModalBody = {
  children: ReactNode;
};

type PropsModalFooter = {
  children: ReactNode;
};

type PropsModalButton = {
  close?: boolean;
} & CoreButtonProps;

interface ModalContext {
  onClose: () => void;
  modalTitleId: string;
  closeMessage: string;
}
const ModalContext = createContext({} as ModalContext);

/**
 * UI that appears on top of the main content and moves the system into a mode
 * requiring user interaction. This dialog disables the main content until the
 * user interacts with the modal dialog.
 */
export const Modal = withTheme(
  () => ({}),
  styles
)(
  forwardRefWithStatics<HTMLDivElement, ModalProps, Statics>((props, ref) => {
    const {
      children,
      id,
      open = false,
      onClose,
      closeMessage,
      onOpen,
      ...rest
    } = props;
    const modalTitleId = useOid();
    const context = useMemo(
      () => ({ onClose, closeMessage, modalTitleId }),
      [onClose, closeMessage, modalTitleId]
    );
    const omitProps = useOmit(rest);
    const oid = useOid(id);
    const modalDialog = useRef<HTMLDivElement>(null);
    const componentClass = useCx(styles.root, { [styles.openState]: open });

    if (open && onOpen) {
      onOpen();
    }

    return createPortal(
      <ModalContext.Provider value={context}>
        <Box
          {...omitProps}
          ref={ref}
          className={componentClass}
          id={oid}
          hidden={!open}
        >
          <div className={styles.overlay} tabIndex={-1}>
            <div
              className={styles.dialog}
              role="dialog"
              aria-modal="true"
              aria-labelledby={modalTitleId}
              ref={modalDialog}
            >
              {children}
            </div>
          </div>
        </Box>
      </ModalContext.Provider>,
      document.body
    );
  })
);

const Header: FunctionComponent<PropsModalHeader> = (props) => {
  const { children, ...rest } = props;
  const omitProps = useOmit(rest);
  const { modalTitleId, closeMessage } = useContext(ModalContext);

  return (
    <Box {...omitProps} as="header" className={styles.header}>
      <span className={styles.dismiss}>
        <Modal.Button
          close
          variant="dismiss"
          icon={<CloseIcon title={closeMessage} />}
        />
      </span>
      <Heading
        id={modalTitleId}
        visualLevel="4"
        noEndMargin
        lineHeight="title"
        children={children}
      />
    </Box>
  );
};

const Body: FunctionComponent<PropsModalBody> = (props) => {
  const { children, ...rest } = props;
  const omitProps = useOmit(rest);
  return (
    <Box {...omitProps} as="main" className={styles.content}>
      {children}
    </Box>
  );
};

const Footer: FunctionComponent<PropsModalFooter> = (props) => {
  const { children, ...rest } = props;
  const omitProps = useOmit(rest);
  return (
    <Box {...omitProps} as="footer" className={styles.footer}>
      {children}
    </Box>
  );
};

const Button: FunctionComponent<PropsModalButton> = (
  props: PropsModalButton
) => {
  const { close, onClick, ...rest } = props;
  const { onClose } = useContext(ModalContext);
  return <CoreButton onClick={close ? onClose : onClick} {...rest} />;
};

type Statics = {
  Header: typeof Header;
  Body: typeof Body;
  Footer: typeof Footer;
  Button: typeof Button;
};

Modal.displayName = "Modal";
Header.displayName = "ModalHeader";
Body.displayName = "ModalBody";
Footer.displayName = "ModalFooter";
Button.displayName = "ModalButton";

Object.assign(Modal, { Header, Body, Footer, Button });
