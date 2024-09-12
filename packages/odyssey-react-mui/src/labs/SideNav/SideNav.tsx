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
import { OktaLogo } from "./OktaLogo";
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
    prop !== "expandedWidth",
})(
  ({
    odysseyDesignTokens,
    isSideNavCollapsed,
    expandedWidth,
  }: {
    odysseyDesignTokens: DesignTokens;
    isSideNavCollapsed: boolean;
    expandedWidth: string;
  }) => ({
    backgroundColor: odysseyDesignTokens.HueNeutralWhite,
    flexDirection: "column",
    display: "flex",
    opacity: isSideNavCollapsed ? 0 : 1,
    visibility: isSideNavCollapsed ? "hidden" : "visible",
    width: isSideNavCollapsed ? "0" : expandedWidth,
    transitionProperty: "opacity, width",
    transitionDuration: odysseyDesignTokens.TransitionDurationMain,
    transitionTimingFunction: odysseyDesignTokens.TransitionTimingMain,
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

const SideNavScrollableContainer = styled.div({
  flex: 1,
  overflowY: "auto",
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

const getHasScrollableContent = (scrollableContainer: HTMLElement) =>
  scrollableContainer.scrollHeight > scrollableContainer.clientHeight;

const SideNav = ({
  navHeaderText,
  isCollapsible,
  onCollapse,
  onExpand,
  sideNavItems,
  expandedWidth = "300px",
  footerItems,
  footerComponent,
  logo,
}: SideNavProps) => {
  const [isSideNavCollapsed, setSideNavCollapsed] = useState(false);
  const odysseyDesignTokens = useOdysseyDesignTokens();
  const [isContentScrollable, setIsContentScrollable] = useState(false);
  const [hasContentScrolled, setHasContentScrolled] = useState(false);
  const scrollableContentRef = useRef<HTMLUListElement>(null);
  const resizeObserverRef = useRef<ResizeObserver | null>(null);
  const intersectionObserverRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    const setWhetherContentIsScrollable = () => {
      if (
        scrollableContentRef.current &&
        scrollableContentRef.current.parentElement
      ) {
        setIsContentScrollable(
          getHasScrollableContent(scrollableContentRef.current.parentElement),
        );
      }
    };

    // If the window is resized, we may need to re-determine if the scrollable container has overflow
    // Setup a ResizeObserver to know if the size of the scrollableContent changes
    let resizeObserverDebounceTimer: ReturnType<typeof requestAnimationFrame>;
    if (!resizeObserverRef.current) {
      resizeObserverRef.current = new ResizeObserver(() => {
        cancelAnimationFrame(resizeObserverDebounceTimer);
        resizeObserverDebounceTimer = requestAnimationFrame(
          setWhetherContentIsScrollable,
        );
      });
    }

    if (resizeObserverRef.current && scrollableContentRef.current) {
      // Observe the <ul> itself (in case it changes size due to the content expanding)
      resizeObserverRef.current.observe(scrollableContentRef.current);
      if (scrollableContentRef.current.parentElement) {
        // ALSO observe the parent (<SideNavScrollableContainer>) in case the window resizes
        resizeObserverRef.current.observe(
          scrollableContentRef.current.parentElement,
        );
      }
    }

    // Determine if the scrollable container has overflow or not on load
    setWhetherContentIsScrollable();

    // Finally, we only want to have the border on the bottom of the header iff the user has scrolled
    // the scrollable container
    if (!intersectionObserverRef.current && scrollableContentRef.current) {
      intersectionObserverRef.current = new IntersectionObserver(
        (entries) => {
          // Sort the entries by time, getting the latest first
          const sortedEntries = entries.slice().sort((a, b) => a.time - b.time);
          // If isIntersecting is true, then we're at the top of the scroll container
          // If isIntersecting is false, some scrolling has occurred.
          const isIntersecting = sortedEntries.at(0)?.isIntersecting;
          setHasContentScrolled(!isIntersecting);
        },
        {
          root: scrollableContentRef.current.parentElement,
          threshold: 1.0,
        },
      );
    }
    if (intersectionObserverRef.current && scrollableContentRef.current) {
      const ul = scrollableContentRef.current;
      const li = ul?.firstChild;
      intersectionObserverRef.current.observe(li as HTMLElement);
    }

    // Cleanup when unmounted:
    return () => {
      if (resizeObserverRef.current) {
        resizeObserverRef.current.disconnect();
        resizeObserverRef.current = null;
      }
      if (intersectionObserverRef.current) {
        intersectionObserverRef.current.disconnect();
        intersectionObserverRef.current = null;
      }
      cancelAnimationFrame(resizeObserverDebounceTimer); // Ensure timer is cleared on component unmount
    };
  }, []);

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
      height: "100%",
      maxWidth: expandedWidth,
      overflow: "hidden",
    }),
    [expandedWidth],
  );

  const sideNavHeaderContainerStyles = useMemo(
    () => ({
      position: "sticky",
      top: 0,
      // The bottom border should appear only if the scrollable region has been scrolled
      ...(hasContentScrolled && {
        borderBottomWidth: odysseyDesignTokens.BorderWidthMain,
        borderBottomStyle: odysseyDesignTokens.BorderStyleMain,
        borderBottomColor: odysseyDesignTokens.HueNeutral50,
      }),
    }),
    [odysseyDesignTokens, hasContentScrolled],
  );

  const sideNavFooterContainerStyles = useMemo(
    () => ({
      position: "sticky",
      bottom: 0,
      paddingTop: odysseyDesignTokens.Spacing2,
      transitionProperty: "box-shadow",
      transitionDuration: odysseyDesignTokens.TransitionDurationMain,
      transitionTiming: odysseyDesignTokens.TransitionTimingMain,
      // The box shadow should appear above the footer only if the scrollable region has overflow
      ...(isContentScrollable && {
        boxShadow: odysseyDesignTokens.DepthHigh,
      }),
    }),
    [odysseyDesignTokens, isContentScrollable],
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
        expandedWidth={expandedWidth}
        data-se="expanded-region"
      >
        <Box sx={sideNavHeaderContainerStyles}>
          <SideNavHeader
            logo={logo || <OktaLogo />}
            navHeaderText={navHeaderText}
            isCollapsible={isCollapsible}
            onCollapse={sideNavCollapseHandler}
          />
        </Box>
        <SideNavScrollableContainer data-se="scrollable-region">
          <SideNavListContainer ref={scrollableContentRef}>
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
        </SideNavScrollableContainer>
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
