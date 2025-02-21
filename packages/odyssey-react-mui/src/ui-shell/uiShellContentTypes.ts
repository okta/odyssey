/*!
 * Copyright (c) 2025-present, Okta, Inc. and/or its affiliates. All rights reserved.
 * The Okta software accompanied by this notice is provided pursuant to the Apache License, Version 2.0 (the "License.")
 *
 * You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0.
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *
 * See the License for the specific language governing permissions and limitations under the License.
 */

import { ReactElement } from "react";
import { ErrorBoundaryProps } from "react-error-boundary";

import { AppSwitcherProps } from "./AppSwitcher/AppSwitcher.js";
import { SideNavProps } from "./SideNav/types.js";
import { TopNavProps } from "./TopNav/TopNav.js";

export const subComponentNames = ["TopNav", "SideNav", "AppSwitcher"] as const;
export type SubComponentName = (typeof subComponentNames)[number];

export type UiShellNavComponentProps = {
  /**
   * Object that gets pass directly to the app switcher component.
   */
  appSwitcherProps?: AppSwitcherProps;
  /**
   * Object that gets pass directly to the side nav component. If `undefined` and in `initialVisibleSections`, SideNav will be initially rendered. Pass `null` to hide a previously-visible SideNav.
   */
  sideNavProps?: Omit<SideNavProps, "footerComponent"> | null;
  /**
   * Object that gets pass directly to the top nav component. If `undefined` and in `initialVisibleSections`, TopNav will be initially rendered. Pass `null` to hide a previously-visible TopNav.
   */
  topNavProps?: Omit<
    TopNavProps,
    "leftSideComponent" | "rightSideComponent"
  > | null;
};

export type UiShellContentProps = {
  /**
   * When passed, the app is expected to render into this element, not the Shadow DOM. UI Shell will position this element appropriately as if it was rendered in the app content area of the Shadow DOM.
   */
  appContainerElement: HTMLDivElement;
  /**
   * Controls the scrolling behavior of the app content area. Defaults to "vertical".
   */
  appContainerScrollingMode: "none" | "horizontal" | "vertical" | "both";
  /**
   * defaults to `true`. If `false`, the content area will have no padding provided
   */
  hasStandardAppContentPadding?: boolean;
  /**
   * Which parts of the UI Shell should be visible initially? For example,
   * if sideNavProps is undefined, should the space for the sidenav be initially visible?
   */
  initialVisibleSections?: SubComponentName[];
  /**
   * Notifies when a React rendering error occurs. This could be useful for logging, flagging "p0"s, and recovering UI Shell when errors occur.
   */
  onError?: ErrorBoundaryProps["onError"];
  /**
   * Components that will render as children of various other components such as the top nav or side nav.
   */
  optionalComponents?: {
    /**
     * Spot for banners to go at the top of the page.
     */
    banners?: ReactElement;
    /**
     * In narrow view, this is the right-side menu area.
     */
    rightSideMenu?: ReactElement;
    /**
     * Footer in the side nav.
     */
    sideNavFooter?: SideNavProps["footerComponent"];
    /**
     * Top nav is divided into 2 parts. This is the left-aligned half.
     */
    topNavLeftSide?: TopNavProps["leftSideComponent"];
    /**
     * Top nav is divided into 2 parts. This is the right-aligned half.
     */
    topNavRightSide?: TopNavProps["rightSideComponent"];
  };
};
