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

import type { FunctionComponent, MouseEventHandler, ReactText } from 'react';
import { useCx, useOmit } from '../../utils';
import styles from './Button.module.scss';

export type ButtonVariants = 'primary' | 'secondary' | 'danger' | 'dismiss' | 'clear';
export type ButtonSizes = 's' | 'm' | 'l';
export type Props = {
  /**
   * Text content to be rendered within the button, usualy label text.
   */
  children: ReactText,

  /**
   * Makes the button element unusable.
   */
  disabled?: true,

  /**
   * Button click handler.
   */
  onClick?: MouseEventHandler<HTMLButtonElement>,

  /**
   * The size to be displayed to the user.
   * @default m
   */
  size?: ButtonSizes;

  /**
   * The visual variant to be displayed to the user.
   * @default primary
   */
  variant?: ButtonVariants,

  /**
   * Extends the width of the button to that of it's parent.
   */
  wide?: boolean;
};

/**
 * A clickable button used for form submissions and most in-page interactions.
 *
 * @component
 * @example
 * <Button variant="primary" onClick={() => {}}>Button label</Button>
 */
const Button: FunctionComponent<Props> = (props) => {
  const {
    children,
    disabled,
    onClick,
    size = "m",
    variant = "primary",
    wide,
    ...rest
  } = props;

  const componentClass = useCx(
    styles.root,
    styles[`${variant}Variant`],
    styles[`${size}Size`],
    {
      [styles.wideLayout]: wide
    },
  );

  const omitProps = useOmit(rest);

  return (
    <button
      {...omitProps}
      className={componentClass}
      disabled={disabled}
      onClick={onClick}
    >
      <span className={styles.label}>{children}</span>
    </button>
  );
};

export default Button;
