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

import {
  ButtonBase,
  Menu,
  MenuItem,
  Breadcrumbs as MuiBreadcrumbs,
} from "@mui/material";
import { ReactElement, createContext, memo, useContext, useState } from "react";
import { GroupIcon, HomeIcon, UserIcon } from "./icons.generated";
import { Typography } from "./Typography";
import { useTranslation } from "react-i18next";

export type BreadcrumbProps = {
  children?: string;
  href: string;
  isCurrent?: boolean;
  startIcon?: null | ReactElement<typeof UserIcon | typeof GroupIcon>;
};

export type BreadcrumbsProps = {
  children: ReactElement<typeof Breadcrumb>[];
  homeHref?: string;
  maxItemsCount?: number;
};

const BreadcrumbContext = createContext(false);

export const Breadcrumb = ({
  children,
  href,
  isCurrent,
  startIcon,
}: BreadcrumbProps) => {
  const isInsideMenu = useContext(BreadcrumbContext);

  const breadcrumbContent = (
    <>
      {startIcon}
      {children}
    </>
  );

  if (isInsideMenu) {
    return <MenuItem href={href}>{breadcrumbContent}</MenuItem>;
  }

  if (isCurrent) {
    return <Typography>{breadcrumbContent}</Typography>;
  }

  return <ButtonBase href={href}>{breadcrumbContent}</ButtonBase>;
};

const BreadcrumbList = ({
  children,
  homeHref,
  maxItemsCount = children.length,
}: BreadcrumbsProps) => {
  const { t } = useTranslation();

  const [isExpanded, setIsExpanded] = useState<boolean>(false);
  const [anchor, setAnchor] = useState<HTMLElement | null>(null);

  const handleExpansionClick = (ev: React.MouseEvent<HTMLElement>) => {
    setIsExpanded(!isExpanded);
    setAnchor(ev.currentTarget);
  };

  const childrenCount = children.length;

  const calculateSegments = () => {
    if (childrenCount <= maxItemsCount) {
      return [children, [], []];
    }

    const middleStart = Math.floor(maxItemsCount / 2);
    const middleCount = childrenCount - maxItemsCount;
    const leftSegment = children.slice(0, middleStart);
    const middleSegment = children.slice(
      middleStart,
      middleStart + middleCount
    );
    const rightSegment = children.slice(middleStart + middleCount);

    return [leftSegment, middleSegment, rightSegment];
  };

  const [leftSegment, middleSegment, rightSegment] = calculateSegments();

  return (
    <MuiBreadcrumbs
      maxItems={children.length + 1}
      aria-label={t("breadcrumbs.label.text")}
    >
      {homeHref && (
        <ButtonBase href={homeHref} aria-label="Home">
          <HomeIcon />
        </ButtonBase>
      )}
      {leftSegment}
      {middleSegment.length > 0 && (
        <>
          <ButtonBase onClick={handleExpansionClick}>…</ButtonBase>
          <Menu
            open={isExpanded}
            onClose={() => setIsExpanded(false)}
            anchorEl={anchor}
            anchorOrigin={{ horizontal: "left", vertical: "bottom" }}
            MenuListProps={{
              sx: {
                minWidth: 180,
              },
            }}
          >
            <BreadcrumbContext.Provider value={true}>
              {middleSegment}
            </BreadcrumbContext.Provider>
          </Menu>
        </>
      )}
      {rightSegment}
    </MuiBreadcrumbs>
  );
};

const MemoizedBreadcrumbList = memo(BreadcrumbList);
MemoizedBreadcrumbList.displayName = "BreadcrumbList";

export { MemoizedBreadcrumbList as BreadcrumbList };
