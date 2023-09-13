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

import { useEffect, useRef, useState } from "react";

/**
 * Use the same way as `useState`. Returns a stateful value, and a function to update it.
 * When `initialState` is passed, the returned function to update it does nothing. This is
 * useful to handle values in components that may be controlled externally when that value is
 * passed in props and thus wish to prevent internal updates of the same value.
 * 
 * @param initialState
 * @see https://react.dev/reference/react/useState
 */
export const useControlledState: typeof useState = (initialState?) => {
  const isControlled = useRef(initialState !== undefined);
  const [stateValue, setStateValue] = useState(initialState);

  useEffect(() => {
    setStateValue(initialState);
  }, [initialState])

  return [
    stateValue,
    // is value is controlled external to the component then we ignore calls to the setter
    isControlled.current ? () => undefined : setStateValue,
  ];
};
