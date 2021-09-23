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

import { useMemo } from 'react';

type arg = string | boolean | undefined | { [key: string]: boolean | undefined }

type cx = (...args: arg[]) => string;

export const cx: cx = (...args) => {
  let classNames = ''
  let lead = ''

  for (const arg of args) {
    if (typeof arg === 'string') { arg && (classNames += `${lead}${arg}`) }
    if (typeof arg === 'object') {
      Object.entries(arg).forEach(
        ([k, v]) => v && (classNames +=`${lead}${k}`)
      )
    }
    if (!lead && classNames) { lead = ' ' }
  }

  return classNames;
}

export const useCx: cx = (...args) => {
  return useMemo(() => cx(...args), [cx, args]);
};
