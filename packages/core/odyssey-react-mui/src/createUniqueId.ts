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

// Keep default component IDs short to preserve the existing ID format for consumers.
export const uniqueIdLength = 6;

// Matches a leading ASCII letter, case-insensitively to preserve the existing short-ID validation.
const LEADING_ASCII_LETTER = /^[a-z]/i;

// Splits 32 hexadecimal digits into the 8-4-4-4-12 groups of the UUID text format.
const UUID_HEX_GROUPS =
  /^(?<timeLow>.{8})(?<timeMid>.{4})(?<timeHighAndVersion>.{4})(?<clockSequence>.{4})(?<node>.{12})$/;

const uuidByteCount = 16;
// RFC 9562 section 5.4: byte 6 carries the version in its high nibble, and byte 8 carries the variant in its two high bits.
const uuidVersionByteIndex = 6;
const uuidVariantByteIndex = 8;

const getUuidByte = ({ byte, index }: { byte: number; index: number }) =>
  index === uuidVersionByteIndex
    ? (byte % 0x10) + 0x40
    : index === uuidVariantByteIndex
      ? (byte % 0x40) + 0x80
      : byte;

export type CreateUuidFromRandomBytesArgs = {
  /** Sixteen random bytes. */
  randomBytes: Uint8Array;
};

/**
 * Creates a UUID v4 from 16 random bytes by setting the version and variant bits.
 */
export const createUuidFromRandomBytes = ({
  randomBytes,
}: CreateUuidFromRandomBytesArgs) => {
  const hexDigits = Array.from(randomBytes)
    .map((byte, index) =>
      getUuidByte({ byte, index }).toString(16).padStart(2, "0"),
    )
    .join("");
  const groups = UUID_HEX_GROUPS.exec(hexDigits)?.groups;

  if (!groups) {
    throw new Error(
      `A UUID needs ${uuidByteCount} random bytes, but received ${randomBytes.length}.`,
    );
  }

  return [
    groups.timeLow,
    groups.timeMid,
    groups.timeHighAndVersion,
    groups.clockSequence,
    groups.node,
  ].join("-");
};

export type CreateRandomUuidArgs = {
  /** The Web Crypto object. `randomUUID` is optional because browsers only expose it in a secure context. */
  webCrypto?: Pick<Crypto, "getRandomValues"> &
    Partial<Pick<Crypto, "randomUUID">>;
};

/**
 * Creates a UUID v4 with `crypto.randomUUID()`. Browsers hide that method outside a secure context, such as a plain HTTP origin other than localhost, so it falls back to `crypto.getRandomValues()`, which every context has.
 */
export const createRandomUuid = ({
  webCrypto = globalThis.crypto,
}: CreateRandomUuidArgs = {}) =>
  typeof webCrypto.randomUUID === "function"
    ? webCrypto.randomUUID()
    : createUuidFromRandomBytes({
        randomBytes: webCrypto.getRandomValues(new Uint8Array(uuidByteCount)),
      });

export type CreateUniqueIdArgs = {
  /** Generates the UUID used when `isUuid` is `true`. */
  getRandomUuid?: () => string;
  /** Generates the random value used for a short ID. */
  getRandomValue?: () => number;
  /**
   * If `true`, creates a UUID v4 with Web Crypto: `crypto.randomUUID()` in a secure context, or `crypto.getRandomValues()` on a plain HTTP origin.
   * @default false
   */
  isUuid?: boolean;
};

/**
 * Creates a short ID by default, or a UUID v4 for identifiers shared between independently bundled apps when `isUuid` is `true`.
 */
export const createUniqueId = ({
  getRandomValue = Math.random,
  getRandomUuid = createRandomUuid,
  isUuid = false,
}: CreateUniqueIdArgs = {}): string => {
  if (isUuid) {
    return getRandomUuid();
  }

  const id = getRandomValue()
    .toString(36)
    .slice(2, 2 + uniqueIdLength);

  return LEADING_ASCII_LETTER.test(id) ? id : `a${id.slice(1)}`;
};
