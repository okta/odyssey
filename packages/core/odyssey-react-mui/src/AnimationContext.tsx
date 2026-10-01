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

import {
  createContext,
  memo,
  type ReactNode,
  useContext,
  useMemo,
} from "react";

import { useMediaQuery } from "./theme/useMediaQuery.js";

export type AnimationContextValue = {
  /** If `true`, Odyssey components may animate. */
  hasAnimations: boolean;
};

const AnimationContext = createContext<AnimationContextValue>({
  hasAnimations: true,
});

export type AnimationProviderProps = {
  /** The components that receive the animation setting. */
  children: ReactNode;
  /**
   * If `true`, components may animate unless the user prefers reduced motion.
   */
  hasAnimations: boolean;
};

/** Controls animation for every Odyssey component inside it. */
const AnimationProvider = ({
  children,
  hasAnimations,
}: AnimationProviderProps) => {
  const shouldReduceMotion = useMediaQuery("(prefers-reduced-motion: reduce)");
  const providerValue = useMemo(
    () => ({ hasAnimations: hasAnimations && !shouldReduceMotion }),
    [hasAnimations, shouldReduceMotion],
  );

  return (
    <AnimationContext.Provider value={providerValue}>
      {children}
    </AnimationContext.Provider>
  );
};

const MemoizedAnimationProvider = memo(AnimationProvider);
MemoizedAnimationProvider.displayName = "AnimationProvider";

export { MemoizedAnimationProvider as AnimationProvider };

/** Returns `true` if Odyssey components may animate. */
export const useAnimation = () => useContext(AnimationContext).hasAnimations;
