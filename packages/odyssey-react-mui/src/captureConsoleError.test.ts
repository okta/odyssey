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

import { captureConsoleError } from "./captureConsoleError";

describe("captureConsoleError", () => {
  test("calls callback function", async () => {
    const callback = jest.fn();

    captureConsoleError({
      callback,
    });

    expect(callback).toHaveBeenCalledWith();
    expect(callback).toHaveBeenCalledTimes(1);
  });

  test("captures console.error messages", async () => {
    const errorMessage = new Error();
    const replacementConsoleError = jest.fn();

    captureConsoleError({
      callback: () => {
        console.error(errorMessage);
      },
      replacementConsoleError,
    });

    expect(replacementConsoleError).toHaveBeenCalledWith(errorMessage);
    expect(replacementConsoleError).toHaveBeenCalledTimes(1);
  });

  test("console.error is reverted after capture", async () => {
    const consoleError = console.error;

    captureConsoleError({
      callback: () => {},
    });

    expect(console.error).toBe(consoleError);
  });
});
