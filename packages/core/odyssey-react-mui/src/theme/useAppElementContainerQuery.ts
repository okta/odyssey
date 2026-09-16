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

import { useContrastModeContext } from "../useContrastMode.js";
import {
  useContainerQuery,
  type UseContainerQueryProps,
} from "./useContainerQuery.js";

export type UseAppElementContainerQueryProps = Omit<
  UseContainerQueryProps,
  "target"
>;

/**
 * Reports whether Odyssey's app wrapper element satisfies a container query.
 * This is the app-scoped analog of `useMediaQuery`: bounds are matched against
 * the wrapper's `inline-size` (width) and `block-size` (height) rather than the
 * viewport, so responsiveness tracks the space Odyssey actually occupies (which
 * shrinks as surrounding chrome such as a side nav expands). Returns `false`
 * until the wrapper element exists, including when `OdysseyProvider` renders
 * with `hasWrapperElement={false}` and when called outside a provider.
 */
export const useAppElementContainerQuery = ({
  maxHeight,
  maxWidth,
  minHeight,
  minWidth,
}: UseAppElementContainerQueryProps) => {
  const { contrastContainerRef } = useContrastModeContext();

  return useContainerQuery({
    maxHeight,
    maxWidth,
    minHeight,
    minWidth,
    target: contrastContainerRef ?? null,
  });
};
