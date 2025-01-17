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

import styled, { CSSObject } from "@emotion/styled";
import {
  memo,
  useMemo,
  useState,
  useCallback,
  useRef,
  useEffect,
  KeyboardEventHandler,
} from "react";
import { Skeleton } from "@mui/material";
import { useTranslation } from "react-i18next";

import { NavAccordion } from "./NavAccordion";
import {
  DesignTokens,
  useOdysseyDesignTokens,
} from "../../OdysseyDesignTokensContext";
import { OdysseyThemeProvider } from "../../OdysseyThemeProvider";
import type { SideNavProps } from "./types";
import { SideNavHeader } from "./SideNavHeader";
import {
  SideNavItemContent,
  StyledSideNavListItem,
} from "./SideNavItemContent";
import { SideNavFooterContent } from "./SideNavFooterContent";
import { SideNavItemContentContext } from "./SideNavItemContentContext";
import { SideNavToggleButton } from "./SideNavToggleButton";
import { SortableList } from "./SortableList/SortableList";
import { Overline } from "../../Typography";
import { arrayMove } from "@dnd-kit/sortable";
import { ErrorBoundary } from "react-error-boundary";

export const DEFAULT_SIDE_NAV_WIDTH = "300px";

// The side nav collapse icon is placed absolutely from the top (Logo container + nav header height)
// to align it in the middle of the nav header text
export const SIDENAV_COLLAPSE_ICON_POSITION = "77px";

const StyledCollapsibleContent = styled("div", {
  shouldForwardProp: (prop) =>
    prop !== "odysseyDesignTokens" && prop !== "isSideNavCollapsed",
})<{
  odysseyDesignTokens: DesignTokens;
  isSideNavCollapsed: boolean;
}>(({ odysseyDesignTokens, isSideNavCollapsed }) => ({
  position: "relative",
  display: "inline-grid",
  gridTemplateColumns: DEFAULT_SIDE_NAV_WIDTH,
  height: "100%",
  transition: `grid-template-columns ${odysseyDesignTokens.TransitionDurationMain}, opacity 300ms`,
  transitionTimingFunction: odysseyDesignTokens.TransitionTimingMain,
  overflow: "hidden",

  ...(isSideNavCollapsed && {
    gridTemplateColumns: 0,
    opacity: 0,
  }),
}));

const StyledOpacityTransitionContainer = styled("div", {
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
    display: "inline-grid",
    gridTemplateRows: "max-content 1fr max-content",
    height: "100%",
    transition: `opacity 50ms`,
    transitionTimingFunction: odysseyDesignTokens.TransitionTimingMain,
    overflow: "hidden",

    ...(isSideNavCollapsed && {
      opacity: 0,
    }),
  }),
);

const StyledSideNav = styled("nav", {
  shouldForwardProp: (prop) =>
    prop !== "odysseyDesignTokens" && prop !== "isSideNavCollapsed",
})<{
  odysseyDesignTokens: DesignTokens;
  isSideNavCollapsed: boolean;
}>(({ odysseyDesignTokens, isSideNavCollapsed }) => ({
  position: "relative",
  display: "inline-block",
  height: "100%",
  backgroundColor: odysseyDesignTokens.HueNeutralWhite,

  "&::after": {
    backgroundColor: odysseyDesignTokens.HueNeutral200,
    content: "''",
    height: "100%",
    opacity: 0,
    position: "absolute",
    right: 0,
    top: 0,
    transform: `translateX(0)`,
    transition: `opacity ${odysseyDesignTokens.TransitionDurationMain}, transform ${odysseyDesignTokens.TransitionDurationMain}`,
    width: odysseyDesignTokens.Spacing2,
    zIndex: 2,
  },

  "&:has([data-sidenav-toggle='true']:hover), &:has([data-sidenav-toggle='true']:focus-visible)":
    {
      ...(isSideNavCollapsed && {
        "&::after": {
          opacity: 1,
          transform: `translateX(100%)`,
        },

        "[data-sidenav-toggle='true']": {
          transform: `translate3d(calc(100% + ${odysseyDesignTokens.Spacing3}), 0, 0)`,
        },
      }),
    },

  "[data-sidenav-toggle='true']": {
    position: "absolute",
    top: SIDENAV_COLLAPSE_ICON_POSITION,
    right: 0,
    transition: `transform ${odysseyDesignTokens.TransitionDurationMain}`,
    transform: `translate3d(100%, 0, 0)`,
  },
}));

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
    flexShrink: 0,
    // The bottom border should appear only if the scrollable region has been scrolled
    ...(hasContentScrolled &&
      ({
        borderBottom: `${odysseyDesignTokens.BorderWidthMain} ${odysseyDesignTokens.BorderStyleMain} ${odysseyDesignTokens.HueNeutral50}`,
      } satisfies CSSObject)),
  }),
);

const SideNavListContainer = styled("ul")(() => ({
  padding: 0,
  listStyle: "none",
  listStyleType: "none",
  margin: 0,
}));

const SideNavScrollableContainer = styled("div", {
  shouldForwardProp: (prop) => prop !== "odysseyDesignTokens",
})<{ odysseyDesignTokens: DesignTokens }>(({ odysseyDesignTokens }) => ({
  display: "grid",
  gridTemplateRows: "1fr max-content",
  flex: "1 1 100%",
  overflowY: "scroll",
  paddingInline: odysseyDesignTokens.Spacing2,
}));

const SectionHeaderContainer = styled("li", {
  shouldForwardProp: (prop) => prop !== "odysseyDesignTokens",
})<{ odysseyDesignTokens: DesignTokens }>(({ odysseyDesignTokens }) => ({
  paddingBlock: odysseyDesignTokens.Spacing1,
  paddingInline: odysseyDesignTokens.Spacing4,
  marginBlock: `${odysseyDesignTokens.Spacing3}`,
  color: odysseyDesignTokens.HueNeutral600,
}));

const SideNavFooter = styled("div", {
  shouldForwardProp: (prop) => prop !== "odysseyDesignTokens",
})<{ odysseyDesignTokens: DesignTokens }>(({ odysseyDesignTokens }) => ({
  flexShrink: 0,
  padding: odysseyDesignTokens.Spacing4,
  backgroundColor: odysseyDesignTokens.HueNeutralWhite,
}));

const PersistentSideNavFooter = styled(SideNavFooter, {
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
    transitionProperty: "box-shadow",
    transitionDuration: odysseyDesignTokens.TransitionDurationMain,
    transitionTiming: odysseyDesignTokens.TransitionTimingMain,
    zIndex: 2,
    // The box shadow should appear above the footer only if the scrollable region has overflow
    ...(isContentScrollable && {
      boxShadow: "0px -8px 8px -8px rgba(39, 39, 39, 0.08)",
    }),
  }),
);

const SideNavFooterItemsContainer = styled("div", {
  shouldForwardProp: (prop) => prop !== "odysseyDesignTokens",
})<{ odysseyDesignTokens: DesignTokens }>(({ odysseyDesignTokens }) => ({
  display: "flex",
  flexWrap: "wrap",
  alignItems: "center",
  fontSize: odysseyDesignTokens.TypographySizeOverline,

  "a, span": {
    color: odysseyDesignTokens.HueNeutral600,
    transition: `color ${odysseyDesignTokens.TransitionDurationMain}`,

    "&:visited": {
      color: odysseyDesignTokens.HueNeutral600,
    },

    "&:hover": {
      textDecoration: "none",
      color: odysseyDesignTokens.HueNeutral900,
    },
  },
}));

const LoadingItemContainer = styled("div", {
  shouldForwardProp: (prop) => prop !== "odysseyDesignTokens",
})<{ odysseyDesignTokens: DesignTokens }>(({ odysseyDesignTokens }) => ({
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
  appName,
  footerComponent,
  footerItems,
  hasCustomFooter,
  isCollapsible,
  isCompact,
  isLoading,
  logoProps,
  onCollapse,
  onExpand,
  onSort,
  sideNavItems,
}: SideNavProps) => {
  const [isSideNavCollapsed, setSideNavCollapsed] = useState(false);
  const [hasContentScrolled, setHasContentScrolled] = useState(false);
  const [isContentScrollable, setIsContentScrollable] = useState(false);
  const scrollableContentRef = useRef<HTMLUListElement>(null);
  const resizeObserverRef = useRef<ResizeObserver | null>(null);
  const intersectionObserverRef = useRef<IntersectionObserver | null>(null);
  const odysseyDesignTokens: DesignTokens = useOdysseyDesignTokens();
  const { t } = useTranslation();
  const [sideNavItemsList, updateSideNavItemsList] = useState(sideNavItems);

  const blankElement = useMemo(() => <div />, []);

  // The default value (sideNavItems) passed to useState is ONLY used by the useState hook for
  // the very first value. Subsequent updates to the prop (sideNavItems) need to cause the state
  // to update!
  useEffect(() => updateSideNavItemsList(sideNavItems), [sideNavItems]);

  useEffect(() => {
    // This is called directly in this effect AND perhaps as a result of the ResizeObserver
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
  }, [sideNavItemsList]);

  const scrollIntoViewRef = useRef<HTMLLIElement>(null);
  /**
   * Look through the sideNavItems and determine which is the first node
   * with isSelected. This should be the node we set a ref on in order to
   * call scrollIntoView in the effect
   */
  const firstSideNavItemIdWithIsSelected = useMemo(() => {
    const flattenedItems = sideNavItemsList.flatMap((sideNavItem) =>
      sideNavItem.nestedNavItems
        ? [sideNavItem, ...sideNavItem.nestedNavItems]
        : sideNavItem,
    );
    const firstItemWithIsSelected = flattenedItems.find(
      (sideNavItem) => sideNavItem.isSelected,
    );
    return firstItemWithIsSelected?.id;
  }, [sideNavItemsList]);
  /**
   * Once we've rendered and if we have an item to scroll to, do the scroll action.
   * This must rely on checking firstSideNavItemIdWithIsSelected or it will not run
   * once the actual ref is populated.
   */
  useEffect(() => {
    if (firstSideNavItemIdWithIsSelected && scrollIntoViewRef.current) {
      scrollIntoViewRef.current.scrollIntoView();
    }
  }, [firstSideNavItemIdWithIsSelected]);

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

  const setSelectedItem = useCallback(
    (selectedItemId: string) => {
      const updatedSideNavItems = sideNavItemsList.map((item) => {
        if (item.id === selectedItemId) {
          item.isSelected = true;
        } else if (item.isSelected) {
          delete item.isSelected;
        }

        return item.nestedNavItems
          ? {
              ...item,
              nestedNavItems: item.nestedNavItems.map((childItem) => {
                if (childItem.id === selectedItemId) {
                  childItem.isSelected = true;
                } else if (childItem.isSelected) {
                  delete childItem.isSelected;
                }
                return childItem;
              }),
            }
          : item;
      });
      updateSideNavItemsList(updatedSideNavItems);
    },
    [sideNavItemsList],
  );

  const processedSideNavItems = useMemo(() => {
    return sideNavItemsList?.map((item) => ({
      ...item,
      childNavItems: item.nestedNavItems?.map((childProps) => {
        return {
          id: childProps.id,
          isSelected: childProps.isSelected,
          isDisabled: childProps.isDisabled,
          isSortable: childProps.isSortable,
          navItem: (
            <SideNavItemContentContext.Provider
              value={{
                ...sideNavItemContentProviderValue,
                depth: 2,
                isSortable: item.isSortable,
              }}
              key={childProps.id}
            >
              <SideNavItemContent
                {...childProps}
                endIcon={childProps.endIcon}
                scrollRef={getRefIfThisIsFirstNodeWithIsSelected(childProps.id)}
                onItemSelected={setSelectedItem}
              />
            </SideNavItemContentContext.Provider>
          ),
        };
      }),
    }));
  }, [
    getRefIfThisIsFirstNodeWithIsSelected,
    sideNavItemsList,
    sideNavItemContentProviderValue,
    setSelectedItem,
  ]);

  const sideNavExpandClickHandler = useCallback(() => {
    if (isSideNavCollapsed) {
      onExpand?.();
    } else {
      onCollapse?.();
    }

    setSideNavCollapsed(!isSideNavCollapsed);
  }, [isSideNavCollapsed, setSideNavCollapsed, onExpand, onCollapse]);

  const sideNavExpandKeyHandler = useCallback<
    KeyboardEventHandler<HTMLButtonElement>
  >(
    (event) => {
      if (event?.key === "Enter" || event?.code === "Space") {
        event.preventDefault();
        sideNavExpandClickHandler();
      }
    },
    [sideNavExpandClickHandler],
  );

  const setSortedItems = useCallback(
    (parentId: string, activeIndex: number, overIndex: number) => {
      const sortedSideNavItems = sideNavItemsList.map((item) =>
        item.id === parentId && item.nestedNavItems
          ? {
              ...item,
              nestedNavItems: arrayMove(
                item.nestedNavItems,
                activeIndex,
                overIndex,
              ),
            }
          : item,
      );
      updateSideNavItemsList(sortedSideNavItems);
      onSort?.(sortedSideNavItems);
    },
    [onSort, sideNavItemsList],
  );

  return (
    <StyledSideNav
      aria-label={t("navigation.label")}
      id="side-nav-expandable"
      isSideNavCollapsed={isSideNavCollapsed}
      odysseyDesignTokens={odysseyDesignTokens}
    >
      {isCollapsible && (
        <SideNavToggleButton
          ariaControls="side-nav-expandable"
          isSideNavCollapsed={isSideNavCollapsed}
          onClick={sideNavExpandClickHandler}
          onKeyDown={sideNavExpandKeyHandler}
        />
      )}
      <OdysseyThemeProvider>
        <StyledCollapsibleContent
          data-se="collapsible-region"
          isSideNavCollapsed={isSideNavCollapsed}
          odysseyDesignTokens={odysseyDesignTokens}
        >
          <StyledOpacityTransitionContainer
            isSideNavCollapsed={isSideNavCollapsed}
            odysseyDesignTokens={odysseyDesignTokens}
          >
            <SideNavHeaderContainer
              odysseyDesignTokens={odysseyDesignTokens}
              hasContentScrolled={hasContentScrolled}
            >
              <SideNavHeader
                appName={appName}
                isLoading={isLoading}
                logoProps={logoProps}
              />
            </SideNavHeaderContainer>
            <SideNavScrollableContainer
              odysseyDesignTokens={odysseyDesignTokens}
              data-se="scrollable-region"
            >
              <SideNavListContainer role="none" ref={scrollableContentRef}>
                {isLoading
                  ? Array(6)
                      .fill(null)
                      .map((_, index) => <LoadingItem key={index} />)
                  : processedSideNavItems?.map((item) => {
                      const {
                        id,
                        label,
                        isSectionHeader,
                        startIcon,
                        childNavItems,
                        isSortable,
                        isDefaultExpanded,
                        isDisabled,
                        isExpanded,
                      } = item;

                      if (isSectionHeader) {
                        return (
                          <ErrorBoundary fallback={blankElement}>
                            <SectionHeaderContainer
                              id={id}
                              key={id}
                              odysseyDesignTokens={odysseyDesignTokens}
                            >
                              <Overline component="h3">{label}</Overline>
                            </SectionHeaderContainer>
                          </ErrorBoundary>
                        );
                      } else if (childNavItems) {
                        return (
                          <ErrorBoundary fallback={blankElement}>
                            <StyledSideNavListItem
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
                                <SideNavListContainer role="none">
                                  {isSortable ? (
                                    <SortableList
                                      parentId={item.id}
                                      items={childNavItems}
                                      onChange={setSortedItems}
                                      renderItem={(sortableItem) => (
                                        <SortableList.Item
                                          id={sortableItem.id}
                                          isDisabled={sortableItem.isDisabled}
                                          isSelected={sortableItem.isSelected}
                                          isSortable={sortableItem.isSortable}
                                        >
                                          {sortableItem.navItem}
                                        </SortableList.Item>
                                      )}
                                    />
                                  ) : (
                                    childNavItems.map((item) => item.navItem)
                                  )}
                                </SideNavListContainer>
                              </NavAccordion>
                            </StyledSideNavListItem>
                          </ErrorBoundary>
                        );
                      } else {
                        return (
                          <ErrorBoundary fallback={blankElement}>
                            <SideNavItemContentContext.Provider
                              key={item.id}
                              value={sideNavItemContentProviderValue}
                            >
                              <SideNavItemContent
                                {...item}
                                endIcon={item.endIcon}
                                key={item.id}
                                onItemSelected={setSelectedItem}
                                scrollRef={getRefIfThisIsFirstNodeWithIsSelected(
                                  item.id,
                                )}
                                startIcon={item.startIcon}
                              />
                            </SideNavItemContentContext.Provider>
                          </ErrorBoundary>
                        );
                      }
                    })}
              </SideNavListContainer>
              {!isLoading && footerItems && !hasCustomFooter && (
                <SideNavFooter odysseyDesignTokens={odysseyDesignTokens}>
                  <SideNavFooterItemsContainer
                    odysseyDesignTokens={odysseyDesignTokens}
                  >
                    <SideNavFooterContent footerItems={footerItems} />
                  </SideNavFooterItemsContainer>
                </SideNavFooter>
              )}
            </SideNavScrollableContainer>
            {!isLoading && !footerItems && hasCustomFooter && (
              <PersistentSideNavFooter
                isContentScrollable={isContentScrollable}
                odysseyDesignTokens={odysseyDesignTokens}
              >
                {footerComponent}
              </PersistentSideNavFooter>
            )}
          </StyledOpacityTransitionContainer>
        </StyledCollapsibleContent>
      </OdysseyThemeProvider>
    </StyledSideNav>
  );
};

const MemoizedSideNav = memo(SideNav);
MemoizedSideNav.displayName = "SideNav";

export { MemoizedSideNav as SideNav };
