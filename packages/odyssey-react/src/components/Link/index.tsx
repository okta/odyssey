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

import React from 'react'
import type { FunctionComponent, ReactText } from 'react'
import { useOmit } from '../../utils';

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
    ...rest
  } = props;

  const omitProps = useOmit(rest);

  return (
    <a 
      {...omitProps}
      target={target}
      rel={rel}
      href={href}
      className="ods-link"
    >
      {children}
    </a>
  )
};

export default Link;
