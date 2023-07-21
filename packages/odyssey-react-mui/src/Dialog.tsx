/*!
 * Copyright (c) 2022-present, Okta, Inc. and/or its affiliates. All rights reserved.
 * The Okta software accompanied by this notice is provided pursuant to the Apache License, Version 2.0 (the "License.")
 *
 * You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0.
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *
 * See the License for the specific language governing permissions and limitations under the License.
 */

import { Dialog as MuiDialog } from "@mui/material";
import {
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from "@mui/material";
import { Button } from "./Button";
import { CloseIcon } from "./iconDictionary";
import {
  memo,
  ReactNode,
  useState,
  useEffect,
  useRef,
  ReactElement,
} from "react";

export type DialogProps = {
  /**
   * An optional Button object to be situated in the Dialog footer. Should almost always be of variant `primary`.
   */
  callToActionFirstComponent?: ReactElement<typeof Button>;
  /**
   * An optional Button object to be situated in the Dialog footer, alongside the `callToActionPrimaryComponent`.
   */
  callToActionSecondComponent?: ReactElement<typeof Button>;
  /**
   * An optional Button object to be situated in the Dialog footer, alongside the other two `callToAction` components.
   */
  callToActionLastComponent?: ReactElement<typeof Button>;
  /**
   * The content of the Dialog. May be a `string` or any other `ReactNode` or array of `ReactNode`s.
   */
  children: ReactNode;
  /**
   * When set to `true`, the Dialog will be visible.
   */
  isOpen: boolean;
  /**
   * Callback that controls what happens when the Dialog is dismissed
   */
  onClose: () => void;
  /**
   * The title of the Dialog
   */
  title: string;
  ariaLabel: string;
};

const Dialog = ({
  callToActionFirstComponent,
  callToActionSecondComponent,
  callToActionLastComponent,
  children,
  isOpen,
  onClose,
  title,
  ariaLabel,
}: DialogProps) => {
  const [isContentScrollable, setIsContentScrollable] = useState(false);
  const dialogContentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let frameId: number;

    const handleContentScroll = () => {
      const dialogContentElement = dialogContentRef.current;
      if (dialogContentElement) {
        setIsContentScrollable(
          dialogContentElement.scrollHeight > dialogContentElement.clientHeight
        );
      }
      frameId = requestAnimationFrame(handleContentScroll);
    };

    if (isOpen) {
      frameId = requestAnimationFrame(handleContentScroll);
    }

    return () => {
      cancelAnimationFrame(frameId);
    };
  }, [isOpen]);

  const content =
    typeof children === "string" ? (
      <DialogContentText>{children}</DialogContentText>
    ) : (
      children
    );

  return (
    <MuiDialog open={isOpen} onClose={onClose}>
      <DialogTitle>
        {title}
        <Button
          variant="floating"
          size="small"
          onClick={onClose}
          startIcon={<CloseIcon />}
          ariaLabel={ariaLabel}
          text=""
        />
      </DialogTitle>
      <DialogContent dividers={isContentScrollable} ref={dialogContentRef}>
        {content}
      </DialogContent>

      {(callToActionFirstComponent ||
        callToActionSecondComponent ||
        callToActionLastComponent) && (
        <DialogActions>
          {callToActionLastComponent}
          {callToActionSecondComponent}
          {callToActionFirstComponent}
        </DialogActions>
      )}
    </MuiDialog>
  );
};

const MemoizedDialog = memo(Dialog);
MemoizedDialog.displayName = "Dialog";

export { MemoizedDialog as Dialog };
