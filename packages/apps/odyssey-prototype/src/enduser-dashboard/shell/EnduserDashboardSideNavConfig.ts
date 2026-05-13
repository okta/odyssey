/*!
 * Copyright (c) 2026-present, Okta, Inc. and/or its affiliates. All rights reserved.
 * The Okta software accompanied by this notice is provided pursuant to the Apache License, Version 2.0 (the "License.")
 *
 * You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0.
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *
 * See the License for the specific language governing permissions and limitations under the License.
 */

import type { SideNavItem } from "@okta/odyssey-react-mui/ui-shell";

import {
  AppsIcon,
  HomeIcon,
  NotificationIcon,
} from "@okta/odyssey-react-mui/icons";
import { createElement } from "react";

export const ENDUSER_DASHBOARD_ADD_SECTION_EVENT =
  "enduser-dashboard:open-add-section";

export const ENDUSER_DASHBOARD_SIDE_NAV_CONFIG: SideNavItem[] = [
  {
    id: "nav-my-apps",
    label: "My Apps",
    startIcon: createElement(HomeIcon, { fontSize: "small" }),
    href: "/enduser-dashboard",
    nestedNavItems: [
      {
        id: "nav-my-apps-work",
        label: "Work",
        href: "/enduser-dashboard",
      },
      {
        id: "nav-my-apps-add-section",
        label: "Add section",
        onClick: () => {
          window.dispatchEvent(
            new CustomEvent(ENDUSER_DASHBOARD_ADD_SECTION_EVENT),
          );
        },
      },
    ],
  },
  {
    id: "nav-notifications",
    label: "Notifications",
    startIcon: createElement(NotificationIcon, { fontSize: "small" }),
    count: 1,
    onClick: () => {},
  },
  {
    id: "nav-add-apps",
    label: "Add apps",
    startIcon: createElement(AppsIcon, { fontSize: "small" }),
    onClick: () => {},
  },
];
