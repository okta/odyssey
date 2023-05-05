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

import { Button as MuiButton } from "@mui/material";
import type { ButtonProps as MuiButtonProps } from "@mui/material";
import {
  forwardRef,
  memo,
  ReactElement,
  RefObject,
  useContext,
  useMemo,
  useRef,
} from "react";

import { RefContext } from "./RefContext";
import { Tooltip } from "./Tooltip";
import { Icon } from "./Icon";

export type ButtonProps = {
  endIcon?: ReactElement<typeof Icon>;
  id?: string;
  isDisabled?: boolean;
  isFullWidth?: boolean;
  onClick?: MuiButtonProps["onClick"];
  size?: MuiButtonProps["size"];
  startIcon?: ReactElement<typeof Icon>;
  text?: string;
  /**
   * `tooltipText` determines the text of the tooltip that wraps the button if it's icon-only.
   */
  tooltipText?: string;
  variant?: "primary" | "secondary" | "danger" | "floating";
};

const Button = forwardRef(
  (
    {
      endIcon,
      id,
      isDisabled,
      isFullWidth,
      onClick,
      size = "medium",
      startIcon,
      text,
      tooltipText,
      variant,
    }: ButtonProps,
    ref
  ) => {
    const buttonRef = useRef<HTMLButtonElement>(null);

    const button = useMemo(
      () => (
        <MuiButton
          disabled={isDisabled}
          endIcon={endIcon}
          fullWidth={isFullWidth}
          id={id}
          ref={buttonRef}
          onClick={onClick}
          size={size}
          startIcon={startIcon}
          variant={variant}
        >
          {text}
        </MuiButton>
      ),
      [
        endIcon,
        id,
        isDisabled,
        isFullWidth,
        onClick,
        buttonRef,
        size,
        startIcon,
        text,
        variant,
      ]
    );

    return (
      <>
        {tooltipText && (
          <Tooltip ariaType="description" placement="top" text={tooltipText}>
            {button}
          </Tooltip>
        )}
        {!tooltipText && button}
      </>
    );
  }
);

const MemoizedButton = memo(Button);

export { MemoizedButton as Button };
