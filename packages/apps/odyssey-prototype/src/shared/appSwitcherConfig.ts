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

// Vite replaces import.meta.env.BASE_URL at build time with the configured
// base (currently "./"), so icon paths resolve relative to wherever index.html
// is served — /icons/... in dev, /prototype/icons/... on the CDN.
const base = import.meta.env.BASE_URL;

// linkUrls use fragment-only hrefs (e.g. "#/admin/...") so navigation stays
// within the hash router regardless of the CDN sub-path the app is served from.
export const APP_ICONS = [
  {
    appName: "saasure",
    label: "Okta Admin Console",
    appIconDefaultUrl: `${base}icons/admin-app-default.svg`,
    appIconSelectedUrl: `${base}icons/admin-app-selected.svg`,
    linkUrl: "#/admin/directory/groups",
  },
  {
    appName: "okta_enduser",
    label: "Okta End-User Dashboard",
    appIconDefaultUrl: `${base}icons/okta-dashboard-default.svg`,
    appIconSelectedUrl: `${base}icons/okta-dashboard-selected.svg`,
    linkUrl: "#/enduser-dashboard",
  },
  {
    appName: "okta_flow_sso",
    label: "Okta Workflows",
    appIconDefaultUrl: `${base}icons/workflows-default.svg`,
    appIconSelectedUrl: `${base}icons/workflows-selected.svg`,
    linkUrl: "#/workflows",
  },
  {
    appName: "partner_portal",
    label: "Partner Admin Portal",
    appIconDefaultUrl: `${base}icons/partner-portal-app-default.svg`,
    appIconSelectedUrl: `${base}icons/partner-portal-app-selected.svg`,
    linkUrl: "#/partner-portal",
  },
  {
    appName: "okta_ispm",
    label: "Identity Security Posture Management",
    appIconDefaultUrl: `${base}icons/ispm-default.svg`,
    appIconSelectedUrl: `${base}icons/ispm-selected.svg`,
    linkUrl: "#/ispm",
  },
];
