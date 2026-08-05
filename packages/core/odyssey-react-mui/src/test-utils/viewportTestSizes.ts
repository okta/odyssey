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
  COMPACT_MAX_HEIGHT,
  COMPACT_MAX_WIDTH,
} from "../theme/useMediaQuery.js";

// Compact triggers when either dimension is at or below its max, so a "roomy"
// value clears the relevant max by this buffer. Deriving from the thresholds
// (rather than a hardcoded size) keeps viewport tests correct if the compact
// activation buffers ever change.
const ROOMY_BUFFER = 100;

/** Width comfortably clear of the compact-width threshold. */
export const ROOMY_WIDTH = COMPACT_MAX_WIDTH + ROOMY_BUFFER;

/** Height comfortably clear of the compact-height threshold. */
export const ROOMY_HEIGHT = COMPACT_MAX_HEIGHT + ROOMY_BUFFER;
