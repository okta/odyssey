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
import { useOmit } from '../../utils';
import styles from './VisuallyHidden.module.scss';

export type Props = {
  /**
   * Text content to be read only to screen readers
   */
  children: ReactText,
};

const VisuallyHidden: FunctionComponent<Props> = (props) => {
  const {
    children,
    ...rest
  } = props;

  const omitProps = useOmit(rest);

  return (
    <span
      {...omitProps}
      className={styles.root}
    >
      {children}
    </span>
  );
};
export default VisuallyHidden;
