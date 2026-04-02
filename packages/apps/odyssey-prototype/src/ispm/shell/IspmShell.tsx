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

import { AppShell } from "../../shared/AppShell";
import { ISPM_SIDE_NAV_CONFIG } from "./IspmSideNavConfig";
import { TopNavLeft, TopNavRight } from "./TopNavContent";

type IspmShellProps = Pick<
  RenderedUiShell,
  "setComponentProps" | "slottedElements"
>;

/**
 * Route layout component for the ISPM app.
 * Locked — do not modify directly. To add nav items, edit IspmSideNavConfig.ts.
 */
export const IspmShell = (props: IspmShellProps) => (
  <AppShell
    {...props}
    appName="Identity Security Posture Management"
    selectedAppName="okta_ispm"
    sideNavConfig={ISPM_SIDE_NAV_CONFIG}
    TopNavLeft={TopNavLeft}
    TopNavRight={TopNavRight}
  />
);
