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

import type { FunctionComponent } from 'react';
import styles from './Status.module.scss';

export type StatusVariants = 'neutral' | 'success' | 'caution' | 'danger';
export type Props = {
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
const Status: FunctionComponent<Props> = (props) => {
  const {
    label,
    descriptor,
    labelHidden = false,
    variant = "neutral",
  } = props;

  const valueClass = variant && (variant !== 'neutral') ? styles[variant] : styles.value;
  const labelClass = labelHidden ? styles.labelVisuallyHidden : styles.label;
  
  return (
    <div className={styles.status} role="status">
      <span className={labelClass}>
        {label}
      </span>
      <span className={valueClass}>
        {descriptor}
      </span>
    </div>
  )
};

export default Status;
