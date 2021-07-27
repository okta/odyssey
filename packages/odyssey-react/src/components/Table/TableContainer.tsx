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

import React from 'react';
import type { ReactNode, DetailedHTMLProps, HTMLAttributes } from 'react';

import { tableClass } from './Table';
import { useCx } from '../../utils';

export type Props = {
  /**
  * The table for this container
  */
  children?: ReactNode,
  /**
  * The visible heading for your table
  */
  title: ReactNode,
} & DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement>

type Ref = HTMLElement;

const TableContainer = React.forwardRef<Ref, Props>((props, ref) => {
  const {
    children,
    className,
    title,
    ...rest
  } = props;

  const componentClass = useCx(
    `${tableClass}--figure`,
    className && className,
  );

  return (
    <figure ref={ref} className={componentClass} {...rest}>
      <figcaption className={`${tableClass}--figcaption`}>{title}</figcaption>
      {children}
    </figure>
  );
});

export default TableContainer;