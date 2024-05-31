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

import { memo, MouseEvent, ReactElement, ReactNode } from "react";

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
   * Determines if the nav item is a section header
   */
  isSectionHeader?: boolean;
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
  /**
   * Lis navItems can be an array of side nav items or a link element
   */
  children?: SideNavItem[];
};

const SideNavContainer = styled("div", {
  shouldForwardProp: (prop) => prop !== "odysseyDesignTokens",
})(({ odysseyDesignTokens }: { odysseyDesignTokens: DesignTokens }) => ({
  marginBlockEnd: odysseyDesignTokens.Spacing2,
  backgroundColor: `${odysseyDesignTokens.HueNeutralWhite}`,
}));

const SideNavHeaderContainer = styled("div", {
  shouldForwardProp: (prop) => prop !== "odysseyDesignTokens",
})(({ odysseyDesignTokens }: { odysseyDesignTokens: DesignTokens }) => ({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  margin: odysseyDesignTokens.Spacing3,
}));

const SideNavULContainer = styled.ul({
  padding: 0,
  listStyle: "none",
  listStyleType: "none",
});

const SideNavLIContainer = styled("li", {
  shouldForwardProp: (prop) => prop !== "odysseyDesignTokens",
})(({ odysseyDesignTokens }: { odysseyDesignTokens: DesignTokens }) => ({
  marginLeft: `${odysseyDesignTokens.Spacing3}`,
  marginRight: `${odysseyDesignTokens.Spacing3}`,
  display: "flex",
  alignItems: "center",
  "&:hover": {
    backgroundColor: `${odysseyDesignTokens.HueNeutral50}`,
    cursor: "pointer",
  },
  "&:last-child": {
    marginBottom: `${odysseyDesignTokens.Spacing2}`,
  },
}));

type CollapseIconProps = {
  onClick?(event: MouseEvent<SVGSVGElement>): void;
};

const CollapseIcon = ({ onClick }: CollapseIconProps): ReactElement => {
  const odysseyDesignTokens = useOdysseyDesignTokens();
  return (
    <Box
      component="a"
      sx={{
        width: "24px",
        height: "24px",
        border: `1px solid ${odysseyDesignTokens.HueNeutral300}`,
        borderRadius: "4px",
        cursor: "pointer",
        padding: `${odysseyDesignTokens.Spacing1}`,
      }}
    >
      <CollapseLeftIcon
        onClick={onClick}
        sx={{
          height: "13px",
          width: "13px",
          alignSelf: "center",
          color: `${odysseyDesignTokens.HueNeutral400}`,
          marginBottom: `${odysseyDesignTokens.Spacing2}`,
        }}
      />
    </Box>
  );
};

const SideNavHeader = ({
  navHeaderText,
  isCollapsible,
  onClick,
}: Partial<SideNavProps>): ReactNode => {
  const odysseyDesignTokens = useOdysseyDesignTokens();
  return (
    <SideNavHeaderContainer odysseyDesignTokens={odysseyDesignTokens}>
      <Box
        sx={{
          marginTop: `${odysseyDesignTokens.Spacing2}`,
        }}
      >
        <Heading6>{navHeaderText}</Heading6>
      </Box>
      {isCollapsible && <CollapseIcon onClick={onClick} />}
    </SideNavHeaderContainer>
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
}: SideNavItem): ReactNode => {
  const odysseyDesignTokens = useOdysseyDesignTokens();

  return (
    <SideNavLIContainer
      id={id}
      key={id}
      odysseyDesignTokens={odysseyDesignTokens}
    >
      <Box
        sx={{
          marginTop: `${odysseyDesignTokens.Spacing1}`,
        }}
      >
        {startIcon && startIcon}
      </Box>
      <Box
        sx={{
          width: "100%",
          fontSize: `0.9rem`,
          fontWeight: "500",
          paddingTop: `${odysseyDesignTokens.Spacing3}`,
          paddingBottom: `${odysseyDesignTokens.Spacing3}`,
          marginLeft: `${startIcon ? odysseyDesignTokens.Spacing3 : 0}`,
          "& > a": {
            color: `${odysseyDesignTokens.TypographyColorHeading} !important`,
          },
          "& > a:hover": {
            textDecoration: "none",
          },
          "& > a:visited": {
            color: `${odysseyDesignTokens.TypographyColorHeading}`,
            fontSize: `0.9rem`,
          },
        }}
      >
        <Link href={href} target={target} onClick={onClick}>
          {label}
        </Link>
        {severity && (
          <Box
            sx={{
              marginLeft: `${odysseyDesignTokens.Spacing2}`,
              display: "inline-flex",
            }}
          >
            <Status severity={severity} label={statusLabel || ""} />
          </Box>
        )}
      </Box>
      <Box
        sx={{
          width: "24px",
          display: "flex",
          justifyContent: "flex-end",
        }}
      >
        {endIcon && endIcon}
      </Box>
    </SideNavLIContainer>
  );
};

const sideNavItemsMap = (children: SideNavItem[]): ReactNode => {
  return children?.map((child) => {
    return SideNavItemContent(child);
  });
};

const SectionHeader = styled("li", {
  shouldForwardProp: (prop) => prop !== "odysseyDesignTokens",
})(({ odysseyDesignTokens }: { odysseyDesignTokens: DesignTokens }) => ({
  fontSize: `0.7rem`,
  fontWeight: "700",
  color: `${odysseyDesignTokens.HueNeutral600}`,
  paddingTop: `${odysseyDesignTokens.Spacing3}`,
  paddingBottom: `${odysseyDesignTokens.Spacing3}`,
  marginLeft: `${odysseyDesignTokens.Spacing3}`,
  textTransform: "uppercase",
}));

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
   *  Determines whether the side nav is collapsible
   */
  onClick?(event: MouseEvent<SVGSVGElement>): void;
  /**
   * Nav items in the side nav
   */
  sideNavItems: SideNavItem[];
} & Pick<HtmlProps, "testId">;

const SideNav = ({
  navHeaderText,
  isCollapsible,
  onClick,
  sideNavItems,
}: SideNavProps) => {
  const odysseyDesignTokens = useOdysseyDesignTokens();

  return (
    <SideNavContainer odysseyDesignTokens={odysseyDesignTokens}>
      <SideNavHeader
        navHeaderText={navHeaderText}
        isCollapsible={isCollapsible}
        onClick={onClick}
      />
      <Box
        sx={{
          overflow: "scroll",
        }}
      >
        <SideNavULContainer>
          {sideNavItems?.map((item) => {
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
                <SideNavLIContainer
                  id={id}
                  key={id}
                  odysseyDesignTokens={odysseyDesignTokens}
                >
                  <NavAccordion
                    label={label}
                    isDefaultExpanded={isDefaultExpanded}
                    startIcon={startIcon}
                  >
                    <SideNavULContainer id={id + `-ul`}>
                      {sideNavItemsMap(children)}
                    </SideNavULContainer>
                  </NavAccordion>
                </SideNavLIContainer>
              );
            } else {
              return SideNavItemContent(item);
            }
          })}
        </SideNavULContainer>
      </Box>
    </SideNavContainer>
  );
};

const MemoizedSideNav = memo(SideNav);
MemoizedSideNav.displayName = "SideNav";

export { MemoizedSideNav as SideNav };
