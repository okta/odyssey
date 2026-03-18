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

// First route of each section — the "home" page for that section.
const SECTION_HOMES: Record<string, string> = {
  dashboard: "/dashboard",
  directory: "/directory",
  customizations: "/customizations/brands",
  applications: "/applications/applications",
  "identity-governance": "/identity-governance/access-certifications",
  security: "/security/general",
  workflow: "/workflow/automations",
  reports: "/reports/reports",
  settings: "/settings/account",
};

const SECTION_LABELS: Record<string, string> = {
  dashboard: "Dashboard",
  directory: "Directory",
  customizations: "Customizations",
  applications: "Applications",
  "identity-governance": "Identity Governance",
  security: "Security",
  workflow: "Workflow",
  reports: "Reports",
  settings: "Settings",
};

export type BreadcrumbInfo =
  | { breadcrumbHref: string; breadcrumbLabel: string }
  | { breadcrumbHref: undefined; breadcrumbLabel: undefined };

/**
 * Derives breadcrumb back-link info from the current route.
 *
 * - Section home pages → "Home" → "/"
 * - Sub-pages → section label → section home route
 * - Unknown sections → no breadcrumb
 */
export const useBreadcrumb = (): BreadcrumbInfo => {
  const { pathname } = useLocation();

  return useMemo(() => {
    const section = pathname.split("/")[1];
    const sectionHome = SECTION_HOMES[section];

    if (!sectionHome) {
      return { breadcrumbHref: undefined, breadcrumbLabel: undefined };
    }

    if (pathname === sectionHome) {
      return { breadcrumbHref: "/", breadcrumbLabel: "Home" };
    }

    return {
      breadcrumbHref: sectionHome,
      breadcrumbLabel: SECTION_LABELS[section] ?? section,
    };
  }, [pathname]);
};
