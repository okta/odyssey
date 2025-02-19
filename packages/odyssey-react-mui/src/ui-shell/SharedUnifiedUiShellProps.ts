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

export type SharedUnifiedUiShellProps = {
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
};
