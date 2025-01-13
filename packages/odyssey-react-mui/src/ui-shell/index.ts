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

export * from "./AppSwitcher";
export * from "./renderUiShell";
export * from "./SideNav";
export * from "./SideNav/NavAccordion";
export * from "./TopNav";
export * from "./useHasUiShell";
export * from "../web-component/renderReactInWebComponent"; // This is located here because some teams use React v17, and this uses React v18's `ReactDOM/client` import which isn't in older versions.

export { UiShell, type UiShellProps } from "./UiShell";
export { type UiShellNavComponentProps } from "./UiShellContent";
