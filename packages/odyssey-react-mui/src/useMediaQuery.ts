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

import { useEffect, useState } from "react";

// const defaultedMobileBreakpoint =
// mobileBreakpointOverride || BASE_MOBILE_BREAKPOINT;

// const [mobileBreakPoint, setMobileBreakpoint] = useState<number>(
// pxToRem(defaultedMobileBreakpoint, ROOT_FONT_SIZE),
// );

// useEffect(() => {
// if (hasSideNav) {
//   const baseBreakpoint =
//     defaultedMobileBreakpoint + parseInt(DEFAULT_SIDE_NAV_WIDTH);

//   if (hasAppSwitcher) {
//     const breakpointWithAppSwitcher = baseBreakpoint + APP_SWITCHER_WIDTH;

//     setMobileBreakpoint(pxToRem(breakpointWithAppSwitcher, ROOT_FONT_SIZE));
//   } else {
//     setMobileBreakpoint(pxToRem(baseBreakpoint, ROOT_FONT_SIZE));
//   }
// }

// if (hasAppSwitcher && !hasSideNav) {
//   setMobileBreakpoint(
//     pxToRem(defaultedMobileBreakpoint + APP_SWITCHER_WIDTH, ROOT_FONT_SIZE),
//   );
// }
// }, [defaultedMobileBreakpoint, hasAppSwitcher, hasSideNav]);

// export const isMobile = useMediaQuery(`(max-width: ${mobileBreakPoint}rem)`);

export const useMediaQuery = (mediaQuery: string) => {
  const [hasMatches, setHasMatches] = useState(false);

  useEffect(() => {
    const mediaQueryList = window.matchMedia(mediaQuery);

    const updateHasMatches = () => setHasMatches(mediaQueryList.matches);

    mediaQueryList.addEventListener("change", updateHasMatches);

    updateHasMatches();

    return () => {
      mediaQueryList.removeEventListener("change", updateHasMatches);
    };
  }, [hasMatches, mediaQuery]);

  return hasMatches;
};
