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

export * from "./AppSwitcher/index.js";
export * from "./renderUiShell.js";
export * from "./SideNav/index.js";
export * from "./TopNav/index.js";
export * from "./useHasUiShell.js";
export * from "../web-component/renderReactInWebComponent.js"; // This is located here because some teams use React v17, and this uses React v18's `ReactDOM/client` import which isn't in older versions.

export { UiShell, type UiShellProps } from "./UiShell.js";
export {
  UiShellContent,
  type UiShellNavComponentProps,
} from "./UiShellContent.js";
