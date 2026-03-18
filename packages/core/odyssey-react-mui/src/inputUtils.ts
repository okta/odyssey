/*!
 * Copyright (c) 2023-present, Okta, Inc. and/or its affiliates. All rights reserved.
 * The Okta software accompanied by this notice is provided pursuant to the Apache License, Version 2.0 (the "License.")
 *
 * You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0.
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *
 * See the License for the specific language governing permissions and limitations under the License.
 */

import { useMemo } from "react";

export type FocusHandle = {
  focus: () => void;
};

type UseControlledStateProps<Value> = {
  controlledValue?: Value;
  uncontrolledValue?: Value;
};

export const ComponentControlledState = {
  CONTROLLED: "CONTROLLED",
  UNCONTROLLED: "UNCONTROLLED",
};

export type ModeType = keyof typeof ComponentControlledState;
export type ModeTypeValue = (typeof ComponentControlledState)[ModeType];

export const getControlState = <Value>({
  controlledValue,
  uncontrolledValue,
}: UseControlledStateProps<Value>): ModeTypeValue => {
  if (uncontrolledValue !== undefined || controlledValue === undefined) {
    return ComponentControlledState.UNCONTROLLED;
  }
  return ComponentControlledState.CONTROLLED;
};

type InputValueProps<Value> = {
  controlState: ModeTypeValue;
  defaultValue?: Value;
  value?: Value;
};

type InputValue<Value> =
  | {
      defaultValue: Value | undefined;
      value?: undefined;
    }
  | {
      defaultValue?: undefined;
      value: Value | undefined;
    };

/**
 * In components that support being used in a controlled or uncontrolled way, the defaultValue and value props need
 * to be supplied values in a mutually exclusive way.
 * If a `value` is being provided to the component, then it is being used in a controlled manner and `defaultValue` needs to be undefined.
 * If `value` is undefined, then that means the component is being used in an uncontrolled way and `defaultValue` is either Value or undefined.
 * This helper helps ensure this mutual exclusivity between the 2 props so the component can operate as expected.
 *
 * @param {InputValueProps<Value>}: { defaultValue: Value | undefined, value: Value | undefined }
 * @returns {InputValue<Value>}: { defaultValue: Value | undefined, value?: undefined } | { defaultValue?: undefined, value: Value }
 */
export const useInputValues = <Value>({
  defaultValue,
  value,
  controlState,
}: InputValueProps<Value>): InputValue<Value> => {
  const inputValues = useMemo(() => {
    if (controlState === ComponentControlledState.CONTROLLED) {
      return { value };
    }
    return { defaultValue };
  }, [controlState, defaultValue, value]);
  return inputValues;
};
