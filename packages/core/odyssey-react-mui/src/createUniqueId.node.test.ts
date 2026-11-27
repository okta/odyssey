/*!
 * Copyright (c) 2021-present, Okta, Inc. and/or its affiliates. All rights reserved.
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
  createUuidFromRandomBytes,
} from "./createUniqueId.js";

describe(createUniqueId.name, () => {
  test.each([
    {
      expectedId: "zk0000",
      randomValue: 0.987654321,
      scenario: "a short ID starting with a letter",
    },
    {
      expectedId: "afzzzx",
      randomValue: 0.123456789,
      scenario: "a short ID starting with a digit",
    },
    {
      expectedId: "a",
      randomValue: 0,
      scenario: "a zero random value",
    },
  ])("$scenario", ({ expectedId, randomValue }) => {
    expect(
      createUniqueId({
        getRandomValue: () => randomValue,
        getRandomUuid: () => {
          throw new Error("The short-ID path must not call Web Crypto.");
        },
      }),
    ).toBe(expectedId);
  });

  test("explicit short-ID mode", () => {
    expect(
      createUniqueId({
        getRandomValue: () => 0.123456789,
        getRandomUuid: () => {
          throw new Error("The short-ID path must not call Web Crypto.");
        },
        isUuid: false,
      }),
    ).toBe("afzzzx");
  });

  test("UUID mode", () => {
    const expectedUuid = "36b8f84d-df4e-4d49-b662-bcde71a8764f";

    expect(
      createUniqueId({
        getRandomValue: () => {
          throw new Error("The UUID path must not call Math.random().");
        },
        getRandomUuid: () => expectedUuid,
        isUuid: true,
      }),
    ).toBe(expectedUuid);
  });

  test("an unavailable UUID generator", () => {
    const unavailableUuidError = new Error("Web Crypto is unavailable.");

    expect(() =>
      createUniqueId({
        getRandomValue: () => {
          throw new Error("UUID mode must not fall back to a short ID.");
        },
        getRandomUuid: () => {
          throw unavailableUuidError;
        },
        isUuid: true,
      }),
    ).toThrow(unavailableUuidError);
  });
});

describe(createUuidFromRandomBytes.name, () => {
  test("all-zero bytes", () => {
    expect(createUuidFromRandomBytes({ randomBytes: new Uint8Array(16) })).toBe(
      "00000000-0000-4000-8000-000000000000",
    );
  });

  test("all-0xff bytes", () => {
    expect(
      createUuidFromRandomBytes({ randomBytes: new Uint8Array(16).fill(0xff) }),
    ).toBe("ffffffff-ffff-4fff-bfff-ffffffffffff");
  });

  test("sequential bytes", () => {
    expect(
      createUuidFromRandomBytes({
        randomBytes: Uint8Array.from({ length: 16 }, (_, index) => index),
      }),
    ).toBe("00010203-0405-4607-8809-0a0b0c0d0e0f");
  });

  test("too few bytes", () => {
    expect(() =>
      createUuidFromRandomBytes({ randomBytes: new Uint8Array(15) }),
    ).toThrow(new Error("A UUID needs 16 random bytes, but received 15."));
  });
});

describe(createRandomUuid.name, () => {
  test("Web Crypto with randomUUID", () => {
    expect(
      createRandomUuid({
        webCrypto: {
          getRandomValues: () => {
            throw new Error("randomUUID must be preferred.");
          },
          randomUUID: () => "36b8f84d-df4e-4d49-b662-bcde71a8764f",
        },
      }),
    ).toBe("36b8f84d-df4e-4d49-b662-bcde71a8764f");
  });

  test("Web Crypto without randomUUID, as on an insecure origin", () => {
    expect(
      createRandomUuid({
        webCrypto: {
          getRandomValues: <ArrayType extends ArrayBufferView | null>(
            randomBytes: ArrayType,
          ) => randomBytes,
        },
      }),
    ).toBe("00000000-0000-4000-8000-000000000000");
  });
});
