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

export const uiShellBreakpoint = {
  comfortable: 800,
  compact: 600,
  constrained: 0,
} as const;

export const useUiShellBreakpoints = ():
  | keyof typeof uiShellBreakpoint
  | "none" => {
  const isConstrainedView = useMediaQuery(
    `(min-width: ${uiShellBreakpoint.constrained}px)`,
  );

  const isCompactView = useMediaQuery(
    `(min-width: ${uiShellBreakpoint.compact}px)`,
  );

  const isComfortableView = useMediaQuery(
    `(min-width: ${uiShellBreakpoint.comfortable}px)`,
  );

  if (isComfortableView) {
    return "comfortable";
  }

  if (isCompactView) {
    return "compact";
  }

  if (isConstrainedView) {
    return "constrained";
  }

  // For the initial page load as we don't have media queries until the page loads.
  return "none";
};
