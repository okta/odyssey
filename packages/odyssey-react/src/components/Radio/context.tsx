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

import {
  createContext,
  useCallback,
  useContext,
  useState,
  ReactNode,
} from "react";
import type { ReactElement } from "react";
import type { RadioGroupProps } from "./RadioGroup";

interface Context {
  value?: string;
  disabled?: boolean;
  name?: string;
  groupid?: string;
  hint?: string;
  error?: ReactNode;
  required?: boolean;
  onChange?: RadioGroupProps["onChange"];
}

interface ProviderProps {
  children: ReactElement | ReactElement[];
  value?: Context;
}

const RadioGroupContext = createContext<Context>({});

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
    onChange: onChangeWithState,
  };
};

const RadioGroupProvider = (props: ProviderProps): ReactElement => {
  const { children, value = {} } = props;

  return (
    <RadioGroupContext.Provider value={useValue(value)} children={children} />
  );
};

const useRadioGroup = (): Context => {
  const context = useContext(RadioGroupContext);

  if (Object.keys(context).length === 0) {
    throw new Error("useRadioGroup must be used within a RadioGroupProvider");
  }

  return context;
};

export { RadioGroupProvider, useRadioGroup };
