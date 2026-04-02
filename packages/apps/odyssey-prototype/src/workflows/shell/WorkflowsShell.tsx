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
import { useLayoutEffect } from "react";
import { createPortal } from "react-dom";
import { Outlet } from "react-router-dom";

import { APP_ICONS } from "../../shared/appSwitcherConfig";
import { TopNavLeft, TopNavRight } from "./TopNavContent";

type WorkflowsShellProps = Pick<
  RenderedUiShell,
  "setComponentProps" | "slottedElements"
>;

const APP_SWITCHER_PROPS = {
  appIcons: APP_ICONS,
  isLoading: false,
  selectedAppName: "okta_flow_sso",
};

const TOP_NAV_PROPS = {};

/**
 * Route layout component for the Workflows app.
 *
 * Workflows omits sideNavProps so the Odyssey SideNav is hidden — only the
 * AppSwitcher icon bar is shown. useLayoutEffect (vs useEffect) fires before
 * paint to prevent the SideNav from flashing in during navigation.
 *
 * Locked — do not modify directly. To update top-nav content, edit TopNavContent.tsx.
 */
export const WorkflowsShell = ({
  setComponentProps,
  slottedElements,
}: WorkflowsShellProps) => {
  useLayoutEffect(() => {
    setComponentProps({
      appSwitcherProps: APP_SWITCHER_PROPS,
      topNavProps: TOP_NAV_PROPS,
    });
  }, [setComponentProps]);

  return (
    <>
      {createPortal(<TopNavLeft />, slottedElements.topNavLeftSide)}
      {createPortal(<TopNavRight />, slottedElements.topNavRightSide)}
      <Outlet />
    </>
  );
};
