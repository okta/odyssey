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

import {
  defaultConfig,
  type TagBadgeParameters,
} from "storybook-addon-tag-badges/manager-helpers";
import { addons } from "storybook/manager-api";

import theme from "./odysseyStorybookTheme.js";

addons.setConfig({
  theme,
  tagBadges: [
    {
      tags: "deprecated",
      badge: {
        text: "Deprecated",
        style: {
          backgroundColor: "#7e2845",
          color: "#f4ecec",
        },
        tooltip:
          "This component has possibly been superseded by another component and will be removed in a future release.",
      },
      display: {
        mdx: true,
        toolbar: true,
      },
    },
    {
      tags: "icons-export",
      badge: {
        text: "/icons",
        style: {
          backgroundColor: "#134a97",
          color: "#e3e8ed",
        },
        tooltip: "These are in the `/icons` export.",
      },
      display: {
        mdx: true,
        toolbar: true,
      },
    },
    {
      tags: "labs-export",
      badge: {
        text: "/labs",
        style: {
          backgroundColor: "#978613",
          color: "#edece3",
        },
        tooltip:
          "This component's API is experimental and may change in future releases. These are in the `/labs` export.",
      },
      display: {
        mdx: true,
        toolbar: true,
      },
    },
    ...defaultConfig.filter(
      (badge) => !["deprecated"].includes(badge.tags as string),
    ),
  ] satisfies TagBadgeParameters,
});
