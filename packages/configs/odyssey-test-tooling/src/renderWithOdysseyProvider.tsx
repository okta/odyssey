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
  OdysseyProvider,
  type OdysseyProviderProps,
} from "@okta/odyssey-react-mui";
import { type ReactElement, type ReactNode } from "react";
import {
  render,
  renderHook,
  type RenderHookOptions,
  type RenderHookResult,
  type RenderOptions,
  type RenderResult,
} from "vitest-browser-react";

import { noTransitionsTheme } from "./noTransitionsTheme.js";

export type TestProviderProps = Omit<OdysseyProviderProps, "children">;

export type RenderWithOdysseyProviderOptions = Omit<
  RenderOptions,
  "wrapper"
> & {
  /**
   * Props passed to the wrapping OdysseyProvider. A `themeOverride` is merged on top of `noTransitionsTheme` one level deep, so transitions stay disabled unless the caller sets `transitions`. A `transitions` override replaces the whole object, durations and `create` included.
   */
  providerProps?: TestProviderProps;
};

export type RenderHookWithOdysseyProviderOptions<Props> = Omit<
  RenderHookOptions<Props>,
  "wrapper"
> &
  Pick<RenderWithOdysseyProviderOptions, "providerProps">;

const createOdysseyWrapper = ({
  providerProps = {},
}: Pick<RenderWithOdysseyProviderOptions, "providerProps">) => {
  const themeOverride = {
    ...noTransitionsTheme,
    ...providerProps.themeOverride,
  };

  return ({ children }: { children: ReactNode }) => (
    <OdysseyProvider {...providerProps} themeOverride={themeOverride}>
      {children}
    </OdysseyProvider>
  );
};

/**
 * Renders `reactElement` inside an OdysseyProvider with MUI transitions disabled. It keeps the positional signature of vitest-browser-react's `render`, so a test can swap one for the other.
 */
export const renderWithOdysseyProvider = async (
  reactElement: ReactElement,
  { providerProps, ...options }: RenderWithOdysseyProviderOptions = {},
): Promise<RenderResult> =>
  render(reactElement, {
    wrapper: createOdysseyWrapper({ providerProps }),
    ...options,
  });

/**
 * Renders a hook inside an OdysseyProvider with MUI transitions disabled. It keeps the positional signature of vitest-browser-react's `renderHook`.
 */
export const renderHookWithOdysseyProvider = async <Props, Result>(
  renderCallback: (initialProps?: Props) => Result,
  {
    providerProps,
    ...options
  }: RenderHookWithOdysseyProviderOptions<Props> = {},
): Promise<RenderHookResult<Result, Props>> =>
  renderHook(renderCallback, {
    wrapper: createOdysseyWrapper({ providerProps }),
    ...options,
  });
