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
  fontSize: odysseyDesignTokens.TypographyScale0,
  fontWeight: odysseyDesignTokens.TypographyWeightHeading,
  marginLeft: isIconVisible ? odysseyDesignTokens.Spacing2 : 0,
}));

const SideNavItemLinkContent = ({
  label,
  startIcon,
  endIcon,
  severity,
  statusLabel,
  __hasParent,
}: Pick<
  SideNavItem,
  "label" | "startIcon" | "endIcon" | "severity" | "statusLabel" | "__hasParent"
>): ReactNode => {
  const odysseyDesignTokens = useOdysseyDesignTokens();

  const sideNavItemContentStyles = useMemo(
    () => ({
      marginLeft: odysseyDesignTokens.Spacing2,
    }),
    [odysseyDesignTokens],
  );

  return (
    <>
      {!__hasParent && startIcon && startIcon}
      <SideNavItemLabelContainer
        odysseyDesignTokens={odysseyDesignTokens}
        isIconVisible={!__hasParent && Boolean(startIcon)}
      >
        {Boolean(startIcon)}
        {label}
        {severity && (
          <Box sx={sideNavItemContentStyles}>
            <Status severity={severity} label={statusLabel || ""} />
          </Box>
        )}
      </SideNavItemLabelContainer>
      {!__hasParent && endIcon && endIcon}
    </>
  );
};
const MemoizedSideNavItemLinkContent = memo(SideNavItemLinkContent);
MemoizedSideNavItemLinkContent.displayName = "SideNavItemLinkContent";

export { MemoizedSideNavItemLinkContent as SideNavItemLinkContent };
