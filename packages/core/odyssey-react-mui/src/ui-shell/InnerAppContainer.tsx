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

import styled from "@emotion/styled";
import { memo } from "react";

import { UI_SHELL_BASE_Z_INDEX } from "./uiShellSharedConstants.js";

// Shared styles for fake inset shadow. Not rendered anywhere.
const StyledAppContainerShadowShared = styled("div")({
  left: 0,
  pointerEvents: "none",
  position: "absolute",
  top: 0,
  width: "100%",
  zIndex: UI_SHELL_BASE_Z_INDEX,
});

export const StyledAppContainerShadow1 = styled(StyledAppContainerShadowShared)(
  {
    background: `linear-gradient(
      to bottom,
      rgba(39, 39, 39, 0.08) 0%,
      transparent 100%
    )`,
    height: "4px",
  },
);

export const StyledAppContainerShadow2 = styled(StyledAppContainerShadowShared)(
  {
    background: `linear-gradient(
      to bottom,
      rgba(39, 39, 39, 0.01) 0%,
      transparent 100%
    )`,
    height: "6px",
  },
);

export const StyledAppContainerShadow3 = styled(StyledAppContainerShadowShared)(
  {
    background: `linear-gradient(
      to bottom,
      rgba(39, 39, 39, 0.05) 0%,
      transparent 100%
    )`,
    height: "15px",
  },
);

export type InnerAppContainerProps = {
  isContentScrolled: boolean;
};

const InnerAppContainer = ({ isContentScrolled }: InnerAppContainerProps) =>
  isContentScrolled ? (
    <>
      <StyledAppContainerShadow1 />
      <StyledAppContainerShadow2 />
      <StyledAppContainerShadow3 />
    </>
  ) : null;

const MemoizedInnerAppContainer = memo(InnerAppContainer);
MemoizedInnerAppContainer.displayName = "InnerAppContainer";

export { MemoizedInnerAppContainer as InnerAppContainer };
