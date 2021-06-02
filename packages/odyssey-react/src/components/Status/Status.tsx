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

import React, { FunctionComponent } from 'react'
import classNames from "classnames";

export type StatusVariants = 'neutral' | 'success' | 'caution' | 'danger';
export type StatusProps = {
  /**
   * The status label.
   */
  label: string,

  /**
   * Visually hides the status label.
   */
  labelHidden?: boolean,

  /**
   * The description of the present state/status.
   */
  descriptor: string,

  /**
   * The visual variant to be displayed to the user.
   * @default neutral
   */
  variant?: StatusVariants
}

/**
 * Status is used to inform users by providing feedback on system states. Status can display broad
 * operational states as well as granular states like user status.
 *
 * @component
 * @example <Status label={label} descriptor={descriptor} />
 */
const Status: FunctionComponent<StatusProps> = (props) => {
  const {
    label,
    descriptor,
    labelHidden = false,
    variant = "neutral",
  } = props;

  const componentClass = classNames("ods-status", {
    [`is-ods-status-${variant}`]: variant,
    "is-ods-status-label-hidden": labelHidden
  });

  return (
    <div className={componentClass} role="status" data-testid="ods-status">
      <span className="ods-status--label">
        {label}
      </span>
      <span className="ods-status--value">
        {descriptor}
      </span>
    </div>
  )
};

export default Status;
