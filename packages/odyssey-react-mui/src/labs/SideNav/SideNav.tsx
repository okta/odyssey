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
  useCallback,
  KeyboardEvent,
  useRef,
  useEffect,
} from "react";

import { Box } from "../../Box";
import { ExpandLeftIcon } from "../../icons.generated";
import { NavAccordion } from "../NavAccordion";
import {
  DesignTokens,
  useOdysseyDesignTokens,
} from "../../OdysseyDesignTokensContext";
import type { SideNavProps } from "./types";
import { SideNavHeader } from "./SideNavHeader";
import {
  SideNavItemContent,
  SideNavListItemContainer,
} from "./SideNavItemContent";
import { SideNavFooterContent } from "./SideNavFooterContent";

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
    transitionProperty: "opacity",
    transitionDuration: odysseyDesignTokens.TransitionDurationMain,
    transitionTimingFunction: odysseyDesignTokens.TransitionTimingMain,
  }),
);

const SideNavExpandContainer = styled("div", {
  shouldForwardProp: (prop) =>
    prop !== "odysseyDesignTokens" &&
    prop !== "isSideNavCollapsed" &&
    prop !== "maxWidth",
})(
  ({
    odysseyDesignTokens,
    isSideNavCollapsed,
    maxWidth,
  }: {
    odysseyDesignTokens: DesignTokens;
    isSideNavCollapsed: boolean;
    maxWidth: string;
  }) => ({
    backgroundColor: odysseyDesignTokens.HueNeutralWhite,
    flexDirection: "column",
    display: "flex",
    opacity: isSideNavCollapsed ? 0 : 1,
    visibility: isSideNavCollapsed ? "hidden" : "visible",
    width: isSideNavCollapsed ? "0" : "100%",
    transitionProperty: "opacity, width",
    transitionDuration: odysseyDesignTokens.TransitionDurationMain,
    transitionTimingFunction: odysseyDesignTokens.TransitionTimingMain,
    maxWidth: maxWidth,
    borderStyle: odysseyDesignTokens.BorderStyleMain,
    borderWidth: 0,
    borderRightWidth: odysseyDesignTokens.BorderWidthMain,
    borderRightColor: odysseyDesignTokens.HueNeutral50,
  }),
);

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
  "& a": {
    color: `${odysseyDesignTokens.TypographyColorHeading} !important`,
  },
  "& a:hover": {
    textDecoration: "none",
  },
  "& a:visited": {
    color: odysseyDesignTokens.TypographyColorHeading,
  },
}));

const SideNav = ({
  navHeaderText,
  isCollapsible,
  onCollapse,
  onExpand,
  sideNavItems,
  maxWidth = "300px",
  footerItems,
  footerComponent,
}: SideNavProps) => {
  const [isSideNavCollapsed, setSideNavCollapsed] = useState(false);
  const odysseyDesignTokens = useOdysseyDesignTokens();

  const scrollIntoViewRef = useRef<HTMLLIElement>(null);
  /**
   * Look through the sideNavItems and determine which is the first node
   * with isSelected. This should be the node we set a ref on in order to
   * call scrollIntoView in the effect
   */
  const firstSideNavItemIdWithIsSelected = useMemo(() => {
    const flattenedItems = sideNavItems.flatMap((sideNavItem) =>
      sideNavItem.children
        ? [sideNavItem, ...sideNavItem.children]
        : sideNavItem,
    );
    const firstItemWithIsSelected = flattenedItems.find(
      (sideNavItem) => sideNavItem.isSelected,
    );
    return firstItemWithIsSelected?.id;
  }, [sideNavItems]);
  /**
   * Once we've rendered and if we have an item to scroll to, do the scroll action.
   * This must rely on checking firstSideNavItemIdWithIsSelected or it will not run
   * once the actual ref is populated.
   */
  useEffect(() => {
    if (firstSideNavItemIdWithIsSelected && scrollIntoViewRef.current) {
      scrollIntoViewRef.current.scrollIntoView();
    }
  }, [firstSideNavItemIdWithIsSelected, scrollIntoViewRef]);

  /**
   * We only want to put a ref on a node iff it is the first selected node.
   * This function returns the ref only if the ID provided matches the first
   * selected node, otherwise returns undefined (so that the node has no ref)
   */
  const getRefIfThisIsFirstNodeWithIsSelected = useCallback(
    (itemId: string) =>
      itemId === firstSideNavItemIdWithIsSelected
        ? scrollIntoViewRef
        : undefined,
    [firstSideNavItemIdWithIsSelected],
  );

  const processedSideNavItems = useMemo(
    () =>
      sideNavItems.map((item) => ({
        ...item,
        children: item.children?.map((childProps) => (
          <SideNavItemContent
            key={childProps.id}
            scrollRef={getRefIfThisIsFirstNodeWithIsSelected(childProps.id)}
            {...childProps}
          />
        )),
      })),
    [getRefIfThisIsFirstNodeWithIsSelected, sideNavItems],
  );

  const sideNavCollapseHandler = useCallback(() => {
    setSideNavCollapsed(!isSideNavCollapsed);
    onCollapse?.();
  }, [isSideNavCollapsed, setSideNavCollapsed, onCollapse]);

  const sideNavExpandClickHandler = useCallback(() => {
    setSideNavCollapsed(!isSideNavCollapsed);
    onExpand?.();
  }, [isSideNavCollapsed, setSideNavCollapsed, onExpand]);

  const sideNavExpandKeyHandler = useCallback(
    (event: KeyboardEvent<HTMLDivElement>) => {
      if (event?.key === "Enter" || event?.code === "Space") {
        event.preventDefault();
        setSideNavCollapsed(!isSideNavCollapsed);
        onExpand?.();
      }
    },
    [isSideNavCollapsed, setSideNavCollapsed, onExpand],
  );

  const sideNavStyles = useMemo(
    () => ({
      display: "flex",
      height: "100vh",
      maxWidth,
    }),
    [maxWidth],
  );

  const sideNavHeaderContainerStyles = useMemo(
    () => ({
      position: "sticky",
      top: 0,
      borderBottomWidth: odysseyDesignTokens.BorderWidthMain,
      borderBottomStyle: odysseyDesignTokens.BorderStyleMain,
      borderBottomColor: odysseyDesignTokens.HueNeutral50,
      boxShadowBottom: odysseyDesignTokens.ShadowScale0,
    }),
    [odysseyDesignTokens],
  );

  const sideNavListContainerStyles = useMemo(
    () => ({
      flex: 1,
      overflowY: "auto",
    }),
    [],
  );

  const sideNavFooterContainerStyles = useMemo(
    () => ({
      position: "sticky",
      bottom: 0,
      paddingTop: odysseyDesignTokens.Spacing2,
      borderTopWidth: odysseyDesignTokens.BorderWidthMain,
      borderTopStyle: odysseyDesignTokens.BorderStyleMain,
      borderTopColor: odysseyDesignTokens.HueNeutral50,
    }),
    [odysseyDesignTokens],
  );

  const expandLeftIconStyles = useMemo(
    () => ({
      fontSize: "1em",
      margin: `0 ${odysseyDesignTokens.Spacing1}`,
    }),
    [odysseyDesignTokens],
  );

  return (
    <Box sx={sideNavStyles}>
      <SideNavCollapsedContainer
        tabIndex={0}
        role="button"
        odysseyDesignTokens={odysseyDesignTokens}
        isSideNavCollapsed={isSideNavCollapsed}
        onClick={sideNavExpandClickHandler}
        onKeyDown={sideNavExpandKeyHandler}
        data-se="collapsed-region"
        data-aria-label="expand side navigation"
      >
        <ExpandLeftIcon sx={expandLeftIconStyles} />
      </SideNavCollapsedContainer>
      <SideNavExpandContainer
        odysseyDesignTokens={odysseyDesignTokens}
        isSideNavCollapsed={isSideNavCollapsed}
        maxWidth={maxWidth}
        data-se="expanded-region"
      >
        <Box sx={sideNavHeaderContainerStyles}>
          <SideNavHeader
            navHeaderText={navHeaderText}
            isCollapsible={isCollapsible}
            onCollapse={sideNavCollapseHandler}
          />
        </Box>
        <Box sx={sideNavListContainerStyles} testId="scrollable-region">
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
                isExpanded,
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
                      isExpanded={isExpanded}
                      startIcon={startIcon}
                      isDisabled={isDisabled}
                    >
                      <SideNavListContainer id={`${id}-list`}>
                        {children}
                      </SideNavListContainer>
                    </NavAccordion>
                  </SideNavListItemContainer>
                );
              } else {
                return (
                  <SideNavItemContent
                    key={item.id}
                    scrollRef={getRefIfThisIsFirstNodeWithIsSelected(item.id)}
                    {...item}
                  />
                );
              }
            })}
          </SideNavListContainer>
        </Box>
        {(footerItems || footerComponent) && (
          <Box sx={sideNavFooterContainerStyles}>
            <SideNavFooterContainer odysseyDesignTokens={odysseyDesignTokens}>
              {footerComponent}
              {footerItems && !footerComponent && (
                <SideNavFooterContent footerItems={footerItems} />
              )}
            </SideNavFooterContainer>
          </Box>
        )}
      </SideNavExpandContainer>
    </Box>
  );
};

const MemoizedSideNav = memo(SideNav);
MemoizedSideNav.displayName = "SideNav";

export { MemoizedSideNav as SideNav };
