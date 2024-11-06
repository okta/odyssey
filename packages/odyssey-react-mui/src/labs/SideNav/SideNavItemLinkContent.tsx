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
import {
  type DesignTokens,
  useOdysseyDesignTokens,
} from "../../OdysseyDesignTokensContext";
import { Box } from "../../Box";
import { Status } from "../../Status";
import type { SideNavItem } from "./types";
import { Badge } from "../../Badge";

const SideNavItemLabelContainer = styled("div", {
  shouldForwardProp: (prop) =>
    prop !== "odysseyDesignTokens" && prop !== "isIconVisible",
})<{
  odysseyDesignTokens: DesignTokens;
  isIconVisible: boolean;
}>(({ odysseyDesignTokens, isIconVisible }) => ({
  width: "100%",
  display: "flex",
  flexWrap: "wrap",
  alignItems: "center",
  fontSize: odysseyDesignTokens.TypographySizeBody,
  marginInlineStart: isIconVisible ? odysseyDesignTokens.Spacing2 : 0,
}));

const SideNavItemLinkContent = ({
  count,
  label,
  startIcon,
  endIcon,
  severity,
  statusLabel,
}: Pick<
  SideNavItem,
  "count" | "label" | "startIcon" | "endIcon" | "severity" | "statusLabel"
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
        odysseyDesignTokens={odysseyDesignTokens}
        isIconVisible={Boolean(startIcon)}
      >
        {label}
        {!count && severity && (
          <Box sx={sideNavItemContentStyles}>
            {severity && (
              <Status severity={severity} label={statusLabel || ""} />
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
