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

// eslint-disable-next-line @typescript-eslint/ban-types
const notOwnProperty = (obj: object, prop: string) => !{}.hasOwnProperty.call(obj, prop);
const omitList = `children className style`.split(` `);

function omit<
  // eslint-disable-next-line @typescript-eslint/ban-types
  T extends object,
  U extends (keyof T)[]
>(obj: T, ...rest: U): Omit<T, U[number]> {
  const omitted = Object.create(null);

  for (const key in obj) {
    if (
      omitList.includes(key) || rest.includes(key) || notOwnProperty(obj, key)
    ) continue;

    omitted[key] = obj[key];
  }

  return omitted;
}

export { omit, omit as useOmit };
