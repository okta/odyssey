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

import styled from "@emotion/styled";
import { memo, ReactNode, useMemo } from "react";

import type { SideNavItem } from "./types.js";

import { Badge } from "../../Badge.js";
import { Box } from "../../Box.js";
import {
  type DesignTokens,
  useOdysseyDesignTokens,
} from "../../OdysseyDesignTokensContext.js";
import { Status } from "../../Status.js";

const SideNavItemLabelContainer = styled("div", {
  shouldForwardProp: (prop) =>
    prop !== "odysseyDesignTokens" && prop !== "isIconVisible",
})<{
  isIconVisible: boolean;
  odysseyDesignTokens: DesignTokens;
}>(({ odysseyDesignTokens, isIconVisible }) => ({
  width: "100%",
  marginInlineStart: isIconVisible ? odysseyDesignTokens.Spacing3 : 0,
  alignItems: "center",
  display: "flex",
  fontSize: odysseyDesignTokens.TypographySizeBody,
  overflowWrap: "anywhere", // New way to do `wordBreak: "break-word"`. Source: https://developer.mozilla.org/en-US/docs/Web/CSS/word-break#break-word
}));

const SideNavItemLinkContent = ({
  count,
  label,
  startIcon,
  endIcon,
  severity,
  statusLabel,
  translate,
}: Pick<
  SideNavItem,
  | "count"
  | "label"
  | "startIcon"
  | "endIcon"
  | "severity"
  | "statusLabel"
  | "translate"
>): ReactNode => {
  const odysseyDesignTokens = useOdysseyDesignTokens();

  const sideNavItemContentStyles = useMemo(
    () => ({
      alignItems: "center",
      display: "flex",
      gap: odysseyDesignTokens.Spacing1,
      marginInlineStart: odysseyDesignTokens.Spacing2,
    }),
    [odysseyDesignTokens],
  );

  return (
    <>
      {startIcon && startIcon}
      <SideNavItemLabelContainer
        isIconVisible={Boolean(startIcon)}
        odysseyDesignTokens={odysseyDesignTokens}
        translate={translate}
      >
        {label}
        {!count && severity && (
          <Box sx={sideNavItemContentStyles}>
            {severity && (
              <Status label={statusLabel || ""} severity={severity} />
            )}
          </Box>
        )}
        {!severity && count && (
          <Box sx={sideNavItemContentStyles}>
            {count && <Badge badgeContent={count} />}
          </Box>
        )}
      </SideNavItemLabelContainer>
      {endIcon && endIcon}
    </>
  );
};
const MemoizedSideNavItemLinkContent = memo(SideNavItemLinkContent);
MemoizedSideNavItemLinkContent.displayName = "SideNavItemLinkContent";

export { MemoizedSideNavItemLinkContent as SideNavItemLinkContent };
