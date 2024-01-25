/*!
 * Copyright (c) 2024-present, Okta, Inc. and/or its affiliates. All rights reserved.
 * The Okta software accompanied by this notice is provided pursuant to the Apache License, Version 2.0 (the "License.")
 *
 * You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0.
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *
 * See the License for the specific language governing permissions and limitations under the License.
 */

import { Drawer as MuiDrawer } from "@mui/material";
import { drawerClasses } from "@mui/material/Drawer";
import { Button } from "../Button";
import { Box } from "../Box";
import { CloseIcon } from "../icons.generated";
import {
  memo,
  ReactNode,
  useState,
  useEffect,
  useRef,
  ReactElement,
} from "react";

import type { AllowedProps } from "../AllowedProps";

export const variantValues = ["temporary", "persistent"] as const;

export type DrawerProps = {
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
  /**
   * Side from which drawer will appear.
   */
  variant?: (typeof variantValues)[number];
  ariaLabel: string;
} & AllowedProps;

const Drawer = ({
  callToActionFirstComponent,
  callToActionSecondComponent,
  callToActionLastComponent,
  children,
  isOpen,
  onClose,
  testId,
  title,
  translate,
  variant = "temporary",
  ariaLabel,
}: DrawerProps) => {
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
      <Box translate={translate}>{children}</Box>
    ) : (
      children
    );

  return (
    <MuiDrawer
      data-se={testId}
      anchor="right"
      open={isOpen}
      onClose={onClose}
      variant={variant}
    >
      <div>
        <div className={`${drawerClasses.root}-header`}>
          {title}
          <Button
            ariaLabel={ariaLabel}
            label=""
            onClick={onClose}
            size="small"
            startIcon={<CloseIcon />}
            variant="floating"
          />
        </div>
        <Box
          // dividers={isContentScrollable}
          ref={dialogContentRef}
          {...(isContentScrollable && {
            tabIndex: 0,
          })}
        >
          {content}
        </Box>
      </div>
      {(callToActionFirstComponent ||
        callToActionSecondComponent ||
        callToActionLastComponent) && (
        <div className={`${drawerClasses.root}-footer`}>
          {callToActionLastComponent}
          {callToActionSecondComponent}
          {callToActionFirstComponent}
        </div>
      )}
    </MuiDrawer>
  );
};

const MemoizedDrawer = memo(Drawer);
MemoizedDrawer.displayName = "Drawer";

export { MemoizedDrawer as Drawer };
