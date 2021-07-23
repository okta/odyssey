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

import { useEffect } from 'react';
import type { KeyboardEvent } from 'react';

type KeyPressMap = Array<[string, (event: KeyboardEvent) => void]>;

/**
 * useKeyPress
 * @param {string} key - the name of the key to respond to, compared against event.key
 * @param {function} action - the action to perform on key press
 */

const useKeypress = (keyMap: KeyPressMap, condition = true) => {
  useEffect(() => {
    const map = keyMap;
    const keyListenersMap = new Map(map);
    
    function keyListener(event: KeyboardEvent) {
      const listener = keyListenersMap.get(event.code);
      return (listener) && listener(event);
    }
    
    if (condition) {
      window.addEventListener('keyup', keyListener);
    }

    return () => window.removeEventListener('keyup', keyListener);
  }, [keyMap, condition]);
}

export default useKeypress
