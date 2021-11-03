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

const lowerCamel = /^[a-z][a-zA-Z0-9]*$/;
const lowerCamelMessage = (type) =>
  `${type} should be written in lower camel case (e.g. fooBarBaz)`;

module.exports = {
  extends: "@okta/odyssey-stylelint",
  rules: {
    "selector-max-class": 2,
    "selector-max-id": 0,
    "selector-max-type": 0,
    "selector-max-universal": 0,
    "selector-no-vendor-prefix": true,
    "selector-class-pattern": [
      lowerCamel,
      {
        message: lowerCamelMessage("Selector"),
      },
    ],
    "keyframes-name-pattern": [
      lowerCamel,
      {
        message: lowerCamelMessage("Keyframes"),
      },
    ],
  },
};
