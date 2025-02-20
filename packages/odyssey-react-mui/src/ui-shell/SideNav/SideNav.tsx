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
  useRef,
  useEffect,
  KeyboardEventHandler,
  CSSProperties,
} from "react";
import { Skeleton } from "@mui/material";
import { useTranslation } from "react-i18next";
import { arrayMove } from "@dnd-kit/sortable";
import { UniqueIdentifier } from "@dnd-kit/core";
import { ErrorBoundary } from "react-error-boundary";
import { Property } from "csstype";

import { ContrastColors } from "../../createContrastColors.js";
import { NavAccordion } from "./NavAccordion.js";
import {
  DesignTokens,
  useOdysseyDesignTokens,
} from "../../OdysseyDesignTokensContext.js";
import { OdysseyThemeProvider } from "../../OdysseyThemeProvider.js";
import type { SideNavProps } from "./types.js";
import { SideNavHeader } from "./SideNavHeader.js";
import {
  SideNavItemContent,
  StyledSideNavListItem,
} from "./SideNavItemContent.js";
import { SideNavFooterContent } from "./SideNavFooterContent.js";
import { SideNavItemContentContext } from "./SideNavItemContentContext.js";
import { SideNavToggleButton } from "./SideNavToggleButton.js";
import { SortableList } from "./SortableList/SortableList.js";
import { Overline } from "../../Typography.js";
import {
  UiShellColors,
  useUiShellContext,
} from "../../ui-shell/UiShellProvider.js";

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

  ...(isSideNavCollapsed &&
    ({
      gridTemplateColumns: 0,
      opacity: 0,
    } as CSSProperties)),
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

    ...(isSideNavCollapsed &&
      ({
        opacity: 0,
      } as CSSProperties)),
  }),
);

const StyledSideNavContainer = styled("nav", {
  shouldForwardProp: (prop) =>
    prop !== "backgroundColor" &&
    prop !== "odysseyDesignTokens" &&
    prop !== "isAppContentWhiteBackground" &&
    prop !== "isSideNavCollapsed",
})<{
  isAppContentWhiteBackground: boolean;
  backgroundColor?: UiShellColors["sideNavBackgroundColor"];
  isSideNavCollapsed: boolean;
  odysseyDesignTokens: DesignTokens;
}>(
  ({
    backgroundColor,
    isAppContentWhiteBackground,
    isSideNavCollapsed,
    odysseyDesignTokens,
  }) => ({
    position: "relative",
    display: "inline-block",
    height: "100%",
    backgroundColor: backgroundColor || odysseyDesignTokens.HueNeutralWhite,

    ...(isAppContentWhiteBackground &&
      ({
        borderRightWidth: odysseyDesignTokens.BorderWidthMain,
        borderRightStyle:
          odysseyDesignTokens.BorderStyleMain as Property.BorderRightStyle,
        borderRightColor: odysseyDesignTokens.HueNeutral100,
      } as CSSProperties)),

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
        ...(isSideNavCollapsed &&
          ({
            "&::after": {
              opacity: 1,
              transform: `translateX(100%)`,
            } as CSSProperties,

            "[data-sidenav-toggle='true']": {
              transform: `translate3d(calc(100% + ${odysseyDesignTokens.Spacing3}), 0, 0)`,
            } as CSSProperties,
          } as CSSProperties)),
      },

    "[data-sidenav-toggle='true']": {
      position: "absolute",
      top: SIDENAV_COLLAPSE_ICON_POSITION,
      right: 0,
      transition: `transform ${odysseyDesignTokens.TransitionDurationMain}`,
      transform: `translate3d(100%, 0, 0)`,
    },
  }),
);

const StyledSideNavHeaderContainer = styled("div", {
  shouldForwardProp: (prop) =>
    prop !== "borderColor" &&
    prop !== "hasContentScrolled" &&
    prop !== "odysseyDesignTokens",
})<{
  borderColor: ContrastColors["fontColor"];
  hasContentScrolled: boolean;
  odysseyDesignTokens: DesignTokens;
}>(({ borderColor, hasContentScrolled, odysseyDesignTokens }) => ({
  flexShrink: 0,
  // The bottom border should appear only if the scrollable region has been scrolled
  ...(hasContentScrolled &&
    ({
      borderBottomWidth: odysseyDesignTokens.BorderWidthMain,
      borderBottomStyle: odysseyDesignTokens.BorderStyleMain,
      borderBottomColor: odysseyDesignTokens.HueNeutral100,

      ...(borderColor &&
        ({
          borderBottomColor: borderColor.concat("15"),
        } as CSSProperties)),
    } as CSSProperties)),
}));

const StyledSideNavListContainer = styled("ul")(() => ({
  padding: 0,
  listStyle: "none",
  listStyleType: "none",
  margin: 0,
}));

const StyledSideNavScrollableContainer = styled("div", {
  shouldForwardProp: (prop) => prop !== "odysseyDesignTokens",
})<{ odysseyDesignTokens: DesignTokens }>(({ odysseyDesignTokens }) => ({
  display: "grid",
  gridTemplateRows: "1fr max-content",
  flex: "1 1 100%",
  overflowY: "auto",
  paddingInline: odysseyDesignTokens.Spacing2,
}));

const StyledSectionHeaderContainer = styled("li", {
  shouldForwardProp: (prop) =>
    prop !== "odysseyDesignTokens" && prop !== "contrastFontColor",
})(
  ({
    contrastFontColor,
    odysseyDesignTokens,
  }: {
    contrastFontColor: ContrastColors["fontColor"];
    odysseyDesignTokens: DesignTokens;
  }) => ({
    paddingBlock: odysseyDesignTokens.Spacing1,
    paddingInline: odysseyDesignTokens.Spacing4,
    marginBlock: `${odysseyDesignTokens.Spacing3}`,
    color: contrastFontColor || odysseyDesignTokens.HueNeutral600,
  }),
);

const StyledSideNavFooter = styled("div", {
  shouldForwardProp: (prop) =>
    prop !== "odysseyDesignTokens" && prop !== "sideNavBackgroundColor",
})(
  ({
    odysseyDesignTokens,
    sideNavBackgroundColor,
  }: {
    odysseyDesignTokens: DesignTokens;
    sideNavBackgroundColor?: UiShellColors["sideNavBackgroundColor"];
  }) => ({
    flexShrink: 0,
    padding: odysseyDesignTokens.Spacing4,
    backgroundColor: odysseyDesignTokens.HueNeutralWhite,

    ...(sideNavBackgroundColor &&
      ({
        backgroundColor: sideNavBackgroundColor,
      } as CSSProperties)),
  }),
);

const StyledPersistentSideNavFooter = styled(StyledSideNavFooter, {
  shouldForwardProp: (prop) =>
    prop !== "isContentScrollable" &&
    prop !== "odysseyDesignTokens" &&
    prop !== "sideNavBackgroundColor",
})(
  ({
    isContentScrollable,
    odysseyDesignTokens,
    sideNavBackgroundColor,
  }: {
    isContentScrollable: boolean;
    odysseyDesignTokens: DesignTokens;
    sideNavBackgroundColor?: UiShellColors["sideNavBackgroundColor"];
  }) => ({
    transitionProperty: "box-shadow",
    transitionDuration: odysseyDesignTokens.TransitionDurationMain,
    transitionTiming: odysseyDesignTokens.TransitionTimingMain,
    zIndex: 2,

    // The box shadow should appear above the footer only if the scrollable region has overflow
    ...(isContentScrollable &&
      ({
        boxShadow: "0px -8px 8px -8px rgba(39, 39, 39, 0.08)",
      } as CSSProperties)),

    ...(sideNavBackgroundColor &&
      ({
        backgroundColor: sideNavBackgroundColor,
      } as CSSProperties)),
  }),
);

const StyledSideNavFooterItemsContainer = styled("div", {
  shouldForwardProp: (prop) =>
    prop !== "odysseyDesignTokens" && prop !== "sideNavContrastColors",
})<{
  odysseyDesignTokens: DesignTokens;
  sideNavContrastColors: UiShellColors["sideNavContrastColors"];
}>(({ odysseyDesignTokens, sideNavContrastColors }) => ({
  display: "flex",
  flexWrap: "wrap",
  alignItems: "center",
  fontSize: odysseyDesignTokens.TypographySizeOverline,

  "a, span": {
    color: odysseyDesignTokens.HueNeutral600,
    transition: `color ${odysseyDesignTokens.TransitionDurationMain}`,

    "&:visited": {
      color: odysseyDesignTokens.HueNeutral600,

      ...(sideNavContrastColors?.fontColor &&
        ({
          color: sideNavContrastColors?.fontColor,
        } as CSSProperties)),
    },

    "&:hover": {
      textDecoration: "none",
      color: odysseyDesignTokens.HueNeutral900,

      ...(sideNavContrastColors?.fontColor &&
        ({
          color: sideNavContrastColors?.fontColor,
        } as CSSProperties)),
    },

    ...(sideNavContrastColors?.fontColor &&
      ({
        color: sideNavContrastColors?.fontColor,
      } as CSSProperties)),
  },
}));

const StyledLoadingItemContainer = styled("div", {
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
    <StyledLoadingItemContainer odysseyDesignTokens={odysseyDesignTokens}>
      <Skeleton
        variant="circular"
        width={odysseyDesignTokens.Spacing4}
        height={odysseyDesignTokens.Spacing4}
      />
      <Skeleton variant="rounded" width="100%" />
    </StyledLoadingItemContainer>
  );
};

const SideNav = ({
  appName,
  footerComponent,
  footerItems,
  hasCustomFooter,
  isCollapsible,
  isCollapsed = false,
  isCompact,
  isLoading,
  logoProps,
  onCollapse,
  onExpand,
  onSort,
  sideNavItems,
}: SideNavProps) => {
  const [isSideNavCollapsed, setSideNavCollapsed] = useState(isCollapsed);
  const [hasContentScrolled, setHasContentScrolled] = useState(false);
  const [isContentScrollable, setIsContentScrollable] = useState(false);
  const [sideNavItemsList, updateSideNavItemsList] = useState(sideNavItems);

  const uiShellContext = useUiShellContext();
  const odysseyDesignTokens: DesignTokens = useOdysseyDesignTokens();
  const { t } = useTranslation();

  const scrollableContentRef = useRef<HTMLUListElement>(null);
  const resizeObserverRef = useRef<ResizeObserver | null>(null);
  const intersectionObserverRef = useRef<IntersectionObserver | null>(null);

  const blankElement = useMemo(() => <div />, []);

  // The default value (sideNavItems) passed to useState is ONLY used by the useState hook for
  // the very first value. Subsequent updates to the prop (sideNavItems) need to cause the state
  // to update!
  useEffect(() => updateSideNavItemsList(sideNavItems), [sideNavItems]);

  // update sidenav collapse status
  useEffect(() => setSideNavCollapsed(isCollapsed), [isCollapsed]);

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
                scrollRef={getRefIfThisIsFirstNodeWithIsSelected(childProps.id)}
                onItemSelected={setSelectedItem}
                translate={childProps.translate}
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
    (
      parentId: string,
      activeId: UniqueIdentifier,
      activeIndex: number,
      overIndex: number,
    ) => {
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
      onSort?.(sortedSideNavItems, parentId, activeId, activeIndex, overIndex);
    },
    [onSort, sideNavItemsList],
  );

  return (
    <StyledSideNavContainer
      aria-label={t("navigation.label")}
      backgroundColor={uiShellContext?.sideNavBackgroundColor}
      id="side-nav-expandable"
      isAppContentWhiteBackground={
        uiShellContext?.appBackgroundColor ===
        odysseyDesignTokens.HueNeutralWhite
      }
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
            {(appName || logoProps) && (
              <StyledSideNavHeaderContainer
                hasContentScrolled={hasContentScrolled}
                odysseyDesignTokens={odysseyDesignTokens}
                borderColor={uiShellContext?.sideNavContrastColors?.fontColor}
              >
                <SideNavHeader
                  appName={appName}
                  isLoading={isLoading}
                  logoProps={logoProps}
                />
              </StyledSideNavHeaderContainer>
            )}

            <StyledSideNavScrollableContainer
              odysseyDesignTokens={odysseyDesignTokens}
              data-se="scrollable-region"
            >
              <StyledSideNavListContainer
                role="none"
                ref={scrollableContentRef}
              >
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
                            <StyledSectionHeaderContainer
                              contrastFontColor={
                                uiShellContext?.sideNavContrastColors?.fontColor
                              }
                              id={id}
                              key={id}
                              odysseyDesignTokens={odysseyDesignTokens}
                            >
                              <Overline component="h3">{label}</Overline>
                            </StyledSectionHeaderContainer>
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
                                <StyledSideNavListContainer role="none">
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
                                </StyledSideNavListContainer>
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
              </StyledSideNavListContainer>
              {!isLoading && footerItems && !hasCustomFooter && (
                <StyledSideNavFooter
                  odysseyDesignTokens={odysseyDesignTokens}
                  sideNavBackgroundColor={
                    uiShellContext?.sideNavBackgroundColor
                  }
                >
                  <StyledSideNavFooterItemsContainer
                    odysseyDesignTokens={odysseyDesignTokens}
                    sideNavContrastColors={
                      uiShellContext?.sideNavContrastColors
                    }
                  >
                    <SideNavFooterContent footerItems={footerItems} />
                  </StyledSideNavFooterItemsContainer>
                </StyledSideNavFooter>
              )}
            </StyledSideNavScrollableContainer>
            {!isLoading && !footerItems && hasCustomFooter && (
              <StyledPersistentSideNavFooter
                isContentScrollable={isContentScrollable}
                odysseyDesignTokens={odysseyDesignTokens}
                sideNavBackgroundColor={uiShellContext?.sideNavBackgroundColor}
              >
                {footerComponent}
              </StyledPersistentSideNavFooter>
            )}
          </StyledOpacityTransitionContainer>
        </StyledCollapsibleContent>
      </OdysseyThemeProvider>
    </StyledSideNavContainer>
  );
};

const MemoizedSideNav = memo(SideNav);
MemoizedSideNav.displayName = "SideNav";

export { MemoizedSideNav as SideNav };
