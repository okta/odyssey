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

import { NavAccordion } from "./NavAccordion";
import {
  DesignTokens,
  useOdysseyDesignTokens,
} from "../../OdysseyDesignTokensContext";
import type { SideNavProps } from "./types";
import { OktaLogo } from "./OktaLogo";
import { HandleIcon } from "./HandleIcon";
import { CollapseIcon } from "./CollapseIcon";
import { SideNavHeader } from "./SideNavHeader";
import {
  SideNavItemContent,
  SideNavListItemContainer,
} from "./SideNavItemContent";
import { SideNavFooterContent } from "./SideNavFooterContent";
import { SideNavItemContentContext } from "./SideNavItemContentContext";
import { Skeleton } from "@mui/material";
import { t } from "i18next";

export const DEFAULT_SIDE_NAV_WIDTH = "300px";

// The side nav collapse icon is placed absolutely from the top (Logo container + nav header height)
// to align it in the middle of the nav header text
export const SIDENAV_COLLAPSE_ICON_POSITION = "77px";

const SideNavContainer = styled("div")(() => ({
  display: "flex",
  height: "100%",
  overflow: "hidden",
}));

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
    display: "flex",
    "&:before": {
      height: "100%",
      width: 0,
      content: '""',
    },
    "&:has(svg:hover)": {
      "&:before": {
        width: isSideNavCollapsed ? "8px" : 0,
        transitionProperty: "width, background-color",
        transitionDuration: odysseyDesignTokens.TransitionDurationMain,
        transitionTimingFunction: odysseyDesignTokens.TransitionTimingMain,
        backgroundColor: isSideNavCollapsed
          ? odysseyDesignTokens.HueNeutral200
          : "transparent",
      },
    },
  }),
);

const ToggleSideNavHandleContainer = styled("div", {
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
    height: 0,
    cursor: "pointer",
    marginTop: SIDENAV_COLLAPSE_ICON_POSITION,
    "& svg:nth-of-type(2)": {
      opacity: 0,
      width: 0,
      transform: isSideNavCollapsed ? "rotate(180deg)" : "rotate(0deg)",
    },
    "&:hover, &:focus-visible": {
      "& svg:nth-of-type(2)": {
        opacity: 1,
        width: "32px",
        padding: odysseyDesignTokens.Spacing2,
        transitionProperty: "opacity",
        transitionDuration: odysseyDesignTokens.TransitionDurationMain,
        transitionTimingFunction: odysseyDesignTokens.TransitionTimingMain,
      },
      "& svg:nth-of-type(1)": {
        opacity: 0,
        width: 0,
        transitionProperty: "opacity",
        transitionDuration: odysseyDesignTokens.TransitionDurationMain,
        transitionTimingFunction: odysseyDesignTokens.TransitionTimingMain,
      },
    },
  }),
);

const SideNavExpandContainer = styled("nav", {
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
    width: isSideNavCollapsed ? 0 : expandedWidth,
    minWidth: isSideNavCollapsed ? 0 : expandedWidth,
    transitionProperty: "opacity",
    transitionDuration: odysseyDesignTokens.TransitionDurationMain,
    transitionTimingFunction: odysseyDesignTokens.TransitionTimingMain,
    borderRight: `${odysseyDesignTokens.BorderWidthMain} ${odysseyDesignTokens.BorderStyleMain} ${odysseyDesignTokens.HueNeutral50}`,
  }),
);

const SideNavHeaderContainer = styled("div", {
  shouldForwardProp: (prop) =>
    prop !== "hasContentScrolled" && prop !== "odysseyDesignTokens",
})(
  ({
    hasContentScrolled,
    odysseyDesignTokens,
  }: {
    hasContentScrolled: boolean;
    odysseyDesignTokens: DesignTokens;
  }) => ({
    position: "sticky",
    top: 0,
    // The bottom border should appear only if the scrollable region has been scrolled
    ...(hasContentScrolled && {
      borderBottom: `${odysseyDesignTokens.BorderWidthMain} ${odysseyDesignTokens.BorderStyleMain} ${odysseyDesignTokens.HueNeutral50}`,
    }),
  }),
);

const SideNavListContainer = styled("ul")(() => ({
  padding: 0,
  listStyle: "none",
  listStyleType: "none",
}));

const SideNavScrollableContainer = styled("div")(() => ({
  flex: 1,
  overflowY: "auto",
}));

const SectionHeader = styled("li", {
  shouldForwardProp: (prop) => prop !== "odysseyDesignTokens",
})(({ odysseyDesignTokens }: { odysseyDesignTokens: DesignTokens }) => ({
  fontFamily: odysseyDesignTokens.TypographyFamilyHeading,
  fontSize: odysseyDesignTokens.TypographySizeOverline,
  fontWeight: odysseyDesignTokens.TypographyWeightHeadingBold,
  color: odysseyDesignTokens.HueNeutral600,
  paddingTop: odysseyDesignTokens.Spacing3,
  paddingBottom: odysseyDesignTokens.Spacing3,
  paddingLeft: odysseyDesignTokens.Spacing4,
  textTransform: "uppercase",
}));

const SideNavFooter = styled("div", {
  shouldForwardProp: (prop) =>
    prop !== "isContentScrollable" && prop !== "odysseyDesignTokens",
})(
  ({
    isContentScrollable,
    odysseyDesignTokens,
  }: {
    isContentScrollable: boolean;
    odysseyDesignTokens: DesignTokens;
  }) => ({
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
);

const SideNavFooterItemsContainer = styled("div", {
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

const LoadingItemContainer = styled("div", {
  shouldForwardProp: (prop) => prop !== "odysseyDesignTokens",
})(({ odysseyDesignTokens }: { odysseyDesignTokens: DesignTokens }) => ({
  alignItems: "center",
  display: "flex",
  gap: odysseyDesignTokens.Spacing2,
  paddingBlock: odysseyDesignTokens.Spacing2,
  paddingInline: odysseyDesignTokens.Spacing4,
}));

const getHasScrollableContent = (scrollableContainer: HTMLElement) =>
  scrollableContainer.scrollHeight > scrollableContainer.clientHeight;

const LoadingItem = () => {
  const odysseyDesignTokens: DesignTokens = useOdysseyDesignTokens();
  return (
    <LoadingItemContainer odysseyDesignTokens={odysseyDesignTokens}>
      <Skeleton
        variant="circular"
        width={odysseyDesignTokens.Spacing4}
        height={odysseyDesignTokens.Spacing4}
      />
      <Skeleton variant="rounded" width="100%" />
    </LoadingItemContainer>
  );
};

const SideNav = ({
  expandedWidth = DEFAULT_SIDE_NAV_WIDTH,
  footerComponent,
  footerItems,
  isCollapsible,
  isCompact,
  isLoading,
  logo,
  navHeaderText,
  onCollapse,
  onExpand,
  sideNavItems,
}: SideNavProps) => {
  const [isSideNavCollapsed, setSideNavCollapsed] = useState(false);
  const [isContentScrollable, setIsContentScrollable] = useState(false);
  const [hasContentScrolled, setHasContentScrolled] = useState(false);
  const scrollableContentRef = useRef<HTMLUListElement>(null);
  const resizeObserverRef = useRef<ResizeObserver | null>(null);
  const intersectionObserverRef = useRef<IntersectionObserver | null>(null);
  const odysseyDesignTokens: DesignTokens = useOdysseyDesignTokens();

  useEffect(() => {
    const updateIsContentScrollable = () => {
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
          updateIsContentScrollable,
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
    updateIsContentScrollable();

    // Finally, we only want to have the border on the bottom of the header iff the user has scrolled
    // the scrollable container
    if (!intersectionObserverRef.current && scrollableContentRef.current) {
      intersectionObserverRef.current = new IntersectionObserver(
        (entries) => {
          // If isIntersecting is true, then we're at the top of the scroll container
          // If isIntersecting is false, some scrolling has occurred.
          // The entries must be sorted by time and we only really need to look at the latest one
          const isIntersecting = entries
            .slice()
            .sort((a, b) => a.time - b.time)
            .at(0)?.isIntersecting;
          setHasContentScrolled(!isIntersecting);
        },
        {
          root: scrollableContentRef.current.parentElement,
          threshold: 1.0,
        },
      );
    }

    if (intersectionObserverRef.current && scrollableContentRef.current) {
      const ulElement = scrollableContentRef.current;
      const [liElement] = Array.from(ulElement?.children || []);

      if (liElement) {
        intersectionObserverRef.current.observe(liElement);
      }
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

  const sideNavItemContentProviderValue = useMemo(
    () => ({ isCompact, depth: 1 }),
    [isCompact],
  );

  const processedSideNavItems = useMemo(
    () =>
      sideNavItems.map((item) => ({
        ...item,
        children: item.children?.map((childProps) => {
          return (
            <SideNavItemContentContext.Provider
              value={{ ...sideNavItemContentProviderValue, depth: 2 }}
              key={childProps.id}
            >
              <SideNavItemContent
                {...childProps}
                key={childProps.id}
                scrollRef={getRefIfThisIsFirstNodeWithIsSelected(childProps.id)}
              />
            </SideNavItemContentContext.Provider>
          );
        }),
      })),
    [
      getRefIfThisIsFirstNodeWithIsSelected,
      sideNavItems,
      sideNavItemContentProviderValue,
    ],
  );

  const sideNavExpandClickHandler = useCallback(() => {
    isSideNavCollapsed ? onExpand?.() : onCollapse?.();
    setSideNavCollapsed(!isSideNavCollapsed);
  }, [isSideNavCollapsed, setSideNavCollapsed, onExpand, onCollapse]);

  const sideNavExpandKeyHandler = useCallback(
    (event: KeyboardEvent<HTMLDivElement>) => {
      if (event?.key === "Enter" || event?.code === "Space") {
        event.preventDefault();
        sideNavExpandClickHandler();
      }
    },
    [sideNavExpandClickHandler],
  );

  return (
    <SideNavContainer role="navigation" aria-label={t("navigation.label")}>
      <SideNavExpandContainer
        odysseyDesignTokens={odysseyDesignTokens}
        isSideNavCollapsed={isSideNavCollapsed}
        data-se="expanded-region"
        expandedWidth={expandedWidth}
        aria-label={navHeaderText}
      >
        <SideNavHeaderContainer
          odysseyDesignTokens={odysseyDesignTokens}
          hasContentScrolled={hasContentScrolled}
        >
          <SideNavHeader
            isLoading={isLoading}
            logo={logo || <OktaLogo />}
            navHeaderText={navHeaderText}
          />
        </SideNavHeaderContainer>
        <SideNavScrollableContainer data-se="scrollable-region">
          <SideNavListContainer ref={scrollableContentRef}>
            {isLoading
              ? [...Array(6)].map((_, index) => <LoadingItem key={index} />)
              : processedSideNavItems?.map((item) => {
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
                        role="heading"
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
                        disabled={isDisabled}
                        aria-disabled={isDisabled}
                      >
                        <NavAccordion
                          label={label}
                          isCompact={isCompact}
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
                      <SideNavItemContentContext.Provider
                        key={item.id}
                        value={sideNavItemContentProviderValue}
                      >
                        <SideNavItemContent
                          {...item}
                          key={item.id}
                          scrollRef={getRefIfThisIsFirstNodeWithIsSelected(
                            item.id,
                          )}
                        />
                      </SideNavItemContentContext.Provider>
                    );
                  }
                })}
          </SideNavListContainer>
        </SideNavScrollableContainer>
        {(footerItems || footerComponent) && !isLoading && (
          <SideNavFooter
            odysseyDesignTokens={odysseyDesignTokens}
            isContentScrollable={isContentScrollable}
          >
            {footerComponent}
            {footerItems && !footerComponent && (
              <SideNavFooterItemsContainer
                odysseyDesignTokens={odysseyDesignTokens}
              >
                <SideNavFooterContent footerItems={footerItems} />
              </SideNavFooterItemsContainer>
            )}
          </SideNavFooter>
        )}
      </SideNavExpandContainer>
      {isCollapsible && (
        <SideNavCollapsedContainer
          odysseyDesignTokens={odysseyDesignTokens}
          isSideNavCollapsed={isSideNavCollapsed}
          data-se="collapsed-region"
        >
          <ToggleSideNavHandleContainer
            odysseyDesignTokens={odysseyDesignTokens}
            isSideNavCollapsed={isSideNavCollapsed}
            tabIndex={0}
            role="button"
            onClick={sideNavExpandClickHandler}
            onKeyDown={sideNavExpandKeyHandler}
            aria-label={
              isSideNavCollapsed
                ? "expand side navigation"
                : "collapse side navigation"
            }
          >
            <HandleIcon />
            <CollapseIcon />
          </ToggleSideNavHandleContainer>
        </SideNavCollapsedContainer>
      )}
    </SideNavContainer>
  );
};

const MemoizedSideNav = memo(SideNav);
MemoizedSideNav.displayName = "SideNav";

export { MemoizedSideNav as SideNav };
