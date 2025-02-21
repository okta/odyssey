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
  MouseEventHandler,
  ReactElement,
  createContext,
  memo,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";
import { GroupIcon, HomeIcon, UserIcon } from "./icons.generated/index.js";
import { Subordinate } from "./Typography.js";
import { useTranslation } from "react-i18next";
import { HtmlProps } from "./HtmlProps.js";
import styled from "@emotion/styled";

export type BreadcrumbType = "listItem" | "menuItem" | "currentPage";

export type BreadcrumbProps = {
  children?: string;
  href?: string;
  iconName?: "user" | "group";
  onClick?: MouseEventHandler;
};

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

const BreadcrumbContent = styled.span`
  white-space: nowrap;
  overflow: hidden;
  max-width: 10rem;
  text-overflow: ellipsis;
`;

export const Breadcrumb = ({
  children,
  href,
  iconName,
  onClick,
}: BreadcrumbProps) => {
  const { breadcrumbType } = useContext(BreadcrumbContext);

  const onClickHandler = useCallback<MouseEventHandler<HTMLAnchorElement>>(
    (event) => {
      if (onClick) {
        event.preventDefault();
        event.stopPropagation();
        onClick(event);
      }
    },
    [onClick],
  );

  const breadcrumbContent = (
    <>
      {iconName === "group" ? (
        <GroupIcon />
      ) : iconName === "user" ? (
        <UserIcon />
      ) : null}
      <BreadcrumbContent>{children}</BreadcrumbContent>
    </>
  );

  if (!href) {
    return <Subordinate color="textPrimary">{breadcrumbContent}</Subordinate>;
  }

  if (breadcrumbType === "menuItem") {
    return (
      <MenuItem onClick={onClickHandler} href={href}>
        {breadcrumbContent}
      </MenuItem>
    );
  }

  if (breadcrumbType === "currentPage") {
    return (
      <Subordinate ariaCurrent="page" color="textPrimary">
        {breadcrumbContent}
      </Subordinate>
    );
  }

  // breadcrumbType === "listItem" is the default
  // Provided here without a conditional to get TS to be quiet
  // about potential undefined returns
  return (
    <ButtonBase onClick={onClickHandler} href={href}>
      {breadcrumbContent}
    </ButtonBase>
  );
};

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
        <BreadcrumbContext.Provider
          key={index}
          value={breadcrumbProviderValue.listItem}
        >
          {breadcrumb}
        </BreadcrumbContext.Provider>
      ))}

      {breadcrumbSections.insideMenu.length > 0 && (
        <>
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
        </>
      )}

      {breadcrumbSections.remainingBreadcrumbs.map((breadcrumb, index) => {
        if (index === breadcrumbSections.remainingBreadcrumbs.length - 1) {
          return (
            <BreadcrumbContext.Provider
              key={index}
              value={breadcrumbProviderValue.currentPage}
            >
              {breadcrumb}
            </BreadcrumbContext.Provider>
          );
        }
        return (
          <BreadcrumbContext.Provider
            key={index}
            value={breadcrumbProviderValue.listItem}
          >
            {breadcrumb}
          </BreadcrumbContext.Provider>
        );
      })}
    </MuiBreadcrumbs>
  );
};

const MemoizedBreadcrumbList = memo(BreadcrumbList);
MemoizedBreadcrumbList.displayName = "BreadcrumbList";

export { MemoizedBreadcrumbList as BreadcrumbList };
