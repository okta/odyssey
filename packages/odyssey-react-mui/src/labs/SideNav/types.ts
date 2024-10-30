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

import type { ReactElement } from "react";
import type { HtmlProps } from "../../HtmlProps";
import type { statusSeverityValues } from "../../Status";

export type SideNavProps = {
  /**
   * Side Nav header text that is usually reserved to show the App name
   */
  appName: string;
  /**
   * A CSS length string indicating the customizable expanded width of the SideNav container.
   * (it will be smaller if isCollapsible and collapsed)
   */
  expandedWidth?: string;
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
   * An optional logo to display in the header. If not provided, will default to the Okta logo
   */
  logo?: ReactElement;
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
} & (
  | {
      /**
       * An optional logo to display in the header. If not provided, will default to the Okta logo.
       */
      customCompanyLogo: ReactElement;
      /**
       * Use the built-in Okta logo or a custom one.
       */
      hasCustomCompanyLogo: true;
    }
  | {
      customCompanyLogo?: never;
      hasCustomCompanyLogo?: false;
    }
) &
  (
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
   * The icon element to display at the end of the Nav Item
   */
  endIcon?: ReactElement;
  id: string;
  /**
   * Whether the item is disabled. When set to true the nav item is set to Disabled color,
   * the link/item is not clickable, and item with children is not expandable.
   */
  isDisabled?: boolean;
  /**
   * Whether the item is active/selected
   */
  isSelected?: boolean;
  label: string;
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
      children?: never;
      href?: never;
      isDefaultExpanded?: never;
      isExpanded?: never;
      /**
       * Determines if the side nav item is a section header
       */
      isSectionHeader: true;
    }
  | {
      children?: never;
      /**
       * link added to the nav item. if it is undefined, static text will be displayed.
       * fires onClick event when it is passed
       */
      href?: string;
      isDefaultExpanded?: never;
      isExpanded?: never;
      isSectionHeader?: never;
    }
  | {
      /**
       * An array of side nav items to be displayed as children within Accordion
       */
      children?: Array<Omit<SideNavItem, "startIcon" | "endIcon">>;
      endIcon?: never;
      href?: never;
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
    }
);

export type SideNavFooterItem = {
  href?: string;
  id: string;
  label: string;
};
