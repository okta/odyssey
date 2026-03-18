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
import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";

import { GroupsPage } from "./pages/GroupsPage";
import { StubPage } from "./pages/StubPage";
import { AppShell } from "./shell/AppShell";

type AppProps = Pick<RenderedUiShell, "setComponentProps" | "slottedElements">;

function App({ setComponentProps, slottedElements }: AppProps) {
  const router = useMemo(
    () =>
      createBrowserRouter([
        {
          element: (
            <AppShell
              setComponentProps={setComponentProps}
              slottedElements={slottedElements}
            />
          ),
          children: [
            // Root: redirect to /directory/groups
            { path: "/", element: <Navigate replace to="/directory/groups" /> },
            { path: "/dashboard", element: <StubPage title="Dashboard" /> },
            { path: "/dashboard/tasks", element: <StubPage title="Tasks" /> },
            { path: "/dashboard/agents", element: <StubPage title="Agents" /> },
            {
              path: "/dashboard/notifications",
              element: <StubPage title="Notifications" />,
            },
            {
              path: "/dashboard/getting-started",
              element: <StubPage title="Getting Started" />,
            },
            { path: "/directory/groups", element: <GroupsPage /> },
            { path: "/directory/people", element: <StubPage title="People" /> },
            {
              path: "/directory/ai-agents",
              element: <StubPage title="AI Agents" />,
            },
            {
              path: "/directory/mcp-servers",
              element: <StubPage title="MCP Servers" />,
            },
            {
              path: "/directory/service-accounts",
              element: <StubPage title="Service Accounts" />,
            },
            { path: "/directory/realms", element: <StubPage title="Realms" /> },
            {
              path: "/directory/devices",
              element: <StubPage title="Devices" />,
            },
            {
              path: "/directory/profile-editor",
              element: <StubPage title="Profile Editor" />,
            },
            {
              path: "/directory/directory-integrations",
              element: <StubPage title="Directory Integrations" />,
            },
            {
              path: "/directory/profile-sources",
              element: <StubPage title="Profile Sources" />,
            },
            {
              path: "/customizations/brands",
              element: <StubPage title="Brands" />,
            },
            {
              path: "/customizations/email-provider",
              element: <StubPage title="Email Provider" />,
            },
            {
              path: "/customizations/telephony-providers",
              element: <StubPage title="Telephony Providers" />,
            },
            { path: "/customizations/sms", element: <StubPage title="SMS" /> },
            {
              path: "/customizations/end-user-dashboard-layout",
              element: <StubPage title="End-User Dashboard Layout" />,
            },
            {
              path: "/customizations/okta-personal",
              element: <StubPage title="Okta Personal" />,
            },
            {
              path: "/customizations/other",
              element: <StubPage title="Other" />,
            },
            {
              path: "/applications/applications",
              element: <StubPage title="Applications" />,
            },
            {
              path: "/applications/self-service",
              element: <StubPage title="Self Service" />,
            },
            {
              path: "/applications/api-service-integrations",
              element: <StubPage title="API Service Integrations" />,
            },
            {
              path: "/identity-governance/access-certifications",
              element: <StubPage title="Access Certifications" />,
            },
            {
              path: "/identity-governance/access-requests",
              element: <StubPage title="Access Requests" />,
            },
            {
              path: "/identity-governance/resource-collections",
              element: <StubPage title="Resource Collections" />,
            },
            {
              path: "/identity-governance/settings",
              element: <StubPage title="Settings" />,
            },
            {
              path: "/security/general",
              element: <StubPage title="General" />,
            },
            {
              path: "/security/health-insight",
              element: <StubPage title="HealthInsight" />,
            },
            {
              path: "/security/authenticators",
              element: <StubPage title="Authenticators" />,
            },
            {
              path: "/security/authentication-policies",
              element: <StubPage title="Authentication Policies" />,
            },
            {
              path: "/security/global-session-policy",
              element: <StubPage title="Global Session Policy" />,
            },
            {
              path: "/security/identity-threat-protection",
              element: <StubPage title="Identity Threat Protection" />,
            },
            {
              path: "/security/entity-risk-policy",
              element: <StubPage title="Entity Risk Policy" />,
            },
            {
              path: "/security/user-profile-policies",
              element: <StubPage title="User Profile Policies" />,
            },
            {
              path: "/security/identity-providers",
              element: <StubPage title="Identity Providers" />,
            },
            {
              path: "/security/delegated-authentication",
              element: <StubPage title="Delegated Authentication" />,
            },
            {
              path: "/security/networks",
              element: <StubPage title="Networks" />,
            },
            {
              path: "/security/behavior-detection",
              element: <StubPage title="Behavior Detection" />,
            },
            {
              path: "/security/advanced-posture-checks",
              element: <StubPage title="Advanced Posture Checks" />,
            },
            {
              path: "/security/device-assurance-policies",
              element: <StubPage title="Device Assurance Policies" />,
            },
            {
              path: "/security/device-integrations",
              element: <StubPage title="Device Integrations" />,
            },
            {
              path: "/security/administrators",
              element: <StubPage title="Administrators" />,
            },
            { path: "/security/api", element: <StubPage title="API" /> },
            {
              path: "/workflow/automations",
              element: <StubPage title="Automations" />,
            },
            {
              path: "/workflow/inline-hooks",
              element: <StubPage title="Inline Hooks" />,
            },
            {
              path: "/workflow/event-hooks",
              element: <StubPage title="Event Hooks" />,
            },
            {
              path: "/workflow/delegated-flows",
              element: <StubPage title="Delegated Flows" />,
            },
            {
              path: "/workflow/workflows-console",
              element: <StubPage title="Workflows Console" />,
            },
            {
              path: "/workflow/key-management",
              element: <StubPage title="Key Management" />,
            },
            { path: "/reports/reports", element: <StubPage title="Reports" /> },
            {
              path: "/reports/system-log",
              element: <StubPage title="System Log" />,
            },
            {
              path: "/reports/access-testing-tool",
              element: <StubPage title="Access Testing Tool" />,
            },
            {
              path: "/reports/import-monitoring",
              element: <StubPage title="Import Monitoring" />,
            },
            {
              path: "/reports/log-streaming",
              element: <StubPage title="Log Streaming" />,
            },
            {
              path: "/reports/rate-limits",
              element: <StubPage title="Rate Limits" />,
            },
            {
              path: "/settings/account",
              element: <StubPage title="Account" />,
            },
            {
              path: "/settings/features",
              element: <StubPage title="Features" />,
            },
            {
              path: "/settings/downloads",
              element: <StubPage title="Downloads" />,
            },

            // Catch-all: unknown routes redirect to /directory/groups
            { path: "*", element: <Navigate replace to="/directory/groups" /> },
          ],
        },
      ]),
    [setComponentProps, slottedElements],
  );

  return <RouterProvider router={router} />;
}

export default App;
