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

import { useMemo } from "react";
import { useLocation } from "react-router-dom";

// First route of each section and its display label.
const SECTIONS: Record<string, { href: string; label: string }> = {
  dashboard: { href: "/admin/dashboard", label: "Dashboard" },
  directory: { href: "/admin/directory", label: "Directory" },
  customizations: {
    href: "/admin/customizations/brands",
    label: "Customizations",
  },
  applications: {
    href: "/admin/applications/applications",
    label: "Applications",
  },
  "identity-governance": {
    href: "/admin/identity-governance/access-certifications",
    label: "Identity Governance",
  },
  security: { href: "/admin/security/general", label: "Security" },
  workflow: { href: "/admin/workflow/automations", label: "Workflow" },
  reports: { href: "/admin/reports/reports", label: "Reports" },
  settings: { href: "/admin/settings/account", label: "Settings" },
};

export type BreadcrumbInfo =
  | { breadcrumbHref: string; breadcrumbLabel: string }
  | { breadcrumbHref: undefined; breadcrumbLabel: undefined };

/**
 * Derives breadcrumb back-link info from the current admin route (/admin/<section>/...).
 *
 * - Section home pages → "Home" → "/"
 * - Sub-pages → section label → section home route
 * - Unknown sections → no breadcrumb
 */
export const useAdminBreadcrumb = (): BreadcrumbInfo => {
  const { pathname } = useLocation();

  return useMemo(() => {
    // pathname is /admin/<section>/... — index 2 is the section
    const section = pathname.split("/")[2];
    const sectionConfig = SECTIONS[section];

    if (!sectionConfig) {
      return { breadcrumbHref: undefined, breadcrumbLabel: undefined };
    }

    if (pathname === sectionConfig.href) {
      return { breadcrumbHref: "/", breadcrumbLabel: "Home" };
    }

    return {
      breadcrumbHref: sectionConfig.href,
      breadcrumbLabel: sectionConfig.label,
    };
  }, [pathname]);
};
