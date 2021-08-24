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

import { createContext, useContext, useMemo, useRef } from "react";
import type { FunctionComponent, ReactElement, ReactNode, ReactText } from "react";
import { createPortal } from "react-dom";
import Button from "../Button";
import type { ButtonVariants } from "../Button";
import Title from '../Title';
import { useOid, useCx } from "../../utils";
import styles from './Modal.module.scss';

export type PropsModal = {
  /**
   * The modal content, should use the Static components provided by Modal (Modal.Header, Modal.Body and Modal.Footer)
   */
  children: ReactElement | ReactElement[],

  /**
   * The modal id attribute. Automatically generated if not provided.
   */
  id?: string,

  /**
   * Determines whether or not the modal is visible.
   */
  open: boolean,

  /**
   * Callback when the modal is opened.
   */
   onOpen?: () => void,

  /**
   * Callback when the modal is closed.
   */
  onClose: () => void,
}

export type PropsModalHeader = {
  children: ReactText
}

export type PropsModalBody = {
  children: ReactNode
}

export type PropsModalFooter = {
  children: ReactNode
}

export type PropsModalButton = {
  close?: boolean,
  children: ReactText,
  variant?: ButtonVariants,
  onClick?: () => void
}

export type StaticComponents = {
  Header: FunctionComponent<PropsModalHeader>,
  Body: FunctionComponent<PropsModalBody>,
  Footer: FunctionComponent<PropsModalFooter>,
  Button: FunctionComponent<PropsModalButton>
}

export interface ModalContext {
  onClose?: () => void,
  modalTitleId?: string;
}
export const ModalContext = createContext<ModalContext>({});

/**
 * UI that appears on top of the main content and moves the system into a mode
 * requiring user interaction. This dialog disables the main content until the
 * user interacts with the modal dialog.
 *
 * @todo OKTA-419301 - (odyssey-react) Modal: Implement close icon from odyssey-icons
 * @todo OKTA-419312 - (odyssey-react) Modal: Add missing keyboard/focus lock support
 * @todo OKTA-419313 - (odyssey-react) Modal: Add missing "click outside" functionality
 * @todo OKTA-419315 - (odyssey-react) Modal: Animation-out not working as expected
 *
 * @component
 * @example
 * <Modal open={true} onOpen={()=>{}} onClose={()=>{}}>
 *  <Modal.Header>Modal Title</Modal.Header>
 *  <Modal.Body>
 *    <p>This is the modal content area. It's width is determined based on the amount of content within it.</p>
 *  </Modal.Body>
 *  <Modal.Footer>
 *    <Button variant="clear" close>Cancel</Button>
 *    <Button onClick={() => {console.log('do something')}}Continue</Button>
 *  </Modal.Footer>
 * </Modal>
 */
const Modal: FunctionComponent<PropsModal> & StaticComponents = (props) => {
  const { children, id, open = false, onClose, onOpen } = props;
  const modalTitleId = useOid();
  const context = useMemo(() => ({ onClose, modalTitleId }), [onClose, modalTitleId]);
  const oid = useOid(id);
  const modalDialog = useRef<HTMLDivElement>(null);
  const componentClass = useCx(
    styles.root,
    { [styles.openState]: open }
  );

  if (open && onOpen) {
    onOpen();
  }

  return createPortal(
    <ModalContext.Provider value={context}>
      <div className={componentClass} id={oid} aria-hidden={!open} data-testid="ods-modal">
        <div className={styles.overlay} tabIndex={-1}>
          <div className={styles.dialog} role="dialog" aria-modal="true" aria-labelledby={modalTitleId} ref={modalDialog}>
            {children}
          </div>
        </div>
      </div>
    </ModalContext.Provider>,
    document.body
  )
};

Modal.Header = ({ children }) => {
  const { modalTitleId } = useContext(ModalContext);
  return (
    <header className={styles.header}>
      <span className={styles.dismiss}>
        <Modal.Button close variant="dismiss">
          {/* @todo Insert <Icon> component */}
          &#8253;
        </Modal.Button>
      </span>
      <Title
        id={modalTitleId}
        visualLevel="4"
        noEndMargin
        lineHeight="title"
        children={children}
      />
    </header>
  );
};

Modal.Body = ({ children }) => (
  <main className={ styles.content }>
    { children }
  </main>
);

Modal.Footer = ({ children }) => (
  <footer className={styles.footer}>
    {children}
  </footer>
);

Modal.Button = ({ children, variant, close, onClick }) => {
  const { onClose } = useContext(ModalContext);
  return <Button variant={variant} onClick={close ? onClose : onClick}>{children}</Button>;
};

export default Modal
