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

import { setOdysseyStorybookManagerConfig } from "@okta/odyssey-storybook-preset/manager";

import packageJson from "../package.json" with { type: "json" };

// `scripts/publish-packages.sh` rewrites every version to `<release>-<short sha>`
// before it publishes, so the Storybook that ships is built from a version string
// no consumer can install. The brand slot names the release that goes out, so the
// prerelease suffix comes off.
const releaseVersion = packageJson.version.split("-")[0];

setOdysseyStorybookManagerConfig({
  brandTitle: `Odyssey Design System v${releaseVersion}`,
});
