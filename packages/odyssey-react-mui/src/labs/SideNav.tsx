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
  ReactElement,
  ReactNode,
  useCallback,
  KeyboardEvent,
  useImperativeHandle,
  useRef,
  useEffect,
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
   * Whether the item is disabled. When set to true the nav item is set to Disabled color,
   * the link/item is not clickable, and item with children is not expandable.
   */
  isDisabled?: boolean;
  /**
   * Whether the item is active/selected
   */
  isSelected?: boolean;
  /**
   * Event fired when the nav item is clicked
   */
  onClick?(): void;
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
  /**
   * The link target prop. e.g., "_blank"
   */
  target?: string;
} & (
  | {
      /**
       * Determines if the side nav item is a section header
       */
      isSectionHeader: true;
      href?: never;
      children?: never;
      isDefaultExpanded?: never;
      isExpanded?: never;
    }
  | {
      /**
       * link added to the nav item. if it is undefined, static text will be displayed.
       * fires onClick event when it is passed
       */
      href: string;
      children?: never;
      isSectionHeader?: never;
      isDefaultExpanded?: never;
      isExpanded?: never;
    }
  | {
      /**
       * An array of side nav items to be displayed as children within Accordion
       */
      children?: SideNavItem[];
      /**
       * Whether the accordion (nav item with children) is expanded by default
       */
      isDefaultExpanded?: boolean;
      /**
       * If true, expands the accordion, otherwise collapse it.
       * Setting this prop enables control over the accordion.
       */
      isExpanded?: boolean;
      isSectionHeader?: never;
      href?: never;
    }
);

export type SideNavFooterItem = {
  href?: string;
  id: string;
  label: string;
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
   *  Triggers when the side nav is expanded
   */
  onExpand?(): void;
  /**
   * Nav items in the side nav
   */
  sideNavItems: SideNavItem[];
} & Pick<HtmlProps, "testId">;

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
    transitionProperty: "opacity, width",
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

const CollapseIcon = memo(({ onClick }: { onClick?(): void }): ReactElement => {
  const odysseyDesignTokens = useOdysseyDesignTokens();

  const collapseButtonStyles = useMemo(
    () => ({
      "& > button": {
        height: odysseyDesignTokens.Spacing6,
        width: odysseyDesignTokens.Spacing6,
        color: odysseyDesignTokens.HueNeutral400,
      },
    }),
    [odysseyDesignTokens],
  );

  return (
    <Box sx={collapseButtonStyles}>
      <Button
        tabIndex={0}
        variant="secondary"
        onClick={onClick}
        startIcon={<CollapseLeftIcon />}
        ariaLabel="collapse side navigation"
      />
    </Box>
  );
});

const SideNavHeader = memo(
  ({
    navHeaderText,
    isCollapsible,
    onCollapse,
  }: Pick<
    SideNavProps,
    "navHeaderText" | "isCollapsible" | "onCollapse"
  >): ReactNode => {
    const odysseyDesignTokens = useOdysseyDesignTokens();

    const sideNavHeaderStyles = useMemo(
      () => ({
        marginTop: odysseyDesignTokens.Spacing2,
      }),
      [odysseyDesignTokens],
    );

    return (
      <SideNavHeaderContainer odysseyDesignTokens={odysseyDesignTokens}>
        <Box sx={sideNavHeaderStyles}>
          <Heading6>{navHeaderText}</Heading6>
        </Box>
        {isCollapsible && <CollapseIcon onClick={onCollapse} />}
      </SideNavHeaderContainer>
    );
  },
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
  margin: `${odysseyDesignTokens.Spacing1} 0`,
  "&:last-child": {
    marginBottom: odysseyDesignTokens.Spacing2,
  },
  "& a": {
    display: "flex",
    alignItems: "center",
    width: "100%",
    minHeight: "48px",
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
    outlineWidth: odysseyDesignTokens.FocusOutlineWidthMain,
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

const SideNavItemLinkContent = memo(
  ({
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

    const sideNavItemContentStyles = useMemo(
      () => ({
        marginLeft: odysseyDesignTokens.Spacing2,
      }),
      [odysseyDesignTokens],
    );

    return (
      <>
        {startIcon && startIcon}
        <SideNavItemLabelContainer
          odysseyDesignTokens={odysseyDesignTokens}
          isIconVisible={Boolean(startIcon)}
        >
          {label}
          {severity && (
            <Box sx={sideNavItemContentStyles}>
              <Status severity={severity} label={statusLabel || ""} />
            </Box>
          )}
        </SideNavItemLabelContainer>
        {endIcon && endIcon}
      </>
    );
  },
);

const scrollToNode = (node: HTMLElement | null) => {
  if (node) {
    node?.scrollIntoView({
      behavior: "instant",
      block: "end",
      inline: "nearest",
    });
  }
};

type ScrollIntoViewHandle = {
  scrollIntoView: () => void;
};

const SideNavItemContent = memo(
  ({
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
    scrollRef,
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
  > & {
    /**
     * The ref used to scroll to this item
     */
    scrollRef?: React.RefObject<ScrollIntoViewHandle>;
  }) => {
    const localScrollRef = useRef<HTMLLIElement>(null);
    useImperativeHandle(
      scrollRef,
      () => {
        return {
          scrollIntoView: () => {
            scrollToNode(localScrollRef.current);
          },
        };
      },
      [],
    );
    const odysseyDesignTokens = useOdysseyDesignTokens();

    const NavItemContentClickContainer = styled("div", {
      shouldForwardProp: (prop) => prop !== "odysseyDesignTokens",
    })(() => ({
      display: "flex",
      alignItems: "center",
      width: "100%",
      minHeight: "48px",
      padding: `${odysseyDesignTokens.Spacing3} ${odysseyDesignTokens.Spacing4}`,
      color: `${isDisabled ? odysseyDesignTokens.TypographyColorDisabled : odysseyDesignTokens.TypographyColorHeading} !important`,
      "&:focus-visible": {
        borderRadius: 0,
        outlineColor: odysseyDesignTokens.FocusOutlineColorPrimary,
        outlineStyle: odysseyDesignTokens.FocusOutlineStyle,
        outlineWidth: odysseyDesignTokens.FocusOutlineWidthMain,
        backgroundColor: odysseyDesignTokens.HueNeutral50,
        textDecoration: "none",
      },
    }));

    const sideNavItemContentKeyHandler = useCallback(
      (event: KeyboardEvent<HTMLDivElement>) => {
        if (event?.key === "Enter") {
          event.preventDefault();
          onClick?.();
        }
      },
      [onClick],
    );

    return (
      <SideNavListItemContainer
        ref={localScrollRef}
        id={id}
        key={id}
        disabled={isDisabled}
        aria-disabled={isDisabled}
        isDisabled={isDisabled}
        isSelected={isSelected}
        odysseyDesignTokens={odysseyDesignTokens}
      >
        {
          // Use Link for nav items with links and div for disabled or non-link items
          isDisabled ? (
            <NavItemContentClickContainer>
              <SideNavItemLinkContent
                label={label}
                startIcon={startIcon}
                endIcon={endIcon}
                statusLabel={statusLabel}
                severity={severity}
              />
            </NavItemContentClickContainer>
          ) : !href ? (
            <NavItemContentClickContainer
              role="button"
              tabIndex={0}
              onClick={onClick}
              onKeyDown={sideNavItemContentKeyHandler}
            >
              <SideNavItemLinkContent
                label={label}
                startIcon={startIcon}
                endIcon={endIcon}
                statusLabel={statusLabel}
                severity={severity}
              />
            </NavItemContentClickContainer>
          ) : (
            <Link href={href} target={target} onClick={onClick}>
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
  },
);

const SideNavFooterContent = memo(
  (footerItems: SideNavFooterItem[]): ReactNode => {
    const odysseyDesignTokens = useOdysseyDesignTokens();

    const footerContent = useMemo(() => {
      return footerItems?.map((item, index) => (
        <Box
          key={`${item.id}-wrapper`}
          sx={{
            display: "flex",
          }}
        >
          {item.href ? (
            <Link key={item.id} href={item.href}>
              {item.label}
            </Link>
          ) : (
            <Box component="span" key={item.id}>
              {item.label}
            </Box>
          )}
          {index < footerItems.length - 1 && (
            <Box
              key={`${item.id}-separator`}
              sx={{
                marginLeft: odysseyDesignTokens.Spacing4,
                marginRight: odysseyDesignTokens.Spacing4,
                color: odysseyDesignTokens.HueNeutral300,
              }}
            >
              |
            </Box>
          )}
        </Box>
      ));
    }, [footerItems, odysseyDesignTokens]);

    return footerContent;
  },
);

const SideNav = ({
  navHeaderText,
  isCollapsible,
  onCollapse,
  onExpand,
  sideNavItems,
  footerItems,
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
    }),
    [],
  );

  const sideNavHeaderContainerStyles = useMemo(
    () => ({
      position: "sticky",
      top: 0,
    }),
    [],
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
        data-testid="collapsed-region"
        data-aria-label="expand side navigation"
      >
        <ExpandLeftIcon sx={expandLeftIconStyles} />
      </SideNavCollapsedContainer>
      <SideNavExpandContainer
        odysseyDesignTokens={odysseyDesignTokens}
        isSideNavCollapsed={isSideNavCollapsed}
        data-testid="expanded-region"
      >
        <Box sx={sideNavHeaderContainerStyles}>
          <SideNavHeader
            navHeaderText={navHeaderText}
            isCollapsible={isCollapsible}
            onCollapse={sideNavCollapseHandler}
          />
        </Box>
        <Box sx={sideNavListContainerStyles}>
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
        {footerItems && (
          <Box sx={sideNavFooterContainerStyles}>
            <SideNavFooterContainer odysseyDesignTokens={odysseyDesignTokens}>
              {SideNavFooterContent(footerItems)}
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
