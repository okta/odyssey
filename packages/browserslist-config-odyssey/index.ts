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

function literalTuple<T extends string, U extends [T, ...T[]]>(...args: U): U {
  return args;
}

const modern = literalTuple(
  "last 1 Chrome version",
  "last 1 Safari version",
  "last 1 Edge version",
  "last 1 Firefox version",
  "Firefox ESR",
);

const ie11 = literalTuple("IE 11");

const all = literalTuple(...modern, ...ie11);

const config = {
  all,
  ie11,
  modern,
  production: all,
  development: modern,
  test: modern,
};

module.exports = config;
