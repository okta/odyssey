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

import type { ReactNode, ReactElement, ComponentProps } from 'react';
import { forwardRef } from 'react';

import { useOmit } from '../../utils';

import styles from './Table.module.scss';

export type Props = {
  /**
  * The table for this container
  */
  children?: ReactElement | ReactElement[],
  /**
  * The visible heading for the table
  */
  title: ReactNode,
} & ComponentProps<'figure'>

type Ref = HTMLElement;

const TableContainer = forwardRef<Ref, Props>((props, ref) => {
  const {
    children,
    title,
    ...rest
  } = props;

  const omitProps = useOmit(rest);

  return (
    <figure ref={ref} className={styles.container} {...omitProps}>
      <figcaption className={styles.title}>{title}</figcaption>
      {children}
    </figure>
  );
});

export default TableContainer;
