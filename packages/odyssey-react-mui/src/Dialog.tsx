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
import { DialogProps as MuiDialogProps } from "@mui/material";
import {
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from "@mui/material";
import { Button, CloseIcon } from "./";
import { memo, ReactNode, useState, useEffect, useRef } from "react";

export interface DialogProps extends MuiDialogProps {
  onClose: () => void;
  title: string;
  actions?: ReactNode;
}

const Dialog = ({
  actions,
  children,
  onClose,
  open,
  title,
  ...rest
}: DialogProps) => {
  const [isContentScrollable, setIsContentScrollable] = useState(false);
  const dialogContentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setTimeout(() => {
      const dialogContentElement = dialogContentRef.current;
      if (open && dialogContentElement) {
        setIsContentScrollable(
          dialogContentElement.scrollHeight > dialogContentElement.clientHeight
        );
      }
    }, 0);
  }, [children, open]);

  const content =
    typeof children === "string" ? (
      <DialogContentText>{children}</DialogContentText>
    ) : (
      children
    );

  return (
    <MuiDialog open={open} onClose={onClose} {...rest}>
      <DialogTitle>
        {title}
        <Button variant="floating" onClick={onClose}>
          <CloseIcon />
        </Button>
      </DialogTitle>
      <DialogContent dividers={isContentScrollable} ref={dialogContentRef}>
        {content}
      </DialogContent>

      {actions && <DialogActions>{actions}</DialogActions>}
    </MuiDialog>
  );
};

const MemoizedDialog = memo(Dialog);

export { MemoizedDialog as Dialog };
