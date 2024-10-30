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
import { memo, ReactNode } from "react";
import {
  type DesignTokens,
  useOdysseyDesignTokens,
} from "../../OdysseyDesignTokensContext";
import { Box } from "../../Box";
import { Heading6 } from "../../Typography";
import type { SideNavProps } from "./types";
// import { TOP_NAV_HEIGHT_TOKEN } from "../TopNav";
import { Skeleton } from "@mui/material";

const SideNavLogoContainer = styled("div", {
  shouldForwardProp: (prop) => prop !== "odysseyDesignTokens",
})(({ odysseyDesignTokens }: { odysseyDesignTokens: DesignTokens }) => ({
  paddingInline: odysseyDesignTokens.Spacing5,
  paddingBlock: odysseyDesignTokens.Spacing4,
}));

const SideNavHeaderContainer = styled("div", {
  shouldForwardProp: (prop) => prop !== "odysseyDesignTokens",
})(({ odysseyDesignTokens }: { odysseyDesignTokens: DesignTokens }) => ({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  paddingInline: odysseyDesignTokens.Spacing5,
  paddingBlock: odysseyDesignTokens.Spacing4,

  h2: {
    margin: 0,
  },
}));

const SideNavHeader = ({
  isLoading,
  logo,
  navHeaderText,
}: Pick<SideNavProps, "isLoading" | "logo" | "navHeaderText">): ReactNode => {
  const odysseyDesignTokens = useOdysseyDesignTokens();

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
      }}
    >
      <SideNavLogoContainer odysseyDesignTokens={odysseyDesignTokens}>
        {/* The skeleton takes the hardcoded dimensions of the Okta logo */}
        {isLoading ? (
          <Skeleton variant="rounded" height={24} width={67} />
        ) : (
          logo
        )}
      </SideNavLogoContainer>
      <SideNavHeaderContainer odysseyDesignTokens={odysseyDesignTokens}>
        <Heading6 component="h2">
          {isLoading ? <Skeleton width="50%" /> : navHeaderText}
        </Heading6>
      </SideNavHeaderContainer>
    </Box>
  );
};
const MemoizedSideNavHeader = memo(SideNavHeader);
MemoizedSideNavHeader.displayName = "SideNavHeader";

export { MemoizedSideNavHeader as SideNavHeader };
