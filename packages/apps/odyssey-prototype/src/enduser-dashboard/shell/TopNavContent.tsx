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
import { UserProfileMenuButton } from "@okta/odyssey-react-mui/labs";
import { memo, useCallback } from "react";
import { useNavigate } from "react-router-dom";

// Portalled into slottedElements.topNavLeftSide by EnduserDashboardShell.
export const TopNavLeft = memo(() => (
  <SearchField label="Search" placeholder="Search your apps" />
));

// Portalled into slottedElements.topNavRightSide by EnduserDashboardShell.
export const TopNavRight = memo(() => {
  const navigate = useNavigate();

  const navigateToSettings = useCallback(() => {
    navigate("/enduser-settings");
  }, [navigate]);

  return (
    <Box sx={{ display: "flex", alignItems: "center" }}>
      <Button label="My Apps" variant="floating" />
      <Button
        label="Settings"
        onClick={navigateToSettings}
        variant="floating"
      />
      <Box sx={{ ml: 2 }}>
        <UserProfileMenuButton
          ariaLabel="User profile"
          orgName="My Organization"
          userName="End User"
        >
          <MenuItem>Settings</MenuItem>
          <MenuItem>Sign out</MenuItem>
        </UserProfileMenuButton>
      </Box>
    </Box>
  );
});
