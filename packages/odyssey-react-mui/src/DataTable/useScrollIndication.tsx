/*!
 * Copyright (c) 2023-present, Okta, Inc. and/or its affiliates. All rights reserved.
 * The Okta software accompanied by this notice is provided pursuant to the Apache License, Version 2.0 (the "License.")
 *
 * You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0.
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *
 * See the License for the specific language governing permissions and limitations under the License.
 */

import { Dispatch, SetStateAction } from "react";

export const useScrollIndication = () => {
  let animationFrameId: number | null = null; // Variable to hold the animation frame ID

  const onTableContainerScroll = ({
    tableOuterContainer,
    tableInnerContainer,
    setIsTableContainerScrolledToStart,
    setIsTableContainerScrolledToEnd,
  }: {
    tableOuterContainer: HTMLDivElement | null;
    tableInnerContainer: HTMLDivElement | null;
    setIsTableContainerScrolledToStart: Dispatch<SetStateAction<boolean>>;
    setIsTableContainerScrolledToEnd: Dispatch<SetStateAction<boolean>>;
  }) => {
    if (!tableOuterContainer || !tableInnerContainer) return;
    if (!animationFrameId) {
      const containerWidth = tableOuterContainer.clientWidth;
      const contentWidth = tableInnerContainer.scrollWidth;

      const containerStartScrollPosition = tableInnerContainer.scrollLeft;
      const containerEndScrollPosition =
        containerStartScrollPosition + containerWidth;

      setIsTableContainerScrolledToStart(containerStartScrollPosition <= 16);
      setIsTableContainerScrolledToEnd(
        containerEndScrollPosition >= contentWidth - 16,
      );

      animationFrameId = requestAnimationFrame(() => {
        animationFrameId = null; // Clear the animation frame ID after execution
      });
    }
  };

  const setupInitialScrollState = (
    tableInnerContainer: HTMLDivElement | null,
  ) => {
    tableInnerContainer?.dispatchEvent(new CustomEvent("scroll"));
  };

  return {
    onTableContainerScroll,
    setupInitialScrollState,
  };
};
