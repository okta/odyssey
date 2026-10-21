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

import { createUniqueId } from "../../createUniqueId.js";

/**
 * Create a new fullscreen id that's unique across every app on the page. Each app bundles its own copy of Odyssey, so a prefix keeps these ids apart from other `createUniqueId` values in the same document.
 */
export const createFullscreenId = () =>
  `odyssey-fullscreen-${createUniqueId()}`;

/**
 * The HTML `id` of the element that fills the screen for a fullscreen id. Deterministic, so a `FullscreenButton` anywhere on the page can point `aria-controls` at the region it controls without being handed an element.
 */
export const getFullscreenElementId = ({
  fullscreenId,
}: {
  fullscreenId: string;
}) => `${fullscreenId}-element`;
