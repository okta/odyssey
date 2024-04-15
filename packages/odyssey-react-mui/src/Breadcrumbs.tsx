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
  createContext,
  memo,
  MouseEventHandler,
  ReactElement,
  useCallback,
  useMemo,
  useState,
} from "react";
import { Breadcrumbs as MuiBreadcrumbs, ButtonBase, Menu } from "@mui/material";
import { useTranslation } from "react-i18next";

import { Breadcrumb } from "./BreadCrumb";
import { HomeIcon } from "./icons.generated";
import { HtmlProps } from "./HtmlProps";

export type BreadcrumbType = "listItem" | "menuItem" | "currentPage";

export type BreadcrumbsProps = {
  children: ReactElement<typeof Breadcrumb>[];
  homeHref?: string;
  maxVisibleItems?: number;
} & Pick<HtmlProps, "testId" | "translate">;

export type BreadcrumbContextType = {
  breadcrumbType: BreadcrumbType;
};

export const BreadcrumbContext = createContext<BreadcrumbContextType>({
  breadcrumbType: "listItem",
});

const breadcrumbProviderValue: Record<
  BreadcrumbType,
  { breadcrumbType: BreadcrumbType }
> = {
  currentPage: {
    breadcrumbType: "currentPage",
  },
  listItem: {
    breadcrumbType: "listItem",
  },
  menuItem: {
    breadcrumbType: "menuItem",
  },
};

const defaultTruncationValue = 5;

const BreadcrumbList = ({
  children,
  homeHref,
  maxVisibleItems: maxVisibleItemsProp = defaultTruncationValue,
  testId,
  translate,
}: BreadcrumbsProps) => {
  const { t } = useTranslation();

  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

  const maxVisibleItems = useMemo(
    () => Math.min(Math.max(maxVisibleItemsProp, 0), children.length),
    [maxVisibleItemsProp, children],
  );

  const breadcrumbSections = useMemo(() => {
    if (children.length <= maxVisibleItems) {
      return {
        beforeMenu: [],
        insideMenu: [],
        remainingBreadcrumbs: children,
      };
    } else {
      const menuStart = Math.floor(maxVisibleItems / 2);
      const menuLength = children.length - maxVisibleItems;

      return {
        beforeMenu: children.slice(0, menuStart),
        insideMenu: children.slice(menuStart, menuStart + menuLength),
        remainingBreadcrumbs: children.slice(menuStart + menuLength),
      };
    }
  }, [children, maxVisibleItems]);

  const onMenuButtonClick = useCallback<MouseEventHandler<HTMLButtonElement>>(
    (event) => setAnchorEl(event.currentTarget),
    [],
  );
  const onCloseMenu = useCallback(() => {
    setAnchorEl(null);
  }, []);

  return (
    <MuiBreadcrumbs
      maxItems={children.length + 1}
      aria-label={t("breadcrumbs.label.text")}
      data-se={testId}
      translate={translate}
    >
      {homeHref && (
        <ButtonBase href={homeHref} aria-label={t("breadcrumbs.home.text")}>
          <HomeIcon />
        </ButtonBase>
      )}

      {breadcrumbSections.beforeMenu.map((breadcrumb, index) => (
        <span key={`beforeMenu-${index}`}>
          <BreadcrumbContext.Provider value={breadcrumbProviderValue.listItem}>
            {breadcrumb}
          </BreadcrumbContext.Provider>
        </span>
      ))}

      {breadcrumbSections.insideMenu.length > 0 && (
        <span>
          <ButtonBase onClick={onMenuButtonClick}>...</ButtonBase>
          <Menu
            open={Boolean(anchorEl)}
            onClose={onCloseMenu}
            anchorEl={anchorEl}
            anchorOrigin={{ horizontal: "left", vertical: "bottom" }}
            MenuListProps={{
              sx: {
                minWidth: 180,
              },
            }}
          >
            <BreadcrumbContext.Provider
              value={breadcrumbProviderValue.menuItem}
            >
              {breadcrumbSections.insideMenu}
            </BreadcrumbContext.Provider>
          </Menu>
        </span>
      )}

      {breadcrumbSections.remainingBreadcrumbs.map((breadcrumb, index) => {
        const contextValue =
          index === breadcrumbSections.remainingBreadcrumbs.length - 1
            ? breadcrumbProviderValue.currentPage
            : breadcrumbProviderValue.listItem;

        return (
          <span key={`remainingBreadcrumbs-${index}`}>
            <BreadcrumbContext.Provider value={contextValue}>
              {breadcrumb}
            </BreadcrumbContext.Provider>
          </span>
        );
      })}
    </MuiBreadcrumbs>
  );
};

const MemoizedBreadcrumbList = memo(BreadcrumbList);
MemoizedBreadcrumbList.displayName = "BreadcrumbList";

export { MemoizedBreadcrumbList as BreadcrumbList };
