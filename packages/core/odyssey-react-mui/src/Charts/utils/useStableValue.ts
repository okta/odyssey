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

import isEqual from "lodash.isequal";
import { useRef } from "react";

/**
 * Returns the same object for as long as the contents of `value` stay the same.
 * The hook returns the new object after a content change.
 *
 * A chart needs this hook because the chart library rebuilds and redraws the
 * whole chart when the identity of its React children changes. A caller that
 * builds a `series` array inside its own render supplies a new array on each
 * render, and every memo below that point then misses. A comparison of the
 * contents costs one walk over the points, which is far less than one redraw of
 * the chart.
 *
 * The comparison treats a function by its identity, because two functions with
 * the same body can still behave differently. Therefore a caller that supplies a
 * new function on each render, such as an inline formatter, gets a new object
 * from this hook on each render.
 */
export const useStableValue = <ValueType>(value: ValueType): ValueType => {
  // This hook writes to the ref during the render. The write is safe here
  // because the new value comes only from `value`, so a second render with the
  // same input reaches the same result.
  const stableValueRef = useRef(value);

  if (!isEqual(stableValueRef.current, value)) {
    stableValueRef.current = value;
  }

  return stableValueRef.current;
};
