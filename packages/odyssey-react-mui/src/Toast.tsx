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

import { AlertColor, SnackbarProps } from "@mui/material";
import { memo, forwardRef, ForwardedRef, useState } from "react";
import {
  Alert,
  AlertTitle,
  Button,
  CloseIcon,
  Link,
  Snackbar,
  visuallyHidden,
} from ".";

export type ToastProps = {
  /**
   * If set, this determines how long the toast should appear before automatically
   * disappearing, in milliseconds. It will only take effect if the toast is not dismissable.
   * If left blank, it defaults to 6000.
   */
  autoHideDuration?: number;
  /**
   * If isDismissable is true, the alert will include a close button
   */
  isDismissable?: boolean;
  /**
   * If linkUrl is not undefined, this is the text of the link.
   * If left blank, it defaults to "Learn more".
   * Note that linkText does nothing if linkUrl is not defined
   */
  linkText?: string;
  /**
   * If defined, the alert will include a link to the URL
   */
  linkUrl?: string;
  /**
   * The function that's fired when the user clicks the close button.
   */
  onClose?: SnackbarProps["onClose"];
  /**
   * Sets the ARIA role of the alert
   * ("status" for something that dynamically updates, "alert" for errors, null for something
   * unchanging)
   */
  role?: "status" | "alert";
  /**
   * Determine the color and icon of the alert
   */
  severity: AlertColor;
  /**
   * The text content of the alert
   */
  text: string;
};

const Toast = forwardRef(
  (
    {
      autoHideDuration = 6000,
      isDismissable,
      linkText,
      linkUrl,
      onClose,
      role,
      severity,
      text,
    }: ToastProps,
    ref: ForwardedRef<HTMLDivElement>
  ) => {
    const [open, setOpen] = useState(true);

    return (
      <Snackbar
        open={open}
        autoHideDuration={isDismissable ? undefined : autoHideDuration}
        onClose={onClose}
      >
        <Alert
          ref={ref}
          action={
            isDismissable && (
              <Button
                aria-label="close"
                onClick={() => setOpen(false)}
                size="s"
                startIcon={<CloseIcon />}
                variant="floating"
              />
            )
          }
          role={role}
          severity={severity}
          variant="toast"
        >
          <AlertTitle>
            <span style={visuallyHidden}>{severity}:</span>
            {text}
          </AlertTitle>
          {linkUrl && (
            <Link href={linkUrl} variant="monochrome">
              {linkText}
            </Link>
          )}
        </Alert>
      </Snackbar>
    );
  }
);

const MemoizedToast = memo(Toast);

export { MemoizedToast as Toast };
