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

import { Box, MenuItem } from "@okta/odyssey-react-mui";
import { UserProfileMenuButton } from "@okta/odyssey-react-mui/labs";
import { memo } from "react";

// Partner Portal top-nav-left is empty in production — no search field.
export const TopNavLeft = memo(() => null);

// Portalled into slottedElements.topNavRightSide by PartnerPortalShell.
export const TopNavRight = memo(() => (
  <Box sx={{ display: "flex", alignItems: "center" }}>
    <UserProfileMenuButton
      ariaLabel="User profile"
      orgName="My Organization"
      userName="Admin User"
    >
      <MenuItem>My profile</MenuItem>
      <MenuItem>Sign out</MenuItem>
    </UserProfileMenuButton>
  </Box>
));
