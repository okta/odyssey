/*!
 * Copyright (c) 2025-present, Okta, Inc. and/or its affiliates. All rights reserved.
 * The Okta software accompanied by this notice is provided pursuant to the Apache License, Version 2.0 (the "License.")
 *
 * You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0.
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *
 * See the License for the specific language governing permissions and limitations under the License.
 */

import { useMediaQuery } from "../theme/useMediaQuery.js";

export type UiShellBreakpointConfig = {
  medium: number;
  narrow: number;
  wide: number;
};

export const defaultUiShellBreakpointConfig = {
  narrow: 0,
  medium: 600,
  wide: 800,
} as const satisfies UiShellBreakpointConfig;

export const adminAppUiShellBreakpoints = {
  narrow: 0,
  medium: 600,
  wide: 1304,
} as const satisfies UiShellBreakpointConfig;

export const useUiShellBreakpoints = (
  breakpointConfig: UiShellBreakpointConfig = defaultUiShellBreakpointConfig,
): keyof UiShellBreakpointConfig | "none" => {
  const isNarrowView = useMediaQuery(
    `(min-width: ${breakpointConfig.narrow}px)`,
  );

  const isMediumView = useMediaQuery(
    `(min-width: ${breakpointConfig.medium}px)`,
  );

  const isWideView = useMediaQuery(`(min-width: ${breakpointConfig.wide}px)`);

  if (isWideView) {
    return "wide";
  }

  if (isMediumView) {
    return "medium";
  }

  if (isNarrowView) {
    return "narrow";
  }

  // This is a failsafe in case we don't have any media queries on page load or if media queries were improperly defined (no `0` case). With the default breakpoints, it will never be `"none"`.
  return "none";
};
