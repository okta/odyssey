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

import type * as Babel from '@babel/core';
import assertEnv from './assertEnv';

export default function configuration (
  api: Babel.ConfigAPI
): Babel.TransformOptions {
  assertEnv(api.env());

  return {
    presets: [
      [
        '@babel/preset-env',
        {
          targets: {
            esmodules: true
          },
        }
      ],
      [
        '@babel/preset-react',
        {
          runtime: 'automatic',
        }
      ],
      '@babel/preset-typescript',
    ],

    env: {
      production: {
        plugins: [
          '../plugins/transformScssModules',
        ],
        presets: [
          [
            '@babel/preset-env',
            {
              targets: {
                esmodules: true
              },
              modules: false
            }
          ],
        ],
        ignore: [
          /\.test\.|\.stories\./i
        ],
        comments: false,
        shouldPrintComment: (val: string) => {
          return /Okta, Inc\.|@license|@preserve/.test(val);
        }
      }
    }
  };
}
