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

const path = require('path');
const isStaticBuild = Boolean(process.env.STATIC_BUILD) || false;

module.exports = () => {
  const result = {
    plugins: [
      require('postcss-node-sass')({}),
    ]
  };

  if (isStaticBuild) {
    result.plugins.push(
      require('postcss-modules')({
        generateScopedName(local, fpath) {
          const folder = path.dirname(fpath).split('/').pop();
          return `ods-${folder}-${local}`.toLowerCase();
        }
      }),
      require('postcss-custom-selectors')({
        importFrom: [
          { customSelectors: { ':--root': 'html' } }
        ]
      })
    )
  } else {
    result.plugins.push(
      require('postcss-custom-selectors')({
        importFrom: [
          { customSelectors: { ':--root': '.root' } }
        ]
      })
    )
  }

  return result
};
