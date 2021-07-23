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
import type { FunctionComponent, ReactElement, ReactNode, ReactText } from "react";
import { createPortal } from "react-dom";
import Button from "../Button";
import type { ButtonVariants } from "../Button";
import { useOid, useCx } from "../../utils";
import { useKeypress, useOutsideClick } from '../../hooks';
import useFocusTrap from '../../hooks/useFocusTrap';

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

export const ModalContext = createContext<{ onClose: () => void}>({ onClose: () => void 0 });

/**
 * UI that appears on top of the main content and moves the system into a mode 
 * requiring user interaction. This dialog disables the main content until the 
 * user interacts with the modal dialog.
 * 
 * @todo OKTA-00000: [React] Modal: Use proper close icon
 * @todo Determine how to enforce use of only Modal static components as children using TS
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
  const { children, id, open = false, onClose, onOpen } = props
  const context = useMemo(() => ({ onClose, onOpen }), [onClose, onOpen]);
  const oid = useOid(id);
  const modalDialog = useRef<HTMLDivElement>(null);
  const componentClass = useCx(
    'ods-modal',
    { "is-open": open }
  );
  
  useFocusTrap(modalDialog, {
    active: open,
    onActivateFocusFirst: true
  });

  useOutsideClick(modalDialog, onClose, open)

  useKeypress([
    ['Escape', onClose],
  ], open);

  return createPortal(
    <ModalContext.Provider value={context}>
      <div className={componentClass} id={oid} aria-hidden={!open}>
        <div className="ods-modal--overlay" tabIndex={-1}>
          <div className="ods-modal--dialog" role="dialog" aria-modal="true" aria-labelledby="ods-modal-standard-title" ref={modalDialog}> 
            {children}
          </div>
        </div>
      </div>
    </ModalContext.Provider>,    
    document.body
  )
};

Modal.Header = ({ children }) => (
  <header className="ods-modal--header">
    <span className="ods-modal--dismiss">
      <Modal.Button close variant="dismiss">&#x2716;</Modal.Button>
    </span>
    <h1 className="ods-modal--title" id="ods-modal-standard-title">
      {children}
    </h1>
  </header>
)

Modal.Body = ({ children }) => (
  <main className="ods-modal--content" id="ods-modal-standard-content">
    {children}
  </main>
);

Modal.Footer = ({ children }) => (
  <footer className="ods-modal--footer">
    {children}
  </footer>
);

Modal.Button = ({ children, variant, close, onClick }) => {
  const { onClose } = useContext(ModalContext);
  return <Button variant={variant} onClick={close ? () => onClose() : onClick}>{children}</Button>
};

export default Modal
