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

import {
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Dialog as MuiDialog,
  DialogProps as MuiDialogProps,
} from "@mui/material";
import {
  cloneElement,
  memo,
  ReactElement,
  ReactNode,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { useTranslation } from "react-i18next";

import type { HtmlProps } from "./HtmlProps.js";

import { Button, ButtonProps } from "./Buttons/index.js";
import { CloseIcon } from "./icons.generated/index.js";
import { useUniqueId } from "./useUniqueId.js";

type MuiOnCloseEvent = Parameters<Required<MuiDialogProps>["onClose"]>[0];
type MuiOnCloseReason = Parameters<Required<MuiDialogProps>["onClose"]>[1];
export type DialogOnCloseReason = MuiOnCloseReason | "closeButtonClick";

export type DialogProps = {
  /**
   * @deprecated `aria-label` for close button comes from translation file
   */
  ariaLabel?: string;

  /**
   * @deprecated Will be removed in a future Odyssey version. Use `primaryCallToActionComponent` instead.
   */
  callToActionFirstComponent?: ReactElement<typeof Button>;
  /**
   * @deprecated Will be removed in a future Odyssey version. Use `tertiaryCallToActionComponent` instead.
   */
  callToActionLastComponent?: ReactElement<typeof Button>;
  /**
   * @deprecated Will be removed in a future Odyssey version. Use `secondaryCallToActionComponent` instead.
   */
  callToActionSecondComponent?: ReactElement<typeof Button>;
  /**
   * The content of the Dialog. May be a `string` or any other `ReactNode` or array of `ReactNode`s.
   */
  children: ReactNode;
  /**
   * When set to `true`, the Dialog will be visible.
   */
  isOpen: boolean;
  /**
   * Callback that controls what happens when the Dialog is dismissed.
   */
  onClose: (event: MuiOnCloseEvent, reason: DialogOnCloseReason) => void;
  /**
   * An optional Button object to be situated in the Dialog footer as the primary call to action.
   */
  primaryCallToActionComponent?: ReactElement<typeof Button>;

  /**
   * An optional Button object to be situated in the Dialog footer as the secondary call to action, alongside the `primaryCallToActionComponent`.
   */
  secondaryCallToActionComponent?: ReactElement<typeof Button>;

  /**
   * An optional Button object to be situated in the Dialog footer as the tertiary call to action, alongside the other `callToAction` components.
   */
  tertiaryCallToActionComponent?: ReactElement<typeof Button>;

  /**
   * The title of the Dialog.
   */
  title: string;
} & Pick<HtmlProps, "testId" | "translate">;

const Dialog = ({
  primaryCallToActionComponent,
  secondaryCallToActionComponent,
  tertiaryCallToActionComponent,
  callToActionFirstComponent,
  callToActionSecondComponent,
  callToActionLastComponent,
  children,
  isOpen,
  onClose,
  testId,
  title,
  translate,
}: DialogProps) => {
  const { t } = useTranslation();
  const [isContentScrollable, setIsContentScrollable] = useState(false);
  const dialogContentRef = useRef<HTMLDivElement>(null);
  const dialogTitleId = useUniqueId();
  const dialogLabelId = useUniqueId();

  useEffect(() => {
    let frameId: number;

    const handleContentScroll = () => {
      const dialogContentElement = dialogContentRef.current;
      if (dialogContentElement) {
        cancelAnimationFrame(frameId);
        setIsContentScrollable(
          dialogContentElement.scrollHeight > dialogContentElement.clientHeight,
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

  // Prioritize new action button format (|| used as a fallback)
  const actionButtons = [
    tertiaryCallToActionComponent || callToActionLastComponent,
    secondaryCallToActionComponent || callToActionSecondComponent,
    primaryCallToActionComponent || callToActionFirstComponent,
  ].filter(Boolean);

  const handleCloseButtonClick = useCallback<
    NonNullable<ButtonProps["onClick"]>
  >((event) => onClose(event, "closeButtonClick"), [onClose]);

  return (
    <MuiDialog
      aria-labelledby={dialogLabelId}
      data-se={testId}
      onClose={onClose}
      open={isOpen}
    >
      <DialogTitle
        id={dialogTitleId} // We need to explicitly unset `id` for MUI to automatically set it based on the `aria-labelledby` prop passed to `MuiDialog`
        translate={translate}
      >
        <span id={dialogLabelId}>{title}</span>
        <Button
          ariaLabel={t("close.text")}
          onClick={handleCloseButtonClick}
          size="small"
          startIcon={<CloseIcon />}
          variant="floating"
        />
      </DialogTitle>
      <DialogContent
        {...(isContentScrollable && {
          // Sets tabIndex on content element if scrollable so content is easier to navigate with the keyboard
          tabIndex: 0,
        })}
        dividers={isContentScrollable}
        ref={dialogContentRef}
      >
        {content}
      </DialogContent>

      {actionButtons.length > 0 && (
        <DialogActions>
          {actionButtons.map((actionButton, index) =>
            actionButton ? cloneElement(actionButton, { key: index }) : null,
          )}
        </DialogActions>
      )}
    </MuiDialog>
  );
};

const MemoizedDialog = memo(Dialog);
MemoizedDialog.displayName = "Dialog";

export { MemoizedDialog as Dialog };
