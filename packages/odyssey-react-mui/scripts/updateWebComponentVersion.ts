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

import { writeFile } from "node:fs/promises";
import { version } from "../package.json" with { type: "json" };

const content = `/*!
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
 * DO NOT UPDATE THIS FILE MANUALLY
 * This file is managed by scripts/updateWebComponentVersion.ts and any changes made will be overwritten
 * This script only needs to be run during release, and shouldn't be used during local development.
 */
export default "${version.replaceAll(".", "-")}";
`;

const versionFile = import.meta
  .resolve("../src/web-component/odysseyWebComponentVersion.generated.ts")
  .replace("file://", "");

await writeFile(versionFile, content, "utf-8");
