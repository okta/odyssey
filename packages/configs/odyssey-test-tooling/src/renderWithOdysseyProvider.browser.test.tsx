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

import { useTheme } from "@mui/material/styles";

import {
  renderHookWithOdysseyProvider,
  renderWithOdysseyProvider,
} from "./renderWithOdysseyProvider.js";

const TransitionDuration = () => {
  const { duration } = useTheme().transitions;

  return <p>{`standard ${duration.standard} short ${duration.short}`}</p>;
};

describe("renderWithOdysseyProvider", () => {
  test("element rendered with transitions disabled", async () => {
    const { getByText } = await renderWithOdysseyProvider(
      <TransitionDuration />,
    );

    await expect.element(getByText("standard 0 short 0")).toBeVisible();
  });

  test("theme override on top of the no-transitions theme", async () => {
    const { getByText } = await renderWithOdysseyProvider(
      <TransitionDuration />,
      {
        providerProps: {
          themeOverride: { palette: { primary: { main: "#123456" } } },
        },
      },
    );

    await expect.element(getByText("standard 0 short 0")).toBeVisible();
  });
});

describe("renderHookWithOdysseyProvider", () => {
  test("hook rendered with transitions disabled", async () => {
    const { result } = await renderHookWithOdysseyProvider(
      () => useTheme().transitions.duration.standard,
    );

    expect(result.current).toBe(0);
  });
});
