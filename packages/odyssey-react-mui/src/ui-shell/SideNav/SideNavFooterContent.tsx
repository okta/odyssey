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

import { memo, useMemo } from "react";
import styled from "@emotion/styled";

import {
  useOdysseyDesignTokens,
  DesignTokens,
} from "../../OdysseyDesignTokensContext";
import type { SideNavFooterItem } from "./types";
import { Box } from "../../Box";
import { Link } from "../../Link";
import { useTranslation } from "react-i18next";
import { useUiShellContrastColorContext } from "../../ui-shell/UiShellColorsProvider";
import { ContrastColors } from "../../createContrastColors";

const StyledFooterNav = styled("nav")({
  display: "flex",
});

const StyledFooterItemContainer = styled("div", {
  shouldForwardProp: (prop) =>
    prop !== "odysseyDesignTokens" && prop !== "borderColor",
})(
  ({
    borderColor,
    odysseyDesignTokens,
  }: {
    borderColor: ContrastColors["fontColor"];
    odysseyDesignTokens: DesignTokens;
  }) => ({
    "& + &": {
      marginInlineStart: odysseyDesignTokens.Spacing4,
      paddingInlineStart: odysseyDesignTokens.Spacing4,
      borderInlineStart: `1px solid ${borderColor || odysseyDesignTokens.HueNeutral300}`,
    },
  }),
);

const SideNavFooterContent = ({
  footerItems,
}: {
  footerItems: SideNavFooterItem[];
}) => {
  const odysseyDesignTokens = useOdysseyDesignTokens();
  const { t } = useTranslation();
  const shellColors = useUiShellContrastColorContext();

  const memoizedFooterContent = useMemo(() => {
    return footerItems?.map((item) => (
      <StyledFooterItemContainer
        borderColor={shellColors?.sideNavContrastColors?.fontColor}
        key={item.id}
        odysseyDesignTokens={odysseyDesignTokens}
        role="menuitem"
      >
        {item.href ? (
          <Link href={item.href}>{item.label}</Link>
        ) : (
          <Box component="span">{item.label}</Box>
        )}
      </StyledFooterItemContainer>
    ));
  }, [footerItems, odysseyDesignTokens, shellColors]);

  return (
    <StyledFooterNav role="menubar" aria-label={t("navigation.footer")}>
      {memoizedFooterContent}
    </StyledFooterNav>
  );
};
const MemoizedSideNavFooterContent = memo(SideNavFooterContent);
MemoizedSideNavFooterContent.displayName = "SideNavFooterContent";

export { MemoizedSideNavFooterContent as SideNavFooterContent };
