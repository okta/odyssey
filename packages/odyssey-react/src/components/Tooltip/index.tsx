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

import { cloneElement } from 'react';
import type { ReactElement, FunctionComponent } from 'react';
import { useOid } from '../../utils';
import className from 'classnames';

export type Props = {
  /**
   * Content to be rendered that needs a tooltip label
   */
  children: ReactElement,

  /**
   * The underlying tooltip id attribute. Automatically generated if not provided
   */
  id?: string,

  /**
   * The position the tooltip will be displayed
   * @default top
   */
  position?: 'top' | 'end' | 'bottom' | 'start',

  /**
   * The position the tooltip will be displayed
   */
  label: string;
};

/**
 * A transient element that provides additional context for an element when it receives hover or focus.
 */
const Tooltip: FunctionComponent<Props> = (props) => {
  const {
    children,
    id,
    label,
    position = 'top',
  } = props;

  const oid = useOid(id);
  const clone = cloneElement(children, { 'aria-describedby': oid });

  const componentClass = className('ods-tooltip', {
    [`is-ods-tooltip-${position}`]: position
  });

  return (
    <span className="has-ods-tooltip">
      {clone}
      <aside id={oid} className={componentClass} role="tooltip">
        {label}
      </aside>
    </span>
  );
};

export default Tooltip;
