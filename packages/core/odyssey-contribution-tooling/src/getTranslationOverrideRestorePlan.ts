/**
 * A group of translation entries as `i18next` stores them: a translated string,
 * or a nested group of them.
 */
export type TranslationBundleGroup = {
  [translationKey: string]: string | TranslationBundleGroup | undefined;
};

/** A single entry within a `TranslationBundleGroup`. */
export type TranslationBundleValue = string | TranslationBundleGroup;

/**
 * One undo step for a bundle entry that an override replaced or introduced.
 * `keyPath` walks the bundle from its root down to that entry.
 */
export type TranslationOverrideRestoreOperation = {
  keyPath: string[];
} & (
  | { hasPreviousValue: true; previousValue: TranslationBundleValue }
  | { hasPreviousValue: false }
);

export type GetTranslationOverrideRestorePlanArgs = {
  /** The bundle `i18next` holds right now, before the override is applied. */
  currentBundle?: TranslationBundleGroup;
  /** The override about to be deep merged over `currentBundle`. */
  overrideBundle: TranslationBundleGroup;
};

/**
 * Describes how to undo `overrideBundle` against the bundle it is about to be
 * merged into, entry by entry.
 *
 * The recursion mirrors `i18next`'s `deepExtend`, which is what
 * `addResourceBundle(…, deep, overwrite)` runs: it walks into a key only when
 * neither side of it is a string, and replaces the whole value otherwise. Undoing
 * per entry rather than resetting the whole `(language, namespace)` bundle is what
 * lets an outer provider's overrides, and any bundle a consumer added itself,
 * survive an inner provider's teardown.
 */
export const getTranslationOverrideRestorePlan = ({
  currentBundle,
  overrideBundle,
}: GetTranslationOverrideRestorePlanArgs): TranslationOverrideRestoreOperation[] =>
  Object.entries(overrideBundle).flatMap<TranslationOverrideRestoreOperation>(
    ([translationKey, overrideValue]) => {
      // `addResourceBundle` runs its input through `JSON.stringify`, which drops
      // keys holding `undefined`, so such a key never reaches the bundle.
      if (overrideValue === undefined) {
        return [];
      }

      const keyPath = [translationKey];
      const currentValue = currentBundle?.[translationKey];

      if (currentValue === undefined) {
        return [{ keyPath, hasPreviousValue: false }];
      }

      if (
        typeof currentValue !== "object" ||
        typeof overrideValue !== "object"
      ) {
        return [
          {
            keyPath,
            hasPreviousValue: true,
            previousValue: structuredClone(currentValue),
          },
        ];
      }

      return getTranslationOverrideRestorePlan({
        currentBundle: currentValue,
        overrideBundle: overrideValue,
      }).map((operation) => ({
        ...operation,
        keyPath: [translationKey, ...operation.keyPath],
      }));
    },
  );
