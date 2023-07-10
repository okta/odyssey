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
  callToActionPrimaryComponent?: ReactElement<typeof Button>;
  callToActionSecondaryComponent?: ReactElement<typeof Button>;
  callToActionTertiaryComponent?: ReactElement<typeof Button>;
  children: ReactNode | Array<ReactNode>;
  onClose: () => void;
  isOpen: boolean;
  title: string;
};

const Dialog = ({
  callToActionPrimaryComponent,
  callToActionSecondaryComponent,
  callToActionTertiaryComponent,
  children,
  isOpen,
  onClose,
  title,
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
          ariaLabel="Close dialog"
          text=""
        />
      </DialogTitle>
      <DialogContent dividers={isContentScrollable} ref={dialogContentRef}>
        {content}
      </DialogContent>

      {(callToActionPrimaryComponent ||
        callToActionSecondaryComponent ||
        callToActionTertiaryComponent) && (
        <DialogActions>
          {callToActionTertiaryComponent}
          {callToActionSecondaryComponent}
          {callToActionPrimaryComponent}
        </DialogActions>
      )}
    </MuiDialog>
  );
};

const MemoizedDialog = memo(Dialog);
MemoizedDialog.displayName = "Dialog";

export { MemoizedDialog as Dialog };
