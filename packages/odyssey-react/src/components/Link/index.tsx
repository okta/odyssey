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

import type { FunctionComponent, ReactText } from 'react';
import { External } from '../Icon';
import { useCx, useOmit } from '../../utils';
import styles from './Link.module.scss'

export type LinkVariants = 'primary' | 'secondary';
export type Props = {
  /**
   * The URL that the hyperlink points to. Links are not restricted to HTTP-based URLs — they can use any URL scheme supported by browsers.
   */
  href: string,

  /**
   * Where to display the linked URL, as the name for a browsing context (a tab, window, or iframe).
   */
  target?: '_self' | '_blank' | '_parent' | '_top'

  /**
   * The relationship of the linked URL as space-separated link types.
   */
  rel?: 'noopener' | 'noreferrer'

  /**
   * The visual variant to be displayed to the user.
   * @default primary
   */
  variant?: LinkVariants,

  /**
   * The human readable/percievable value shown to the user
  */
  children: ReactText
}

/**
 * Links are navigation elements displayed as text. Use a Link to bring a user to another page or start a download.
 *
 * @component
 * @example <Link href={href}>Link text</Link>
 */
const Link: FunctionComponent<Props> = (props) => {
  const {
    children,
    target,
    rel,
    href,
    variant = "primary",
    ...rest
  } = props;

  const componentClass = useCx(
    styles.root,
    styles[`${variant}Variant`],
  );

  const omitProps = useOmit(rest);
  const external = target === `_blank`;

  return (
    <a
      {...omitProps}
      target={target}
      rel={rel}
      href={href}
      className={componentClass}
    >
      {children}
      {external && <span className={styles.icon} role="presentation"><External /></span>}
    </a>
  )
};

export default Link;
