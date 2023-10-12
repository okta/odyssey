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
import {
  ReactElement,
  createContext,
  memo,
  useContext,
  useMemo,
  useState,
} from "react";
import { GroupIcon, HomeIcon, UserIcon } from "./icons.generated";
import { Typography } from "./Typography";
import { useTranslation } from "react-i18next";

export type BreadcrumbProps = {
  children?: string;
  href: string;
  icon?: "user" | "group";
};

export type BreadcrumbsProps = {
  children: ReactElement<typeof Breadcrumb>[];
  homeHref?: string;
  maxItemsCount?: number;
};

const BreadcrumbContext = createContext({
  isInsideMenu: false,
  isCurrentPage: false,
});

export const Breadcrumb = ({ children, href, icon }: BreadcrumbProps) => {
  const { isInsideMenu, isCurrentPage } = useContext(BreadcrumbContext);

  const breadcrumbContent = (
    <>
      {icon === "group" ? <GroupIcon /> : icon === "user" ? <UserIcon /> : null}
      {children}
    </>
  );

  if (isInsideMenu) {
    return <MenuItem href={href}>{breadcrumbContent}</MenuItem>;
  }

  if (isCurrentPage) {
    return <Typography>{breadcrumbContent}</Typography>;
  }

  return <ButtonBase href={href}>{breadcrumbContent}</ButtonBase>;
};

const BreadcrumbList = ({
  children,
  homeHref,
  maxItemsCount: maxItemsCountOverride,
}: BreadcrumbsProps) => {
  const maxItemsCount = maxItemsCountOverride ?? children.length;

  const { t } = useTranslation();

  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

  const breadcrumbSections = useMemo(() => {
    let breadcrumbContents;

    if (children.length <= maxItemsCount) {
      breadcrumbContents = {
        beforeMenu: null,
        insideMenu: null,
        remainingBreadcrumbs: children,
      };
    } else {
      const menuStart = Math.floor(maxItemsCount / 2);
      const menuLength = children.length - maxItemsCount;
      breadcrumbContents = {
        beforeMenu: children.slice(0, menuStart),
        insideMenu: children.slice(menuStart, menuStart + menuLength),
        remainingBreadcrumbs: children.slice(menuStart + menuLength),
      };
    }

    return breadcrumbContents;
  }, [children, maxItemsCount]);

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

      {breadcrumbSections.beforeMenu}

      {breadcrumbSections.insideMenu && (
        <>
          <ButtonBase onClick={(ev) => setAnchorEl(ev.currentTarget)}>
            …
          </ButtonBase>
          <Menu
            open={Boolean(anchorEl)}
            onClose={() => setAnchorEl(null)}
            anchorEl={anchorEl}
            anchorOrigin={{ horizontal: "left", vertical: "bottom" }}
            MenuListProps={{
              sx: {
                minWidth: 180,
              },
            }}
          >
            <BreadcrumbContext.Provider
              value={{ isInsideMenu: true, isCurrentPage: false }}
            >
              {breadcrumbSections.insideMenu}
            </BreadcrumbContext.Provider>
          </Menu>
        </>
      )}

      {breadcrumbSections.remainingBreadcrumbs.map((breadcrumb, i) => {
        if (i === breadcrumbSections.remainingBreadcrumbs.length - 1) {
          return (
            <BreadcrumbContext.Provider
              value={{ isInsideMenu: false, isCurrentPage: true }}
            >
              {breadcrumb}
            </BreadcrumbContext.Provider>
          );
        }
        return breadcrumb;
      })}
    </MuiBreadcrumbs>
  );
};

const MemoizedBreadcrumbList = memo(BreadcrumbList);
MemoizedBreadcrumbList.displayName = "BreadcrumbList";

export { MemoizedBreadcrumbList as BreadcrumbList };
