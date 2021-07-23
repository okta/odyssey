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

/**
 * useOutsideClick
 * @param {string} ref - the name of the key to respond to, compared against event.key
 * @param {function} callback - the action to perform on key press
 * @param {boolean} [condition] - A condition which if true instantiates the click event listener
 */

const useOutsideClick = (ref: any, callback: (event: MouseEvent) => void, condition = true) => {
    const handleClick = (event: MouseEvent) => {
        if (ref.current && !ref.current.contains(event.target)) {
            callback(event);
        }
    };

    useEffect(() => {
        if (condition) {
            document.addEventListener("click", handleClick);
        }

        return () => {
            document.removeEventListener("click", handleClick);
        };
    });    
}

export default useOutsideClick
