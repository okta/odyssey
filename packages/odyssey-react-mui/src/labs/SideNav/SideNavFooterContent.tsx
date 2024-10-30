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
import { useOdysseyDesignTokens } from "../../OdysseyDesignTokensContext";
import type { SideNavFooterItem } from "./types";
import { Box } from "../../Box";
import { Link } from "../../Link";
import { useTranslation } from "react-i18next";

const SideNavFooterContent = ({
  footerItems,
}: {
  footerItems: SideNavFooterItem[];
}) => {
  const odysseyDesignTokens = useOdysseyDesignTokens();
  const { t } = useTranslation();

  const footerContent = useMemo(() => {
    return footerItems?.map((item, index) => (
      <Box
        component="nav"
        role="menubar"
        aria-label={t("navigation.footer")}
        key={`${item.id}-wrapper`}
        sx={{
          display: "flex",
        }}
      >
        {item.href ? (
          <Link key={item.id} href={item.href}>
            {item.label}
          </Link>
        ) : (
          <Box component="span" key={item.id}>
            {item.label}
          </Box>
        )}
        {index < footerItems.length - 1 && (
          <Box
            key={`${item.id}-separator`}
            sx={{
              marginLeft: odysseyDesignTokens.Spacing4,
              marginRight: odysseyDesignTokens.Spacing4,
              color: odysseyDesignTokens.HueNeutral300,
            }}
          >
            |
          </Box>
        )}
      </Box>
    ));
  }, [footerItems, odysseyDesignTokens]);

  return footerContent;
};
const MemoizedSideNavFooterContent = memo(SideNavFooterContent);
MemoizedSideNavFooterContent.displayName = "SideNavFooterContent";

export { MemoizedSideNavFooterContent as SideNavFooterContent };
