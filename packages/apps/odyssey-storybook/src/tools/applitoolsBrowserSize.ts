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

// The standard Applitools capture size, mirroring the `browser` entry in
// applitools.config.cjs ({ width: 1024, height: 768 }). That config is a
// CommonJS file the TypeScript build cannot import (allowJs is off), so the
// values are duplicated here and must be kept in sync. Used as the non-compact
// axis of the single-axis reflow viewports: each sits clear of the compact
// thresholds (COMPACT_MAX_WIDTH 400, COMPACT_MAX_HEIGHT 500), and the width also
// stays above the UI Shell's 600px narrow-shell threshold so the SideNav stays
// persistent when demonstrating compact-height behavior.
export const STANDARD_APPLITOOLS_WIDTH = 1024;
export const STANDARD_APPLITOOLS_HEIGHT = 768;
