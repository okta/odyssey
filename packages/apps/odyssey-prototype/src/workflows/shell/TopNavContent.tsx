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
import { QuestionCircleIcon } from "@okta/odyssey-react-mui/icons";
import { UserProfileMenuButton } from "@okta/odyssey-react-mui/labs";
import { memo } from "react";

// Portalled into slottedElements.topNavLeftSide by WorkflowsShell.
// Production shows Home and Templates nav links.
export const TopNavLeft = memo(() => (
  <Box sx={{ display: "flex" }}>
    <Button label="Home" variant="floating" />
    <Button label="Templates" variant="floating" />
  </Box>
));

// Portalled into slottedElements.topNavRightSide by WorkflowsShell.
export const TopNavRight = memo(() => (
  <Box sx={{ display: "flex", alignItems: "center" }}>
    <Button
      ariaLabel="Help"
      startIcon={<QuestionCircleIcon />}
      tooltipText="Help"
      variant="floating"
    />
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
