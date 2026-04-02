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
  CustomizationsIcon,
  DirectoryIcon,
  HomeIcon,
  IdentityGovernanceIcon,
  ReportsIcon,
  SecurityIcon,
  SettingsIcon,
  WorkflowsIcon,
} from "@okta/odyssey-react-mui/icons";

export const ADMIN_SIDE_NAV_CONFIG: SideNavItem[] = [
  {
    id: "nav-dashboard",
    label: "Dashboard",
    startIcon: <HomeIcon fontSize="small" />,
    isDefaultExpanded: false,
    nestedNavItems: [
      {
        id: "nav-dashboard-home",
        label: "Dashboard",
        href: "/admin/dashboard",
      },
      {
        id: "nav-dashboard-tasks",
        label: "Tasks",
        href: "/admin/dashboard/tasks",
      },
      {
        id: "nav-dashboard-agents",
        label: "Agents",
        href: "/admin/dashboard/agents",
      },
      {
        id: "nav-dashboard-notifications",
        label: "Notifications",
        href: "/admin/dashboard/notifications",
      },
      {
        id: "nav-dashboard-getting-started",
        label: "Getting Started",
        href: "/admin/dashboard/getting-started",
      },
    ],
  },
  {
    id: "nav-directory",
    label: "Directory",
    startIcon: <DirectoryIcon fontSize="small" />,
    isDefaultExpanded: true, // open by default — contains the active item
    nestedNavItems: [
      {
        id: "nav-directory-people",
        label: "People",
        href: "/admin/directory/people",
      },
      {
        id: "nav-directory-groups",
        label: "Groups",
        href: "/admin/directory/groups",
      },
      {
        id: "nav-directory-ai-agents",
        label: "AI Agents",
        href: "/admin/directory/ai-agents",
      },
      {
        id: "nav-directory-mcp-servers",
        label: "MCP Servers",
        href: "/admin/directory/mcp-servers",
      },
      {
        id: "nav-directory-service-accounts",
        label: "Service Accounts",
        href: "/admin/directory/service-accounts",
      },
      {
        id: "nav-directory-realms",
        label: "Realms",
        href: "/admin/directory/realms",
      },
      {
        id: "nav-directory-devices",
        label: "Devices",
        href: "/admin/directory/devices",
      },
      {
        id: "nav-directory-profile-editor",
        label: "Profile Editor",
        href: "/admin/directory/profile-editor",
      },
      {
        id: "nav-directory-integrations",
        label: "Directory Integrations",
        href: "/admin/directory/directory-integrations",
      },
      {
        id: "nav-directory-profile-sources",
        label: "Profile Sources",
        href: "/admin/directory/profile-sources",
      },
    ],
  },
  {
    id: "nav-customizations",
    label: "Customizations",
    startIcon: <CustomizationsIcon fontSize="small" />,
    isDefaultExpanded: false,
    nestedNavItems: [
      {
        id: "nav-customizations-brands",
        label: "Brands",
        href: "/admin/customizations/brands",
      },
      {
        id: "nav-customizations-email-provider",
        label: "Email Provider",
        href: "/admin/customizations/email-provider",
      },
      {
        id: "nav-customizations-telephony-providers",
        label: "Telephony Providers",
        href: "/admin/customizations/telephony-providers",
      },
      {
        id: "nav-customizations-sms",
        label: "SMS",
        href: "/admin/customizations/sms",
      },
      {
        id: "nav-customizations-end-user-dashboard",
        label: "End-User Dashboard Layout",
        href: "/admin/customizations/end-user-dashboard-layout",
      },
      {
        id: "nav-customizations-okta-personal",
        label: "Okta Personal",
        href: "/admin/customizations/okta-personal",
      },
      {
        id: "nav-customizations-other",
        label: "Other",
        href: "/admin/customizations/other",
      },
    ],
  },
  {
    id: "nav-applications",
    label: "Applications",
    startIcon: <AppsIcon fontSize="small" />,
    isDefaultExpanded: false,
    nestedNavItems: [
      {
        id: "nav-applications-applications",
        label: "Applications",
        href: "/admin/applications/applications",
      },
      {
        id: "nav-applications-self-service",
        label: "Self Service",
        href: "/admin/applications/self-service",
      },
      {
        id: "nav-applications-api-service-integrations",
        label: "API Service Integrations",
        href: "/admin/applications/api-service-integrations",
      },
    ],
  },
  {
    id: "nav-identity-governance",
    label: "Identity Governance",
    startIcon: <IdentityGovernanceIcon fontSize="small" />,
    isDefaultExpanded: false,
    nestedNavItems: [
      {
        id: "nav-ig-access-certifications",
        label: "Access Certifications",
        href: "/admin/identity-governance/access-certifications",
      },
      {
        id: "nav-ig-access-requests",
        label: "Access Requests",
        href: "/admin/identity-governance/access-requests",
      },
      {
        id: "nav-ig-resource-collections",
        label: "Resource Collections",
        href: "/admin/identity-governance/resource-collections",
      },
      {
        id: "nav-ig-settings",
        label: "Settings",
        href: "/admin/identity-governance/settings",
      },
    ],
  },
  {
    id: "nav-security",
    label: "Security",
    startIcon: <SecurityIcon fontSize="small" />,
    isDefaultExpanded: false,
    nestedNavItems: [
      {
        id: "nav-security-general",
        label: "General",
        href: "/admin/security/general",
      },
      {
        id: "nav-security-health-insight",
        label: "HealthInsight",
        href: "/admin/security/health-insight",
      },
      {
        id: "nav-security-authenticators",
        label: "Authenticators",
        href: "/admin/security/authenticators",
      },
      {
        id: "nav-security-authentication-policies",
        label: "Authentication Policies",
        href: "/admin/security/authentication-policies",
      },
      {
        id: "nav-security-global-session-policy",
        label: "Global Session Policy",
        href: "/admin/security/global-session-policy",
      },
      {
        id: "nav-security-identity-threat-protection",
        label: "Identity Threat Protection",
        href: "/admin/security/identity-threat-protection",
      },
      {
        id: "nav-security-entity-risk-policy",
        label: "Entity Risk Policy",
        href: "/admin/security/entity-risk-policy",
      },
      {
        id: "nav-security-user-profile-policies",
        label: "User Profile Policies",
        href: "/admin/security/user-profile-policies",
      },
      {
        id: "nav-security-identity-providers",
        label: "Identity Providers",
        href: "/admin/security/identity-providers",
      },
      {
        id: "nav-security-delegated-authentication",
        label: "Delegated Authentication",
        href: "/admin/security/delegated-authentication",
      },
      {
        id: "nav-security-networks",
        label: "Networks",
        href: "/admin/security/networks",
      },
      {
        id: "nav-security-behavior-detection",
        label: "Behavior Detection",
        href: "/admin/security/behavior-detection",
      },
      {
        id: "nav-security-advanced-posture-checks",
        label: "Advanced Posture Checks",
        href: "/admin/security/advanced-posture-checks",
      },
      {
        id: "nav-security-device-assurance-policies",
        label: "Device Assurance Policies",
        href: "/admin/security/device-assurance-policies",
      },
      {
        id: "nav-security-device-integrations",
        label: "Device Integrations",
        href: "/admin/security/device-integrations",
      },
      {
        id: "nav-security-administrators",
        label: "Administrators",
        href: "/admin/security/administrators",
      },
      {
        id: "nav-security-api",
        label: "API",
        href: "/admin/security/api",
      },
    ],
  },
  {
    id: "nav-workflow",
    label: "Workflow",
    startIcon: <WorkflowsIcon fontSize="small" />,
    isDefaultExpanded: false,
    nestedNavItems: [
      {
        id: "nav-workflow-automations",
        label: "Automations",
        href: "/admin/workflow/automations",
      },
      {
        id: "nav-workflow-inline-hooks",
        label: "Inline Hooks",
        href: "/admin/workflow/inline-hooks",
      },
      {
        id: "nav-workflow-event-hooks",
        label: "Event Hooks",
        href: "/admin/workflow/event-hooks",
      },
      {
        id: "nav-workflow-delegated-flows",
        label: "Delegated Flows",
        href: "/admin/workflow/delegated-flows",
      },
      {
        id: "nav-workflow-workflows-console",
        label: "Workflows Console",
        href: "/admin/workflow/workflows-console",
      },
      {
        id: "nav-workflow-key-management",
        label: "Key Management",
        href: "/admin/workflow/key-management",
      },
    ],
  },
  {
    id: "nav-reports",
    label: "Reports",
    startIcon: <ReportsIcon fontSize="small" />,
    isDefaultExpanded: false,
    nestedNavItems: [
      {
        id: "nav-reports-reports",
        label: "Reports",
        href: "/admin/reports/reports",
      },
      {
        id: "nav-reports-system-log",
        label: "System Log",
        href: "/admin/reports/system-log",
      },
      {
        id: "nav-reports-access-testing-tool",
        label: "Access Testing Tool",
        href: "/admin/reports/access-testing-tool",
      },
      {
        id: "nav-reports-import-monitoring",
        label: "Import Monitoring",
        href: "/admin/reports/import-monitoring",
      },
      {
        id: "nav-reports-log-streaming",
        label: "Log Streaming",
        href: "/admin/reports/log-streaming",
      },
      {
        id: "nav-reports-rate-limits",
        label: "Rate Limits",
        href: "/admin/reports/rate-limits",
      },
    ],
  },
  {
    id: "nav-settings",
    label: "Settings",
    startIcon: <SettingsIcon fontSize="small" />,
    isDefaultExpanded: false,
    nestedNavItems: [
      {
        id: "nav-settings-account",
        label: "Account",
        href: "/admin/settings/account",
      },
      {
        id: "nav-settings-features",
        label: "Features",
        href: "/admin/settings/features",
      },
      {
        id: "nav-settings-downloads",
        label: "Downloads",
        href: "/admin/settings/downloads",
      },
    ],
  },
];
