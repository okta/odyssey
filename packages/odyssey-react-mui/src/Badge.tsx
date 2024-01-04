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

import { CSSProperties, memo, useMemo } from "react";

import {
  useOdysseyDesignTokens,
  DesignTokens,
} from "./OdysseyDesignTokensContext";
import { Box } from "./Box";
import type { AllowedProps } from "./AllowedProps";

export const badgeTypeValues = ["default", "attention", "danger"] as const;

export type BadgeProps = {
  badgeContent: number;
  badgeContentMax?: number;
  type?: (typeof badgeTypeValues)[number];
} & AllowedProps;

const badgeTypeColors = (odysseyTokens: DesignTokens) => ({
  default: {
    background: odysseyTokens.HueNeutral200,
    font: odysseyTokens.TypographyColorBody,
  },
  attention: {
    background: odysseyTokens.PalettePrimaryMain,
    font: odysseyTokens.TypographyColorInverse,
  },
  danger: {
    background: odysseyTokens.PaletteDangerMain,
    font: odysseyTokens.TypographyColorInverse,
  },
});

const Badge = ({
  badgeContent,
  badgeContentMax = 999,
  testId,
  translate,
  type = "default",
}: BadgeProps) => {
  const odysseyDesignTokens = useOdysseyDesignTokens();

  const renderBadge = useMemo(() => {
    const greaterThanZeroContentMax = badgeContentMax > 0 ? badgeContentMax : 1;
    const threeDigitLimitedMax =
      greaterThanZeroContentMax > 999 ? 999 : greaterThanZeroContentMax;
    const isOverContentMax = badgeContent > threeDigitLimitedMax;
    const overContentMaxMessage = `${greaterThanZeroContentMax}+`;
    const formattedContent = isOverContentMax
      ? overContentMaxMessage
      : badgeContent.toString();

    const badgeStyles: CSSProperties = {
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      minWidth: `calc(${odysseyDesignTokens.Spacing4} + ${odysseyDesignTokens.Spacing1})`,
      height: `calc(${odysseyDesignTokens.Spacing4} + ${odysseyDesignTokens.Spacing1})`,
      minHeight: `calc(${odysseyDesignTokens.Spacing4} + ${odysseyDesignTokens.Spacing1})`,
      // 6px horizontal padding per design requirements
      padding: "0 6px",
      backgroundColor: badgeTypeColors(odysseyDesignTokens)[type].background,
      color: badgeTypeColors(odysseyDesignTokens)[type].font,
      borderRadius:
        formattedContent.length > 1
          ? `${odysseyDesignTokens.BorderRadiusOuter}`
          : "50%",
      fontSize: `${odysseyDesignTokens.TypographyScale0}`,
      fontFamily: `${odysseyDesignTokens.TypographyFamilyMono}`,
      fontWeight: `${odysseyDesignTokens.TypographyWeightBodyBold}`,
      lineHeight: 1,
      transitionDuration: `${odysseyDesignTokens.TransitionDurationMain}`,
      transitionProperty: `background-color, color`,
    };

    const hasNotificationCount = badgeContent && badgeContent > 0;

    return hasNotificationCount ? (
      <Box sx={badgeStyles} data-se={testId} translate={translate}>
        {formattedContent}
      </Box>
    ) : null;
  }, [
    badgeContent,
    badgeContentMax,
    odysseyDesignTokens,
    testId,
    translate,
    type,
  ]);

  return renderBadge;
};

const MemoizedBadge = memo(Badge);
MemoizedBadge.displayName = "Badge";

export { MemoizedBadge as Badge };
