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

import {
  memo,
  MouseEventHandler,
  ReactNode,
  useCallback,
  useRef,
  useState,
} from "react";
import {
  Button as MuiButton,
  // ButtonBase as MuiButtonBase,
} from "@mui/material";
import { UserProfile, UserProfileProps } from "./UserProfile";
import { NullElement } from "../../NullElement";
import { useMuiProps } from "../../MuiPropsContext";
import { ChevronDownIcon } from "../../icons.generated";
import { OpenHandle, Popover, PopoverProps } from "../Popover";

export type UserProfilePopoverProps = {
  /**
   * The horizontal alignment of the popover.
   */
  popoverAlignment?: PopoverProps["popoverAlignment"];
  /**
   * The contents of the popover
   */
  children: ReactNode | NullElement;
} & Omit<UserProfileProps, "userNameEndIcon">;

const UserProfilePopover = ({
  popoverAlignment,
  children,
  profileIcon,
  userName,
  orgName,
}: UserProfilePopoverProps) => {
  const muiProps = useMuiProps();
  const [isOpen, setIsOpen] = useState(false);
  const popoverRef = useRef<OpenHandle>(null);
  const openPopover = useCallback<MouseEventHandler<HTMLButtonElement>>(
    (event) => {
      popoverRef.current?.openWithElement(event.currentTarget);
    },
    [],
  );
  const popoverOpened = useCallback(() => {
    setIsOpen(true);
  }, []);
  const popoverClosed = useCallback(() => {
    setIsOpen(false);
  }, []);

  return (
    <>
      <MuiButton
        {...muiProps}
        // aria-controls={ariaControls}
        // aria-describedby={ariaDescribedBy}
        // aria-expanded={ariaExpanded}
        // aria-haspopup={ariaHasPopup}
        // aria-label={ariaLabel}
        // aria-labelledby={ariaLabelledBy}
        // data-se={testId}
        // href={href}
        // id={id}
        // ref={(element) => {
        //   if (element) {
        //     (
        //       localButtonRef as React.MutableRefObject<
        //         HTMLButtonElement | HTMLAnchorElement
        //       >
        //     ).current = element;
        //     //@ts-expect-error ref is not an optional prop on the props context type
        //     muiProps?.ref?.(element);
        //   }
        // }}
        // size={size}
        // tabIndex={tabIndex}
        // translate={translate}
        // type={type}

        disabled={isOpen}
        onClick={openPopover}
        variant={isOpen ? "secondary" : "floating"}
      >
        <UserProfile
          profileIcon={profileIcon}
          userName={userName}
          orgName={orgName}
          userNameEndIcon={<ChevronDownIcon />}
        />
      </MuiButton>

      <Popover
        popoverAlignment={popoverAlignment}
        popoverRef={popoverRef}
        onOpen={popoverOpened}
        onClose={popoverClosed}
      >
        {children}
      </Popover>
    </>
  );
};

const MemoizedUserProfilePopover = memo(UserProfilePopover);
MemoizedUserProfilePopover.displayName = "UserProfilePopover";

export { MemoizedUserProfilePopover as UserProfilePopover };
