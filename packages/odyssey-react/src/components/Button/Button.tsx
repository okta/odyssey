/*!
 * Copyright (c) 2021-present, Okta, Inc. and/or its affiliates. All rights reserved.
 * The Okta software accompanied by this notice is provided pursuant to the Apache License, Version 2.0 (the "License.")
 *
 * You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0.
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *
 * See the License for the specific language governing permissions and limitations under the License.
 */

import React, { FunctionComponent, MouseEventHandler, ReactNode } from 'react'
import classNames from "classnames";

export type ButtonProps = {
  /**
   * Content to be rendered within the buttons, usualy label text.
   */
  children: ReactNode,

  /**
   * Additional className's to be applied to the button element.
   */
  className?: string,

  /**
   * Makes the button element unusable.
   */
  disabled?: boolean,

  /**
   * Button click handler.
   */
  onClick: MouseEventHandler<HTMLButtonElement>,

  /**
   * The visual variant to be displayed to the user.
   * @default primary
   */
  variant: 'primary' | 'secondary' | 'danger' | 'dismiss' | 'clear',

  /**
   * Extends the width of the button to that of it's parent.
   */
  wide?: boolean
}

/**
 * The world's most _basic_ button
 */
const Button: FunctionComponent<ButtonProps> = (props) => {
  const { 
    children,
    className,
    disabled,
    onClick,
    variant,
    wide
  } = props;

  const componentClass = classNames("ods-button", {
    "is-ods-button-full-width": wide,
    [`is-ods-button-${variant}`]: variant,
  }, className);

  return (
    <button
      className={componentClass}
      disabled={disabled}
      onClick={onClick}
    >
      <span className="ods-button--label">{children}</span>
    </button>
  )
};

export default Button;
