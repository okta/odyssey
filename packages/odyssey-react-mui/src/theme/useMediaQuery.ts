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

export const useMediaQuery = (mediaQuery: string) => {
  const [hasMatches, setHasMatches] = useState(false);

  useEffect(() => {
    const mediaQueryList = window.matchMedia(mediaQuery);

    const updateHasMatches = (event: MediaQueryListEvent | MediaQueryList) =>
      setHasMatches(event.matches);

    mediaQueryList.addEventListener("change", updateHasMatches);

    updateHasMatches(mediaQueryList);

    return () => {
      mediaQueryList.removeEventListener("change", updateHasMatches);
    };
  }, [hasMatches, mediaQuery]);

  return hasMatches;
};
