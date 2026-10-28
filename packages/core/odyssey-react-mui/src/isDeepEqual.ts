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

export type IsDeepEqualArgs = {
  firstValue: unknown;
  secondValue: unknown;
};

const isObject = (value: unknown): value is object =>
  value !== null && typeof value === "object";

const getAreTypedArraysEqual = ({
  firstArray,
  secondArray,
}: {
  firstArray: ArrayLike<unknown>;
  secondArray: ArrayLike<unknown>;
}) =>
  firstArray.length === secondArray.length &&
  Array.prototype.every.call(
    firstArray,
    (element, index) => element === secondArray[index],
  );

const getAreBytesEqual = ({
  firstView,
  secondView,
}: {
  firstView: ArrayBufferView | ArrayBuffer;
  secondView: ArrayBufferView | ArrayBuffer;
}) =>
  getAreTypedArraysEqual({
    firstArray: ArrayBuffer.isView(firstView)
      ? new Uint8Array(
          firstView.buffer,
          firstView.byteOffset,
          firstView.byteLength,
        )
      : new Uint8Array(firstView),
    secondArray: ArrayBuffer.isView(secondView)
      ? new Uint8Array(
          secondView.buffer,
          secondView.byteOffset,
          secondView.byteLength,
        )
      : new Uint8Array(secondView),
  });

const getAreOwnKeysEqual = (firstValue: object, secondValue: object) => {
  const firstKeys = Object.keys(firstValue);

  return (
    firstKeys.length === Object.keys(secondValue).length &&
    firstKeys.every(
      (key) =>
        Object.hasOwn(secondValue, key) &&
        getAreValuesEqual(
          (firstValue as Record<string, unknown>)[key],
          (secondValue as Record<string, unknown>)[key],
        ),
    )
  );
};

const getAreEntriesPaired = <EntryType>({
  candidateEntries,
  entries,
  getIsPair,
}: {
  candidateEntries: EntryType[];
  entries: EntryType[];
  getIsPair: (entry: EntryType, candidateEntry: EntryType) => boolean;
}) =>
  entries.reduce<EntryType[] | undefined>((unpairedCandidateEntries, entry) => {
    const pairIndex =
      unpairedCandidateEntries?.findIndex((candidateEntry) =>
        getIsPair(entry, candidateEntry),
      ) ?? -1;

    return pairIndex === -1
      ? undefined
      : unpairedCandidateEntries?.filter((_, index) => index !== pairIndex);
  }, candidateEntries) !== undefined;

const getAreObjectsEqual = (firstValue: object, secondValue: object) => {
  if (firstValue.constructor !== secondValue.constructor) {
    return false;
  }

  if (firstValue.constructor === Object) {
    return getAreOwnKeysEqual(firstValue, secondValue);
  }

  if (Array.isArray(firstValue) && Array.isArray(secondValue)) {
    return (
      firstValue.length === secondValue.length &&
      // `every` skips holes. `findIndex` visits each index, holes included.
      firstValue.findIndex(
        (element, index) =>
          !(
            index in firstValue === index in secondValue &&
            getAreValuesEqual(element, secondValue[index])
          ),
      ) === -1
    );
  }

  if (firstValue instanceof Date && secondValue instanceof Date) {
    return firstValue.getTime() === secondValue.getTime();
  }

  if (firstValue instanceof RegExp && secondValue instanceof RegExp) {
    return firstValue.toString() === secondValue.toString();
  }

  if (firstValue instanceof Set && secondValue instanceof Set) {
    return (
      firstValue.size === secondValue.size &&
      Array.from(firstValue).every(
        (entry) => isObject(entry) || secondValue.has(entry),
      ) &&
      getAreEntriesPaired({
        candidateEntries: Array.from(secondValue).filter(isObject),
        entries: Array.from(firstValue).filter(isObject),
        getIsPair: getAreValuesEqual,
      })
    );
  }

  if (firstValue instanceof Map && secondValue instanceof Map) {
    return (
      firstValue.size === secondValue.size &&
      Array.from(firstValue).every(
        ([key, entryValue]) =>
          isObject(key) ||
          (secondValue.has(key) &&
            getAreValuesEqual(entryValue, secondValue.get(key))),
      ) &&
      getAreEntriesPaired({
        candidateEntries: Array.from(secondValue).filter(([key]) =>
          isObject(key),
        ),
        entries: Array.from(firstValue).filter(([key]) => isObject(key)),
        getIsPair: ([key, entryValue], [candidateKey, candidateValue]) =>
          getAreValuesEqual(key, candidateKey) &&
          getAreValuesEqual(entryValue, candidateValue),
      })
    );
  }

  if (
    (firstValue instanceof ArrayBuffer && secondValue instanceof ArrayBuffer) ||
    (firstValue instanceof DataView && secondValue instanceof DataView)
  ) {
    return getAreBytesEqual({ firstView: firstValue, secondView: secondValue });
  }

  if (ArrayBuffer.isView(firstValue) && ArrayBuffer.isView(secondValue)) {
    return getAreTypedArraysEqual({
      firstArray: firstValue as unknown as ArrayLike<unknown>,
      secondArray: secondValue as unknown as ArrayLike<unknown>,
    });
  }

  return getAreOwnKeysEqual(firstValue, secondValue);
};

const getAreValuesEqual = (
  firstValue: unknown,
  secondValue: unknown,
): boolean =>
  firstValue === secondValue ||
  (isObject(firstValue) && isObject(secondValue)
    ? getAreObjectsEqual(firstValue, secondValue)
    : Number.isNaN(firstValue) && Number.isNaN(secondValue));

/**
 * Returns `true` when two values are deeply equal. A function compares by its identity.
 *
 * Heavily inspired by [dequal](https://github.com/lukeed/dequal).
 */
export const isDeepEqual = ({ firstValue, secondValue }: IsDeepEqualArgs) =>
  getAreValuesEqual(firstValue, secondValue);
