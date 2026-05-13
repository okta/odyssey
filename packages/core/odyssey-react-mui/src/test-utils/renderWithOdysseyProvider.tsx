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

import { createTheme } from "@mui/material/styles";
import { type ReactElement, type ReactNode } from "react";
import {
  render,
  type RenderOptions,
  type RenderResult,
} from "vitest-browser-react";

import { OdysseyProvider } from "../OdysseyProvider.js";

// Kill transitions so axe never samples a mid-transition state.
// `create` covers CSS transition strings; `duration` zeroes JS timeouts that
// MUI transition components (Fade, Slide, Collapse) use to decide when to
// unmount.
export const noTransitionsTheme = createTheme({
  transitions: {
    create: () => "none",
    duration: {
      shortest: 0,
      shorter: 0,
      short: 0,
      standard: 0,
      complex: 0,
      enteringScreen: 0,
      leavingScreen: 0,
    },
  },
});

const OdysseyWrapper = ({ children }: { children: ReactNode }) => (
  <OdysseyProvider themeOverride={noTransitionsTheme}>
    {children}
  </OdysseyProvider>
);

/**
 * Custom render that wraps the component in OdysseyProvider with MUI
 * transitions disabled. Both CSS transition strings (`transitions.create`) and
 * JS transition durations (`transitions.duration`) are zeroed so locator
 * queries and DOM removal are synchronous in tests. Use this in browser tests
 * instead of importing OdysseyProvider directly.
 *
 * Returns all standard vitest-browser-react render utilities */
export const renderWithOdysseyProvider = async (
  ui: ReactElement,
  options?: Omit<RenderOptions, "wrapper">,
): Promise<RenderResult> => {
  return render(ui, { wrapper: OdysseyWrapper, ...options });
};
