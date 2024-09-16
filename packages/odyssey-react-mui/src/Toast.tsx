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

import { useEffect, memo, useState, useCallback } from "react";
import { useTranslation } from "react-i18next";
import { Alert, AlertTitle, Snackbar } from "@mui/material";

import { Button } from "./Button";
import { HtmlProps } from "./HtmlProps";
import { CloseIcon } from "./icons.generated";
import { Link } from "./Link";
import { ScreenReaderText } from "./ScreenReaderText";

export const toastRoleValues = ["status", "alert"] as const;
export const toastSeverityValues = [
  "success",
  "info",
  "warning",
  "error",
] as const;

export type ToastProps = {
  /**
   * If set, this determines how long the Toast should appear before automatically disappearing in milliseconds.
   * It will only take effect if the Toast is not dismissible.
   * If left blank, it defaults to 6000.
   */
  autoHideDuration?: number;
  /**
   * If `true`, the Toast will include a close button.
   */
  isDismissable?: boolean;
  /**
   * If true, the Toast is visible
   */
  isVisible?: boolean;
  /**
   * If linkUrl is not undefined, this is the text of the link.
   * If left blank, it defaults to "Learn more".
   * Note that linkText does nothing if linkUrl is not defined
   */
  linkText?: string;
  /**
   * If defined, the Toast will include a link to the URL
   */
  linkUrl?: string;
  /**
   * An optional function to run when the Toast is closed.
   */
  onHide?: () => void;
  /**
   * Sets the ARIA role of the Toast
   * ("status" for something that dynamically updates, "alert" for errors, null for something
   * unchanging)
   */
  role?: (typeof toastRoleValues)[number];
  /**
   * Determine the color and icon of the Toast
   */
  severity: (typeof toastSeverityValues)[number];
  /**
   * The text content of the Toast
   */
  text: string;
} & Pick<HtmlProps, "testId" | "translate">;

const ClickAwayListenerProps = { onClickAway: () => false };

const Toast = ({
  autoHideDuration = 6000,
  isDismissable,
  linkText,
  linkUrl,
  isVisible: isVisibleProp,
  onHide: onHideProp,
  role,
  severity,
  testId,
  text,
  translate,
}: ToastProps) => {
  const { t } = useTranslation();
  const [isVisible, setIsVisible] = useState(isVisibleProp);

  useEffect(() => {
    setIsVisible(isVisibleProp);
  }, [isVisibleProp]);

  const onHide = useCallback(() => {
    setIsVisible(false);
    onHideProp?.();
  }, [onHideProp]);

  return (
    <>
      <Snackbar
        open={isVisible}
        autoHideDuration={
          isDismissable || autoHideDuration <= 0 ? undefined : autoHideDuration
        }
        onClose={onHide}
        className="Toast"
        ClickAwayListenerProps={ClickAwayListenerProps}
      >
        <Alert
          action={
            isDismissable === true && (
              <Button
                ariaLabel={t("close.text")}
                onClick={onHide}
                size="small"
                startIcon={<CloseIcon />}
                variant="floating"
              />
            )
          }
          data-se={testId}
          role={role}
          severity={severity}
          variant="toast"
        >
          <AlertTitle translate={translate}>
            <ScreenReaderText translate={translate}>
              {t(`severity.${severity}`)}:
            </ScreenReaderText>
            {text}
          </AlertTitle>
          {linkUrl && (
            <Link href={linkUrl} variant="monochrome" translate={translate}>
              {linkText}
            </Link>
          )}
        </Alert>
      </Snackbar>
    </>
  );
};

const MemoizedToast = memo(Toast);
MemoizedToast.displayName = "Toast";

export { MemoizedToast as Toast };
