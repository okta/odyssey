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

// To add a new PAM page:
//   1. Create the component in src/pam/pages/
//   2. Import it here and add a route entry to PAM_ROUTES
//   3. Add a nav item to src/pam/shell/PamSideNavConfig.tsx

import { Navigate, type RouteObject } from "react-router-dom";

import { StubPage } from "./pages/StubPage";

export { PamShell } from "./shell/PamShell";

export const PAM_ROUTES: RouteObject[] = [
  { index: true, element: <Navigate replace to="/pam/home" /> },

  // My Privileged Access
  { path: "home", element: <StubPage title="Servers" /> },
  { path: "secrets", element: <StubPage title="Secrets" /> },
  { path: "saas_apps", element: <StubPage title="SaaS apps" /> },
  {
    path: "okta_service_accounts",
    element: <StubPage title="Okta service accounts" />,
  },
  { path: "ad_domains", element: <StubPage title="Active directory" /> },
  { path: "databases", element: <StubPage title="Databases" /> },
  {
    path: "checked_out_accounts",
    element: <StubPage title="Checked out accounts" />,
  },
  {
    path: "access_request_status",
    element: <StubPage title="Access request status" />,
  },

  // Directory
  { path: "users", element: <StubPage title="Users" /> },
  { path: "groups", element: <StubPage title="Groups" /> },
  { path: "clients", element: <StubPage title="Clients" /> },

  // Resource Administration
  {
    path: "resource_groups",
    element: <StubPage title="Resource management" />,
  },
  {
    path: "resource_assignment/service_accounts",
    element: <StubPage title="Integrations" />,
  },
  { path: "sudo-command-bundles", element: <StubPage title="Sudo commands" /> },
  { path: "pam-gateways", element: <StubPage title="Gateways" /> },
  {
    path: "connections/directories",
    element: <StubPage title="Connections" />,
  },
  {
    path: "team/clientsession",
    element: <StubPage title="System configuration" />,
  },

  // Security Administration
  { path: "policy", element: <StubPage title="Policies" /> },
  { path: "workload_roles", element: <StubPage title="Workload roles" /> },
  { path: "resource_labels", element: <StubPage title="Labels" /> },

  // DevOps Administration
  {
    path: "workload_connections",
    element: <StubPage title="Workload connections" />,
  },
];
