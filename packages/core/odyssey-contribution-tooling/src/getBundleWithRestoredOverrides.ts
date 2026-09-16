import type {
  TranslationBundleGroup,
  TranslationOverrideRestoreOperation,
} from "./getTranslationOverrideRestorePlan.js";

type GetGroupWithOperationAppliedArgs = {
  group: TranslationBundleGroup;
  operation: TranslationOverrideRestoreOperation;
};

const getGroupWithOperationApplied = ({
  group,
  operation,
}: GetGroupWithOperationAppliedArgs): TranslationBundleGroup => {
  const [translationKey, ...remainingKeyPath] = operation.keyPath;

  if (translationKey === undefined) {
    return group;
  }

  if (remainingKeyPath.length > 0) {
    const nestedGroup = group[translationKey];

    if (typeof nestedGroup !== "object") {
      return group;
    }

    return {
      ...group,
      [translationKey]: getGroupWithOperationApplied({
        group: nestedGroup,
        operation: { ...operation, keyPath: remainingKeyPath },
      }),
    };
  }

  if (operation.hasPreviousValue) {
    return { ...group, [translationKey]: operation.previousValue };
  }

  return Object.fromEntries(
    Object.entries(group).filter(
      ([existingTranslationKey]) => existingTranslationKey !== translationKey,
    ),
  );
};

export type GetBundleWithRestoredOverridesArgs = {
  /** The bundle `i18next` holds right now, with the overrides still applied. */
  overriddenBundle: TranslationBundleGroup;
  restorePlan: TranslationOverrideRestoreOperation[];
};

/**
 * Applies a restore plan to the bundle currently in the store, returning the
 * bundle that should replace it.
 *
 * Entries the plan does not name are carried through untouched, so a bundle a
 * consumer added after `getTranslationServices` ran survives the swap.
 */
export const getBundleWithRestoredOverrides = ({
  overriddenBundle,
  restorePlan,
}: GetBundleWithRestoredOverridesArgs): TranslationBundleGroup =>
  restorePlan.reduce(
    (bundleSoFar, operation) =>
      getGroupWithOperationApplied({ group: bundleSoFar, operation }),
    overriddenBundle,
  );
