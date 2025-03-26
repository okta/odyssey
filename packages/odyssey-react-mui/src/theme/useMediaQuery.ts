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

import { useCallback, useEffect, useMemo, useState } from "react";

import { StringWithValue } from "./StringWithValue.js";

export const useMediaQuery = <MediaQuery extends string>(
  mediaQuery: StringWithValue<MediaQuery>,
) => {
  const mediaQueryList = useMemo(
    () => window.matchMedia(mediaQuery),
    [mediaQuery],
  );

  const [hasMatches, setHasMatches] = useState(() => mediaQueryList.matches);

  const updateHasMatches = useCallback(
    (event: MediaQueryListEvent | MediaQueryList) =>
      setHasMatches(event.matches),
    [],
  );

  useEffect(() => {
    mediaQueryList.addEventListener("change", updateHasMatches);

    updateHasMatches(mediaQueryList);

    return () => {
      mediaQueryList.removeEventListener("change", updateHasMatches);
    };
  }, [mediaQueryList]);

  return hasMatches;
};
