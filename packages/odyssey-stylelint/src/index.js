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

module.exports = {
  plugins: [
    require.resolve('./rules'),
    'stylelint-scss'
  ],
  extends: [
    'stylelint-config-recommended',
    'stylelint-config-standard',
    'stylelint-config-sass-guidelines',
    'stylelint-config-property-sort-order-smacss'
  ],
  rules: {
    'odyssey/header': true,
    'at-rule-empty-line-before': [
      'always',
      {
        except: [ 'blockless-after-same-name-blockless', 'first-nested' ],
        ignore: [ 'after-comment' ],
        ignoreAtRules: [ 'else' ]
      }
    ],
    'at-rule-no-unknown': null,
    'block-closing-brace-newline-after': [ 'always', { ignoreAtRules: [ 'if', 'else' ] } ],
    'color-hex-length': 'long',
    'declaration-no-important': true,
    'max-nesting-depth': [ 3, { ignoreAtRules: [ 'media', 'supports', 'include' ] } ],
    'order/properties-alphabetical-order': null,
    'scss/at-else-closing-brace-newline-after': 'always-last-in-chain',
    'scss/at-else-closing-brace-space-after': 'always-intermediate',
    'scss/at-else-empty-line-before': 'never',
    'scss/at-if-closing-brace-newline-after': 'always-last-in-chain',
    'scss/at-if-closing-brace-space-after': 'always-intermediate',
    'selector-type-no-unknown': [ true, { ignore: [ 'custom-elements' ] } ]
  }
}
