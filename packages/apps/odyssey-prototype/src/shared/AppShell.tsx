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
  type RenderedUiShell,
  type SideNavItem,
} from "@okta/odyssey-react-mui/ui-shell";
import {
  type ComponentType,
  type SyntheticEvent,
  useEffect,
  useState,
} from "react";
import { createPortal } from "react-dom";
import { Outlet, useLocation, useNavigate } from "react-router-dom";

import { APP_ICONS } from "./appSwitcherConfig";
import oktaWordmarkUrl from "./okta-wordmark.svg";

export type AppShellProps = Pick<
  RenderedUiShell,
  "setComponentProps" | "slottedElements"
> & {
  appName: string;
  selectedAppName: string;
  sideNavConfig: SideNavItem[];
  TopNavLeft: ComponentType;
  TopNavRight: ComponentType;
};

const LogoWordmark = (
  <img alt="Okta" src={oktaWordmarkUrl} style={{ height: "1.71428571rem" }} />
);

/**
 * Shared route layout component used by all standard apps (those with a SideNav).
 * Syncs React Router state to the UiShell and portals top-nav content into the
 * slotted elements that `renderUiShell` creates.
 *
 * Workflows uses its own shell (no SideNav) and does not use this component.
 */
export const AppShell = ({
  appName,
  selectedAppName,
  setComponentProps,
  sideNavConfig,
  slottedElements,
  TopNavLeft,
  TopNavRight,
}: AppShellProps) => {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const [expandedSections, setExpandedSections] = useState<Set<string>>(() => {
    const initial = new Set<string>();
    for (const section of sideNavConfig) {
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
    const sideNavItems = sideNavConfig.map((section) => {
      if (!("nestedNavItems" in section) || !section.nestedNavItems) {
        return section;
      }

      const nestedNavItems = section.nestedNavItems.map((child) => ({
        ...child,
        isSelected: "href" in child && child.href === pathname,
        onClick: (event: SyntheticEvent) => {
          event.preventDefault();
          if ("href" in child && child.href) {
            navigate(child.href);
          }
        },
      }));

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
      appSwitcherProps: {
        appIcons: APP_ICONS,
        isLoading: false,
        selectedAppName,
      },
      sideNavProps: {
        appName,
        isCollapsible: true,
        logoProps: { logoComponent: LogoWordmark },
        sideNavItems,
      },
      topNavProps: {},
    });
  }, [
    appName,
    expandedSections,
    navigate,
    pathname,
    selectedAppName,
    setComponentProps,
    sideNavConfig,
  ]);

  return (
    <>
      {createPortal(<TopNavLeft />, slottedElements.topNavLeftSide)}
      {createPortal(<TopNavRight />, slottedElements.topNavRightSide)}
      <Outlet />
    </>
  );
};
