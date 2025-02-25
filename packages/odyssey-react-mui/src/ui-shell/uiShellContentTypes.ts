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
   * **WARNING:** UI Shell will modify the styling of this element.
   * HTML element where the app gets rendered. This typically called the React root element for your app.
   *
   * When passed, the app is expected to render into this element, not the Shadow DOM.
   *
   * UI Shell will position this element appropriately to match the content area inside the Shadow DOM.
   *
   * A major benefit to having this element separate from UI Shell is related to encapsulation. UI Shell has the capability of rendering inside a web component, but in doing so, the app would be subject to the styles in the web component and not the page itself.
   * The app should either be in its own web component or use the global styles, and having this separate element allows us to accomplish that goal.
   */
  appElement: HTMLDivElement;
  /**
   * Controls the scrolling behavior of the app element area.
   *
   * In the case of an app wanting to control their own scrolling, use `"none"`.
   *
   * Most apps will want to use `"vertical"` and let UI Shell manage scrolling behavior.
   */
  appElementScrollingMode: "none" | "horizontal" | "vertical" | "both";
  /**
   * This is the element used inside `appElement` for scrolling.
   *
   * UI Shell will handle scrolling itself, but some apps already have an element maintaining the scroll position, and for UI Shell to work properly, it needs to be passed in.
   */
  appScrollElement?: HTMLElement;
  /**
   * Defaults to `true`.
   *
   * If `false`, the content area will have no padding provided. This is for the case where an app wants to manage this separate from UI Shell.
   */
  hasStandardAppContentPadding?: boolean;
  /**
   * Parts of UI Shell that are visible when rendered.
   *
   * For example, if `sideNavProps` is `undefined`, should there be a space left for side nav or should that space not exist?
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
