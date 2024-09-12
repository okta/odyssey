/*!
 * Copyright (c) 2024-present, Okta, Inc. and/or its affiliates. All rights reserved.
 * The Okta software accompanied by this notice is provided pursuant to the Apache License, Version 2.0 (the "License.")
 *
 * You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0.
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *
 * See the License for the specific language governing permissions and limitations under the License.
 */

/**
 * This file represents constants that might need to be shared across multiple components
 * (for example, the logo portion of the SideNav which needs to be the same height as TopNav).
 * Rather than hoping the token referenced in each component stays in sync, we can standardize
 * on common shared constants.
 */

import * as Tokens from "@okta/odyssey-design-tokens";

export const TOP_NAV_HEIGHT = Tokens.Spacing9;
