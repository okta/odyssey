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

// Matches commas between shadows, excluding commas inside their `rgba()` colors so each Odyssey shadow token becomes a complete `drop-shadow()` argument.
const SHADOW_LIST_SEPARATOR = /,(?![^(]*\))/;

export type GetDropShadowFilterArgs = {
  boxShadow: string;
};

/** Returns a CSS filter from an Odyssey shadow token, such as `ShadowScale1`. Shadows must omit inset and spread radius because `drop-shadow()` does not support them. */
export const getDropShadowFilter = ({
  boxShadow,
}: GetDropShadowFilterArgs): string =>
  boxShadow
    .split(SHADOW_LIST_SEPARATOR)
    .map((shadow) => `drop-shadow(${shadow.trim()})`)
    .join(" ");
