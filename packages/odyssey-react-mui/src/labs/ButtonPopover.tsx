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
  memo,
  MouseEventHandler,
  ReactNode,
  useCallback,
  useRef,
  useState,
} from "react";
import { Button, ButtonProps } from "../Button";
import { NullElement } from "../NullElement";
import { OpenHandle, Popover, PopoverProps } from "./Popover";

export const popoverAlignmentValues = ["left", "right"] as const;

export type ButtonPopoverProps = {
  /**
   * The horizontal alignment of the popover.
   */
  popoverAlignment?: PopoverProps["popoverAlignment"];
  /**
   * The contents of the popover
   */
  children: ReactNode | NullElement;
} & ButtonProps;

const ButtonPopover = (props: ButtonPopoverProps) => {
  const { children, popoverAlignment, ...buttonProps } = props;
  const [isOpen, setIsOpen] = useState(false);

  // Adding a tooltip to the button means the popover does not get placed in the right location
  delete buttonProps.tooltipText;

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
      <Button
        {...buttonProps}
        isDisabled={buttonProps.isDisabled || isOpen}
        onClick={openPopover}
      />
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

const MemoizedButtonPopover = memo(ButtonPopover);
MemoizedButtonPopover.displayName = "ButtonPopover";

export { MemoizedButtonPopover as ButtonPopover };
