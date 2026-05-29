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
  DirectoryIcon,
  HomeIcon,
  SecurityIcon,
  WorkflowsIcon,
} from "@okta/odyssey-react-mui/icons";

export const PAM_SIDE_NAV_CONFIG: SideNavItem[] = [
  {
    id: "nav-pam-my-privileged-access",
    label: "My Privileged Access",
    startIcon: <HomeIcon fontSize="small" />,
    isDefaultExpanded: true,
    nestedNavItems: [
      { id: "nav-pam-mpa-servers", label: "Servers", href: "/pam/home" },
      { id: "nav-pam-mpa-secrets", label: "Secrets", href: "/pam/secrets" },
      {
        id: "nav-pam-mpa-saas-apps",
        label: "SaaS apps",
        href: "/pam/saas_apps",
      },
      {
        id: "nav-pam-mpa-okta-service-accounts",
        label: "Okta service accounts",
        href: "/pam/okta_service_accounts",
      },
      {
        id: "nav-pam-mpa-active-directory",
        label: "Active directory",
        href: "/pam/ad_domains",
      },
      {
        id: "nav-pam-mpa-databases",
        label: "Databases",
        href: "/pam/databases",
      },
      {
        id: "nav-pam-mpa-checked-out-accounts",
        label: "Checked out accounts",
        href: "/pam/checked_out_accounts",
      },
      {
        id: "nav-pam-mpa-access-request-status",
        label: "Access request status",
        href: "/pam/access_request_status",
      },
    ],
  },
  {
    id: "nav-pam-directory",
    label: "Directory",
    startIcon: <DirectoryIcon fontSize="small" />,
    isDefaultExpanded: false,
    nestedNavItems: [
      { id: "nav-pam-directory-users", label: "Users", href: "/pam/users" },
      { id: "nav-pam-directory-groups", label: "Groups", href: "/pam/groups" },
      {
        id: "nav-pam-directory-clients",
        label: "Clients",
        href: "/pam/clients",
      },
    ],
  },
  {
    id: "nav-pam-resource-administration",
    label: "Resource Administration",
    startIcon: <AppsIcon fontSize="small" />,
    isDefaultExpanded: false,
    nestedNavItems: [
      {
        id: "nav-pam-resource-management",
        label: "Resource management",
        href: "/pam/resource_groups",
      },
      {
        id: "nav-pam-resource-integrations",
        label: "Integrations",
        href: "/pam/resource_assignment/service_accounts",
      },
      {
        id: "nav-pam-resource-sudo-commands",
        label: "Sudo commands",
        href: "/pam/sudo-command-bundles",
      },
      {
        id: "nav-pam-resource-gateways",
        label: "Gateways",
        href: "/pam/pam-gateways",
      },
      {
        id: "nav-pam-resource-connections",
        label: "Connections",
        href: "/pam/connections/directories",
      },
      {
        id: "nav-pam-resource-system-configuration",
        label: "System configuration",
        href: "/pam/team/clientsession",
      },
    ],
  },
  {
    id: "nav-pam-security-administration",
    label: "Security Administration",
    startIcon: <SecurityIcon fontSize="small" />,
    isDefaultExpanded: false,
    nestedNavItems: [
      {
        id: "nav-pam-security-policies",
        label: "Policies",
        href: "/pam/policy",
      },
      {
        id: "nav-pam-security-workload-roles",
        label: "Workload roles",
        href: "/pam/workload_roles",
      },
      {
        id: "nav-pam-security-labels",
        label: "Labels",
        href: "/pam/resource_labels",
      },
    ],
  },
  {
    id: "nav-pam-devops-administration",
    label: "DevOps Administration",
    startIcon: <WorkflowsIcon fontSize="small" />,
    isDefaultExpanded: false,
    nestedNavItems: [
      {
        id: "nav-pam-devops-workload-connections",
        label: "Workload connections",
        href: "/pam/workload_connections",
      },
    ],
  },
];
