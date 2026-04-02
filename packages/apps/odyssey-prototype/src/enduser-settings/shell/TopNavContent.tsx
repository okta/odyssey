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

import { Box, Button, MenuItem } from "@okta/odyssey-react-mui";
import { AppsIcon } from "@okta/odyssey-react-mui/icons";
import { UserProfileMenuButton } from "@okta/odyssey-react-mui/labs";
import { memo } from "react";

// Enduser Settings top-nav-left is empty in production.
export const TopNavLeft = memo(() => null);

// Portalled into slottedElements.topNavRightSide by EnduserSettingsShell.
// Production shows an "Okta apps" grid button + user details button.
export const TopNavRight = memo(() => (
  <Box sx={{ display: "flex", alignItems: "center" }}>
    <Button
      ariaLabel="Okta apps"
      startIcon={<AppsIcon />}
      tooltipText="Okta apps"
      variant="floating"
    />
    <Box sx={{ ml: 1 }}>
      <UserProfileMenuButton
        ariaLabel="User profile"
        orgName="My Organization"
        userName="End User"
      >
        <MenuItem>My end user dashboard</MenuItem>
        <MenuItem>Sign out</MenuItem>
      </UserProfileMenuButton>
    </Box>
  </Box>
));
