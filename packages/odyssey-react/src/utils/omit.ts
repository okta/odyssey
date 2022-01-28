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

const omitList = ["children", "className", "color", "style"] as const;
type OmitList = typeof omitList[number];

// eslint-disable-next-line @typescript-eslint/ban-types
function omit<T extends object, U extends (keyof T)[]>(
  obj: T,
  ...rest: U
): Omit<T, OmitList | U[number]> {
  const omitted = Object.create(null);

  for (const key in obj) {
    if (
      omitList.includes(key as OmitList) ||
      rest.includes(key) ||
      !{}.hasOwnProperty.call(obj, key)
    )
      continue;

    omitted[key] = obj[key];
  }

  return omitted;
}

export { omit, omit as useOmit };
