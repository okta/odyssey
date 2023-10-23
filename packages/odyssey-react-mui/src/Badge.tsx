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

import { ReactNode, memo } from "react";
import { Badge as MuiBadge, BadgeProps as MuiBadgeProps } from "@mui/material";
import type { SeleniumProps } from "./SeleniumProps";

export const badgeTypeValues = ["default", "primary", "error"] as const;
export const badgeVariantValues = ["dot", "standard"] as const;

export type BadgeProps = {
  children?: ReactNode;
  badgeContent?: number;
  max?: MuiBadgeProps["max"];
  variant?: (typeof badgeVariantValues)[number];
  type?: (typeof badgeTypeValues)[number];
} & SeleniumProps;

const Badge = ({
  children,
  badgeContent,
  max = 999,
  variant = "standard",
  type = "default",
}: BadgeProps) => {
  const threeDigitLimitedMax = max > 999 ? 999 : max;

  return (
    <MuiBadge
      badgeContent={badgeContent}
      max={threeDigitLimitedMax}
      color={type}
      variant={variant}
    >
      {children}
    </MuiBadge>
  );
};

const MemoizedBadge = memo(Badge);
MemoizedBadge.displayName = "Badge";

export { MemoizedBadge as Badge };
