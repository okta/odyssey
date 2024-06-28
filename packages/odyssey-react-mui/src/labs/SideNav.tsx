/*!
 * Copyright (c) 2022-present, Okta, Inc. and/or its affiliates. All rights reserved.
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
  memo,
  useMemo,
  useState,
  MouseEvent,
  ReactElement,
  ReactNode,
} from "react";

import {
  DesignTokens,
  useOdysseyDesignTokens,
} from "../OdysseyDesignTokensContext";

import { NavAccordion } from "./NavAccordion";

import { Status, statusSeverityValues } from "../Status";

import { Box } from "../Box";
import type { HtmlProps } from "../HtmlProps";
import styled from "@emotion/styled";
import { Heading6 } from "../Typography";
import { CollapseLeftIcon, ExpandLeftIcon } from "../icons.generated";
import { Link } from "../Link";

export type SideNavItem = {
  id: string;
  label: string;
  target?: string;
  /**
   * The icon element to display at the start of the Nav Item
   */
  startIcon?: ReactElement;
  /**
   * The status element to display after the label
   */
  severity?: (typeof statusSeverityValues)[number];
  /**
   * The label to display inside the status
   */
  statusLabel?: string;
  /**
   * The icon element to display at the end of the Nav Item
   */
  endIcon?: ReactElement;
  /**
   * Whether the item is expanded by default
   */
  isDefaultExpanded?: boolean;
  /**
   * Whether the item is expanded
   */
  isExpanded?: boolean;
  /**
   * Whether the item is disabled
   */
  isDisabled?: boolean;
  /**
   * Whether the item is active/selected
   */
  isSelected?: boolean;
  /**
   * Event fired when the nav item is clicked
   */
  onClick?(event: MouseEvent<HTMLAnchorElement>): void;
} & (
  | {
      /**
       * Determines if the side nav item is a section header
       */
      isSectionHeader: true;
      href?: never;
      children?: never;
    }
  | {
      isSectionHeader?: false;
      href: string;
      /**
       * An array of side nav items
       */
      children?: SideNavItem[];
    }
);

export type SideNavFooterItem = {
  id: string;
  label: string;
  href: string;
};

const SideNavCollapsedContainer = styled("div", {
  shouldForwardProp: (prop) =>
    prop !== "odysseyDesignTokens" && prop !== "sideNavCollapsed",
})(
  ({
    odysseyDesignTokens,
    sideNavCollapsed,
  }: {
    odysseyDesignTokens: DesignTokens;
    sideNavCollapsed: boolean;
  }) => ({
    backgroundColor: odysseyDesignTokens.HueNeutral300,
    paddingTop: odysseyDesignTokens.Spacing5,
    cursor: "pointer",
    width: sideNavCollapsed ? "auto" : 0,
    visibility: sideNavCollapsed ? "visible" : "hidden",
  }),
);

const SideNavContainer = styled("div", {
  shouldForwardProp: (prop) =>
    prop !== "odysseyDesignTokens" && prop !== "sideNavCollapsed",
})(
  ({
    odysseyDesignTokens,
    sideNavCollapsed,
  }: {
    odysseyDesignTokens: DesignTokens;
    sideNavCollapsed: boolean;
  }) => ({
    backgroundColor: odysseyDesignTokens.HueNeutralWhite,
    flexDirection: "column",
    display: "flex",
    visibility: sideNavCollapsed ? "hidden" : "visible",
    width: sideNavCollapsed ? "0" : "100%",
    transitionProperty: "width, visibility",
    transitionDuration: odysseyDesignTokens.TransitionDurationMain,
    transitionTimingFunction: odysseyDesignTokens.TransitionTimingMain,
  }),
);

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

const CollapseIcon = ({ onClick }: { onClick?(): void }): ReactElement => {
  const odysseyDesignTokens = useOdysseyDesignTokens();
  return (
    <div
      tabIndex={0}
      role="button"
      onClick={onClick}
      onKeyDown={(event) => {
        event.key === "Enter" && onClick && onClick();
      }}
    >
      <Box
        component="a"
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          width: "32px",
          height: "32px",
          border: `${odysseyDesignTokens.BorderWidthMain} ${odysseyDesignTokens.BorderStyleMain} ${odysseyDesignTokens.HueNeutral300}`,
          borderRadius: odysseyDesignTokens.BorderRadiusTight,
          cursor: "pointer",
          padding: odysseyDesignTokens.Spacing1,
          "&:hover": {
            backgroundColor: odysseyDesignTokens.HueNeutral50,
          },
        }}
      >
        <CollapseLeftIcon
          onClick={onClick}
          onKeyDown={onClick}
          sx={{
            height: "16px",
            width: "16px",
            alignSelf: "center",
            color: odysseyDesignTokens.HueNeutral400,
          }}
        />
      </Box>
    </div>
  );
};

const SideNavHeader = ({
  navHeaderText,
  isCollapsible,
  onCollapse,
}: Pick<
  SideNavProps,
  "navHeaderText" | "isCollapsible" | "onCollapse"
>): ReactNode => {
  const odysseyDesignTokens = useOdysseyDesignTokens();
  return (
    <SideNavHeaderContainer odysseyDesignTokens={odysseyDesignTokens}>
      <Box
        sx={{
          marginTop: odysseyDesignTokens.Spacing2,
        }}
      >
        <Heading6>{navHeaderText}</Heading6>
      </Box>
      {isCollapsible && <CollapseIcon onClick={onCollapse} />}
    </SideNavHeaderContainer>
  );
};

const SideNavListContainer = styled.ul({
  padding: 0,
  listStyle: "none",
  listStyleType: "none",
});

const SectionHeader = styled("li", {
  shouldForwardProp: (prop) => prop !== "odysseyDesignTokens",
})(({ odysseyDesignTokens }: { odysseyDesignTokens: DesignTokens }) => ({
  fontSize: odysseyDesignTokens.TypographySizeOverline,
  fontWeight: odysseyDesignTokens.TypographyWeightHeadingBold,
  color: odysseyDesignTokens.HueNeutral600,
  paddingTop: odysseyDesignTokens.Spacing3,
  paddingBottom: odysseyDesignTokens.Spacing3,
  paddingLeft: odysseyDesignTokens.Spacing4,
  textTransform: "uppercase",
}));

const SideNavItemLabelContainer = styled("div", {
  shouldForwardProp: (prop) =>
    prop !== "odysseyDesignTokens" &&
    prop !== "isIconVisible" &&
    prop !== "isDisabled",
})<{
  odysseyDesignTokens: DesignTokens;
  isIconVisible: boolean;
  isDisabled?: boolean;
}>(({ odysseyDesignTokens, isIconVisible, isDisabled }) => ({
  width: "100%",
  display: "flex",
  flexWrap: "wrap",
  alignItems: "center",
  fontSize: odysseyDesignTokens.TypographyScale0,
  fontWeight: odysseyDesignTokens.TypographyWeightHeading,
  marginLeft: isIconVisible ? odysseyDesignTokens.Spacing3 : 0,
  "& > a": {
    color: `${odysseyDesignTokens.TypographyColorHeading} !important`,
    pointerEvents: isDisabled ? "none" : "auto",
  },
  "& > a:hover": {
    textDecoration: "none",
    cursor: isDisabled ? "default" : "pointer",
  },
  "& > a:visited": {
    color: odysseyDesignTokens.TypographyColorHeading,
    fontSize: odysseyDesignTokens.TypographyScale0,
  },
}));

const SideNavListItemContainer = styled("li", {
  shouldForwardProp: (prop) =>
    prop !== "odysseyDesignTokens" &&
    prop !== "isSelected" &&
    prop !== "isDisabled",
})<{
  odysseyDesignTokens: DesignTokens;
  isSelected?: boolean;
  disabled?: boolean;
  isDisabled?: boolean;
}>(({ odysseyDesignTokens, isSelected, isDisabled }) => ({
  display: "flex",
  alignItems: "center",
  minHeight: "48px",
  opacity: isDisabled ? "0.38" : "1",
  cursor: isDisabled ? "default" : "pointer",
  pointerEvents: isDisabled ? "none" : "auto",
  backgroundColor: isSelected ? odysseyDesignTokens.HueNeutral50 : "auto",
  "&:hover": {
    backgroundColor: !isDisabled ? odysseyDesignTokens.HueNeutral50 : "auto",
  },
  "&:last-child": {
    marginBottom: odysseyDesignTokens.Spacing2,
  },
  "& > a": {
    display: "flex",
    alignItems: "center",
    width: "100%",
    paddingRight: odysseyDesignTokens.Spacing4,
    paddingLeft: odysseyDesignTokens.Spacing4,
    color: `${odysseyDesignTokens.TypographyColorHeading} !important`,
    pointerEvents: isDisabled ? "none" : "auto",
  },
  "& > a:hover": {
    textDecoration: "none",
    cursor: isDisabled ? "default" : "pointer",
  },
  "& > a:visited": {
    color: odysseyDesignTokens.TypographyColorHeading,
    fontSize: odysseyDesignTokens.TypographyScale0,
  },
}));

const SideNavFooterContainer = styled("div", {
  shouldForwardProp: (prop) => prop !== "odysseyDesignTokens",
})(({ odysseyDesignTokens }: { odysseyDesignTokens: DesignTokens }) => ({
  paddingTop: odysseyDesignTokens.Spacing2,
  paddingBottom: odysseyDesignTokens.Spacing2,
  display: "flex",
  justifyContent: "center",
  flexWrap: "wrap",
  alignItems: "center",
  fontSize: odysseyDesignTokens.TypographySizeOverline,
  "& > a": {
    color: `${odysseyDesignTokens.TypographyColorHeading} !important`,
  },
  "& > a:hover": {
    textDecoration: "none",
  },
  "& > a:visited": {
    color: odysseyDesignTokens.TypographyColorHeading,
  },
  "& > a:not(:last-child)::after": {
    marginLeft: odysseyDesignTokens.Spacing4,
    marginRight: odysseyDesignTokens.Spacing4,
    color: odysseyDesignTokens.HueNeutral300,
    content: '" | "',
  },
}));

const SideNavFooter = ({ id, label, href }: SideNavFooterItem) => {
  return (
    <Link key={id} href={href}>
      {label}
    </Link>
  );
};

const SideNavItemContent = ({
  id,
  label,
  href,
  target,
  startIcon,
  severity,
  statusLabel,
  endIcon,
  onClick,
  isSelected,
  isDisabled,
}: Pick<
  SideNavItem,
  | "id"
  | "label"
  | "href"
  | "target"
  | "startIcon"
  | "severity"
  | "statusLabel"
  | "endIcon"
  | "onClick"
  | "isSelected"
  | "isDisabled"
>) => {
  const odysseyDesignTokens = useOdysseyDesignTokens();
  return (
    <SideNavListItemContainer
      id={id}
      key={id}
      disabled={isDisabled}
      isDisabled={isDisabled}
      isSelected={isSelected}
      odysseyDesignTokens={odysseyDesignTokens}
    >
      <Link href={href || ""} target={target} onClick={onClick}>
        {startIcon && startIcon}
        <SideNavItemLabelContainer
          odysseyDesignTokens={odysseyDesignTokens}
          isIconVisible={!!startIcon}
          isDisabled={isDisabled}
        >
          {label}
          {severity && (
            <Box
              sx={{
                marginLeft: odysseyDesignTokens.Spacing2,
              }}
            >
              <Status severity={severity} label={statusLabel || ""} />
            </Box>
          )}
        </SideNavItemLabelContainer>
        {endIcon && endIcon}
      </Link>
    </SideNavListItemContainer>
  );
};

export type SideNavProps = {
  /**
   * Side Nav header text that is usually reserved to show the App name
   */
  navHeaderText: string;
  /**
   *  Determines whether the side nav is collapsible
   */
  isCollapsible?: boolean;
  /**
   *  Triggers when the side nav is collapsed
   */
  onCollapse?(): void;
  /**
   * Nav items in the side nav
   */
  sideNavItems: SideNavItem[];
  /**
   * Footer items in the side nav
   */
  footerItems?: SideNavFooterItem[];
} & Pick<HtmlProps, "testId">;

const SideNav = ({
  navHeaderText,
  isCollapsible,
  onCollapse,
  sideNavItems,
  footerItems,
}: SideNavProps) => {
  const [sideNavCollapsed, setSideNavCollapsed] = useState(false);
  const odysseyDesignTokens = useOdysseyDesignTokens();

  const processedSideNavItems = useMemo(
    () =>
      sideNavItems.map((item) => ({
        ...item,
        children: item.children?.map((childProps) => (
          <SideNavItemContent key={childProps.id} {...childProps} />
        )),
      })),
    [sideNavItems],
  );
  return (
    <Box
      sx={{
        display: "flex",
        height: "100vh",
      }}
    >
      <SideNavCollapsedContainer
        tabIndex={0}
        odysseyDesignTokens={odysseyDesignTokens}
        sideNavCollapsed={sideNavCollapsed}
        onClick={() => setSideNavCollapsed(!sideNavCollapsed)}
        onKeyDown={(event) => {
          event.key === "Enter" && setSideNavCollapsed(!sideNavCollapsed);
        }}
      >
        <ExpandLeftIcon
          sx={{
            margin: `0 ${odysseyDesignTokens.Spacing1}`,
          }}
        ></ExpandLeftIcon>
      </SideNavCollapsedContainer>
      <SideNavContainer
        odysseyDesignTokens={odysseyDesignTokens}
        sideNavCollapsed={sideNavCollapsed}
      >
        <Box
          sx={{
            position: "sticky",
            top: 0,
          }}
        >
          <SideNavHeader
            navHeaderText={navHeaderText}
            isCollapsible={isCollapsible}
            onCollapse={() => {
              setSideNavCollapsed(!sideNavCollapsed);
              onCollapse && onCollapse();
            }}
          />
        </Box>
        <Box
          sx={{
            flex: 1,
            overflowY: "auto",
          }}
        >
          <SideNavListContainer>
            {processedSideNavItems?.map((item) => {
              const {
                id,
                label,
                isSectionHeader,
                startIcon,
                children,
                isDefaultExpanded,
                isDisabled,
              } = item;

              if (isSectionHeader) {
                return (
                  <SectionHeader
                    id={id}
                    key={id}
                    odysseyDesignTokens={odysseyDesignTokens}
                  >
                    {label}
                  </SectionHeader>
                );
              } else if (children) {
                return (
                  <SideNavListItemContainer
                    id={id}
                    key={id}
                    odysseyDesignTokens={odysseyDesignTokens}
                  >
                    <NavAccordion
                      label={label}
                      isDefaultExpanded={isDefaultExpanded}
                      startIcon={startIcon}
                      isDisabled={isDisabled}
                    >
                      <SideNavListContainer id={id + "-list"}>
                        {children}
                      </SideNavListContainer>
                    </NavAccordion>
                  </SideNavListItemContainer>
                );
              } else {
                return <SideNavItemContent key={item.id} {...item} />;
              }
            })}
          </SideNavListContainer>
        </Box>
        <Box
          sx={{
            position: "sticky",
            bottom: 0,
            paddingTop: odysseyDesignTokens.Spacing2,
          }}
        >
          <SideNavFooterContainer odysseyDesignTokens={odysseyDesignTokens}>
            {footerItems?.map((item) => (
              <SideNavFooter
                id={item.id}
                label={item.label}
                href={item.href}
                key={item.id}
              />
            ))}
          </SideNavFooterContainer>
        </Box>
      </SideNavContainer>
    </Box>
  );
};

const MemoizedSideNav = memo(SideNav);
MemoizedSideNav.displayName = "SideNav";

export { MemoizedSideNav as SideNav };
