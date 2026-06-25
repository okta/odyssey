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

import { Alert, AlertTitle, Snackbar } from "@mui/material";
import { memo, useCallback, useEffect, useState } from "react";

import { Button } from "./Buttons/Button.js";
import { HtmlProps } from "./HtmlProps.js";
import { useTranslation } from "./i18n.generated/i18n.js";
import { CloseIcon } from "./icons.generated/index.js";
import { Link } from "./Link.js";
import { ScreenReaderText } from "./ScreenReaderText.js";

export const toastRoleValues = ["status", "alert"] as const;
export const toastSeverityValues = [
  "success",
  "info",
  "warning",
  "error",
] as const;

export type ToastProps = {
  /**
   * How long the Toast should appear before automatically disappearing, in milliseconds.
   * Only takes effect when the Toast is not dismissible.
   * @default 6000
   */
  autoHideDuration?: number;
  /**
   * If `true`, the toast includes a close button allowing the user to dismiss it manually.
   */
  isDismissable?: boolean;
  /**
   * If `true`, the toast is visible.
   */
  isVisible?: boolean;
  /**
   * The visible label for the link rendered when `linkUrl` is provided. Has no effect
   * without `linkUrl`.
   * @default "Learn more"
   */
  linkText?: string;
  /**
   * If defined, the Toast will include a link to the URL
   */
  linkUrl?: string;
  /**
   * Called when the Toast is closed, either automatically or by user dismissal.
   */
  onHide?: () => void;
  /**
   * Sets the ARIA live-region role.
   * - If `'status'`, announces updates politely; use for non-critical dynamic messages.
   * - If `'alert'`, announces updates assertively; use for errors or urgent information.
   */
  role?: (typeof toastRoleValues)[number];
  /**
   * Controls the color and icon of the toast.
   */
  severity: (typeof toastSeverityValues)[number];
  /**
   * The text content of the Toast
   */
  text: string;
} & Pick<HtmlProps, "testId" | "translate">;

const ClickAwayListenerProps = { onClickAway: () => false };

/**
 * A brief, auto-dismissing notification used to communicate non-critical feedback such
 * as confirmations, warnings, or errors. Renders as a Snackbar overlay with optional
 * dismiss and link actions.
 */
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
        autoHideDuration={
          isDismissable || autoHideDuration <= 0 ? undefined : autoHideDuration
        }
        className="Toast"
        ClickAwayListenerProps={ClickAwayListenerProps}
        onClose={onHide}
        open={isVisible}
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
            <Link href={linkUrl} translate={translate} variant="monochrome">
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
