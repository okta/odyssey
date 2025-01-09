/*!
 * Copyright (c) 2024-present, Okta, Inc. and/or its affiliates. All rights reserved.
 * The Okta software accompanied by this notice is provided pursuant to the Apache License, Version 2.0 (the "License.")
 *
 * You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0.
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *
 * See the License for the specific language governing permissions and limitations under the License.
 */

import { useEffect, useRef, useState } from "react";

export const useScrollState = <
  ScrollableContentElement extends HTMLElement = HTMLDivElement,
>() => {
  const [isContentScrolled, setIsContentScrolled] = useState(false);

  const scrollableContentRef = useRef<ScrollableContentElement>(null);

  useEffect(() => {
    if (scrollableContentRef.current) {
      let requestedAnimationFrameId: number;
      const scrollableContentElement = scrollableContentRef.current;

      const updateScrollState = () => {
        cancelAnimationFrame(requestedAnimationFrameId);

        requestedAnimationFrameId = requestAnimationFrame(() => {
          setIsContentScrolled(scrollableContentElement.scrollTop > 0);
        });
      };

      scrollableContentElement.addEventListener("scroll", updateScrollState);

      updateScrollState();

      return () => {
        scrollableContentElement.removeEventListener(
          "scroll",
          updateScrollState,
        );

        cancelAnimationFrame(requestedAnimationFrameId);
      };
    }

    return () => {};
  }, []);

  return {
    isContentScrolled,
    scrollableContentRef,
  };
};
