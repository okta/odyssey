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

import styled from "@emotion/styled";
import {
  memo,
  useMemo,
  useState,
  MouseEvent,
  ReactElement,
  ReactNode,
  useCallback,
} from "react";

import { Box } from "../Box";
import { Button } from "../Button";
import type { HtmlProps } from "../HtmlProps";
import { CollapseLeftIcon, ExpandLeftIcon } from "../icons.generated";
import { Link } from "../Link";
import { NavAccordion } from "./NavAccordion";
import {
  DesignTokens,
  useOdysseyDesignTokens,
} from "../OdysseyDesignTokensContext";
import { Status, statusSeverityValues } from "../Status";
import { Heading6 } from "../Typography";

export type SideNavItem = {
  id: string;
  label: string;
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
  /**
   * The status element to display after the label
   */
  severity?: (typeof statusSeverityValues)[number];
  /**
   * The icon element to display at the start of the Nav Item
   */
  startIcon?: ReactElement;
  /**
   * The label to display inside the status
   */
  statusLabel?: string;
  target?: string;
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
  href: string;
  id: string;
  label: string;
};

const SideNavCollapsedContainer = styled("div", {
  shouldForwardProp: (prop) =>
    prop !== "odysseyDesignTokens" && prop !== "isSideNavCollapsed",
})(
  ({
    odysseyDesignTokens,
    isSideNavCollapsed,
  }: {
    odysseyDesignTokens: DesignTokens;
    isSideNavCollapsed: boolean;
  }) => ({
    backgroundColor: odysseyDesignTokens.HueNeutral300,
    paddingTop: odysseyDesignTokens.Spacing5,
    cursor: "pointer",
    width: isSideNavCollapsed ? "auto" : 0,
    opacity: isSideNavCollapsed ? 1 : 0,
    visibility: isSideNavCollapsed ? "visible" : "hidden",
    transitionProperty: "opacity, visibility, width",
    transitionDuration: odysseyDesignTokens.TransitionDurationMain,
    transitionTimingFunction: odysseyDesignTokens.TransitionTimingMain,
  }),
);

const SideNavContainer = styled("div", {
  shouldForwardProp: (prop) =>
    prop !== "odysseyDesignTokens" && prop !== "isSideNavCollapsed",
})(
  ({
    odysseyDesignTokens,
    isSideNavCollapsed,
  }: {
    odysseyDesignTokens: DesignTokens;
    isSideNavCollapsed: boolean;
  }) => ({
    backgroundColor: odysseyDesignTokens.HueNeutralWhite,
    flexDirection: "column",
    display: "flex",
    opacity: isSideNavCollapsed ? 0 : 1,
    visibility: isSideNavCollapsed ? "hidden" : "visible",
    width: isSideNavCollapsed ? "0" : "100%",
    transitionProperty: "opacity, visibility, width",
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
    <Box
      sx={{
        "& > button": {
          height: "32px",
          width: "32px",
          color: odysseyDesignTokens.HueNeutral400,
        },
      }}
    >
      <Button
        tabIndex={0}
        variant="secondary"
        onClick={onClick}
        startIcon={<CollapseLeftIcon />}
        ariaLabel="collapse side navigation"
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
    prop !== "odysseyDesignTokens" && prop !== "isIconVisible",
})<{
  odysseyDesignTokens: DesignTokens;
  isIconVisible: boolean;
}>(({ odysseyDesignTokens, isIconVisible }) => ({
  width: "100%",
  display: "flex",
  flexWrap: "wrap",
  alignItems: "center",
  fontSize: odysseyDesignTokens.TypographyScale0,
  fontWeight: odysseyDesignTokens.TypographyWeightHeading,
  marginLeft: isIconVisible ? odysseyDesignTokens.Spacing2 : 0,
  "& a": {
    color: `${odysseyDesignTokens.TypographyColorHeading} !important`,
    fontSize: odysseyDesignTokens.TypographyScale0,
  },
  "& a:hover": {
    textDecoration: "none",
    cursor: "pointer",
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
  cursor: isDisabled ? "default" : "pointer",
  pointerEvents: isDisabled ? "none" : "auto",
  backgroundColor: isSelected ? odysseyDesignTokens.HueNeutral50 : "unset",
  margin: "4px 0",
  "&:last-child": {
    marginBottom: odysseyDesignTokens.Spacing2,
  },
  "& a": {
    display: "flex",
    alignItems: "center",
    width: "100%",
    minHeight: "45px",
    padding: `${odysseyDesignTokens.Spacing3} ${odysseyDesignTokens.Spacing4}`,
    color: `${odysseyDesignTokens.TypographyColorHeading} !important`,
    pointerEvents: isDisabled ? "none" : "auto",
  },
  "& a:hover": {
    textDecoration: "none",
    cursor: isDisabled ? "default" : "pointer",
    backgroundColor: !isDisabled ? odysseyDesignTokens.HueNeutral50 : "inherit",
  },
  "& a:focus-visible": {
    outlineOffset: 0,
    borderRadius: 0,
    outlineWidth: "2px",
    backgroundColor: !isDisabled ? odysseyDesignTokens.HueNeutral50 : "inherit",
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

const SideNavItemLinkContent = ({
  label,
  startIcon,
  endIcon,
  severity,
  statusLabel,
}: Pick<
  SideNavItem,
  "label" | "startIcon" | "endIcon" | "severity" | "statusLabel"
>): ReactNode => {
  const odysseyDesignTokens = useOdysseyDesignTokens();
  return (
    <>
      {startIcon && startIcon}
      <SideNavItemLabelContainer
        odysseyDesignTokens={odysseyDesignTokens}
        isIconVisible={!!startIcon}
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
    </>
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
      aria-disabled={isDisabled}
      isDisabled={isDisabled}
      isSelected={isSelected}
      odysseyDesignTokens={odysseyDesignTokens}
    >
      {
        // Use Link for accessible nav items and div for disabled items
        isDisabled ? (
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              width: "100%",
              minHeight: "45px",
              padding: `${odysseyDesignTokens.Spacing3} ${odysseyDesignTokens.Spacing4}`,
              color: `${odysseyDesignTokens.TypographyColorDisabled} !important`,
            }}
          >
            <SideNavItemLinkContent
              label={label}
              startIcon={startIcon}
              endIcon={endIcon}
              statusLabel={statusLabel}
              severity={severity}
            />
          </Box>
        ) : (
          <Link href={href || ""} target={target} onClick={onClick}>
            <SideNavItemLinkContent
              label={label}
              startIcon={startIcon}
              endIcon={endIcon}
              statusLabel={statusLabel}
              severity={severity}
            />
          </Link>
        )
      }
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
   * Footer items in the side nav
   */
  footerItems?: SideNavFooterItem[];
  /**
   *  Triggers when the side nav is collapsed
   */
  onCollapse?(): void;
  /**
   * Nav items in the side nav
   */
  sideNavItems: SideNavItem[];
} & Pick<HtmlProps, "testId">;

const SideNav = ({
  navHeaderText,
  isCollapsible,
  onCollapse,
  sideNavItems,
  footerItems,
}: SideNavProps) => {
  const [isSideNavCollapsed, setSideNavCollapsed] = useState(false);
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

  const sideNavCollapseHandler = useCallback(() => {
    setSideNavCollapsed(!isSideNavCollapsed);
    onCollapse && onCollapse();
  }, [isSideNavCollapsed, setSideNavCollapsed, onCollapse]);

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
        isSideNavCollapsed={isSideNavCollapsed}
        onClick={() => setSideNavCollapsed(!isSideNavCollapsed)}
        onKeyDown={(event) => {
          (event.key === "Enter" || event.code === "Space") &&
            setSideNavCollapsed(!isSideNavCollapsed);
        }}
      >
        <ExpandLeftIcon
          sx={{
            margin: `0 ${odysseyDesignTokens.Spacing1}`,
            fontSize: "1em",
          }}
        />
      </SideNavCollapsedContainer>
      <SideNavContainer
        odysseyDesignTokens={odysseyDesignTokens}
        isSideNavCollapsed={isSideNavCollapsed}
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
            onCollapse={sideNavCollapseHandler}
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
