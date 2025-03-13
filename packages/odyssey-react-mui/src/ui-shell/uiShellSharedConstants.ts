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

import { SideNavProps } from "./SideNav/types.js";

// It's important to bring all our constant values together, so we can change them in one location and ensure the values are all correct relative to each other.
// This also lends us the capability of swapping these out for a more robust solution in the future.

/* The side nav collapse icon is placed absolutely from the top (Logo container + nav header height) to align it in the middle of the nav header text */
export const SIDE_NAV_VISIBILITY_TOGGLE_ICON_POSITION = "77px";

export const SIDE_NAV_WIDTH = "300px";

export const TOP_NAV_HEIGHT = `${64 / 14}rem`;

export const UI_SHELL_BASE_Z_INDEX = 100;

export const UI_SHELL_OVERLAY_Z_INDEX = 200;

export const emptySideNavItems = [] satisfies SideNavProps["sideNavItems"];
