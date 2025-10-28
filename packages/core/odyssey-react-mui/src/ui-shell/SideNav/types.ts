/*!
 * Copyright (c) 2024-present, Okta, Inc. and/or its affiliates. All rights reserved.
 * The Okta software accompanied by this notice is provided pursuant to the Apache License, Version 2.0 (the "License.")
 *
 * You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0.
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *
 * See the License for the specific language governing permissions and limitations under the License.
 */

import type { ReactElement, SyntheticEvent } from "react";

import { UniqueIdentifier } from "@dnd-kit/core";

import type { HtmlProps } from "../../HtmlProps.js";
import type { DesignTokens } from "../../OdysseyDesignTokensContext.js";
import type { statusSeverityValues } from "../../Status.js";

/**
 * Type representing spacing values from the design tokens.
 * odysseyDesignTokens.Spacing0, odysseyDesignTokens.Spacing1, etc.
 */
export type OdysseySpacingValue = DesignTokens[keyof Pick<
  DesignTokens,
  | "Spacing0"
  | "Spacing1"
  | "Spacing2"
  | "Spacing3"
  | "Spacing4"
  | "Spacing5"
  | "Spacing6"
  | "Spacing7"
  | "Spacing8"
  | "Spacing9"
>];

type LogoWithLink = {
  ariaLabel: string;
  href: string;
};
type LogoWithNoLink = {
  ariaLabel?: never;
  href?: never;
};

export type SideNavLogoProps = {
  isSameBackgroundAsMain?: boolean;
  /**
   * Event fired when the logo is clicked
   */
  onClick?: (event: SyntheticEvent) => void;
} & (LogoWithLink | LogoWithNoLink) &
  (
    | {
        imageAltText?: never;
        imageUrl?: never;
        /**
         * a component to render as the logo
         */
        logoComponent: ReactElement;
      }
    | {
        /**
         * alt text for the img logo
         */
        imageAltText: string;
        /**
         * The src url to render in an `img` tag
         */
        imageUrl: string;
        logoComponent?: never;
      }
    | {
        /**
         * alt text for the img logo
         */
        imageAltText?: never;
        /**
         * The src url to render in an `img` tag
         */
        imageUrl?: never;
        logoComponent?: never;
      }
  );

export type SideNavProps = {
  /**
   * Side Nav header text that is usually reserved to show the App name
   */
  appName?: string;
  /**
   *  If we want the collapse state to be based on session storage, then this needs to be `true`.
   */
  hasSessionStorageState?: boolean;
  /**
   *  Determines whether the side nav is collapsed by default. When `true`, side nav also closes once and item is clicked.
   */
  isCollapsed?: boolean;
  /**
   *  Determines whether the side nav is collapsible
   */
  isCollapsible?: boolean;
  /**
   *  Determines whether the side nav items use compact layout
   */
  isCompact?: boolean;
  /**
   *  Before the side nav has items, it will be in a loading state.
   */
  isLoading?: boolean;
  /**
   *  If the side nav is up too much screen real estate. For instance, if you're in a narrower view, and it displays next to the content.
   *
   * When `true`, side nav will close itself after nav items are clicked.
   */
  isObtrusive?: boolean;
  /**
   * Optional padding to apply to the start of the leaves (items which are not expanded).
   * Should be one of the Odyssey design token spacing values (e.g., odysseyDesignTokens.Spacing1, odysseyDesignTokens.Spacing2, etc.)
   */
  leavesPaddingStart?: OdysseySpacingValue;
  /**
   * An optional logo component or src string for an img to display in the header. If not provided, will default to the Okta logo
   */
  logoProps?: SideNavLogoProps;
  /**
   *  Triggers when the side nav is collapsed
   */
  onCollapse?: () => void;
  /**
   *  Triggers when the side nav is expanded
   */
  onExpand?: () => void;
  /**
   *  Triggers when the item is reordered
   */
  onSort?: (
    reorderedItems: SideNavItem[],
    parentId: string,
    activeId: UniqueIdentifier,
    activeIndex: number,
    overIndex: number,
  ) => void;
  /**
   * Nav items in the side nav
   */
  sideNavItems?: SideNavItem[];
} & (
  | {
      /**
       * The component to display as the footer; if present the `footerItems` are ignored and not rendered.
       */
      footerComponent?: ReactElement;
      footerItems?: never;
      hasCustomFooter: true;
    }
  | {
      footerComponent?: never;
      /**
       * Footer items in the side nav
       */
      footerItems?: SideNavFooterItem[];
      hasCustomFooter?: false;
    }
) &
  Pick<HtmlProps, "testId">;

export type SideNavItem = {
  /**
   * The number to display as a count alongside the nav item
   */
  count?: number;
  /**
   * The icon element to display after the nav item text. Only use this with images that don't have React context. Even the official Odyssey Icons use MUI which references the MUI theme in context and will error when rendered in Unified UI Shell.
   */
  endIcon?: ReactElement;
  id: string;
  /**
   * Whether the item is disabled. When set to true the nav item is set to Disabled color,
   * the link/item is not clickable, and item with nestedNavItems is not expandable.
   */
  isDisabled?: boolean;
  /**
   * Whether the item is active/selected
   */
  isSelected?: boolean;
  /**
   * Whether the item is sortable within a sortable list
   */
  isSortable?: boolean;
  label: string;
  /**
   * Event fired when the nav item is clicked
   */
  onClick?: (event: SyntheticEvent) => void;
  /**
   * The status element to display after the label
   */
  severity?: (typeof statusSeverityValues)[number];
  /**
   * The icon element to display before the nav item text. Only use this with images that don't have React context. Even the official Odyssey Icons use MUI which references the MUI theme in context and will error when rendered in Unified UI Shell.
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
      href?: never;
      isDefaultExpanded?: never;
      isExpanded?: never;
      /**
       * Determines if the side nav item is a section header
       */
      isSectionHeader: true;
      nestedNavItems?: never;
    }
  | {
      /**
       * link added to the nav item. if it is undefined, static text will be displayed.
       * fires onClick event when it is passed
       */
      href?: string;
      isDefaultExpanded?: never;
      isExpanded?: never;
      isSectionHeader?: never;
      nestedNavItems?: never;
    }
  | {
      href?: never;
      /**
       * Whether the accordion (nav item with nestedNavItems) is expanded by default
       */
      isDefaultExpanded?: boolean;
      /**
       * If true, expands the accordion, otherwise collapse it.
       * Setting this prop enables control over the accordion.
       */
      isExpanded?: boolean;
      /**
       * If true, enables sorting for the accordion items
       */
      isSectionHeader?: never;
      /**
       * An array of side nav items to be displayed as nestedNavItems within Accordion
       */
      nestedNavItems: Array<SideNavItem>;
    }
  | {
      href: string;
      isDefaultExpanded?: never;
      isExpanded?: never;
      isSectionHeader?: never;
      /**
       * An array of side nav items to be displayed as nestedNavItems within Accordion
       */
      nestedNavItems: Array<SideNavItem>;
    }
) &
  Pick<HtmlProps, "translate">;

export type SideNavFooterItem = {
  href?: string;
  id: string;
  label: string;
};
