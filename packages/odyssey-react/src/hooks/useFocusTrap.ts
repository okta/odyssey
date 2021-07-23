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

import { useEffect } from "react";

export const focusableSelector = `
a[href],
button,
textarea,
input[type="text"],
input[type="radio"],
input[type="checkbox"],
select
`

type focusTrapOptions = {
    active?: boolean,
    onActivate?: () => void,
    onActivateFocusFirst?: boolean,
    onDeactivate?: () => void
}

const useFocusTrap = (ref: any, options: focusTrapOptions) => {
    const {
      active,
      onActivate,
      onActivateFocusFirst,
      onDeactivate
    } = options;

    useEffect(() => {
        const element = ref.current;
        const focusable = element.querySelectorAll(focusableSelector);
        const focusableFirst = focusable[0];
        const focusableLast = focusable[focusable.length - 1];

        const handleTabFocus = (event: any) => {
          if (focusable && active) {
            if (!event.shiftKey && document.activeElement === focusableLast) { 
              focusableFirst.focus();
              event.preventDefault();
            }
            if (event.shiftKey && document.activeElement === focusableFirst) {
              focusableLast.focus();
              event.preventDefault();
            }
          }
        };
        
        const keymap = new Map([
          ["Tab", handleTabFocus]
        ]);
        
        const handler = (event: KeyboardEvent) => {
            const listener = keymap.get(event.code);
            return (listener) && listener(event);
        }
        
        if (active) {
          if (onActivateFocusFirst) {
            focusableFirst.focus()
          }

          if (onActivate) {
              onActivate();
          }
        }

        if (!active && onDeactivate) {
            onDeactivate();
        }
        
        if (active) {
          element.addEventListener("keydown", handler);
        }

        return () => element.removeEventListener("keydown", handler);
    }, [ref.current, active]);

}

export default useFocusTrap;
