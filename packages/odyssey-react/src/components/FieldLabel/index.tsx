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
import { useCx } from '../../utils';

export type FieldLabelVariant = 'label' | 'hint' | 'error' | 'optional';
export type Props = {
  /**
   * The text content to be displayed to the user.
   */
  children: ReactText,

  /**
   * The underlying element id attribute.
   */
  id?: string,

  /**
   * The visual variant to be displayed to the user.
   * @default label
   */
  variant?: FieldLabelVariant,
};

/**
 * FieldLabels make forms accessible by providing context to the user.
 * They can be used with all Odyssey inputs.
 */
const FieldLabel: FunctionComponent<Props> = (props) => {
  const {
    children,
    id,
    variant = 'label'
  } = props;

  const Component = variant === 'label' ? 'label' : 'aside';

  const className = useCx(
    variant === 'error' && 'ods-field--error',
    variant === 'hint' && 'ods-field--hint',
    variant === 'label' && 'ods-label',
    variant === 'optional' && 'ods-label--optional'
  );

  return (
    <Component
      className={className}
      id={id}
    >
      {children}
    </Component>
  );
};

export default FieldLabel;
