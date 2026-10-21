/*!
 * Copyright (c) 2026-present, Okta, Inc. and/or its affiliates. All rights reserved.
 * The Okta software accompanied by this notice is provided pursuant to the Apache License, Version 2.0 (the "License.")
 *
 * You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0.
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *
 * See the License for the specific language governing permissions and limitations under the License.
 */

/**
 * Checks that a value is a plain object, so its properties can be read and checked one at a time.
 */
export const isRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === "object" && value !== null && !Array.isArray(value);

/**
 * Checks that a value is a string or `undefined`, for optional message fields.
 */
export const isOptionalString = (value: unknown): value is string | undefined =>
  value === undefined || typeof value === "string";

/**
 * Creates a check that a value is one of a fixed list, such as a banner's severity.
 */
export const createIsOneOf =
  <Value extends string>(values: readonly Value[]) =>
  (value: unknown): value is Value =>
    values.some((allowedValue) => allowedValue === value);
