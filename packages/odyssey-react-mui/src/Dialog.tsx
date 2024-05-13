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

import { useTranslation } from "react-i18next";
import { Dialog as MuiDialog } from "@mui/material";
import {
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from "@mui/material";
import { Button } from "./Button";
import { CloseIcon } from "./icons.generated";
import {
  memo,
  ReactNode,
  useState,
  useEffect,
  useRef,
  ReactElement,
} from "react";

import type { HtmlProps } from "./HtmlProps";

// Mutually exclusive types for the action buttons
type NewActionProps = {
  primaryCallToActionComponent?: ReactElement<typeof Button>;
  secondaryCallToActionComponent?: ReactElement<typeof Button>;
  tertiaryCallToActionComponent?: ReactElement<typeof Button>;
  callToActionFirstComponent?: never;
  callToActionSecondComponent?: never;
  callToActionLastComponent?: never;
};

type DeprecatedActionProps = {
  primaryCallToActionComponent?: never;
  secondaryCallToActionComponent?: never;
  tertiaryCallToActionComponent?: never;
  /** @deprecated Will be removed in a future Odyssey version. Use `PrimaryCallToActionComponent` instead. */
  callToActionFirstComponent?: ReactElement<typeof Button>;
  /** @deprecated Will be removed in a future Odyssey version. Use `SecondryCallToActionComponent` instead. */
  callToActionSecondComponent?: ReactElement<typeof Button>;
  /** @deprecated Will be removed in a future Odyssey version. Use `TertiaryCallToActionComponent` instead. */
  callToActionLastComponent?: ReactElement<typeof Button>;
};

export type DialogProps = {
  /**
   * @deprecated `aria-label` for close button comes from translation file
   */
  ariaLabel?: string;
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
} & Pick<HtmlProps, "testId" | "translate"> &
  (NewActionProps | DeprecatedActionProps);

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
  //Ensure new action button format is prioritized (uses || as a fallback)
  const actionButtons = [
    tertiaryCallToActionComponent || callToActionLastComponent,
    secondaryCallToActionComponent || callToActionSecondComponent,
    primaryCallToActionComponent || callToActionFirstComponent,
  ].filter(Boolean);

  return (
    <MuiDialog data-se={testId} open={isOpen} onClose={onClose}>
      <DialogTitle translate={translate}>
        {title}
        <Button
          ariaLabel={t("close.text")}
          onClick={onClose}
          size="small"
          startIcon={<CloseIcon />}
          variant="floating"
        />
      </DialogTitle>
      <DialogContent
        {...(isContentScrollable && {
          //Sets tabIndex on content element if scrollable so content is easier to navigate with the keyboard
          tabIndex: 0,
        })}
        dividers={isContentScrollable}
        ref={dialogContentRef}
      >
        {content}
      </DialogContent>

      {actionButtons.length > 0 && (
        <DialogActions>{actionButtons}</DialogActions>
      )}
    </MuiDialog>
  );
};

const MemoizedDialog = memo(Dialog);
MemoizedDialog.displayName = "Dialog";

export { MemoizedDialog as Dialog };
