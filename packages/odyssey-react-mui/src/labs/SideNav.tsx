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

import { memo, useMemo, MouseEvent, ReactElement, ReactNode } from "react";

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
import { CollapseLeftIcon } from "../icons.generated";
import { Link } from "../Link";

export type SideNavItem = {
  id: string;
  label: string;
  href: string;
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
   * Whether the item is active/selected
   */
  selected?: boolean;
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
      children?: never;
    }
  | {
      isSectionHeader?: false;
      /**
       * An array of side nav items
       */
      children?: SideNavItem[];
    }
);

const SideNavContainer = styled("div", {
  shouldForwardProp: (prop) => prop !== "odysseyDesignTokens",
})(({ odysseyDesignTokens }: { odysseyDesignTokens: DesignTokens }) => ({
  backgroundColor: odysseyDesignTokens.HueNeutralWhite,
  minWidth: "12rem",
  display: "flex",
  flexDirection: "column",
  height: "95vh",
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
}));

const CollapseIcon = ({ onClick }: { onClick?(): void }): ReactElement => {
  const odysseyDesignTokens = useOdysseyDesignTokens();
  return (
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
      }}
    >
      <CollapseLeftIcon
        onClick={onClick}
        onKeyDown={onClick}
        tabIndex={0}
        sx={{
          height: "16px",
          width: "16px",
          alignSelf: "center",
          color: odysseyDesignTokens.HueNeutral400,
        }}
      />
    </Box>
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
    prop !== "odysseyDesignTokens" && prop !== "isIconVisible",
})<{
  odysseyDesignTokens: DesignTokens;
  isIconVisible: boolean;
}>(({ odysseyDesignTokens, isIconVisible }) => ({
  width: "100%",
  display: "inline-flex",
  flexWrap: "wrap",
  alignItems: "center",
  fontSize: odysseyDesignTokens.TypographyScale0,
  fontWeight: odysseyDesignTokens.TypographyWeightHeading,
  paddingTop: odysseyDesignTokens.Spacing3,
  paddingBottom: odysseyDesignTokens.Spacing3,
  marginLeft: `${isIconVisible ? odysseyDesignTokens.Spacing3 : 0}`,
  "& > a": {
    color: `${odysseyDesignTokens.TypographyColorHeading} !important`,
  },
  "& > a:hover": {
    textDecoration: "none",
  },
  "& > a:visited": {
    color: odysseyDesignTokens.TypographyColorHeading,
    fontSize: odysseyDesignTokens.TypographyScale0,
  },
}));

const SideNavListContainer = styled.ul({
  padding: 0,
  listStyle: "none",
  listStyleType: "none",
});

const SideNavListItemContainer = styled("li", {
  shouldForwardProp: (prop) => prop !== "odysseyDesignTokens",
})(({ odysseyDesignTokens }: { odysseyDesignTokens: DesignTokens }) => ({
  display: "flex",
  alignItems: "center",
  minHeight: "48px",
  "&:hover": {
    backgroundColor: odysseyDesignTokens.HueNeutral50,
    cursor: "pointer",
  },
  "&:last-child": {
    marginBottom: odysseyDesignTokens.Spacing2,
  },
}));

const SideNavFooterContainer = styled("div", {
  shouldForwardProp: (prop) => prop !== "odysseyDesignTokens",
})(({ odysseyDesignTokens }: { odysseyDesignTokens: DesignTokens }) => ({
  paddingTop: odysseyDesignTokens.Spacing2,
  paddingBottom: odysseyDesignTokens.Spacing2,
  height: "auto",
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

export type SideNavFooterItem = {
  id: string;
  label: string;
  href: string;
};

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
>) => {
  const odysseyDesignTokens = useOdysseyDesignTokens();
  return (
    <SideNavListItemContainer
      id={id}
      key={id}
      odysseyDesignTokens={odysseyDesignTokens}
    >
      <Box
        sx={{
          paddingRight: odysseyDesignTokens.Spacing4,
          paddingLeft: odysseyDesignTokens.Spacing4,
          display: "flex",
          alignItems: "center",
          width: "100%",
        }}
      >
        {startIcon && (
          <Box
            sx={{
              paddingTop: odysseyDesignTokens.Spacing1,
            }}
          >
            {startIcon}
          </Box>
        )}
        <SideNavItemLabelContainer
          odysseyDesignTokens={odysseyDesignTokens}
          isIconVisible={!!startIcon}
        >
          <Link href={href} target={target} onClick={onClick}>
            {label}
          </Link>
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
        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-end",
          }}
        >
          {endIcon && endIcon}
        </Box>
      </Box>
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
  isCollapsible: boolean;
  /**
   *  Triggers whether the side nav is collapsed
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
  const odysseyDesignTokens = useOdysseyDesignTokens();

  const processedSideNavItems = useMemo(
    () =>
      sideNavItems.map((item) => ({
        ...item,
        children: item.children?.map((childProps) => (
          <SideNavItemContent {...childProps} key={childProps.id} />
        )),
      })),
    [sideNavItems],
  );
  return (
    <SideNavContainer odysseyDesignTokens={odysseyDesignTokens}>
      <SideNavHeader
        navHeaderText={navHeaderText}
        isCollapsible={isCollapsible}
        onCollapse={onCollapse}
      />
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
                  >
                    <SideNavListContainer id={id + "-list"}>
                      {children}
                    </SideNavListContainer>
                  </NavAccordion>
                </SideNavListItemContainer>
              );
            } else {
              return (
                <SideNavItemContent
                  id={item.id}
                  label={item.label}
                  href={item.href}
                  target={item.target}
                  startIcon={item.startIcon}
                  severity={item.severity}
                  statusLabel={item.statusLabel}
                  endIcon={item.endIcon}
                  onClick={item.onClick}
                  key={item.id}
                />
              );
            }
          })}
        </SideNavListContainer>
      </Box>
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
    </SideNavContainer>
  );
};

const MemoizedSideNav = memo(SideNav);
MemoizedSideNav.displayName = "SideNav";

export { MemoizedSideNav as SideNav };
