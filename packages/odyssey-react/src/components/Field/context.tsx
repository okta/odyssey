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

import { createContext, useCallback, useContext, useState } from 'react';
import type { ReactElement } from 'react';
import type { Props } from '.';

interface Context {
  value?: string;
  disabled?: boolean;
  name?: string;
  id?: string;
  required?: boolean;
  readonly?: boolean;
  onChange?: Props['onChange'];
}

interface ProviderProps {
  children: ReactElement | ReactElement[];
  value?: Context;
}

const FieldContext = createContext<Context>({});

const useValue = ({ value, onChange, ...rest }: Context) => {
  const [valueState, setValueState] = useState(value);

  const onChangeWithState = useCallback(
    (event) => {
      onChange?.(event, event.target.value);
      setValueState(event.target.value);
    },
    [onChange, setValueState]
  );

  return {
    ...rest,
    value: value ?? valueState,
    onChange: onChangeWithState
  };
};

const FieldProvider = (props: ProviderProps): ReactElement => {
  const {
    children,
    value = {}
  } = props;

  return <FieldContext.Provider
    value={useValue(value)}
    children={children}
  />;
};

const useField = (): Context => {
  const context = useContext(FieldContext);

  if (Object.keys(context).length === 0) {
    throw new Error('useField must be used within a FieldProvider');
  }

  return context;
};

export {
  FieldProvider,
  useField
};

