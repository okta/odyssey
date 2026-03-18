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

import { Box, Button, MenuItem, SearchField } from "@okta/odyssey-react-mui";
import { AppsIcon, QuestionCircleIcon } from "@okta/odyssey-react-mui/icons";
import { UserProfileMenuButton } from "@okta/odyssey-react-mui/labs";
import {
  type RenderedUiShell,
  type SideNavItem,
} from "@okta/odyssey-react-mui/ui-shell";
import { memo, type SyntheticEvent, useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { Outlet, useLocation, useNavigate } from "react-router-dom";

import { SIDE_NAV_CONFIG } from "./SideNavConfig";

type AppShellProps = Pick<
  RenderedUiShell,
  "setComponentProps" | "slottedElements"
>;

const LogoWordmark = (
  <img
    alt="Okta"
    src="/okta-wordmark.svg"
    style={{ height: "1.71428571rem" }}
  />
);

const APP_ICONS = [
  {
    appName: "okta-admin-console",
    label: "Okta Admin Console",
    appIconDefaultUrl: "/icons/okta-admin-console-icon.svg",
    appIconSelectedUrl: "/icons/okta-admin-console-icon.svg",
    linkUrl: "/",
  },
  {
    appName: "okta-end-user-dashboard",
    label: "Okta End-User Dashboard",
    appIconDefaultUrl: "/icons/okta-end-user-dashboard-icon.svg",
    appIconSelectedUrl: "/icons/okta-end-user-dashboard-icon.svg",
    linkUrl: "#",
  },
  {
    appName: "okta-workflows",
    label: "Okta Workflows",
    appIconDefaultUrl: "/icons/okta-workflows-icon.svg",
    appIconSelectedUrl: "/icons/okta-workflows-icon.svg",
    linkUrl: "#",
  },
];
// Portalled into slottedElements.topNavLeftSide / topNavRightSide by AppShell.

const TopNavLeft = memo(() => (
  <SearchField
    label="Search"
    placeholder="Search for people, apps and groups"
  />
));

const TopNavRight = memo(() => (
  <Box sx={{ display: "flex", alignItems: "center" }}>
    <Button
      ariaLabel="Help"
      startIcon={<QuestionCircleIcon />}
      tooltipText="Help"
      variant="floating"
    />
    <Box sx={{ "& .MuiButton-root": { marginInlineStart: 0 } }}>
      <Button
        ariaLabel="More apps"
        startIcon={<AppsIcon />}
        tooltipText="More apps"
        variant="floating"
      />
    </Box>
    <Box sx={{ ml: 2 }}>
      <UserProfileMenuButton
        ariaLabel="User profile"
        orgName="My Organization"
        userName="Admin User"
      >
        <MenuItem>My profile</MenuItem>
        <MenuItem>Sign out</MenuItem>
      </UserProfileMenuButton>
    </Box>
  </Box>
));

const APP_SWITCHER_PROPS = {
  appIcons: APP_ICONS,
  isLoading: false,
  selectedAppName: "okta-admin-console",
};

const SIDE_NAV_BASE_PROPS = {
  appName: "Admin Console",
  isCollapsible: true,
  logoProps: { logoComponent: LogoWordmark },
};

const TOP_NAV_PROPS = {};

/**
 * Route layout component that syncs React Router state to the UiShell and
 * portals top-nav content into the slotted elements `renderUiShell` creates.
 *
 * `renderUiShell` is called in `main.tsx`. `setComponentProps` and
 * `slottedElements` are passed as props: `main.tsx → App → AppShell`.
 */
export const AppShell = ({
  setComponentProps,
  slottedElements,
}: AppShellProps) => {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  // Initialize expanded sections from isDefaultExpanded config + the section
  // that contains the active route on first load.
  const [expandedSections, setExpandedSections] = useState<Set<string>>(() => {
    const initial = new Set<string>();
    for (const section of SIDE_NAV_CONFIG) {
      if (!("nestedNavItems" in section) || !section.nestedNavItems) continue;
      if (section.isDefaultExpanded) {
        initial.add(section.id);
      }
      if (
        section.nestedNavItems.some(
          (child) => "href" in child && child.href === pathname,
        )
      ) {
        initial.add(section.id);
      }
    }
    return initial;
  });

  useEffect(() => {
    const sideNavItems = SIDE_NAV_CONFIG.map((section) => {
      if (!("nestedNavItems" in section) || !section.nestedNavItems) {
        return section;
      }

      const nestedNavItems = section.nestedNavItems.map((child) => ({
        ...child,
        isSelected: "href" in child && child.href === pathname,
        // SyntheticEvent matches SideNavItem["onClick"] — the type Odyssey defines.
        onClick: (event: SyntheticEvent) => {
          event.preventDefault();
          if ("href" in child && child.href) {
            navigate(child.href);
          }
        },
      }));

      // SideNavItem's union includes a variant with both href and nestedNavItems
      // (href?: never on the accordion variant), but our config never uses that
      // shape. Cast to SideNavItem here so the satisfies below can verify the array.
      return {
        ...section,
        isExpanded:
          expandedSections.has(section.id) ||
          nestedNavItems.some((child) => child.isSelected),
        onChange: () => {
          setExpandedSections((previousSections) => {
            const updatedSections = new Set(previousSections);
            if (updatedSections.has(section.id))
              updatedSections.delete(section.id);
            else updatedSections.add(section.id);
            return updatedSections;
          });
        },
        nestedNavItems,
      } as SideNavItem;
    }) satisfies SideNavItem[];

    setComponentProps({
      appSwitcherProps: APP_SWITCHER_PROPS,
      sideNavProps: { ...SIDE_NAV_BASE_PROPS, sideNavItems },
      topNavProps: TOP_NAV_PROPS,
    });
  }, [pathname, expandedSections, setComponentProps, navigate]);

  return (
    <>
      {createPortal(<TopNavLeft />, slottedElements.topNavLeftSide)}
      {createPortal(<TopNavRight />, slottedElements.topNavRightSide)}
      <Outlet />
    </>
  );
};
