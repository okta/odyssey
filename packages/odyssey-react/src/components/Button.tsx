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
  ariaLabel?: string,
  children: ReactNode,
  className?: string,
  disabled?: boolean,
  onClick: MouseEventHandler<HTMLButtonElement>,
  variant: 'primary' | 'secondary' | 'danger' | 'dismiss' | 'clear',
  wide?: boolean
}

const Button: FunctionComponent<ButtonProps> = (props) => {
  const { 
    ariaLabel,
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

  const labelClass = classNames("ods-button--label", {
    "u-visually-hidden": ariaLabel
  });

  return (
    <button
      className={componentClass}
      aria-label={ariaLabel}
      disabled={disabled}
      onClick={onClick}
    >
      {children && <span className={labelClass}>{children}</span>}
    </button>
  )
};

export default Button;
