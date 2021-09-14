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
import type { StyleOpts } from '@okta/odyssey-transform-styles-babel-plugin';
import assertEnv from './assertEnv';

interface Opts {
  styles?: StyleOpts;
}

function preset (
  api: Babel.ConfigAPI,
  _opts: Opts = {}
): Babel.TransformOptions {
  assertEnv(api.env());
  const opts = Object.assign(
    {
      env: {},
      react: {},
      styles: {},
      typescript: {}
    },
    _opts
  );

  return {
    plugins: [
      [ '@okta/odyssey-transform-styles-babel-plugin', opts.styles ]
    ],
    presets: [
      [ '@babel/preset-env', opts.env ],
      [ '@babel/preset-react', opts.react ],
      [ '@babel/preset-typescript', opts.typescript ]
    ]
  };
}

export {
  assertEnv,
  preset as default
};
