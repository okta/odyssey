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

// import { PropertySymbol } from "happy-dom";
// import type DetachedWindowAPI from "happy-dom/lib/window/DetachedWindowAPI.js";
import "regenerator-runtime/runtime";

// declare global {
//   // Hack to ensure `happyDOM` is seen on the global `Window` by TypeScript.
//   // eslint-disable-next-line no-var
//   var happyDOM: DetachedWindowAPI;
// }

// // This is straight from the Happy-DOM docs: https://github.com/capricorn86/happy-dom/wiki/Setup-as-Test-Environment
// /* eslint-disable */
// // @ts-expect-error TypeScript doesn't like this, but Happy-DOM requires it.
// const browserWindow = global.document[PropertySymbol.window];

// global.setTimeout = browserWindow.setTimeout;
// global.clearTimeout = browserWindow.clearTimeout;
// global.setInterval = browserWindow.setInterval;
// global.clearInterval = browserWindow.clearInterval;
// global.requestAnimationFrame = browserWindow.requestAnimationFrame;
// global.cancelAnimationFrame = browserWindow.cancelAnimationFrame;
// global.queueMicrotask = browserWindow.queueMicrotask;
// /* eslint-enable @typescript-eslint/no-unsafe-assignment */
