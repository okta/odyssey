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

import { type RenderedUiShell } from "@okta/odyssey-react-mui/ui-shell";
import { useMemo } from "react";
import { createHashRouter, Navigate, RouterProvider } from "react-router-dom";

import { ADMIN_ROUTES, AdminShell } from "./admin/AdminTemplate";
import {
  ENDUSER_DASHBOARD_ROUTES,
  EnduserDashboardShell,
} from "./enduser-dashboard/EnduserDashboardTemplate";
import {
  ENDUSER_SETTINGS_ROUTES,
  EnduserSettingsShell,
} from "./enduser-settings/EnduserSettingsTemplate";
import { ISPM_ROUTES, IspmShell } from "./ispm/IspmTemplate";
import { PAM_ROUTES, PamShell } from "./pam/PamTemplate";
import {
  PARTNER_PORTAL_ROUTES,
  PartnerPortalShell,
} from "./partner-portal/PartnerPortalTemplate";
import {
  WORKFLOWS_ROUTES,
  WorkflowsShell,
} from "./workflows/WorkflowsTemplate";

type SiteRouterProps = Pick<
  RenderedUiShell,
  "setComponentProps" | "slottedElements"
>;

function SiteRouter({ setComponentProps, slottedElements }: SiteRouterProps) {
  const router = useMemo(
    () =>
      createHashRouter([
        // Root: redirect to admin app
        {
          path: "/",
          element: <Navigate replace to="/admin/directory/groups" />,
        },

        // Admin Console
        {
          path: "/admin",
          element: (
            <AdminShell
              setComponentProps={setComponentProps}
              slottedElements={slottedElements}
            />
          ),
          children: ADMIN_ROUTES,
        },

        // Enduser Dashboard
        {
          path: "/enduser-dashboard",
          element: (
            <EnduserDashboardShell
              setComponentProps={setComponentProps}
              slottedElements={slottedElements}
            />
          ),
          children: ENDUSER_DASHBOARD_ROUTES,
        },

        // Enduser Settings
        {
          path: "/enduser-settings",
          element: (
            <EnduserSettingsShell
              setComponentProps={setComponentProps}
              slottedElements={slottedElements}
            />
          ),
          children: ENDUSER_SETTINGS_ROUTES,
        },

        // Workflows
        {
          path: "/workflows",
          element: (
            <WorkflowsShell
              setComponentProps={setComponentProps}
              slottedElements={slottedElements}
            />
          ),
          children: WORKFLOWS_ROUTES,
        },

        // PAM
        {
          path: "/pam",
          element: (
            <PamShell
              setComponentProps={setComponentProps}
              slottedElements={slottedElements}
            />
          ),
          children: PAM_ROUTES,
        },

        // Partner Admin Portal
        {
          path: "/partner-portal",
          element: (
            <PartnerPortalShell
              setComponentProps={setComponentProps}
              slottedElements={slottedElements}
            />
          ),
          children: PARTNER_PORTAL_ROUTES,
        },

        // Identity Security Posture Management
        {
          path: "/ispm",
          element: (
            <IspmShell
              setComponentProps={setComponentProps}
              slottedElements={slottedElements}
            />
          ),
          children: ISPM_ROUTES,
        },

        // Catch-all: unknown routes redirect to admin
        {
          path: "*",
          element: <Navigate replace to="/admin/directory/groups" />,
        },
      ]),
    [setComponentProps, slottedElements],
  );

  return <RouterProvider router={router} />;
}

export default SiteRouter;
