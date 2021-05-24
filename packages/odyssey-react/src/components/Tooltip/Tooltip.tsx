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

import React, { ReactNode, FunctionComponent } from 'react'
import className from 'classnames';

export type TooltipProps = {
  children: ReactNode,

  /**
   * The position the tooltip will be displayed.
   * @default top
   */
  position: 'top' | 'right' | 'bottom' | 'left',

  /**
   * The position the tooltip will be displayed.
   */
  label: string
}

/**
 * A transient element that provides additional context for an element when it receives hover or focus.
 * 
 * @component
 * @example <Tooltip position="top" label="The tooltip text content">...</Tooltip>
 */
const Tooltip: FunctionComponent<TooltipProps> = ({ position = 'top', label, children }) => {
  const componentClass = className('ods-tooltip', {
    [`is-ods-tooltip-${position}`]: position
  });

  return (
    <span className="has-ods-tooltip" data-testid="ods-tooltip">
      {children}
      <aside id="edit-label" className={componentClass} role="tooltip">
        {label}
      </aside>
    </span>
  )
};

export default Tooltip;
