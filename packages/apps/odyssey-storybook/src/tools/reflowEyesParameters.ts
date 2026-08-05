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

import type { ApplitoolsConfig } from "@applitools/eyes-storybook";

type ReflowEyesParametersArgs = {
  /** Height, in CSS pixels, to resize the page to before re-capturing. */
  height: number;
  /** Width, in CSS pixels, to resize the page to before re-capturing. */
  width: number;
};

/**
 * Builds the Applitools `eyes` story parameter for a reflow VRT snapshot.
 *
 * The Storybook viewport addon only resizes the live preview iframe; it has no
 * effect on Applitools, which renders each story at the browser size from
 * applitools.config.cjs (1024×768). Our compact layouts are driven by
 * matchMedia in JS, whose state is frozen at that capture size, so `browser`
 * alone re-renders the captured DOM at the target size without triggering the
 * compact layout. `layoutBreakpoints` with `heightBreakpoints` makes Applitools
 * resize the real page and re-capture, so the compact layout is snapshot.
 */
export const getReflowEyesParameters = ({
  height,
  width,
}: ReflowEyesParametersArgs): Pick<
  ApplitoolsConfig,
  "browser" | "layoutBreakpoints"
> => ({
  browser: [{ height, name: "chrome", width }],
  layoutBreakpoints: { breakpoints: [width], heightBreakpoints: true },
});
