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
import { Heading6 } from "../../Typography";
import type { SideNavProps } from "./types";
import { TOP_NAV_HEIGHT_TOKEN } from "../TopNav";

const SideNavLogoContainer = styled("div", {
  shouldForwardProp: (prop) => prop !== "odysseyDesignTokens",
})(({ odysseyDesignTokens }: { odysseyDesignTokens: DesignTokens }) => ({
  height: odysseyDesignTokens[TOP_NAV_HEIGHT_TOKEN],
  padding: odysseyDesignTokens.Spacing3,
  borderColor: odysseyDesignTokens.HueNeutral50,
  borderStyle: odysseyDesignTokens.BorderStyleMain,
  borderWidth: 0,
  borderBottomWidth: odysseyDesignTokens.BorderWidthMain,
}));

const SideNavHeaderContainer = styled("div", {
  shouldForwardProp: (prop) => prop !== "odysseyDesignTokens",
})(({ odysseyDesignTokens }: { odysseyDesignTokens: DesignTokens }) => ({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  paddingLeft: odysseyDesignTokens.Spacing4,
  paddingRight: odysseyDesignTokens.Spacing4,
  paddingTop: odysseyDesignTokens.Spacing3,
  paddingBottom: odysseyDesignTokens.Spacing3,
}));

const SideNavHeader = ({
  navHeaderText,
  logo,
}: Pick<
  SideNavProps,
  "navHeaderText" | "isCollapsible" | "onCollapse" | "logo"
>): ReactNode => {
  const odysseyDesignTokens = useOdysseyDesignTokens();

  const sideNavHeaderStyles = useMemo(
    () => ({
      marginTop: odysseyDesignTokens.Spacing2,
    }),
    [odysseyDesignTokens],
  );

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
      }}
    >
      <SideNavLogoContainer odysseyDesignTokens={odysseyDesignTokens}>
        {logo}
      </SideNavLogoContainer>
      <SideNavHeaderContainer odysseyDesignTokens={odysseyDesignTokens}>
        <Box sx={sideNavHeaderStyles}>
          <Heading6>{navHeaderText}</Heading6>
        </Box>
      </SideNavHeaderContainer>
    </Box>
  );
};
const MemoizedSideNavHeader = memo(SideNavHeader);
MemoizedSideNavHeader.displayName = "SideNavHeader";

export { MemoizedSideNavHeader as SideNavHeader };
