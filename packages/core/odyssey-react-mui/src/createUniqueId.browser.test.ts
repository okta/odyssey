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
  createRandomUuid,
  createUniqueId,
  uniqueIdLength,
} from "./createUniqueId.js";
import { createFullscreenId } from "./message-bus/fullscreen/createFullscreenId.js";

// Matches the complete legacy short-ID format, including unusually short Math.random() output, to protect no-argument callers.
const SHORT_ID = /^[a-z][a-z0-9]{0,5}$/;

// Matches a complete lowercase UUID v4, with the version and RFC variant pinned so another UUID format cannot pass.
const UUID_V4 =
  /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/;

// Matches the fullscreen prefix plus a complete UUID v4, so the factory cannot silently use the default short-ID path.
const FULLSCREEN_UUID_V4 =
  /^odyssey-fullscreen-[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/;

describe(createUniqueId.name, () => {
  test("no options", () => {
    const uniqueId = createUniqueId();

    expect(uniqueId).toMatch(SHORT_ID);
    expect(uniqueId.length).toBeLessThanOrEqual(uniqueIdLength);
  });

  test("UUID mode in a secure browser context", () => {
    expect(globalThis.isSecureContext).toBe(true);
    expect(typeof globalThis.crypto.randomUUID).toBe("function");

    const uniqueId = createUniqueId({ isUuid: true });

    expect(uniqueId).toHaveLength(36);
    expect(uniqueId).toMatch(UUID_V4);
  });
});

describe(createRandomUuid.name, () => {
  test("native getRandomValues without randomUUID, as on an insecure origin", () => {
    const uuids = Array.from({ length: 50 }, () =>
      createRandomUuid({
        webCrypto: {
          getRandomValues: (randomBytes) =>
            globalThis.crypto.getRandomValues(randomBytes),
        },
      }),
    );

    expect(uuids.every((uuid) => UUID_V4.test(uuid))).toBe(true);
    expect(new Set(uuids).size).toBe(uuids.length);
  });
});

describe(createFullscreenId.name, () => {
  test("a generated fullscreen ID", () => {
    const fullscreenId = createFullscreenId();

    expect(fullscreenId).toHaveLength("odyssey-fullscreen-".length + 36);
    expect(fullscreenId).toMatch(FULLSCREEN_UUID_V4);
  });
});
