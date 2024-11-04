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
  ReactNode,
  useCallback,
  useImperativeHandle,
  useMemo,
  useState,
} from "react";
import { Popover as MuiPopover, PopoverOrigin } from "@mui/material";
import {
  DesignTokens,
  useOdysseyDesignTokens,
} from "../OdysseyDesignTokensContext";
import { Box } from "../Box";
import { NullElement } from "../NullElement";
import { useMuiProps } from "../MuiPropsContext";

export const popoverAlignmentValues = ["left", "right"] as const;

export type OpenHandle = {
  openWithElement: (element: HTMLElement) => void;
};

export type PopoverProps = {
  /**
   * The ref forwarded to the Popover
   */
  popoverRef?: React.RefObject<OpenHandle>;
  /**
   * The horizontal alignment of the popover.
   */
  popoverAlignment?: (typeof popoverAlignmentValues)[number];
  /**
   * The contents of the popover
   */
  children: ReactNode | NullElement;
  /**
   * Called when the popover has opened
   */
  onOpen?: () => void;
  /**
   * Called when the popover has closed
   */
  onClose?: () => void;
};

const Popover = ({
  popoverRef,
  popoverAlignment,
  children,
  onOpen,
  onClose,
}: PopoverProps) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const odysseyDesignTokens: DesignTokens = useOdysseyDesignTokens();
  const muiProps = useMuiProps();

  const isOpen = Boolean(anchorEl);

  useImperativeHandle(
    popoverRef,
    () => ({
      openWithElement: (element) => {
        setAnchorEl(element);
        onOpen && onOpen();
      },
    }),
    [onOpen],
  );

  const closePopover = useCallback(() => {
    setAnchorEl(null);
    onClose && onClose();
  }, [onClose]);

  const anchorOrigin = useMemo(
    () =>
      ({
        horizontal: popoverAlignment,
        vertical: "bottom",
      }) as PopoverOrigin,
    [popoverAlignment],
  );

  const transformOrigin = useMemo(
    () =>
      ({
        horizontal: popoverAlignment,
        vertical: "top",
      }) as PopoverOrigin,
    [popoverAlignment],
  );

  return (
    <MuiPopover
      {...muiProps}
      open={isOpen}
      anchorEl={anchorEl}
      onClose={closePopover}
      anchorOrigin={anchorOrigin}
      transformOrigin={transformOrigin}
    >
      <Box
        sx={{
          padding: odysseyDesignTokens.Spacing5,
        }}
      >
        {children}
      </Box>
    </MuiPopover>
  );
};

const MemoizedPopover = memo(Popover);
MemoizedPopover.displayName = "Popover";

export { MemoizedPopover as Popover };
