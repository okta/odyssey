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
  navHeaderText: string;
  /**
   *  Determines whether the side nav is collapsible
   */
  isCollapsible?: boolean;
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
  /**
   * A CSS length string indicating the customizable expanded width of the SideNav container.
   * (it will be smaller if isCollapsible and collapsed)
   */
  expandedWidth?: string;
  /**
   * An optional logo to display in the header. If not provided, will default to the Okta logo
   */
  logo?: ReactElement;
} & (
  | {
      /**
       * Footer items in the side nav
       */
      footerItems?: SideNavFooterItem[];
      /**
       * footerComponent cannot be used if footerItems are defined
       */
      footerComponent?: never;
    }
  | {
      /**
       * footerItems cannot be used if footerComponent is defined
       */
      footerItems?: never;
      /**
       * The component to display as the footer; if present the `footerItems` are ignored and not rendered.
       */
      footerComponent?: ReactElement;
    }
) &
  Pick<HtmlProps, "testId">;

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
